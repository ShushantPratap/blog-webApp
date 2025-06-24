import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Loader} from "./Index.js";

function Protected({
    children,
    authentication = true
}){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        setLoader(true);
        if (authentication && authStatus !== authentication) {
            console.log("Protected route, redirecting to login");
        } else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
        setLoader(false);
    }, [authentication, authStatus, navigate]);

    return loader ? <Loader /> : <>{children}</>;
}

export default Protected;