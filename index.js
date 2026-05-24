// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// MICROSERVICIO DE TIMESTAMP 
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date; 
  let date;

  // Si no envían parámetro, usamos la fecha actual
  if (!dateParam) {
    date = new Date();
  } else {
    //  Comprobamos si el parámetro contiene solo números (es Unix)
    const isUnix = /^\d+$/.test(dateParam);
    
    if (isUnix) {
      // Convertimos el string numérico a un entero base 10 antes de parsearlo
      date = new Date(parseInt(dateParam, 10));
    } else {
      // Es una cadena de fecha normal
      date = new Date(dateParam);
    }
  }

  // Validación: Comprobamos si el objeto Date es inválido (Ojo con la 'D' mayúscula)
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Si pasa la validación, respondemos con el JSON esperado
  res.json({
    unix: date.getTime(), 
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});