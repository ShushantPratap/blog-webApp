import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

function ProfileImage({
    src = null,
    className = "",
    ...prop
}){
    const defaultImage = appwriteService.getFileView('profile-image');
    const [image, setImage] = useState(defaultImage);

    function checkImageURL(url, callback) {
        const img = new Image();
        img.onload = function () {
            callback(true); // Image loaded successfully
        };
        img.onerror = function () {
            callback(false); // Image failed to load
        };
        img.src = url; // Set the image source
    }
    useEffect(() => {
        // Usage
        checkImageURL(src, (isValid) => {
            isValid ? setImage(src) : setImage(defaultImage);
        });
    }, [src]);
        
    return(
        <div className={`profile-image ${className}`} {...prop}>
            <img src={image} />
        </div>
    );
}

export default ProfileImage;