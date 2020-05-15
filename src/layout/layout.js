import React from 'react';
import 'antd/dist/antd.css';
import './layouts.css';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import {Routing} from '../Routing'
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

const DarkLayout = withRouter(props => {
    const { location } = props;

    return(
    <Layout className="layout" collapsible='true'>
        <Header>
            <Menu theme ="dark" mode="horizontal" selectedKeys={[location.pathname]} >
                <Menu.Item key="/">
                    <Link to="/">Presentations</Link>
                </Menu.Item>

                <Menu.Item key="/reminders">
                    <Link to="/reminders">Reminders</Link>
                </Menu.Item>

                <SubMenu title={    <>  User  </>   }>
                    <Menu.ItemGroup title="Account management">
                        <Menu.Item key="/user/login">
                            <Link to="/user/login">Login</Link>
                        </Menu.Item>
                        <Menu.Item key="/user/me">
                            <Link to="/user/me">Info</Link>
                        </Menu.Item>
                        <Menu.Item key="/user/update">
                            <Link to="/user/update">Edit</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

                <Menu.Item key="/about">
                    <Link to="/about">About(404)</Link>
                </Menu.Item>

            </Menu>
        </Header>

        <Content style={{ padding: '30 30px', alignContent:"center" }}>
            <div className="site-layout-content">
                <Routing/>
            </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Conference Schedule API ©2020 Created by Artur Lehrfeld</Footer>
    </Layout>
)});


export default DarkLayout;