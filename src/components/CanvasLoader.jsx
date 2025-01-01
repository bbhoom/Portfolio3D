// import { Html, useProgress } from '@react-three/drei'
// import React from 'react'

// const CanvasLoader = () => {
//     const { progress } = useProgress()
//     return (
//         <Html as="div" center style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//             <span className='canvas-loader' />
//             <p style={{ fontSize: 14, color: '#F1F1F1', fontWeight: 800, marginTop: 40 }}>
//                 {progress != 0 ? `${progress.toFixed(2)}` : 'Loading ...'}
//             </p>
//         </Html>
//     )
// }

// export default CanvasLoader
import { Html, useProgress } from '@react-three/drei';
import React from 'react';

const CanvasLoader = () => {
    const { progress } = useProgress(); // Access progress from the loader
    return (
        <Html
            as="div"
            center
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <span className="canvas-loader" />
            <p
                style={{
                    fontSize: 14,
                    color: '#F1F1F1',
                    fontWeight: 800,
                    marginTop: 40,
                }}
            >
                {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
            </p>
        </Html>
    );
};

export default CanvasLoader;
