import React , { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProfessorList from "./ProfessorList";
import ProfessorEditForm from "./ProfessorEditForm";

// every React component must extend
class HomePage extends Component {
    // returns what needs to be displayed
    render() {
        return (
            <Router>
                <>
                    <Switch>
                        <Route path="/" exact component={ProfessorList}/>
                        <Route path="/professors" exact component={ProfessorList}/>
                        <Route path="/professors/:id" component={ProfessorEditForm}/>
                    </Switch>
                </>
            </Router>
        )
    }
}

export default HomePage