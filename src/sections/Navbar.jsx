import { useState, useEffect } from "react";
import { navLinks } from "../constants/index.js";
import "./Togggle.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    const closeMenu = () => setIsOpen(false);

    // Default to dark mode unless user changed it before
    const [darkTheme, setDarkTheme] = useState(() => {
        return localStorage.getItem("theme") === "light" ? false : true;
    });

    useEffect(() => {
        if (darkTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme);
    };

    // Scroll effect for navbar
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside or on escape
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container') &&
                !event.target.closest('.mobile-menu')) {
                closeMenu();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen]);

    // Shadow classes based on theme and scroll
    const shadowClass = darkTheme
        ? 'shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
        : 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                ${darkTheme
                    ? 'bg-black/80 lg:bg-black backdrop-blur-md lg:backdrop-blur-none text-[#FAFAFA]'
                    : 'bg-[#faedcd]/80 lg:bg-[#faedcd] backdrop-blur-md lg:backdrop-blur-none text-[#333333]'
                }
                ${isScrolled ? 'shadow-lg py-2 sm:py-2' : `${shadowClass} py-3 sm:py-4`}`}
        >
            <div className="max-w-7xl mx-auto navbar-container">
                <div className="flex justify-between items-center mx-auto px-2 xs:px-3 sm:px-4 lg:px-6">
                    {/* Logo/Brand */}
                    <a
                        href="#home"
                        className={`font-bold text-base sm:text-3xl lg:text-xl z-50
                            ${darkTheme ? 'hover:text-[#A8E6CF]' : 'hover:text-[#f79d65]'} 
                            transition-colors duration-300 transform hover:scale-105
                            flex-shrink-0 max-w-[40%] truncate`}
                        onClick={closeMenu}
                    >
                        Bhoomika K S
                    </a>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <nav className="hidden lg:flex">
                        <ul className="nav-ul flex space-x-4 xl:space-x-6">
                            {navLinks.map(({ id, href, name }) => (
                                <li key={id} className="nav-li">
                                    <a
                                        href={href}
                                        className={`nav-li-a relative text-base xl:text-base
                                            ${darkTheme ? 'text-[#FAFAFA]' : 'text-black'} 
                                            ${darkTheme ? 'hover:text-[#A8E6CF]' : 'hover:text-[#f79d65]'} 
                                            transition-all duration-300 ease-in-out 
                                            after:content-[''] after:absolute after:w-0 after:h-0.5 
                                            ${darkTheme ? 'after:bg-[#A8E6CF]' : 'after:bg-[#f79d65]'} 
                                            after:left-0 after:-bottom-1 
                                            after:transition-all after:duration-300 hover:after:w-full
                                            px-2 py-1`}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-3 xs:space-x-11 sm:space-x-10 lg:space-x-4 flex-shrink-0">
                        {/* Dark Mode Toggle */}
                        <label className="mr-4 switch transform hover:scale-105 transition-transform duration-200 flex-shrink-0 scale-100 xs:scale-100 sm:scale-90 lg:scale-100">
                            <input
                                id="input"
                                type="checkbox"
                                checked={darkTheme}
                                onChange={toggleTheme}
                                aria-label="Toggle dark mode"
                            />
                            <div className="slider round">
                                <div className="sun-moon">
                                    <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                </div>
                                <div className="stars">
                                    <svg id="star-1" className="star" viewBox="0 0 20 20">
                                        <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                                    </svg>
                                    <svg id="star-2" className="star" viewBox="0 0 20 20">
                                        <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                                    </svg>
                                </div>
                            </div>
                        </label>

                        {/* Menu Toggle Button (Mobile/Tablet only) - Fixed sizing */}
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none lg:hidden flex z-50 transition-all duration-200
                                p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500
                                active:scale-95 flex-shrink-0"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            <div className="relative w-6 h-6 flex flex-col justify-center">
                                {/* Animated hamburger/close icon - Better proportioned */}
                                <span
                                    className={`absolute w-6 h-0.5 transform transition-all duration-300 ease-in-out
                                        ${darkTheme ? 'bg-white' : 'bg-black'}
                                        ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
                                />
                                <span
                                    className={`absolute w-6 h-0.5 transform transition-all duration-300 ease-in-out
                                        ${darkTheme ? 'bg-white' : 'bg-black'}
                                        ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                                />
                                <span
                                    className={`absolute w-6 h-0.5 transform transition-all duration-300 ease-in-out
                                        ${darkTheme ? 'bg-white' : 'bg-black'}
                                        ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Dropdown Menu - Improved sizing */}
            <div className={`lg:hidden mobile-menu transition-all duration-300 ease-in-out
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

                {/* Compact dropdown menu - Right aligned with better mobile sizing */}
                <div
                    className={`absolute top-full right-4 sm:right-6 md:right-4 w-72 sm:w-80 md:w-72 shadow-xl rounded-lg mt-2
                        transform transition-all duration-300 ease-in-out
                        ${isOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-2 opacity-0 scale-95'}
                        ${darkTheme ? 'bg-black/95 backdrop-blur-lg border border-gray-800' : 'bg-[#faedcd]/95 backdrop-blur-lg border border-gray-200'}`}
                >
                    {/* Navigation Links - Better mobile sizing */}
                    <nav className="px-5 py-4 sm:px-6 sm:py-4 md:px-4 md:py-3">
                        <ul className="flex flex-col space-y-2 sm:space-y-2 md:space-y-1">
                            {navLinks.map(({ id, href, name }, index) => (
                                <li key={id}
                                    className={`transform transition-all duration-300 ease-out
                                        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 30}ms` }}
                                >
                                    <a
                                        href={href}
                                        onClick={closeMenu}
                                        className={`text-lg sm:text-lg md:text-base block py-3 sm:py-3 md:py-2.5 px-4 sm:px-4 md:px-3 rounded-md transition-all duration-200
                                            ${darkTheme
                                                ? 'text-white hover:text-[#A8E6CF] hover:bg-white/10'
                                                : 'text-black hover:text-[#f79d65] hover:bg-black/10'
                                            }
                                            border-r-3 border-transparent hover:border-current
                                            transform hover:translate-x-1 text-right touch-manipulation
                                            min-h-[48px] sm:min-h-[48px] md:min-h-[44px] flex items-center justify-end`}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;