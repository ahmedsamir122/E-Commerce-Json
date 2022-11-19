import { BsSearch } from 'react-icons/bs'
import classes from './FormHeader.module.css'
const FormHeader = () => {
    return <form className={classes.form}>
                <input type='text' className={classes.input}/>
                <button className={classes.button}><BsSearch className={classes.icon} /></button>
            </form>
}

export default FormHeader;