import React, { Component} from 'react';
//material-ui theme provider wrapper
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//trying out a different ui package lmaoo looks easier
import { Dropdown } from 'semantic-ui-react';

//for dropdown(formcontrol) import files
/*
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//hardcoded prof names for now... not sure whether i should implement in this exact compo
// or a more general one in UserForm
const profNames = [
    'CS-Professor1',
    'CS-Professor2',
    'CS-Professor3',
    'CS-Professor4',
    'CS-Professor5',
    'CS-Professor6',
    'CS-Professor7',
    'CS-Professor8',
    'CS-Professor9',
    'CS-Professor10',
];

const purposeTypes = [
	'purpose1',
	'purpose2',
	'purpose3',
	'purpose4',
	'purpose5',
];

const campusLocation = [
	'Warrensburg',
	'Lees Submit',
];

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ?
			theme.typography.fontWeightRegular :
			theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelect() {
	const classes = useStyles();
	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);

	const handleChange = event => {
		setPersonName(event.target.value);
	};

< FormControl className = {
		classes.formControl
	} >
	<
	InputLabel id = "demo-mutiple-name-label" > Purpose < /InputLabel> <
	Select
labelId = "demo-mutiple-name-label"
id = "demo-mutiple-name"
multiple
value = {
	personName
}
onChange = {
	handleChange
}
input = {
	< Input / >
}
MenuProps = {
		MenuProps
	} >
	{
		profNames.map(name => ( <
			MenuItem key = {
				name
			}
			value = {
				name
			}
			style = {
				getStyles(name, personName, theme)
			} > {
				name
			} <
			/MenuItem>
		))
	} <
	/Select> <
	/FormControl>
*/
const profOptions = [
	{
		key: 'Jenny Hess',
		text: 'Jenny Hess',
		value: 'Jenny Hess',
	},
	{
		key: 'Elliot Fu',
		text: 'Elliot Fu',
		value: 'Elliot Fu',

	},
]

export class FormAppointmentDetails extends Component {
    //continue for event parameter to advance steps
    continue = e => {
        e.preventDefault();
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
            values,
            handleChange
        } = this.props;
//gonna work on researching up on a dropdown tab thing with different dummy selections of choices
//probably need to display those choices after linking with DB and spring instead of frontend hardcode
//for now - dummy
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <AppBar
                title="Welcome to Student/Appointment Application. Please select your purpose of appointment and professor to schedule a meeting"
                style={{ backgroundColor: "#D50000" }}
              />

              <Dropdown
                placeholder="Select Professor"
                fluid
                selection
                options={profOptions}
              />

              <TextField
                hintText="Purpose"
                floatingLabelText="Purpose"
                onChange={handleChange("purpose")}
                defaultValue={values.purpose}
              />

              <br />
              <TextField
                hintText="Professor"
                floatingLabelText="Professor"
                onChange={handleChange("professor")}
                defaultValue={values.professor}
              />
              <br />
              <TextField
                hintText="*Additional descriptions*"
                floatingLabelText="Additional descriptions"
                onChange={handleChange("description")}
                defaultValue={values.description}
              />
              <br />
              <TextField
                hintText="Select your campus of choice"
                floatingLabelText="Campus"
                onChange={handleChange("campus")}
                defaultValue={values.campus}
              />
              <br />
              <RaisedButton
                label="Continue"
                primary={true}
                style={StyleSheet.button}
                onClick={this.continue}
              />
              <RaisedButton
                label="Back"
                primary={false}
                style={StyleSheet.button}
                onClick={this.back}
              />
            </React.Fragment>
          </MuiThemeProvider>
        ); //react works when everytime textfield changes, its gonna fire off an event 
    };
}
//notes on the current progress so far, purpose needs to be drop down box. 
//Additional descriptions need to have a bigger input box
//All these things need to be learnt and applied from the material-ui react stuff i chose and referenced from the tutorial i was learing from.
const styles = {
    button: {
        margin: 15
    }
}

export default FormAppointmentDetails

