import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useUser, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
    const user = useUser();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDateTime);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const dateClasses = `mr-2 ${isDarkMode ? 'text-light' : ''}`;
    const iconColor = isDarkMode ? 'white' : 'black';

    const navigate = useNavigate();

    const handleSignInClick = () => {
        localStorage.setItem("comebackUrl", window.location.pathname);
        navigate('/sign-in');
    };

    useEffect(() => {
        const comebackUrl = localStorage.getItem("comebackUrl");
        if (comebackUrl) {
            localStorage.removeItem("comebackUrl");
            navigate(comebackUrl);
        }
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-custom ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
                    Collab
                </a>
                <div className="ml-auto">
                    <i
                    className={`fa fa-${isDarkMode ? 'sun-o' : 'moon-o'} fa-icon`}
                    style={{ color: iconColor }}
                    onClick={toggleDarkMode}
                    />
                    <span className={`date ${dateClasses}`}>{formattedDate}</span>
                    {user.isSignedIn ? (
                        <UserButton className="user-button" />
                    ) : (
                        <button className="btn btn-primary btn-signin" onClick={handleSignInClick}>Sign In</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
