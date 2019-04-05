import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }

    // https://tylermcginnis.com/react-router-programmatically-navigate/
    onSubmit = e => {
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(`https://localhost:3300/api/login`, { user })
        .then(res => {
            localStorage.setItem("token", res.data.token);
            this.props.history.push("/users");
        })
        .catch(err => console.log(err));
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    render() {    
        
        return(
        <div className="Login">
            <form onSubmit={this.onSubmit}>
                <label>Username:</label>
                <input text="text" name="username" onChange={this.handleChange}></input>

                <label>Password:</label>
                <input text="text" name="password" onChange={this.handleChange}></input>
                <button type="submit">Sign In</button>
            </form>
        </div>
        )

    }
}
 