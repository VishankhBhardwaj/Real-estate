import React from 'react'
import { useState } from 'react'
import styles from './Signin.module.css'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
const Signin = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const handleSignin = async () => {
        let response= await fetch('http://localhost:3000/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        let result=await response.json();
        console.warn(result);
        if(result.msg==='Login Successfull'){
            localStorage.setItem('user-info',JSON.stringify(result))
            alert(`Welcome Back ${result.user.name}`)
            navigate('/')

        }
        else {
            alert(result.msg || 'Login failed');
        }
        
    }
    const handleregister = async () => {
        try {
          let response = await fetch('http://localhost:3000/signUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              phonenumber,
              email,
              password
            })
          });
      
          let result = await response.json(); // Await response.json()
      
          console.log(result); // Log the actual response
      
          if (result) {
            localStorage.setItem('user-info', JSON.stringify(result));
            alert(`Welcome ${name}`);
            navigate('/')
          }
        } catch (error) {
          console.error("Error during registration:", error);
        }
      };
      
    const[register,setRegister]=useState(false)
return (
    <>
    {!register ? <div className={styles.papa}>
        <div className={styles.signUp}>
           <div>
           <h1 className={styles.heading}>
                    WELCOME<br />TO REAL ESTATE
            </h1>
            <p className={styles.start}>To get started,pls register</p>
            <div className={styles.form}>
                <label htmlFor="name">Name: <br />
                        <input className={styles.input} type="text" id="name"  value={name} onChange={(e)=>setName(e.target.value)}  />
                </label>
                <label htmlFor="phonenumber">PhoneNumber: <br />
                        <input className={styles.input} type="text" id="phonenumber"  value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}  />
                </label>
                <label htmlFor="email">Email: <br />
                        <input className={styles.input} type="text" id="email"  value={email} onChange={(e)=>setEmail(e.target.value)}  />
                </label>
                <label htmlFor="password">Password: <br />
                        <input className={styles.input} type="password" id="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  />
                </label>
                <button className={styles.btn} onClick={handleregister}>Register</button>
            </div>
            <p className={styles.paragraph}>Forgot Password?</p>
            <NavLink className={styles.link} onClick={()=>setRegister(true)}>LogIn</NavLink>
           </div>
    </div>
    </div> : <div className={styles.papa}>
        <div className={styles.signin}>
           <div>
           <h1 className={styles.heading}>
                    WELCOME BACK<br />TO REAL ESTATE
            </h1>
            <p className={styles.start}>To get started,pls sign in</p>
            <div className={styles.form}>
                <label htmlFor="email">Email: <br />
                        <input className={styles.input} type="text" id="email"  value={email} onChange={(e)=>setEmail(e.target.value)}  />
                </label>
                <label htmlFor="password">Password: <br />
                        <input className={styles.input} type="password" id="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  />
                </label>
                <button className={styles.btn} onClick={handleSignin}>Sign In</button>
            </div>
            <p className={styles.paragraph}>Forgot Password?</p>
            <NavLink className={styles.link} onClick={()=>setRegister(!register)}>SignUp</NavLink>
           </div>
    </div>
    </div>}
    </>
)
}

export default Signin