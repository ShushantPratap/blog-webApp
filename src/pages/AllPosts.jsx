import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/Index";
import appwriteService from "../appwrite/config"
import { cacheStorePosts } from "../store/postSlice"
import { useDispatch, useSelector } from "react-redux";

function AllPosts() {
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "All Posts";

    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const storePosts = useSelector(state => state.post.posts);

    useEffect(() => {
        if (storePosts.length > 0) {
            setPosts(storePosts);
        }
        else {
            appwriteService.getPosts([]).then(posts => {
                if (posts) {
                    setPosts(posts.documents);
                    posts.documents.map(post => dispatch(cacheStorePosts(post)));
                }
            });
        }
    }, []);

    return (
        <div className="all-posts">
            <Container>
                <div className="posts row">
                    {posts?.map((post) => (
                        <div key={post.$id} className="col-4">
                            <PostCard
                                {...post}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;