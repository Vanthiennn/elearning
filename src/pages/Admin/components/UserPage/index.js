import React, { useEffect, useState, memo } from 'react';
import { Button, Table, Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actDeleteUserAdmin, actListUserAdmin } from 'store/userAdmin/actions';
import { NavLink } from "react-router-dom"
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined, UsergroupDeleteOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Input, Space } from 'antd';
import Loading from 'components/Loading';

function UserPage(props) {
  const { loading } = useSelector(state => state.userListAdminReducer);
  let { data } = useSelector(state => state.userListAdminReducer);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Account',
      dataIndex: 'taiKhoan',
      width: "10%",
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
      width: "20%",
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
      title: 'Email',
      dataIndex: 'email',
      width: "25%",
    },
    {
      title: 'Phone Number',
      dataIndex: 'soDt',
      width: "10%",
    },
    {
      title: 'Type',
      dataIndex: 'maLoaiNguoiDung',
      align: "center",
      width: "10%",
    },
    {
      title: 'Subscribe',
      dataIndex: 'Subscribe',
      width: "5%",
      align: "center",
      render: (text, user) => {
        return <>
          <NavLink to={`/admin/user-list/subscribe/${user.taiKhoan}`}><UsergroupAddOutlined style={{ color: "green", fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Unsubscribe',
      dataIndex: 'Unsubscribe',
      width: "5%",
      align: "center",
      render: (text, user) => {
        return <>
          <NavLink to={`/admin/user-list/unsubscribe/${user.taiKhoan}`}><UsergroupDeleteOutlined style={{ color: "red", fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Approval',
      dataIndex: 'Approval',
      align: "center",
      width: "5%",
      render: (text, user) => {
        return <>
          <NavLink to={`/admin/user-list/approval/${user.taiKhoan}`}><SafetyCertificateOutlined style={{ fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      align: "center",
      width: "5%",
      render: (text, user) => {
        return <>
          <NavLink to={`/admin/user-list/edit-user/${user.taiKhoan}`} ><EditOutlined style={{ color: "blue", fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      align: "center",
      width: "5%",
      render: (text, user) => {
        return <>
          <Button onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${user.taiKhoan}?`)) {
              dispatch(actDeleteUserAdmin(user.taiKhoan, props.history));
            }
          }} style={{ border: "none" }} ><DeleteOutlined style={{ fontSize: 20 }} /></Button>
        </>
      }
    },
  ];

  const renderListUser = () => {
    if (searchInput.length >= 1) {
      return filteredResults.map((user, index) => {
        return { ...user, key: index }
      })
    } else {
      return data?.map((user, index) => {
        return { ...user, key: index }
      })
    }
  }

  const handleChange = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== "") {
      const filteredData = data?.filter((item) => {
        return Object.values(item.hoTen).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const { Search } = Input;

  function onChange(pagination, filters, sorter, extra) {
  }

  const onSearch = value => {
    console.log(value);
  };


  useEffect(() => {
    if (data === null) {
      dispatch(actListUserAdmin())
    }
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      <h2 style={{fontSize: 30}} className='mb-3'>User Management</h2>
      <div className='mb-3' style={{ display: "flex" }}>
        <Button style={{ backgroundColor: "#73d13d" }} className='mr-5 text-white' ><NavLink to="/admin/user-list/add-user">Add User</NavLink></Button>
        <Search placeholder="Search Name" onSearch={onSearch} enterButton onChange={(event) => { handleChange(event.target.value) }} />
      </div>
      <Table columns={columns} dataSource={renderListUser()} onChange={onChange} />
    </div>
  )
}

export default memo(UserPage)

