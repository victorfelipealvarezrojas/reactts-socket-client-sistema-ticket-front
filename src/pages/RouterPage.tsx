
import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from 'react-router-dom';
import { ToEnter } from './ToEnter';
import { Queue } from './Queue';
import { NewTicket } from './NewTicket';
import { Descktop } from './Descktop';
import { UiContext } from '../context/UiContext';


const { Sider, Content } = Layout;

export const RouterPage = () => {

    const { hideMenu, showHideMenu } = useContext<any>(UiContext)


    return (
        <Router>
            <Layout style={{ height: '100rem' }}>
                <Sider
                    collapsedWidth="0"
                    breakpoint="md"
                    hidden={hideMenu}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/enter">
                                To Enter
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/queue">
                                Queue
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to="/newticket">
                                New Ticket
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path="/enter" element={<ToEnter />} />
                            <Route path="/queue" element={<Queue />} />
                            <Route path="/newticket" element={<NewTicket />} />
                            <Route path="/descktop" element={<Descktop />} />
                            <Route path="*" element={<Navigate to="/enter" />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}
