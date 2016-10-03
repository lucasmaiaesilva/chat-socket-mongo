var mongoose     = require('mongoose');

var Schema = mongoose.Schema;
var socketMsgSchema = new Schema({
	name: String,
	msg: String
});

module.exports = mongoose.model('mensagens', socketMsgSchema);
