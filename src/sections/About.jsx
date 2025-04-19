import { useState, useEffect } from 'react';
import Button from '../components/Button.jsx';
import EarthCanvas from '../components/Earth.jsx';
import PixelCard from './PixelCard';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => {
        return localStorage.getItem("theme") === "light" ? false : true;
    });

    // Improved theme sync with document and localStorage
    useEffect(() => {
        const handleThemeChange = () => {
            const isDark = document.documentElement.classList.contains("dark");
            setDarkTheme(isDark);
        };

        // Initial check
        handleThemeChange();

        // Watch for class changes on documentElement
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    handleThemeChange();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        // Watch for localStorage changes
        const handleStorageChange = (e) => {
            if (e.key === "theme") {
                setDarkTheme(e.newValue !== "light");
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            observer.disconnect();
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText('ksbhoomika43@gmail.com');
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <section
            className={`c-space my-20 transition-colors duration-500 ${darkTheme
                ? 'bg-black'
                : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4]'
                }`}
            id="about"
        >
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full px-2 sm:px-6">
                {/* Grid 1: Intro */}
                <div className="col-span-1 xl:row-span-3">
                    <div className={`grid-container ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4]  bg-opacity-80 border-[#cbb9a9] shadow-md'
                        }`}>
                        <img
                            src="assets/grid11.png"
                            alt="grid-1"
                            className="w-full sm:h-[276px] h-fit object-contain"
                        />
                        <div>
                            <p className="grid-headtext" >Hi, I'm Bhoomika K S</p>
                            <p className='grid-subtext'>
                                A B.Tech student in Computer Science and Design Engineering with a GPA of 9.2.
                                I thrive on creating innovative solutions, from AI-powered tools to interactive games.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid 2: Tech Stack */}
                <div className="col-span-1 xl:row-span-3">
                    <div className={`grid-container ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80 border-[#cbb9a9] shadow-md'
                        }`}>
                        <img
                            src="assets/grid2.png"
                            alt="grid-2"
                            className="w-full sm:h-[276px] h-fit object-contain"
                        />
                        <div>
                            <p className='grid-headtext' >Tech Stack</p>
                            <p className='grid-subtext' >
                                I am proficient in Python, C, Java, HTML/CSS, JavaScript, and SQL.<br />
                                My toolkit includes React, Bootstrap, Django, Pygame, Tkinter, and Three.js,
                                alongside tools like GitHub and VS Code.<br />
                                This diverse stack empowers me to build efficient, user-friendly applications.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid 3: Earth Canvas */}
                <div className="col-span-1 xl:row-span-4">
                    <div className={`grid-container ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4]] bg-opacity-80 border-[#e0cebe] shadow-md'
                        }`}>
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <EarthCanvas />
                        </div>
                        <div>
                            <p className='grid-headtext' >
                                I'm very flexible with time zone communications & locations
                            </p>
                            <p className='grid-subtext'>
                                I'm based in Banglore, India and open to remote work worldwide.
                            </p>
                            <a href="#contact">
                                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Grid 4: Passion for Coding */}
                <div className="xl:col-span-2 xl:row-span-3">
                    <PixelCard variant="pink" className={
                        darkTheme ? "bg-black-200 border-black-300" : "bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80  shadow-md"
                    }>
                        <div className="absolute inset-0 z-10">
                            <div className="grid-container">
                                <img
                                    src="assets/grid3.png"
                                    alt="grid-3"
                                    className="w-full sm:h-[266px] object-contain"
                                />
                                <div>
                                    <p className='grid-headtext'>My Passion for Coding</p>
                                    <p className='grid-subtext'>
                                        I am passionate about leveraging technology to solve real-world problems,
                                        whether through AI-powered healthcare tools, intuitive budget apps, or
                                        interactive games. My achievements include winning Blitz'24 for an AI
                                        healthcare chatbot and contributing to patents for an ambulance booking
                                        app and a skincare smart mirror. I enjoy combining development and design
                                        to create impactful solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </PixelCard>
                </div>

                {/* Grid 5: Email Section */}
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className={`grid-container ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80  shadow-md'
                        }`}>
                        <img
                            src="assets/grid4.png"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
                        />
                        <div className="space-y-2">
                            <p className={`grid-subtext text-center ${!darkTheme && 'text-gray-600'}`}>My Email</p>
                            <div className="copy-container cursor-pointer" onClick={handleCopy}>
                                <img
                                    src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'}
                                    alt="copy"
                                />
                                <p className={`lg:text-2xl md:text-xl font-medium ${darkTheme ? 'text-gray_gradient text-white' : 'text-gray-800'
                                    }`}>
                                    ksbhoomika43@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;