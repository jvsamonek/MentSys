import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { MenuCode } from '../Main';
import TextField from '@material-ui/core/TextField';
import { Select } from '../../../Components/Select';
import { BottomActionBar } from '../BottomActionBar';
import { timeout } from '../../Home';
import { Req } from '../../../Components/Request';

export class ActivityDetails extends Component {
    constructor({ main, row }){
        super()
        this.fetchData()
        //expected row: {id, status: {name}, task: {title}, user: {name}}
        this.state = {
            main,
            row,
            status: [
                {id: 0, name: 'ANTES'},
                {id: 1, name: 'ANTES'},
                {id: 2, name: 'ANTES'}
            ],
            users: [],
            bottomAction: [
                {name: 'Salvar', action: () => this.saveTask()}
            ]
        }
    }
    async fetchData(){
        //GET REQUEST {loginSatus, activity: {id}}
        //expected {activity: {id, status: {id}, task: {id, title, startDate, endDate}, user: {id}}}

        //GET REQUEST {}
        //expected {status: [{id, name}, ...]}
        
        //GET REQUEST {}
        //expected {users: [{id, name}, ...]}

        await timeout(500)
        const data = {
            row: {
                id: 55, 
                status: {id: 1}, 
                task: {
                    id: 33, 
                    title: 'titulo',
                    startDate: new Date().toLocaleDateString(),
                    endDate: new Date().toLocaleDateString()
                }, 
                user: {
                    id: 1
                }
            },
            status: [
                {id: 0, name: 'PENDENTE'},
                {id: 1, name: 'ATRASADO'},
                {id: 2, name: 'CONCLUIDO'}
            ],
            users: [
                {id: 0, name: 'Guilherme'},
                {id: 1, name: 'Gabriel'},
                {id: 2, name: 'Amanda'},
            ]
        }
        debugger
        //this.status._self.setState({value: data.row.status.id, options: data.status})
        this.setState(data)
    }
    render(){
        this.status = <Select className="left" title='Status' value={this.state.row.status.id} options={this.state.status}/>
        this.user = <Select className="left" title='Responsavel' value={this.state.row.user.id} options={this.state.users}/>
        
        return (
            <div className="main-diff">
                <ActionBar title="Propriedades da Atividade"
                    back={() => this.back()}
                />
                <div className="main-content">
                    <div style={{margin: '20px'}}>
                        <TextField
                            className="task-manager-title left"
                            id="outlined-name"
                            label="Tarefa"
                            value={this.state.row.task.title}
                            margin="normal"
                            variant="outlined"
                            onChange={e => {this.state.row.task.title = e.target.value}}
                        />
                        {this.status}
                        <div>
                            <TextField
                                style={{
                                    margin: '10px',
                                    width: '38%'
                                }}
                                onChange={(e) => this.state.row.task.start = e.target.value}
                                id="date"
                                label="Inicio"
                                type="date"
                                defaultValue={this.state.row.task.start}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{
                                    margin: '10px',
                                    width: '38%'
                                }}
                                onChange={(e) => this.state.row.task.end = e.target.value}
                                id="date"
                                label="Fim"
                                type="date"
                                defaultValue={this.state.row.task.start}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {this.user}
                        </div>
                    </div>
                    <BottomActionBar actions={this.state.bottomAction}/>
                </div>
            </div>
        )
    }
    back(){
        this.state.main.setContent(MenuCode.PEOPLE_LIST)
    }
    async saveTask(){
        //POST REQUEST {loginStatus, activity: {id, status: {id}, task: {id, startDate, endDate}, user: {id}}}
        //expected {success: true | false}

        await timeout(500)
        const data = {
            success: true
        }
        if(data.success){
            alert('Atividade salva com sucesso.')
        }
        else
            alert('Erro ao salvar atividade!')
    }
}