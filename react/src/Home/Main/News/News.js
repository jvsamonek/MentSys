import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { Graph } from './Graph';
import CardM from '@material-ui/core/Card';
import { InfoCard } from './InfoCard';
import { timeout } from '../../Home';
import { MainWaiting, MainMessage } from '../Main';
import { getLoginStatus } from '../../../Components/LoginStatus';
import { Req } from '../../../Components/Request';
import { debug } from 'util';

export class News extends Component {
    constructor(){
        super()
        this.fetchData()
        this.state = {
            loading: true
        }
    }
    async fetchData(){
        const loginStatus = getLoginStatus()
        const data = await Req.get('/barras', {loginStatus}) 
        if(data.success)
            this.setState({row: data, loading: false})
        else
            this.setState({row: [], loading: false})
    }
    render(){
        if(this.state.loading)
            return <MainWaiting/>
        if(this.state.row.length === 0)
            return <MainMessage message="Não ha novidades no momento"/>
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