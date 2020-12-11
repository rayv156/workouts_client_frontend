import React from 'react'
import {GlobalCtx} from "../App"
import "./Login.css";

const Login = ({ history }) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const {url} = gState

    const blank = {
        username: "",
        password: ""
    }
    const [form, setForm] = React.useState(blank)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, password } = form;
        fetch(`${url}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            if (data.token){
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("user", JSON.stringify(data.user))
            setgState({...gState, token: true, user: data.user, error: null})
            setForm(blank)
            alert(`You have successfully signed in.  Welcome ${data.user.username}!`)
            history.push("/")
            } else {
                setgState({...gState, error: data.error})
                setForm(blank)
                history.push("/login")
            }
        })

    }


    return (
        <div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <div className="form-group form-inline">
        <label><ion-icon name="person-outline"></ion-icon></label>
        <input
                id="username"
                type="text"
                name='username'
                className='form-control'
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange} />
            
        </div>

        <div className="form-group form-inline">
        <label><ion-icon name="lock-closed-outline"></ion-icon></label>
            <input id="password"
                type="password"
                name='password'
                className='form-control'
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange} />
        </div>
        <p style={{color: 'red'}}>{gState.error}</p>
        <button
            className="btn btn-primary btn-block"
            type="submit">Submit</button>
    </form>
</div>
    )
}
export default Login
