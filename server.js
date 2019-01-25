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
app.get('/test', function(req, res) {
    res.render()
	// connection.query('SELECT q.id AS question_id, q.question, a.id as answer_id, a.answer, a.is_correct FROM questions q LEFT JOIN answers a ON q.id = a.question_id',function (error, results, fields) {
    //   if (error) throw error;
    //   var question_ids = [];
    //   var data_changed = {};
      
    //   for (var i=0; i<results.length; i++){
    //       if (!question_ids.includes(results[i].question_id)){
              
    //           question_ids.push(results[i].question_id);
      
    //           data_changed[results[i].question_id] = {
    //               question : results[i].question,
    //               answers: [{
    //                   answer_id: results[i].answer_id,
    //                   answer: results[i].answer,
    //                   is_correct: results[i].is_correct
    //                 }]
    //           }
    //       }else {
    //         data_changed[results[i].question_id].answers.push({
    //             answer_id: results[i].answer_id,
    //             answer: results[i].answer,
    //             is_correct: results[i].is_correct
    //           })
    //       }
    //   }
    //   res.json(data_changed);
	  
	//   res.render('pages/form', {
	//   	data: data_changed
	//   });
	// });

	
});

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
    
    // 2. calculate their score 
    // 3. make a highscore table 
    // 4. put their score into the high scores table
    // 5. send the user to a highscores page where they can see how they did
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

app.get('/submit', function(req, res) {
	connection.query('SELECT nam as "name", SUM(is_correct) as score FROM `user_answers` GROUP BY nam;',function (error, results, fields) {
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
      res.render('pages/submit', {
        data: data_changed
    });
    });
})

// app.get('/', function (req, res) {
//     connection.query('SELECT * FROM questions',function (error, results, fields) {
//         if (error) throw error;
        
//         res.render('pages/index', {
//             data: results
//         });
// });

// app.post('/submit', function (req, res) {
//     connection.query("INSERT INTO user (name) VALUES ('?')", [req.body.user], function(error, results, fields) {
//         if (error) throw error;
//     })
//     res.redirect('/quiz');
// })

// app.get('/quiz', function(req, res) {
// 	connection.query('SELECT * FROM questions',function (error, results, fields) {
// 	  if (error) throw error;
	  
// 	  res.render('pages/quiz', {
// 	  	data: results
// 	  });
// 	});

	
// });

// app.get('/TEST', function (req, res) {
//     connection.query('SELECT * FROM answers', function (error, results, fields) {
//         if (error) throw error;

//         res.render('pages/quiz', {
//             data: results
//         });
//     });
// });

// app.get('/', function (req, res){
//     connection.query('SELECT * FROM answers', function(error, results, fields) {
//         if (error) throw error;

//         res.render('pages/quiz', {
//             data: results
//         });
//     });
// });


//for css stylesheet
app.use(express.static(__dirname + '/public'));

app.listen(3004, function () {
    console.log('listening on yo 3004')
});