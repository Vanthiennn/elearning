import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteCourseAdmin, actFetchListCourseAdmin } from '../../../../store/courseAdmin/actions';
import { Button, Table, Image } from 'antd';
import { NavLink } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, UsergroupAddOutlined, UsergroupDeleteOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Input } from 'antd';

export default function CoursePage(props) {
  const loading = useSelector(state => state.listCourseReducer.loading);
  let data = useSelector(state => state.listCourseReducer.data);
  const error = useSelector(state => state.listCourseReducer.error);

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const dispatch = useDispatch();

  const renderListCourse = () => {
    if (searchInput.length > 1) {
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
        return Object.values(item.tenKhoaHoc).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  useEffect(() => {
    if (data === null) {
      dispatch(actFetchListCourseAdmin())
    }
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'maKhoaHoc',
      width: "10%"
    },
    {
      title: 'Name',
      dataIndex: 'tenKhoaHoc',
      width: "10%"
    },
    {
      title: 'Images',
      dataIndex: 'hinhAnh',
      width: "10%",
      render: (text, course) => {
        return <>
          <Image
            width={100}
            height={100}
            src={course.hinhAnh}
            alt={course.hinhAnh}
            onError={(e) => {
              if (e.target.src) {
                let url = e.target.src;
                e.target.src = `https://elearningnew.cybersoft.edu.vn/${url.slice(39)}`
              }
            }}
          />
        </>
      }
    },
    {
      title: 'Descriptions',
      dataIndex: 'moTa',
      width: "40%",
      render: (text, course) => {
        return <>
          {text.length > 10 ? text.substr(0, 100) + ` ...` : text}
        </>
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Student',
      dataIndex: 'soLuongHocVien',
      align: "center",
      width: "5%"
    },
    {
      title: 'Subscribe',
      dataIndex: 'Subscribe',
      align: "center",
      width: "5%",
      render: (text, course) => {
        return <>
          <NavLink to={`/admin/course-list/subscribe/${course.maKhoaHoc}`}><UsergroupAddOutlined style={{ color: "green", fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Unsubscribe',
      dataIndex: 'Unsubscribe',
      align: "center",
      width: "5%",
      render: (text, course) => {
        return <>
          <NavLink to={`/admin/course-list/unsubscribe/${course.maKhoaHoc}`}><UsergroupDeleteOutlined style={{ color: "red", fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Approval',
      dataIndex: 'Approval',
      align: "center",
      width: "5%",
      render: (text, course) => {
        return <>
          <NavLink to={`/admin/course-list/approval/${course.maKhoaHoc}`}><SafetyCertificateOutlined style={{ fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      align: "center",
      width: "5%",
      render: (text, course) => {
        return <>
          <NavLink to={`/admin/course-list/edit-course/${course.maKhoaHoc}`} ><EditOutlined style={{ color: "blue", fontSize: 20 }} /></NavLink>
        </>
      }
    },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      align: "center",
      width: "5%",
      render: (text, course) => {
        return <>
          <Button style={{ border: "none"}} onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${course.tenKhoaHoc}?`)) {
              dispatch(actDeleteCourseAdmin(course.maKhoaHoc))
            }
          }} ><DeleteOutlined style={{ fontSize: 20 }} /></Button>
        </>
      }
    },
  ];
  const { Search } = Input;

  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }
  const onSearch = value => {
    console.log(value);
  };

  if (loading) {
    return <div>...loading</div>
  }
  if (error) {
    alert(error)
  }
  return (
    <div>
      <h2 style={{ fontSize: 30 }} className='mb-3'>Course Management</h2>
      <div className='mb-3' style={{ display: "flex" }}>
        <Button style={{ backgroundColor: "#73d13d" }} className='mr-5 text-white' ><NavLink to="/admin/course-list/add-course">Add Course</NavLink></Button>
        <Search placeholder="Search ID Course" onSearch={onSearch} enterButton="Search" onChange={(event) => { handleChange(event.target.value) }} />
      </div>
      <Table
        expandable={{
          expandedRowRender: data => <p>Description: <span style={{ margin: 0, color: "#cf1322" }}>{data.moTa}</span></p>,
        }}
        columns={columns}
        dataSource={renderListCourse()}
        onChange={onChange} />
    </div>
  )

}
