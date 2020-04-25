import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import "../css/AppointmentForm.css";

export class FormTimePicker extends Component {
    state = {
        selectedDate: { value: 'Date', label: 'Select Date'},
        selectedTime: { value: 'Time', label: 'Select Time'},
        availableList: [{professor_id: "noSelect", start_time: "Select Time"}],
    };

    continue = e => {
        e.preventDefault();
        const {handleChange2} = this.props;
        handleChange2('date', this.state.selectedDate.value);
        handleChange2('time', this.state.selectedTime.value);
        handleChange2('availableList', this.state.availableList);
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    handleDate = selectedDate => {
        const date = selectedDate.target.value;
        this.setState({selectedDate: {value: selectedDate.target.value, label: selectedDate.target.value}});

        const {values} = this.props;
        const prof = values.professorList.find(o => o.professor_name === values.professor);
        if (prof != null) {
            var professor_id = prof.professor_id;
        }

        const timesLink = "http://localhost:8080/available_timesbydate/" + professor_id + "/" + date;
        console.log(timesLink);

        fetch(timesLink)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({availableList: data});
            });
    };

    handleTime = selectedTime => {
      this.setState({selectedTime});
    };

    populateTime(array) {
        this.state.availableList.map((a_t) => {
            array.push({value: a_t.start_time, label: a_t.start_time})
        });

        return array;
    }

    render() {
        const {values} = this.props;
        const {selectedTime} = this.state;

        const timeOptions = [];

        this.populateTime(timeOptions);

        return(

            <div className="AppointmentForm">
                <div className="WrapAppointmentForm">
                    <Form>
                        <Form.Group controlId="datepicker">
                            <Form.Label > Pick Appointment date </Form.Label>
                            <Form.Control type="date" placeholder="date"
                                          onChange={this.handleDate}
                                          defaultValue={values.date}
                            />
                        </Form.Group>
                    </Form>
                    <br/>
                    <label>Select Appointment Time:</label>
                    <br/>
                    <Select
                        value={selectedTime}
                        defaultValue={timeOptions[0]}
                        label="Single select"
                        options={timeOptions}
                        onChange={this.handleTime}

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

                    <div className="nav">
                        <Button variant="primary" primary={false} type="submit" onClick={this.back} className={"backBtn"}>Back</Button>
                        <Button variant="primary" primary={false} type="submit" onClick={this.continue} className={"continueBtn"}>Continue</Button>
                    </div>
                </div>
            </div>
        );
    };
}

export default FormTimePicker