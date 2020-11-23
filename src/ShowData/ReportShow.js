import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import TableReportAmountRoom from '../Report/TableReportAmountRoom';
import TableDailyReport from '../Report/DailyReport';
import '../css/CustomerInfoShow.css'

const { Header, Content, Footer } = Layout;

class ReceiptInfoShow extends Component {

    state = {
        showDailyReport: 'none',
        showMonthReport: '',
        dailyButton: '',
        monthlyButton: 'none'
    }

    dayOnClick = e => {
        this.setState({
            showDailyReport: '',
            showMonthReport: 'none',
            dailyButton: 'none',
            monthlyButton: ''
        })
    }

    monthOnClick = e => {
        this.setState({
            showDailyReport: 'none',
            showMonthReport: '',
            dailyButton: '',
            monthlyButton: 'none'
        })
    }

    render() {
        return (
            <div>
                <Layout className="layout" style={{ fontFamily: "Kanit, sans-serif" }}>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['7']}
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
                        <div style={{ background: '#fff', padding: 24, height: 1000 }}>
                            <Button style={{ marginLeft: '70%', display: this.state.dailyButton }} onClick={(e) => this.dayOnClick(e)}>รายงานชื่อลูกค้าที่จะ check-in ในแต่ละวัน</Button>
                            <Button style={{ marginLeft: '70%', display: this.state.monthlyButton }} onClick={(e) => this.monthOnClick(e)} >รายงานจำนวนห้องพักที่มีผู้เข้าพักในแต่ละเดือน</Button>
                            <div style={{ display: this.state.showMonthReport }} >
                                <TableReportAmountRoom />
                            </div>
                            <div style={{ display: this.state.showDailyReport }}>
                                <TableDailyReport style={{ display: this.state.showDailyReport }} />
                            </div>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>FaangFang Resort</Footer>
                </Layout>
            </div>
        )
    }
}

export default ReceiptInfoShow