class Unsplash{
    constructor(){
        this.key='43ebdf2e671cfd1e376e3c98de738557e2c7c483b130d82327f711c982f9c4e5'
    }

    async getPics(){
        const respuesta= await fetch(`https://api.unsplash.com/photos/random/?count=30&client_id=${this.key}`);
        const datos= await respuesta.json();
        return datos
    }

    async getQuery(query){
        const respuesta=await fetch(`https://api.unsplash.com/photos/random/?count=30&query=${query}&client_id=${this.key}`)
        const datos= await respuesta.json();
        return datos
    }
}