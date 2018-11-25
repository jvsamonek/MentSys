import React, { Component } from 'react'
import { ActionBar } from '../ActionBar'
import { Card } from './Cards/Card'
import { MenuCode } from '../Main';
import { TaskMode } from './Task/TaskDetails';
import { timeout } from '../../Home';

export class TaskCards extends Component {
    constructor({main}){
        super()
        this.fecthData()
        this.state = {
            main,
            row: [],
            actions: [
                {name: 'Criar tarefa', action: () => this.criarTarefa()}
            ]
        }
    }
    async fecthData(){
        //GET REQUEST {loginStatus}
        //expected [{task: {id, title, content}}, ...]
        
        await timeout(500)
        const data = {
            row: [...Array(20).keys()]
                .map(n => ({
                    id: n,
                    title: 'Tarefa ' + n,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie lacus magna, vitae mattis augue suscipit ut. Curabitur non orci nec quam laoreet porta nec in magna. Etiam fringilla lectus id quam rutrum auctor. Aliquam quis pharetra risus, id condimentum leo. Nunc mattis, nulla ac gravida rhoncus, odio elit laoreet dui, at malesuada elit purus ut massa. Integer venenatis tellus ante, a faucibus eros accumsan ut. Nulla tempus ultricies consequat.'
                }))
        }

        this.setState(data)
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar title={'Tarefas Ativas'} actions={this.state.actions}/>
                <div className="main-content">
                    {this.state.row.map(task => (
                        <Card main={this.state.main} row={task}/>
                    ))}
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