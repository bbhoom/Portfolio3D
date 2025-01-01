import * as THREE from 'three';

// Create a custom wave animation
const waveAnimation = new THREE.AnimationClip('Wave', 3, [
    // Right Arm rotation
    new THREE.QuaternionKeyframeTrack(
        'RightArm.quaternion',
        [0, 0.5, 1, 1.5, 2, 2.5, 3],
        new Float32Array([
            // Initial pose
            0, 0, 0, 1,
            // Raise arm
            0.3, 0, 0.3, 0.9,
            // Wave right
            0.3, 0, 0.4, 0.9,
            // Wave left
            0.3, 0, 0.2, 0.9,
            // Wave right
            0.3, 0, 0.4, 0.9,
            // Wave left
            0.3, 0, 0.2, 0.9,
            // Return to initial
            0, 0, 0, 1
        ])
    ),
    // Right Forearm rotation
    new THREE.QuaternionKeyframeTrack(
        'RightForeArm.quaternion',
        [0, 0.5, 1, 1.5, 2, 2.5, 3],
        new Float32Array([
            // Initial pose
            0, 0, 0, 1,
            // Bend elbow
            0.4, 0, 0, 0.9,
            // Wave right
            0.4, 0.1, 0, 0.9,
            // Wave left
            0.4, -0.1, 0, 0.9,
            // Wave right
            0.4, 0.1, 0, 0.9,
            // Wave left
            0.4, -0.1, 0, 0.9,
            // Return to initial
            0, 0, 0, 1
        ])
    ),
    // Right Hand rotation
    new THREE.QuaternionKeyframeTrack(
        'RightHand.quaternion',
        [0, 0.5, 1, 1.5, 2, 2.5, 3],
        new Float32Array([
            // Initial pose
            0, 0, 0, 1,
            // Rotate wrist
            0.2, 0, 0, 0.9,
            // Wave right
            0.2, 0.1, 0, 0.9,
            // Wave left
            0.2, -0.1, 0, 0.9,
            // Wave right
            0.2, 0.1, 0, 0.9,
            // Wave left
            0.2, -0.1, 0, 0.9,
            // Return to initial
            0, 0, 0, 1
        ])
    )
]);

export default waveAnimation;