import CategoryItem from "./CategoryItem";
import classes from "./Category.module.css"
import React, { Fragment,useEffect, useState } from "react";
import { auth, db } from '../../Firebase';
import { setDoc,collection, doc,updateDoc ,onSnapshot, getDoc} from 'firebase/firestore';
import { useSelector } from "react-redux";
import { onAuthStateChanged} from 'firebase/auth'


let initial =true;
const Category = () => {



    return (
            <select name ='category' className={classes.select}>
                <option selected disabled className={classes.option}>category</option>
                <CategoryItem />
            </select>
            )
    }


export default Category ;