import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import TextField from '@material-ui/core/TextField';
import { BottomActionBar } from '../BottomActionBar';
import { timeout } from '../../Home';
import { MainWaiting } from '../Main';

export class UserStatus extends Component {
    constructor({ row }){
        super()
        this.fetchData()
        this.state = {
            row: {},
            actions: [
                {name: 'Salvar', action: () => this.saveUserInfo()}
            ]
        }
    }
    async fetchData(){
        //GET REQUEST {loginStatus}
        //expected {name, lastName, email, phone}

        await timeout(500)
        const data = {
            row: {
                name:'Guilherme',
                lastName: 'Rocha',
                email: 'email@email.com',
                phone: '41 99002222'
            }
        }
        this.setState(data)
    }
    render(){
        if(!this.state.row.name || !this.state.row.lastName || !this.state.row.email || !this.state.row.phone)
            return <MainWaiting/>
        return (            
            <div className="main-diff">
                <ActionBar title={'Informações Pessoais'} actions={[]}/>
                <div className="main-content">
                <TextField
                    className="task-manager-title left"
                    id="outlined-name"
                    label="Nome"
                    value={this.state.row.name || ''}
                    margin="normal"
                    variant="outlined"
                    style={{
                        width: '40%',
                        margin: '10px'
                    }}
                    onChange={e => {
                        const newState = this.state.row || {}
                        newState.name = e.target.value
                        this.setState(newState)
                    }}
                /> 
                <TextField
                    className="task-manager-title left"
                    id="outlined-name"
                    label="Sobrenome"
                    value={this.state.row.lastName || ''}
                    margin="normal"
                    variant="outlined"
                    style={{
                        width: '40%',
                        margin: '10px'
                    }}
                    onChange={e => {
                        const newState = this.state.row || {}
                        newState.lastName = e.target.value
                        this.setState(newState)
                    }}
                />
                <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Email"
                        value={this.state.row.email || ''}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '40%',
                            margin: '10px'
                        }}
                        onChange={e => {
                            const newState = this.state.row || {}
                            newState.email = e.target.value
                            this.setState(newState)
                        }}
                    /> 
                <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Teleone"
                        value={this.state.row.phone || ''}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '40%',
                            margin: '10px'
                        }}
                        onChange={e => {
                            const newState = this.state.row || {}
                            newState.phone = e.target.value
                            this.setState(newState)
                        }}
                    /> 
                    <BottomActionBar actions={this.state.actions}/>
                </div>
            </div>
        )
    }
    async saveUserInfo(){
        //POST REQUEST {loginStatus, {name, lastName, email, phone}}
        //expected {success: true | false}

        await timeout(500)
        const data = {
            success: true
        }
        if(data.success)
            alert('Informções salvas com sucesso.')
        else
            alert('Erro ao salvar informações!')
    }
}
