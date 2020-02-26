import React, { Component } from 'react';
//material-ui theme provider wrapper
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


export class Success extends Component {
    //continue for event parameter to advance steps
    continue = e => {
        e.preventDefault();
        // Process Form - process it with backend and send data with rest.api with backend here i think//
        // A method here or something maybe idk //
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    //notes - A common pattern in React is for a component to return multiple elements. 
    //Fragments let you group a list of children without adding extra nodes to the DOM.

    render() {
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

            <Card style={{ width: '36rem' }}>
                <Card.Img variant="top" src="https://images.app.goo.gl/GmjJQtX2fgzpQTp57" />
                <Card.Body>
                    <Card.Title>Appointment Successful!</Card.Title>
                    <Card.Text>
                        Thank you for using Student/Appointment.
                        You should receive an email very shortly that includes all the details of the appointment you've made.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>potential information or quirks to add</ListGroupItem>
                    <ListGroupItem>list group items for any info or stuff we can add</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Make a new appointment</Card.Link>
                    <Card.Link href="#">Another potential link to somewhere</Card.Link>
                </Card.Body>
            </Card>
                
           
        </div>
        ) //react works when everytime textfield changes, its gonna fire off an event 
    };
}


export default Success

/*<h1>Thank you for using Student/Appointment.</h1>
<p>You should received an email very shortly that includes all the details of the appointment you've made</p>
*/