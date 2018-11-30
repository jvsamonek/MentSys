
export function getLoginStatus(){
    try{
        return JSON.parse(localStorage.getItem('loginStatus')) || {}
    }
    catch(error){
        return {}
    }
}

export function setLoginStatus(data){
    try{
        localStorage.setItem('loginStatus', data || {})
    }
    catch(error){
    }
}