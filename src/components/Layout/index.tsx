import React, { FC } from 'react';
import './index.css';
import { Layout, Menu, Avatar,  Typography} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Bugs} from "../../pages/Bugs";
import {Users} from "../../pages/Users";
import {Dashboard} from "../../pages/Dashboard";
import { useAuth } from '../../hooks/useAuth';

const { Text } = Typography;
const { Content, Footer, Sider } = Layout;


const LayoutPage: FC = () => {

  const sessionData = useAuth();

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="menu-header">
          <Avatar src={sessionData?.user?.picture_url} alt={sessionData?.user?.name}></Avatar>
          <Text style={{color: "white"}}>{sessionData?.user?.name}</Text>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/a/users">
              <span>Usuarios</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/a/groups">
              <span>Grupos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/a/issues">
              <span>Incidentes</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="/a/bugs">
              <span>Errores</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UploadOutlined />}>
            <Link to="/login">
              <span>Salir</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Switch>
              <Route path="/a/bugs" component={Bugs}/>
              <Route path="/a/users" component={Users}/>
              <Route path="/a" component={Dashboard}/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export {LayoutPage};
