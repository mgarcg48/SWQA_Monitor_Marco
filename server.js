var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
const corsOptions = {
	origin: 'http://localhost:4200',
	opcionsSuccessStatus:200
}

app.use(cors(corsOptions))

const db = require('./config/db.config.js');

db.sequelize.sync({force: false}).then(() => {
	console.log("Empieza la conexion");
	//initial();
	//proyectos();
	consultar();
});
require('./route/consultas.route.js')(app);
require('./route/tareas.route.js')(app);
require('./route/configuracion.route.js')(app);

require('./route/proyectos.route.js')(app);

var server = app.listen(5000, function () {
	let host = server.address().address
	let port = server.address().port

	console.log("La app esta escuchando en http://%s%s", host , port);
})

function consultar(){
	/*var fs = require('fs');
	var content;
	fs.readFile('./src/assets/cucumber.json', 'utf8', function read(err,data){
		if (err) {throw err;}
		content = data,
		proccessFile();
		//console.log(data);
	});

	function proccessFile(){
		//console.log(content);
	}*/
	var fs = require('fs');
	var text1 = fs.readFileSync('./src/assets/iVictrix/cucumber_2019-04-04.json', 'utf8');
	var text2 = fs.readFileSync('./src/assets/iVictrix/cucumber_2019-04-05.json', 'utf8');
	var text3 = fs.readFileSync('./src/assets/iVictrix/cucumber_2019-04-08.json', 'utf8');
	var text4 = fs.readFileSync('./src/assets/iVictrix/cucumber_2019-04-09.json', 'utf8');

	console.log(text3);
	const con = [{
		url: "Neptuno5",
		artefacto: JSON.parse(text1),
		identificador: "1000",
		fecha: "2019-04-04"
	},
	{
		url: "Neptuno6",
		artefacto: JSON.parse(text2),
		identificador: "1000",
		fecha: "2019-04-05"
	},
	{
		url: "Neptuno7",
		artefacto: JSON.parse(text3)																																																																		,
		identificador: "1000",
		fecha: "2019-04-08"
	},
	{
		url: "Neptuno8",
		artefacto: JSON.parse(text4),
		identificador: "1000",
		fecha: "2019-04-09"
	}]
	const consu = db.consultas;
	for (let i = 0; i < con.length; i++){
		consu.create(con[i]);
	}	
}

function fileread(filename){
	var contents= fs.readFileSyng(filename);
	return contents;
}

function proyectos(){
	let pro = [{
		nombre: "Neptuno",
		identificador: "1000"
	}]

	const proy = db.proyectos;
	for (let i = 0; i < pro.length; i++){
		proy.create(pro[i]);
	}
}

function initial(){
	let tareas = [
	{
		nombre: "Tarea test",
		identificador: "111",
		resultado: "failed",
		usuario: "marco",
		fecha: "01-27-2019",
		url: "jenkins/api/...",
		duracion: "1234"
	}, 
	{
		nombre: "Tarea test 1",
		identificador: "112",
		resultado: "skipped",
		usuario: "marco",
		fecha: "01-28-2019",
		url: "jenkins/.../.../...",
		duracion: "5435"
	},
	{
		nombre: "Tarea login",
		identificador: "111",
		resultado: "passed",
		usuario: "marco",
		fecha: "01-31-2019",
		url: "jenkins/api/...",
		duracion: "7894621"
	}, 
	{
		nombre: "Tarea interface",
		identificador: "111",
		resultado: "passed",
		usuario: "marco",
		fecha: "02-01-2019",
		url: "jenkins/.../.../...",
		duracion: "41534"
	}
	]

	const Tareas = db.tareas;
	for (let i = 0; i < tareas.length; i++){
		Tareas.create(tareas[i]);
	}
}
