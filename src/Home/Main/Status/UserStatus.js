import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import TextField from '@material-ui/core/TextField';
import { BottomActionBar } from '../BottomActionBar';

export class UserStatus extends Component {
    constructor({ row }){
        super()
        this.state = {
            row: {
                name:'Guilherme',
                lastName: 'Rocha',
                email: 'email@email.com',
                phone: '41 99002222'
            }
        }
    }
    render(){
        const actions = [
            {name: 'Salvar', action: () => this.saveUserInfo()}
        ]
        return (            
            <div className="main-diff">
                <ActionBar title={'Informações Pessoais'} actions={[]}/>
                <div className="main-content">
                <TextField
                    className="task-manager-title left"
                    id="outlined-name"
                    label="Nome"
                    defaultValue={this.state.row.name}
                    margin="normal"
                    variant="outlined"
                    style={{
                        width: '40%',
                        margin: '10px'
                    }}
                    onChange={e => {this.state.row.name = e.target.value}}
                /> 
                <TextField
                    className="task-manager-title left"
                    id="outlined-name"
                    label="Sobrenome"
                    defaultValue={this.state.row.lastName}
                    margin="normal"
                    variant="outlined"
                    style={{
                        width: '40%',
                        margin: '10px'
                    }}
                    onChange={e => {this.state.row.lasName = e.target.value}}
                />
                <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Email"
                        defaultValue={this.state.row.email}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '40%',
                            margin: '10px'
                        }}
                        onChange={e => {this.state.row.email = e.target.value}}
                    /> 
                <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Teleone"
                        defaultValue={this.state.row.phone}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '40%',
                            margin: '10px'
                        }}
                        onChange={e => {this.state.row.telefone = e.target.value}}
                    /> 
                    <BottomActionBar actions={actions}/>
                </div>
            </div>
        )
    }
    saveUserInfo(){
        //
    }
}
