import Signin from "../components/form/Signin";
import Link from "next/link";
import classes from '../components/form/FormSignin.module.css'
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
function LogIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();
    const [status, setStatus] = useState(true)

    const emailhandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
const signinHandler = async(e) => {
    e.preventDefault();
    const res = await signIn('credentials', {email, password, redirect: false, type:'signin'})
    console.log(res)
    if(res.ok){
        router.push('/')
    }
    
}
const signupHandler = async(e) => {
    e.preventDefault();
    const res = await signIn('credentials', {email, password, redirect: false, type:'signup'})
    console.log(res)
    if(res.ok){
        router.push('/')
    }
    
}

const statusHandler = () => {
    setStatus((prev) => !status)
}
    return (
       
            <form className={classes.form} >
                <h2>Sign in</h2>
                <p>Please type your email and password to log in </p>
                <label>Email</label>
                <input type='email' required onChange={emailhandler}/>
                <label>Password</label>
                <input type='password' required onChange={passwordHandler}/>
                {status && <button onClick={signinHandler}>Sign In</button>}
                {!status && <button onClick={signupHandler}>Sign Up</button>}
            {status && <p>If you dont have an account please <button type="button" onClick={statusHandler}>sign up</button></p>}
            {!status && <p>If you already have an account please <button type="button" onClick={statusHandler}>sign in</button> here</p>}
            </form>
    
    )
}

export default LogIn;