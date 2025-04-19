
import { useState, useEffect } from 'react';

const Footer = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    // Check theme on component mount and when it changes
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkTheme(isDark);
        };

        // Check initial theme
        checkTheme();

        // Set up an observer to detect theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);
    return (
        <section className={`c-space pt-7 pb-3 border-t flex justify-between items-center flex-wrap gap-2 ${!isDarkTheme ? "border-black-500" : "border-cream-500"}`}>
            <div className='text-white-600 flex gap-2'>
                <p>Developed By</p>

                <p>Bhoomika K S</p>
            </div>
            <div className=' flex gap-1'>
                <div className='social-icon'>
                    <a href="https://www.github.com/"><img src="assets/github.svg" alt="github" className='w-6 h-6' /></a>
                </div>
                <div className='social-icon'>
                    <a href="https://linkedin.com/"><img src="assets/linkedin.svg" alt="linkdn" className='w-6 h-6' /></a>
                </div>
                <div className='social-icon'>
                    <a href="mailto:ksbhoomika43@gmail.com"><img src="assets/email.svg" alt="github" className='w-6 h-6' /></a>
                </div>
            </div>
            <p className="text-white-600">© 2024 All Rights Reserved.</p>
        </section>
    )
}

export default Footer
