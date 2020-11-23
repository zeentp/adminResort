import React from 'react';
import firebase from '../FireBase/firebase';
import logo from '../Img/logo.png'
import { Form, Icon, Input, Button, Checkbox, message, Card } from 'antd';

class Login extends React.Component {

    login = (email, password) => {
        console.log(this.state)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                message.success('Login success');
                console.log('Successfully Logged In: ', data.user.uid);
                //Go to next Page
                setTimeout(function () {
                    window.location.href = '/CustomerInfoShow'
                }, 2000);
            })
            .catch((err) => {
                message.error('Login Failed');
                console.log('Error: ' + err.toString());
            })
    }

    handleSubmit = e => {
        e.preventDefault();
        message
            .loading('กรุณารอสักครู่', 1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.login(values.email, values.password);

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card style={{ width: 400, marginLeft: '35%', marginTop: '10%', backgroundColor: 'grey', fontFamily: "Kanit, sans-serif" }}>
                    <img style={{ width: '60%' }} src={logo} />
                    <Form onSubmit={this.handleSubmit} className="login-form" style={{ marginTop: '10%' }}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Login
                  </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default Form.create()(WrappedNormalLoginForm);