let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let notification = new Schema({
	korisnikUn: String,
	tekst: String,
	datVrijeme: String
});

module.exports = mongoose.model("Notification", notification);
