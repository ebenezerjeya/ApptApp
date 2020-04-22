import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import "../css/AppointmentForm.css";

export class Success extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <div>
                <div className="AppointmentForm">
                    <div className="WrapAppointmentForm">

                        <Card style={{ width: '36rem' }}>

                            <Card.Body>
                                <Card.Title>Appointment Successful!</Card.Title>
                                <Card.Text>
                                    Thank you for using AppointME!
                                    You should receive a confirmation email in your inbox regarding the appointment you just made.
                                </Card.Text>

                                <Card.Text>
                                    You may close this window now. To create a new appointment, please go back to the homepage.
                                </Card.Text>
                            </Card.Body>
                            <Card.Img variant="top" src="https://pbs.twimg.com/profile_images/1032375481457242112/G9YEIu26_400x400.jpg" className={"cardImage"}/>

                        </Card>
                    </div>
                </div>
            </div>
        )
    };
}


export default Success