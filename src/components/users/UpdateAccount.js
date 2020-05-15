import React, {useEffect} from 'react'
import {Button, Card, Form, Input, notification} from "antd";
import {useHistory} from 'react-router-dom'
import API from '../../services/api'
import 'jwt-decode'
import Cookies from 'js-cookie'
import {CheckCircleTwoTone} from "@ant-design/icons";
import {isEmpty} from "lodash";

export const UpdateAccount = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const handleOnFinish = (values) => {
        const token=Cookies.get('token');
        const jwt_decode=require('jwt-decode');
        const decodedJWT=jwt_decode(token);
        const id=decodedJWT.sub;

        API.put(`/users/${id}`,{email:values.email,password:values.password}, {headers:{Authorization:`Bearer ${token}`}})
            .then(response => {
                notification.open({
                    message: 'Credentials updated!',
                    description: 'Please log in again to authenticate yourself!',
                    duration: 3,
                    icon:  <CheckCircleTwoTone twoToneColor="#52c41a" />}
                );
                history.push("/user/login");
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Login error!',
                    description: 'Wrong email or password - Check your input'
                })
            })

    };

    useEffect(()=>{
        const token=Cookies.get('token');
        if(isEmpty(token)===true){
            notification['error']({
                message: 'Unauthenticated!',
                description: 'Please log in!',
                duration: 5
            });
            history.push('/user/login');
        }
        // eslint-disable-next-line
    },[]);

    return (
        <>
            <Card title='Change your credentials:'>
                <Form form={form} onFinish={handleOnFinish} style={{width: 300}}>
                    <Form.Item name='email' rules={[
                        {   type: "email",
                            message: "Must enter correct e-mail address!"
                        }]}>
                        <Input placeholder='Enter new E-mail address'/>
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password  placeholder='Enter new password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Submit changes</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
};