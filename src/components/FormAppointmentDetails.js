import React, { Component } from 'react';
//material-ui theme provider wrapper
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav} from "react-bootstrap";
import { Dropdown, DropdownButton} from "react-bootstrap";

export class FormAppointmentDetails extends Component {
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
//gonna work on researching up on a dropdown tab thing with different dummy selections of choices
//probably need to display those choices after linking with DB and spring instead of frontend hardcode
//for now - dummy
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
      <label>
        Select your purpose of appointment :  
        <br/>
        <select value={this.values} onChange={handleChange('purpose')}>
          <option value="Purpose#1">Purpose#1</option>
          <option value="Purpose#2">Purpose#2</option>
          <option value="Purpose#3">Purpose#3</option>
          <option value="Purpose#4">Purpose#4</option>
          <option value="Purpose#5">Purpose#5</option>
        </select>
      </label>
      <br/>
      
        <label>
          Select professor :  
          <br/>
          <select value={this.values} onChange={handleChange('professor')}>
            <option value="Prof#1">Prof#1</option>
            <option value="Prof#2">Prof#2</option>
            <option value="Prof#3">Prof#3</option>
            <option value="Prof#4">Prof#4</option>
            <option value="Prof#5">Prof#5</option>
          </select>
        </label>
        <br/>

        <label>
          Select campus :  
          <br/>
          <select value={this.values} onChange={handleChange('campus') }>
            <option value="campus#1">Warrensburg</option>
            <option value="campus#2">Lee's Summit</option>
          </select>
        </label>

        <Form.Group controlId = "description" >
          <Form.Label > Additional descriptions / Notes </Form.Label> 
          <Form.Control type = "description" placeholder = "Additional Description / Notes" 
            onChange={handleChange('description')} defaultValue={values.description}/>
          <Form.Text className="text-muted">
            Describe any potential details or pre Appointment information that could be handy for professors.
          </Form.Text>
        </Form.Group>

        <br/>

        <Button variant="primary" primary={false} type="submit" onChange="this.back" onClick={this.back}>
          Back
        </Button>{' '}

        <Button variant="primary" primary={false} type="submit" onChange="this.continue" onClick={this.continue}>
          Continue
        </Button>
    
      </div>
      ); //react works when everytime textfield changes, its gonna fire off an event 
    };
}
//notes on the current progress so far, purpose needs to be drop down box. 
//Additional descriptions need to have a bigger input box
//All these things need to be learnt and applied from the material-ui react stuff i chose and referenced from the tutorial i was learing from.
const styles = {
    button: {
        margin: 15
    },
}

export default FormAppointmentDetails

