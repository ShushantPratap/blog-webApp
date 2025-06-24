import {useState} from "react";
import { Link } from "react-router-dom";
import { login as authLogin} from "../store/authSlice";
import { Button, Input, Logo } from "./Index"
import { useDispatch } from "react-redux";
import authService from "../appwrite/authentication";
import {useForm} from "react-hook-form";

function Login(){
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(true);
    
    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="form signin">
            <Logo />
            <div className='title'>
                <span>Login to your account</span>
            </div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit(login)}>
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
                <div className="form-link">
                    <Link to="#" className="forgot-pass">Forgot password?</Link>
                </div>
                <Button type="submit">
                    Login
                </Button>    
                <p>
                    Don't have an account?
                    <Link to="/signup"> Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;