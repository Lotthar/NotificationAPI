let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let ObjectID = require("mongodb").ObjectID;
let db = mongoose.connect("mongodb://127.0.0.1:27017/hikecampshop", {
	useNewUrlParser: true
}); //povezan sa bazom koja se pravvi ako nije napravljena

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let Notification = require("./model/notification");

// NOTIFIKACIJE ZA KORISNIKA SERVISI
// Umece novu notifikaciju korisnika
app.post("/notification/add", (request, response) => {
	let korisnikUn = request.body.korisnikUn;
	let tekst = request.body.tekst;
	let datVrijeme = request.body.datVrijeme;
	let notification = new Notification();
	notification.korisnikUn = korisnikUn;
	notification.tekst = tekst;
	notification.datVrijeme = datVrijeme;
	notification.save((error, savedNotification) => {
		if (error) {
			response.status(500).send({ error: "Neuspjesno umetanje notifikacije" });
		} else {
			response.send(savedNotification);
		}
	});
});
// Brise sve notifikacije korisnika
app.delete("/notification/deleteAll", (request, response) => {
	let korisnikUn = request.body.korisnikUn;
	let query = {
		korisnikUn: korisnikUn
	};
	Notification.deleteMany(query, (error, removedNotification) => {
		if (error) {
			response.status(500).send({ error: "Neuspjesno brisanje notifikacije" });
		} else {
			response.send(removedNotification);
		}
	});
});
// Brise notifikaciju sa odredjenim Id-em
app.delete("/notification/deleteSingle", (request, response) => {
	let id = new ObjectID(request.body.id);
	Notification.deleteOne({ _id: id }, (error, deletedInfo) => {
		if (error) {
			response.status(500).send({ error: "Notifikacija nije izbrisana!" });
		} else {
			response.send(deletedInfo);
		}
	});
});
// Vraca sve notifikacije korisnika
app.post("/notification", (request, response) => {
	let korisnikUn = request.body.korisnikUn;
	Notification.find({ korisnikUn: korisnikUn }, (error, notifications) => {
		if (error) {
			response
				.status(500)
				.send({ error: "Nema notifikacija za ovog korisnika" });
		} else {
			response.send(notifications);
		}
	});
});
// aktira se server za ovaj API
app.listen(3005, () => {
	console.log("HikeCampShopAPI radi na portu 3005...");
});
