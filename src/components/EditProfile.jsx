import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/authentication';
import userService from "../appwrite/userConfig";
import appwriteService from "../appwrite/config";
import { login } from '../store/authSlice';
import { Avatar, Button, Container, Input, Loader, Message, ProfileImage } from './Index';

function EditProfile(){
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [imgUpdate, setImgUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const userData = useSelector(state => state.auth.userData);
    const [name, setName] = useState(userData?.name);
    const [email, setEmail] = useState(userData?.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const imageSrc = appwriteService.getFileView(`profile-image-${userData?.$id}`);

    const updateName = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg(null);
        setErrorMsg(null);
        const user = await authService.updateName(name);
        if(user) {
            const updateUser = await userService.updateUserData(user.$id, user.email, user);
            if (updateUser) setSuccessMsg("Name updated successfully.");
            dispatch(login(user));
        }else{
            setErrorMsg("something went wrong, please try again.");
        }
        setLoading(false);
    }

    const updateEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg(null);
        setErrorMsg(null);
        const user = await authService.updateEmail(email, password);
        if(user) {
            const updateUser = await userService.updateUserData(user.$id, user.email, user);
            if (updateUser) setSuccessMsg("Email updated successfully.");
            dispatch(login(user));
        }else{
            setErrorMsg("something went wrong check please your password and try again.");
        }
        setLoading(false);
    }  
    
    const updatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg(null);
        setErrorMsg(null);
        const user = await authService.updatePassword(newPassword, password);
        if(user) {
            const updateUser = await userService.updateUserData(user.$id, user.email, user);
            if (updateUser) setSuccessMsg("Password updated successfully.");
            dispatch(login(user));
        }else{
            setErrorMsg("something went wrong check please your password and try again.");
        }
        setLoading(false);
    }

    return (
        <div className="update-profile">
            {loading && <Loader />}
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
                onSubmit={updateName}
                className='row'
            >
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Button type='submit'>Update Name</Button>
            </form>

            <form 
                onSubmit={updateEmail}
                className='row'
            >
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Update email</Button>
            </form>

            <form 
                onSubmit={updatePassword}
                className='row'
            >
                <Input
                    type="text"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Old password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Update Password</Button>
            </form>
        </div>
    );
}

export default EditProfile;