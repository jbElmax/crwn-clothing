import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import BaseButton from '../button/button.component';
import {CartDropdownContainer,CartItems} from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';


const CartDropdown = ()=>{
    const{cartItems} = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckoutHandler = ()=>{
        navigate('/checkout');
    }
    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ?    
                    (cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)): <span>Your cart is empty</span>
                }
            </CartItems>
            <BaseButton onClick={goToCheckoutHandler}>GO TO CHECKOUT</BaseButton>
        </CartDropdownContainer>
    )
}

export default CartDropdown;