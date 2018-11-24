import React, { Component } from 'react'

export class CardTitle extends Component {
    constructor({title}){
        super()
        this.title = title
    }
    render(){
        return (
            <div className="card-title">
                {this.title}
            </div>
        )
    }
}