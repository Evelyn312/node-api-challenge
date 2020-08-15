const actions = require("../data/helpers/projectModel");

function checkActionsData(){

    return(req, res, next) => {
        if(!req.body.project_id || !req.body.description || !req.body.notes){
            return res.status(400).json({
                message: "Missing project id, description, or notes",
            })
        }
        console.log('check project before next');
        next();
    }
}
function validateActionId(){
    return(req, res, next) => {
        console.log("this got called")
        actions.findById(req.params.id)
            .then((action) => {
                if(action){
                    req.action= action;
                    next();
                } else {
                    res.status(404).json({
                        message: "Action not found"
                    })
                }
            })
            .catch(next)
    }
}

module.exports = {
   checkActionsData,
   validateActionId
}