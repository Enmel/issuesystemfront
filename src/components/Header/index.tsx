import React from "react";
import { Row, Col } from 'antd';
import { ArrowLeftOutlined} from '@ant-design/icons';
import { useHistory } from "react-router";

const Header: React.FC<{content : React.ReactElement}> = ({content}) => {

    const history = useHistory();

    const backAction = () => {
        history.go(-1);
    }

    return (
        <Row>
            <Col span={4}>
                {history.length < 2 || <ArrowLeftOutlined onClick={backAction} style={{width: "30px", height: "25px"}}/>}
            </Col>
            <Col span={16} style={{display: "flex", justifyContent: "start"}}>
                {content}
            </Col>
            <Col span={4}>
            </Col>
        </Row>
    );
}

export { Header };