import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        let result = await fetch('http://localhost:4000/api/students');
        result = await result.json();
        setStudents(result);
    }

    const deleteStudent = async (_id) => {
        console.warn(_id)
        let result = await fetch(`http://localhost:4000/api/students/${_id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
                "Authorization":(localStorage.getItem('auth'))
            }
        });
        result = await result.json();
        if (result) {
            getStudents();
        }
    }

    return (
        <div className="student-list">
            <h3>Student List</h3>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Email</li>
                <li>Phone</li>
            </ul>
            {
                students.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.email}</li>
                        <li>{item.phone}</li>
                        <li>
                            <button onClick={() => deleteStudent(item._id)}>Delete</button>
                            <Link to={"/update/"+item.name} >Update </Link>
                            </li>

                    </ul>
                )
            }
        </div>
    )
}

export default StudentList;