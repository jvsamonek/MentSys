import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { MenuCode } from '../Main/Main';
import { getLoginStatus } from '../../Components/LoginStatus';

export class SideMenu extends Component{
    constructor({home}){
        super()
        const optionsData = [
            {nome: 'Novidades', menuCode: MenuCode.NEWS},
            {nome: 'Projetos', menuCode: MenuCode.TASK_LIST},
            {nome: 'Tarefas', menuCode: MenuCode.PEOPLE_LIST},
            {nome: 'Alertas', menuCode: MenuCode.ALERT_LIST},
            {nome: 'Status', menuCode: MenuCode.STATUS},
        ]
        const loginRequiredOption = [{nome: 'Home', menuCode: MenuCode.WAITING_LOGIN}]
        
        const loginStatus = getLoginStatus()
        let currentOptions = loginStatus._id ? optionsData : [loginRequiredOption]

        this.state = {
            optionsData,
            home,
            options: currentOptions
                .map(o => 
                    <MenuOption 
                        selectOption={() => this.selectOption(o.menuCode)} 
                        name={o.nome} 
                        menuCode={o.menuCode}
                        selected={false}
                />)
        }
    }
    selectOption(menuCode){
        /*const options = this.state.optionsData
        .map(o => 
            <MenuOption 
                selectOption={() => this.selectOption(o.menuCode)} 
                name={o.nome} 
                menuCode={o.menuCode}
                selected={true}
        />)
        this.setState({options})*/
        if(this.state.home.main)
            this.state.home.main.setContent(menuCode)
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
    constructor({ selectOption, name, menuCode, selected }){
        super()
        this.state = {
            selectOption,
            name,
            menuCode,
            selected
        }
    }
    render(){
        return (
            <div onClick={this.state.selectOption}>
                <ListItem 
                    button
                    selected={this.state.selected}
                    >
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={this.state.name} />
                </ListItem>
                <Divider/>
            </div>
        )
    }
}
