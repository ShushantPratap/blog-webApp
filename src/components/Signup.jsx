import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../store/authSlice';
import { Button, Input, Message } from './Index';
import authService from '../appwrite/authentication';
import userService from "../appwrite/userConfig";

function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [username, setUsername] = useState("");
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const create = async (data) =>{
        console.log("create submit clicked :- ", data)
        try {
            const user = await userService.getUser(data.userId);
            const allUsers = await userService.getAllUsers();
            const email = allUsers.documents.filter(user => user.email === data.email);
            if(email.length > 0){
                setErrorMsg(null);
                setErrorMsg("This email is already exists.");
                return;
            }
            if(user){
                setErrorMsg(null);
                setErrorMsg("This username isn't available. Please try another.");
                return;
            }
            else{
                const userData = await authService.createAccount(data);
                if (userData) {
                    const file = await authService.setProfileImage(data.userId, data.profileImage[0]);
                    if(file) console.log("Profile is set");
                    setSuccessMsg(null);
                    const setUserData = await authService.getCurrentUser();
                    if (setUserData) {
                        const saveData = await userService.saveUserData(setUserData.$id, setUserData.email, setUserData);
                        if(saveData) console.log("Data is saved");
                        dispatch(login(setUserData));
                    }
                    setSuccessMsg("Account created successfully.");
                }
                navigate(`/add-profile/${data.userId}`);
            }
        } catch (error) {
            setErrorMsg(null)
            setErrorMsg("Functional error. Please try again.");
            console.log("Error: " + error);
        }
    }
    const usernameInput = (e) => {
        const val = e.target.value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\d\s]+/g, '')
            .replace(/\s/g, '');
            
        setUsername(val);
    }

    return (
        <div className="form signup">
            <div className="logo">
                <h1>LOGO</h1>
            </div>
            <div className='title'>
                <span>Create your account</span>
            </div>
            <Message success={successMsg} error={errorMsg} />
            <form onSubmit={handleSubmit(create)}>
                <Input
                    label="Profile image"
                    type="file"
                    accept="image/*"
                    {...register("profileImage", {required: false})}
                />
                <Input 
                    label="Username"
                    type="text"
                    value={username}
                    placeholder="Enter your username"
                    {...register("userId", {
                        required: true
                    })}
                    onChange={usernameInput}
                />
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    label="Email"
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
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <Button type="submit">
                    Create Account
                </Button>
                <p>
                    Already have an account?
                    <Link to="/login"> Sign In</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;