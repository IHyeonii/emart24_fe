import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from './ProductDetail.module.css';
import axios from "axios";
import { useRecoilState } from "recoil";
import { CountState } from "../../recoil/CountState";

function ProductDetail () {

  const {id} = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
    .then(res => setProduct(res.data))
    console.log("상품상세조회", id)

  },[id]);


  const [count, setCount] = useRecoilState(CountState);
  const navigate = useNavigate();
  const userId=1;

  const AddCart = () => {
    fetch('http://localhost:3001/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        userId: userId,
        quantity:1,
        // carts에 추가될 데이터
      })
    })
    .then(res => {
      res.json();
      if(res.ok){
        setCount(count + 1);
        navigate('/cart');
      }
    })
  }


  return( 
    <div className={style.productDetail}>
      <img src={product.thumbnail} alt='상품이미지'/>
      <p className={style.font}>{product.name}</p>
      <p className={style.font}>{product.price}원</p>
      <p>{product.description}</p>
      <p>평점: {product.rating}점</p>
      <button 
      onClick={AddCart}
      className={style.btn}>장바구니</button>
    </div>
  )
}

export default ProductDetail;