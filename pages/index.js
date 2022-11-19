import React, { Fragment,useEffect, useState, useRef } from "react";
import Header from "../components/Header/Header";
import Slider from '../components/Layout/Slider'
import Products from "../components/Layout/Products";
import { auth, db } from '../Firebase';
import { setDoc,collection, doc,updateDoc ,onSnapshot, getDoc} from 'firebase/firestore';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";
import { async } from "@firebase/util";
// import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

// let initial=true;

function HomePage (props) {
  const [user, setUser] = useState({})
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart)
  const effectRan = useRef(false)
  // const {data: session}= useSession();

  
  // useEffect(()=>{
  //   if(!effectRan.current){
  //     console.log('session')
  //     if(props.izin){
  //       const id = props.izin.id
  //       const docRef = doc(db, 'users', id)
  //       getDoc(docRef).then((docSnap) => {
  //       dispatch(cartActions.replaceCart(docSnap.data().cart || []))
  //       console.log(docSnap.data().cart)     
  //                                         })
  // }else{
  //   console.log('no session')
  // }
  // return() => {
  //   effectRan.current=true;
  // }
  //   }

  // },[dispatch,props.session])

//   useEffect(() => {
//     if(effectRan.current){
//         effectRan.current=false
//         return;
//     }
//         if(session){
//             const id = session.id
//             const docRef = doc(db, 'users', id)
//             const payload = {cart}
            
//            setDoc(docRef, payload)
//         }
//           console.log('effect')         
//     // }
//     // return () => {
//     //     effectRan.current=true
//     //     console.log('shit')
//     // } 

// },[cart,session])
console.log(props.basket)

  return <Fragment>
            <Header session={props.izin} basket = {props.basket} />
            <Slider />
            <Products shops={props.products} session={props.izin}/>
          </Fragment>
   
}
export async function getServerSideProps(context){
  let products;
  let session;
  let cart;
  try{
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    if(!response.ok){
        throw new Error('Fetching data failed')
    }
     products = data.products;
      session = await unstable_getServerSession(context.req, context.res, authOptions);
      console.log(session)
      const id = session.id
        const docRef = doc(db, 'users', id)
        const cartData = await getDoc(docRef)
        cart = cartData.data().cart
}catch(error){
    console.log(error.message)
}


  return{
    props: {
      products: products,
      izin:session,
      basket:cart,
    }
  }
}

export default HomePage;


