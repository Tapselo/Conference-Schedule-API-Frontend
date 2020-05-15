import React, {useEffect} from 'react'
import {Card, Row,Col, notification} from "antd";
import {useHistory} from 'react-router-dom'
import API from '../../services/api'
import {isEmpty} from 'lodash'

import Cookies from 'js-cookie'
import {useState} from "react";

export const AboutUser = () => {
    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [created, setCreated] = useState('');
    const history = useHistory();

    useEffect(() => {
        const token=Cookies.get('token');
        if(isEmpty(token)===true){
            notification['error']({
                message: 'Unauthenticated!',
                description: 'Please log in!',
                duration: 5
            });
            history.push('/user/login');
        }
        else{
            API.get(`/users/me`,{headers:{Authorization:`Bearer ${token}`}})
                .then(response => {
                    setId(response.data.id);
                    setEmail(response.data.email);
                    let temp=response.data.createdAt;
                    temp=temp.split('T');
                    temp[1]=temp[1].split('.');
                    temp='Date: '+temp[0]+'\n Time: '+temp[1][0];
                    setCreated(temp);
                })
                .catch(errInfo => {
                    notification['error']({
                        message: 'Error!',
                        description: 'Please log in to view your info!'
                    })
                })
        }
        // eslint-disable-next-line
        },[]);

    return (
        <>
                <Row gutter={14}>
                    <Col span={8}>
                        <Card title="Your e-mail address:" bordered={false}>
                            {email}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Your ID in database:" bordered={false}>
                            {id}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Account created at:" bordered={false}>
                            {created}
                        </Card>
                    </Col>
                </Row>
        </>
    )
};
