import React, { useEffect, useState } from "react";
import userService from "../appwrite/userConfig"
import appwriteService from "../appwrite/config";
import { Container, ProfileImage, PostCard, Button, Loader } from "./Index";
import { useSelector, useDispatch } from "react-redux";
import { cacheStoreUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function ProfileDetails({userId}){
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [btnAction, setBtnAction] = useState("posts");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.auth.userData);
    const userPosts = useSelector(state => state.post.posts);
    const storeUsers = useSelector(state => state.user.users);
    const savedPostsId = useSelector(state => state.savePosts.savePosts);
    
    const imageSrc = appwriteService.getFileView(`profile-image-${userId}`);
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const createdTime = new Date(userData?.$createdAt).toLocaleDateString("en-GB", dateOptions);
 
    useEffect(() => {
        setLoading(true);
        const user = storeUsers?.filter(user => user.$id === userId);
        if(user.length > 0){
            setUserData(user[0]);
            setLoading(false);
        }else{
            userService.getUser(userId)
            .then(user => JSON.parse(user.userData))
            .then(user => {
                setUserData(user);
                dispatch(cacheStoreUser(user));
            })
            .finally(() => setLoading(false));
        }

        setLoading(true);
        if(userId){
            if(userPosts.length > 0){
                setPosts(userPosts);
                setLoading(false);
            }
            else{
                appwriteService.getPosts([])
                .then(posts => {
                    if(posts){
                        setPosts(posts.documents);
                    }
                })
                .finally(() => setLoading(false));
            }
        }
    }, [userId]);

    const activePostBtn = (e) => {
        const btn = e.target;
        const i = Array.from(document.querySelectorAll("i"));
        if(i.includes(btn)){
            profilePosts(btn.parentElement);
        }else{
            profilePosts(btn);
        }
    }
    function profilePosts(El){
        document.querySelector(".profile-active").classList.remove("profile-active");
        El.classList.add("profile-active");
        setBtnAction(El.value)
    }

    return !loading ? (
        <Container className="profile">
            <div className="header row align-center">
                <ProfileImage src={imageSrc} />
                <div className="col">
                    <div className="profile-userId">{userData?.$id}</div>
                    <div className="date">
                        <p className="profile-d">
                            <span>Posts</span>
                            <br />
                            {(posts.filter(post => post.userId === userId)).length}
                        </p>
                        <p className="profile-d">
                            <span>Date Joined</span>
                            <br />
                            {createdTime}
                        </p>
                    </div>
                    {loginUser?.$id === userId &&
                    <div className="profile-btns">
                        <Button onClick={() => navigate("/edit-profile")}>Edit</Button>
                        <Button onClick={() => navigate("/settings")}>Settings</Button>
                    </div>}
                </div>
                <Container className="container-fluid">
                    <h3 className="m-3 ml-0">Name: {userData?.name}</h3>
                </Container>
            </div>
            <Container className="container-fluid profilePostBtn row">
                <Button className="profile-active" onClick={activePostBtn} value="posts">
                    <i className="bx bx-grid mr-1" />
                    Posts
                </Button>
                {loginUser?.$id === userId && 
                <>
                <Button onClick={activePostBtn} value="inactive">
                    <i className='bx bx-minus-square mr-1' /> 
                    Inactive Posts
                </Button>
                <Button className="mr-0" onClick={activePostBtn} value="saved">
                    <i className='bx  bx-bookmark mr-1' /> 
                    Saved
                </Button>
                </>}
            </Container>
            <div className="posts row">
                {posts?.map((post) => {
                    if(post.userId === userId && btnAction === "posts"){
                        return <div key={post.$id} className="col-4">
                            <PostCard 
                                {...post}
                                userId={false}
                            />
                        </div>
                    }if(post.status === "inactive" && btnAction === "inactive"){
                        return <div key={post.$id} className="col-4">
                            <PostCard 
                                {...post}
                                userId={false}
                            />
                        </div>
                    }if(savedPostsId?.includes(post.$id) && btnAction === "saved"){
                        return <div key={post.$id} className="col-4">
                            <PostCard 
                                {...post}
                                userId={false}
                            />
                        </div>
                    }
                })}
            </div>
        </Container>
    ) : <Loader />;

}

export default ProfileDetails;