import React from 'react'
import {GlobalCtx} from "../App"
import './Login.css'



const Signup = ({history}) => {
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
        fetch(`${url}/users`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            setForm(blank)
            alert("Thanks for signing up! Login to get started.")
            history.push("/login")
        })

    }


    return (
        <div className="form-container">
    
    <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
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
        <button
            className="btn btn-primary btn-block"
            type="submit" style={{backgroundColor: 'darkslategray'}}>Submit</button>
    </form>

</div>
    )

}

export default Signup