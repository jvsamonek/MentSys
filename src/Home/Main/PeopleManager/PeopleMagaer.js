import React, { Component } from 'react'
import { MainTitle } from '../../Main/MainTitle'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export class PeopleManager extends Component {
    constructor({title}){
        super()
        this.state = {
            tasks: [...Array(50).keys()].map(n => <PeopleLine/>)
        }
    }
    render(){
        return (
            <div className="main-diff">
                <MainTitle title={'Central de Atribuições'}/>
                <div className="main-content">
                    <List >
                        {this.state.tasks}
                    </List>
                </div>
            </div>
        )
    }
}

export class PeopleLine extends Component {
    constructor({ row }){
        super()
        this.state = {
            row
        }
    }
    render(){
        return (            
            <div>
                <ListItem button className="task-line">
                    <ListItemText primary={'NOME DO RESPONSAVEL'} />
                    <ListItemIcon>
                        STATUS
                    </ListItemIcon>
                    <ListItemText primary={'NOME DA TAREFA'} />
                    <ListItemIcon>
                        MODIFICAR
                    </ListItemIcon>
                </ListItem>
                <Divider />
            </div>
        )
    }
}