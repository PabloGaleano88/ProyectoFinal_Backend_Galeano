import nodemailer from 'nodemailer'
import { recoverModel } from '../dao/MongoDB/models/recoverModel.js'
import sessionRepository from '../repositories/sessionRepository.js'

const SessionRepository = new sessionRepository

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    }
})

export const purchaseMail = async (userEmail, autoCode, amountTotal) => {
    try {
        await mailTransport.sendMail({
            from: `e-Commerce CoderHouse <${process.env.MAIL_ADDRESS}>`,
            to: userEmail,
            subject: 'e-Commecer Coder comprobante de compra',
            html:
                `
                <div style="max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">¡Gracias por tu compra!</h1>
                <h2 style="font-size: 20px; margin-bottom: 15px; color: #333;">A continuación verás los detalles de tu compra:</h2>
                <div>
                    <h3 style="font-size: 18px; margin-bottom: 8px; color: #333;">Código de compra: ${autoCode}</h3>
                    <h3 style="font-size: 18px; margin-bottom: 8px; color: #333;">Total de la compra: U$D ${amountTotal}</h3>
                    <h3 style="font-size: 18px; margin-bottom: 8px; color: #333;">Comprador: ${userEmail}</h3>
                </div>
            </div>
        `
        })
    }
    catch (error) {
        throw error
    }
}

export const resetPasswordMail = async (userEmail) => {
    try {
        const mail = userEmail.toLowerCase()
        const user = await SessionRepository.findUser(mail)
        const actualDate = new Date()
        const recover = await recoverModel.create({
            userId: user._id,
            expired_at: new Date(actualDate.getTime() + 60 * 60000)
        })
        await mailTransport.sendMail({
            from: `e-Commerce CoderHouse <${process.env.MAIL_ADDRESS}>`,
            to: userEmail,
            subject: 'Recuperar contraseña',
            html:
                ` <div style="max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">E-mail de recuperación de contraseña</h1>
                <h2 style="font-size: 20px; margin-bottom: 15px; color: #333;">Ingresa al siguiente Link para recuperar tu password: <a href="https://proyectofinalbackendgaleano-production.up.railway.app/changepassword/${recover._id}" style="color: #007BFF; text-decoration: none;">Resetear Password</a></h2>
                <div>
                    <h3 style="font-size: 18px; margin-bottom: 8px; color: #333;">Si no has solicitado recuperar tu contraseña, ignora este e-mail.</h3>
                </div>
            </div>
            `
        })
    }
    catch (error) {
        throw error
    }
}

export const deleteProductMail = async (userEmail, deleter, product) => {
    try {
        const actualDate = new Date()
        const productName = product.title
        await mailTransport.sendMail({
            from: `e-Commerce CoderHouse <${process.env.MAIL_ADDRESS}>`,
            to: userEmail,
            subject: 'Se ha eliminado un producto ',
            html:
                ` <div style="max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">Le informamos que se eliminó un producto que usted agregó</h1>
                <h2 style="font-size: 20px; margin-bottom: 15px; color: #333;">Producto eliminado: ${productName}</h2>
                <div>
                    <h3 style="font-size: 18px; margin-bottom: 8px; color: #333;">El producto ha sido eliminado por: ${deleter}</h3>
                </div>
                <p style="font-size: 14px; color: #555;">Fecha y hora de eliminación: ${actualDate}</p>
            </div>
            `
        })
    }
    catch (error) {
        throw error
    }
}

export const delInactiveUsersMail = async (userEmail, days, hours, mins) => {
    try {
        await mailTransport.sendMail({
            from: `e-Commerce CoderHouse <${process.env.MAIL_ADDRESS}>`,
            to: userEmail,
            subject: 'Se ha eliminado su usuario por inactividad ',
            html:
                `
                <div style="max-width: 600px; margin: 0 auto; font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">¡Aviso de Eliminación de Usuario!</h1>
                <p style="font-size: 16px; color: #333;">Estimado/a ${userEmail},</p>
                <p style="font-size: 16px; color: #333;">Lamentamos informarle que su cuenta ha sido eliminada debido a inactividad.</p>
                <p style="font-size: 16px; color: #333;">Su usuario estuvo inactivo por ${days} días, ${hours} horas y ${mins} minutos.</p>
                <p style="font-size: 16px; color: #333;">Si tiene alguna pregunta o desea reactivar su cuenta, por favor contáctenos.</p>
                <p style="font-size: 16px; color: #333;">Gracias por ser parte de nuestro e-Commerce.</p>
            </div>
            `
        })
    }
    catch (error) {
        throw error
    }
}