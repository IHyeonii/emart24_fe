import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CountState } from "../../recoil/CountState";
import CartList from "./CartList";

function Cart() {

  const userId = 1;
  const [cartData, setCartData] = useState();
  const count = useRecoilValue(CountState);

  useEffect(() => {
    fetch(`http://localhost:3001/carts?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log('카트데이터', data)
        setCartData(data)
      })
  }, [userId, count]);

  return (

    <div>
      {
        cartData && cartData.map(cartData => 
            <CartList
              key={cartData.id}
              cartData={cartData}
            />
        )
      }
    </div>
  )
}

export default Cart;