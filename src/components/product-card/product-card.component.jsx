import './product-card.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({product}) =>{
    const {addItemToCart} = useContext(CartContext);

    const {id,name,imageUrl,price} = product;

    const addProductToCart = ()=>addItemToCart(product);
    
    return(
        <div className='product-card-container' key={id}>
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted'onClick={addProductToCart}>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;