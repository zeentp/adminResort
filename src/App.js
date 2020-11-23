import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CustomerInfoShow from './ShowData/CustomerInfoShow';
import ReceiptInfoShow from './ShowData/ReceiptInfoShow';
import CheckInInfoShow from './ShowData/CheckInInfoShow';
import HistoryInfoShow from './ShowData/HistoryInfoShow';
import StatusRecShow from './ShowData/StatusRecShow';
import ManageRoom from './ShowData/ManageRoomView';

import DailyPaid from './Report/DailyPaid';
import DailyReport from './Report/DailyReport';
import DailyNotPaid from './Report/DailyNotPaid';
import TableReport from './ShowData/ReportShow';

import Login from './Login/Login'
import CustomerInfoView from './ShowData/CustomerInfoView';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/BookingInfoShow' component={CustomerInfoShow} />
          <Route path='/CustomerInfoShow' component={CustomerInfoView} />
          <Route path='/ReceiptInfoShow' component={ReceiptInfoShow} />
          <Route path='/CheckInInfoShow' component={CheckInInfoShow} />
          <Route path='/HistoryInfoShow' component={HistoryInfoShow} />
          <Route path='/StatusRecShow' component={StatusRecShow} />
          <Route path='/ManageRoom' component={ManageRoom}/>
          <Route path='/DailyReport' component={DailyReport}/>
          <Route path='/DailyNotPaid' component={DailyNotPaid}/>
          <Route path='/DailyPaid' component={DailyPaid}/>
          <Route path='/ReportShow' component={TableReport}/>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
