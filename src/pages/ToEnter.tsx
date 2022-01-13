import { Navigate, useNavigate } from 'react-router-dom'
import { SaveOutlined } from '@ant-design/icons';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { useState } from 'react';
import { getUserStorage } from '../helpers/getUsuarioStorage';

const { Title, Text } = Typography;

export const ToEnter = () => {
    const navigate = useNavigate();

    const [usuario] = useState(getUserStorage());

    useHideMenu(false);


    /*
        (onFinish, onFinishFailed ) => Permiten que aparezcan los mnesages de error
    */
    const onFinish = (values: any) => {
        localStorage.setItem('agent', values.nameagent);
        localStorage.setItem('desck', values.desk);
        navigate('/descktop');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if(usuario.agent && usuario.desck ) return <Navigate to="/descktop" />

    return (
        <>
            <Title level={2}>Access to the system</Title>
            <Text>Enter your name and descktop number</Text>
            <Divider />
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name Agent"
                    name="nameagent"
                    rules={[{ required: true, message: 'Please input name agent!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Desk Number"
                    name="desk"
                    rules={[{ required: true, message: 'Please input your desk!' }]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round">
                        <SaveOutlined />
                        Go
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
