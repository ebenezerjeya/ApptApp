import React, {useCallback, useEffect, useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import HomePage from "./HomePage";
import ProfessorHome from "./ProfessorHome";
import "../css/Login.css";

export default function Login() {
    const [id, setId] = useState("");
    /*Get student_ID aka session variable*/
    sessionStorage.setItem("id", id);
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const [profAuth, setProfAuth] = useState(false);
    const [error, setError] = useState(false);

    // forcefully remount the page
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function validateForm() {
        return id.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const link = "http://localhost:8080/student/" + id + "/loginAuth";

        var idKeyWord = id.substr(0,3);
        if (idKeyWord === "700"){ //check for students account
            fetch(link, {
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
        else {
            const linkProf = "http://localhost:8080/professors/" + id;
            const res =  await fetch(linkProf, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            });
            res.json()
                .then(data => {
                    console.log(data);
                    if(data === null){ //if the professor id is not found
                        setError(true);
                        setProfAuth(false);
                    }
                    else {
                        if (password === "1234") {
                            //if the professor id is true and the password is 1234
                            //setAuth(true); to route to the student home page if Auth is set to true
                            setError(false);
                            setProfAuth(true);
                            sessionStorage.setItem("isAuthenticated", true);
                        }
                        else {
                            setError(true);
                            setProfAuth(false);
                        }
                    }
                });
        }
    }

    // constantly fetch Auth data from the backend
    useEffect(() => {
        async function fetchData() {
            if (id === "")
                var link = "http://localhost:8080/student/1/loginAuth";
            else
                link = "http://localhost:8080/student/" + id + "/loginAuth";

            const res = await fetch(link, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            res.json()
                .then(data => {
                    setAuth((Object.values(data)[0])["auth"]);
                    setError((Object.values(data)[0])["error"]);
                })
        }

        fetchData();

        // set authentication based on the current auth of the user that's entering
        sessionStorage.setItem("isAuthenticated", auth.toString());
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
                <div className="d-md-flex flex-items-center gutter-md-spacious wrapIntroLogin">
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
                {auth ? <Redirect to="/home"/> : profAuth ? <Redirect to="/profHome"/>: form()}
                <Switch>
                    <Route path="/home" exact component={HomePage}/>
                    <Route path="/profHome" exact component={ProfessorHome}/>
                </Switch>
            </Router>
        </>
    );
}