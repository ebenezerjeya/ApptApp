import React, { Component } from 'react'
import FormAppointmentDetails from './FormAppointmentDetails';
import Confirm from './Confirm';
import Success from './Success';
import FormTimePicker from "./FormTimePicker";

export class UserForm extends Component {
    state ={
        step: 1,
        // UserDetails info
        firstName: '',
        lastName: '',
        email: '',
        studentID: '',
        // FormAppointmentDetails info
        purpose: '',
        professorList: [{professor_id: "noSelect", professor_name: "Select Professor"}], // new line
        professor: '',
        courseList: [{course_id: 0, course_code: "Select Course"}],
        course: '',
        campusList: [{id: 0, name: "Select Campus"}],
        campus: '',
        description: '',
        //FormTimePicker info
        availableList: [{professor_id: "noSelect", start_time: "Select Time"}],
        date: '',
        time: ''
    };

    //Proceed to the next step method with changing states with iterations
    nextStep = () => {
        const {step} = this.state;
        this.setState({step: step + 1});
    };

    //Go back to previous step method
    prevStep = () => {
        const {step} = this.state;
        this.setState({step: step - 1});
    };

    backToFirstStep = () => {
        this.setState({step: 1});
    };

    //Handle fieldchange in terms of input box, changing when a new step advances or cancels
    //arrow function of react with event parameter
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    // Additional handle change method to change the field based on the given value
    handleChange2 = (field, value) => {
        this.setState({[field]: value});
    };

    // to initialize the state when the component(page) is mounted
    componentDidMount() {
        fetch(`http://localhost:8080/professors`)
            .then(response => response.json())
            .then(data => {
                this.setState({professorList: data});
            });

        const link = "http://localhost:8080/student/"  + sessionStorage.getItem("id").toString();
        console.log(link);
        fetch(link)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    firstName: data.student_fname,
                    lastName: data.student_lname,
                    email: data.student_email,
                    studentID: data.student_id
                })})
    }

    render() {
        const {step} = this.state;
        // store everything to the variables "values" to be used in other pages
        const {firstName, lastName, email, studentID, purpose, professorList,
            professor, courseList, course, campusList, campus, description,
            availableList, date, time} = this.state;
        const values = {
            firstName, lastName, email, studentID, purpose, professorList,
            professor, courseList, course, campusList, campus, description,
            availableList, date, time};

        /* Using switch statements to switch between pages;
         Sending methods to the pages so they can use the methods defined here
         E.g: handleChange = {this.handleChange} */
        switch(step) {
            case 1:
                return(
                    < FormAppointmentDetails
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        handleChange2 = {this.handleChange2}
                        values = {values}
                    />
                );
            case 2:
                return (
                    <FormTimePicker
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        handleChange2 = {this.handleChange2}
                        values = {values}
                    />
                );
            case 3:
                return (
                    <Confirm
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        backToFirstStep = {this.backToFirstStep}
                        values = {values}
                    />
                );
            case 4:
                return <Success/>
        }
    }
}

export default UserForm