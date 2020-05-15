import React from 'react'
import {Button, Card, Form, Input, notification, Popover} from "antd";
import {CheckCircleTwoTone, FilePdfOutlined, MoreOutlined, SaveOutlined} from '@ant-design/icons';
import API from "../../services/api";
import Cookies from "js-cookie";

export const PresentationObject = (props) => {
    let id=props.id;
    let title=props.title;
    let date=props.date.replace(":00","");
    let keywords=props.keywords.join(", ");
    let session=props.session;
    let authors=props.authors.join(", ");
    let file=props.file;

    let temp=date;
    temp=temp.split('T');
    temp[1]=temp[1].split('.');
    temp=temp[1][0];
    date=temp;

    let authShort=authors;
    if (authShort.length > 25) {
        authShort = authShort.substring(0, 24) + "...";
    }

    function moreInfo (){

        let more=<div>  <p><b>Keywords:</b> {keywords}</p>
                        <p><b>Authors:</b> {authors}</p>
                        <p><b>Session:</b> {props.sessions[session]["name"]}</p>
                        <p><b>Room:</b> {props.sessions[session]["localization"]}</p>
                        </div>;
        return more;
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

    function makeReminder(values){
        const token=Cookies.get('token');
        API.post(`/reminders`,{"presentationId": id, "notes": values.notes, "enabled": true},
                                {headers:{Authorization:`Bearer ${token}`}

        })
            .then(response=>{
                notification.open({
                    message: 'Saved!',
                    description: 'Reminder set!',
                    duration: 3,
                    icon:  <CheckCircleTwoTone twoToneColor="#52c41a" />
                });
            })
            .catch(err=>{
                notification['error']({
                    message: 'Error!',
                    description: 'Reminder not created!'
                })
            })
    }

    function showSaveForm(){
        const [form] = Form.useForm();
        return <div>
            <Form form={form} onFinish={makeReminder} style={{width: 300}}>
                <Form.Item name='notes'>
                    <Input placeholder='Enter your notes'/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Set Reminder</Button>
                </Form.Item>
            </Form>
        </div>;
    }

    return (
            <Card style={{ width: 300, margin: 8 }} hoverable={true} size="small" title={title} bordered={true} actions={[
                <Popover content={moreInfo()} title={title} trigger="click">
                    <MoreOutlined key="more"/>
                </Popover>,
                <Popover content={showSaveForm()} title="Set new reminder:" trigger="click">
                    <SaveOutlined key="save"/>
                </Popover>,
                <FilePdfOutlined key="file" trigger="click" onClick={()=>downloadAbstract()}/>
            ]}>
                <p><b>Starts at:</b> {date}</p>
                <p><b>Authors:</b> {authShort}</p>
            </Card>
    )
};