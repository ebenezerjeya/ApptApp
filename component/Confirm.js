import React, { Component} from 'react';
//material-ui theme provider wrapper
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import "../css/AppointmentForm.css";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";


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
    };
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


    render() {
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
                <div className="AppointmentForm">
                    <div className="WrapAppointmentForm">

                        <Card>
                            <Card.Header>Confirmation Page</Card.Header>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>First Name</Card.Title>
                                    <Card.Text>{firstName}</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>Last Name</Card.Title>
                                    <Card.Text>{lastName}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>Email</Card.Title>
                                    <Card.Text>{email}</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>Student ID</Card.Title>
                                    <Card.Text>{studentID}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>Purpose of Appointment</Card.Title>
                                    <Card.Text>{purpose}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>Professor</Card.Title>
                                    <Card.Text>{professor}</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>Course</Card.Title>
                                    <Card.Text>{course}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>Campus</Card.Title>
                                    <Card.Text>{campus}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>Date</Card.Title>
                                    <Card.Text>{date}</Card.Text>
                                </Card.Body>

                                <Card.Body>
                                    <Card.Title>Time</Card.Title>
                                    <Card.Text>{time}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <CardGroup>
                                <Card.Body>
                                    <Card.Title>Additional descriptions/notes</Card.Title>
                                    <Card.Text>{description}</Card.Text>
                                </Card.Body>
                            </CardGroup>

                            <Button className={"editBtn"} variant="primary" onClick={this.backToFirst} >Edit appointment</Button>
                        </Card>

                        <div className={"nav"}>
                        <Button className={"backBtn"} variant="primary" primary={false} type="submit" onChange="this.back" onClick={this.back}>Back</Button>{' '}
                        <Button className={"continueBtn"} variant="primary" primary={false} type="submit" onChange="this.continue" onClick={this.continue}>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Confirm