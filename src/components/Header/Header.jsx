import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, LogoutBtn, Button, Logo } from '../Index';
import { AlignJustify } from "lucide-react";

function Header() {
    const ref = React.useRef();
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: true
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        },
        {
            name: 'Profile',
            slug: `/profile/${userData ? userData.$id : 'login'}`,
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        }
    ];
    React.useEffect(() => {
        const mainEle = document.querySelector("main");
        function closeMenu(){
            ref.current.classList.remove("open-menu")
        }
        mainEle.addEventListener("click", closeMenu);
        return () => {
            mainEle.removeEventListener("click", closeMenu);
        }
        
    }, [])

    return (
        <header>
            <Container>
                <nav>
                   <Logo />
                    <Button
                        className='open-menuBtn'
                        onClick={() => ref.current.classList.toggle("open-menu")}
                    ><AlignJustify strokeWidth={2} />
                    </Button>
                    <ul className='navLinks' ref={ref}>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink 
                                        to={item.slug} 
                                        className={({isActive}) => `${isActive ? 'active-link': ''}`}
                                    >{item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li className='logout-btn'>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;