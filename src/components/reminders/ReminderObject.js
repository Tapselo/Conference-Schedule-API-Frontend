import React, {useEffect, useState} from 'react'
import {Button, Card, Form, Input, notification, Popover} from "antd";
import { MoreOutlined,DeleteOutlined,FilePdfOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import API from "../../services/api";
import Cookies from "js-cookie";

export const ReminderObject = (props) => {
    let reminderId=props.reminderId;
    let presentationId=props.presentationId;

    const [notes, setNotes] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile]=useState('');
    const [authors, setAuthors]=useState('');
    const [keywords, setKeywords]=useState('');

    useEffect(() => {
        const token=Cookies.get('token');
        API.get(`/reminders/${reminderId}`,{headers:{Authorization:`Bearer ${token}`}})
            .then(response => {
                setNotes(response.data.notes);
                getPresentationInfo();
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Error!',
                    description: errInfo.toString()
                })
            });
// eslint-disable-next-line
    },[reminderId]);

    function getPresentationInfo(){
        const token=Cookies.get('token');
        API.get(`/presentations/${presentationId}`,{headers:{Authorization:`Bearer ${token}`}})
            .then(response=>{
                setTitle(response.data.title);

                let temp=response.data.date;
                temp=temp.split('T');
                temp[1]=temp[1].split('.');
                temp='Date: '+temp[0]+'\t Time: '+temp[1][0].substring(0,5);
                setDate(temp);

                setFile(response.data.filename);
                setAuthors(response.data.authors.join(", "));
                setKeywords(response.data.keywords.join(", "));
            })
            .catch(err=>{
                notification['error']({
                    message: 'Error!',
                    description: err.toString()
                })
            })
    }

    function downloadAbstract(){
        API.get(`/abstracts/${file}`,{responseType: 'arraybuffer'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',`${file.split('/')[1]}`);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Error!',
                    description: 'No file assigned to presentation!'
                })
            });
    }

    function showEditForm(){
        const [form] = Form.useForm();
        let tmp=<div>
            <p><b>Authors:</b> {authors}</p>
            <p><b>Keywords:</b> {keywords}</p>
            <hr></hr>
            <p><b>Edit note:</b></p>
            <Form form={form} onFinish={editReminder} style={{ width: 300}}>
                <Form.Item name='newNote'>
                    <Input  placeholder='Enter new note' value={notes} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Edit Note</Button>
                </Form.Item>
            </Form>
        </div>;
        return tmp;
    }

    function editReminder(values){
        const token=Cookies.get('token');
        API.put(`/reminders/${reminderId}`,{ "presentationId": `${presentationId}`, "notes": values.newNote,
                                            "enabled": true }, {headers:{Authorization:`Bearer ${token}`}})
            .then(response=>{
                notification.open({
                    message: 'Saved',
                    description: 'Note edited!',
                    duration: 5,
                    icon:  <CheckCircleTwoTone twoToneColor="#52c41a" />
                });
                setNotes(values.newNote)
            })
            .catch(err=>{
                notification['error']({
                    message: 'Error!',
                    description: 'Edit error!'
                })
            })
    }

    function deleteReminder(){
        const token=Cookies.get('token');
        API.delete(`/reminders/${reminderId}`, {headers:{Authorization:`Bearer ${token}`}})
            .then(response=>{
                notification.open({
                    message: 'Reminder deleted',
                    description: 'Refreshing...',
                    duration: 5,
                    icon:  <CheckCircleTwoTone twoToneColor="#52c41a" />
                });
                window.location.reload();
            })
            .catch(err=>{
                notification['error']({
                    message: 'Error!',
                    description: err.toString()
                })
            })
    }

    return (
        <div className="reminderObject">
            <Card style={{ width: 300, margin: 8 }} hoverable={true} title={title} size="small" bordered={true} actions={[
                <Popover content={showEditForm()} title={title} trigger="click">
                    <MoreOutlined key="edit"/>
                </Popover>,
                <Popover content={<Button danger onClick={()=>deleteReminder()}>
                                    Yes, delete this reminder</Button>} title="Are you sure?" trigger="click">
                    <DeleteOutlined key="delete"/>
                </Popover>,
                <FilePdfOutlined key="file" trigger="click" onClick={()=>downloadAbstract()}/>
            ]}>
                <p>{date}</p>
                <p><b>Your Note:</b></p>
                <p>{notes}</p>
            </Card>
        </div>
    )
};
