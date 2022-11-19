import classes from './FormSignup.module.css';
import Link from 'next/link';
import { useRef } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../Firebase';
import { collection, setDoc, doc,updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const FormSignin = () => {
    const router = useRouter()
    const emailRef = useRef();
    const passwordRef = useRef();
    const signupHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value
        const password = passwordRef.current.value
        // const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    const docRef = doc(db,'users',user.uid);
    const payload = {
        cart:[]
    };
    setDoc(docRef, payload);
    router.push('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
        console.log('signup')
        console.log(db)
    }

    return (
            <form className={classes.form} onSubmit={signupHandler}>
                <h2>Sign up</h2>
                <p>Please type your email and password to log in </p>
                <label>Email</label>
                <input type='email' ref= {emailRef} required/>
                <label>Password</label>
                <input type='password' ref={passwordRef} required/>
                <button>Sign Up</button>
            <p>If you already have an account please <Link href='/signin'>sign in</Link> here</p>
            </form>
    )
}

export default FormSignin;