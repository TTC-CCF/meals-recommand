require('dotenv').config()
const openai_key = process.env.OPENAI_KEY
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const url = "https://api.openai.com/v1/completions"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/apis/get_recommend',  (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:10')
    mt = req.body.mt
    cal = req.body.mt
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "model":"text-davinci-003",
          "max_tokens": 300,
          "prompt": "我想要吃"+String(mt)+"，熱量不能超過"+String(cal)+"，請列出一些菜名，格式: '菜名' '熱量'大卡。",
          "temperature":0.5
        }),
        headers:{
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ openai_key,
        }
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          var contents = String(data.choices['0'].text);
          contents = contents.replace(/\n/g, '<br>');
          contents = contents.replace(/'/g, '');
          res.send(contents)
      })
      .catch((error) => {
        console.error('Error:', error);
        return null
      });    

    // console.log(recommend)
    // res.send(recommend)
})

app.options('/apis/get_recommend', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:10')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

async function getRecommand(mt, cal){
    const url ="https://api.openai.com/v1/completions"

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "model":"text-davinci-003",
        "max_tokens": 300,
        "prompt": "我想要吃"+String(mt)+"，熱量不能超過"+String(cal)+"，請列出一些菜名，格式: '菜名' '熱量'大卡。",
        "temperature":0.5
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+ openai_key,
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var contents = String(data.choices['0'].text);
        contents = contents.replace(/\n/g, '<br>');
        contents = contents.replace(/'/g, '');
        return contents
    })
    .catch((error) => {
      console.error('Error:', error);
      return null
    });
    
  }