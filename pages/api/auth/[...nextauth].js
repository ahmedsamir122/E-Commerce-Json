import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { auth, db } from '../../../Firebase';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc,updateDoc } from 'firebase/firestore';
export const authOptions = {
    pages:{
        signIn:'/login'
    },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        // credentials: {
        //   username: { label: "Username", type: "text", placeholder: "jsmith" },
        //   password: { label: "Password", type: "password" }
        // },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const {email, password, type} = credentials;
          let user;
          if(type === 'signin'){
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
             user = userCredential.user
          }
          if(type === 'signup'){
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
             user = userCredential.user
             const docRef = doc(db,'users',user.uid);
              const payload = {
                  cart:[]
              };
          }
        if(user){
            return {email:user.email,
              name: null,
              id:user.uid,
              image:null
            };
        }
          else{
            return null
          }
        }
      })
    
  ],
  callbacks:{
    jwt:async ({token, user}) => {
        if(user){
            token.id= user.id
        }
        return token;
    },
    session: ({session, token}) => {
        if(token){
            session.id= token.id;
        }
        return session;
    },
  },
  session:{
    jwt:true
},
  jwt:{
    secret:process.env.NEXTAUTH_SECRET,
    encryption:true
  }
}
export default NextAuth(authOptions)