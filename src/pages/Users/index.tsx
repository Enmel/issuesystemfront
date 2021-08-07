import React from 'react';
import { Button, Table, Input, Row, Col, Tooltip,  Drawer, Form, Select, Popconfirm, Spin, message, Typography} from 'antd';
import { DeleteFilled, EditFilled, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/useAuth';
import { UserParams } from "@services/Users"
import { useGetUsers, useAddUser, useUpdateUser, useRemoveUser } from "./hooks";
import { Header } from "@components/Header";
import { User} from "@services/Login";

const {Title} = Typography;

const Users: React.FC = () => {

    const { Search } = Input;
    const { Option } = Select;
    const { user } = useAuth();
    const [email, setEmail] = React.useState<string>("");
    const [visibleDrawer, setVisibleDrawer] = React.useState<boolean>(false);

    const drawerConfigCreate = {
      title: "Crear nuevo usuario",
      initialValue: {
        password: '',
        role: 'Collaborator'
      },
      actionButton: "Crear"
    }

    const [drawerConfig, setDrawerConfig] = React.useState(drawerConfigCreate);

    const { isLoading, data, isFetching } = useGetUsers(email);

    const addUser = useAddUser();
    const updateUser = useUpdateUser();
    const removeUser = useRemoveUser();

    const handleDeleteUser = (id: number) => {
      removeUser.mutateAsync(id).then(() => {
        showSuccess("Usuario borrado.");
      });
    };

    const showDrawer = () => setVisibleDrawer(true);
    const onClose = () => setVisibleDrawer(false);
    
    const showSuccess = (text : string) => {
      message.success(text);
    };

    const showDrawerCreate = () => {
      setDrawerConfig(drawerConfigCreate);
      showDrawer();
    }

    const handleEditUser = (record: User) => {
      setDrawerConfig({
        title: "Editar usuario",
        initialValue: {...record, password: "default"},
        actionButton: "Editar"
      });
      showDrawer();
    }

    const sendForm = (user: UserParams) => {

      if(user.id === undefined) {
        return addUser.mutateAsync(user).then(() => {
          showSuccess("Usuario creado.");
          onClose()
        });
      }

      updateUser.mutateAsync(user).then(() => {
        showSuccess("Usuario actualizado.");
        onClose()
      });
    };

    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      },
      {
        title: 'Rol',
        dataIndex: 'role',
        filters: [
          {
            text: 'SuperAdmin',
            value: 'SuperAdmin',
          },
          {
            text: 'Admin',
            value: 'Admin',
          },
          {
            text: 'Desarrollador',
            value: 'Developer',
          },
          {
            text: 'Colaborador',
            value: 'Collaborator',
          },
        ],
        onFilter: (value: any, record: User) => record.role.indexOf(value) === 0,
      },
      {
        title: 'Action',
        key: 'action',
        render: (_ : any, record: User) => {
          return (
            <>
              <Button
                type="text"
                icon={<EditFilled />}
                onClick={() => handleEditUser(record)}
              >
              </Button>
              <Popconfirm title="Confirme su operacion" onConfirm={() => handleDeleteUser(record.id)}>
                <Button type="text" icon={<DeleteFilled/>}></Button>
              </Popconfirm>
            </>
          );
        },
      },
    ];

    return (
        <>
        <Header content={<Title level={3}>Usuarios</Title>}></Header>
        <Row justify="center">
            <Col span={16}>
                <Row>
                    <Col span={20}>
                        <Search 
                            placeholder="introduzca e-mail o nombre"
                            className="search-box"
                            loading={isFetching || isLoading}
                            onChange={(event) => {setEmail(event.target.value)}} 
                            enterButton
                            style={{paddingBottom: "2rem"}}
                        />
                    </Col>
                    <Col span={4}>
                        <Tooltip title="Agregar usuario">
                            <Button 
                                type="primary"
                                onClick={showDrawerCreate} 
                                icon={<UserAddOutlined className="standar-icon"/>}
                                disabled={addUser.isLoading || updateUser.isLoading }
                            >
                              Agregar
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                      <Table
                        bordered={false}
                        loading={false}
                        showHeader={true}
                        columns={columns}
                        dataSource={ data }
                      />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Drawer
          title={drawerConfig.title}
          width={720}
          onClose={onClose}
          visible={visibleDrawer}
          bodyStyle={{ paddingBottom: 80 }}
          destroyOnClose={true}
        >
          {
            addUser.isLoading || updateUser.isLoading ? <Spin></Spin> :
            <Form layout="vertical"
              hideRequiredMark 
              onFinish={sendForm}
              initialValues={drawerConfig.initialValue}
            >
              <Form.Item
                name="id"
                hidden={true}
              >
                <Input placeholder="Enmanuel Marval" />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true, message: 'Nombre, requerido' }]}
                  >
                    <Input placeholder="Enmanuel Marval" autoComplete="off"/>
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
                      autoComplete="off"
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
                    <Select placeholder="Rol">
                      <Option value="Collaborator">Colaborador</Option>
                      <Option value="Developer"
                          disabled={
                              user?.role === "Developer" || 
                              user?.role === "Collaborator"
                          }
                      >
                          Desarrollador
                      </Option>
                      <Option value="Admin" 
                          disabled={
                              user?.role === "Developer" || 
                              user?.role === "Collaborator"
                          }
                      >
                          Admin
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Clave de acceso Requerida' }]}
                  >
                    <Input.Password autoComplete="new-password"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit">
                  {drawerConfig.actionButton}
                </Button>
              </Row>
            </Form>
          }
        </Drawer>
        </>
    );
};

export {Users};

