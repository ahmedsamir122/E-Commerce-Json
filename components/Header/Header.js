import Category from "./Category";
import FormHeader from './FormHeader'
import {CgProfile} from "react-icons/cg"
import {BsCart4} from "react-icons/bs"
import classes from './Header.module.css'
import { useRouter } from "next/router";
import { auth, db } from "../../Firebase";
import {   onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSession, signIn} from "next-auth/react"
import { signOut } from "next-auth/react"
import { useSelector } from "react-redux";

const Header = (props) => {
    const [user, setUser]=useState({});
    const {data:session} = useSession()
    const cart = useSelector(state => state.cart.cart)
    const change = useSelector(state => state.cart.change)

    let cartItem = cart.reduce((acc,item) => {
        return item.quantity + acc
    },0)
    let propsItem = props.basket.reduce((acc,item) => {
        return item.quantity + acc
    },0)
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

    },[user])

    const router = useRouter();
    const cartHandler = () => {
        if(session)
        router.push('/cart')
        if(!session)
        router.push('/login')
    }
    const registerHandler = () => {
        router.push('/login')
    }
    const logoutHandler = ()=> {
        signOut()
          console.log('logout')
          
        //   console.log(auth.currentUser.uid)
    }
    return (
        <div className={`sticky-top ${classes.header}`}>
            <div className={classes.logo}>Logo</div>
            {/* <Category /> */}
            <FormHeader />
            {!props.session && <div className={classes.profile} onClick={registerHandler}>
                <span>Register/LogIn</span>                
                <CgProfile className={classes.icon}/>
            </div>}
             {props.session && <div className={classes.profile} onClick={logoutHandler}>
                <span>LogOut</span>                
            </div>}
            <div className={classes.register} onClick={cartHandler}>
                <span className="d-none d-sm-block">Cart</span>                
                <BsCart4 className={classes.icon}/>
               {(props.basket.length || cart.length ) && <span className={classes.notes}>{change? cartItem : propsItem}</span>} 
            </div>
            {props.session && <div className={classes.register} onClick={cartHandler}>
                <span>{`Welcome ${props.session.user.email}`}</span>                
            </div>}
        </div>
    )
}
export default Header;