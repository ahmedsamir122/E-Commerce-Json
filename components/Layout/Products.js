
import ProductDetail from './ProductDetail';
import classes from './Products.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store'
import { useEffect, useState,useRef, Fragment } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../Firebase'
import { setDoc,collection, doc,updateDoc ,onSnapshot, getDoc} from 'firebase/firestore';
import { db } from '../../Firebase'
import {getCartData , sendCartData} from '../../store/index'
import Modal from '../modal/AddItem'
import Portal from '../modal/Portal'

let initial= true;
const Products = (props) => {
    const cart = useSelector(state => state.cart.cart)
    const change = useSelector(state => state.cart.change)
    const dispatch = useDispatch();
    const effectRan = useRef(false)
    const [showModal, setShowModal]= useState(false)
    
    const showModalHandler = () => {
        setShowModal(true)
        setTimeout(()=>{
            setShowModal(false)
        } ,2000)
    }
    useEffect(()=>{
        if(!effectRan.current){
            if(props.session){
              console.log('session')
            
            // const docRef = doc(db, 'users', id)
            // getDoc(docRef).then((docSnap) => {
            // dispatch(cartActions.replaceCart(docSnap.data().cart || ['test']))
            // console.log(docSnap.data().cart) 
            // console.log('after')    
            //                                   })
            const id = props.session.id
            dispatch(getCartData( id, db))
            console.log('dis')

      }else{
        console.log('no session')
      }
      return() => {
        effectRan.current=true;
      }
        }
    
      },[dispatch,cart,props])
    
      useEffect(() => {
        if(initial){
            initial=false
            return;
        }
        console.log('up')
            if(props.session){
            //     setTimeout(() => {
                   
            // //     const docRef = doc(db, 'users', id)
            // //     const payload = {cart}
                
            // //    setDoc(docRef, payload)
            //    console.log(cart)
            //     }, 6000);
                
            // }
            const id = props.session.id
            if(change){
                dispatch(sendCartData(cart, id, db))
            }
            
              
        // return () => {
        //     effectRan.current=true
        //     console.log('shit')
        // } 
            }
    },[cart,props.session,dispatch, change])

    return(
    <Fragment>
        <ul className={classes.main}>
            {props.shops.map(item => 
                <ProductDetail
                id={item.id}
                key={item.id}
                img={item.thumbnail}
                description ={item.description}
                price= {item.price}
                rate= {item.rating}
                session={props.session}
                onshowModal= {showModalHandler}
                />
            )}
        </ul>

        {showModal && <Portal>
                            <Modal />
                        </Portal>  }     
    </Fragment>
        
    )
}

export default Products;