import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import '../css/CustomerInfoShow.css'
import ManageRoom from '../ManageRoom/ManageRoom';

const { Header, Content, Footer } = Layout;

class ManageRoomView extends Component {

    render() {
        return (
            <div>
                <Layout className="layout" style={{ fontFamily: "Kanit, sans-serif" }}>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['8']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1"><Link to='/BookingInfoShow'>ข้อมูลการจอง</Link></Menu.Item>
                            <Menu.Item key="2"><Link to='/ReceiptInfoShow'>ตรวจสอบการโอนเงิน</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/CheckInInfoShow'>ข้อมูลการเข้าพัก</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/HistoryInfoShow'>ประวัติลูกค้า</Link></Menu.Item>
                            <Menu.Item key="5"><Link to='/StatusRecShow'>สถานะของลูกค้า</Link></Menu.Item>
                            <Menu.Item key="6"><Link to='/CustomerInfoShow'>ข้อมูลลูกค้าทั้งหมด</Link></Menu.Item>
                            <Menu.Item key="7"><Link to='/ReportShow'>รายงาน</Link></Menu.Item>
                            <Menu.Item key="8"><Link to='/ManageRoom'>แก้ไขข้อมูลห้องพัก</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, height: 900 }}><ManageRoom/></div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>FaangFang Resort</Footer>
                </Layout>
            </div>
        )
    }
}

export default ManageRoomView