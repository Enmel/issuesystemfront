import React, { useEffect } from 'react';
import { Row, Col, Tooltip, Typography, Comment, List, Button, Popconfirm, Divider, Input, Form, Drawer, Spin, Select, message} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useShow, useToggleIssue, useAddComment } from "./hooks";
import { PopOverGroup } from '@pages/Issues/components/PopOverGroup';
import { PopOverUser } from '@pages/Issues/components/PopOverUser';
import { toRelativeTime } from "@utils/timeago";

const {Text} = Typography;
const { TextArea } = Input;

const IssueDetail: React.FC = () => {

    const { id } = useParams<{id: string}>();
    const { isLoading, data, isFetching} = useShow(Number(id));
    const toggleIssue = useToggleIssue(Number(id));
    const [comments, setComments] = React.useState<{
      author?: string,
      avatar?: string,
      content: React.ReactElement,
      datetime: React.ReactElement,
    }[]|undefined>(undefined);
    const [commentMain, setCommentMain] = React.useState<{
      author?: string,
      avatar?: string,
      content: React.ReactElement,
      datetime: React.ReactElement,
    }|undefined>(undefined);
    const [commentText, setCommentText] = React.useState<string>("");
    const addCommentMutation = useAddComment(Number(id));

    React.useEffect(() => {

      let comments = data?.comments;
      let firstComment = comments?.shift();
      let result = comments?.map((comment) => {
        
        return {
          author: comment.owner.name,
          avatar: comment.owner.picture.url,
          content: (
            <p>
              {comment.note}
            </p>
          ),
          datetime: (
            <Tooltip title={comment.created_at}>
              <span>{toRelativeTime(comment.created_at)}</span>
            </Tooltip>
          ),
        }
      });

      setComments(result);
      setCommentMain({
        author: firstComment?.owner.name,
        avatar: firstComment?.owner.picture.url,
        content: (
          <p>
            {firstComment?.note}
          </p>
        ),
        datetime: (
          <Tooltip title={firstComment?.created_at}>
            <span>{toRelativeTime(firstComment?.created_at)}</span>
          </Tooltip>
        )
      });
    }, [data]);


    const handleCloseIssue = () => {
      toggleIssue.mutateAsync().then(() => {
        setCommentText("");
      });
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);
    };

    const handleSubmit = () => {
      addCommentMutation.mutateAsync(commentText);
    }
    
    return (
        <>
        <Row justify="center">
            <Col span={16}>

                <Row justify="start">
                  <Text> {data?.title} #{data?.id}</Text>
                </Row>
                <Row align="middle">
                    <Col span={4}>
                      <Popconfirm title="Esta accion cerrara la incidencia y evitara comentarios futuros sobre ella" onConfirm={handleCloseIssue} disabled={data?.status === "CLOSED"}>                              
                        <Button 
                          type="ghost"
                          disabled={data?.status === "CLOSED"}
                          icon={<ExclamationCircleOutlined className="standar-icon"/>}
                          loading={toggleIssue.isLoading}
                        >
                          {data?.status === "CLOSED"? "Cerrado" : "Cerrar"}
                        </Button>
                      </Popconfirm>
                    </Col>
                    <Col span={20} style={{display: "flex", justifyContent: "space-between"}}>
                      <span>Abierto {toRelativeTime(data?.created_at)} por <PopOverUser user={data?.reporter}/></span>
                      <PopOverGroup group={data?.group}/>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row style={{paddingTop: "2rem"}}>
            <Col span={4}> 
            </Col>
            <Col span={16}> 
              <Comment
                  className="comment-main"
                  author={commentMain?.author}
                  avatar={commentMain?.avatar}
                  content={commentMain?.content}
                  datetime={commentMain?.datetime}
              />
              <Divider></Divider>
            </Col>
            <Col span={4}> 
            </Col>
        </Row>
        <Row>
            <Col span={6}> 
            </Col>
            <Col span={12}> 
              <List
                  className="comment-list"
                  header={`${data?.comments.length} respuestas`}
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={item => (
                      <li>
                          <Comment
                              author={item.author}
                              avatar={item.avatar}
                              content={item.content}
                              datetime={item.datetime}
                          />
                      </li>
                  )}
              />
            </Col>
            <Col span={6}> 
            </Col>
        </Row>
        <Row style={{paddingTop: "2rem"}}>
            <Col span={4}> 
            </Col>
            <Col span={16}> 
              <Comment
                  avatar={
                    commentMain?.avatar
                  }
                  content={
                    <>
                      <Form.Item>
                        <TextArea rows={4} onChange={handleTextChange} value={commentText}/>
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" loading={addCommentMutation.isLoading} onClick={handleSubmit} type="primary">
                          Comentar
                        </Button>
                      </Form.Item>
                    </>
                  }
                />
            </Col>
            <Col span={4}> 
            </Col>
        </Row>
        </>
    );
};

export {IssueDetail};