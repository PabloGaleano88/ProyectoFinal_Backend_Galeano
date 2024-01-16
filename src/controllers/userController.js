import multer from "multer"
import { recoverModel } from "../dao/MongoDB/models/recoverModel.js"
import SessionRepository from "../repositories/sessionRepository.js"
import CartManager from "../dao/MongoDB/CartManager.js"
import { resetPasswordMail } from "../services/mailService.js"
import bcrypt from 'bcrypt'

import { usersDTO } from "../dao/usersDTO.js"

const sessionRepository = new SessionRepository()
const cartManager = new CartManager()

export const loginPassport = async (req, res) => {

    req.user.email === "admincoder@coder.com" ? req.session.admin = true : req.session.admin = false
    req.session.first_name = req.user.first_name
    req.session.last_name = req.user.last_name
    req.session.email = req.user.email
    req.session.age = req.user.age
    req.session.cartId = req.user.cartId._id
    req.session.role = req.user.role
    req.session.isLogged = true

    const user = await sessionRepository.findUser(req.session.email)
    user.last_connection = new Date()
    await user.save()

    res.status(200).redirect('/products')
}

export const registerPassport = async (req, res) => {
    res.status(200).redirect('/login')

}

export const logout = async (req, res) => {
    const user = await sessionRepository.findUser(req.session.email)
    user.last_connection = new Date()
    await user.save()
    req.session.destroy()
    res.redirect('/login')
}

export const githubLogin = async (req, res) => {
    req.user.email === "admincoder@coder.com" ? req.session.admin = true : req.session.admin = false
    req.session.first_name = req.user.first_name
    req.session.last_name = req.user.last_name
    req.session.email = req.user.email
    req.session.age = req.user.age
    req.session.cart = req.user.cartId
    req.session.cartId = req.user.cartId._id
    req.session.isLogged = true

    res.redirect('/products')
}

export const passResetReq = async (req, res) => {
    try {
        const { email } = req.body
        resetPasswordMail(email)
    }
    catch (error) {
        throw error
    }

}

export const passReset = async (req, res) => {
    try {
        const recoverId = req.params.rid
        const { password } = req.body
        const recover = await recoverModel.findOne({ _id: recoverId })
        const user = await sessionRepository.findUserById(recover.userId)
        if (bcrypt.compareSync(password, user.password)) {
            res.redirect('/changepasserror')

        }
        if (recover.expired_at.getTime() <= actualDate.getTime()) {
            res.redirect('/changepasserror')
        }

        await sessionRepository.updatePassword(recover.userId, password)
        res.redirect('/login')
    }
    catch (error) {
        throw error
    }
}

//el cambio de rol se hace con thunderclient
export const changeRole = async (req, res) => {
    const uid = req.params.uid
    try {
        const user = await sessionRepository.findUserById(uid)

        let userDocStatus = 0
        // esto es para revisar que por lo menos subió los 3 archivos
        user.documents.map((document) => {
            if (document.name === 'idDoc' || document.name === 'addressDoc' || document.name === 'accountStatus') {
                userDocStatus += 1
            }
        })
        if (user.role === 'user' && userDocStatus === 3) {
            user.role = "premium"
            await user.save()
            res.status(200).send(user.role)
        }
        else if (user.role === 'premium') {
            user.role = "user"
            await user.save()
            res.status(200).send(user.role)
        }
        else if (user.role === 'admin') {
            res.status(405).send("No se puede cambiar el rol de un admin")
            }
        else {
            res.status(403).send(`El usuario no ha terminado de procesar su documentación. Rol actual del usuario:${user.role}`)
        }
    }
    catch (error) {
        res.status(400).send(error)
        throw error

    }
}

export const uploadDocuments = async (req, res) => {
    const uid = req.params.uid

    try {
        const { idDoc, addressDoc, accountStatus, profilePic } = req.files;
        const user = await sessionRepository.findUserById(uid)

        const updateDocumentInfo = (fieldName, file) => {
            const matchingDocument = user.documents.find(doc => doc.name === fieldName)
            const path = fieldName === 'profilePic' ? 'profileImages' : 'documents'
            if (file?.[0]?.fieldname === fieldName) {
                const documentInfo = {
                    name: fieldName,
                    reference: `/static/${path}/${file[0].originalname}`
                };
                return documentInfo;
            }
            else if (matchingDocument) {
                return matchingDocument
            }
            return null;
        };

        const idDocInfo = updateDocumentInfo('idDoc', idDoc);
        const addressDocInfo = updateDocumentInfo('addressDoc', addressDoc);
        const accountStatusInfo = updateDocumentInfo('accountStatus', accountStatus);
        const profileInfo = updateDocumentInfo('profilePic', profilePic);


        user.documents = [idDocInfo, addressDocInfo, accountStatusInfo, profileInfo].filter(doc => doc !== null);

        await user.save();

        res.status(200).send('files updated');
    }
    catch (error) {
        if (error instanceof multer.MulterError) {
            console.log(error)
            res.status(400).send('error al subir el archivo', error)
        }
        res.status(400).send(error)
        console.log(error)
        throw error
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await sessionRepository.getUsers()
        const usersData = users.map(user => usersDTO(user))
        res.status(200).send(usersData)
    }
    catch (error) {
        throw (error)
    }
}

export const deleteUser = async (req,res)=>{
    const uid = req.params.uid
    try{
    const user = await sessionRepository.findUserById(uid)
    if(user.role === "admin"){
        res.status(403).send("No es posible eliminar administradores")    
    }
    else{
        const response = await sessionRepository.deleteUser(uid)
        const cart = await cartManager.removeCart(user.cartId)
        res.status(200).send(response)
        }
    }
    catch(error){
        throw error
    }

}

export const delInactiveUsers = async (req, res) => {
    try {
        const currentDate = new Date()
        const users = await sessionRepository.getUsers()
        users.map(user => {
            const diff = currentDate - user.last_connection
            const days = diff / (1000 * 60 * 60 * 24)
            const entireDays = Math.floor(days)
            const hours = (days % 1) * 24
            const entireHours = Math.floor(hours)
            const mins = Math.floor((hours % 1) * 60)
            if (days => 2) {
                console.log(`El usuario: ${user.email} ha estado inactivo por: ${entireDays} días ${entireHours} horas ${mins} minutos, `)
            }
        })
        res.status(200).send("usuarios borrados")
    }
    catch (error) {
        throw error
    }
}