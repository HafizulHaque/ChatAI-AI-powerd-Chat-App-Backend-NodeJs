const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { getGptFeedback } = require('./openai-chat')
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: 'https://chatai-qfmt.onrender.com'
}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

//controllers
app.post('/api/chat', (req, res) => {

  const chats = req.body.data;

  //error for not providing reqest data
  if(!chats){
    res.json({
      errMsg: 'No data found in request body'
    })
  }

  //success
  getGptFeedback(chats)
    .then(answer => {
      res.json(answer)
    })
    .catch(err => {
      res.json({
        errMsg: 'can\'t process request'
      })
    })
})

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'resource not found'
  })
})

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})