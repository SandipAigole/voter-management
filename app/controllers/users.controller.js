const db = require("../models");
const handler = require("../handler");
const ErrorConstant = require('../helpers/error-keys')

// Create a new voter
exports.createNewUser = (req, res) => {
    const {
        body: {
            admin_id,
            voter_id,
            ward_number,
            phone_number,
            full_name,
            address,
            area,
            visited,
        }
    } = req;
    try {
        db.User.verifyVoterAlreadyExist(voter_id).then((present) => {
            console.log('present status', present)
            if (present) {
                handler.apiHandler.setSuccessResponse("Voter already present...", res)
            }
            else {
                db.User.createUser(req.body)
                    .then((result) => {
                        handler.apiHandler.setSuccessResponseWithData(result, 200, "Voter saved successfully...", res)
                    })
                    .catch(err => {
                        handler.apiHandler.setErrorResponse(err, ErrorConstant.FAILED_TO_CREATE_VOTER, res)
                    })
            }
        })
            .catch(err => {
                handler.apiHandler.setErrorResponse(err, ErrorConstant.FAILED_TO_CREATE_VOTER, res)
            })
    }
    catch (err) {
        handler.apiHandler.setErrorResponse(err, err || ErrorConstant.FAILED_TO_CREATE_VOTER, res)
    }
};

// search the voter using voter ID, ward number
exports.searchTheVoter = (req, res) => {
    const {
        query: {
            start,
            limit,
            voter_id,
            ward_number,
        }
    } = req

    let conditionObj = {};
    let startPoint = start ? parseInt(start) : 0;
    let endPoint = limit ? parseInt(limit) : 100;

    if (voter_id != "" && voter_id != undefined) {
        conditionObj.voter_id = voter_id ? voter_id : "";
    }

    if (ward_number != "" && ward_number != undefined) {
        conditionObj.ward_number = ward_number ? ward_number : "";
    }

    db.User.getUserList(conditionObj, startPoint, endPoint)
        .then(data => {
            handler.apiHandler.setSuccessResponse(data, res)
        })
        .catch(err => {
            handler.apiHandler.setErrorResponse(err, err || ErrorConstant.VOTER_ID_NOT_FOUND, res)
        })
};

exports.updateVoterDetails = (req, res) => {
    const {
        body: {
            voter_id,
            ward_number,
            visited,
            admin_id,
            phone_number,
            full_name,
            address,
            area,
        }
    } = req

    let userDetailsObject = {};
    if (voter_id != "" && voter_id != undefined) {
        userDetailsObject.voter_id = voter_id ? voter_id : "";
    }

    if (visited != "" && visited != undefined) {
        userDetailsObject.visited = visited ? visited : "";
    }

    if (ward_number != "" && ward_number != undefined) {
        userDetailsObject.ward_number = ward_number ? ward_number : "";
    }

    if (admin_id != "" && admin_id != undefined) {
        userDetailsObject.admin_id = admin_id ? admin_id : "";
    }

    if (phone_number != "" && phone_number != undefined) {
        userDetailsObject.phone_number = phone_number ? phone_number : "";
    }

    if (full_name != "" && phone_number != undefined) {
        userDetailsObject.full_name = full_name ? full_name : "";
    }

    if (address != "" && address != undefined) {
        userDetailsObject.address = address ? address : "";
    }

    if (area != "" && area != undefined) {
        userDetailsObject.area = area ? area : "";
    }

    db.User.updateVoterDetails(userDetailsObject, voter_id)
        .then(data => {
            if (data == 1) {
                handler.apiHandler.setSuccessResponse("Voter updated successfully..", res)
            } else if (data == 0) {
                handler.apiHandler.setSuccessResponse("Enter Valid voter Id or Please make changes before update", res)
            } else {
                handler.apiHandler.setErrorResponse("", ErrorConstant.FAILED_TO_UPDATE_VOTER_DETAILS, res)
            }
        }).catch(err => {
            handler.apiHandler.setErrorResponse(err, err || ErrorConstant.FAILED_TO_UPDATE_VOTER_DETAILS, res)
        })
}
