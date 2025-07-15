import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {Container, SaveBtn, ShareBtn, UserId} from "./Index";

function PostCard({
    $id,
    title,
    featuredImage,
    $createdAt,
    userId
}){
    const imageSrc = appwriteService.getFileView(featuredImage);
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const createdTime = new Date($createdAt).toLocaleDateString("en-GB", dateOptions);

    return (
        <div className="postCard">
            {userId && <UserId userId={userId} />}
            <Link to={`/all-posts/${$id}`}>
                <div className="postCard-image">
                    <img src={imageSrc} alt={title} />
                </div>
                <div className="postCard-title">
                    <p>{title}</p>
                </div>
            </Link>
            <div className="row">
                <div className="postCard-date">
                    <i className="bx bx-calendar-alt"></i>
                    {createdTime}
                </div>
                <Container className="postCard-btn row">
                    <ShareBtn url={`https://justblog.vercel.app/all-posts/${$id}`} title={title} />
                    <SaveBtn postId={$id} />
                </Container>
            </div>
        </div>
    );
}

export default PostCard;