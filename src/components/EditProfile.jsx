import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Avatar, Button, Container, Input, Message, ProfileImage } from './Index';
import authService from '../appwrite/authentication';
import userService from "../appwrite/userConfig";
import appwriteService from "../appwrite/config";
import { login } from '../store/authSlice';

function EditProfile(){
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [imgUpdate, setImgUpdate] = useState(false);
    
    const dispatch = useDispatch();
    
    const userData = useSelector(state => state.auth.userData);
    const {register, handleSubmit} = useForm({
        defaultValues: {
            userId: userData.$id,
            name: userData.name,
            email: userData.email,
            password: "********"
        }
    });
    const imageSrc = appwriteService.getFileView(`profile-image-${userData?.$id}`);

    const updateName = async (data) => {
        setSuccessMsg(null);
        setErrorMsg(null);
        const user = await authService.updateName(data.name);
        if(user) {
            const updateUser = await userService.updateUserData(user.$id, user.email, user);
            if (updateUser) setSuccessMsg("Name updated successfully.");
            dispatch(login(user));
        }else{
            setErrorMsg("something went wrong, please try again.");
        }
    }

    const updateEmail = async (data) =>{
        setSuccessMsg(null);
        setErrorMsg(null);
        const user = await authService.updateEmail(data.email, data.password);
        if(user) {
            const updateUser = await userService.updateUserData(user.$id, user.email, user);
            if (updateUser) setSuccessMsg("Email updated successfully.");
            dispatch(login(user));
        }else{
            setErrorMsg("something went wrong check please your password and try again.");
        }
    }

    return (
        <div className="update-profile">
            <Container className='container-fluid'>
                <h2>Edit Profile</h2>
            </Container>
           <Message error={errorMsg} success={successMsg} />
            <div className="row">
                <ProfileImage src={imageSrc} />
                <div className="userId">
                    <h3>{userData.$id}</h3>
                    <p>{userData.name}</p>
                </div>
                {imgUpdate && 
                <Avatar 
                    userId={userData?.$id}
                    imageSrc={imageSrc}
                    cancelClickFn={() => setImgUpdate(false)}
                 />}
                <Button onClick={() => setImgUpdate(true)}>Update photo</Button>
            </div>
            
            <form 
                onSubmit={handleSubmit(updateName)}
                className='row'
            >
                <Input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Button type='submit'>Update Name</Button>
            </form>

            <form 
                onSubmit={handleSubmit(updateEmail)}
                className='row'
            >
                <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Invalid email address"
                        }
                    })}
                />
                <Input
                    type="text"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <Button type="submit">Update email</Button>
            </form>
        </div>
    );
}

export default EditProfile;