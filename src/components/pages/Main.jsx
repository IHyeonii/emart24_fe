import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from './Main.module.css';

function Main() {

  const [product, setProduct] = useState([]);

  useEffect (() => {
    fetch("http://localhost:3001/products")
    .then(res => res.json())
    .then(data => {setProduct(data)
      console.log("전체상품 조회", data)
    })
  },[]);

  return (

    <div className={style.main}>
      {product.map ((product) => (
        <Link to={`/detail/${product.id}`} key={product.id}>
        <img src={product.thumbnail} alt='product' />
        <p className={style.font}>{product.name}</p>
        <p className={style.font}>{product.price}원</p>
        </Link>
        ))
      }
    </div>

// return은 하나만 출력해줘서 img랑 p를 감싸줘야함

  );
}

export default Main;