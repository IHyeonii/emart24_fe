import React from "react";
import { useState, useEffect } from "react";
import { CountState } from "../../recoil/CountState";
import { useRecoilState } from "recoil";
import style from './CartList.module.css';
import trash from '../images/trash.png';


function CartList ({cartData}) {

    const [cartCount ,setCartCount] = useRecoilState(CountState);

    const [cart, setCart] = useState({
      id: cartData.id,
      quantity: cartData.quantity,
      thumbnail:'',
      name:'',
      price: 0,
      des: '장바구니 상품'
    });


  useEffect(()=>{
    fetch(`http://localhost:3001/products/${cartData.productId}`)
    .then( res => res.json())
    .then( data => {
      console.log('가져올 상품 번호', cartData.productId)
      console.log('가져온 상품 정보', data)
        setCart({ 
        ...cart,
        thumbnail: data.thumbnail,
        name: data.name,
        price:data.price,
      })
    })
  }, []);

  const cartUpdate = (qty) => {
    fetch(`http://localhost:3001/carts/${cart.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quantity: qty
      })
    }).then(res => res.json())
    .then(data => {
      console.log('수정된 데이터', data)
    }).catch(err => {
      console.log(err)
    })
  }

  const handleCartDelete = () => {
    fetch(`http://localhost:3001/carts/${cart.id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(data => {
      setCartCount(cartCount - 1)
      console.log('삭제된 데이터', data)
    }).catch(err => {
      console.log(err)
    })
  }

  //...cart: 3가지 유지하면서 바꿀건 바꿀 수 있게


  const QtyDecre = () => {
    if(cart.quantity === 1) return alert('최소 수량은 1개 입니다.');
    setCart({...cart, quantity: cart.quantity - 1})
    cartUpdate(cart.quantity - 1)
  }

  const QtyIncre = () => {
    setCart({...cart, quantity: cart.quantity + 1})
    cartUpdate(cart.quantity + 1)
  }

  return(
    
    <div className={style.cartList}>
      {
        cart &&
        <>
          <div className={style.itemWrap}>
            <div className="item">
              <img src={cart.thumbnail} alt='상품이미지'
              width={150} height={150} />
            </div>

            <div className={style.title}>
              <h4>{cart.name}</h4>
              <p>가격: {cart.price * cart.quantity}원</p>

              <div className={style.qty}>
                <button 
                className={style.btn}
                onClick={QtyDecre}>-</button>
              
                <p>{cart.quantity}</p>
                
                <button
                className={style.btn}
                onClick={QtyIncre}>+</button>

                <button 
                className={style.trash}
                onClick={handleCartDelete}>
                  <img src={trash} alt='삭제' width={30} height={30} />
                </button>
              </div>
            </div>
          </div>

            


        </>
        
      } 
    
    </div>
    

  )
}

export default CartList;