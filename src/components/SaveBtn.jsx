import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../appwrite/userConfig';
import { savePost, removeSavePost } from '../store/postSaveSlice';
import { useNavigate } from 'react-router-dom';

function SaveBtn({postId}) {
    const ref =  useRef(null);
    const userData = useSelector(state => state.auth.userData);
    const userId = userData?.$id,
    userEmail = userData?.email;
    const [count, setCount] = useState(0);
    const savePostId = useSelector(state => state.savePosts.savePosts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const authStatus = useSelector(state => state.auth.status);

    const savedOrNot = (save) => {
        const icon = ref.current;
        if(save){
            icon.classList.remove("bx-bookmark");
            icon.classList.add("bxs-bookmark");
        }else{
            icon.classList.remove("bxs-bookmark");
            icon.classList.add("bx-bookmark");
        }
    }

    const handleClick = async () => {
        setCount(prev => prev + 1);
        if(authStatus){
            if(savePostId.includes(postId)){
                dispatch(removeSavePost(postId));
                const ids = savePostId.filter(id => id!==postId);
                const save = await userService.savePost(userId, userEmail, userData, ids);
                if(save){
                    console.log("remove");
                }
            }else{
                dispatch(savePost(postId));
                const ids = Array.from(savePostId);
                ids.push(postId);
                console.log(ids)
                const save = await userService.savePost(userId, userEmail, userData, ids);
                if(save){
                    console.log("add");
                }
            }
        } else navigate("/login");
    };
    
    React.useEffect(() => {
        if(authStatus){
            if(savePostId.includes(postId)){
                savedOrNot(true);
            }
            else{
                savedOrNot(false)
            }
        }
    }, [count]);


    return(
        <button className="saveBtn" onClick={handleClick}>
            <i className="bx bx-bookmark" ref={ref}></i>
        </button>
    );
}

export default SaveBtn;