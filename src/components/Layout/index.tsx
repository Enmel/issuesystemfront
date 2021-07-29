import React from 'react';
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
  Link,
  NavLink,
  useLocation,
  matchPath
} from "react-router-dom";
import { Users } from "@pages/Users";
import { Issues } from "@pages/Issues";
import { IssueDetail } from "@pages/IssueDetail";
import { Groups } from "@pages/Groups";
import { Members } from "@pages/Members";
import { Errors } from "@pages/Errors";
import { ErrorDetail } from "@pages/ErrorDetail";
import { Dashboard } from "@pages/Dashboard";
import { useAuth } from "@hooks/useAuth";

const { Text } = Typography;
const { Content, Footer, Sider } = Layout;

const items = [
  { key: '1', path: '/a/users' },
  { key: '2', path: '/a/groups' },
  { key: '3', path: '/a/issues' },
  { key: '4', path: '/a/errors' },
]

const LayoutPage: React.FC = () => {

  const sessionData = useAuth();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState<string>("");

  React.useEffect(() => {

    const getSelectedKey = () => (
      Object.values(items).find((route) =>
          matchPath(location.pathname, route)
      ) || {}
    ).key

    const selectedKeysRaw = getSelectedKey();
    const selectedKey = (selectedKeysRaw === undefined)? "3": selectedKeysRaw;
    setSelectedKeys(selectedKey);

  }, [location])


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

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} selectedKeys={[selectedKeys]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/a/users">
              <span>Usuarios</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <NavLink to="/a/groups">
              <span>Grupos</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<IssuesCloseOutlined />}>
            <NavLink to="/a/issues">
              <span>Incidentes</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<BugOutlined />}>
            <NavLink to="/a/errors">
              <span>Errores</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
            <Link to="/login">
              <span>Salir</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '0 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Switch>
              <Route exact path="/a/users" component={Users}/>
              <Route path="/a/issues/:id" component={IssueDetail}/>
              <Route exact path="/a/issues" component={Issues}/>
              <Route path="/a/groups/:id" component={Members}/>
              <Route exact path="/a/groups" component={Groups}/>
              <Route path="/a/errors/:id" component={ErrorDetail}/>
              <Route exact path="/a/errors" component={Errors}/>
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
