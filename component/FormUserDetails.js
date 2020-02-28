import React, { Component } from 'react';
//material-ui theme provider wrapper
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";


export class FormUserDetails extends Component {
    //continue for event parameter to advance steps
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
//notes - A common pattern in React is for a component to return multiple elements. 
//Fragments let you group a list of children without adding extra nodes to the DOM.
  
    render() {
        //it's something like creating a const variable value to pull out 
        //from values in Userform to use it here like a variable
        const {values, handleChange} = this.props;
       
        return (
        <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Student/Professor Appointment Site</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#courses">Courses</Nav.Link>
            <Nav.Link href="#ucmNewsFlash">UCM News Flash</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>

        <br/>

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
        );//react works when everytime textfield changes, its gonna fire off an event 
    };
}

const styles = {
    button: {
        margin: 15
        
    }
}



export default FormUserDetails


/*
  <
  Form.Group controlId = "lastName" >
  <
  Form.Label > lastName < /Form.Label> <
  Form.Control type = "lastName"
placeholder = "Enter your last name" / >
  <
  /Form.Group>

  <
  Form.Group controlId = "email" >
  <
  Form.Label > email < /Form.Label> <
  Form.Control type = "email"
placeholder = "Enter your email" / >
  <
  Form.Text className = "text-muted" >
  PLease use your UCMO email. <
  /Form.Text> <
  /Form.Group>

  <
  Form.Group controlId = "studentID" >
  <
  Form.Label > studentID < /Form.Label> <
  Form.Control type = "studentID"
placeholder = "Enter your 700#" / >
  <
  Form.Text className = "text-muted" >
  700#
for scanning your UCMO email contents
for any torrented ePub textbooks. <
  /Form.Text> <
  /Form.Group> <
  Button variant = "primary"
type = "submit" >
  Submit <
  /Button>
*/