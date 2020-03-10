import React, { Component } from 'react';
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';



export class FormTimePicker extends Component {
    //continue for event parameter to advance steps
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

//notes - A common pattern in React is for a component to return multiple elements. 
//Fragments let you group a list of children without adding extra nodes to the DOM.
  
    render() {
        //it's something like creating a const variable value to pull out 
        //from values in Userform to use it here like a variable
        const {values, handleChange} = this.props;
        console.log(handleChange);
       
        return (
          <div className="FormTimePicker">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">Appointmeet by UCM</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav>
            </Navbar>
            <br/>

            <Form>
              <Form.Group controlId="datepicker">
                <Form.Label > Pick Appointment date </Form.Label> 
                <Form.Control type="date" placeholder="date" 
                onChange={handleChange('date')} defaultValue={values.date}/>
              </Form.Group>
            </Form>
            <br/>
            <Form>
              <Form.Group controlId="timepicker">
              <Form.Label> Pick Appointment time </Form.Label>
                <Form.Control type="time" placeholder="time"
                onChange={handleChange('time')} defaultValue={values.time}/>
                <option></option>
              </Form.Group>
            </Form>  
           

              <Button variant="primary" primary={false} type="submit" onChange="this.back" onClick={this.back}>
                Back
              </Button>{' '}
              <Button variant="primary" primary={false} type="submit" onChange="this.continue" onClick={this.continue}>
                Continue
              </Button>
              
              
            
          </div>
        );//react works when everytime textfield changes, its gonna fire off an event 
    };
}

export default FormTimePicker
