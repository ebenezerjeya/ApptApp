import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import { CSSTransition } from 'react-transition-group';
import "../css/AppointmentForm.css";

export class FormAppointmentDetails extends Component {
    state = {
        displayProf: false,
        displayCourse: false,
        displayCampus: false,
        displayComments: false,
        selectedPurpose: { value: 'Purpose', label: 'Select Purpose'},
        selectedProfessor: { value: 'Professor', label: 'Select Professor'},
        selectedCourse: { value: 'Course', label: 'Select Course'},
        selectedCampus: {value: 'Campus', label: 'Select Campus'},
        professorList: [{professor_id: "noSelect", professor_name: "Select Professor"}],
        courseList: [{course_id: 0, course_code: "Select Course"}],
        campusList: [{id: 0, name: "Select Campus"}],
    };

    // continue to save the changes to the state and move to the next step(page)
    continue = e => {
        e.preventDefault();
        const {handleChange2} = this.props;
        handleChange2('purpose', this.state.selectedPurpose.value);
        handleChange2('professor', this.state.selectedProfessor.value);
        handleChange2('course', this.state.selectedCourse.value);
        handleChange2('campus', this.state.selectedCampus.value);

        this.props.nextStep();
    };

    // the following handle methods are to change the value of the selected values
    handlePurpose = selectedPurpose => {
        this.setState({selectedPurpose});
        this.setState({displayProf: true});
    };

    handleProfessor = selectedProfessor => {
        this.setState({selectedProfessor});
        this.setState({displayCourse: true});

        // find prof based on the name, then set the professor_id and courses
        const {values} = this.props;

        var prof = values.professorList.find(o => o.professor_name === selectedProfessor.value);
        if (prof != null) {
            var professor_id = prof.professor_id;
        }

        const courseLink = "http://localhost:8080/courses_prof/" + professor_id;
        const campusLink = "http://localhost:8080/professors/" + professor_id;

        fetch(courseLink)
            .then(response => response.json())
            .then(data => {
                this.setState({courseList: data});
            });

        fetch(campusLink)
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    if (data.warr_office != null && data.mic_office != null)
                        this.setState({campusList: [{id: 1, name: "Warrensburg"}].concat([{id: 2, name: "Lee's Summit"}])});
                    else if (data.warr_office != null)
                        this.setState({campusList: [{id: 1, name: "Warrensburg"}]});
                    else if (data.mic_office != null)
                        this.setState({campusList: [{id: 1, name: "Lee's Summit"}]});
                }
            });

        this.setState({
            selectedCourse: { value: 'Course', label: 'Select Course'},
            selectedCampus: { value: 'Campus', label: 'Select Campus'},
        });
    };

    handleCourse = selectedCourse => {
        this.setState({selectedCourse});
        this.setState({displayCampus: true});
    };

    handleCampus = selectedCampus => {
        this.setState({selectedCampus});
        this.setState({displayComments: true});
    };

    populateProfessor(array) {
        const {values} = this.props;
        values.professorList.map((prof) => {
            array.push({ value: prof.professor_name, label: prof.professor_name})
        });

        return array;
    };

    populateCourse(array) {
        this.state.courseList.map((course) => {
            array.push({ value: course.course_code, label: (course.course_code + " " + course.course_name)})
        });

        return array;
    };

    populateCampus(array) {
        this.state.campusList.map((campus) => {
            array.push({ value: campus.name, label: campus.name})
        });

        return array;
    };

    validateForm() {
        return this.state.selectedPurpose.value !== 'Purpose' &&
            this.state.selectedProfessor.value !== 'Professor' &&
            this.state.selectedCourse.value !== 'Course' &&
            this.state.selectedCampus.value !== 'Campus';
    }

    render() {
        const {values, handleChange} = this.props;
        const {selectedPurpose, selectedCourse, selectedProfessor, selectedCampus} = this.state;

        const purposeOptions = [
            { value: 'Homework Help', label: 'Homework Help'},
            { value: 'Advising', label: 'Advising'},
            { value: 'Discussion', label: 'Discussion'},
            { value: 'Other', label: 'Other'}
        ];
        const professorOptions = [];
        const courseOptions = [];
        const campusOptions = [];

        // populate the arrays with options
        this.populateProfessor(professorOptions);
        this.populateCourse(courseOptions);
        this.populateCampus(campusOptions);

        return (
            <div className="MakeAppointment">
                <div className="AppointmentForm">
                    <div className="WrapAppointmentForm">
                        <div className="react-select-container">
                            <label>Select your purpose of appointment :  </label>
                            <br/>
                            <Select
                                value={selectedPurpose}
                                label="Single select"
                                options={purposeOptions}
                                onChange={this.handlePurpose}

                                theme={theme => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'lightgrey',
                                        primary: 'black',
                                    },
                                })}
                            />
                        </div>

                        <br/>

                        <CSSTransition
                            in={this.state.displayProf}
                            timeout={2000}
                            classNames="showElem"
                            mountOnEnter
                        >
                            <div id="professor" className={"showElem"}>
                                <label> Select professor : </label>
                                <br/>
                                <Select
                                    value={selectedProfessor}
                                    label="Single select"
                                    options={professorOptions}
                                    onChange={this.handleProfessor}

                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'lightgrey',
                                            primary: 'black',
                                        },
                                    })}
                                />
                            </div>
                        </CSSTransition>

                        <br/>

                        <CSSTransition
                            in={this.state.displayCourse}
                            timeout={2000}
                            classNames="showElem"
                            mountOnEnter
                        >
                            <div id="course" className="formDiv">
                                <label> Select Course : </label>
                                <br/>
                                <Select
                                    value={selectedCourse}
                                    label="Single select"
                                    options={courseOptions}
                                    onChange={this.handleCourse}

                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'lightgrey',
                                            primary: 'black',
                                        },
                                    })}
                                />
                            </div>
                        </CSSTransition>

                        <br/>

                        <CSSTransition
                            in={this.state.displayCampus}
                            timeout={2000}
                            classNames="showElem"
                            mountOnEnter
                        >
                            <div id="campus" className="formDiv">
                                <label>Select campus:</label>
                                <br/>
                                <Select
                                    value={selectedCampus}
                                    label="Single select"
                                    options={campusOptions}
                                    onChange={this.handleCampus}

                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'lightgrey',
                                            primary: 'black',
                                        },
                                    })}
                                />
                            </div>
                        </CSSTransition>

                        <br/>

                        <div id="addNotes" className="formDiv">
                            <Form.Group controlId = "description" >
                                <label> Additional descriptions / Notes </label>
                                <Form.Control type = "description" placeholder = "Additional Description / Notes"
                                              onChange={handleChange('description')} defaultValue={values.description}/>
                                <Form.Text className="text-muted">
                                    Describe any potential details or pre Appointment information that could be handy for professors.
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <br/>
                        <div id="continueButton">
                            <Button className="continueBtn" variant="primary" primary={false} type="submit" onClick={this.continue} disabled={!this.validateForm()}>
                                Continue
                            </Button>
                        </div>


                    </div>
                </div>
            </div>
        );
    };
}

export default FormAppointmentDetails