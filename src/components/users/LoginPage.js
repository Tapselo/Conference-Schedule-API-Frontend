import React from 'react'
import {Button, Card, Form, Input, notification} from "antd";
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import API from '../../services/api'

export const LoginPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const handleOnFinish = (values) => {
        const credentials=btoa(`${values.email}:${values.password}`);
        API.post('/auth',  {}, {headers:{Authorization:`Basic ${credentials}`}})
            .then(response => {
                Cookies.set('token',response.data.token,{expires:1,path:'/'});
                notification.open({
                    message: 'Welcome!',
                    description: 'You are logged in!',
                    duration: 3}
                );
                history.push("/")
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Login error!',
                    description: 'Wrong email or password - Check your input'
                })
            })
    };

    return (
        <>
            <Card title='Login:'>
                <Form form={form} onFinish={handleOnFinish} style={{ width: 300}}>
                    <Form.Item name='email' rules={[
                        {   required: true,
                            message: 'Please input your e-mail!'},{
                            type: "email",
                            message: "Must enter correct e-mail address!"
                    }]}>
                        <Input  placeholder='E-mail'/>
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder='Password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Log me in</Button>
                        Or <a href="/user/register">register now!</a>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
};

