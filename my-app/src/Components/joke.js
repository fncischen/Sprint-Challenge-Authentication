import React, { Component } from 'react';

export default class Joke extends Component  {

    render() {
        return(
            <div className="User">
                {this.props.joke}
            </div>
        )
    }
}