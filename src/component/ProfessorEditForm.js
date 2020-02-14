import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class ProfessorEditForm extends Component {
    emptyItem = {
        professor_id: '',
        professor_name: '',
        professor_email: '',
        warr_office: '',
        mic_office: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            //const professor = (fetch(`professors/${this.props.match.params.id}`)).json();
            //this.setState({item:professor});

            fetch(`/professors/${this.props.match.params.id}`)
                .then(professor => this.setState({item: professor}));
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        const {item} = this.state;

        fetch(`http://localhost:8080/professors`, {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/professors');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>;

        return (
            <div>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="professor_id">ID:</Label>
                            <Input type="text" name="professor_id" id="professor_id"
                                   value={item.professor_id || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="professor_name">Name:</Label>
                            <Input type="text" name="professor_name" id="professor_name"
                                   value={item.professor_name || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="professor_email">Email:</Label>
                            <Input type="text" name="professor_email" id="professor_email"
                                   value={item.professor_email || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="warr_office">Warrensburg Office Number:</Label>
                            <Input type="text" name="warr_office" id="warr_office"
                                   value={item.warr_office || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="mic_office">MIC Office Number:</Label>
                            <Input type="text" name="mic_office" id="mic_office"
                                   value={item.mic_office || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Save</Button>{' '}
                            <Button tag={Link} to="/professors">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )

    }
}

export default withRouter(ProfessorEditForm);