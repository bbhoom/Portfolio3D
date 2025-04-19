import React, { Suspense } from 'react';
import CanvasLoader from "../components/CanvasLoader";

import { myProjects } from '../constants';
import { useState } from "react";
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import DemoComp from '../components/DemoComp';

const projectCount = myProjects.length;

const Projects = () => {
    const [pindex, setpindex] = useState(0);
    const currentProject = myProjects[pindex];

    const handleNavigation = (direction) => {
        setpindex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    return (
        <section className='c-space my-20' id='work'>
            <p className='head-text'>My Projects</p>
            <div className='grid lg:grid-cols-2 grid-cols-1 mt-14 gap-5 w-full'>
                <div className='flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200'>
                    <div className='absolute top-0 right-0'>
                        <img src={currentProject.spotlight} alt="spotlight" className='w-full h-96 object-cover rounded-xl' />
                    </div>
                    <div className='p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg' style={myProjects[0].logoStyle}>
                        <img src={currentProject.logo} alt="logo" className='w-10 h-10 shadow-sm' />
                    </div>
                    <div className='flex flex-col gap-5 text-gray-800 dark:text-white my-5'>
                        <p className='text-black-300 dark:text-white text-2xl font-semibold animatedText'>{currentProject.title}</p>
                        <p className='animatedText'>{currentProject.desc}</p>
                        <p className='animatedText'>{currentProject.subdesc}</p>
                    </div>
                    <div className='flex items-center justify-between flex-wrap-5'>
                        <div className='flex items-center gap-3'>
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className='tech-logo'>
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>
                        <a className='flex items-center gap-2 cursor-pointer text-white-100 dark:text-white-600' href={currentProject.href} target='_blank' rel='noreffer'>
                            <p>Check Live Site</p>
                            <img src="assets/arrow-up.png" alt="uparrow" className='w-3 h-3' />
                        </a>
                    </div>
                    <div className='flex justify-between items-center mt-7'>
                        <button className='arrow-btn' onClick={() => handleNavigation('previous')}>
                            <img src="assets/left-arrow.png" alt="left" className='w-4 h-4' />
                        </button>
                        {/* Counter Display */}
                        <div className='text-center text-black-300 dark:text-white text-sm'>
                            {`Project ${pindex + 1} of ${projectCount}`}
                        </div>
                        <button className='arrow-btn' onClick={() => handleNavigation('next')}>
                            <img src="assets/right-arrow.png" alt="right" className='w-4 h-4' />
                        </button>
                    </div>
                </div>
                <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full'>
                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComp texture={currentProject.texture} />
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default Projects;
