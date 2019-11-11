// ====================================================
// DEPENDENCIES
// ====================================================
const db = require("../models");
// ====================================================
// ROUTES
// ====================================================
module.exports = function(app) {
  app.get("/", function(req, res){
    db.Subjects.findAll({}).then(function(data) {
      var dataObj = {
        subject: data
      };
      res.render("index",dataObj);
    });
  });
  // ====================================================
  app.get("/:subjectKey", function(req, res) {
    db.Classes.findAll({
      where: {
        SubjectId: req.params.subjectKey
      }
    }).then(function(result){
      res.json(result);
    }).catch(function(err){
      res.json(400, err);
    });
  });
  // ====================================================
  app.put("/api/classes/:id", function(req, res) {
    console.log(req.body.inSchedule);
    db.Classes.update({
      inSchedule: req.body.inSchedule
    }, { 
      where: { id: req.params.id }
    }).then(function(result){
      res.json(result);
    }).catch(function(err){
      res.json(400, err);
    });
  });
  // ====================================================
  app.delete("/api/classes/:id", function(req, res) {
    db.Classes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result){
        res.json(result);
    }).catch(function(err){
      res.json(400, err);
    });
  });
  // ====================================================
};
// ====================================================