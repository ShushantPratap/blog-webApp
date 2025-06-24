import { Link, useParams } from "react-router-dom";
import {Container, ProfileDetails, Button} from "../components/Index";

function Profile(){
    const {slug} = useParams();
   
    return (
        <>
        <Container>{slug === 'login' ? 
            <div className="before-login col">
                <h1>Login to view profile</h1>
                <Link to='/login'>
                    <Button>Login</Button>
                </Link>
            </div>
            : <ProfileDetails userId={slug} />
            }
        </Container>
        </>
    );
}

export default Profile;