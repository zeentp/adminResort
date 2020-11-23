import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../FireBase/firebase';
import { Form, Select, Table, Modal, message, Icon, Button } from 'antd';
import firebase from '../FireBase/firebase';
import axios from 'axios';
const { Option } = Select;
var delayInMilliseconds = 4000;
var delay = 1000;
const { confirm } = Modal;
const db = firebase.firestore();
class TablePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      assignRoom: "-",
      status: "",
      listOption: "",
      value: '',
      label: ''
    }
  }
  componentDidMount() {
    let wholeData = [];
    axios.get('/findAllReceiptInfo').then(resp => {
      resp.data.forEach(element => {
        var temp = {
          id: element.id,
          name: element.name,
          phoneNum: element.phoneNum,
          price: element.price,
          datePayment: element.datePayment,
          timePayment: element.timePayment,
          status: element.status,
          url: element.url,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });

    })
    console.log(wholeData)


  }
  success = () => {
    message
      .loading('Action in progress..', 1)
      .then(() => message.success('กำลังบันทึก', 2))
      .then(() => message.info('Loading finished is finished', 2));
  };

  onChangeSelect = (value, record) => {
    if (record.status === "รอการตรวจสอบ" && value === "check-in") {
      message.error('ยังไม่มีการชำระค่ามัดจำ');
      setTimeout(function () {
        window.location.reload()
      }, delay);
    } else if (record.status === "ชำระมัดจำแล้ว" && value === "ชำระมัดจำแล้ว") {
      message.error('ชำระมัดจำไปแล้ว');
    } else {
      confirm({
        title: 'ยืนยันการเปลี่ยนแปลง​',
        content: '',
        onOk: () => {
          console.log(record);
          return new Promise((resolve, reject) => {
            const phoneNum = record.phoneNum;
            const id = record.id
            const status = value;
            if (value === "ชำระมัดจำแล้ว") {
              axios.put(`/updateStatusReceiptById/${id}`, ({ status }))
              axios.put(`/updateStatusRecById/${id}`, ({ status }))
              //axios.put(`/updateStatusCusById/${id}`, ({ status }))
              axios.put(`/updateStatusBookingById/${id}`, ({ status })).then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                  resolve();
                  this.success();
                  setTimeout(function () {
                    window.location.reload()
                  }, delayInMilliseconds);
                }
              }).catch(e => {
                reject(value = e)
              })
              // window.location.reload()
            }
            else if (value === "check-in") {
              axios.get(`/findBookingInfoById/${id}`).then(resp => {
                console.log(resp);
                const id = resp.data.id
                const name = resp.data.name;
                const email = resp.data.email;
                const details = resp.data.details;
                const dateCheckin = resp.data.dateCheckIn;
                const dateCheckOut = resp.data.dateCheckOut;
                const { assignRoom } = this.state;
                const reserveA = resp.data.reserveA;
                const reserveB = resp.data.reserveB;
                const reserveC = resp.data.reserveC;
                const reserveD = resp.data.reserveD;
                const reserveE = resp.data.reserveE;
                const reserveF = resp.data.reserveF;
               
                axios.post('/addCustomerInfo',({name,phoneNum,email}))
                axios.post('/AddCheckInInfo', ({ id, name, phoneNum, email, details, dateCheckin, dateCheckOut, status, assignRoom,reserveA,reserveB,reserveC,reserveD,reserveE,reserveF}))
              });
              axios.put(`/updateStatusRecById/${id}`, ({ status }))
              axios.delete(`/deleteReceiptInfoById/${id}`)
              axios.delete(`/deleteBookingInfoById/${id}`).then(resp => {
                console.log("delay");
                if (resp.status === 200) {
                  resolve();
                  this.success();
                  setTimeout(function () {
                    window.location.reload()
                  }, delayInMilliseconds);

                }
              }).catch(e => {
                reject(value = e)
              })
            }
            else if (value === "ไม่เข้าพัก") {
              //axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
              axios.get(`/findBookingInfoById/${id}`).then(resp => {
                console.log(resp);
                const name = resp.data.name;
                const phoneNum = resp.data.phoneNum;
                const dateCheckIn = resp.data.dateCheckIn;
                const dateCheckOut = resp.data.dateCheckOut;
                const { assignRoom } = this.state;
                axios.post('/AddHistory', ({ id, name, phoneNum, dateCheckIn, dateCheckOut, status, assignRoom }))
              });
              axios.delete(`/deleteReceiptInfoById/${id}`)
              axios.delete(`/deleteStatusInfoById/${id}`)
              axios.delete(`/deleteBookingInfoById/${id}`).then(resp => {
                if (resp.status === 200) {
                  resolve();
                  this.success();
                  setTimeout(function () {
                    window.location.reload()
                  }, delayInMilliseconds);
                }
              }).catch(e => {
                reject(value = e)
              })
            } else if (value === "การชำระเงินไม่ถูกต้อง") {
              axios.put(`/updateStatusRecById/${id}`, ({ status }))
              axios.put(`/updateStatusBookingById/${id}`, ({ status }))
              axios.delete(`/deleteReceiptInfoById/${id}`).then(resp => {
                if (resp.status === 200) {
                  resolve();
                  this.success();
                  setTimeout(function () {
                    window.location.reload()
                  }, delayInMilliseconds);
                }
              }).catch(e => {
                reject(value = e);
              })
            }

          }).catch((e) => console.log('ERROR', e));
        },
        onCancel: () => {
          window.location.reload()
        },
      });
    };
  }




  render() {
    const columns = [
      { title: 'Customer Id', dataIndex: 'id', key: 'Id' },
      { title: 'Name', dataIndex: 'name', key: 'Name' },
      { title: 'Tell', dataIndex: 'phoneNum', key: 'Tell' },
      { title: 'จำนวนเงินที่โอน', dataIndex: 'price', key: 'Price' },
      { title: 'วันที่โอนมัดจำ', dataIndex: 'datePayment', key: 'datePayment' },
      { title: 'เวลาที่โอนมัดตำ', dataIndex: 'timePayment', key: 'timePayment' },
      {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => <Select showSearch
          style={{ width: 200 }}
          placeholder={text}
          optionFilterProp="children"
          //onClick = {this.addOption}
          onChange={(value) => this.onChangeSelect(value, record)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="ชำระมัดจำแล้ว">ชำระมัดจำแล้ว</Option>
          <Option value="การชำระเงินไม่ถูกต้อง">การชำระเงินไม่ถูกต้อง</Option>
          <Option value="check-in">check-in</Option>
          <Option value="ไม่เข้าพัก">ไม่เข้าพัก</Option>

        </Select>
      },
    ];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            expandedRowRender={(allData) =>
              <img style={{ width: '20%', marginLeft: '40%' }} src={allData.url} ></img>
            }
            dataSource={this.state.allData}
          />
        </div>
      </div>
    )
  }
}
export default Form.create()(TablePayment);