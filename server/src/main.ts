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
    try{
        const loginStatus = request.body.loginStatus //loginStatus == {name: 'Guilherme', email: 'email@', senha: '123'}
        let usuario:any = await User.find({_id: loginStatus._id}).exec()
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
            const user = {name: usuario[0].name, email: usuario[0].email, _id: usuario[0]._id}
            response.send({success: true, user})
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
    try{
        const projectId = request.body.project._id
        const _id = mongoose.Types.ObjectId(projectId)
        let task:any = await Projeto.find({_id}).exec()
        if(!task[0])
            throw new Error('Projeto não encontrado')
        task[0].remove()        
        response.send({success: true})
    }
    catch(error){
        console.log(error)
        response.send({success: false})
    }
})

//POST REQUEST {loginStatus}
//expected {succes: true | false, project: {_id, title, description, startDate, endDate, imagePath}}
app.post('/salvarProjeto', async (request, response)=> {
    try{
        const projectId = request.body.project._id
        let project: any
        if(projectId){
            const _id = mongoose.Types.ObjectId(projectId)
            project = (await Projeto.find(_id).exec())[0]
            if(!project)
                throw new Error('Projeto não encontrado.')
            Object.assign(project, request.body.project)
        }
        else
            project = new Projeto(request.body.project)
        await project.save()
        response.send({success: true, project})
    }
    catch(error){
        console.log(error)
        response.send({success: false})
    }
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

            //POST REQUEST {loginStatus, usuarioFront: {name, lastName, email, phone}}
            //expected {success: true | false}
            //Salvar informações do usuario logado

app.post('/salvarUsuario', async (request, response)=> {
    const frontId = request.body.loginStatus._id 
    try{
        let usuario:any = await User.find({_id: frontId}).exec()
        if(usuario.length == 0)
            throw new Error('Não existe esse user')
        usuario[0].name = request.body.usuarioFront.name
        usuario[0].lastName = request.body.usuarioFront.lastName
        usuario[0].email = request.body.usuarioFront.email
        usuario[0].phone = request.body.usuarioFront.phone
        await usuario[0].save()
        response.send({success: true})
        }catch(err){
            response.send({success: false})
        }    

    })


            //GET REQUEST {loginStatus}
            //expected {name, lastName, email, phone}
            //Pegar informações do usuario logado
    app.get('/infoUsuario', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const loggedId = input.loginStatus._id    //task== {id: 321}

    //pegar dados do mongo    
    let loggedUser:any = await User.find({  _id : loggedId }).exec()

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
    //processar
    try{    
        const input = JSON.parse(request.query.json || '')
        const frontId = input.loginStatus._id
        const UserID = await User.find({_id: frontId}).exec()
        const alertas = await Alerta.find({user: UserID[0]._id}).populate('project').populate('status').populate('user').exec()
        if(alertas.length == 0)
            throw new Error('Sem alertas')
        response.send({success: true, alertas})
    }catch(err){
        console.log(err)
        response.send({success: false})
    }
    })

    app.post('/deletarUsuario', async (request, response)=> {
    const userId = request.body.user._id 
    //pegar dados do mong
    let users:any = await User.find({_id : userId}).exec()
    //processar
    if(users[0]){
        users[0].remove()
        response.send({success: true})
    }
    else
        response.send({success: false})
    })

    

//---------------------------------Task Functions
    app.get('/todasTarefas', async (request, response) => {
    const allTarefas = await Tarefa.find().populate('user').populate('project').populate('status').exec()
    //processar
    if(allTarefas)
        response.send({success: true, allTarefas})
    else
        response.send({success: false})

        })

    app.post('/deletarTarefa', async (request, response)=> {
    const taskId = request.body.task._id 
    //pegar dados do mong
    let task:any = await Tarefa.find({_id : taskId}).exec()
    //processar
    if(task[0]){
        task[0].remove()
        response.send({success: true})
    }
    else
        response.send({success: false})
    })
    

    app.post('/salvarTarefa', async (request, response)=> {
        try{
            const frontId = request.body.task._id 
            const tarefa: any = (await Tarefa.find({_id: frontId}).exec())[0]
            if(!tarefa)
                throw new Error('Não existe essa tarefa')
            const newTask = request.body.task
            Object.assign(tarefa, request.body.task)
            if(newTask.status._id)
                tarefa.status = await Status.findById(mongoose.Types.ObjectId(newTask.status._id)).exec()
            if(newTask.project._id)
                tarefa.project = await Projeto.findById(mongoose.Types.ObjectId(newTask.project._id)).exec()
            if(newTask.user._id)
                tarefa.user = await User.findById(mongoose.Types.ObjectId(newTask.user._id)).exec()
            await tarefa.save()            
            response.send({success: true, task: tarefa.populate('project')})
        }catch(err){
            console.log(err)
            response.send({success: false})
        }    
    })
            //POST REQUEST {loginStatus, activity: {_id, status: {_id}, task: {_id, startDate, endDate}, user: {_id}}}
        //expected {success: true | false}
        //Salvar informações de uma tarefa
    app.post('/criarTarefa', async (request, response)=> {
        try{
            let tarefaFront = request.body.activity
            let tarefa:any = new Tarefa({status: tarefaFront.status, title: tarefaFront.title, projeto: tarefaFront.task._id, user: tarefaFront.user })
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
    try{
        const input = JSON.parse(request.query.json || '')
        const taskId = mongoose.Types.ObjectId(input.task._id)
        const task = await Tarefa.findById(taskId)
            .populate('status')
            .populate('project')
            .populate('user')
            .exec()
        response.send({success: true, task})
    }
    catch(error){
        response.send({success: false})
    }
})

                //GET REQUEST {loginStatus}
            //expected [{_id, status: {name}, task: {title}, user: {name}}]
            //Lista com todas as tarefas associadas ao usuário logado
    app.get('/tarefasUsuario', async (request, response) => {
    const input = JSON.parse(request.query.json || '')
    const loggedId = input.loginStatus._id  
    try{   
        let usuario:any = await User.find({_id: loggedId}).exec() 
        let tasks:any = await Tarefa.find({user: usuario[0]._id}).populate('status').populate('projeto').populate('user').exec()
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
    const loggedId = input.loginStatus._id  
    try{   
        let usuario:any = await User.find({_id: loggedId}).exec() 
        let tasks:any = await Tarefa.find({user: usuario[0]._id}).exec()
        let projects:any = await Projeto.find().exec()
        let alerts:any = await Alerta.find({user: usuario[0]._id}).exec()
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

    !async function main(){
        console.log(await Tarefa.find())
        console.log(await User.find())
        console.log(await Status.find())
    }()