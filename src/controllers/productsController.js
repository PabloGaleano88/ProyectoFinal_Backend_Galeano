import ProductManager from "../dao/MongoDB/ProductManager.js";
import { productAddErrorInfo } from "../services/errors/info.js";
import CustomError from "../services/errors/customError.js";
import EErrors from "../services/errors/enums.js";
import { logger } from "../utils/logger.js";
import { deleteProductMail } from "../services/mailService.js";

const productManager = new ProductManager()

export const getProducts = async (req, res) => {
    try {
        if (req) {
            const { limit, page, sort, query } = req.query
            const product = await productManager.getAll(query, limit, page, sort)
            res.send(product)
        }
        /* esto es para el realtimeproducts ya que usa JS y no utiliza req*/
        else {
            const limit = "100"
            const page = undefined
            const query = undefined
            const sort = undefined
            const product = await productManager.getAll(query, limit, page, sort)
            return product
        }
    }
    catch (error) {
        logger.error(error)
        res.status(500).send("Error al obtener productos")
    }
}

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, code, category, stock } = req.body
        if (!req.file || !title || !description || !price || !code || !category || !stock) {
            CustomError.createError({
                name: "Add Product Error",
                cause: productAddErrorInfo(title, price, code, category, stock),
                message: "Error while tried to add a new product",
                code: EErrors.INVALID_DATA_ERROR
            })
        }
        const owner = req.user ? (req.user.email ? (req.user.email  === "admincoder@coder.com" ? "admin" : req.user.email ):"admin" ):"admin"
        const thumbnail = req.file.originalname
        const product = await productManager.create(title, description, price, code, category, stock, thumbnail, owner)
        const { payload: products } = await getProducts()
        req.context.socketServer.emit('actualizar_realtimeproducts', products)
        res.status(200).send(product)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.pid
        const productById = await productManager.findById(id)
        res.status(200).send(productById)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.pid
        const updateFields = req.body
        const productUpdated = await productManager.updateProduct(id, updateFields)
        res.status(200).send(productUpdated)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.pid
    const productById = await productManager.findById(id)
    try {
    if (req.session.role === "admin" || req.session.email === productById.owner){
        await productManager.delete(id)
        if(productById.owner !== "admin"){
            deleteProductMail(productById.owner,req.session.role,productById)
        }
        const { payload: products } = await getProducts()
        req.context.socketServer.emit('actualizar_realtimeproducts', products)
        res.status(200).send(products)
    }
    else{
        res.status(403).send("No puede eliminar los productos")
    }
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error)

        }
}


