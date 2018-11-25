import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { MenuCode } from '../Main/Main';

export class SideMenu extends Component{
    constructor({home}){
        super()
        this.state = {
            options: [
                {nome: 'Novidades', menuCode: MenuCode.NEWS},
                {nome: 'Tarefas', menuCode: MenuCode.TASK_LIST},
                {nome: 'Central de Atribuições', menuCode: MenuCode.PEOPLE_LIST},
                {nome: 'Alertas', menuCode: MenuCode.ALERT_LIST},
                {nome: 'Status', menuCode: MenuCode.STATUS},
            ]
                .map(o => <MenuOption home={home} name={o.nome} menuCode={o.menuCode}/>),
            home
        }
    }
    render(){
        return (
            <div className="side-menu left">
                <List>
                <Divider />
                    {this.state.options}
                </List>
            </div>
        )
    }
}

class MenuOption extends Component{
    constructor({ home, name, menuCode }){
        super()
        this.state = {
            home,
            name,
            menuCode
        }
    }
    render(){
        return (
            <div onClick={() => this.selectMenu()}>
                <ListItem button>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={this.state.name} />
                </ListItem>
                <Divider />
            </div>
        )
    }    
    selectMenu(){
        this.state.home.main.setContent(this.state.menuCode)
    }
}
