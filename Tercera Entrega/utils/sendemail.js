import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})


export default async function sendMail(subject, body) {
  const opts ={
    from: 'Servidor Node',
    to: EMAIL_USER,
    subject,
    html: body,
  }
  
  try {
    const result = await transporter.sendMail(opts)
    console.log('result', result)
  } catch (error) {
    console.error('error', error)
  }
}