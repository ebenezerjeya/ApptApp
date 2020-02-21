import React, {useEffect, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";

export default function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return id.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/student/auth`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                password: password
            })
        })
            .then(() => {window.location.reload(false)}); // reload page after
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="id" bsSize="large">
                    <FormLabel>User Id</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        onChange={e => setId(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}
