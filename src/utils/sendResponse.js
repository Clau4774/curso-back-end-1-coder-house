export const sendResponse = (response, res) => {

    const {status, payload, error, message} = response;

    if(status === 200 || status === 201) {

        if(message) {
            return res.status(status).json({
                status: 'success',
                message,
                payload
             })    
        }
        return res.status(status).json({
            status: 'success',
            payload
        })
    }

    if(status && status >= 400) {
        return res.status(status).json({
            status: 'error',
            error
        })
    }

    return res.status(500).json({
        status: 'error',
        error: {
            message: 'Respuesta inválida del servidor.'
        }
    })
}