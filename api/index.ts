import express from 'express'
import cors from 'cors'
import routesFuncoes from './routes/funcoes'
import routesProfissionais from './routes/profissionais'
import routesPacientes from './routes/pacientes'
import routesLogin from './routes/login'
import routesConsultas from './routes/consultas'
import routesAdminLogin from './routes/adminLogin'
import routesAdmins from './routes/admins'
import routesDashboard from './routes/dashboard'
import dotenv from 'dotenv'


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use("/funcoes", routesFuncoes)
app.use("/profissionais", routesProfissionais)
app.use("/pacientes", routesPacientes)
app.use("/pacientes/login", routesLogin)
app.use("/consultas", routesConsultas)
app.use("/admins/login", routesAdminLogin)
app.use("/admins", routesAdmins)
app.use("/dashboard", routesDashboard)

app.get('/', (req, res) => {
  res.send('API: Agendamento Médico')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})