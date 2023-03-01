// this file will conatin the front-end api
// npm i axios 
// using axios for api call
import axios from 'axios';

import { API_NOTIFICATION_MESSAGES , SERVICE_URLS } from '../constants/config.js';

//back-end url
const API_URL='http://localhost:8010';

const axiosInstance = axios.create({

    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }

})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here
        return processResponse(response);
    },
    function (error){
        //stop loader here
        return Promise.reject(processError(error));
    }
)

//checking for the response coming from the backend
const processResponse=(response)=>{
    if(response?.status===200){
        return { isSuccess: true, data: response.data }
    }else{
        return { isFailure: true , status: response?.status, msg: response?.msg, code: response?.code }
    }
}

const processError=(error)=>{
    if(error.response){
        //Request is successfull but server responded with the status other than 200
        //that falls out of the range of 2.x.x
        console.log('ERROR IN RESPONSE: ',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){    
        //request is successfull but no response recieved(network issue, connectivity issue)
        console.log('ERROR IN REQUEST: ',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }else{
        //Something happened in front-end(front-end error)
        console.log('ERROR IN NETWORK: ',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API={};

for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url : value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded * 100) / progressEvent.total) 
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded * 100) / progressEvent.total) 
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}

export { API };