import React, { Component } from 'react';
import firebase from '../FireBase/firebase'
import 'antd/dist/antd.css';
import { Form, Table, Tag, Spin, TreeSelect, InputNumber, Select, Popconfirm, Modal, message } from 'antd';
import axios from 'axios';
const { Option } = Select;
const db = firebase.firestore();
const { confirm } = Modal;
var delayInMilliseconds = 2000;

class TableCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allData: [],
      details: "หวัดดี"
    }
  }
  componentDidMount() {
    let wholeData = [];
    axios.get('/findAllCustomer').then(resp => {
      resp.data.forEach(element => {
        
        var temp = {
          id: element.id,
          name: element.name,
          phoneNum: element.phoneNum,
          email: element.email,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
  }

  render() {

    const columns = [
    //   { title: 'Customer Id', dataIndex: 'id', key: 'Id' },
      { title: 'Name', dataIndex: 'name', key: '0' },
      { title: 'Tell', dataIndex: 'phoneNum', key: '1' },
      { title: 'Email', dataIndex: 'email', key: 'Email' },
    ];
    return (
      <div>
        <Table
          columns={columns}
          // expandedRowRender={(allData) =>
          //   <p style={{ margin: 10 }}>{allData['details']} </p> // }
          dataSource={this.state.allData}
        />

      </div>

    );
  }






}


export default Form.create()(TableCustomer);