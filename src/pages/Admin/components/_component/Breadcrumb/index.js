import React from 'react';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

export default function CustomBreadcrumb() {
    const handleBreadCrumb = () => {
        let myStr = window.location.pathname;
        let myArr = myStr.split("/");
        let removeFirstEle = myArr.shift();
        return myArr.map((item, index) => {
            if (item === myArr[0] && myArr.length > 1) {
                return <Breadcrumb.Item key={index}><NavLink style={{ fontSize: 15 }} to="/admin">{item[0].toUpperCase() + item.substring(1)}</NavLink></Breadcrumb.Item>
            } else if (item === myArr[1] && myArr.length > 2) {
                return <Breadcrumb.Item key={index}><NavLink style={{ fontSize: 15 }} to={`/admin/${myArr[1]}`}>{item[0].toUpperCase() + item.substring(1)}</NavLink></Breadcrumb.Item>
            }
            return <Breadcrumb.Item className='text-danger' key={index}>{item[0].toUpperCase() + item.substring(1)}</Breadcrumb.Item>
        })
    }
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            {handleBreadCrumb()}
        </Breadcrumb>
    )
}


