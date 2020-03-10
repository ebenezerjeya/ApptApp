import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails';
import FormAppointmentDetails from './FormAppointmentDetails';
import FormTimePicker from './FormTimePicker';
import Confirm from './Confirm';
import Success from './Success';

export class UserForm extends Component {
    state = {
        step: 1,
        //FormUserDetails info
        firstName: '',
        lastName: '',
        email: '',
        studentID: '',
        //FormAppointmentDetails info
        purpose: '',
        professor: '',
        description: '',
        campus: '',
        date: '',
        time: '',

    }

    //Proceed to the next step method with changing states with iterations
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step+1
        });
    }

     //Go back to previous step method
     prevStep = () => {
         const {
             step
         } = this.state;
         this.setState({
             step: step-1
         });
     }

     //Handle fieldchange in terms of input box, changing when a new step advances or cancels
     //arrow function of react with event parameter
     handleChange = input => e => {
         this.setState ({[input]: e.target.value});
     }
    
    
     //need to determine what step we are on to determine which component to display
    render() {

        const {step} = this.state;
        const {firstName, lastName, email, studentID, purpose, professor, description, campus, date, time} = this.state;
        const values = {
            firstName,
            lastName,
            email,
            studentID,
            purpose,
            professor,
            description, 
            campus,
            date,
            time
        }
        
        //need to add props to call the increment step method and handlechange event method
        //handleChange={this.handleChange}
        switch(step) {
            case 1: 
                return(
                    <FormUserDetails 
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                    />
                )
            
            case 2: 
                return(
                    <FormAppointmentDetails
                    nextStep = {this.nextStep}
                    prevStep = {this.prevStep}
                    handleChange = {this.handleChange}
                    values = {values}
                    />
                )
            
            case 3:
                return ( 
                <FormTimePicker
                nextStep = {this.nextStep}
                prevStep = {this.prevStep}
                handleChange = {this.handleChange}
                values = {values}
                />
            )
            case 4:
            return ( 
                <Confirm 
                nextStep = {this.nextStep}
                prevStep = {this.prevStep}
                //no input here so no handleChange state stuff//
                values = {values}
                />
            )
            case 5: 
                return <Success/>
                
                //no props cause it's an already confirmed page, unless we add features and stuff//
            
        }
    }
}

export default UserForm
