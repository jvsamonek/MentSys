import React, { Component } from 'react'
import { MainTitle } from '../MainTitle';
import { ActionBar } from '../ActionBar';
import { MenuCode } from '../Main';

export class TaskDetails extends Component {
    constructor({main}){
        super()
        this.state = {
            main
        }
    }
    render(){
        return (
            <div className="main-diff">
                <MainTitle title={'Card N'}  back={() => this.backToMain()}/>
                <div className="main-content">

                    <div className="task-left">
                    
                        <div className="task-title">
                            Titulo                        
                        </div>
                        <div className="task-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus vulputate urna, ac pharetra ligula rhoncus at. Fusce viverra ultrices metus sed ultrices. Vivamus feugiat mauris arcu, ut tincidunt dolor varius nec. Duis faucibus dolor nisi. Cras vitae lacinia nibh. Maecenas et augue sed tellus lobortis sodales porttitor a tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec et libero efficitur ex pretium blandit eget sed nulla. Donec id felis in nibh rutrum tincidunt. Praesent tristique id ante in auctor. Proin tempus finibus neque tempor eleifend. Nulla dolor libero, convallis sed semper eu, egestas vitae sapien.

                        Nam porta magna sed nisi pellentesque ultricies. Interdum et malesuada fames ac ante ipsum primis in faucibus. In id erat purus. Integer sed mi risus. Sed vel eleifend leo. Sed ullamcorper erat sed dui pharetra dictum. Aliquam convallis a mauris condimentum facilisis. Cras id felis condimentum, laoreet erat id, imperdiet est. Vivamus eleifend eros mi, sed posuere nisi vehicula a. Vivamus et neque risus. Nulla condimentum leo et sagittis molestie.

                        Phasellus dictum dui ut risus tincidunt efficitur. Nulla arcu dui, congue faucibus ipsum eu, faucibus eleifend erat. Duis nec est magna. Fusce vitae maximus nulla. Nulla nec scelerisque tellus. Aliquam metus mi, hendrerit at elementum at, finibus eget justo. Ut pretium, justo et viverra maximus, lectus dolor tempor enim, sit amet tincidunt leo nunc ac nulla. Curabitur consectetur vestibulum diam a tincidunt. Vestibulum hendrerit consectetur nibh, nec convallis odio dignissim non. Praesent malesuada semper magna sed ultricies. Cras sed elit sit amet ex sagittis finibus. Curabitur at suscipit dui. Mauris quis pellentesque tellus, eget aliquet velit. Etiam ac tincidunt mauris. Phasellus sit amet ipsum a orci tempus efficitur non a metus. In sollicitudin viverra ante, nec pulvinar nisi molestie id.
                        </div>

                    </div>
                    <div className="task-right">
                        <img src="#" className="center-cropped"></img>
                    </div>
                    <ActionBar/>
                </div>
            </div>
        )
    }
    backToMain(){
        this.state.main.setContent(MenuCode.TASK_LIST)
    }
}