const express = require('express')
const app = express()
const port = 10


app.use(express.static('views'))

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/views/index.html')
})

app.listen(port, () =>{
    console.log(`Server is runing on http://localhost:${port}`)
})