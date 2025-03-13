import React, { useState } from 'react';
import styles from './Signin.module.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [register, setRegister] = useState(false);

    const handleSignin = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            let result = await response.json();
            console.warn(result);

            if (result.msg === 'Login Successful') {
                localStorage.setItem('user-info', JSON.stringify(result));
                toast.success(`Welcome Back ${result.user.name}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                setTimeout(() => {
                    navigate('/');
                }, 4000);
            } else {
                toast.error(result.msg || 'Login failed');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        }
    };

    const handleregister = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phonenumber, email, password })
            });

            let result = await response.json();

            if (result.success) {
                localStorage.setItem('user-info', JSON.stringify(result));
                toast.success(`Welcome ${name}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                setTimeout(() => {
                    navigate('/');
                }, 4000);
            } else {
                toast.error(result.msg || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <>
            <div className='animate__animated animate__fadeInDown grandparent'>
                {!register ? (
                    <div className={styles.papa}>
                        <div className={styles.signUp}>
                            <div>
                                <h1 className={styles.heading}>WELCOME<br />TO REAL ESTATE</h1>
                                <p className={styles.start}>To get started, please register</p>
                                <div className={styles.form}>
                                    <label htmlFor="name">Name:<br />
                                        <input className={styles.input} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </label>
                                    <label htmlFor="phonenumber">Phone Number:<br />
                                        <input className={styles.input} type="text" id="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                                    </label>
                                    <label htmlFor="email">Email:<br />
                                        <input className={styles.input} type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </label>
                                    <label htmlFor="password">Password:<br />
                                        <input className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </label>
                                    <button className={styles.btn} onClick={handleregister}>Register</button>
                                </div>
                                <p className={styles.paragraph}>Forgot Password?</p>
                                <NavLink className={styles.link} onClick={() => setRegister(true)}>Log In</NavLink>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.papa}>
                        <div className={styles.signin}>
                            <div>
                                <h1 className={styles.heading}>WELCOME BACK<br />TO REAL ESTATE</h1>
                                <p className={styles.start}>To get started, please sign in</p>
                                <div className={styles.form}>
                                    <label htmlFor="email">Email:<br />
                                        <input className={styles.input} type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </label>
                                    <label htmlFor="password">Password:<br />
                                        <input className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </label>
                                    <button className={styles.btn} onClick={handleSignin}>Sign In</button>
                                </div>
                                <p className={styles.paragraph}>Forgot Password?</p>
                                <NavLink className={styles.link} onClick={() => setRegister(false)}>Sign Up</NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Single ToastContainer to avoid duplication */}
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
}

export default Signin;
