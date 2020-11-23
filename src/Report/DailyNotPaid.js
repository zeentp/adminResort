import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../FireBase/firebase';
import { Form, Select, Table, Modal, Button, Icon, message } from 'antd';
import firebase from '../FireBase/firebase';
import axios from 'axios';
const { Option } = Select;
const { confirm } = Modal;
var date = new Date();

class DailyNotPaid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allData: [],
        }
    }

    componentDidMount() {
        let wholeData = [];
        var dd = date.getDate() + 1
        var mm = date.getMonth() + 1
        var yy = date.getFullYear()
        var dateCheckin = dd + "-" + mm + "-" + yy
        console.log(dateCheckin)
        axios.get(`/findAllReceiptByCheckin/${dateCheckin}`).then(resp => {
            resp.data.forEach(element => {
                if (element.status === "รอการตรวจสอบ") {
                    var temp = {
                        id: element.id,
                        name: element.name,
                        phoneNum: element.phoneNum,
                        dateCheckIn: element.dateCheckin,
                        dateCheckOut: element.dateCheckOut,
                        cost: element.price
                    }

                    wholeData.push(temp);
                    console.log(element)

                }

                this.setState({ allData: wholeData });
            });

        })
    }

    render() {
        const columns = [
            { title: 'Booking Id', dataIndex: 'id', key: 'Id' },
            { title: 'Name', dataIndex: 'name', key: '0' },
            { title: 'Tell', dataIndex: 'phoneNum', key: '1' },
            { title: 'DateCheckIn', dataIndex: 'dateCheckIn', key: 'DateCheckIn' },
            { title: 'Price', dataIndex: 'cost', key: 'price', }
        ]
        return (
            <div>
                <Table
                    columns={columns}
                    expandedRowRender={(allData) =>
                        <p style={{ margin: 10 }}>{allData['details']} </p>

                    }
                    dataSource={this.state.allData}
                />
            </div>
        )
    }
}

export default DailyNotPaid