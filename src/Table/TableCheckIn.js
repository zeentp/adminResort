import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../FireBase/firebase';
import { Form, Select, Table, Modal, TreeSelect, Icon, Spin, Button, message } from 'antd';
import firebase from '../FireBase/firebase';
import axios from 'axios';
const { SHOW_PARENT } = TreeSelect;
const { Option, OptGroup } = Select;
const { confirm } = Modal;
const db = firebase.firestore();
var delayInMilliseconds = 2000;

const children = [];
class TableCheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
      allData: [],
      assignRoomm: "",
      loading: false,
      assignRoom: "",
    }
  }
  componentDidMount() {
    let wholeData = [];
    axios.get('/findAllCheckInInfo').then(resp => {
      resp.data.forEach(element => {
        this.setState({ assignRoomm: element.assignRoom })
        console.log(this.state.assignRoomm)
        var temp = {
          id: element.id,
          name: element.name,
          phoneNum: element.phoneNum,
          email: element.email,
          details: element.details,
          dateCheckin: element.dateCheckin,
          dateCheckOut: element.dateCheckOut,
          status: element.status,
          assignRoom: element.assignRoom,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
    console.log(wholeData)
    this.addChildren();
  }
  addChildren = () => {

    for (let i = 1; i <= 10; i++) {
      children.push(<OptGroup label="บ้าน"></OptGroup>);
      children.push(<Option key={"A" + i}>{"A" + i}</Option>);
    }
    for (let i = 1; i <= 8; i++) {
      children.push(<OptGroup label="บ้าน"></OptGroup>);
      children.push(<Option key={"B" + i}>{"B" + i}</Option>);
    }
    for (let i = 1; i <= 6; i++) {
      children.push(<OptGroup label="บ้าน"></OptGroup>);
      children.push(<Option key={"C" + i}>{"C" + i}</Option>);
    }
    children.push(<Option key={"ริมน้ำ"}>{"ริมน้ำ"}</Option>);
    for (let i = 1; i <= 5; i++) {
      children.push(<OptGroup label="บ้าน"></OptGroup>);
      children.push(<Option key={"D" + i}>{"D" + i}</Option>);
    }
    children.push(<OptGroup label="บ้าน"></OptGroup>);
    children.push(<Option key={"เรือนไทยหลังใหญ่1"}>{"เรือนไทยหลังใหญ่1"}</Option>);
    children.push(<Option key={"เรือนไทยหลังใหญ่2"}>{"เรือนไทยหลังใหญ่2"}</Option>);

  }
  success = () => {
    message
      .loading('กำลังบันทึกข้อมูล..', 2)
      .then(() => message.success('บันทึกเรียบร้อยแล้ว', 2))
      .then(() => message.info('Loading finished is finished', 2));
  };
  onChangeSelect = (value, record) => {
    confirm({
      title: 'ยืนยันการเปลี่ยนแปลง​',
      //content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        return new Promise((resolve, reject) => {
          const phoneNum = record.phoneNum;
          const id = record.id;
          const status = value;
          if (value === "check-out") {
            // axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))  //ยังไม่ได้แก้
            axios.get(`/findCheckInInfoById/${id}`).then(resp => {
              console.log(resp);
              const name = resp.data.name;
              const phoneNum = resp.data.phoneNum;
              const email = resp.data.email;
              const dateCheckIn = resp.data.dateCheckin;
              const dateCheckOut = resp.data.dateCheckOut;
              const assignRoom = resp.data.assignRoom;
              const reserveA = resp.data.reserveA;
              const reserveB = resp.data.reserveB;
              const reserveC = resp.data.reserveC;
              const reserveD = resp.data.reserveD;
              const reserveE = resp.data.reserveE;
              const reserveF = resp.data.reserveF;
              axios.post('/AddHistory', ({ id, name, email,phoneNum, dateCheckIn, dateCheckOut, status, assignRoom,reserveA,reserveB,reserveC,reserveD,reserveE,reserveF }))
              axios.delete(`/deleteCheckInInfoById/${id}`, ({ status }))
            })
            axios.delete(`/deleteStatusInfoById/${id}`, ({ status })).then(resp => {
              console.log(resp);
              if (resp.status === 200) {
                resolve();
                this.success();
                setTimeout(function () {
                  window.location.reload()
                }, 6000);
              }
            }).catch(e => {
              reject(value = e)
            })

          }

        }).catch((e) => console.log('ERROR', e));
      },
      onCancel: () => {
        window.location.reload()
      },
    });
  };
  handleChangeAssignRoom = (value, record) => {
    console.log(value);
    let str = [];
    for (let i = 1; i < value.length; i++) {
      str += value[i] + " ";
    }
    this.setState({
      assignRoomm: str
    })
    console.log(this.state.assignRoomm)


  }
  onUpdate = (value, record) => {
    confirm({
      title: 'ยืนยันการเปลี่ยนแปลง​',
      content: '',
      onOk: () => {
        this.success();
        const phoneNum = record.phoneNum;
        const id = record.id
        console.log(record.phoneNum)
        axios.get(`/findCheckInInfoById/${id}`).then(resp => {
          let assignRoomx = resp.data.assignRoom;
          let assignRoom = assignRoomx + this.state.assignRoomm;
          axios.put(`/updateAssignRoomById/${id}`, ({ assignRoom }))
          window.location.reload()
        });
      },
      onCancel: () => {
        setTimeout(function () {
          window.location.reload()
        }, delayInMilliseconds);
      }
    })
  }


  render() {
    const { size } = this.state;
    const columns = [
      { title: 'Customer Id', dataIndex: 'id', key: 'Id' },
      { title: 'Name', dataIndex: 'name', key: 'Name' },
      { title: 'Tell', dataIndex: 'phoneNum', key: 'Tell' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'จำนวนห้องที่จอง', dataIndex: 'details', key: 'details' },
      { title: 'วันที่เช็คอิน', dataIndex: 'dateCheckin', key: 'dateCheckOut' },
      { title: 'วันที่เช็คเอ้าท์', dataIndex: 'dateCheckOut', key: 'DateCheckOut', },
      //{ title: 'Status', dataIndex: 'status', key: 'status' },
      {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => <Select showSearch
          style={{ width: 100 }}
          placeholder={text}
          optionFilterProp="children"
          onChange={(value) => this.onChangeSelect(value, record)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="check-out">check-out</Option>
        </Select>
      },
      {
        title: 'assign room',
        dataIndex: 'assign',
        key: 'assignRoom',
        render: (text, record) =>
          <Select
            mode="multiple"
            size={size}
            defaultValue={['ห้อง']}
            // placeholder="กรุณาใส่ห้อง"
            onChange={(value) => this.handleChangeAssignRoom(value, record)}
            style={{ width: '300' }} >
            {children}

          </Select>
      },

      {
        title: 'update ',
        key: 'assignRoom',
        render: (text, record) =>
          <Button type="primary" loading={this.state.loading} onClick={(value) => this.onUpdate(value, record)}>update</Button>
      },
    ];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            expandedRowRender={(allData) =>
              <p  >{allData.assignRoom}</p>
            }
            dataSource={this.state.allData}
          />
        </div>
        {/* <TreeSelect> {tProps}</TreeSelect> */}

      </div>
    )
  }
}

export default Form.create()(TableCheckIn);