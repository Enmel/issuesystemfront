import React from 'react';
import { Button, List, Avatar, Input, Row, Col, Tooltip,  Drawer, Form, Popconfirm, Spin, Typography, message} from 'antd';
import { DeleteFilled, EditFilled, UsergroupAddOutlined, TeamOutlined } from '@ant-design/icons';
import { UploadAvatar } from './components/UploadAvatar';
import { Header} from "../../components/Header";
import { Group, GroupToSave } from "@services/Groups";
import { Link } from "react-router-dom";
import { useList, useAdd, useUpdateUser, useRemoveUser } from "./hooks";

const {Title} = Typography;

const Groups: React.FC = () => {

    const { Search } = Input;
    const [text, setText] = React.useState<string>("");
    const [visibleDrawer, setVisibleDrawer] = React.useState<boolean>(false);
    const [form] = Form.useForm();

    const drawerConfigCreate = {
      title: "Crear nuevo usuario",
      initialValues: {},
      actionButton: "Crear"
    }

    const [drawerConfig, setDrawerConfig] = React.useState<{
      title: string,
      initialValues: {
        id?: number,
        name?: string,
        description?: string,
        picture?: number
      },
      picture_url?: string,
      actionButton: string
    }>(drawerConfigCreate);

    const { isLoading, data, isFetching } = useList(text);

    const addGroup = useAdd();
    const updateGroup = useUpdateUser();
    const removeGroup = useRemoveUser();

    const handleDeleteUser = (id: number) => {
      removeGroup.mutateAsync(id).then(() => {
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

    const handleEditUser = (record: Group) => {
      setDrawerConfig({
        title: "Editar grupo",
        initialValues: {
          id: record.id,
          name: record.name,
          description: record.description,
          picture: record.picture.id
        },
        picture_url: record.picture.url,
        actionButton: "Editar",
      });
      showDrawer();
    }

    const sendForm = (group: GroupToSave) => {

      if(group.id === undefined) {
        return addGroup.mutateAsync(group).then(() => {
          showSuccess("Grupo creado.");
          onClose()
        });
      }

      updateGroup.mutateAsync(group).then(() => {
        showSuccess("Grupo actualizado.");
        onClose()
      });
    };

    return (
        <>
        <Header content={<Title level={3}>Grupos</Title>}></Header>
        <Row justify="center">
            <Col span={16}>
                <Row>
                    <Col span={20}>
                        <Search 
                            placeholder="¿Que producto busca?" 
                            loading={isFetching || isLoading}
                            onChange={(event) => {setText(event.target.value)}} 
                            enterButton
                            style={{paddingBottom: "2rem"}}
                        />
                    </Col>
                    <Col span={4}>
                        <Tooltip title="Crear grupo">
                            <Button 
                                type="primary"
                                onClick={showDrawerCreate} 
                                icon={<UsergroupAddOutlined className="standar-icon"/>}
                                disabled={addGroup.isLoading || updateGroup.isLoading }
                            >
                              Agregar
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      loading={isFetching || isLoading}
                      renderItem={record => (
                        <List.Item
                          style={{backgroundColor: "white", paddingRight:"0.7rem", paddingLeft:"0.7rem"}}
                          actions={
                            [
                              <Link to={"/a/groups/" + record.id}>
                                <Button type="text" icon={<TeamOutlined/>}/>
                              </Link>,
                              <Button
                                type="text"
                                icon={<EditFilled />}
                                onClick={() => handleEditUser(record)}
                              />,
                              <Popconfirm title="Confirme su operacion" onConfirm={() => handleDeleteUser(record.id)}>
                                <Button type="text" icon={<DeleteFilled/>}></Button>
                              </Popconfirm>
                            ]
                          }
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={record.picture?.url ?? ""} />}
                            title={<Link to={"/a/groups/" + record.id}> {record.name} </Link>}
                            description={record.description}
                          />
                        </List.Item>
                      )}
                    />,
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
            addGroup.isLoading || updateGroup.isLoading ? <Spin></Spin> :
            <Form layout="vertical"
              form={form}
              hideRequiredMark 
              onFinish={sendForm}
              initialValues={drawerConfig.initialValues}
            >
              <Form.Item
                name="id"
                hidden={true}
              >
                <Input/>
              </Form.Item>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="picture" label="Avatar">
                    <Input
                      hidden={true}
                      style={{ width: '100%' }}
                    />
                    <UploadAvatar
                      imageUrl={drawerConfig.picture_url}
                      onChangeImage={ (file) => {
                        form.setFieldsValue({
                          picture: file.id
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    name="name"
                    label="Producto"
                    rules={[{ required: true, message: 'Nombre, requerido' }]}
                  >
                    <Input placeholder="Chappsy Ecommerce-Web" autoComplete="off"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <Input.TextArea
                      rows={4}
                      style={{ width: '100%' }}
                      placeholder="Chappsy ecommerce web se dedica exclusivamente a la atencion de las tiendas en linea."
                    />
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

export {Groups};

