import React from 'react';

const UpdateStudent = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    

    const UpdateStudent = async (name) => {
        console.warn(name,email,phone)
        let result = await fetch(`http://localhost:4000/api/students/${name}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization":(localStorage.getItem('auth'))
            }
        });
        result = await result.json();
        if (result) {
            //getStudents();
        }
    }

    return (
        <div className='student'>
            <h1>Update Student</h1>
            <input type="text" placeholder='Enter Student name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter Student email' className='inputBox'
                value={email} onChange={(e) => { setEmail(e.target.value) }}
            />

            <input type="text" placeholder='Enter Student phone' className='inputBox'
                value={phone} onChange={(e) => { setPhone(e.target.value) }}
            />

            


            <button onClick={UpdateStudent} className='appButton'>Update Student</button>
        </div>
    )
}

export default UpdateStudent;