let express = require("express");
let app = express();
let request = require('request');

app.set("view engine", "ejs"); // for ejs files
app.use(express.static(__dirname + "/public")); // to read css

app.get("/index", (req, res)=>{
  res.render("index");
}); 

app.get("/images", (req, res)=>{

  let requestSettings = {
    url: 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
    method: 'GET',
    encoding: null
  }

  request(requestSettings, (err, response, body)=>{
    if (!err && response.statusCode == 200){
      res.set('Content-Type', 'image/png');
      let score = JSON.parse(body);
      // res.send(score["events"][0]["competitions"][0]["competitors"][0]["score"]); // score

      res.render("scores", {score: score});

    } else {
      console.log("ERR")
    }
  });
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
  });
});

app.get("/teams", (req, res)=>{

  request('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams', (err, response, body)=>{
    if (!err && response.statusCode == 200){
      let team = JSON.parse(body)

      res.render("teams", {team: team})
    }
  });

  // request(url, (err, response, body)=>{
  //   if (!err && response.statusCode == 200){
  //     let team = JSON.parse(body)

  //     // res.render("teams_test", {team: team})
  //     res.send(team);
  //   }
  // });



});

app.listen(3000, process.env.PORT, ()=>{
  console.log("This server has started");
});



// Add a database in order to keep track of the games during the week
// only allow 7 days 