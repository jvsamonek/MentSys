import React, { Component } from 'react'
import { CardTitle } from './CardTitle';
import { MenuCode } from '../Main';

import CardM from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export class Card extends Component {

    constructor({id, main}){
        super()

        this.fecthData()
        this.state = {
            id,
            title: 'Title',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus neque purus, vitae sagittis mauris venenatis ac. Pellentesque ac nisl blandit, ullamcorper elit eget, consequat risus. Quisque auctor purus vel ante fringilla, eget sagittis risus aliquet. Aliquam sit amet tincidunt nunc. Maecenas rutrum gravida purus, eget placerat justo. Maecenas a efficitur odio. Aenean non tellus tristique risus lobortis fermentum vel eget tortor. Integer facilisis cursus lacus in finibus. Maecenas egestas risus at scelerisque tempor. Quisque a auctor augue. In hac habitasse platea dictumst. Proin nec lorem non est pretium condimentum in et velit. Aenean quis mauris ut sapien mattis congue. Nunc lectus sem, laoreet non purus in, vulputate mattis nulla. Donec rutrum fermentum erat sit amet vehicula. Maecenas sed orci tellus.',
            image: 'none',
            main
        }
    }
    async fecthData(){
        /*const request = await fetch('http://localhost:8080/card.json', {
            method: 'GET'
        })
        const data = await request.json()
        console.log(data)
        this.setState({...data})*/
    }
    render(){
        return (
            <CardM className="card left">
                <CardActionArea onClick={this.showTaskDetails}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.state.title}
                    </Typography>
                    <Typography component="p">
                        {this.state.content.slice(0, 420) + '...'}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </CardM>
        )
        
        /*return (
            <div className="card left" onClick={this.showTaskDetails}>
                <CardTitle title={this.state.title}/>
                <p>{this.state.content}</p>
            </div>
        )*/
    }
    showTaskDetails = () => {
        console.log(this)
        this.state.main.setContent(MenuCode.TASK_DETAILS)
    }
}