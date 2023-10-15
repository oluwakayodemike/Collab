import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useUser, UserButton } from "@clerk/clerk-react";


const NavBar = () => {
    const user = useUser();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isDarkMode, setIsDarkMode] = useState(false);
    // const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []);

    // time and date format
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDateTime);

    // toggle light and dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // modes changes...
    const dateClasses = `mr-2 ${isDarkMode ? 'text-light' : ''}`;
    const iconColor = isDarkMode ? 'white' : 'black';

    const navigate = useNavigate();

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
                    <button className="btn btn-primary btn-signin" onClick={() => navigate('/sign-in')}>Sign In</button>
                )}
            </div>
            </div>
        </nav>
    );
};

export default NavBar