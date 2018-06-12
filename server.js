var express = require('express')
var app = express()
var bcrypt = require('bcrypt');
var path = require('path')
var bodyParser = require('body-parser')
const saltRounds = 10;
const myPlaintextPassword = 'nekenduku.1';
const someOtherPlaintextPassword = 'nekenduku.1';
var generatedHash = ""
app.set('views', path.resolve('./hashTest'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req,res,next) => {
  res.render('hashTest')
})

app.post('/generateHash', (req,res) => {
    console.log(req.body)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            generatedHash = hash
            console.log(hash)
        });
    });

    res.send(`password: ${req.body.password} hash: ${generatedHash}`)

})

app.post('/checkHash', (req,response) => {
 if(generatedHash){
     bcrypt.compare(req.body.password,generatedHash, (err,res) => {
                 if(!err){
                     console.log(res)
                    response.send(res)
            }
    })

 }
    

})
app.listen(process.env.PORT || 8080, (req,res) => {
    console.log('listening on 8080')
})
