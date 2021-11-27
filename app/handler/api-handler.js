const ErrorCode = require(`../helpers/error-codes`);
const ErrorConstant = require(`../helpers/error-messages`);
module.exports = {
    setErrorResponse: (serverError, error, res) => {
        if (serverError) {
            console.error(serverError)
        } else {
            console.error(ErrorConstant[error]);
        }

        let httpCode = ErrorCode["BAD_REQUEST"];
        if (error === "INVALID_TOKEN" || error === "NO_TOKEN") {
            httpCode = ErrorCode["UNAUTHORIZED"];
        } else if (error === "INSUFFICIENT_PERMISSIONS") {
            httpCode = ErrorCode["FORBIDDEN"];
        }
        const response = {
            status: -1,
            data: {
                code: 0,
                message: -1
            },
            error: ErrorConstant[error],
        };
        return res.status(httpCode).send(response);
    },

    setSuccessResponse: (data, res) => {
        const response = {
            status: 200,
            data: data,
            error: null
        };
        return res.status(ErrorCode["HTTP_SUCCESS"]).send(response);
    },


    setSuccessResponseWithData: (data, status, msg, res) => {
        const response = {
            status: 200,
            data: { data: data, status: status, msg: msg },
            error: null
        };
        return res.status(ErrorCode["HTTP_SUCCESS"]).send(response);
    },

    setErrorResponseAsIs: (serverError, error, res) => {
        if (serverError === "") {
            console.error(ErrorConstant[error]);
        } else {
            console.error(serverError);
        }
        const response = {
            isError: true,
            error: {
                code: ErrorCode["HTTP_FAILED"],
                message: error
            }
        };
        return res.status(ErrorCode["HTTP_FAILED"]).send(response);
    },

    setValidationErrorResponse: (req, res, message) => {
        res.status(ErrorCode[`HTTP_SUCCESS`]).send({
            success: {
                status: 0,
                data: ""
            },
            error: {
                code: ErrorCode[`VALIDATION_ERROR`],
                message: message
            }
        });
    },
    
    setSuccessResponseWithNoStatus: (data, res) => {
        const response = data;
        return res.status(ErrorCode["HTTP_SUCCESS"]).send(response);
    },
    
    setErrorResponseWithNoStatus: (error, res) => {
        const response = error;
        return res.status(ErrorCode["HTTP_SUCCESS"]).send(response);
    },

};
