import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const useArmAnimation = (nodes) => {
    const rightArmRef = useRef();
    const leftArmRef = useRef();
    const headRef = useRef();
    const rightLegRef = useRef(); // Reference for the right leg
    const leftLegRef = useRef();
    const hipRef = useRef();
    const animationRef = useRef({ time: 0 });

    useEffect(() => {
        // Initialize arm references and store initial positions
        if (nodes.RightArm) {
            rightArmRef.current = nodes.RightArm;
            rightArmRef.current.initialRotation = new THREE.Euler(
                0.4,          // Neutral raise/lower
                1.4, // Rotate forward
                -Math.PI / 3 // Elbow bend
            );

            rightArmRef.current.rotation.set(
                rightArmRef.current.initialRotation.x,
                rightArmRef.current.initialRotation.y,
                rightArmRef.current.initialRotation.z
            );
        }

        if (nodes.LeftArm) {
            leftArmRef.current = nodes.LeftArm;
            leftArmRef.current.initialRotation = new THREE.Euler(
                1.1, // Slightly forward
                0.2, // Close to body
                -0.2 // Natural position
            );

        }
        if (nodes.Head) {
            headRef.current = nodes.Head;
            headRef.current.initialRotation = new THREE.Euler(
                0.2, // Look slightly downward (negative X rotation)
                0,    // Neutral Y rotation
                0     // Neutral Z rotation
            );
        }
        if (nodes.RightLeg) {
            rightLegRef.current = nodes.RightLeg;
            rightLegRef.current.initialRotation = new THREE.Euler(
                0, // Neutral position for right leg
                0.2, // Slightly outward for natural stance
                0
            );
        }

        if (nodes.LeftLeg) {
            leftLegRef.current = nodes.LeftLeg;
            leftLegRef.current.initialRotation = new THREE.Euler(
                0, // Neutral position for left leg
                -0.3, // Slightly inward to bring closer to the right leg
                0
            );
        }

        // Initialize hip reference
        if (nodes.Hips) {
            hipRef.current = nodes.Hips;
            hipRef.current.initialRotation = new THREE.Euler(
                0, // Neutral position for hips
                0.2, // Tilt the hips to the left to create the leaning effect
                0
            );
        }



        // Set initial positions
        if (rightArmRef.current) {
            rightArmRef.current.rotation.set(
                rightArmRef.current.initialRotation.x,
                rightArmRef.current.initialRotation.y,
                rightArmRef.current.initialRotation.z
            );
        }

        if (leftArmRef.current) {
            leftArmRef.current.rotation.set(
                leftArmRef.current.initialRotation.x,
                leftArmRef.current.initialRotation.y,
                leftArmRef.current.initialRotation.z
            );
        }
        if (headRef.current) {
            // Add subtle head nodding motion
            const nod = Math.sin(animationRef.current.time * 2) * 0.02; // Subtle movement
            headRef.current.rotation.set(
                headRef.current.initialRotation.x + nod,
                headRef.current.initialRotation.y,
                headRef.current.initialRotation.z
            );
        }
        if (hipRef.current) {
            hipRef.current.rotation.set(
                hipRef.current.initialRotation.x,
                hipRef.current.initialRotation.y,
                hipRef.current.initialRotation.z
            );
        }
        if (rightLegRef.current) {
            rightLegRef.current.rotation.set(
                rightLegRef.current.initialRotation.x,
                rightLegRef.current.initialRotation.y,
                rightLegRef.current.initialRotation.z
            );
        }

        if (leftLegRef.current) {
            leftLegRef.current.rotation.set(
                leftLegRef.current.initialRotation.x,
                leftLegRef.current.initialRotation.y,
                leftLegRef.current.initialRotation.z
            );
        }

    }, [nodes]);

    useFrame((state, delta) => {
        animationRef.current.time += delta;

        if (rightArmRef.current) {
            // Create a waving motion along the Y-axis
            const wave = Math.sin(animationRef.current.time * 3) * 0.4;

            rightArmRef.current.rotation.set(
                rightArmRef.current.initialRotation.x + wave, // Subtle forearm movement
                rightArmRef.current.initialRotation.y, // Side-to-side waving
                rightArmRef.current.initialRotation.z // Elbow stays bent
            );
        }


        if (leftArmRef.current) {
            // Subtle natural movement for left arm
            const subtle = Math.sin(animationRef.current.time) * 0.02;
            leftArmRef.current.rotation.set(
                leftArmRef.current.initialRotation.x + subtle,
                leftArmRef.current.initialRotation.y,
                leftArmRef.current.initialRotation.z
            );

        }

    });
};