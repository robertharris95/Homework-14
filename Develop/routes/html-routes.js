const path = require('path')
module.exports = app => {
app.get("/", function(req, res) {
    res.json(path.join(__dirname, "index.html"));
  });
}