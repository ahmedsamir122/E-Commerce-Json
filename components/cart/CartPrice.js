import classes from './CartPrice.module.css'
import { useSelector } from 'react-redux';

const CartPrice = () => {
    const cart = useSelector(state => state.cart.cart)
    const price = cart.reduce((acc,item)=>{
        return acc + item.price
    },0)
    const totalQuantity = cart.reduce((acc,item)=>{
        return acc + item.quantity
    },0)
    return (
        <div className={classes.main}>
            <h2>Order Summery</h2>
            <div className='d-flex justify-content-between'>
                <p>price</p>
                <p>{`${price*totalQuantity}$`}</p>
            </div>
            <h2 className='fs-5'>Shipping</h2>
            <input className='mb-4'  />
            <h2 className='fs-5'>PROMO CODE</h2>
            <input className='mb-4' />
            <button className='mb-4 d-block bg-black text-white'>Apply</button>
            <div className='d-flex justify-content-between pt-3 pb-3 border-bottom mb-4'>
                <p>Total Cost</p>
                <p>{`${price*totalQuantity}$`}</p>
            </div>
            <button className='bg-black w-100 d-block text-white pe-2 ps-2 position-absolute bottom-0 start-0 mb-2 mt-4'>CHECK OUT</button>
        </div>
    )
}

export default CartPrice;