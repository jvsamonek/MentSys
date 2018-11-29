import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { Graph } from './Graph';
import CardM from '@material-ui/core/Card';
import { InfoCard } from './InfoCard';
import { timeout } from '../../Home';
import { MainWaiting } from '../Main';

export class News extends Component {
    constructor(){
        super()
        this.fetchData()
        this.state = {
            loading: true
        }
    }
    async fetchData(){
        //GET REQUEST {loginStatus}
        //expected {bars: [{name, value}, ...]}
        await timeout(500)
        const data = {
            loading: false,
            row: {
                bars: [
                    {name: 'Tarefas', value: 63},
                    {name: 'Atividades', value: 900},
                    {name: 'Alertas', value: 20},
                ]
            }
        }
        this.setState(data)
    }
    render(){
        if(this.state.loading)
            return <MainWaiting/>
        return (            
            <div className="main-diff">
                <ActionBar title={'Novidades'} actions={[]}/>
                <div className="main-content">
                    <InfoCard bars={this.state.row.bars}/>
                    <CardM className="graph-card center-margin">
                        <Graph/>
                    </CardM>
                </div>
            </div>
        )
    }
}