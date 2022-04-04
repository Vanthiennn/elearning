import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from 'antd/lib/transfer/search';
import { NavLink } from "react-router-dom"
import { CloseOutlined } from "@ant-design/icons";
import { actFetchListCourseRegistered, actGetKeyword, actUnsubsCourseAdmin } from './modules/actions';

export default function UnsubscribeByUserPage(props) {
  const { loading } = useSelector(state => state.courseListRegisteredReducer);
  let { data } = useSelector(state => state.courseListRegisteredReducer);
  const { error } = useSelector(state => state.courseListRegisteredReducer);
  const { keyword } = useSelector(state => state.courseListRegisteredReducer);

  const { account } = props.match.params;

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
    const {value} = event.target
    dispatch(actGetKeyword(value))
  }

  useEffect(() => {
    dispatch(actFetchListCourseRegistered({taiKhoan: account}))
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
      title: 'Unsubscibe',
      dataIndex: 'Unsubscibe',
      width: "25%",
      render: (text, course) => {
        return <>
          <Button style={{ border: "none" }} onClick={() => {
            if(window.confirm(`Do you want to remove the course ${course.maKhoaHoc} from account ${account}?`)){
              dispatch(actUnsubsCourseAdmin({maKhoaHoc: course.maKhoaHoc, taiKhoan: account}, {taiKhoan: account}))
            }
          }} ><CloseOutlined style={{ color: "red", fontSize: 20 }} /></Button>
        </>
      }
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
  }
  const onSearch = value => console.log(value);
  return (
    <div>
      <h3 className='mb-3'>List of registered courses of account <span className='text-danger'>{account}</span></h3>
      <div className='mb-3' style={{ display: "flex" }}>
        <Search placeholder="Search Account" onSearch={onSearch} enterButton onChange={handleChange} />
      </div>
      <div className='text-center mb-3'>
        <NavLink className="mr-5" to="/admin/user-list"><button className='btnBackTo'>Back to user list</button></NavLink>
      </div>
      <Table columns={columns} dataSource={renderListUser()} onChange={onChange} />
    </div>
  )
}



