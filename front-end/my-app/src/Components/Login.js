import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

     useEffect(() => {
         const auth = localStorage.getItem('auth');
        if (auth){
            navigate('/')
        }
     }, [])

    const handleLogin = async () => {
        //alert("hello")
        fetch("http://localhost:4000/api/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((result) => {
            result.json().then((resp) => {
                localStorage.setItem('auth', resp.token);
                
            });
        });
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login