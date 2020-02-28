import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";

export default function ProfessorListNew(props) {

    const [professor, setProfessor] = useState(
        {
        professor: [],
        professor_id: null,
        professor_name: null,
        professor_email: null,
        warr_office: null,
        mic_office: null
    });

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
        const response = await fetch(`http://localhost:8080/professors`);
        response
            .json()
            .then(response => setProfessor(response));
    }

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
                    Array.isArray(professor) && professor.map(prof =>
                        <tr key={prof.professor_id}>
                            <td>{prof.professor_id}</td>
                            <td>{prof.professor_name}</td>
                            <td>{prof.professor_email}</td>
                            <td>{prof.warr_office}</td>
                            <td>{prof.mic_office}</td>
                            <td><Button color="primary" href={"/professors/" + prof.professor_id}>Edit</Button></td>
                            <td><Button color="danger" onClick={() => this.remove(prof.professor_id)}>Delete</Button></td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <Button color="success" href="/professors/new">Add Professor</Button>
        </div>
    )
}