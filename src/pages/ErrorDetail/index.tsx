import React from 'react';
import { Row, Col, Tooltip, Typography, Comment, List, Button, Form, Spin, message} from 'antd';
import { useParams } from "react-router-dom";
import { useShow, useToggleError, useAddComment } from "./hooks";
import { ToggleButton } from './components/ToggleButton';
import { PopOverGroup, PopOverUser} from '@components/Popover';
import { toRelativeTime } from "@utils/timeago";
import { Header } from "@components/Header"
import { GenericComment } from "@components/GenericComment"
import JoditEditor from "jodit-react";

const { Title } = Typography;

const showSuccess = (text: string) => {
  message.success(text);
};

const ErrorDetail: React.FC = () => {

    const { id } = useParams<{id: string}>();
    const { isLoading, data } = useShow(Number(id));
    const toggleError = useToggleError(Number(id));
    const [comments, setComments] = React.useState<{
      author?: string,
      avatar?: string,
      content?: string,
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
          author: comment?.owner.name,
          avatar: comment?.owner.picture.url,
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
        author: firstComment?.owner?.name,
        avatar: firstComment?.owner?.picture.url,
        content: firstComment?.note,
        datetime: (
          <Tooltip title={firstComment?.created_at}>
            <span>{toRelativeTime(firstComment?.created_at)}</span>
          </Tooltip>
        )
      });
    }, [data]);


    const handleCloseError = () => {
      toggleError.mutateAsync().then(() => {
        showSuccess("Error marcado como resuelto");
      });
    }

    const handleSubmit = () => {
      addCommentMutation.mutateAsync(commentText).then(() => {
        setCommentText("")
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
                        loading={toggleError.isLoading}
                        state={data?.status}
                        handleClose={handleCloseError}
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
            <Col span={14}> 
              <List
                  className="comment-list"
                  header={`${data?.comments.length} respuestas`}
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={item => (
                      <li>
                        <GenericComment
                          avatar={item.avatar}
                          author={item.author}
                          datetime={item.datetime}
                          content={item.content}
                        />
                      </li>
                  )}
              />
            </Col>
            <Col span={4}> 
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

export {ErrorDetail};