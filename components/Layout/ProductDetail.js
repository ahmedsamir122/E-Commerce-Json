import classes from './ProductDetail.module.css'
import Image from 'next/image'
import {AiFillStar} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store'
import {  useState,useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { auth } from '../../Firebase'
import { setDoc,collection, doc,updateDoc ,onSnapshot, getDoc} from 'firebase/firestore';
import { db } from '../../Firebase'
import {useRouter} from "next/router"
import {sendCartData} from '../../store/index';

let initial=true;
const ProductDetail = (props) => {
    const {data:session} = useSession()
    const [user, setUser]=useState({});
    const dispatch = useDispatch();
    const router = useRouter()
    const effectRan = useRef(false)

    const cart = useSelector(state => state.cart.cart)
    const addProductHandler = () => {
              props.onshowModal();
        if(session){
            dispatch(cartActions.addItemToCart({
                id:props.id,
                img:props.img,
                price:props.price,
                description:props.description,
                rate:props.rate,
                quantity:1
            }))

            // const id = session.id
            //   const docRef = doc(db, 'users', id)
            //   const payload = {cart}
              
            //  setDoc(docRef, payload)
            //  console.log(cart)
            //  console.log(session)
           
           
        }else{  
            router.push('/signup')
        }
    
}
const showDetailHandler = () => {
    router.push('/' + props.id)
}



    return (
        <li className={classes.main} >
            <div onClick={showDetailHandler}>
                <div className='position-relative'>
                <Image src={props.img} width="70%" height="40%" layout="responsive" objectFit="contain" className='d-block mb-2 position-absolute' alt=''/>
                </div>
            <p className={classes.description}>{props.description}</p>
            <p className='fw-semibold pt-0 mt-0 pb-0 mb-0'>{`EGP ${props.price}`}</p>
            <p className='pt-0 mt-0 '><span><AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            </span>{`(${props.rate})`}</p>
            </div>
             <button type='button' className={classes.button} onClick= {addProductHandler}>Add To Cart</button>
        </li>
    )
}

export default ProductDetail ;