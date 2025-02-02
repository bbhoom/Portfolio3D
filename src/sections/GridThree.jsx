import React from 'react';
import PixelCard from './PixelCard';

const GridThree = () => {
    return (
        <div className="xl:col-span-2 xl:row-span-3">
            <PixelCard
                variant="pink"
                className="w-full h-full"
            >
                <div className="w-full h-full grid-container bg-transparent">
                    <img
                        src="assets/grid3.png"
                        alt="grid-3"
                        className="w-full sm:h-[266px] h-fit object-contain"
                    />
                    <div>
                        <p className="grid-headtext">My Passion for Coding</p>
                        <p className="grid-subtext">
                            I am passionate about leveraging technology to solve real-world problems,
                            whether through AI-powered healthcare tools, intuitive budget apps, or
                            interactive games. My achievements include winning Blitz'24 for an AI
                            healthcare chatbot and contributing to patents for an ambulance booking
                            app and a skincare smart mirror. I enjoy combining development and design
                            to create impactful solutions.
                        </p>
                    </div>
                </div>
            </PixelCard>
        </div>
    );
};

export default GridThree;