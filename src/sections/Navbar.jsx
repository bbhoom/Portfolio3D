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

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container') &&
                !event.target.closest('.mobile-menu')) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            // Prevent scrolling when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Shadow classes based on theme and scroll
    const shadowClass = darkTheme
        ? 'shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
        : 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                ${darkTheme ? 'bg-black text-[#FAFAFA]' : 'bg-[#faedcd] text-[#333333]'}
                ${isScrolled ? 'shadow-lg py-2' : `${shadowClass} py-4`}`}
        >
            <div className="max-w-7xl mx-auto navbar-container">
                <div className="flex justify-between items-center mx-auto c-space px-4">
                    <a
                        href="#home"
                        className={`font-bold text-xl ${darkTheme ? 'hover:text-[#A8E6CF]' : 'hover:text-[#f79d65]'} 
                            transition-colors duration-300 transform hover:scale-105`}
                        onClick={closeMenu}
                    >
                        Bhoomika K S
                    </a>

                    {/* Dark Mode Toggle */}
                    <label className="switch transform hover:scale-105 transition-transform duration-200">
                        <input id="input" type="checkbox" checked={darkTheme} onChange={toggleTheme} />
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

                    {/* Menu Toggle Button (Mobile) */}
                    <button
                        onClick={toggleMenu}
                        className="focus:outline-none sm:hidden flex z-50 transition-transform duration-200"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <img
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                            alt={isOpen ? "Close menu" : "Open menu"}
                            className="w-6 h-6"
                        />
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="sm:flex hidden">
                        <ul className="nav-ul flex space-x-6">
                            {navLinks.map(({ id, href, name }) => (
                                <li key={id} className="nav-li">
                                    <a
                                        href={href}
                                        className={`nav-li-a relative ${darkTheme ? 'text-[#FAFAFA]' : 'text-black'} 
                                            ${darkTheme ? 'hover:text-[#A8E6CF]' : 'hover:text-[#f79d65]'} 
                                            transition-all duration-300 ease-in-out 
                                            after:content-[''] after:absolute after:w-0 after:h-0.5 
                                            ${darkTheme ? 'after:bg-[#A8E6CF]' : 'after:bg-[#f79d65]'} 
                                            after:left-0 after:-bottom-1 
                                            after:transition-all after:duration-300 hover:after:w-full`}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar - Simplified */}
            {isOpen && (
                <div className="fixed inset-0 z-40 sm:hidden mobile-menu">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={closeMenu}
                    ></div>

                    {/* Sidebar content */}
                    <div
                        className={`absolute top-0 right-0 h-screen w-64 p-6 pt-20 shadow-lg
                            ${darkTheme ? 'bg-black text-white' : 'bg-[#faedcd] text-black'}`}
                    >
                        <nav>
                            <ul className="flex flex-col space-y-6">
                                {navLinks.map(({ id, href, name }) => (
                                    <li key={id}>
                                        <a
                                            href={href}
                                            onClick={closeMenu}
                                            className={`text-lg block py-2 ${darkTheme ? 'text-white hover:text-[#A8E6CF]' : 'text-black hover:text-[#f79d65]'}`}
                                        >
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;