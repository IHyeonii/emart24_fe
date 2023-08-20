import React from "react";
import { Link } from "react-router-dom";
import style from './Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import cart from '../images/cart.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/loginState";
import logout from '../images/logout.png';

function Header() {

  const [login, setLogin] = useRecoilState(loginState);

  return (
    <div className={style.headerWrap}>
      <div>
        <Link to='cart'>
          <img src={cart} alt='cart' width={30} height={30}/>
        </Link>
      </div>

    <div className={style.logo}>
      <Link to ='/'>
        <img src={logo} alt='logo' width={98} height={20} /></Link>
    </div>
    {
      login ?
      <div>
        <button
        className={style.logout}
        onClick={() => setLogin(false)}>
          <img src={logout} alt='logout' width={30} height={30} />
        </button>
      </div>
      :
      <div className={style.login}>
        <Link to ='login'>
        <img src={user} alt='login' width={30} height={30} /></Link>
      </div>
    }
    

    </div>

  )
}

export default Header;