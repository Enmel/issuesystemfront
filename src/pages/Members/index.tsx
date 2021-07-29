import React from 'react';
import { Button, List, Avatar, Row, Col, Tooltip,  Select, Popconfirm, message, Typography, Spin} from 'antd';
import { DeleteFilled, UsergroupAddOutlined } from '@ant-design/icons';
import { useGetUsers } from "@pages/Users/hooks";
import { Header } from "../../components/Header";
import { useList, useAdd, useRemove } from "./hooks";
import { useShow } from "../Groups/hooks/useShow";
import { useParams } from "react-router-dom";

const {Title} = Typography;

const Members: React.FC = () => {

  let { id } = useParams<{id: string}>();
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const { isLoading : isLoadingGroup, data: group } = useShow(id);
  const { isLoading : isLoadingMembers, data: groupMembers, isFetching: isFetchingMembers } = useList(Number(id));
  const { isLoading : isLoadingUsers, data: users, isFetching: isFetchingUsers} = useGetUsers("");
  
  const addMembers = useAdd(Number(id));
  const removeMember = useRemove(Number(id));


  const handleAddMembers = () => {
    addMembers.mutateAsync(selectedItems).then(() => {
      showSuccess("Miembros agregados con exito.");
      setSelectedItems([]);
    });
  }

  const handleDeleteUser = (id: number) => {
    removeMember.mutateAsync(id).then(() => {
      showSuccess("Miembro borrado.");
    });
  };
  
  const showSuccess = (text : string) => {
    message.success(text);
  };


  const handleChange = (selectedItems: number[]) => {
    setSelectedItems([...selectedItems]);
  };

    return (
        <>
        <Header content={isLoadingGroup? <Spin></Spin> : <Title level={3}>{group?.name}</Title>}></Header>
        <Row justify="center">
            <Col span={16}>
                <Row>
                    <Col span={20}>
                    <Select
                      mode="multiple"
                      disabled={addMembers.isLoading}
                      loading={isLoadingUsers || isFetchingUsers || addMembers.isLoading}
                      placeholder="Seleccione usuarios para agregar"
                      optionFilterProp="name"
                      filterOption={(input, option) =>
                        option?.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.name.toLowerCase().localeCompare(optionB.name.toLowerCase())
                      }
                      value={selectedItems}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    >
                      {users?.filter((user) => !groupMembers?.map(user => user.id).includes(user.id)).map(item => (
                        <Select.Option key={item.id} value={item.id} name={item.name}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                    </Col>
                    <Col span={4}>
                        <Tooltip title="Agregar miembros">
                            <Button 
                                type="primary"
                                shape="circle"
                                onClick={handleAddMembers}
                                disabled={addMembers.isLoading || (selectedItems.length === 0)}
                                icon={<UsergroupAddOutlined className="standar-icon"/>}
                            >
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row style={{marginTop: "1rem"}}>
                    <Col span={24}>
                    <List
                      itemLayout="horizontal"
                      dataSource={groupMembers}
                      loading={isFetchingMembers || isLoadingMembers}
                      renderItem={record => (
                        <List.Item
                          style={{backgroundColor: "white", paddingRight:"0.7rem", paddingLeft:"0.7rem"}}
                          actions={
                            [
                              <Popconfirm title="Confirme su operacion" onConfirm={() => handleDeleteUser(record.id)}>
                                <Button type="text" icon={<DeleteFilled/>}></Button>
                              </Popconfirm>
                            ]
                          }
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={record.picture?.url ?? ""} />}
                            title={record.name}
                            description={record.email}
                          />
                        </List.Item>
                      )}
                    />,
                    </Col>
                </Row>
            </Col>
        </Row>

        </>
    );
};

export {Members};

