import { Link } from "react-router-dom";

function Footer() {
    
    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <Link to="/"><i className="fa fa-facebook"></i></Link>
                    <Link to="/"><i className="fa fa-instagram"></i></Link>
                    <Link to="/"><i className="fa fa-youtube"></i></Link>
                    <Link to="/"><i className="fa fa-twitter"></i></Link>
                </div>

                <div className="row">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="contact">Contact us</Link></li>
                        <li><Link to="/github">GitHub</Link></li>
                    </ul>
                </div>

                <div className="row">
                    <p>Shushant Pratap Copyright © 2021 - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;