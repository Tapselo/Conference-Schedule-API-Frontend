import React from 'react'
import {Button, Card, Form, Input, notification} from "antd";
import {useHistory} from 'react-router-dom'
import API from '../../services/api'

export const CreateAccount = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const handleOnFinish = (values) => {
        API.post('/users', {email:values.email,password:values.password})
            .then(response => {
                notification.open({
                    message: 'Account Created',
                    description: 'Welcome new user! Now please, log in!',
                    duration: 3}
                );
                history.push('/user/login');
            })
            .catch(errInfo => {
                if(errInfo.toString().includes("409")){
                    notification['error']({
                        message: 'Register error!',
                        description: 'Email is already registered'})
                }else{
                    notification['error']({
                        message: 'Register error!',
                        description: 'Check input!'})
                }
            })

    };

    return (
        <>
            <Card title='Create new account:'>
                <Form form={form} onFinish={handleOnFinish}>
                    <Form.Item name='email' rules={[
                        {   required: true,
                            message: 'Please input your e-mail!'},{
                            type: "email",
                            message: "Must enter correct e-mail address!"
                        }]}>
                        <Input  placeholder='Enter your e-mail address'/>
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder='Enter your password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Create account now</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
};