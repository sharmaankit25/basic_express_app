const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// app.use((req,res,next)=>{
// 	res.render('maintainence.hbs');
// 	// next();
// });
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n',(err)=>{
		if(err){
			console.log("Unable to append to server.log");
		}
	});
	next();
});



hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()+'*';
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	// res.send('<h1>Hello Express</h1>');
	res.render('home.hbs',{
		pageTitle:"Home Page",
		welcomeMessage:"Welcome to some website"
	});
});

app.get('/about',(req,res)=>{

	res.render('about.hbs',{
		pageTitle:"About Page"
	});
});

// bad -= send data with error

app.get('/error',(req,res)=>{
	res.send({
		statusCode:404,
		errorMessage:'Page not found'
	})
});
app.listen(3000,()=>{
	console.log("Server is up on port 3000");
});