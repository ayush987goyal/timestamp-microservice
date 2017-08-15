var express = require('express');
var app = express();

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

app.use(express.static('public'));

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", (req, res) => {
    var gotDate = req.params.date;
    var myDate;
    var isNum = /^\d+$/.test(gotDate);
    if (isNum) {
        myDate = new Date(gotDate * 1000);
    } else {
        myDate = new Date(gotDate);
    }

    if (!Date.parse(myDate)) {
        var obj = {
            "unix": null,
            "natural": null
        }
    } else {
        var unixDate = myDate.getTime() / 1000;
        var naturalDate = monthNames[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear();

        var obj = {
            "unix": unixDate,
            "natural": naturalDate
        };
    }


    // res.send(myDate);
    res.send(obj);
})


var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});