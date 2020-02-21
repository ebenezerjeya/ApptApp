import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";

export default function Register(props) {
    const [id, setId] = useState("");
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function validateForm() {
        return id.length > 0 && firstName.length > 0 && lastName.length > 0 &&
            email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/student`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                student_fname: firstName,
                student_lname: lastName,
                student_email: email,
                student_password: password
            })
        })
            .then(() => {window.location.reload(false)}); // reload page after


    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="id" bsSize="large">
                    <FormLabel>Student Id</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="firstName" bsSize="large">
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                        value={firstName}
                        onChange={e => setFirst(e.target.value)}
                        type="text"
                    />
                </FormGroup>
                <FormGroup controlId="lastName" bsSize="large">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                        value={lastName}
                        onChange={e => setLast(e.target.value)}
                        type="text"
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}
