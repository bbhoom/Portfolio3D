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
                            <p className="grid-headtext" >Hi, I&#39;m Bhoomika K S</p>
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
                                I&#39;m very flexible with time zone communications & locations
                            </p>
                            <p className='grid-subtext'>
                                I&#39;m based in Banglore, India and open to remote work worldwide.
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
                        {/* Orb Background - positioned to receive mouse events */}
                        <div className="absolute inset-0 mt-18 w-full h-full">
                            <Orbes
                                hoverIntensity={3}
                                rotateOnHover={true}
                                hue={0}
                                forceHoverState={false}
                            />
                        </div>

                        {/* Experience Content - positioned to use full grid layout */}
                        <div className="relative z-10 p-6 h-full flex flex-col justify-between pointer-events-none">
                            {/* Header */}
                            <div className="text-center">
                                <h3 className={`text-2xl font-bold ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                                    Experience
                                </h3>
                            </div>

                            {/* Main Content - positioned in center */}
                            <div className="flex-1 flex flex-col justify-center px-6 py-8">
                                <div className="text-center space-y-6">
                                    {/* Company and Role */}
                                    <div className="space-y-2">
                                        <h3 className={`text-xl font-bold ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                                            SteadeeSoft AI Technologies
                                        </h3>

                                        {/* Role and Date in same row */}
                                        <div className="flex justify-between items-center">
                                            <p className={`text-lg font-semibold ${darkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                                                SDE Intern
                                            </p>
                                            <p className={`text-sm font-medium ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                                                June 2024 - Present
                                            </p>
                                        </div>
                                    </div>

                                    {/* Experience Description */}
                                    <div className="mt-3">
                                        <p className={`text-sm leading-relaxed text-justify ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Worked on the development of a comprehensive mobile application from inception to deployment using Flutter framework.
                                            Focused on seamless backend integration, performance optimization, and delivering a robust user experience through
                                            efficient cloud infrastructure and real-time data synchronization.
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="pt-4">
                                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${darkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
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