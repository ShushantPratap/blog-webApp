import { useEffect, useRef, useState } from "react";

function Message({
    success = null,
    error = null
}){
    const ref = useRef();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if(success) setMessage(success);
        else if(error) setMessage(error);
        else setMessage(null);
        
        setTimeout(() => {
            closeMsg();
            setMessage(null);
        }, 4000);
    }, [success, error]);

    const closeMsg = () => {
        ref.current?.classList
        .remove("success-message", "error-message");
        setMessage(null);
    }

    return (
        <div className="message">
             <p 
                className={
                    success ? "success-message"
                    : error ? "error-message" : ""
                }
                ref={ref}
            >{message}
                <i 
                    className='fa fa-close'
                    onClick={closeMsg}
                ></i>
            </p>
        </div>
    )
}

export default Message;