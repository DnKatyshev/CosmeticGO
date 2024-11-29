// import nodemailer from 'nodemailer'


// export const activateUserByMail = async (email:string, username:string, activateCode:string) => {

//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true, 
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASSWORD,
//         },
//     })

//     await transporter.sendMail({
//         from: process.env.SMTP_USER,
//         to: email,
//         subject: 'Активация аккаунта CosmeticGO',
//         text: '',
//         html:
//                 `
//                     <h1>
//                         ${activateCode}
//                     </h1>
//                 `
//     })
// }