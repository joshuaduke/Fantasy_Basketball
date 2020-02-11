let express = require("express");
let app = express();
let request = require('request');

// request('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/28', (err, res, body)=>{
//   if (!err && res.statusCode == 200){
//     let parsedData = JSON.parse(body)
//     console.log(parsedData);
//   } else {
//     console.log("ERR")
//   }
// })

app.set("view engine", "ejs"); // for ejs files
app.use(express.static(__dirname + "/public")); // for css

app.get("/", (req, res)=>{
  res.send("This is the homepage");
  // res.render("");
}); 

app.get("/scores", (req, res)=>{
  request('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', (err, response, body)=>{
    if (!err && response.statusCode == 200){

      let score = JSON.parse(body);
      // res.send(score["events"][0]["competitions"][0]["competitors"][0]["score"]); // score
      res.render("scores", {score: score});

    } else {
      console.log("ERR")
    }
  })
})

app.listen(3000, process.env.PORT, ()=>{
  console.log("This server has started");
});
