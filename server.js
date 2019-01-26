var express = require('express');
var app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "quiz_db",

    insecureAuth : true
});



app.set('view engine', 'ejs');

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/submit', function(req, res) {

    connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 1, req.body["1"].split(',')[0], req.body["1"].split(',')[1]], function(error, results, fields) {
        if (error) throw error;

        connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 2, req.body["2"].split(',')[0], req.body["2"].split(',')[1]], function(error, results, fields) {
            if (error) throw error;

            connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 3, req.body["3"].split(',')[0], req.body["3"].split(',')[1]], function(error, results, fields) {
                if (error) throw error;

                connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 4, req.body["4"].split(',')[0], req.body["4"].split(',')[1]], function(error, results, fields) {
                    if (error) throw error;

                    connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 5, req.body["5"].split(',')[0], req.body["5"].split(',')[1]], function(error, results, fields) {
                        if (error) throw error;

                        connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 6, req.body["6"].split(',')[0], req.body["6"].split(',')[1]], function(error, results, fields) {
                            if (error) throw error;

                            connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 7, req.body["7"].split(',')[0], req.body["7"].split(',')[1]], function(error, results, fields) {
                                if (error) throw error;

                                connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 8, req.body["8"].split(',')[0], req.body["8"].split(',')[1]], function(error, results, fields) {
                                    if (error) throw error;

                                    connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 9, req.body["9"].split(',')[0], req.body["9"].split(',')[1]], function(error, results, fields) {
                                        if (error) throw error;

                                        connection.query("INSERT INTO user_answers (nam, question_id, answer_id, is_correct) VALUES (?, ?, ?, ?)", [req.body.nam, 10, req.body["10"].split(',')[0], req.body["10"].split(',')[1]], function(error, results, fields) {
                                            if (error) throw error;

                                            res.render('pages/results')

                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
})


app.get('/', function(req, res) {
	connection.query('SELECT q.id AS question_id, q.question, a.id as answer_id, a.answer, a.is_correct FROM questions q LEFT JOIN answers a ON q.id = a.question_id',function (error, results, fields) {
      if (error) throw error;
      var question_ids = [];
      var data_changed = {};
      
      for (var i=0; i<results.length; i++){
          if (!question_ids.includes(results[i].question_id)){
              
              question_ids.push(results[i].question_id);
      
              data_changed[results[i].question_id] = {
                  question : results[i].question,
                  answers: [{
                      answer_id: results[i].answer_id,
                      answer: results[i].answer,
                      is_correct: results[i].is_correct
                    }]
              }
          }else {
            data_changed[results[i].question_id].answers.push({
                answer_id: results[i].answer_id,
                answer: results[i].answer,
                is_correct: results[i].is_correct
              })
          }
      }



    //   res.json(data_changed);
	  
	  res.render('pages/form', {
	  	data: data_changed
	  });
	});

	
});




app.get('/scores', function(req, res) {
    //Select all customers and return the result object:
    connection.query("SELECT nam as 'name', SUM(is_correct) as score FROM `user_answers` GROUP BY nam ORDER BY score DESC;", function (err, result, fields) {
      if (err) throw err;
      for (var i=0; i<result.length; i++){
        console.log(result[i].name);
        console.log(result[i].score);
        console.log(result[i].user_id);
        console.log(result[i]);
      }
        res.render('pages/scores', {
            data: result
        });
    });

});

//for css stylesheet
app.use(express.static(__dirname + '/public'));

app.listen(3004, function () {
    console.log('listening on yo 3004')
});