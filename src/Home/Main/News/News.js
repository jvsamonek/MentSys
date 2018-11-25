import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { Graph } from './Graph';
import CardM from '@material-ui/core/Card';
import { InfoCard } from './InfoCard';

export class News extends Component {
    constructor({}){
        super()
    }
    render(){
        return (            
            <div className="main-diff">
                <ActionBar title={'Novidades'} actions={[]}/>
                <div className="main-content">
                    <InfoCard/>
                    <CardM className="graph-card center-margin">
                        <Graph/>
                    </CardM>
                </div>
            </div>
        )
    }
}