import './product-card.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { InvertedButton } from '../button/button.styles';

const ProductCard = ({product}) =>{
    const {addItemToCart} = useContext(CartContext);

    const {id,name,imageUrl,price} = product;

    const addProductToCart = ()=>addItemToCart(product);
    
    return(
        <div className='product-card-container' key={id}>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <InvertedButton onClick={addProductToCart}>Add to Cart</InvertedButton>
        </div>
    )
}

export default ProductCard;