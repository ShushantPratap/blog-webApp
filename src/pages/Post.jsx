import React, {useEffect, useState} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, Button, UserId } from "../components/Index";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {deleteCachePost} from "../store/postSlice";

function Post(){
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/68261c11003326b78423/files/${post?.featuredImage}/view?project=6826166b001919215303&mode=admin`;
    // const imageSrc = appwriteService.getFilePreview(post?.featuredImage);
    const imageSrc = appwriteService.getFileView(post?.featuredImage);
    const createdTime = new Date(post?.$createdAt);
    const updatedTime = new Date(post?.$updatedAt);
    const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const storePosts = useSelector(state => state.post.posts);

    useEffect(() => {
        if(slug){
            if(storePosts.length > 0){
                const post = storePosts.filter(post => post.$id === slug);
                setPost(post[0]);
            }
            else{
                appwriteService.getPost(slug).then(post => {
                    if(post) setPost(post);
                    else navigate("/");
                });
            }
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if(confirm('Are you delete your post')){
            appwriteService.deletePost(post.$id).then(status => {
                if(status){
                    appwriteService.deleteFile(post.featuredImage);
                    dispatch(deleteCachePost(post.$id));
                    navigate("/");
                }
            });
        }
    };

    return post ? (
        <div className="post">
            <Container>
                <UserId userId={post.userId} />
                <hr />
                <div className="col-1">
                    <div className="image-details row">
                        <img
                            src={imageSrc}
                            alt={post.title}
                        />
                        <table border="1" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <th>Created At</th>
                                    <td>{`${Days[createdTime.getDay()-1]} | ${createdTime.toLocaleString()}`}</td>
                                </tr>
                                <tr>
                                    <th>Last Update</th>
                                    <td>{`${Days[updatedTime.getDay()-1]} | ${updatedTime.toLocaleString()}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {isAuthor && (
                        <div className="links row">
                            <Button onClick={() => navigate(`/edit-post/${post.$id}`)}>Edit</Button>
                            <Button onClick = {deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div className="content">
                    <h1 className="title">{post.title}</h1>
                    <div className="paragraph">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;