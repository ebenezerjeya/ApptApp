import React, { Component} from 'react';
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav} from "react-bootstrap";
import Card from 'react-bootstrap/Card';


export class Confirm extends Component {
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
        //it's something like creating a const variable value to pull out 
        //from values in Userform to use it here like a variable
        const { 
            values: {
                firstName, 
                lastName, 
                email, 
                studentID, 
                purpose, 
                professor, 
                description, 
                campus,
                date,
                time
            }
        } = this.props;

        return ( 
            <div className="Confirm">
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Appointmeet by UCM</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            </Navbar>
            <br/>
        <Card>

        <Card.Header>Confirmation Page</Card.Header>
            <Card.Body>
                <Card.Title>First Name</Card.Title>
                <Card.Text>
                    {firstName}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Last Name</Card.Title>
                <Card.Text>
                    {lastName}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Email</Card.Title>
                <Card.Text>
                    {email}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Student ID</Card.Title>
                <Card.Text>
                    {studentID}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Purpose of Appointment</Card.Title>
                <Card.Text>
                    {purpose}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Appointment date</Card.Title>
                <Card.Text>
                    {date}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Appointment time</Card.Title>
                <Card.Text>
                    {time}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Campus</Card.Title>
                <Card.Text>
                    {campus}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Professor</Card.Title>
                <Card.Text>
                    {professor}
                </Card.Text>
                
            </Card.Body>
            <Card.Body>
                <Card.Title>Additional descriptions/notes</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                
            </Card.Body>
            
           
        </Card>
        <br/>
        <br/>
        <Button variant="primary" primary={false} type="submit" onChange="this.back" onClick={this.back}>
            Back
        </Button>{' '}

        <Button variant="primary" primary={false} href="FormUserDetails">
            Edit details
        </Button>{' '}

        <Button variant="primary" primary={false} type="submit" onChange="this.continue" onClick={this.continue}>
            Continue
        </Button>
        <br/>
        <br/>
        </div>
        ) //react works when everytime textfield changes, its gonna fire off an event 
    };
}

export default Confirm
