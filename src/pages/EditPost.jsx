import {useEffect, useState} from "react";
import { Container, Loader, PostForm } from "../components/Index";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "Edit Post";
    
    const userData = useSelector(state => state.auth.userData);
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then(post => {
                if (post) {
                    if(post.userId === userData.$id){
                        setPost(post);
                    }else navigate("/");
                }
            });
        }else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="edit-post">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : <Loader />;
};

export default EditPost;
