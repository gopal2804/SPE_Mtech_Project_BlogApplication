// API_NOTIFICATIN_MESSAGES

export const API_NOTIFICATION_MESSAGES={
    loading: {
        title: "Loading...",
        message: "Data is being loaded, Please wait"
    },
    success: {
        title: 'Success',
        messgae: 'Data successfully loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server. Please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing data'
    },
    networkError: {
        title: 'Error',
        messgae: 'Unable to connect with the server, Please check internet connectivity and try again later'
    }
}

//API Service Calls

export const SERVICE_URLS={
    userSignup: {url:'/signup', method: 'POST'},
    userLogin: {url: '/login', method: 'POST'}
}