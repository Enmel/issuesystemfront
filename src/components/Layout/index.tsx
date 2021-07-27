import React, { FC } from 'react';
import './index.css';
import { Layout, Menu, Avatar,  Typography, Row, Col } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  IssuesCloseOutlined,
  BugOutlined
} from '@ant-design/icons';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Users } from "@pages/Users";
import { Issues } from "@pages/Issues";
import { IssueDetail } from "@pages/IssueDetail";
import { Groups } from "@pages/Groups";
import { Members } from "@pages/Members";
import { Bugs } from "@pages/Bugs";
import { Dashboard } from "@pages/Dashboard";
import { useAuth } from "@hooks/useAuth";

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
        <Row align="middle" style={{height: "3rem"}}>
          <Col span={6} offset={2}>
            <Avatar src={sessionData?.user?.picture_url} alt={sessionData?.user?.name}></Avatar>
          </Col>
          <Col span={16}>
            <Text style={{color: "white"}}>{sessionData?.user?.name}</Text>
          </Col>
        </Row>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/a/users">
              <span>Usuarios</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link to="/a/groups">
              <span>Grupos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<IssuesCloseOutlined />}>
            <Link to="/a/issues">
              <span>Incidentes</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BugOutlined />}>
            <Link to="/a/bugs">
              <span>Errores</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
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
              <Route exact path="/a/users" component={Users}/>
              <Route exact path="/a/issues/:id" component={IssueDetail}/>
              <Route exact path="/a/issues" component={Issues}/>
              <Route exact path="/a/groups/:id" component={Members}/>
              <Route exact path="/a/groups" component={Groups}/>
              <Route exact path="/a/bugs" component={Bugs}/>
              <Route exact path="/a" component={Dashboard}/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export {LayoutPage};
