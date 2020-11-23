import React, { Component } from 'react';
import "antd/dist/antd.css";

import { Form, Select, Table, Modal, Button, Icon } from 'antd';
import firebase from '../FireBase/firebase';
import axios from 'axios';

const { confirm } = Modal;
class TableStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],

    }

  }
  componentDidMount() {
    let wholeData = [];
    axios.get('/findAllStatus').then(resp => {
      resp.data.forEach(element => {
        var temp = {
          id: element.id,
          name: element.name,
          phoneNum: element.phoneNum,
          status: element.status,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
    console.log(wholeData)
  }

  onSubmit = (value, record) => {
    const phoneNum = record.phoneNum
    const id = record.id
    confirm({
      title: 'ยืนยันการเปลี่ยนแปลง​',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete(`/deleteStatusInfoById/${id}`)
        window.location.reload()
      },
      onCancel: () => {
      }
    })
  }

  render() {
    const columns = [
      { title: 'Customer Id', dataIndex: 'id', key: 'Id' },
      { title: 'Name', dataIndex: 'name', key: 'Name' },
      { title: 'Tell', dataIndex: 'phoneNum', key: 'Tell' },
      { title: 'Status', dataIndex: 'status', key: 'status' },

    ];

    return (
      <div>
        <div>
          <Table 
            columns={columns}
            dataSource={this.state.allData}
          />
        </div>

      </div>
    )
  }
}

export default Form.create()(TableStatus);