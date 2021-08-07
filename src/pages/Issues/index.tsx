import React from 'react';
import { Button, List, Input, Row, Col, Tooltip, Form, Drawer, Spin, Select, message, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { toRelativeTime } from "@utils/timeago";
import { uniqueReducer } from "@utils/uniqueReducer";
import { Link } from "react-router-dom";
import { useList, useAdd } from "./hooks";
import { PopOverGroup, PopOverUser} from '@components/Popover';
import { StateIcon } from "./components/StateIcon";
import { Filter } from "./components/Filter";
import { Header } from "@components/Header";
import { Group } from '@services/Groups';
import { User } from "@services/Members";
import { Issue, IssueToSave } from '@services/Issues';
import { templateList } from "./issueTemplates";
import JoditEditor from "jodit-react";

const Issues: React.FC = () => {

  const {Title} = Typography;
  const { Search } = Input;
  const [text, setText] = React.useState<string>("");
  const [visibleDrawer, setVisibleDrawer] = React.useState<boolean>(false);
  const [projects, setProjects] = React.useState<Group[]>([]);
  const [authors, setAuthors] = React.useState<User[]>([]);
  const [filter, setFilter] = React.useState({
    authors: "TODOS",
    projects: "TODOS",
    status: "OPEN"
  });

  const [form] = Form.useForm();
  const { isLoading, data, isFetching } = useList(text);
  const addIssue = useAdd();
  const editor = React.useRef<JoditEditor>(null);
  const [filteredData, setFilteredData] = React.useState<Issue[] | undefined>([]);

  const showDrawer = () => setVisibleDrawer(true);
  const onClose = () => setVisibleDrawer(false);

  const showSuccess = (text: string) => {
    message.success(text);
  };

  const applyFilterProject = (value: string) => {
    setFilter({ ...filter, projects: value });
  }

  const applyFilterAuthor = (value: string) => {
    setFilter({ ...filter, authors: value });
  }

  const applyFilterStatus = () => {
    let status = filter.status === "OPEN" ? "CLOSED" : "OPEN";
    setFilter({ ...filter, status });
    return status;
  }

  const sendForm = (issue: IssueToSave) => {
    return addIssue.mutateAsync(issue).then(() => {
      showSuccess("Incidente reportado.");
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
      let authors = uniqueReducer<User>(data.map((issue) => issue.reporter));
      setAuthors(authors);
    }
  }, [data]);

  React.useEffect(() => {

    let issues = data;

    if (issues) {

      if (filter.projects !== "TODOS") {
        issues = issues.filter((issue) => String(issue.group.id) !== filter.projects);
      }

      if (filter.authors !== "TODOS") {
        issues = issues.filter((issue) => String(issue.reporter.id) !== filter.authors);
      }

      issues = issues.filter((issue) => issue.status === filter.status);
    }

    setFilteredData(issues);

  }, [data, filter]);

  return (
    <>
      <Header content={<Title level={3}>Incidentes</Title>}></Header>
      <Row justify="center">
        <Col span={16}>
          <Row>
            <Col span={20}>
              <Search
                placeholder="Busqueda. Ejemplo: Incidente del boton fantasma"
                className="search-box"
                loading={isFetching || isLoading}
                onChange={(event) => { setText(event.target.value) }}
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
                    onChangeAuthor={applyFilterAuthor}
                    authors={authors}
                    open={data?.filter((issue) => issue.status === "OPEN").length}
                    closed={data?.filter((issue) => issue.status === "CLOSED").length}
                    onChangeStatus={applyFilterStatus}
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
                          <Link to={"/a/issues/" + record.id}> {record.title} </Link>
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
                            abierto {toRelativeTime(record.created_at)} por </span>
                          <PopOverUser user={record.reporter} />
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
          addIssue.isLoading ? <Spin></Spin> :
            <Form layout="vertical"
              form={form}
              onFinish={sendForm}
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
                <Col span={8}>
                  <Form.Item
                    name="template"
                    label="Plantilla"
                  >
                    <Select placeholder="Plantilla" defaultValue="Ninguna" onChange={onChangeTemplate}>
                      <Select.Option value="Ninguna">Ninguna</Select.Option>
                      <Select.Option value="Problema">Problema</Select.Option>
                      <Select.Option value="Peticion">Peticion</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16}>
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

export { Issues };