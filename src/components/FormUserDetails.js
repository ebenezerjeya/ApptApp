import React, { Component } from 'react';
//material-ui theme provider wrapper
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormUserDetails extends Component {
    //continue for event parameter to advance steps
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
//notes - A common pattern in React is for a component to return multiple elements. 
//Fragments let you group a list of children without adding extra nodes to the DOM.
  
    render() {
        //it's something like creating a const variable value to pull out 
        //from values in Userform to use it here like a variable
        const { values, handleChange} = this.props;
       
        return (
            <MuiThemeProvider>
               <React.Fragment>
                   <AppBar title = "Welcome to Student/Appointment Application. Please enter your details." 
                    style = {{backgroundColor: '#D50000'}}/>
                   <TextField
                     hintText = "Enter your first name"
                     floatingLabelText = "First Name"
                     onChange={handleChange('firstName')}
                     defaultValue={values.firstName}
                    />
                    <br/>
                    <TextField
                    hintText = "Enter your last name"
                    floatingLabelText = "Last Name"
                    onChange = {handleChange('lastName')}
                    defaultValue = {values.lastName}
                    />
                    <br/>
                    <TextField
                    hintText = "Enter your email"
                    floatingLabelText = "Email"
                    onChange = {handleChange('email')}
                    defaultValue = {values.email}
                    />
                    <br/>
                    < TextField
                    hintText = "Enter your student ID"
                    floatingLabelText = "#700"
                    onChange = {handleChange('studentID')}
                    defaultValue = {values.studentID}
                    />
                    <br/>
                        <br/>
                            <br/>
                                <br/>
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        style={StyleSheet.button}
                        onClick={this.continue}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        )//react works when everytime textfield changes, its gonna fire off an event 
    };
}

const styles = {
    button: {
        margin: 15
        
    }
}



export default FormUserDetails
