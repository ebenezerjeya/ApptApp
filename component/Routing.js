import React , { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ProfessorList from "./ProfessorList";
import Login from "./Login";
import Register from "./Register";
import ProfessorEditForm from "./ProfessorEditForm";
import ProfessorAddForm from "./ProfessorAddForm";
import UserForm from "./UserForm";

class Routing extends Component {

    render() {
        return (
            <Router>
                <>
                    <Switch>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register} />
                        <Route path="/professors" exact component={ProfessorList}/>
                        <Route path="/professors/new" component={ProfessorAddForm}/>
                        <Route path="/professors/:id" component={ProfessorEditForm}/>
                        <Route path="/form" exact component={UserForm}/>
                        <Redirect from="/" to="/login"/>
                    </Switch>
                </>
            </Router>
        )
    }
}

export default Routing;