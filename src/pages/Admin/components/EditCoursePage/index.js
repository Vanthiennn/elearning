import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseCatalog } from '../../../../store/courseAdmin/actions';
import { actListUserAdmin } from '../../../../store/userAdmin/actions';
import moment from 'moment';
import { actEditCourseAdmin, actGetInfoCourseAdmin } from '../../../../store/editCourseAdmin/actions';
import { groupID } from 'utils/apiUtils';

const EditCoursePage = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const [selectImg, setSelectImg] = useState('');
  const chooseFile = useRef("");
  const dispatch = useDispatch();
  const { courseCatalog } = useSelector(state => state.listCourseReducer);
  const dataUser = useSelector(state => state.userListAdminReducer.data);
  const courseEdit = useSelector(state => state.editCourseAdminReducer.data);
  console.log();
  const [newCourse, setNewCourse] = useState({
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: groupID.maNhom,
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: ""
  })

  useEffect(() => {
    if (courseEdit) {
      setNewCourse({
        maKhoaHoc: courseEdit.maKhoaHoc,
        biDanh: courseEdit.biDanh,
        tenKhoaHoc: courseEdit.tenKhoaHoc,
        moTa: courseEdit.moTa,
        luotXem: courseEdit.luotXem,
        danhGia: 0,
        hinhAnh: null,
        maNhom: courseEdit.maNhom,
        ngayTao: courseEdit.ngayTao,
        maDanhMucKhoaHoc: courseEdit?.danhMucKhoaHoc.maDanhMucKhoahoc,
        taiKhoanNguoiTao: courseEdit?.nguoiTao.taiKhoan
      })
    }
  }, [courseEdit])

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleSelectCourseCatalog = () => {
    return courseCatalog?.map((catalog, index) => {
      return (
        <Select.Option key={index} value={catalog.maDanhMuc}>{catalog.maDanhMuc}</Select.Option>
      )
    })
  }

  const handleSelectCreatorAccount = () => {
    return dataUser?.map((user, index) => {
      if (user.maLoaiNguoiDung == "GV") {
        return (
          <Select.Option key={index} value={user.taiKhoan}>{user.taiKhoan}</Select.Option>
        )
      }
    })
  }

  const handleChangeImg = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setSelectImg(event.target.result)
    }
    setNewCourse({
      ...newCourse,
      hinhAnh: file
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewCourse({
      ...newCourse,
      [name]: value
    })
  }

  const handleChangeDatePicker = (value) => {
    const dateCreate = moment(value);
    setNewCourse({
      ...newCourse,
      ngayTao: dateCreate
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    for (let key in newCourse) {
      if (key !== "hinhAnh") {
        formData.append(key, newCourse[key])
      } else {
        if (newCourse.hinhAnh !== null) {
          formData.append("file", newCourse.hinhAnh, newCourse.hinhAnh.name)
        }
      }
    }
    dispatch(actEditCourseAdmin(formData, props.history))
  }

  useEffect(() => {
    let { courseCode } = props.match.params;
    dispatch(actGetInfoCourseAdmin(courseCode))
  }, [])

  useEffect(() => {
    if(courseCatalog === null){
      dispatch(getCourseCatalog())
    }
  }, [])

  useEffect(() => {
    if (dataUser === null) {
      dispatch(actListUserAdmin())
    }
  }, [])

  return (
    <>
      <h3 className='mb-4' style={{ marginLeft: 268 }}>Edit course</h3>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Course code">
          <Input disabled name='maKhoaHoc' onChange={handleChange} value={newCourse.maKhoaHoc} />
        </Form.Item>
        <Form.Item label="Course name">
          <Input name='tenKhoaHoc' onChange={handleChange} value={newCourse.tenKhoaHoc} />
        </Form.Item>
        <Form.Item label="Alias">
          <Input name='biDanh' onChange={handleChange} value={newCourse.biDanh} />
        </Form.Item>
        <Form.Item label="Course catalog code" >
          <Select value={newCourse.maDanhMucKhoaHoc} onChange={(event) => {
            setNewCourse({
              ...newCourse,
              maDanhMucKhoaHoc: event
            })
          }}>
            {handleSelectCourseCatalog()}
          </Select>
        </Form.Item>
        <Form.Item label="Creator account" >
          <Select value={newCourse.taiKhoanNguoiTao} onChange={(event) => {
            setNewCourse({
              ...newCourse,
              taiKhoanNguoiTao: event
            })
          }}>
            {handleSelectCreatorAccount()}
          </Select>
        </Form.Item>
        <Form.Item label="Date created">
          <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} value={moment(newCourse.ngayTao, "DD/MM/YYYY")} />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea name='moTa' onChange={handleChange} value={newCourse.moTa} />
        </Form.Item>
        <Form.Item label="Image">
          <input ref={chooseFile} hidden type="file" onChange={handleChangeImg}></input>
          <button style={{ border: "solid 1px" }} type='button' onClick={() => { chooseFile.current.click() }}>
            <img onError={(e) => {
              if (e.target.src) {
                let url = e.target.src;
                e.target.src = `https://elearningnew.cybersoft.edu.vn/${url.slice(39)}`
              }
            }} style={{ width: 100, height: 100 }} src={selectImg === "" ? courseEdit?.hinhAnh : selectImg} alt='Choose image' />
          </button>
        </Form.Item>
        <Form.Item label="Action">
          <button type='submit' className='btn btn-outline-primary'>Update</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCoursePage

