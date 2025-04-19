import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';
import { achievementscode } from "../constants/index.js";
import '../index.css';

const Achievements = () => {
    const [darkTheme, setDarkTheme] = useState(() => localStorage.getItem("theme") !== "light");

    useEffect(() => {
        const handleStorageChange = () => setDarkTheme(localStorage.getItem("theme") !== "light");
        window.addEventListener('storage', handleStorageChange);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    setDarkTheme(isDark);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            observer.disconnect();
        };
    }, []);

    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

    // Swipe logic for mobile
    const [swipeIndex, setSwipeIndex] = useState(0);
    const handleSwipe = (dir) => {
        const maxIndex = achievementscode.length - 1;
        if (dir === 'LEFT' && swipeIndex < maxIndex) setSwipeIndex(swipeIndex + 1);
        if (dir === 'RIGHT' && swipeIndex > 0) setSwipeIndex(swipeIndex - 1);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('LEFT'),
        onSwipedRight: () => handleSwipe('RIGHT'),
        trackMouse: true,
    });
    return (
        <section
            id="achievements"
            ref={ref}
            className={`py-20 px-4 transition-colors duration-500 relative overflow-hidden ${darkTheme ? 'bg-black text-[#FAFAFA] dark' : 'bg-[#f9dcc4] text-[#333333]'}`}
        >

            {/* Space Background Shooting Stars 
            <div className="shooting-stars1">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="shooting-star1"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={`twinkle-${i}`}
                        className="twinkling-star1"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}

            </div>*/}



            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <h2 className={`head-text ${darkTheme ? 'text-[#A8E6CF]' : 'text-[#FF8A80]'}`}>
                        Achievements
                    </h2>
                    <p className={`mt-4 max-w-xl ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                        Highlights of my journey as a software developer and student
                    </p>
                </motion.div>

                {/* Card Grid / Swipe View */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievementscode.map((achievement, index) => (
                        <AchievementCard
                            key={index}
                            index={index}
                            achievement={achievement}
                            darkTheme={darkTheme}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* Mobile Swipe View */}
                <div className="sm:hidden w-full overflow-hidden relative mt-8">
                    <div {...handlers}>
                        <div className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${swipeIndex * 100}%)`, width: `${achievementscode.length * 100}%` }}
                        >
                            {achievementscode.map((achievement, index) => (
                                <div key={index} className="w-full px-4 flex-shrink-0">
                                    <AchievementCard
                                        index={index}
                                        achievement={achievement}
                                        darkTheme={darkTheme}
                                        inView={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 gap-2">
                        {achievementscode.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSwipeIndex(index)}
                                className={`w-3 h-3 rounded-full ${swipeIndex === index ? 'bg-[#FF8A80]' : 'bg-gray-400'} transition-all`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const AchievementCard = ({ achievement, index, darkTheme, inView }) => {
    const rotation = [-12, -4, 4, 12][index % 4];
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateY: rotation }}
            animate={inView ? { opacity: 1, y: 0, rotateY: rotation, z: 20 } : { opacity: 0, y: 50, rotateY: rotation }}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 80
            }}
            whileHover={{ scale: 1.05, rotateY: 0, z: 50, transition: { duration: 0.3 } }}
            className={`relative group min-h-64 flex flex-col justify-between p-6 rounded-xl transform-gpu
                ${darkTheme ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-[#A8E6CF]'
                    : 'bg-white/60 backdrop-blur-sm shadow-xl hover:shadow-[#FF8A80]/20 border border-gray-100'}
                transition-all duration-300`}
            style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateY(${rotation}deg)`
            }}
        >
            <div className={`absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-xl scale-110 ${darkTheme ? 'bg-[#A8E6CF]/20' : 'bg-[#FF8A80]/15'}`} />
            <div className="absolute -top-5 -right-5 z-10">
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 + index, ease: "easeInOut" }}
                    className="text-4xl"
                    style={{ textShadow: darkTheme ? '0 0 15px rgba(168, 230, 207, 0.5)' : '0 0 15px rgba(255, 138, 128, 0.5)' }}
                >
                    {achievement.icon}
                </motion.div>
            </div>
            <div>
                <h3 className={`text-xl font-bold mb-2 ${darkTheme ? 'text-[#A8E6CF]' : 'text-[#f79d65]'}`}>{achievement.title}</h3>
                <motion.p
                    className={`text-3xl font-extrabold ${darkTheme ? 'text-white' : 'text-gray-800'}`}
                    animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }}
                    transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
                >
                    {achievement.value}
                </motion.p>
            </div>
            <p className={`mt-2 text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.description}</p>
            {achievement.details && (
                <motion.div className={`mt-3 text-sm space-y-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`} animate={{ y: 0 }}>
                    {Object.entries(achievement.details).map(([key, val]) => (
                        <p key={key}><strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {Array.isArray(val) ? val.join(", ") : val}</p>
                    ))}
                </motion.div>
            )}
            <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${darkTheme ? 'bg-[#A8E6CF]' : 'bg-[#FF8A80]'}`} />
        </motion.div>
    );
};

export default Achievements;