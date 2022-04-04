import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from 'antd/lib/transfer/search';
import { NavLink } from "react-router-dom"
import { FormOutlined } from "@ant-design/icons";
import { actFetchListCourseUnsubs, actGetKeyword, actRegisterCourse } from '../../../../store/subscribeByUser/actions';

export default function SubscribeByUserPage(props) {
  const { loading } = useSelector(state => state.courseListUnsubsReducer);
  let { data } = useSelector(state => state.courseListUnsubsReducer);
  const { error } = useSelector(state => state.courseListUnsubsReducer);
  const { keyword } = useSelector(state => state.courseListUnsubsReducer);

  const { account } = props.match.params;

  const dispatch = useDispatch();

  const renderListCourse = () => {
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
    dispatch(actFetchListCourseUnsubs(account))
  }, [])

  const columns = [
    {
      title: 'Course code',
      dataIndex: 'maKhoaHoc',
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
      title: 'Course name',
      dataIndex: 'tenKhoaHoc',
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
      render: (text, course) => {
        return <>
          <Button style={{ border: "none" }} onClick={() => {
            if (window.confirm(`Do you want to register user ${account} in the course ${course.maKhoaHoc} ?`)) {
              dispatch(actRegisterCourse({ maKhoaHoc: course.maKhoaHoc, taiKhoan: account }, account))
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
      <h3 className='mb-3'>List course unregistered of user <span className='text-danger'>{account}</span></h3>
      <div className='mb-3' style={{ display: "flex" }}>
        <Search placeholder="Search Account" onSearch={onSearch} enterButton="Search" onChange={handleChange} />
      </div>
      <div className='text-center mb-3'>
        <NavLink className="mr-5" to="/admin/user-list"><button className='btnBackTo'>Back to user list</button></NavLink>
        <NavLink className="ml-5" to={`/admin/user-list/approval/${account}`}><button className='btnGoTo'>Go to approval register</button></NavLink>
      </div>
      <Table columns={columns} dataSource={renderListCourse()} onChange={onChange} />
    </div>
  )
}

