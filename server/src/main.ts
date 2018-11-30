import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

const mongoDB = 'mongodb://localhost:27017/myapp';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
})); 


import {User} from './models/User'
import {Projeto} from './models/Projeto'
import {Alerta} from './models/Alerta'
import {Tarefa} from './models/Tarefa'
import {Status} from './models/Status'

////---------------------------------log functions

        //POST REQUEST {loginStatus}
        //expected {success: true | false}
        //Fazer logoff
    app.post('/logoff', async (request, response) => {
        const loginStatus = request.body.loginStatus //loginStatus == {name: 'Guilherme', email: 'email@', senha: '123'}
            //pegar dados do mongo
            try{
            let usuario:any = await User.find({email: loginStatus.email}).exec()
            //processar
            if(usuario.length > 0 && usuario[0].logged){
                usuario[0].logged = false;
                await usuario[0].save()
                response.send({success: true})
            }else{
                throw new Error('Erro 1')
            }
            }catch(err){
            response.send({success: false})
            }          
        })
        
        //POST REQUEST {loginStatus}
        //expected {success: true | false, user: {name, email}}
        //Fazer login
    app.post('/login', async (request, response) => {
        const loginStatus = request.body.loginStatus
        //pegar dados do mongo
        try{
        let usuario:any = await User.find({email: loginStatus.email, password: loginStatus.password}).exec()
        //processar
        if(usuario.length > 0 && !usuario[0].logged){
            usuario[0].logged = true;
            await usuario[0].save()
            let Usuario = {name: loginStatus.name, email: loginStatus.email}
            response.send({success: true, Usuario})
        }else{
            throw new Error('Erro 1')
        }
        }catch(err){
        response.send({success: false})
        }          
    })

////---------------------------------Project functions

        //POST REQUEST {loginStatus, task: {_id}}
        //expected {success: true | false}
        //Deletar um Projeto
    app.post('/deletarProjeto', async (request, response)=> {
        
    const taskId = request.body.task._id 

    //pegar dados do mongo

    let task:any = await Projeto.find({_id : taskId}).exec()

    //processar
    if(task[0]){
        task[0].remove()
        
        response.send({success: true})
    }
    else
        response.send({success: false})

    })


            //GET REQUEST {loginStatus, task: {_id}}
            //expected {task: {_id, title, content, imagePath}}
            //Pegar informações de um Projeto especifica
    app.get('/especificoProjeto', async (request, response) => {
    const input = JSON.parse(request.query.json || '') 
    const taskRequest = input.task._id
    try{   
        let tasks:any = await Projeto.find({_id: taskRequest}).exec()
        if(tasks.length > 0){
            response.send({success: true, task: tasks[0]})
        }else{
            throw new Error('Erro 1')
        }
        
    }catch(err){
        response.send({success: false})
    }

    })

            ////GET REQUEST {loginStatus}
        //expected [{task: {_id, title, content}}, ...]
        //Pegar lista de todas as trefas liberadas pro usuario logado
    app.get('/todosProjetos', async (request, response) => {
    const allProjetos = await Projeto.find().exec()
    //processar
    if(allProjetos)
        response.send({success: true, allProjetos})
    else
        response.send({success: false})
    })

////---------------------------------User Functions

            //POST REQUEST {loginStatus, {name, lastName, email, phone}}
            //expected {success: true | false}
            //Salvar informações do usuario logado

    app.post('/salvarUsuario', async (request, response)=> {
    const frontEmail = request.body.loginStatus.email 
    try{
        let usuario:any = await User.find({email: frontEmail}).exec()
        if(usuario.length == 0)
            throw new Error('Não existe esse user')
        usuario[0].name = request.body.loginStatus.name
        usuario[0].lastName = request.body.loginStatus.lastName
        usuario[0].email = request.body.loginStatus.email
        usuario[0].phone = request.body.loginStatus.phone
        await usuario[0].save()
        response.send({success: true})
        }catch(err){
        console.log(err)
        response.send({success: false})
        }    

    })


            //GET REQUEST {loginStatus}
            //expected {name, lastName, email, phone}
            //Pegar informações do usuario logado
    app.get('/infoUsuario', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const loggedEmail = input.loginStatus.email    //task== {id: 321}

    //pegar dados do mongo    
    let loggedUser:any = await User.find({  email : loggedEmail }).exec()

    //processar
    if(loggedUser[0]){
        let name = loggedUser[0].name , lastName = loggedUser[0].lastName, email = loggedUser[0].email, phone = loggedUser[0].phone;
        let resp = {name, lastName, email, phone}
        console.log(resp)
        response.send({success: true, resp})
    }
    else
        response.send({success: false})

    })

            //GET REQUEST {}
            //expected {users: [{_id, name}, ...]}
            //- Lista de todos os usuários do sistema
    app.get('/todosUsuarios', async (request, response) => {
    const allUsers = await User.find().exec()
    //processar
    if(allUsers)
        response.send({success: true, allUsers})
    else
        response.send({success: false})

    })

                //GET REQUEST {loginStatus}
            //expected {alerts: [{reason, task: {_id, name}, status: {name},...]}
            //Lista com todos os alertas de um usuário logado
            //Um alerta é gerado a partir de tarefas que tem algum problema, por exemplo estão com prazo próximo do limite ou já passou do limite.
            //Da pra criar mais algumas condições pra gerar esses alertas
    app.get('/alertasUsuario', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const frontEmail = input.loginStatus.email
    const UserID = await User.find({email: frontEmail}).exec()
    const alertas = await Alerta.find({userId: UserID[0]._id}).exec()
    //processar
    try{    
        if(alertas.length == 0)
            throw new Error('Sem alertas')
        response.send({success: true, alertas})
    }catch(err){
        console.log(err)
        response.send({success: false})
    }

    })

//---------------------------------Task Functions
    app.get('/todasTarefas', async (request, response) => {
    const allTarefas = await Tarefa.find().exec()
    //processar
    if(allTarefas)
        response.send({success: true, allTarefas})
    else
        response.send({success: false})

        })
    

    app.post('/salvarTarefa', async (request, response)=> {
        const frontId = request.body.activity._id 
        try{
            let tarefas:any = await Tarefa.find({_id: frontId}).exec()
            if(tarefas.length == 0)
                throw new Error('Não existe essa tarefa')
            tarefas[0].statusId = request.body.activity.statusId
            tarefas[0].title = request.body.activity.title
            tarefas[0].startDate = request.body.activity.task.startDate
            tarefas[0].endDate = request.body.activity.task.endDate
            tarefas[0].imagePath = request.body.activity.task.imagePath
            await tarefas[0].save()
            response.send({success: true})
        }catch(err){
            console.log(err)
            response.send({success: false})
        }    
    })
            //POST REQUEST {loginStatus, activity: {_id, status: {_id}, task: {_id, startDate, endDate}, user: {_id}}}
        //expected {success: true | false}
        //Salvar informações de uma tarefa
    app.post('/criarTarefa', async (request, response)=> {
        console.log('aaaa')
        try{
            let tarefa:any = new Tarefa()
            tarefa.statusId = request.body.activity.statusId
            tarefa.title = request.body.activity.title
            let projetoPai:any = await Projeto.find({_id: request.body.activity.task._id}).exec()
            tarefa.projetoId = projetoPai[0]._id
            tarefa.startDate = projetoPai[0].startDate
            tarefa.endDate = projetoPai[0].endDate
            tarefa.userId = request.body.activity.user._id
            await tarefa.save()
            response.send({success: true})
        }catch(err){
            console.log(err)
            response.send({success: false})
        }    

    })


            //GET REQUEST {loginSatus, activity: {_id}}
        //expected {activity: {_id, status: {_id}, task: {_id, title, startDate, endDate}, user: {_id}}}
        //-Uma tarefa é a atribuição de um tarefa especifica a um usuário. Tem como atributos status que representa o estado atual
    app.get('/tarefaEspecifica', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const loginEmail = input.loginStatus.email  
    const taskRequest = input.activity._id
    try{   
        let usuario:any = await User.find({email: loginEmail}).exec() 
        let tasks:any = await Tarefa.find({_id: taskRequest, userId: usuario[0]._id}).exec()
        if(tasks.length > 0){
            let project = await Projeto.find({_id: tasks[0].projetoId})
            let status = await Status.find({_id: tasks[0].statusId})
            let activity = { _id: tasks[0]._id, status: status[0], task: project[0], user: {_id: usuario[0]._id}}
            response.send({success: true, activity})
        }else{
            throw new Error('Erro 1')
        }
        
    }catch(err){
        response.send({success: false})
    }

    })

                //GET REQUEST {loginStatus}
            //expected [{_id, status: {name}, task: {title}, user: {name}}]
            //Lista com todas as tarefas associadas ao usuário logado
    app.get('/tarefasUsuario', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const loginEmail = input.loginStatus.email  
    try{   
        let usuario:any = await User.find({email: loginEmail}).exec() 
        let tasks:any = await Tarefa.find({userId: usuario[0]._id}).exec()
        if(tasks.length > 0){
            response.send({success: true, tasks})
        }else{
            throw new Error('Erro 1')
        }
    }catch(err){
        response.send({success: false})
    }

    })

//--------------------------------------Geral Functions


        //GET REQUEST {}
        //expected {status: [{_id, name}, ...]}
        //- Lista de todos os status possíveis para uma tarefa
    app.get('/todosStatus', async (request, response) => {
    const allStatus = await Status.find().exec()
    //processar
    if(allStatus)
        response.send({success: true, allStatus})
    else
        response.send({success: false})

    })


    


        //GET REQUEST {loginStatus}
        //expected {bars: [{name, value}, ...]}
        //Informações das barras de novidades da tela inicial…
        //Pode ser número de tarefas, atividades, alertas
    app.get('/barras', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const loginEmail = input.loginStatus.email  
    try{   
        let usuario:any = await User.find({email: loginEmail}).exec() 
        let tasks:any = await Tarefa.find({userId: usuario[0]._id}).exec()
        let projects:any = await Projeto.find().exec()
        let alerts:any = await Alerta.find({userId: usuario[0]._id}).exec()
        let bars: { name: string, value: number }[] = [
            { "name": "Tarefas", "value":  tasks.length},
            { "name": "Projetos", "value":  projects.length},
            { "name": "Alertas", "value":  alerts.length}
        ];
        response.send({success: true, bars})
    }catch(err){
        response.send({success: false})
    }

    })


    app.listen(4242, ()=>{
    console.log('Rodando na port 4242')
    });