import { Link } from 'react-router-dom';

function Logo({link = false}) {
  return (
    <div className='logo'>
        {link ? 
        <Link to="/">
            <h1>Logo</h1>
        </Link>
        : <h1>Logo</h1>
        }
    </div>
  );
}

export default Logo;