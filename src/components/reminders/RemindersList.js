import React, {useEffect, useState} from "react";
import {Row, notification} from 'antd';
import API from "../../services/api";
import {ReminderObject} from "./ReminderObject";
import Cookies from "js-cookie";
import {isEmpty} from "lodash";
import {useHistory} from 'react-router-dom'

export const RemindersList = () => {
    const [reminders,setReminders]=useState([]);
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
        else {
            API.get(`/reminders`, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    setReminders(response.data);
                })
                .catch(errInfo => {
                    notification['error']({
                        message: 'Error!',
                        description: errInfo.toString()
                    })
                });
        }
        // eslint-disable-next-line
    },[]);

    return (
        <div className="RemindersList">
            <Row>
                {reminders.map(pres => <ReminderObject key={pres.id} reminderId={pres.id}
                                                       presentationId={pres.presentationId}/>)}
            </Row>
        </div>
    )
};