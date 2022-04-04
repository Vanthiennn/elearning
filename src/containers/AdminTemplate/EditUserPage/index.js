import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actEditUserAdmin, actGetInfoUserAdmin } from './modules/actions';
import { groupID } from 'utils/apiUtils';

export default function EditUserPage(props) {
  const userEdit = useSelector(state => state.editUserReducer.userEdit);
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDt: "",
    maLoaiNguoiDung: "HV",
    email: "",
    maNhom: groupID.maNhom
  })

  const [errors, setErrors] = useState({
    matKhau: "",
    hoTen: "",
    soDt: "",
    msg: ""
  });


  const changeNameMsg = (name) => {
    switch (name) {
      case "matKhau":
        return name = "password";
      case "hoTen":
        return name = "full name";
      case "soDt":
        return name = "phone number";
      default:
        break;
    }
  }

  const handleError = (event) => {
    let { name, value } = event.target;

    let msg = value.trim() === "" ? `Please input ${changeNameMsg(name)} !` : "";

    setErrors({
      ...errors,
      [name]: msg,
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const handleChangeSelect = (event) => {
    setState({
      ...state,
      maLoaiNguoiDung: event
    })
  }

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    if(state.matKhau && state.hoTen && state.soDt){
      if(window.confirm(`Do you want to update account ${props.match.params.account} ?`)){
        dispatch(actEditUserAdmin(state, props.history))
        // console.log(state);
      }
    }
  }

  

  useEffect(() => {
    let { account } = props.match.params
    dispatch(actGetInfoUserAdmin(account))
  }, [])

  useEffect(() => {
    if (userEdit) {
      setState({
        taiKhoan: userEdit[0]?.taiKhoan,
        matKhau: userEdit[0]?.matKhau,
        hoTen: userEdit[0]?.hoTen,
        soDt: userEdit[0]?.soDt,
        maLoaiNguoiDung: userEdit[0]?.maLoaiNguoiDung,
        email: userEdit[0]?.email,
        maNhom: groupID.maNhom
      })
    }
  }, [userEdit])
  return (
    <div className='container'>
      <h3 className='mb-5' style={{ marginLeft: 277 }}>Edit user</h3>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 10,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="User name">
          <Input disabled name='taiKhoan' maxLength={20} onChange={handleChange} value={state.taiKhoan} onBlur={handleError} />
        </Form.Item>
        <Form.Item label="Password">
          <Input type="password" name='matKhau' onChange={handleChange} value={state.matKhau} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.matKhau}</p>
        </Form.Item>
        <Form.Item label="Full name">
          <Input name='hoTen' onChange={handleChange} value={state.hoTen} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.hoTen}</p>
        </Form.Item>
        <Form.Item label="Phone number">
          <Input name='soDt' onChange={handleChange} value={state.soDt} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.soDt}</p>
        </Form.Item>
        <Form.Item label="Email">
          <Input disabled name='email' onChange={handleChange} value={state.email} onBlur={handleError} />
        </Form.Item>
        <Form.Item label="Type">
          <Select value={state.maLoaiNguoiDung} name="maLoaiNguoiDung" onChange={handleChangeSelect}>
            <Select.Option value="HV">Student</Select.Option>
            <Select.Option value="GV">Ministry</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Submit">
          <button type='submit' className='btn btn-success'>Update</button>
        </Form.Item>
      </Form>
    </div >
  )
}
