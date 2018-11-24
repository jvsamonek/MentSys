import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { MenuCode } from '../Main';
import TextField from '@material-ui/core/TextField';
import { Select } from './Select';
import { BottomActionBar } from '../BottomActionBar';

export class PeopleDetails extends Component {
    constructor({ main, row }){
        super()
        this.state = {
            main,
            row,
            usersName: [
                'Usuario 1',
                'Usuario 2',
                'Usuario 3'
            ],
            bottomAction: [
                {name: 'Salvar', action: () => this.saveTask()}
            ]
        }
    }
    render(){
        const options = [
            'ATIVO',
            'FECHADO',
            'PROBLEMA',
            'PENDENTE'
        ]
        this.status = <Select className="left" title='Status' value={this.state.row.task.statusId} options={options}/>
        this.user = <Select className="left" title='Responsavel' value={this.state.row.task.userId} options={this.state.usersName}/>
        return (
            <div className="main-diff">
                <ActionBar 
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
    saveTask(){
        //save in server
        //POST
    }
}