import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {UserId} from "./Index";

function PostCard({
    $id,
    title,
    featuredImage,
    $createdAt,
    userId
}){
    const imageSrc = appwriteService.getFileView(featuredImage);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const createdTime = new Date($createdAt).toLocaleDateString("en-GB", dateOptions);

    return (
        <div className="postCard">
            {userId && <UserId userId={userId} />}
            <Link to={`/all-posts/${$id}`}>
                <div className="postCard-image">
                    <img src={imageSrc} alt={title} />
                </div>
                <div className="postCard-title">
                    <h2>{title}</h2>
                    <p>{createdTime}</p>
                </div>
            </Link>
        </div>
    );
}

export default PostCard;