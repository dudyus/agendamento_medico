import { Consulta, PrismaClient, Status } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'
import { Tipo } from "@prisma/client"
import nodemailer from 'nodemailer'


const prisma = new PrismaClient()
const router = Router()

const consultaSchema = z.object({
  id_paciente: z.string(),
  id_profissional: z.number(),
  data: z.string(), 
  hora: z.string(),
  tipo: z.nativeEnum(Tipo).optional(),
  confirmada: z.boolean().optional(),
  admin_id: z.string()
})

async function enviaEmail(consulta: Consulta, nomePaciente: string, emailPaciente: string) {
  // só envia se a consulta NÃO estiver confirmada
  if (consulta.confirmada) return;

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_EMAIL,
      pass: process.env.MAILTRAP_SENHA,
    },
  });

  const info = await transporter.sendMail({
    from: 'agendamentoMedico@gmail.com', 
    to: emailPaciente, 
    subject: "Atualização sobre sua consulta", 
    text: `Sua consulta agendada para ${consulta.data.toLocaleDateString()} às ${consulta.hora.toLocaleTimeString()} foi cancelada.`,
    html: `<h3>Estimado Paciente: ${nomePaciente}</h3>
           <h3>Consulta Agendada: ${consulta.data.toLocaleDateString()} às ${consulta.hora.toLocaleTimeString()}</h3>
           <h3>Status: Cancelada</h3>
           <p>Lamentamos informar que sua consulta foi cancelada. Por favor, entre em contato para reagendar.</p>
           <p>Clinica de Agendamento Médico</p>`
  });

  console.log("Message sent: %s", info.messageId);
}

router.get("/", async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      include: {
        paciente: true,
        profissional: true,
        admin: true
      },
      orderBy: { id: 'desc' }
    })
    res.status(200).json(consultas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const valida = consultaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { id_paciente, id_profissional, data, hora, tipo, confirmada, admin_id } = valida.data

  try {
    const consulta = await prisma.consulta.create({
      data: {
        id_paciente, id_profissional, data, hora, tipo, confirmada, admin_id
      }
    })
    res.status(201).json(consulta)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id_paciente", async (req, res) => {
  const { id_paciente } = req.params
  try {
    const consultas = await prisma.consulta.findMany({
      where: { id_paciente },
      include: {
        profissional: true,
        admin: true
      },
      orderBy: { data: 'desc' }
    })
    res.status(200).json(consultas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { confirmada } = req.body; // recebe true/false para confirmar ou cancelar

  if (confirmada === undefined) {
    return res.status(400).json({ erro: "Informe se a consulta está confirmada ou não" });
  }

  try {
    const consultaAtualizada = await prisma.consulta.update({
      where: { id: Number(id) },
      data: { confirmada }
    });

    const dadosConsulta = await prisma.consulta.findUnique({
      where: { id: Number(id) },
      include: { paciente: true }
    });

    if (!confirmada && dadosConsulta) {
      await enviaEmail(
        dadosConsulta,
        dadosConsulta.paciente.nome,
        dadosConsulta.paciente.email
      );
    }

    res.status(200).json(consultaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: "Erro ao atualizar a consulta" });
  }
});

export default router