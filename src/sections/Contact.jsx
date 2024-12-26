import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import './Contact.css';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
    const formRef = useRef();
    const { alert, showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbxknH_qe6TvN82NPUjxFwXRJGu2bKE1kn_Ec2iJRZEWx8Yd3NIrmsJ0HYxW1DjntlgKeg/exec';

        try {
            // Show loading message
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
            // Hide success alert after 1 minute
            setTimeout(() => {
                hideAlert(false);
            }, 6000);
            // Refresh textboxes
            setForm({
                name: '',
                email: '',
                message: '',
            });

            // Hide loading message after 1 minute
            setTimeout(() => {
                document.getElementById('loading-message').style.display = 'none';
                hideAlert(false);
            }, 60000);
        } catch (error) {
            setLoading(false);
            console.error(error);
            showAlert({
                show: true,
                text: "I didn't receive your message 😢",
                type: 'danger',
            });

            // Hide loading message after 1 minute
            setTimeout(() => {
                document.getElementById('loading-message').style.display = 'none';
            }, 60000);
        }
    };

    return (
        <section className="c-space my-20" id="contact">
            {alert.show && <Alert {...alert} />}

            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

                <div className="contact-container">
                    <h3 className="head-text mt-20">Let's talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to
                        life, I’m here to help. Feel free to Contact me for any Quieries.
                    </p>
                    <form ref={formRef} className="form mt-8" onSubmit={handleSubmit}>
                        <input className="input mt-4" name="name" placeholder="Name" type="text" onChange={handleChange} value={form.name} />
                        <input className="input mt-2" name="email" placeholder="Email" type="email" onChange={handleChange} value={form.email} />
                        <textarea
                            className="input mt-2"
                            name="message"
                            placeholder="Message"
                            style={{ width: '350px', height: '100px' }}
                            onChange={handleChange}
                            value={form.message}
                        />
                        <div className="login-with mt-4">
                            <ul className="example-2">
                                <li className="icon-content">
                                    <a href="https://linkedin.com/" target='_blank' aria-label="LinkedIn" data-social="linkedin">
                                        <div className="filled" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16" xmlSpace="preserve">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" fill="currentColor" />
                                        </svg>
                                    </a>
                                    <div className="tooltip">LinkedIn</div>
                                </li>
                                <li className="icon-content">
                                    <a href="https://www.github.com/" target='_blank' aria-label="GitHub" data-social="github">
                                        <div className="filled" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-github" viewBox="0 0 16 16" xmlSpace="preserve">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" fill="currentColor" />
                                        </svg>
                                    </a>
                                    <div className="tooltip">GitHub</div>
                                </li>
                            </ul>
                        </div>
                        <button id="button" className="button-confirm move-up">Hit Send→</button>
                        <button type="submit" className="submit-button" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    <span id="loading-message" className="msg" style={{ display: 'none' }}>Please wait, it's loading...</span>
                    <span id="sent-message" className="msg" style={{ display: 'none' }}>Message sent successfully!</span>
                </div>
            </div>
        </section>
    );
};

export default Contact;
