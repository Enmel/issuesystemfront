import React, { FC } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useProvideAuth } from '../../hooks/useAuth';
import { useHistory } from "react-router-dom";

const Login: FC = () => {

    let {signin} = useProvideAuth();
    let history = useHistory();

    const onFinish = (values: any) => {

        signin({
            email: values.email,
            password: values.password
        }, () => {
            history.replace("/a/issues");
        });
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Row justify="center"> 
            <Col span={8}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{paddingTop: '10rem'}}
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Debe introducir su email' }]}
                    >
                        <Input />
                    </Form.Item>
                
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Debe introducir su clave de acceso' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Iniciar sesion
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export {Login};

