var mongoose  = require('mongoose');
var Schema  = mongoose.Schema;
var NoteSchema = new Schema({
    updatedAt: { type: Date, default: Date.now }, 
    createdAt: { type: Date, default: Date.now }, 
    title: String,
    content: String,
});
module.exports = mongoose.model('note', NoteSchema);