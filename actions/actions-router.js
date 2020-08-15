const express = require("express");
const actions = require("../data/helpers/actionModel");
const {validateProjectId } = require("../middleware/projects");
const { checkActionsData,validateActionId } = require("../middleware/actions")

const router = express.Router();

router.get("/projects/:id/actions", validateProjectId (),  (req, res) => {
    
    actions.get()

        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
});

router.post("/projects/:id/actions",checkActionsData(),validateProjectId (),(req, res,next) => {

    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            next(error)
        })
});
router.put("/projects/:project_id/actions/:id", checkActionsData(),validateActionId(),(req, res, next) => {
    actions.update(req.params.id, req.body)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch(next)
});

router.delete("/projects/:project_id/actions/:id",validateActionId(),(req, res, next) => {
    actions.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The action has been deleted",
                })
            } else {
                res.status(404).json({
                    message: "Action not found",
                })
            }
        })
        .catch(next)
    })
module.exports = router;