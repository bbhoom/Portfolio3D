import React, { useState, useEffect } from 'react';

const Slider = ({ images, radius = 180 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [images.length]);

    const len = images.length || 0;
    const angle = 2 * Math.PI / len;

    return (
        <div className="w-80 h-[480px] perspective-1000">
            <div
                className="relative w-full h-full preserve-3d transition-transform duration-[1200ms] ease-[cubic-bezier(0.68,0.08,0.27,0.96)]"
                style={{
                    transform: `translateZ(${-radius}px) rotateY(${-currentIndex * angle}rad)`
                }}
            >
                {images.map((image, index) => {
                    const indexAngle = index * angle;
                    const z = Math.cos(indexAngle) * radius;
                    const x = Math.sin(indexAngle) * radius;

                    return (
                        <div
                            key={image}
                            className={`
                absolute inset-0 m-auto box-border w-full h-full 
                flex items-center justify-center 
                font-mono text-4xl font-light
                rounded bg-gray-800 text-white 
                transition-opacity duration-[1400ms] ease-in-out
                ${index === currentIndex ? 'opacity-100 shadow-lg' : 'opacity-30'}
              `}
                            style={{
                                transform: `translateZ(${z}px) translateX(${x}px) rotateY(${indexAngle}rad)`
                            }}
                        >
                            {image}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};



export default Slider;