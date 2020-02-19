const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.listen(port)

app.use(express.json())
app.use(express.static('public'))

let counter = 0

app.get('/points', (req, res) => {
  res.json({ nextVictory: (10 - counter % 10) })
})

app.post('/points', (req, res) => {
  counter++
  let num = 0
  if (counter % 500 === 0) {
    num = 250
  } else if (counter % 100 === 0) {
    num = 40
  } else if (counter % 10 === 0) {
    num = 5
  }
  res.json({ extraPoints: num, nextVictory: (10 - counter % 10) })
})