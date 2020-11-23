import React, { Component } from 'react';
import { Card, Row, Col, DatePicker, Button, FInputNumber, Form, Select, Table, Modal, TreeSelect, Icon, Spin, message, InputNumber } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
var dateList = [];

class ManageRoom extends Component {

    state = {
        dateCount: 0,
        dateToImprove: '',
        typeA: 10,
        typeB: 8,
        typeC: 6,
        typeD: 1,
        typeE: 5,
        typeF: 2,
        showTypeA: 0,
        showTypeB: 0,
        showTypeC: 0,
        showTypeD: 0,
        showTypeE: 0,
        showTypeF: 0,
        dateToDelete: '',
        dateToGet: ''
    }


    onChange = (date, dateString) => {
        var date1 = date._d;
        var dd = date1.getDate();
        var mm = date1.getMonth() + 1;
        var yy = date1.getFullYear();
        var myDateString = dd + "-" + mm + "-" + yy;
        this.setState({
            dateToImprove: myDateString
        })
        console.log(myDateString)
    }


    onChangeDate = (date, dateString) => {
        while (dateList.length) {
            dateList.pop();
        }
        var date1 = date[0]._d;
        var date2 = date[1]._d;
        var dd = date1.getDate();
        var mm = date1.getMonth() + 1;
        var yy = date1.getFullYear();
        var myDateString = dd + "-" + mm + "-" + yy;
        dateList.push(myDateString);
        this.calDiff(date1, date2)
        this.setState({ dateCount: dateList.length })
    }

    calDiff = (date1, date2) => {
        var diff;
        var count = 0;
        if (date1 && date2) {
            diff = Math.floor((date2.getTime() - date1.getTime()) / 86400000);
            while (date1.getTime() < date2.getTime()) {
                date1.setDate(date1.getDate() + 1);
                var dd = date1.getDate();
                var mm = date1.getMonth() + 1;
                var yy = date1.getFullYear();
                var myDateString = dd + "-" + mm + "-" + yy;
                dateList.push(myDateString);
                count++;
            }
            date1.setDate(date1.getDate() - count)
        }
    }

    success = () => {
        message
            .loading('กำลังบันทึกข้อมูล..', 1)
            .then(() => message.success('บันทึกเรียบร้อยแล้ว', 1))
            .then(() => message.info('Loading finished is finished', 1));
    };

    handleSubmit = (e) => {
        confirm({
            title: 'ยืนยันการเปลี่ยนแปลง​',
            //content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk: () => {
                return new Promise((resolve, reject) => {
                    dateList.forEach(element => {
                        console.log(element);
                        const date = element
                        const typeA = 10
                        const typeB = 8
                        const typeC = 6
                        const typeD = 1
                        const typeE = 5
                        const typeF = 2
                        axios.post('/addAvailableRoom', ({ date, typeA, typeB, typeC, typeD, typeE, typeF })).then(resp => {
                            console.log(resp)
                        })

                    })
                    this.success();
                    setTimeout(function () {
                        window.location.reload()
                    }, 6000);

                })

            },
            onCancel: () => {
                window.location.reload()
            },
        })

    }

    handleOnChangeA = (value) => {
        this.setState({
            typeA: value
        })
    }

    handleOnChangeB = (value) => {
        this.setState({
            typeB: value
        })
    }

    handleOnChangeC = (value) => {
        this.setState({
            typeC: value
        })
    }

    handleOnChangeD = (value) => {
        this.setState({
            typeD: value
        })
    }

    handleOnChangeE = (value) => {
        this.setState({
            typeE: value
        })
    }

    handleOnChangeF = (value) => {
        this.setState({
            typeF: value
        })
    }

    handleImproveOnClick = (e) => {
        confirm({
            title: 'ยืนยันการเปลี่ยนแปลง​',
            onOk: () => {
                return new Promise((resolve, reject) => {
                    const date = this.state.dateToImprove
                    const typeA = this.state.typeA
                    const typeB = this.state.typeB
                    const typeC = this.state.typeC
                    const typeD = this.state.typeD
                    const typeE = this.state.typeE
                    const typeF = this.state.typeF
                    axios.put(`/updateRoom/${date}`, ({ typeA, typeB, typeC, typeD, typeE, typeF })).then(resp => {
                        console.log(resp)
                        this.success();
                        setTimeout(function () {
                            window.location.reload()
                        }, 2000);
                    })
                })

            },
            onCancel: () => {
                window.location.reload()
            },
        })
    }

    onChangeDateToDelete = (date, dateString) => {
        var date1 = date._d;
        var dd = date1.getDate();
        var mm = date1.getMonth() + 1;
        var yy = date1.getFullYear();
        var myDateString = dd + "-" + mm + "-" + yy;
        this.setState({
            dateToDelete: myDateString
        })
    }

    onDeleteOneDate = (e) => {
        const date = this.state.dateToDelete
        confirm({
            title: 'ยืนยันการเปลี่ยนแปลง​',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                axios.delete(`/deleteByDate/${date}`).then(resp => {
                    console.log(resp)
                    if (resp.status === 200) {
                        message
                            .loading('Action in progress..', 2)
                            .then(() => message.success('กำลังบันทึก', 2))

                        setTimeout(function () {
                            window.location.reload()
                        }, 2000)
                    }
                })

            },
            onCancel: () => {
                window.location.reload()
            }
        })
    }

    deleteAllDate = (e) => {
        const date = this.state.dateToDelete
        confirm({
            title: 'ยืนยันการเปลี่ยนแปลง​',
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                axios.delete('/deleteAllAvailableRoom').then(resp => {
                    console.log(resp)
                    if (resp.status === 200) {
                        message
                            .loading('Action in progress..', 2)
                            .then(() => message.success('กำลังบันทึก', 2))

                        setTimeout(function () {
                            window.location.reload()
                        }, 6000)
                    }
                })

            },
            onCancel: () => {
                window.location.reload()
            }
        })
    }

    onChangeToGetRoom = (date, dateString) => {
        var date1 = date._d;
        var dd = date1.getDate();
        var mm = date1.getMonth() + 1;
        var yy = date1.getFullYear();
        var myDateString = dd + "-" + mm + "-" + yy;
        this.setState({
            dateToGet: myDateString
        })
    }

    getRoom = (e) => {
        const date = this.state.dateToGet
        axios.get(`/${date}`).then(resp => {
            this.setState({
                showTypeA: resp.data.typeA,
                showTypeB: resp.data.typeB,
                showTypeC: resp.data.typeC,
                showTypeD: resp.data.typeD,
                showTypeE: resp.data.typeE,
                showTypeF: resp.data.typeF,
            })
        })
    } 


    render() {
            return(
            <div>
        <Row>
            <Col span={12}>
                <Card style={{ height: 430 }}>
                    <div style={{ marginBottom: '3%' }}>เพิ่มจำนวนวัน</div>
                    <RangePicker onChange={this.onChangeDate} format={dateFormat} />
                    <div style={{ marginTop: '4%' }}>จำนวนวันที่เพิ่มเข้าฐานข้อมูล : {this.state.dateCount} วัน</div>
                    <div style={{ marginLeft: '12%' }}>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านเดี่ยวหลังใหญ่ 10 ห้อง</div>
                        <div style={{ textAlign: 'left' }}>บ้านแฝดหลังเล็ก 8 ห้อง</div>
                        <div style={{ textAlign: 'left' }}>บ้านแฝด 6 ห้อง</div>
                        <div style={{ textAlign: 'left' }}>บ้านริมน้ำ 1 ห้อง</div>
                        <div style={{ textAlign: 'left' }}>เรือนไทยหลังเล็ก 5 ห้อง</div>
                        <div style={{ textAlign: 'left' }}>เรือนไทยหลังใหญ่ 2 ห้อง</div>
                    </div>
                    <div style={{ marginTop: '4%' }}><Button type="primary" onClick={(e) => this.handleSubmit(e)}>เพิ่มข้อมูล</Button></div>
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{ marginLeft: '5%', height: 430 }}>
                    <div style={{ marginBottom: '3%' }} >แก้ไขจำนวนห้อง</div>
                    <DatePicker onChange={this.onChange} format='DD/MM/YYYY' />
                    <div style={{ marginLeft: '12%' }}>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านเดี่ยวหลังใหญ่ <InputNumber min={0} max={10} defaultValue={10} onChange={(value) => this.handleOnChangeA(value)} /> ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านแฝดหลังเล็ก <InputNumber min={1} max={8} defaultValue={8} onChange={(value) => this.handleOnChangeB(value)} /> ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านแฝด <InputNumber min={1} max={6} defaultValue={6} onChange={(value) => this.handleOnChangeC(value)} /> ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านริมน้ำ <InputNumber min={1} max={1} defaultValue={1} onChange={(value) => this.handleOnChangeD(value)} /> ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>เรือนไทยหลังเล็ก <InputNumber min={1} max={5} defaultValue={5} onChange={(value) => this.handleOnChangeE(value)} /> ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>เรือนไทยหลังใหญ่ <InputNumber min={1} max={2} defaultValue={2} onChange={(value) => this.handleOnChangeF(value)} /> ห้อง</div>
                    </div>
                    <Button type="primary" style={{ marginTop: '3%' }} onClick={(e) => this.handleImproveOnClick(e)}>แก้ไขข้อมูล</Button>
                </Card>
            </Col>
        </Row>
        <Row style={{ marginTop: '3%' }}>
            <Col span={12}>
                <Card style={{ height: 380 }}>
                    <div style={{ marginBottom: '3%' }}>ลบข้อมูลวันในฐานข้อมูล</div>
                    <DatePicker onChange={(value) => this.onChangeDateToDelete(value)} format={dateFormat} />
                    <div style={{ marginTop: '5%' }}>
                        <Button onClick={(e) => this.onDeleteOneDate(e)}>ลบข้อมูลเฉพาะวันที่เลือก</Button> <Button onClick={(e) => this.deleteAllDate(e)} type='danger'>ลบข้อมูลห้องว่างทั้งหมด</Button>
                    </div>
                </Card>
            </Col>
            <Col span={12}>
                <Card style={{ marginLeft: '5%', height: 380 }}>
                    <div style={{ marginBottom: '3%' }} >ดูจำนวนห้อง</div>
                    <DatePicker onChange={this.onChangeToGetRoom} format='DD/MM/YYYY' /><Button style={{marginLeft: '3%'}} type='primary' onClick={(e) => this.getRoom(e)}>ค้นหา</Button>
                    <div style={{ marginLeft: '12%' }}>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านเดี่ยวหลังใหญ่ {this.state.showTypeA} ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านแฝดหลังเล็ก {this.state.showTypeB} ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านแฝด {this.state.showTypeC} ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>บ้านริมน้ำ {this.state.showTypeD} ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>เรือนไทยหลังเล็ก {this.state.showTypeE} ห้อง</div>
                        <div style={{ textAlign: 'left', marginTop: '3%' }}>เรือนไทยหลังใหญ่ {this.state.showTypeF} ห้อง</div>
                    </div>
                </Card>
            </Col>
        </Row>
            </div >
        )
    }
}

export default ManageRoom
