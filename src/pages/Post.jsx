import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, Button, UserId, SaveBtn, ShareBtn } from "../components/Index";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {deleteCachePost} from "../store/postSlice";

function Post(){
    const tabTitle = document.querySelector("title");
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const imageSrc = appwriteService.getFileView(post?.featuredImage);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const createdTime = new Date(post?.$createdAt).toLocaleTimeString("en-GB", dateOptions);
    const updatedTime = new Date(post?.$updatedAt).toLocaleTimeString("en-GB", dateOptions);
    const storePosts = useSelector(state => state.post.posts);

    useEffect(() => {
        if(slug){
            if(storePosts.length > 0){
                const post = storePosts.filter(post => post.$id === slug);
                setPost(post[0]);
                tabTitle.innerText = post[0].title;
            }
            else{
                appwriteService.getPost(slug).then(post => {
                    if(post) {
                        setPost(post);
                        tabTitle.innerText = post.title;
                    } else navigate("/");
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
                <div className="header">
                    <UserId userId={post.userId} />
                    <Container className="postCard-btn row">
                        <ShareBtn url={`https://justblog.vercel.app/all-posts/${post.$id}`} title={post.title} />
                        <SaveBtn postId={post.$id} />
                    </Container>
                </div>
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
                                    <td>{createdTime}</td>
                                </tr>
                                <tr>
                                    <th>Last Update</th>
                                    <td>{updatedTime}</td>
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