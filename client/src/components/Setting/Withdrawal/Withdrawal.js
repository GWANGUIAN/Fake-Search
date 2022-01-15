import React from 'react';
import './Withdrawal.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Withdrawal({setConfirmWithdrawal}) {

    const {themeColor} = useSelector(((state)=>state.loginReducer))

    const submitWithrawal = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_API}/users/withdrawal`,{
            withCredentials: true
        }).then(()=>{
            window.location.replace('/')
        })
    }

  return (
      <div className='withdrawal-container'>
          <div className='box-confirm'>
          <div className='text-withdrawal'>탈퇴 하시겠습니까?</div>
          <div className='text-addinfo'>탈퇴 후, 계정 정보가 삭제되며,<br/>모든 데이터는 복구가 불가능 합니다.</div>
          <div className='box-btn-withdrawal'>
        <button
          className='btn-withdrawal-cancel'
          onClick={() => {
            setConfirmWithdrawal(false);
          }}
        >
          취소
        </button>
        <button
          className='btn-withdrawal-accept'
          style={{
            backgroundColor: themeColor,
          }}
          onClick={submitWithrawal}
        >
          확인
        </button>
          </div>
      </div>
      </div>
  )
}