// import CartData from "../components/cart/CartData";
import { useEffect, useRef, useState, Fragment} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { auth, db } from '../Firebase';
import { setDoc,collection, doc,updateDoc, getDoc } from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth'
import {cartActions} from '../store/index';
import { useSession } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(() => import("../components/cart/CartData"), { ssr: false });
import {getCartData, sendCartData} from '../store/index'

let initial= true;
function Cart (props) {
    const cart = useSelector(state => state.cart.cart)
    const change = useSelector(state => state.cart.change)
    const dispatch = useDispatch()
    const { data: session } = useSession()
    const effectRan = useRef(false)
    const [loading , setLoading] = useState(false)
  
    useEffect(()=>{
        
        // onAuthStateChanged(auth, (currentUser) => {
    
            // const id = currentUser.uid
            // const docRef = doc(db, 'users', id)
            // getDoc(docRef).then((docSnap) => {
            // dispatch(cartActions.replaceCart(props.data.cart|| []))
            // console.log(props.data)
            if(props.izin){
              const id = props.izin.id
            if(change){
                dispatch(sendCartData(cart, id, db))
            }
            }
            
        // })
            // setUser(currentUser)
    
        // })
        
      },[dispatch,props.data,change, cart, props.izin])
    // useEffect(() => {
    //     if(initial){
    //         initial= false;
    //         return;
    //     }
    //         onAuthStateChanged(auth, (currentUser) => {
    //             const id = currentUser.uid
    //               const docRef = doc(db, 'users', id)
    //               const payload = {cart}
                
    //              setDoc(docRef, payload)
    //             })
    //     },[cart])

    useEffect(()=>{
      setLoading(true)
      if(!effectRan.current){
          if(props.izin){
            console.log('session')
          
          // const docRef = doc(db, 'users', id)
          // getDoc(docRef).then((docSnap) => {
          // dispatch(cartActions.replaceCart(docSnap.data().cart || ['test']))
          // console.log(docSnap.data().cart) 
          // console.log('after')    
          //                                   })
          const id = props.izin.id
          dispatch(getCartData( id, db))
          console.log('dis')

    }else{
      console.log('no session')
    }
    return() => {
      effectRan.current=true;
    }
      }
  setLoading(false)
    },[dispatch,cart,props])

    console.log(props.data.cart)
    return (
      <Fragment>
        <DynamicComponentWithNoSSR data= {props.data.cart}/>
      </Fragment>
       
    )            
}

export default Cart;

export async function getServerSideProps(context){

    const session = await unstable_getServerSession(context.req, context.res, authOptions);
     console.log(session);
     const id = session.id
     console.log(id);
            const docRef = doc(db, 'users', id);
            const data = await getDoc(docRef);
            console.log(data.data())
            if (!session) {
                return {
                  redirect: {
                    destination: '/',
                    permanent: false,
                  },
                }
              }
            
              return {
                props: {
                  izin: session,
                  data:data.data()
                },
              }

}