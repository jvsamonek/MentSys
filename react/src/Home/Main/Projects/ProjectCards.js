import React, { Component } from 'react'
import { ActionBar } from '../ActionBar'
import { Card } from './Cards/Card'
import { MenuCode, MainWaiting, MainMessage } from '../Main';
import { TaskMode } from './Project/ProjectDetails';
import { getLoginStatus } from '../../../Components/LoginStatus';
import { Req } from '../../../Components/Request';

export class ProjectCards extends Component {
    constructor({main}){
        super()
        this.fecthData()
        this.state = {
            loading: true,
            main,
            row: [],
            actions: [
                {name: 'Criar projeto', action: () => this.createTask()}
            ]
        }
    }
    async fecthData(){

        const loginStatus = getLoginStatus()
        const data = await Req.get('/todosProjetos', {loginStatus})

        if(data.success)
            this.setState({row: data.allProjetos, loading: false})
        else
            this.setState({row: [], loading: false})
        
    }
    render(){
        if(this.state.loading)
            return <MainWaiting></MainWaiting>
        if(this.state.row.length === 0)
            return <MainMessage message="Não existem tarefas no momento."/>
        return (
            <div className="main-diff">
                <ActionBar title={'Projetos Ativos'} actions={this.state.actions}/>
                <div className="main-content">
                    {this.state.row.map(task => (
                        <Card main={this.state.main} row={task}/>
                    ))}
                </div>
            </div>
        )
    }
    createTask(){
        this.state.main.setContent(
            MenuCode.TASK_DETAILS,
            {},
            {mode: TaskMode.EDIT}
        )
    }
}