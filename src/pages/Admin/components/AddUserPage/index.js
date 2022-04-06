import React, { useState, useEffect, memo } from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import { actAddUserAdmin } from '../../../../store/addUserAdmin/actions';
import { useSelector, useDispatch } from 'react-redux';
import { actListUserAdmin } from "../../../../store/userAdmin/actions";
import { groupID } from 'utils/apiUtils';

const AddUserPage = (props) => {
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
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDt: "",
    maLoaiNguoiDung: "",
    email: "",
    msg: "",
    formValid: false,
    taiKhoanValid: false,
    matKhauValid: false,
    hoTenValid: false,
    soDTValid: false,
    emailValid: false
  });

  const loading = useSelector(state => state.addUserReducer.loading);
  let data = useSelector(state => state.userListAdminReducer.data);

  let arrAccount = data?.map((data) => {
    return data.taiKhoan
  })

  let arrEmail = data?.map((data) => {
    return data.email
  })

  useEffect(() => {
    if(data === null){
      dispatch(actListUserAdmin())
    }
  }, [])


  const changeNameMsg = (name) => {
    switch (name) {
      case "taiKhoan":
        return name = "user name";
      case "matKhau":
        return name = "password";
      case "hoTen":
        return name = "full name";
      case "soDt":
        return name = "phone number";
      case "email":
        return name = "email";
      default:
        break;
    }
  }

  const handleError = (event) => {
    let { name, value } = event.target;

    let { taiKhoanValid, matKhauValid, hoTenValid, soDTValid, emailValid } = errors;

    let msg = value.trim() === "" ? `Please input ${changeNameMsg(name)} !` : "";

    switch (name) {
      case "taiKhoan": {
        taiKhoanValid = msg === "" ? true : false;
        let isExists = arrAccount.includes(value);
        if (value && value.length <= 4) {
          taiKhoanValid = false;
          msg = "User name must be at least 5 characters!"
        }
        if (isExists) {
          taiKhoanValid = false;
          msg = "User name already exists!"
        }
        break;
      }


      case "matKhau": {
        matKhauValid = msg === "" ? true : false;
        if (value && value.length <= 7) {
          matKhauValid = false;
          msg = "Password must be at least 8 characters!"
        }
        break;
      }

      case "hoTen": {
        hoTenValid = msg === "" ? true : false;
        if (value && !value.match("^[a-zA-Z ]*$")) {
          hoTenValid = false;
          msg = "Full name is invalid !"
        }
        break;
      }

      case "soDt": {
        soDTValid = msg === "" ? true : false;
        if (value && !value.match("[0-9]")) {
          soDTValid = false;
          msg = "Phone number is invalid !"
        }
        break;
      }

      case "email": {
        emailValid = msg === "" ? true : false;
        let isExists = arrEmail.includes(value)
        if (value && !value.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
          emailValid = false;
          msg = "Email is invalid !";
        }
        if (isExists) {
          emailValid = false;
          msg = "Email already exists!"
        }
        break;
      }

      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: msg,
      msg,
      taiKhoanValid,
      matKhauValid,
      hoTenValid,
      soDTValid,
      emailValid,
      formValid: taiKhoanValid && matKhauValid && hoTenValid && soDTValid && emailValid
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

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors.formValid) {
      dispatch(actAddUserAdmin(state, props.history));
    }else{
      setErrors({
        
      })
    }
  }

  return (
    <div className='container'>
      <h3 className='mb-5' style={{ marginLeft: 375, fontSize: 30 }}>Create a new user account</h3>
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

          <Input name='taiKhoan' maxLength={20} onChange={handleChange} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.taiKhoan}</p>
        </Form.Item>
        <Form.Item label="Password">
          <Input type="password" name='matKhau' onChange={handleChange} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.matKhau}</p>
        </Form.Item>
        <Form.Item label="Full name">
          <Input name='hoTen' onChange={handleChange} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.hoTen}</p>
        </Form.Item>
        <Form.Item label="Phone number">
          <Input name='soDt' onChange={handleChange} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.soDt}</p>
        </Form.Item>
        <Form.Item label="Email">
          <Input name='email' onChange={handleChange} onBlur={handleError} />
          <p className='text-danger font-italic'>{errors.email}</p>
        </Form.Item>
        <Form.Item label="Type">
          <Select value={state.maLoaiNguoiDung} name="maLoaiNguoiDung" onChange={handleChangeSelect}>
            <Select.Option value="HV">Student</Select.Option>
            <Select.Option value="GV">Ministry</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Submit">
          <button type='submit' className='btn btn-success'>Create</button>
        </Form.Item>
      </Form>
    </div >
  );
};

export default memo(AddUserPage)
