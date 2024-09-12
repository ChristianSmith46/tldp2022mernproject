import init_db from './utilities/initialize.js'
import express from 'express'
import accountRouter from './routes/account-routes.js'
import customerRouter from './routes/customer-routes.js'
import eventRouter from './routes/event-routes.js'
import registrationRouter from './routes/registration-routes.js'
import https from 'https';
import fs from 'fs';

init_db()

var app = express()
app.use(express.json())
app.use(express.static('../client_react/build'));

app.use('/api/accounts', accountRouter)
app.use('/api/customers', customerRouter)
app.use('/api/events', eventRouter)
app.use('/api/registrations', registrationRouter)
app.get('*', (req, res) => {
    res.sendFile(path.join('../client_react/build', 'index.html'));
})

// app.listen('8000');
const options={
    key:fs.readFileSync('./certs/key.pem'),
    cert:fs.readFileSync('./certs/cert.pem')
}
const sslServer=https.createServer(options,app);
sslServer.listen(443,()=>{
    console.log('Secure server is listening on port 8443')
})

console.log('server started') 