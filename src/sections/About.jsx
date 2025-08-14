import { useState, useEffect } from 'react';
import Button from '../components/Button.jsx';
import EarthCanvas from '../components/Earth.jsx';
import PixelCard from './PixelCard';
import Orbes from './Orb';

const About = () => {
    const [darkTheme, setDarkTheme] = useState(() => {
        return localStorage.getItem("theme") === "light" ? false : true;
    });

    // Improved theme sync with document and localStorage
    useEffect(() => {
        const handleThemeChange = () => {
            const isDark = document.documentElement.classList.contains("dark");
            setDarkTheme(isDark);
        };

        handleThemeChange();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    handleThemeChange();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

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

    return (
        <section
            className={`c-space my-10 transition-colors duration-500 ${darkTheme
                ? 'bg-black'
                : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4]'
                }`}
            id="about"
        >
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-3 md:gap-4 xl:gap-5 px-4 sm:px-6">
                {/* Grid 1: Intro */}
                <div className="col-span-1 xl:row-span-3">
                    <div className={`grid-container ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80 border-[#cbb9a9] shadow-md'
                        }`}>
                        <img
                            src="assets/grid11.png"
                            alt="grid-1"
                            className="w-full h-48 sm:h-56 md:h-60 object-contain"
                        />
                        <div className="pt-4">
                            <p className="grid-headtext">Hi, I&#39;m Bhoomika K S</p>
                            <p className='grid-subtext mt-2'>
                                A B.Tech student in Computer Science and Design Engineering with a GPA of 9.3.
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
                            className="w-full h-48 sm:h-56 md:h-60 object-contain"
                        />
                        <div className="pt-4">
                            <p className='grid-headtext'>Tech Stack</p>
                            <p className='grid-subtext mt-2'>
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
                    <div className={`grid-container ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80 border-[#e0cebe] shadow-md'
                        }`}>
                        <div className="rounded-3xl w-full h-64 sm:h-72 md:h-80 flex justify-center items-center">
                            <EarthCanvas />
                        </div>
                        <div className="pt-4">
                            <p className='grid-headtext'>
                                I&#39;m very flexible with time zone communications & locations
                            </p>
                            <p className='grid-subtext mt-2'>
                                I&#39;m based in Bangalore, India and open to remote work worldwide.
                            </p>
                            <a href="#contact" className="block mt-6">
                                <Button name="Contact Me" isBeam containerClass="w-full" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Grid 4: Passion for Coding */}
                <div className="xl:col-span-2 xl:row-span-3">
                    <PixelCard variant="pink" className={
                        darkTheme ? "bg-black-200 border-black-300" : "bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80 shadow-md"
                    }>
                        <div className="absolute inset-0 z-10">
                            <div className="grid-container">
                                <img
                                    src="assets/grid3.png"
                                    alt="grid-3"
                                    className="w-full h-48 sm:h-56 md:h-64 object-contain"
                                />
                                <div className="pt-4">
                                    <p className='grid-headtext'>My Passion for Coding</p>
                                    <p className='grid-subtext mt-2'>
                                        I am passionate about leveraging technology to solve real-world problems,
                                        whether through AI-powered healthcare tools, intuitive budget apps, or
                                        interactive games. My achievements include winning Blitz&#39;24 for an AI
                                        healthcare chatbot and contributing to patents for an ambulance booking
                                        app and a skincare smart mirror. I enjoy combining development and design
                                        to create impactful solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </PixelCard>
                </div>

                {/* Grid 5: Experience Section */}
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className={`grid-container relative overflow-hidden ${darkTheme ? 'bg-black-200 border-black-300' : 'bg-gradient-to-b from-[#faedcd] to-[#f9dcc4] bg-opacity-80 shadow-md'
                        }`}>
                        {/* Orb Background */}
                        <div className="absolute inset-0 w-full h-full">
                            <Orbes
                                hoverIntensity={3}
                                rotateOnHover={true}
                                hue={0}
                                forceHoverState={false}
                            />
                        </div>

                        {/* Experience Content */}
                        <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between pointer-events-none">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <h3 className={`text-xl sm:text-2xl font-bold ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                                    Experience
                                </h3>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="text-center space-y-4">
                                    {/* Company and Role */}
                                    <div className="space-y-2">
                                        <h3 className={`text-lg sm:text-xl font-bold ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                                            SteadeeSoft AI Technologies
                                        </h3>

                                        {/* Role and Date */}
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                            <p className={`text-base sm:text-lg font-semibold ${darkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                                                SDE Intern
                                            </p>
                                            <p className={`text-xs sm:text-sm font-medium ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                                                May 2025 - Aug 2025
                                            </p>
                                        </div>
                                    </div>

                                    {/* Experience Description */}
                                    <div className="mt-3">
                                        <p className={`text-xs sm:text-sm leading-relaxed text-justify ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Worked on the development of a comprehensive mobile application from inception to deployment using Flutter framework.
                                            Focused on seamless backend integration, performance optimization, and delivering a robust user experience.
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="pt-2">
                                        <div className={`inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-full ${darkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                                            <span className={`text-xs font-medium ${darkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                                                Flutter
                                            </span>
                                            <span className={`text-xs ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                                            <span className={`text-xs font-medium ${darkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                                                Firebase
                                            </span>
                                            <span className={`text-xs ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                                            <span className={`text-xs font-medium ${darkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                                                AWS
                                            </span>
                                            <span className={`text-xs ${darkTheme ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                                            <span className={`text-xs font-medium ${darkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                                                CloudFlare
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
