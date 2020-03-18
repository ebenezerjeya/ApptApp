import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button, FormGroup, FormControl } from "react-bootstrap";
import logout from "./HomePage";

class StudentEditForm extends Component {
    emptyItem = {
        student_password: null,
        confirm_password: null
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        const {item} = this.state;

        // add code here in future

        fetch(`http://localhost:8080/student`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: sessionStorage.getItem("id"),
                password: item.student_password,
            }),
        });

        this.props.history.push('/home/profile');
    }

    validateForm() {
        return this.state.student_password === this.state.confirm_password;
    }

    render() {
        const {item} = this.state;

        return (
            <div className="homeWrapper">
                <div className="sidebar">
                    <div className="sidebar-wrapper">
                        <div className="logo">
                            <a href="" className="simple-text">AppointMeet</a>
                        </div>
                        <ul className="nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/home">
                                    <i className="nc-icon nc-chart-pie-35"></i>
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="/home/profile">
                                    <i className="nc-icon nc-circle-09"></i>
                                    <p>User Profile</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="">
                                    <i className="nc-icon nc-notes"></i>
                                    <p>My Schedule</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link"
                                   onClick={()=> window.open("/form", "_blank")}>
                                    <i className="nc-icon nc-pin-3"></i>
                                    <p>Make Appointment</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="">
                                    <i className="nc-icon nc-bell-55"></i>
                                    <p>Notifications</p>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="/" onClick={logout}>
                                    <i className="nc-icon nc-bell-55"></i>
                                    <p>Log Out</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="body">
                    <Container>
                        <h2>Change Password</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <label>New Password: </label>
                                <FormControl type="password" name="student_password"
                                             pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                             value={item.student_password || ''}
                                             onChange={this.handleChange}
                                             title="Password must contain:
                                                - at least one number
                                                - at least one uppercase and lowercase letter
                                                - at least 8 characters"
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Confirm Password :</label>
                                <FormControl type="password" name="confirm_password"
                                             value={item.confirm_password || ''}
                                             onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" disabled={!this.validateForm}>Save</Button>
                                <Button href="/home/profile">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
            </div>
        )

    }
}

export default withRouter(StudentEditForm);