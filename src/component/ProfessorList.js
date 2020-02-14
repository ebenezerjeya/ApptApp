import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class ProfessorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            professors: [],
            professor_id: null,
            professor_name: null,
            professor_email: null,
            warr_office: null,
            mic_office: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/professors`)
            .then(response => response.json())
            .then(data => this.setState({professors: data}));
    }

    remove(id) {
        fetch(`http://localhost:8080/professors/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
           let updatedList = [...this.state.professors].filter(i => i.id != id);
           this.setState({professors: updatedList});
        });
    }

    render() {
        return (
            <div>
                <h2>Professors:</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>WCM Office</th>
                        <th>MIC Office</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.professors.map(
                            professor =>
                                <tr key={professor.professor_id}>
                                    <td>{professor.professor_id}</td>
                                    <td>{professor.professor_name}</td>
                                    <td>{professor.professor_email}</td>
                                    <td>{professor.warr_office}</td>
                                    <td>{professor.mic_office}</td>
                                    <td><Button color="primary" tag={Link} to={"/professors/" + professor.professor_id}>Edit</Button></td>
                                    <td><Button color="danger" onClick={() => this.remove(professor.professor_id)}>Delete</Button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <Button color="success" tag={Link} to="/professors/new">Add Group</Button>
            </div>
        )
    }
}

export default ProfessorList;