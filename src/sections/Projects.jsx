import React, { Suspense, useEffect, useState } from 'react';
import CanvasLoader from "../components/CanvasLoader";
import { myProjects } from '../constants';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import DemoComp from '../components/DemoComp';

const projectCount = myProjects.length;

const Projects = () => {
    const [pindex, setpindex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const currentProject = myProjects[pindex];

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleNavigation = (direction) => {
        setpindex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    // Mobile-specific settings
    const getMobileSettings = () => {
        if (isMobile) {
            return {
                scale: 1.5, // Slightly smaller scale for mobile
                position: [0, -2, 0], // Adjusted position
                ambientIntensity: Math.PI * 0.8, // Slightly dimmer ambient light
                directionalPosition: [8, 8, 4], // Closer directional light
                cameraSettings: {
                    fov: 60, // Wider field of view for mobile
                    maxPolarAngle: Math.PI / 2.2,
                    enableZoom: true, // Allow pinch zoom on mobile
                    enablePan: false, // Disable panning to prevent conflicts
                    minDistance: 3,
                    maxDistance: 8
                }
            };
        }
        return {
            scale: 2,
            position: [0, -3, 0],
            ambientIntensity: Math.PI,
            directionalPosition: [10, 10, 5],
            cameraSettings: {
                fov: 75,
                maxPolarAngle: Math.PI / 2,
                enableZoom: false,
                enablePan: true,
                minDistance: 5,
                maxDistance: 15
            }
        };
    };

    const settings = getMobileSettings();

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
                        <a className='flex items-center gap-2 cursor-pointer text-white-100 dark:text-white-600' href={currentProject.href} target='_blank' rel='noreferrer'>
                            <p>Check Live Site</p>
                            <img src="assets/arrow-up.png" alt="uparrow" className='w-3 h-3' />
                        </a>
                    </div>
                    <div className='flex justify-between items-center mt-7'>
                        <button className='arrow-btn' onClick={() => handleNavigation('previous')}>
                            <img src="assets/left-arrow.png" alt="left" className='w-4 h-4' />
                        </button>
                        <div className='text-center text-black-300 dark:text-white text-sm'>
                            {`Project ${pindex + 1} of ${projectCount}`}
                        </div>
                        <button className='arrow-btn' onClick={() => handleNavigation('next')}>
                            <img src="assets/right-arrow.png" alt="right" className='w-4 h-4' />
                        </button>
                    </div>
                </div>

                {/* Enhanced Canvas container with better mobile styling */}
                <div className={`border border-black-300 bg-black-200 rounded-lg ${isMobile
                    ? 'h-[500px] min-h-[500px]' // Much taller container for mobile
                    : 'h-96 md:h-full'
                    }`}>
                    <Canvas
                        camera={{
                            fov: settings.cameraSettings.fov,
                            position: isMobile ? [0, 0, 3] : [0, 0, 5] // Closer camera on mobile
                        }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance", // Better for mobile GPUs
                        }}
                        dpr={isMobile ? [1, 2] : [1, 2]} // Limit pixel ratio on mobile for performance
                    >
                        <ambientLight intensity={settings.ambientIntensity} />
                        <directionalLight
                            position={settings.directionalPosition}
                            intensity={isMobile ? 0.8 : 1}
                            castShadow={!isMobile} // Disable shadows on mobile for performance
                        />

                        {/* Add hemisphere light for better mobile lighting */}
                        {isMobile && (
                            <hemisphereLight
                                args={['#ffffff', '#444444', 0.6]}
                            />
                        )}

                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group
                                    scale={settings.scale}
                                    position={settings.position}
                                    rotation={[0, -0.1, 0]}
                                >
                                    <DemoComp texture={currentProject.texture} />
                                </group>
                            </Suspense>
                        </Center>

                        <OrbitControls
                            maxPolarAngle={settings.cameraSettings.maxPolarAngle}
                            enableZoom={settings.cameraSettings.enableZoom}
                            enablePan={settings.cameraSettings.enablePan}
                            minDistance={settings.cameraSettings.minDistance}
                            maxDistance={settings.cameraSettings.maxDistance}
                            // Mobile-specific touch settings
                            touches={{
                                ONE: isMobile ? 2 : 0, // Rotate with one finger on mobile
                                TWO: isMobile ? 1 : 0  // Pan with two fingers on mobile
                            }}
                            // Smooth controls for mobile
                            enableDamping={true}
                            dampingFactor={0.1}
                            rotateSpeed={isMobile ? 0.8 : 1}
                            zoomSpeed={isMobile ? 0.8 : 1}
                            // Start closer on mobile to show bigger model
                            target={isMobile ? [0, -1, 0] : [0, 0, 0]}
                        />
                    </Canvas>
                </div>
            </div>

            {/* Mobile-specific instructions */}
            {isMobile && (
                <div className="text-center mt-4 text-sm text-gray-500">
                    <p>Pinch to zoom • Drag to rotate • Two fingers to pan</p>
                </div>
            )}
        </section>
    );
};

export default Projects;