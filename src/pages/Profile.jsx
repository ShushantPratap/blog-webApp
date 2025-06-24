import React from "react";
import { useParams } from "react-router-dom";
import {Container, ProfileDetails, Avatar} from "../components/Index";

function Profile(){
    const {slug} = useParams();
   
    return (
        <>
        <Container>
            <ProfileDetails userId={slug} />
            {/* <Avatar /> */}
        </Container>
        </>
    );
}

export default Profile;