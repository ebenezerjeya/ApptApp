import React, {useCallback, useEffect, useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import "../css/Login.css";
import ProfessorList from "./ProfessorList";

export default function Login(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const [error, setError] = useState(false);

    // forcefully remount the page
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function validateForm() {
        return password.length > 0 && (id.length === 9);
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/student/loginAuth`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                password: password,
            }),
        })
            .then(data => {
                forceUpdate();
            });
    }

    // constantly fetch Auth data from the backend
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8080/student/loginAuth`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            res.json()
                .then(data => {
                    setAuth(Object.values(data)[0]);
                    setError(Object.values(data)[1]);
                })
        }

        fetchData();
    });

    function displayError() {
        const window = document.getElementById("Warning");
        window.style.display = "block";
    }

    const form = () =>
        <div className="LoginPage">
            <header className="Header-old header-logged-out js-details-container Details position-relative f4 py-2 myHeader" role="banner">
                <div className="container-xl d-lg-flex flex-items-center p-responsive flex-justify-between">
                    <div className="d-flex  flex-items-center">
                        <h3 className="appName">AppointMe!</h3>
                    </div>
                    <div className="d-flex flex-items-center right-0 flex-auto signUpbtn">
                            <a href="/register"> Sign up </a>
                    </div>

                </div>
            </header>
            <div className="Login">
                <div class="d-md-flex flex-items-center gutter-md-spacious wrapIntroLogin">
                <div className="col-md-7 text-center text-md-left intro">
                    <h1 className="introTitle"> Made by Students, for Students</h1>
                    <p> Easy online appointment scheduling application for students and professors </p>
                </div>
                <div className="wrapLogin">
                    <span className="form-title"> Sign In </span>
                    <p id="Warning" className="Warning">The information provided is incorrect.</p>
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
                                    required
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
                                    required
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
            </div>
        </div>;

    return (
        <>
            <Router>
                {error ? displayError() : null}
                {auth ? <Redirect to="/home"/> : form()}
                <Switch>
                    <Route path="/home" exact component={ProfessorList}/>
                </Switch>
            </Router>
        </>
    );
}
