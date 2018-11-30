

export const Req = {
    async get(path, data){
        try{            
            const getPath = path + '?json=' + JSON.stringify(data)
            const request = await fetch(getPath)
            return await request.json()
        }
        catch(error){
            return {success: false}
        }
    },
    async post(path, data){
        try{
            const request = await fetch(path,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                })
            return await request.json()
        }
        catch(error){
            return {success: false}
        }
    }
}