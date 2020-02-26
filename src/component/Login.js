import React, { Component, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../css/Login.css";

export default function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return id.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">
            <div className="wrapLogin">
                <span className="form-title"> Sign In </span>
                <form className="loginForm" onSubmit={handleSubmit}>

                    <div className="wrapinput" data-validate = "Please enter username">
                        <FormGroup controlId="id" bsSize="large">
                            <FormControl
                                className="logininput"
                                placeholder="Username"
                                autoFocus
                                type="text"
                                value={id}
                                onChange={e => setId(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    <div className="wrapinput" data-validate = " ">
                        <FormGroup controlId="password" bsSize="large" >
                            <FormControl
                                className="logininput"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                    </div>

                    <div className="text-right p-t-13 p-b-23">
						<span className="txt1">
							Forgot&nbsp;
						</span>

                        <a href="#" className="txt2">
                            Username / Password?
                        </a>
                    </div>

                    <div>
                        <Button block bsSize="large" className="loginbtn" disabled={!validateForm()} type="submit">
                            Log In
                        </Button>
                    </div>

                    <div className="signup">
						<span className="txt1 p-b-9">
							Don’t have an account?&nbsp;
						</span>
                        <br></br>
                        <a href="/register" className="txt3">
                            Sign up now
                        </a>
                    </div>

                </form>
            </div>
        </div>
    );
}
