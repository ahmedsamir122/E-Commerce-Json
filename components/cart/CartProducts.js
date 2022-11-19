import classes from './CartProducts.module.css'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const CartProducts = (props) => {
    const basket = useSelector(state => state.cart.cart);
    const change = useSelector(state => state.cart.change);
    const router = useRouter();
    const cart = change? basket: props.data
    const cartHandler = () => {
        router.push('/')
    } 
        return (
            <div className={classes.main}>
                <div className={classes.top}>
                    <h2>Shopping Cart</h2>
                    <h2>{`No. of Items ${cart.length}`}</h2>
                </div>
                <div className={classes.title}>
                    <p>PRODUCT DETAIL</p>
                    <ul>
                        <li>QUANTITY</li>
                        <li>PRICE</li>
                        <li>TOTAL</li>
                    </ul>
                </div>
                <ul className={classes.cartItems}>
                    {cart.map(item => 
                        <CartItem 
                        key={item.id}
                        description= {item.description}
                        price= {item.price}
                        quantity={item.quantity}
                        id={item.id}
                        img={item.img}
                        />
                    )}
                </ul>
                <button type='button' className='d-block bg-dark text-white pe-2 ps-2 position-absolute bottom-0 start-0 ms-2 mb-2 mt-4' onClick={cartHandler}>Continue shopping</button>
            </div>
        )

}

export default CartProducts