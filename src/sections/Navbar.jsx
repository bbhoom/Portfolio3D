import { useState, useEffect } from "react";
import { navLinks } from "../constants/index.js";
import "./Togggle.css";

const NavItems = ({ darkTheme }) => {
    return (
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
                <li key={id} className="nav-li">
                    <a
                        href={href}
                        className={`nav-li-a relative ${darkTheme ? 'text-[#FAFAFA]' : 'text-black'} ${darkTheme ? 'hover:text-[#A8E6CF]' : 'hover:text-[#f79d65]'} transition-all duration-300 ease-in-out 
                            after:content-[''] after:absolute after:w-0 after:h-0.5 ${darkTheme ? 'after:bg-[#A8E6CF]' : 'after:bg-[#f79d65]'} after:left-0 after:-bottom-1 
                            after:transition-all after:duration-300 hover:after:w-full`}
                    >
                        {name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

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

    // Shadow classes based on theme and scroll
    const shadowClass = darkTheme
        ? 'shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
        : 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkTheme ? 'bg-black text-[#FAFAFA]' : 'bg-[#faedcd] text-[#333333]'}
                ${isScrolled ? 'shadow-lg py-2' : `${shadowClass} py-4`}`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mx-auto c-space">
                    <a
                        href="#home"
                        className={`font-bold text-xl ${darkTheme ? 'hover:text-[#A8E6CF]' : 'hover:text-[#f79d65]'} transition-colors duration-300 transform hover:scale-105`}
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
                        className={`hover:text-[${darkTheme ? '#FF8A80' : '#f79d65'}] focus:outline-none sm:hidden flex transition-transform duration-200 hover:rotate-180`}
                        aria-label="Toggle menu"
                    >
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-6 h-6" />
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="sm:flex hidden">
                        <NavItems darkTheme={darkTheme} />
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`nav-sidebar transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } ${darkTheme ? 'bg-black/90 backdrop-blur-sm' : 'bg-[#faedcd]/90 backdrop-blur-sm'
                    }`}
            >
                <nav className="p-5">
                    <NavItems darkTheme={darkTheme} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;