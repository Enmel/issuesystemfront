import React, { FC, useState } from 'react';
import { List, Avatar, Button, Skeleton, Input, Row, Col, Tooltip,  Drawer, Form, Select } from 'antd';
import { DeleteFilled, UserAddOutlined } from '@ant-design/icons';
import { useQuery } from "react-query";
import { getUsers } from '../../services/Users';
import {User} from "../../services/Login";
import {Role} from "./components/Role";

const Users: FC = () => {

    const { Search } = Input;
    const { Option } = Select;

    const [email, setEmail] = React.useState<string>("");
    const [visibleDrawer, setVisibleDrawer] = React.useState<boolean>(false);

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching
    } = useQuery(['getUsersList', email], () => {
        return getUsers({params: {email}})
            .then(({data}) : User[] => {
                window.dispatchEvent(new Event('resize'));
                return data; 
            });
    }, { keepPreviousData : true })

    const showDrawer = () => setVisibleDrawer(true);
    
    const onClose = () => setVisibleDrawer(false);

    return (
        <>
        <Row justify="center">
            <Col span={16}>
                <Row>
                    <Col span={20}>
                        <Search placeholder="introduzca e-mail o nombre" 
                                loading={isFetching}
                                onChange={(event) => {setEmail(event.target.value)}} 
                                enterButton
                                style={{paddingBottom: "2rem"}}
                        />
                    </Col>
                    <Col span={4}>
                        <Tooltip title="Agregar usuario">
                            <Button type="primary" shape="circle" onClick={showDrawer}  icon={<UserAddOutlined className="standar-icon"/>}></Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row>
                    <Col span={20}>
                        <List
                            className="demo-loadmore-list"
                            loading={isLoading}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <DeleteFilled className="standar-icon"/>
                                    ]}
                                >
                                    <Skeleton avatar title={false} loading={isLoading} active>
                                        <List.Item.Meta
                                            avatar={
                                            <Avatar src={item.picture_url} />
                                            }
                                            title={item.name}
                                            description={item.email}
                                        />
                                        <Role role={item.role}/>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Drawer
          title="Crear nuevo usuario"
          width={720}
          onClose={onClose}
          visible={visibleDrawer}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose={true}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button onClick={onClose} type="primary">
                Crear
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nombre"
                  rules={[{ required: true, message: 'Nombre, requerido' }]}
                >
                  <Input placeholder="Enmanuel Marval" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[{ required: true, message: 'E-mail, requerido' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="emarval.fc@gmail.com"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Rol"
                >
                  <Select placeholder="Rol" defaultValue={"Collaborator"}>
                    <Option value="Collaborator">Colaborador</Option>
                    <Option value="Developer">Desarrollador</Option>
                    <Option value="Admin">Admin</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        </>
    );
};

export {Users};

