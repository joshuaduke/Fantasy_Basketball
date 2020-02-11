let express = require("express");
let app = express();
let request = require('request');

request('https://balldontlie.io/api/v1/players/237', (err, res, body)=>{
  if (!err && res.statusCode == 200){
    console.log(body);
  } else {
    console.log("ERR")
  }
})

// request('https://www.google.com', (err, res, body)=>{
//   if (!err && res.statusCode == 200){
//     console.log(body);
//   } else {
//     console.log("ERR")
//   }
// })

app.set("view engine", "ejs"); // for ejs files
app.use(express.static(__dirname + "/public")); // for css

app.get("/", (req, res)=>{
  res.render("index");
}); 

app.listen(3000, process.env.PORT, ()=>{
  console.log("This server has started");
});
