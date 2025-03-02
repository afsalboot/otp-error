import axios from "axios"


const Urls = "http://localhost:3000"

// const tokenValue = JSON.parse(JSON.parse(localStorage.getItem('persist:UserData')).userInfo) && JSON.parse(JSON.parse(localStorage.getItem('persist:UserData')).userInfo).token

const localstorage = localStorage.getItem('persist:UserData')

let tokenValue = null;

if(localstorage ) {
    try{
        const tokenOn = JSON.parse(localstorage)

        if(tokenOn.userInfo){
            const a = JSON.parse(tokenOn.userInfo)

            if(a.token){
                tokenValue = a.token
            }
        }
    }catch(err){

    }
}

console.log("TokenValue",tokenValue);


export const publicRequest = axios.create({
    baseURL: Urls,
})

export const tokenRequest = axios.create({
    baseURL: Urls,
    headers:{token:tokenValue}
})