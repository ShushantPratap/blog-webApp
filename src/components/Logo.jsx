import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.png"

function Logo({link = false}) {
  return (
    <div className='logo'>
        {link ? 
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        : <img src={logo} alt="logo" />
        }
        <h1>just blog</h1>
    </div>
  );
}

export default Logo;