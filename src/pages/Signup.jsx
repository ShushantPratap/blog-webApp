import { Signup as SignupComponent } from "../components/Index";

function Signup(){
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "Sign Up";
    
    return(
        <div className="signup-page">
            <SignupComponent />
        </div>
    );
}

export default Signup;