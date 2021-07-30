import React from 'react';
import { Button, List, Input, Row, Col, Tooltip, Form, Drawer, Spin, Select, Typography, message } from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import { toRelativeTime } from "@utils/timeago";
import { uniqueReducer } from "@utils/uniqueReducer";
import { Link } from "react-router-dom";
import { useList, useAdd } from "./hooks";
import { PopOverGroup} from '@components/Popover';
import { StateIcon } from "./components/StateIcon";
import { Filter } from "./components/Filter";
import { ErrorTag } from "./components/ErrorTag";
import { Header } from "../../components/Header"
import { Group } from '@services/Groups';
import JoditEditor from "jodit-react";
import { Error, ErrorToSave } from '../../services/Errors';
import { templateList } from "./errorTemplates";

const Errors: React.FC = () => {

  const { Search } = Input;
  const [visibleDrawer, setVisibleDrawer] = React.useState<boolean>(false);
  const [projects, setProjects] = React.useState<Group[]>([]);
  const [filter, setFilter] = React.useState({
    projects: "TODOS",
    type: "TODOS",
    status: "Pending"
  });

  const {Title} = Typography;
  const [form] = Form.useForm();
  const { isLoading, data, isFetching } = useList();
  const addError = useAdd();
  const [filteredData, setFilteredData] = React.useState<Error[] | undefined>([]);
  const editor = React.useRef<JoditEditor>(null);

  const showDrawer = () => setVisibleDrawer(true);
  const onClose = () => setVisibleDrawer(false);

  const showSuccess = (text: string) => {
    message.success(text);
  };

  const applyFilterProject = (value: string) => {
    setFilter({ ...filter, projects: value });
  }

  const applyFilterType = (value: string) => {
    setFilter({ ...filter, type: value });
  }

  const applyFilterStatus = () => {
    let status = (filter.status === "Pending") ? "Resolved" : "Pending";
    setFilter({ ...filter, status });
    return status;
  }

  const sendForm = (error: ErrorToSave) => {
    return addError.mutateAsync(error).then(() => {
      showSuccess("Error reportado.");
      onClose()
    });
  };

  const onChangeTemplate = (template: string) => {
    if (template === "Ninguna") {
      form.setFieldsValue({
        comment: templateList.Ninguna
      });
    }
    
    if (template === "Problema") {
      form.setFieldsValue({
        comment: templateList.Problema
      });
    }
    if (template === "Peticion") {
      form.setFieldsValue({
        comment: templateList.Peticion
      });
    }
  }

  React.useEffect(() => {
    if (data) {
      let groups = uniqueReducer<Group>(data.map((issue) => issue.group));
      setProjects(groups);
    }
  }, [data]);

  React.useEffect(() => {

    let errors = data;

    if (errors) {

      if (filter.projects !== "TODOS") {
        errors = errors.filter((errors) => String(errors.group.id) !== filter.projects);
      }

      if (filter.type !== "TODOS") {
        errors = errors.filter((errors) => String(errors.type) === filter.type);
      }

      errors = errors.filter((errors) => errors.status === filter.status);
    }

    setFilteredData(errors);

  }, [data, filter]);

  return (
    <>
      <Header content={<Title level={3}>Errores</Title>}></Header>
      <Row justify="center">
        <Col span={16}>
          <Row>
            <Col span={20}>
              <Search
                placeholder="Busqueda. Ejemplo: Incidente del boton fantasma"
                loading={isFetching || isLoading}
                enterButton
                style={{ paddingBottom: "2rem" }}
              />
            </Col>
            <Col span={4}>
              <Tooltip title="Crear incidencia">
                <Button
                  type="primary"
                  icon={<ExclamationCircleOutlined className="standar-icon" />}
                  onClick={showDrawer}
                >
                  Reportar
                </Button>
              </Tooltip>
            </Col>
          </Row>
          <Row justify="start">
            <Col span={24}>
              <List
                header={
                  <Filter
                    onChangeProject={applyFilterProject}
                    projects={projects}
                    open={data?.filter((error) => error.status === "Pending").length}
                    closed={data?.filter((error) => error.status === "Resolved").length}
                    onChangeStatus={applyFilterStatus}
                    onChangeType={applyFilterType}
                  />
                }
                itemLayout="horizontal"
                dataSource={filteredData}
                loading={isFetching || isLoading}
                renderItem={record => (
                  <List.Item key={record.id} style={{backgroundColor: "white", paddingRight:"0.7rem", paddingLeft:"0.7rem"}}>
                    <List.Item.Meta
                      avatar={<StateIcon state={record.status} />}
                      title={
                        <div style={{
                          justifyContent: "space-between",
                          display: "flex"
                        }}>
                          <div>
                            <ErrorTag type={record.type}/>
                            <Link to={"/a/errors/" + record.id}> {record.title}</Link>
                          </div>
                          <PopOverGroup group={record.group} />
                        </div>
                      }
                      description={
                        <div style={{
                          display: "flex",
                          justifyContent: "flex-start"
                        }}>
                          <span>#{record.id} </span>
                          <span style={{
                            paddingLeft: "5px",
                            paddingRight: "5px"
                          }}
                          >
                            Abierto {toRelativeTime(record.created_at)} </span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />,
            </Col>
          </Row>
        </Col>
      </Row>
      <Drawer
        title={"Reportar incidente"}
        width={720}
        onClose={onClose}
        visible={visibleDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
      >
        {
          addError.isLoading ? <Spin></Spin> :
            <Form layout="vertical"
              form={form}
              onFinish={sendForm}
              initialValues={{type: "Normal"}}
              hideRequiredMark
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="title"
                    label="Titulo"
                    rules={[{ required: true, message: 'Titulo, requerido' }]}
                  >
                    <Input placeholder="Explique en una frase que ocurrio" autoComplete="off" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name="template"
                    label="Plantilla"
                  >
                    <Select placeholder="Plantilla" onChange={onChangeTemplate}>
                      <Select.Option value="Ninguna">Ninguna</Select.Option>
                      <Select.Option value="Problema">Problema</Select.Option>
                      <Select.Option value="Peticion">Peticion</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="group"
                    label="Grupo"
                    rules={[{ required: true, message: 'Debe seleccionar un grupo' }]}
                  >
                    <Select placeholder="Grupo">
                      {projects.map((project) => <Select.Option value={project.id}>{project.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="type"
                    label="Tipo"
                  >
                    <Select placeholder="Plantilla" defaultValue="Normal">
                      <Select.Option value="Blocker">Bloqueante</Select.Option>
                      <Select.Option value="Critical">Critico</Select.Option>
                      <Select.Option value="Major">Mayor</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                      <Select.Option value="Minor">Menor</Select.Option>
                      <Select.Option value="Trivial">Trivial</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Descripcion"
                    name="comment"
                  >
                    <JoditEditor
                      ref={editor}
                      value={form.getFieldsValue().comment}
                      onBlur={newContent => form.setFieldsValue({
                        comment: newContent
                      })}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit">
                  Reportar
                </Button>
              </Row>
            </Form>
        }
      </Drawer>
    </>
  );
};

export { Errors };