import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { useCallback, useEffect, useState } from "react";
import { cacheStorePosts } from "../store/postSlice";
import { lastId } from "../store/lastIdSlice";

function useGetPosts(){
    const storePosts = useSelector(state => state.post.posts);
    const postLastId = useSelector(state => state.lastId.id);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    const loadPosts = () => {
        appwriteService.getPosts(postLastId)
        .then(getPosts => {
            if (getPosts) {
                dispatch(lastId(getPosts.documents[getPosts.documents.length - 1].$id));
                getPosts.documents.forEach(post => {
                    const filterPost = storePosts.filter(item => item.$id === post.$id);
                    if(filterPost.length === 0){
                        setPosts(prev => [...prev, post]);
                        dispatch(cacheStorePosts(post));
                    }
                });
            }
        });
    };
    
    useEffect(() => {
        if(storePosts.length > 0){
            setPosts(storePosts);
        }else {
            loadPosts();
        }
    }, []);

    return [posts, loadPosts];
}

const useUserPosts = () => {
    const [userId, setUserId] = useState();
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        appwriteService.getUserPosts(userId)
        .then(getPosts => {
            if (getPosts) {
                setUserPosts(getPosts.documents);
            }
        });
    
    }, [userId])
    return [userPosts, setUserId]
}

export{
    useGetPosts,
    useUserPosts
};
