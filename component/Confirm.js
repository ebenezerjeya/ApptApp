import React, { Component} from 'react';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import CardGroup from "react-bootstrap/CardGroup";
import "../css/AppointmentForm.css";

export class Confirm extends Component {
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

    // continue is called so nextStep moves to the next step(page)
    continue = e => {
        e.preventDefault();
        this.handleSubmit(this.props.values);
        this.props.nextStep();
    };

    // back is called so prevStep moves to the previous step(page)
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    backToFirst = e => {
        e.preventDefault();
        this.props.backToFirstStep();
    };

    componentDidMount() {
        // obtain values from props
        const { values: {
                firstName,
                lastName,
                email,
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

        // string.split to get course_code
        var course_codeTemp  = (course).split(" ");

        // find professor to set email and office number
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

        // finding end time based on the designated start time
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

    handleSubmit() {
        fetch(`http://localhost:8080/appointment`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        });
    }


    render() {
        const { values: {
                firstName,
                lastName,
                email,
                studentID,
                purpose,
                professor,
                course,
                campus,
                description,
                date,
                time,
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
                            <Button className={"backBtn"} variant="primary" primary={false} type="submit" onClick={this.back}>Back</Button>{' '}
                            <Button className={"continueBtn"} variant="primary" primary={false} type="submit" onClick={this.continue}>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Confirm