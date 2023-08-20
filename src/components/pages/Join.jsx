import React, { useState } from "react";
import style from './Join.module.css';
import { useNavigate } from "react-router-dom";

function Join() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePw = (e) => {
    setPw(e.target.value)
  }

  const addAccount = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pw,
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data) {
        alert("가입을 환영합니다.")
        navigate('/login')
      }
    })

  };


  return(
    <form className={style.page} onSubmit={addAccount}>
      
      <div className={style.box}>
        <div>이름</div>
        <input type='name' onBlur={handleName}
        />

        <div>이메일</div>
        <input
        type='email' onBlur={handleEmail}
        />

        <div>비밀번호</div>
        <input
        type='password' onBlur={handlePw}
        />

        <div>
          <button className={style.btn} type="submit">등록</button>
        </div>
      </div>
    </form>
  )
}

export default Join;