let express = require("express");
let app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // for css

console.log(__dirname);
app.get("/", (req, res)=>{
  res.render("index");
}); 

app.listen(3000, process.env.PORT, ()=>{
  console.log("This server has started");
});
