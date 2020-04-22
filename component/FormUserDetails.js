import React, { Component } from 'react';
//material-ui theme provider wrapper
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";


export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const {values, handleChange} = this.props;

        return (
            <div>

                <Form>
                    <Form.Group controlId = "firstName" >
                        <Form.Label > First name </Form.Label>
                        <Form.Control type = "firstName" placeholder = "Enter your first name"
                                      onChange={handleChange('firstName')} defaultValue={values.firstName}/>
                    </Form.Group>

                    <Form.Group controlId = "lastName" >
                        <Form.Label > Last name </Form.Label>
                        <Form.Control type = "lastName" placeholder = "Enter your last name"
                                      onChange={handleChange('lastName')} defaultValue={values.lastName}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                                      onChange={handleChange('email')} defaultValue={values.email}/>
                        <Form.Text className="text-muted">
                            Use UCMO issued email.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId = "studentID" >
                        <Form.Label > Student ID </Form.Label>
                        <Form.Control type = "studentID" placeholder = "Enter your 700#"
                                      onChange={handleChange('studentID')} defaultValue={values.studentID}/>
                    </Form.Group>

                    <Button variant="primary" primary={false} type="submit" onChange="this.continue" onClick={this.continue}>
                        Continue
                    </Button>
                </Form>
            </div>
        );
    };
}

const styles = {
    button: {
        margin: 15

    }
}

export default FormUserDetails