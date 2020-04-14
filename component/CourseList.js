import React , { Component } from 'react';
import { Button } from 'reactstrap';

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            course_id: null,
            course_name: null,
            course_code: null,
            professor_id: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/courses`)
            .then(response => response.json())
            .then(data => this.setState({professors: data}));
    }

    remove(id) {
        fetch(`http://localhost:8080/courses/${id}`, {
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
                <h2>Courses:</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Course Code</th>
                        <th>Professor_ID</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.professors.map(
                            professor =>
                                <tr key={professor.course_id}>
                                    <td>{professor.course_id}</td>
                                    <td>{professor.course_name}</td>
                                    <td>{professor.course_code}</td>
                                    <td>{professor.professor_id}</td>
                                    <td><Button color="danger" onClick={() => this.remove(professor.professor_id)}>Delete</Button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;