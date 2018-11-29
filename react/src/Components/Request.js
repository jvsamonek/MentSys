
export const Req = {
    async get(path, data){
        const getPath = path + '?json=' + JSON.stringify(data)
        const request = await fetch(getPath)
        return await request.json()
    },
    async post(path, data){
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
}