import React, { Component } from 'react'
import { MainTitle } from '../MainTitle'
import { Card } from './Card'

export class TaskCards extends Component {
    constructor({main}){
        super()
        const title = 'Card '
        let i = 1
        this.state = {
            cards: [...Array(20).keys()]
                .map(n => <Card main={main} title={title+i++}/>),
            content: 'cards'
        }
    }
    render(){
        return (
            <div className="main-diff">
                <MainTitle title={'Cards'}/>
                <div className="main-content">
                    {this.state.cards}
                </div>
            </div>
        )
    }
}