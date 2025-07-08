import { Login as LoginComponent } from "../components/Index";

function Login() {
  const tabTitle = document.querySelector("title");
  tabTitle.innerText = "Login";
    
  return (
    <div className="login-page">
        <LoginComponent />
    </div>
  );
}

export default Login;