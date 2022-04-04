import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from 'antd/lib/transfer/search';
import { NavLink } from "react-router-dom"
import { FormOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { actFetchListUserUnsubs, actGetKeyword, actRegisterCourse } from '../../../../store/subscribeByCourse/actions';

export default function SubscribeByCoursePage(props) {
  const { loading } = useSelector(state => state.userListUnsubsReducer);
  let { data } = useSelector(state => state.userListUnsubsReducer);
  const { error } = useSelector(state => state.userListUnsubsReducer);
  const { keyword } = useSelector(state => state.userListUnsubsReducer);

  const [courseId, SetCourseId] = useState({
    maKhoaHoc: props.match.params.idCourse
  })

  const dispatch = useDispatch();

  const renderListUser = () => {
    return data?.filter((val) => {
      if (keyword == "") {
        return val
      } else if (val.taiKhoan.toLowerCase().includes(keyword.toLowerCase())) {
        return val
      }
    }).map((user, index) => {
      return { ...user, key: index }
    })
  }

  const handleChange = (event) => {
    const { value } = event.target
    dispatch(actGetKeyword(value))
  }

  useEffect(() => {
    dispatch(actFetchListUserUnsubs(courseId))
  }, [])

  const columns = [
    {
      title: 'Account',
      dataIndex: 'taiKhoan',
      width: "25%",
      sorter: (a, b) => {
        let accountA = a.taiKhoan.toLowerCase().trim();
        let accountB = b.taiKhoan.toLowerCase().trim();
        if (accountA > accountB) {
          return 1
        }
        return -1
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Full name',
      dataIndex: 'hoTen',
      width: "25%",
      sorter: (a, b) => {
        let fullNameA = a.hoTen.toLowerCase().trim();
        let fullNameB = b.hoTen.toLowerCase().trim();
        if (fullNameA > fullNameB) {
          return 1
        }
        return -1
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Alias',
      dataIndex: 'biDanh',
      width: "25%",
    },
    {
      title: 'Subscibe',
      dataIndex: 'Subscibe',
      width: "25%",
      render: (text, user) => {
        return <>
          <Button style={{ border: "none" }} onClick={() => {
            if (window.confirm(`Do you want to enroll in the course ${props.match.params.idCourse} ?`)) {
              dispatch(actRegisterCourse({ maKhoaHoc: props.match.params.idCourse, taiKhoan: user.taiKhoan }, courseId))
            }
          }} ><FormOutlined style={{ color: "green", fontSize: 20 }} /></Button>
        </>
      }
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
  }
  const onSearch = value => console.log(value);
  return (
    <div>
      <h3 className='mb-3'>List of users who have not yet enrolled in the course <span className='text-danger'>{props.match.params.idCourse}</span></h3>
      <div className='mb-3' style={{ display: "flex" }}>
        <Search placeholder="Search Account" onSearch={onSearch} enterButton onChange={handleChange} />
      </div>
      <div className='text-center mb-3'>
        <NavLink className="mr-5" to="/admin/course-list"><button className='btnBackTo'>Back to course list</button></NavLink>
        <NavLink className="ml-5" to={`/admin/course-list/approval/${props.match.params.idCourse}`}><button className='btnGoTo'>Go to approval register</button></NavLink>
      </div>
      <Table columns={columns} dataSource={renderListUser()} onChange={onChange} />
    </div>
  )
}

