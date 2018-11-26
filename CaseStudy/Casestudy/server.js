var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var note = require('./note');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
var router = express.Router();


app.use(cors());
app.use('/api', router);    
app.listen(port);
console.log('REST API is runnning at ' + port);

mongoose.connect('mongodb://localhost:27017/note');

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request will be done here');
    next(); // make sure we go to the next routes and don't stop here
});


// Creating a new record
router.route('/notes').post(function (req, res) {
    var n = new note(req);
    n.title = req.body.title;
    n.content = req.body.content;
    console.log(req.body);
    
    n.save(function (err) {
        if (err) { // Display error
            res.send(err);
        }
        res.send({ message: 'notes Created !' })
    })
});
 
router.route('/notes').get(function (req, res) {
    note.find(function (err, notes) {
        if (err) {// Display error
            res.send(err);
        }
        res.send(notes);
    });
});

router.route('/notes/:id').get(function (req, res) {


    notes.findById(req.params.id, function (err, note) {
        if (err) // Display error
            res.send(err);
        res.json(note);
    });
});

router.route('/notes/:id').put(function (req, res) {

    note.findById(req.params.id, function (err, note) {
        if (err) { // Display error
            res.send(err);
        }
        note.title = req.body.title;
        note.content = req.body.content;
        note.updateAt = Date();
        note.save(function (err) {
            if (err) // Display error
                res.send(err);

            res.json({ message: 'notes updated!'});
        });

    });
});

router.route('/notes/:id').delete(function (req, res) {

    note.remove({ _id: req.param.id }, function (err, note) {
        if (err) { // Display error
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

});