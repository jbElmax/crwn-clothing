import { Fragment,useContext } from "react";
import { Outlet,Link } from "react-router-dom";

import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg';
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";
import {NavigationContainer,LogoContainer,NavLinksContainer,NavLink} from'./navigation.styles'
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";


const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
            <CrwnLogo className="logo"/>
        </LogoContainer> 

        <NavLinksContainer>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ): (
                  <NavLink className="nav-link" to='/auth'>SIGN IN</NavLink>
                )
              
            }
            <CartIcon />

        </NavLinksContainer>
        {isCartOpen && <CartDropdown />} 
      </NavigationContainer>     
      <Outlet/>
    </Fragment>
  )
}

export default Navigation;