import express from 'express'
import cors from 'cors'

import routesFuncoes from './routes/funcoes'
import routesProfissionais from './routes/profissionais'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/funcoes", routesFuncoes)
app.use("/profissionais", routesProfissionais)

app.get('/', (req, res) => {
  res.send('API: Agendamento Médico')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})