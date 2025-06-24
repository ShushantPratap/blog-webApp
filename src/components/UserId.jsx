import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {ProfileImage} from "./Index";
function UserId({
    className="",
    userId,
    ...props
}){
    const imageSrc = appwriteService.getFileView(`profile-image-${userId}`);
    return(
        <div className={`userId ${className}`} {...props}>
            <Link to={`/profile/${userId}`}>
                <ProfileImage src={imageSrc} />
                <div className="username">{userId}</div>
            </Link>
        </div>
    )
}

export default UserId;