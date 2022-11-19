import classes from './CartItem.module.css'
// import img from '../../public/christophe-rollando-EYo41TTTcWY-unsplash.jpg'
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineMinus} from 'react-icons/ai';
import Image from 'next/image'
import { cartActions } from '../../store';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc,collection, doc,updateDoc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { auth,db } from '../../Firebase';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartItem = (props) => {
    const {data:session} = useSession();
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch(cartActions.addItemToCart({id:props.id}))
    }
    const decrementHandler = () => {
        dispatch(cartActions.removeItemfromCart({id:props.id}))
        
    }
    // useEffect(() => {
        
    //         const id = session.id
    //           const docRef = doc(db, 'users', id)
    //           const payload = {cart}
              
    //          setDoc(docRef, payload)
            
    // },[cart])
    return (
        <div className={classes.main}>
            <div className={classes.info}>
            <Image
          src={props.img}
          alt="" width="100" height="30"  objectFit="cover" className='d-block '
        />
                <div className={classes.imgInfo}>
                    <p>{props.description}</p>
                </div>
            </div>
            <ul>
                <li className={classes.price}>
                    <button type='button'onClick={incrementHandler}><AiOutlinePlus /></button>
                    <input value={props.quantity} />
                    <button type='button' onClick={decrementHandler}><AiOutlineMinus /></button>
                </li>
                <li>{props.price}</li>
                <li>{`${props.quantity*props.price}`}</li>
            </ul>
        </div>
    )
}

export default CartItem;