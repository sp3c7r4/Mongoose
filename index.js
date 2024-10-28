import express from 'express'


const app = express()

app.get('/', (request, response) => {
  response.send("Server working...")
})

app.listen(3000, () => {
  console.log("Server started on port 3000...")
})