import React, { Component} from 'react';
//material-ui theme provider wrapper
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export class Confirm extends Component {
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
        //it's something like creating a const variable value to pull out 
        //from values in Userform to use it here like a variable
        const { 
            values: {
                firstName, 
                lastName, 
                email, 
                studentID, 
                purpose, 
                professor, 
                description, 
                campus
            }
        } = this.props;

        return ( 
            <MuiThemeProvider >
            <React.Fragment >
            <AppBar title = "Confirmation Page"
                style = {{backgroundColor: '#D50000'}}/>
            <List>
                <ListItem
                    primaryText ="First Name"
                    secondaryText ={ firstName}
                />
                <ListItem
                    primaryText = "Last Name"
                    secondaryText = {lastName}
                />
                <ListItem
                    primaryText = "Email"
                    secondaryText = {email}
                />
                <ListItem
                    primaryText = "Student ID (#700)"
                    secondaryText = {studentID}
                />
                <ListItem
                    primaryText = "Purpose"
                    secondaryText = {purpose}
                />
                <ListItem
                    primaryText = "Professor"
                    secondaryText = {professor}
                />
                <ListItem
                    primaryText = "Campus"
                    secondaryText = {campus}
                />
                <ListItem
                    primaryText = "*Additional Description*"
                    secondaryText = {description}
                />
                
                </List>
             
           <br/>
                <br/>
                    <br/>
                        <br/>
            <RaisedButton 
                label = "Confirm & Continue"
                primary = {true}
                style = {StyleSheet.button}
                onClick = {this.continue}
            />
            <RaisedButton
                label = "Back"
                primary = {false}
                style = {StyleSheet.button}
                onClick = {this.back}
            />   
            </React.Fragment> 
            </MuiThemeProvider>
        ) //react works when everytime textfield changes, its gonna fire off an event 
    };
}

const styles = {
    button: {
        margin: 15
    }
}

export default Confirm
