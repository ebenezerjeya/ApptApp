import React, { Component } from 'react';
import { Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";
import "../css/AppointmentForm.css";
import Select from "react-select";


export class FormTimePicker extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };


    render() {
        const {values, handleChange, getStartTimes} = this.props;
        return (

            <div className="AppointmentForm">
                <div className="WrapAppointmentForm">
                    <Form>
                        <Form.Group controlId="datepicker">
                            <Form.Label > Pick Appointment date </Form.Label>
                            <Form.Control type="date" placeholder="date"
                                          onChange={handleChange('date')}
                                          onInput={getStartTimes()} defaultValue={values.date}
                            />
                        </Form.Group>
                    </Form>
                    <br/>
                    <label>Select Appointment Time:</label>
                    <br/>
                    <select value={this.values} onInput={handleChange('time')}>
                        {values.availableList.map((a_t) =>
                            <option key={a_t.professor_id}>{a_t.start_time}</option>)}
                    </select>

                    <div className="nav">
                        <Button variant="primary" primary={false} type="submit" onChange="this.back" onClick={this.back} className={"backBtn"}>Back</Button>
                        <Button variant="primary" primary={false} type="submit" onChange="this.continue" onClick={this.continue} className={"continueBtn"}>Continue</Button>
                    </div>
                </div>
            </div>
        );
    };
}

export default FormTimePicker