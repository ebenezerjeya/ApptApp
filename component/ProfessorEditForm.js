import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button, FormGroup, FormControl } from "react-bootstrap";

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

    async componentDidMount() {
        const professor = await (await fetch(`http://localhost:8080/professors/${this.props.match.params.id}`)).json();
        this.setState({item:professor});
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

        fetch(`http://localhost:8080/professors/${item.professor_id}`, {
            method: 'PUT',
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

        return (
            <div>
                <Container>
                    <h2>Edit Professor</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <label>ID:</label>
                            <FormControl type="text" name="professor_id" id="professor_id"
                                         value={item.professor_id || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Name:</label>
                            <FormControl type="text" name="professor_name" id="professor_name"
                                   value={item.professor_name || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Email:</label>
                            <FormControl type="text" name="professor_email" id="professor_email"
                                   value={item.professor_email || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Warrensburg Office Number:</label>
                            <FormControl type="text" name="warr_office" id="warr_office"
                                   value={item.warr_office || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label>MIC Office Number:</label>
                            <FormControl type="text" name="mic_office" id="mic_office"
                                   value={item.mic_office || ''} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Save</Button>{' '}
                            <Button href="/professors">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )

    }
}

export default withRouter(ProfessorEditForm);