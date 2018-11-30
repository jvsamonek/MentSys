import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import TextField from '@material-ui/core/TextField';
import { BottomActionBar } from '../BottomActionBar';
import { timeout } from '../../Home';
import { MainWaiting } from '../Main';
import { getLoginStatus } from '../../../Components/LoginStatus';
import { Req } from '../../../Components/Request';

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
        const loginStatus = getLoginStatus()
        const data = await Req.get('/infoUsuario', {loginStatus})

        if(data.success)
            this.setState({ row: data.resp, loading: false})
        else
            this.setState({ row: {}, loading: false})
    }
    render(){
        if(this.state.loading)
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

        const loginStatus = getLoginStatus()
        let usuarioFront = this.state.row
        const data = await Req.post('/salvarUsuario', {loginStatus, usuarioFront})
        if(data.success)
            alert('Informações salvas com sucesso.')
        else
            alert('Erro ao salvar informações!')
    }
}
