import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Search from 'antd/lib/transfer/search';
import { NavLink } from "react-router-dom"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { actFetchListCoursaWaitApproval, actGetKeyword, actRegisterCourse, actUnsubsCourseAdmin } from 'store/approvalCourse/actions';

export default function ApprovalCoursePage(props) {
  let { data } = useSelector(state => state.courseListWaitApprovalReducer);
  const { keyword } = useSelector(state => state.courseListWaitApprovalReducer);

  const {account} = props.match.params;

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
    dispatch(actFetchListCoursaWaitApproval({taiKhoan: account}))
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
      title: 'Approval',
      dataIndex: 'Approval',
      width: "12.5%",
      render: (text, course) => {
        return <>
          <Button style={{ border: "none" }} onClick={() => {
            if (window.confirm(`Would you like to add the course ${course.maKhoaHoc} to account ${account}?`)) {
              dispatch(actRegisterCourse({maKhoaHoc: course.maKhoaHoc, taiKhoan: account}, {taiKhoan: account}))
            }
          }} ><CheckOutlined style={{ color: "green", fontSize: 20 }} /></Button>
        </>
      }
    },
    {
      title: 'Cancel',
      dataIndex: 'Cancel',
      width: "12.5%",
      render: (text, course) => {
        return <>
          <Button style={{ border: "none" }} onClick={() => {
            if (window.confirm(`Do you want to unsubscribe from the course ${course.maKhoaHoc} ?`)) {
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
      <h3 className='mb-3'>List of courses waiting for approval in user <span className='text-danger'>{account}</span></h3>
      <div className='mb-3' style={{ display: "flex" }}>
        <Search placeholder="Search Account" onSearch={onSearch} enterButton onChange={handleChange} />
      </div>
      <div className='text-center mb-3'>
        <NavLink className="mr-5" to={`/admin/user-list/subscribe/${account}`}><button className='btnBackTo'>Back to register page</button></NavLink>
        <NavLink className="ml-5" to={`/admin/user-list/unsubscribe/${account}`}><button className='btnGoTo'>Go to registered page</button></NavLink>
      </div>
      <Table columns={columns} dataSource={renderListCourse()} onChange={onChange} />
    </div>
  )
}

