import {EditProfile, Container } from "../components/Index";

function EditProfilePage(){
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "Edit Profile";
    
    return(
        <Container>
            <EditProfile />
        </Container>
    );
}

export default EditProfilePage;