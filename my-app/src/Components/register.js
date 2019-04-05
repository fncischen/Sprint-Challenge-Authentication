import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(`https://localhost:3300/api/register`, user)
        .then((response) => console.log(response))
        .catch(err => console.log(err));
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    render() {    
        
        return(
        <div className="Register">
            <form onSubmit={() => this.onSubmit}>
                <label>Username:</label>
                <input type="text" name="username" onChange={this.handleChange}></input>
                
                <label>Password:</label>
                <input type="text" name="password" onChange={this.handleChange}></input>
            
                <button type="submit">Register</button>
            </form>
        </div>
        )

    }
}
 