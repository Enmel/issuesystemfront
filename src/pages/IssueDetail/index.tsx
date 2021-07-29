import React from 'react';
import { Row, Col, Tooltip, Typography, List, Button, Form, Spin, message} from 'antd';
import { useParams } from "react-router-dom";
import { useShow, useToggleIssue, useAddComment } from "./hooks";
import { ToggleButton } from "./components/ToggleButton";
import { PopOverGroup, PopOverUser} from '@components/Popover';
import { Header } from "@components/Header"
import { toRelativeTime } from "@utils/timeago";
import { GenericComment } from "@components/GenericComment";
import JoditEditor from "jodit-react";

const { Title} = Typography;

const showSuccess = (text: string) => {
  message.success(text);
};

const IssueDetail: React.FC = () => {

    const { id } = useParams<{id: string}>();
    const { isLoading, data } = useShow(Number(id));
    const toggleIssue = useToggleIssue(Number(id));
    const [comments, setComments] = React.useState<{
      author?: string,
      avatar?: string,
      content: string,
      datetime: React.ReactElement,
    }[]|undefined>(undefined);
    const [commentMain, setCommentMain] = React.useState<{
      author?: string,
      avatar?: string,
      content?: string,
      datetime: React.ReactElement,
    }|undefined>(undefined);
    const [commentText, setCommentText] = React.useState<string>("");
    const addCommentMutation = useAddComment(Number(id));
    const editor = React.useRef(null);

    React.useEffect(() => {

      let comments = data?.comments;
      let firstComment = comments?.shift();
      let result = comments?.map((comment) => {
        
        return {
          author: comment.owner.name,
          avatar: comment.owner.picture,
          content: comment.note,
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
        avatar: firstComment?.owner.picture,
        content: firstComment?.note,
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
        showSuccess("Incidente cerrado");
      });
    }

    const handleSubmit = () => {
      addCommentMutation.mutateAsync(commentText).then(() => {
        setCommentText("");
        showSuccess("Se ha publicado su comentario");
      });
    }

    if(isLoading){
      return (<><Spin></Spin></>);
    }
    
    return (
        <>
        <Header content={<Title level={3}>#{data?.id} {data?.title}</Title>}></Header>
        <Row justify="center">
            <Col span={16}>
                <Row align="middle">
                    <Col span={4}>
                      <ToggleButton
                        loading={toggleIssue.isLoading}
                        state={data?.status}
                        handleClose={handleCloseIssue}
                      />
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
              <GenericComment
                author={commentMain?.author}
                avatar={commentMain?.avatar}
                content={commentMain?.content}
                datetime={commentMain?.datetime}
              />
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
                  renderItem={(item, i) => (
                      <li key={i}>
                        <GenericComment
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
              <Form.Item>
                <JoditEditor
                  ref={editor}
                  value={commentText}
                  onBlur={newContent => setCommentText(newContent)}
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={addCommentMutation.isLoading} onClick={handleSubmit} type="primary">
                  Comentar
                </Button>
              </Form.Item>
            </Col>
            <Col span={4}> 
            </Col>
        </Row>
        </>
    );
};

export {IssueDetail};