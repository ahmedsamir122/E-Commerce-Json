import classes from './CartData.module.css'
import CartProducts from './CartProducts';
import CartPrice from './CartPrice';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { auth, db } from '../../Firebase';
import { setDoc,collection, doc,updateDoc, getDoc } from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth'
import {cartActions} from '../../store/index'
import { propTypes } from 'react-bootstrap/esm/Image';


let initial = true;
const CartData = (props) => {
    const dispatch = useDispatch()
    const router = useRouter();
    
    const shoppingHandler = () => {
        router.push('/')
    }
    const cart = useSelector(state => state.cart.cart)
    console.log(props.data.cart)
    console.log(cart)
    // useEffect(()=>{
        
    //     onAuthStateChanged(auth, (currentUser) => {
    
    //         const id = currentUser.uid
    //         const docRef = doc(db, 'users', id)
    //         getDoc(docRef).then((docSnap) => {
    //         dispatch(cartActions.replaceCart(docSnap.data().cart || []))
    //         console.log(docSnap.data().cart)
    //     })
    //         // setUser(currentUser)
    
    //     })
        
    //   },[dispatch])

    //   useEffect(() => {
    //     onAuthStateChanged(auth, (currentUser) => {
    //         const id = currentUser.uid
    //           const docRef = doc(db, 'users', id)
    //           const payload = {cart}
    //           if(initial){
    //             initial= false;
    //             return;
    //         }
    //          setDoc(docRef, payload)
    //         })
    // },[cart])
    

    return (
        <section className={classes.main}>
            {props.data.length && <div className={classes.cart}>
                <CartProducts data={props.data}/>
                <CartPrice />
            </div>}
            {!props.data.length && <div className={classes.empty}>
                <p >Your Cart is empty</p>
                <button type='button' className='d-block m-auto bg-dark text-light p-3 fs-3' onClick={shoppingHandler}>Continue Shopping</button>
                </div>}
        </section>
    )
}

export default CartData ;