import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  PieChartOutlined 
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import HeaderAdmin from "./components/_component/HeaderAdmin";
import CustomBreadcrumb from "./components/_component/Breadcrumb";
import { useSelector } from "react-redux";

const { Content, Footer, Sider } = Layout;

export default function AdminTemplate(props) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  const { exact, path, component } = props;
  const { location } = props;

  if (localStorage.getItem("UserAdmin")) {
    return (
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu
              selectedKeys={[location.pathname]}
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="/admin" icon={<PieChartOutlined  />}>
                <Link to="/admin">Dashboard </Link>
              </Menu.Item>
              <Menu.Item key={`/admin/user-list/page${props.computedMatch.params.number}`} icon={<UserOutlined />}>
                <Link to={`/admin/user-list/page${props.computedMatch.params.number}`}>User </Link>
              </Menu.Item>
              <Menu.Item key="/admin/course-list" icon={<FileOutlined />}>
                <Link to="/admin/course-list">Courses </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <HeaderAdmin />
            <Content style={{ margin: '0 16px' }}>
              <CustomBreadcrumb />
              <div className="site-layout-background" style={{ padding: 24, minHeight: "80vh" }}>
                <Route exact={exact} path={path} component={component} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    )
  };

  return <Redirect to="/auth" />

}
