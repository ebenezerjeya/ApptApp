import React , { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import ProfessorHome from "./ProfessorHome";
import UserForm from "./UserForm";
import StudentProfile from "./StudentProfile";
import StudentEditForm from "./StudentEditForm";
import ProfessorAvailableTimes from "./ProfessorAvailableTimes";
import ProfessorAvailableTimesEdit from "./ProfessorAvailableTimesEdit";

// create a privateRoute type to see if user is authenticated
// this line takes the component and ...rest as events
// ...(three dots) means you take every property in rest
const PrivateRoute = ({ component: Component, ...rest }) => (
    // render if session's isAuthenticated is true, otherwise redirect to login
    <Route {...rest} render={(props) => (
        sessionStorage.getItem("isAuthenticated") === "true"
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

class Routing extends Component {
    render() {
        return (
            <Router>
                <>
                    <Switch>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register} />
                        <PrivateRoute path="/home" exact component={HomePage} />
                        <PrivateRoute path="/profHome" exact component={ProfessorHome} />
                        <PrivateRoute path="/home/profile" exact component={StudentProfile}/>
                        <PrivateRoute path="/home/profile/edit" exact component={StudentEditForm}/>
                        <PrivateRoute path="/form" exact component={UserForm}/>
                        <PrivateRoute path="/profHome/availableTimes" exact component={ProfessorAvailableTimes}/>
                        <PrivateRoute path="/profHome/availableTimes/edit" exact component={ProfessorAvailableTimesEdit}/>
                        <Redirect from="/" to="/home"/>
                    </Switch>
                </>
            </Router>
        )
    }
}

export default Routing;