import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails';
import FormAppointmentDetails from './FormAppointmentDetails';
import Confirm from './Confirm';
import Success from './Success';
import FormTimePicker from "./FormTimePicker";

export class UserForm extends Component {
    state ={
        step: 1,
        //FormUserDetails info
        firstName: '',
        lastName: '',
        email: '',
        studentID: '',
        //FormAppointmentDetails info
        purpose: '',
        professorList: [], // new line
        professor: '',
        courseList: [{course_id: 0, course_code: "Select Course"}],
        course: '',
        campusList: [{id: 0, name: "Select Campus"}],
        campus: '',
        description: '',
        availableList: [],
        date: ''
    };

    //Proceed to the next step method with changing states with iterations
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step+1
        });
    };

    //Go back to previous step method
    prevStep = () => {
        const {
            step
        } = this.state;
        this.setState({
            step: step - 1
        });
    };

    //Handle fieldchange in terms of input box, changing when a new step advances or cancels
    //arrow function of react with event parameter
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };



    getCoursesAndCampus = () => () => {
        // find prof based on the name, then set the professor_id and courses
        var prof = this.state.professorList.find(o => o.professor_name === this.state.professor);
        if (prof != null) {
            var professor_id = prof.professor_id;
        }

        const courseLink = "http://localhost:8080/courses_prof/" + professor_id;
        const campusLink = "http://localhost:8080/professors/" + professor_id;

        fetch(courseLink)
            .then(response => response.json())
            .then(data => {
                this.setState({courseList: [{course_id: 0, course_code: "Select Course"}].concat(data)});
            });

        fetch(campusLink)
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    if (data.warr_office != null && data.mic_office != null)
                        this.setState({campusList: [{id: 0, name: "Select Campus"}].concat([{id: 1, name: "Warrensburg"}])})
                            .concat([{id: 2, name: "Lee's Summit"}]);
                    else if (data.warr_office != null)
                        this.setState({campusList: [{id: 0, name: "Select Campus"}].concat([{id: 1, name: "Warrensburg"}])});
                    else if (data.mic_office != null)
                        this.setState({campusList: [{id: 0, name: "Select Campus"}].concat([{id: 1, name: "Lee's Summit"}])});
                }
            });
    };

    getStartTimes = () => () => {
        // find prof based on the name, then set the professor_id and courses
        const prof = this.state.professorList.find(o => o.professor_name === this.state.professor);
        console.log(prof);
        if (prof != null) {
            var professor_id = prof.professor_id;
        }

        console.log(this.state.date);
        const timesLink = "http://localhost:8080//available_timesbydate/" + prof.professor_id + "/" + this.state.date;
        console.log(timesLink);

        fetch(timesLink)
            .then(response => response.json())
            .then(data => {
                this.setState({availableList: data});
            });

    };

    componentDidMount() {
        fetch(`http://localhost:8080/professors`)
            .then(response => response.json())
            .then(data => {
                this.setState({professorList: data});
                this.setState({professorList: [{professor_id: "noSelect", professor_name: "Select Professor"}].concat(data)});
            });
    }


    //need to determine what step we are on to determine which component to display
    render() {
        const {step} = this.state;
        const {firstName, lastName, email, studentID, purpose, professorList, professor, courseList, course, campusList, campus, description, availableList, date} = this.state;
        const values = {
            firstName,
            lastName,
            email,
            studentID,
            purpose,
            professorList,
            professor,
            courseList,
            course,
            campusList,
            campus,
            description,
            availableList,
            date
        };

        //need to add props to call the increment step method and handlechange event method
        //handleChange={this.handleChange}
        switch(step) {
            case 1:
                return(
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )

            case 2:
                return(
                    < FormAppointmentDetails
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        getCoursesAndCampus = {this.getCoursesAndCampus}
                        values = {values}
                    />
                )
            case 3:
                return (
                    <FormTimePicker
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        getStartTimes = {this.getStartTimes}
                        values = {values}
                    />
                )
            case 4:
                return (
                    <Confirm
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        //no input here so no handleChange state stuff//
                        values = {values}
                    />
                )
            case 5:
                return <Success/>

            //no props cause it's an already confirmed page, unless we add features and stuff//

        }
    }
}

export default UserForm