import classes from './AddItem.module.css'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import ReactDom from 'react-dom'
import { Fragment } from 'react'
import { motion } from 'framer-motion'

const Modal = () =>{
    return (
        <div className={classes.main}>
            <div className={classes.card}>
                <AiOutlineCheckCircle className={classes.icon} />
                <p>New Item is Added</p>
            </div>
            <motion.div className={classes.animi}
            initial={{width:0}}
            animate={{width:'100%'}}
            transition={{duration:'2'}}
            ></motion.div>
        </div>
    )
}
export default Modal;