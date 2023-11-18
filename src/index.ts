import express = require("express")
const app = express()
const port = 3001
const a = 'Hello asdasdasdasds!'

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешает доступ всем доменам
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/get', (req: any, res: any) => {
    res.send(a)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})