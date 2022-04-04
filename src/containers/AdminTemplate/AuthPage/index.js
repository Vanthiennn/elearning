import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actAuth } from './modules/actions';

export default function AuthPage(props) {
  const loading = useSelector(state => state.authReducer.loading);
  const error = useSelector(state => state.authReducer.error);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: ""
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actAuth(state, props.history))
  }

  const notify = () => {
    return (
      error && (<div className='text-danger mb-3'>{error?.response.data}</div>)
    )
  }

  if(loading){
    return (<div>...loading</div>)
  }

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <form className="login100-form" onSubmit={handleSubmit}>
              <span className="login100-form-title p-b-33">
                Account Login
              </span>
              {notify()}
              <div className="wrap-input100 mb-2">
                <input className="input100" type="text" name="taiKhoan" placeholder="Username" onChange={handleChange} required />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div className="wrap-input100">
                <input className="input100" type="password" name="matKhau" placeholder="Password" onChange={handleChange} required />
                <span className="focus-input100-1" />
                <span className="focus-input100-2" />
              </div>
              <div className="container-login100-form-btn m-t-20">
                <button className="login100-form-btn auth">
                  Sign in
                </button>
              </div>
              <div className="text-center p-t-45 p-b-4">
                <span className="txt1">
                  Forgot
                </span>
                <a href="#" className="txt2 hov1">
                  Username / Password?
                </a>
              </div>
              <div className="text-center">
                <span className="txt1">
                  Create an account?
                </span>
                <a href="#" className="txt2 hov1">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}




