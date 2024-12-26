
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from '@react-three/drei';
import HackerRoom from "../components/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
// import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js"
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/cube";
import Rings from "../components/Rings.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 786 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    // const x = useControls('HackerRoom', {positionX: {value: 2.5,min: -10,max: 10,},
    // positionY: {value: 2.5,min: -10,max: 10,},positionZ: {value: 2.5,min: -10,max: 10,},
    //     rotationX: {value: 2.5,min: -10,max: 10,},
    //     rotationY: {value: 2.5,min: -10,max: 10,},
    //     rotationZ: {value: 2.5,min: -10,max: 10,},
    //     scale: {value: 1,min: 0.1,max: 10}})

    return (
        <section className='min-h-screen w-full flex flex-col relative' id="home">
            <div className='w-full mx-auto flex flex-col sm:mt-36 mt-14 c-space gap-3'>
                <p className='sm:text-3xl text-2xl font-medium text-white text-center fornt-genralsans'>Hi,I am Bhoomika<span className='waving-hand'>👋</span></p>
                <p className='hero_tag text-gray_gradient'>Software Developer and Student</p>
            </div>
            <div className='w-full h-full absolute inset-0'>
                {/* <Leva />   for roatation of 3d model */}
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0, -Math.PI, 0]} />
                        </HeroCamera>
                        <group>
                            <Target position={sizes.targetPosition} />
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />
                        </group>
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute bottom-7 left-0 right-0 w-full  z-10 c-space">
                <a href="#contact" className="w-fit">
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
        </section>
    )
}

export default Hero