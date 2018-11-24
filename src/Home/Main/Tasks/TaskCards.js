import React, { Component } from 'react'
import { ActionBar } from '../ActionBar'
import { Card } from './Cards/Card'
import { MenuCode } from '../Main';
import { TaskMode } from './Task/TaskDetails';

export class TaskCards extends Component {
    constructor({main}){
        super()
        const title = 'Card '
        let i = 1
        this.state = {
            main,
            cards: [...Array(20).keys()]
                .map(n => <Card main={main} title={title+i++}/>),
            content: 'cards',
            actions: [
                {name: 'Criar tarefa', action: () => this.criarTarefa()}
            ]
        }
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar title={'Tarefas Ativas'} actions={this.state.actions}/>
                <div className="main-content">
                    {this.state.cards}
                </div>
            </div>
        )
    }
    criarTarefa(){
        this.state.main.setContent(
            MenuCode.TASK_DETAILS,
            {id: 0},
            {mode: TaskMode.EDIT}
        )
    }
}