import { Suspense, useRef, useState } from 'react';
import Alert from '../components/Alert.jsx';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader.jsx';
import Developer from '../components/Developer.jsx';
import { Canvas } from "@react-three/fiber";
import useAlert from '../hooks/useAlert.js';
import './Contact.css';

const Contact = () => {
    const formRef = useRef();
    const { alert, showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        if (!form.name || !form.email || !form.message) {
            showAlert({
                show: true,
                text: 'Please fill in all fields',
                type: 'danger',
            });
            setTimeout(() => {
                hideAlert();
            }, 3000);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!validateForm()) return;

        setLoading(true);
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxknH_qe6TvN82NPUjxFwXRJGu2bKE1kn_Ec2iJRZEWx8Yd3NIrmsJ0HYxW1DjntlgKeg/exec';

        try {
            document.getElementById('loading-message').style.display = 'block';

            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(formRef.current),
            });
            setLoading(false);
            showAlert({
                show: true,
                text: 'Thank you for your message 😃',
                type: 'success',
            });
            setTimeout(() => {
                hideAlert();
            }, 6000);
            setForm({
                name: '',
                email: '',
                message: '',
            });

            setTimeout(() => {
                document.getElementById('loading-message').style.display = 'none';
                hideAlert();
            }, 60000);
        } catch (error) {
            setLoading(false);
            console.error(error);
            showAlert({
                show: true,
                text: "I didn't receive your message 😢",
                type: 'danger',
            });

            setTimeout(() => {
                document.getElementById('loading-message').style.display = 'none';
            }, 60000);
        }
    };

    return (
        <section className='c-space my-20' id='contact'>
            <p className='head-text'>Let's talk</p>

            <div className='grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full'>
                {/* Left Column - Canvas */}
                <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full' style={{
                    // backgroundColor: '#7e7e7e',
                    backgroundImage: 'url("public/assets/bg2.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <Canvas >
                        <ambientLight intensity={7} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <directionalLight position={[10, 10, 10]} intensity={1} />
                        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
                        <Suspense fallback={<CanvasLoader />}>
                            <Developer position-y={-3} scale={3} />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Right Column - Contact Form */}
                <div className='flex flex-col gap-5 relative sm:p-10 py-10 px-5'>
                    {alert.show && <Alert {...alert} />}

                    <form ref={formRef} className="form" onSubmit={handleSubmit}>
                        <div className="title">
                            Get in Touch
                            <p><span>Whether you're looking to build a new website, improve your existing platform, or bring a unique project to life, I'm here to help.</span></p>
                        </div>

                        <input
                            className="input"
                            name="name"
                            placeholder="Name"
                            type="text"
                            onChange={handleChange}
                            value={form.name}
                        />
                        <input
                            className="input"
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={handleChange}
                            value={form.email}
                        />
                        <textarea
                            className="input"
                            name="message"
                            placeholder="Message"
                            onChange={handleChange}
                            value={form.message}
                            style={{ height: '100px' }}
                        />

                        <div className="login-with">
                            <ul className="example-2">
                                <li className="icon-content">
                                    <a href="https://linkedin.com/" target='_blank' aria-label="LinkedIn" data-social="linkedin">
                                        <div className="filled" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                        </svg>
                                    </a>
                                    <div className="tooltip">LinkedIn</div>
                                </li>
                                <li className="icon-content">
                                    <a href="https://www.github.com/" target='_blank' aria-label="GitHub" data-social="github">
                                        <div className="filled" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                        </svg>
                                    </a>
                                    <div className="tooltip">GitHub</div>
                                </li>
                            </ul>
                        </div>

                        <button type="submit" className="button-confirm" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message →'}
                        </button>
                    </form>

                    <span id="loading-message" className="msg text-center block mt-4" style={{ display: 'none' }}>
                        Please wait, it's loading...
                    </span>
                    <span id="sent-message" className="msg text-center block mt-4" style={{ display: 'none' }}>
                        Message sent successfully!
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Contact;