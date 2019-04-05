import React, { Component } from 'react';
import axios from 'axios';
import Joke from "./joke.js";

export default class Jokes extends Component  {

    constructor(props) {
        super(props)
        this.state = {
            jokes: []
        }
    }

    componentDidMount() {

        axios.get("https://localhost:3300/api/jokes")
            .then(listOfJokes => {this.setState({ jokes: listOfJokes })})
            .catch(err => console.log("We cannot retrieve jokes!"));
    }

    render() {
        return(
            <div className="Jokes">
                Welcome to the restricted users section!
                {
                    this.state.jokes.map(a_joke => {
                        return <Joke joke={a_joke} />
                    })
                }  
            </div>
        )
    }
}
