import React from 'react';

const AddStudents = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [error,setError] = React.useState(false);

    const AddStudents = async () => {

        if(!name || !email || !phone )
        {
            setError(true);
            return false
        }

        //const adminId = 'yufxhd'; //JSON.parse(localStorage.getItem('auth'))._id;
        let result = await fetch("http://localhost:4000/api/students", {
            method: "post",
            body: JSON.stringify({ name, email, phone,}),
            headers: {
                "Content-type": "application/json",
                "Authorization":(localStorage.getItem('auth'))
            }
        });
        result = await result.json();
        console.warn(result)

    }

    return (
        <div className='student'>
            <h1>Add student</h1>
            <input type="text" placeholder='Enter student name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter student email' className='inputBox'
                value={email} onChange={(e) => { setEmail(e.target.value) }}
            />
            {error && !email && <span className='invalid-input'>Enter valid email</span>}

            <input type="text" placeholder='Enter student phone' className='inputBox'
                value={phone} onChange={(e) => { setPhone(e.target.value) }}
            />
            {error && !phone && <span className='invalid-input'>Enter valid Phone</span>} 

            <button onClick={AddStudents} className='appButton'>Add Student</button>
        </div>
    )
}

export default AddStudents;