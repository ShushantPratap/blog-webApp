import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Container } from "../components/Index";

function AddPhoto(){
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "Add photo";
    
    const userData = useSelector(state => state.auth.userData);
    const {slug} = useParams();
    const navigate = useNavigate();

    return userData?.$id === slug ? (
            <Container>
            <Avatar 
                userId={slug}
                cancelClickFn={() => navigate("/")}
            />
        </Container>
    ) : <h1>Please enter valid url !</h1>; 
    
}

export default AddPhoto;