import React, { useEffect, useState } from "react";
import userService from "../appwrite/userConfig"
import appwriteService from "../appwrite/config";
import { Container, ProfileImage, PostCard, Button, Loader } from "./Index";
import { useSelector, useDispatch } from "react-redux";
import { cacheStoreUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

function ProfileDetails({userId}){
    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.auth.userData);
    const userPosts = useSelector(state => state.post.posts);
    const storeUsers = useSelector(state => state.user.users);

    const imageSrc = appwriteService.getFileView(`profile-image-${userId}`);
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const createdTime = new Date(userData?.$createdAt).toLocaleDateString("en-GB", dateOptions);
 
    React.useEffect(() => {
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
                const allPosts = userPosts.filter(post => post.userId === userId);
                setPosts(allPosts);
                setLoading(false);
            }
            else{
                appwriteService.getPosts([])
                .then(posts => {
                    if(posts){
                        const allPosts = posts.documents.filter(post => post.userId === userId);
                        setPosts(allPosts);
                    }
                })
                .finally(() => setLoading(false));
            }
        }
    }, [userId]);

    return !loading ? (
        <Container className="profile">
            <div className="header row align-center">
                <ProfileImage src={imageSrc} />
                <div className="col-4">
                    <div className="profile-userId">{userData?.$id}</div>
                    <p className="profile-d">
                        <span>Posts</span>
                        <br />
                        {posts.length}
                    </p>
                    <p className="profile-d">
                        <span>Date Joined</span>
                        <br />
                        {createdTime}
                    </p>
                    {loginUser?.$id === userId &&
                    <div className="profile-btns">
                        <Button onClick={() => navigate("/edit-profile")}>Edit</Button>
                        <Button onClick={() => navigate("/settings")}>Settings</Button>
                    </div>}
                </div>
                <Container className="name container-fluid">
                    <h3>Name: {userData?.name}</h3>
                </Container>
            </div>
            <div className="posts row">
                {posts?.map((post) => (
                    <div key={post.$id} className="col-4">
                        <PostCard 
                            {...post}
                            userId={false}
                        />
                    </div>
                ))}
            </div>
        </Container>
    ) : <Loader />;

}

export default ProfileDetails;