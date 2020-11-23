import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import { Form, Table, Select, Modal, message, DatePicker } from 'antd';
import axios from 'axios';
const { RangePicker } = DatePicker;
var dateList = [];
const dateFormat = 'DD/MM/YYYY';
let count = 0;
class DailyReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            dateStart: '',
            dateEnd: '',
            show: 'none'
        }
    }
    onClick = e => {

        this.setState({
            show: ''
        })
        var wholeData = []
        dateList.forEach(dateCheckin => {
            console.log(dateCheckin)
            axios.get(`findAllCheckInInfoByDateCheckin/${dateCheckin}`).then(resp => {
                console.log("eiei")
                resp.data.forEach(element => {
                    var temp = {
                        id: element.id,
                        name: element.name,
                        phoneNum: element.phoneNum,
                        email: element.email,
                        dateCheckIn: element.dateCheckin,
                        dateCheckOut: element.dateCheckOut
                    }
                    console.log("temp", temp)
                    wholeData.push(temp)
                    console.log(wholeData)
                    count++;
                    this.setState({
                        allData: wholeData

                    })
                })

            })
        })
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
        var d = myDateString;
        this.calDiff(date1, date2)
        console.log(dateList)
        this.setState({
            dateStart: dateList[0],
            dateEnd: dateList[dateList.length - 1]
        })
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
                var d = myDateString;
                count++;
            }
            date1.setDate(date1.getDate() - count)
        }
    }

    render() {
        const columns = [
            { title: 'Booking Id', dataIndex: 'id', key: 'Id' },
            { title: 'Name', dataIndex: 'name', key: '0' },
            { title: 'Tell', dataIndex: 'phoneNum', key: '1' },
            { title: 'Email', dataIndex: 'email', key: 'Email' },
            { title: 'DateCheckIn', dataIndex: 'dateCheckIn', key: 'DateCheckIn' },
            { title: 'DateCheckOut', dataIndex: 'dateCheckOut', key: 'DateCheckOut', },
        ]
        return (
            <div>
                <RangePicker onChange={this.onChangeDate} format={dateFormat} />
                <Button type="primary" shape="circle" icon="search" style={{ marginLeft: '3%' }} onClick={(e) => this.onClick(e)} />
                <div style={{display: this.state.show}} >
                    <div style={{ textAlign: 'left', marginTop: '3%', fontSize: '16px', marginBottom: '3%' }}>
                        <div >รายงานชื่อลูกค้าที่จะ check-in ในแต่ละวัน</div>
                        <div>DateFrom {this.state.dateStart} to {this.state.dateEnd} </div>
                    </div>
                    {/* <Button type="primary" >Search</Button> */}
                    <Table
                        columns={columns}
                        // expandedRowRender={(allData) =>
                        //     //<p style={{ margin: 10 }}>{allData['details']} </p>
                        // }
                        dataSource={this.state.allData}
                    />
                    <div style={{ textAlign: 'left', marginTop: '3%', fontSize: '16px', marginBottom: '3%' }} > รวม {count} รายการ</div>
                </div>
            </div>
        )
    }
}

export default DailyReport