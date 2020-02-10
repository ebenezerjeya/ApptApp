import React, { Component } from 'react';
//material-ui theme provider wrapper
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


export class Success extends Component {
    //continue for event parameter to advance steps
    continue = e => {
        e.preventDefault();
        // Process Form - process it with backend and send data with rest.api with backend here i think//
        // A method here or something maybe idk //
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    //notes - A common pattern in React is for a component to return multiple elements. 
    //Fragments let you group a list of children without adding extra nodes to the DOM.

    render() {
        return ( 
            <MuiThemeProvider >
            <React.Fragment >
            <AppBar title = "Successful!!" style={{backgroundColor: '#D50000'}}/>
                <h1>Thank you for using Student/Appointment.</h1>
                <p>You should received an email very shortly that includes all the details of the appointment you've made</p>
           
            </React.Fragment>  
            </MuiThemeProvider>
        ) //react works when everytime textfield changes, its gonna fire off an event 
    };
}


export default Success
