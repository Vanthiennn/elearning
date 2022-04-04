import React,{useState} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { actRegister } from 'store/register/actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGooglePlus,faFacebook,faTwitter} from '@fortawesome/free-brands-svg-icons'
import "./style.scss"

export default function Register(props) {
 
  const error = useSelector((state)=> state.registerReducer.error)

  const dispatch = useDispatch()
  const [state,setState] = useState({
    taiKhoan:"",
    matKhau:"",
    hoTen:"",
    soDT:"",
    maLoaiNguoiDung:"HV",
    maNhom:"GP05",
    email:"",
  })

  
  const handleOnchange = (event) => {
    const {name,value} = event.target ;
    setState({
      ...state,
      [name] : value
    })
    console.log(state)
  }
  

  const handlelRegister = (event) => {
    event.preventDefault();
    dispatch(actRegister(state,props.history))
  }

  const noti = () => {
    return error && <div className='alert alert-danger'>{error.response.data}</div>
  }

  return <div className='loginUser'>
  <div className="container">
<div className="d-flex justify-content-center h-100">
  <div className="card" style={{height:550}}>
    <div className="card-header">
      <h3>Register</h3>
      <div className="d-flex justify-content-end social_icon">
        <span><FontAwesomeIcon icon={faGooglePlus}></FontAwesomeIcon></span>
        <span><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></span>
        <span><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></span>               
      </div>
    </div>
    {noti()}
    <div className="card-body">
      <form onSubmit={handlelRegister} >
            <div className="form-group">
                <span className='text-white'>Username</span>
                <input type="text" className="form-control" name="taiKhoan" placeholder='Please enter a username' onChange={handleOnchange}  />
            </div>
            <div className="form-group">
                <span className='text-white'>PassWord</span>
                <input type="password" className="form-control" name="matKhau" placeholder='Please enter a password' onChange={handleOnchange} />
            </div>
            <div className="form-group mb-5">
                <span className='text-white'>Full Name</span>
                <input type="text" className="form-control" name="hoTen" placeholder='Please enter a fullname' onChange={handleOnchange}/>
            </div>
            <div className="form-group">
                <span className='text-white'>Phone Number</span>
                <input  type="text"className="form-control" name="soDt" placeholder='Please enter a phone number' onChange={handleOnchange}/>
            </div>
            <div className="form-group">
                <span className='text-white'>Email</span>
                <input type="email" className="form-control" name="email" placeholder='Please enter a email' onChange={handleOnchange}/>
            </div>
            <div className="form-group text-right">
                <button  type="submit" className="btn btn-register login_btn">Register</button>
            </div>
      </form>
    </div>
  </div>
</div>
</div>
</div>
}
