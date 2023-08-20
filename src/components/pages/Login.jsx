import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/loginState";
import style from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const setLogin = useSetRecoilState(loginState);

//2, 3, 11번 Header로 이동

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePw = (e) => {
    setPw(e.target.value)
  }

  const handleLogin = (e) => {
      const url = `http://localhost:3001/users?email=${email}&&password=${pw}`
      console.log(url)
      e.preventDefault();
      axios({
        method: 'get',
        url: url,
        responseType: 'stream'
      })
      .then(res => {
        console.log(res.data)
        if(res.data.length > 0) {
          alert("환영합니다.")
          setLogin(true)
          navigate('/')
        } else {
          alert("아이디와 비밀번호를 확인해주세요")
        }
      })
      .catch(err => {
        console.log(err)
      })
     
  };

  
  return (
  
    <form className={style.pageWrap} onSubmit={handleLogin}>
      
      <div className={style.box}>
        <div className={style.center}>
          <div>이메일 주소</div>
          <input type='email' onChange={handleEmail}/>

          <div>비밀번호</div>
          <input type='password'  onChange={handlePw}/>


        <button type="submit" className={style.btn}>로그인</button>
        </div>

        <div className={style.bottom}>
          <Link to={'/join'}>회원가입</Link>
          <div>비밀번호 찾기</div>
        </div>

      </div>
      
    </form>



  )
}

export default Login;