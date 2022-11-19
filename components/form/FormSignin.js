import classes from './FormSignin.module.css'
import Link from 'next/link';
import { useRef } from 'react';
import { auth } from '../../Firebase';
import { useRouter } from 'next/router';
import {  signInWithEmailAndPassword } from "firebase/auth";

const FormSignin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();

    const signinHandler =(e) => {
        e.preventDefault();
        const email= emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    router.push('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    }
    return (
            <form className={classes.form} onSubmit={signinHandler}>
                <h2>Sign in</h2>
                <p>Please type your email and password to log in </p>
                <label>Email</label>
                <input type='email' required ref={emailRef}/>
                <label>Password</label>
                <input type='password' required ref={passwordRef}/>
                <button >Sign In</button>
            <p>If you dont have an account please <Link href='/signup'>sign up</Link></p>
            </form>
    )
}

export default FormSignin;