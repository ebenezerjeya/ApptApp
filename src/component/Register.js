import React, { Component, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../css/Register.css";

export default function Register(props) {
    const [id, setId] = useState("");
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [email, setEmail] = useState("");

    function validateForm() {
        return id.length > 0 && firstName.length > 0 && lastName.length > 0 &&
            email.length > 0 && password.length > 0 && confirmpass.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Register">
            <div className="wrapRegister">
                <span className="registertitle"> Create An Account</span>
                <form onSubmit={handleSubmit}>
                    <div className="wrapinput input1" data-validate = "">
                        <FormGroup controlId="firstName" bsSize="large">
                            <FormControl
                                className="registerinput "
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirst(e.target.value)}
                                type="text"
                                pattern=".{2,20}"
                            />
                        </FormGroup>
                    </div>

                    <div className="wrapinput input1" data-validate = "">
                        <FormGroup controlId="lastName" bsSize="large">
                            <FormControl
                                className="registerinput"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLast(e.target.value)}
                                type="text"
                                pattern=".{2,20}"
                            />
                        </FormGroup>
                    </div>

                    <div className="wrapinput" data-validate = "">
                        <FormGroup controlId="id" bsSize="large">
                            <FormControl
                                className="registerinput input2"
                                placeholder="Student ID (#700)"
                                type="text"
                                value={id}
                                onChange={e => setId(e.target.value)}
                                pattern="[700]+.{8}"
                            />
                        </FormGroup>
                    </div>

                    <div className="wrapinput" data-validate = "">
                        <FormGroup controlId="email" bsSize="large">
                            <FormControl
                                className="registerinput input2"
                                placeholder="University Email (example@havard.edu)"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            />
                        </FormGroup>
                    </div>

                    <div className="wrapinput  input1" data-validate = "">
                        <FormGroup controlId="password" bsSize="large">
                            <FormControl
                                className="registerinput"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Password must contain:
                                       - at least one number
                                       - at least one uppercase and lowercase letter
                                       - at least 8 characters"

                            />
                        </FormGroup>
                    </div>

                    <div className="wrapinput input1" data-validate = "">
                        <FormGroup controlId="confirmpass" bsSize="large">
                            <FormControl
                                className="registerinput "
                                id = "confimPasswordField"
                                placeholder="Confirm Password"
                                value={confirmpass}
                                onChange={e => setConfirmpass(e.target.value)}
                                type="password"
                                pattern={password}
                            />
                        </FormGroup>
                        <div className="invalidInput"> </div>
                    </div>
                    <div>
                        By clicking "Create Account”, you agree to our Terms of Service and Privacy Statement.
                        We’ll occasionally send you account related emails.
                    </div>

                    <Button block bsSize="large" className="registerbtn" disabled={!validateForm()} type="submit">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}
