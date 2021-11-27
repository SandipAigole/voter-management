const { authJwt } = require("../middleware");
const { userValidator } = require("../validators")
const controller = require("../controllers/users.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post(
    "/api/create_voter",
    [authJwt.verifyToken, userValidator.createVoter],
    controller.createNewUser
  );
  
  app.get(
    "/api/get_voters",
    [authJwt.verifyToken],
    controller.searchTheVoter
  );

  app.patch(
    "/api/update_voter_details",
    [authJwt.verifyToken, userValidator.updateVoterDetails],
    controller.updateVoterDetails
  );
};
