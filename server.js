const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const cors = require('cors')
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
    "Access-Control-Allow-Origin": "*"
}))



let files = fs.readdirSync("./jsonData", "utf-8");
let data = []
files.forEach(file => {
    let temp = fs.readFileSync("./jsonData/" + file, 'utf-8')
    temp = JSON.parse(temp, 2, null)
    let name = Object.getOwnPropertyNames(temp)
    temp[name].Description = temp[name].Description.replace(/[\t\r\n]/g, '');
    data.push(temp);
})


app.get('/', (req, res) => {
    console.log("got a request")
    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  