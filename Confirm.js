import React, { Component} from 'react';
//material-ui theme provider wrapper
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav} from "react-bootstrap";
import Card from 'react-bootstrap/Card';


export class Confirm extends Component {
    //continue for event parameter to advance steps
    state = {
        professor_Email: '',
        student_Email: '',
        course_code: '',
        purpose: '',
        office: '',
        start_time: '',
        end_time: '',
        appointment_description:'',
        student_fname:'',
        student_lname:'',
        sent:'',
        appointment_date:''
    };

    handleSubmit() {
        fetch(`http://localhost:8080/appointment`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        });
        console.log(this.state); //the state is not updated
        //update the available variable to FALSE in available times table
    }

    continue = e => {
        e.preventDefault();
        // Process Form - process it with backend and send data with rest.api with backend here i think//
        // A method here or something maybe idk //
        this.handleSubmit(this.props.values);
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    backToFirst = e => {
        e.preventDefault();
        this.props.backToFirstStep();
    }
    componentDidMount() {
        const {
            values: {
                firstName,
                lastName,
                email,
                studentID,
                purpose,
                professorList,
                professor,
                course,
                campus,
                description,
                date,
                time,
                availableList
            }
        } = this.props;
        var course_codeTemp  = (course).split(" ");

        var prof = professorList.find(o => o.professor_name === professor);
        if (prof != null) {
            var prof_email = prof.professor_email;
        }

        var prof_office;
        if(campus === "Warrensburg"){
            prof_office = prof.warr_office;
        }
        else{
            prof_office = prof.mic_office;
        }

        var available = availableList.find(o => o.start_time === time);
        if (available != null) {
            var end_time = available.end_time;
        }
        
        this.setState({
            professor_Email: prof_email,
            student_Email: email,
            course_code: course_codeTemp[0],
            purpose: purpose,
            office: prof_office,
            start_time: time,
            end_time: end_time,
            appointment_description: description,
            student_fname: firstName,
            student_lname: lastName,
            sent: 0,
            appointment_date: date
        });
    }

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
                professorList,
                professor,
                course,
                campus,
                description,
                date,
                time,
                availableList
            }
        } = this.props;

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
                <Card.Title>Course</Card.Title>
                <Card.Text>
                    {course}
                </Card.Text>
            </Card.Body>
            <Card.Body>

                <Card.Title>Additional descriptions/notes</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Title>Date</Card.Title>
                <Card.Text>
                    {date}
                </Card.Text>
            </Card.Body>

            <Card.Body>
                <Card.Title>Time</Card.Title>
                <Card.Text>
                    {time}
                </Card.Text>
                <Button variant="primary" onClick={this.backToFirst} >Edit appointment</Button>
            </Card.Body>


        </Card>
        <br/>
        <br/>
        <Button variant="primary" primary={false} type="submit" onChange="this.back" onClick={this.back}>
            Back
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
