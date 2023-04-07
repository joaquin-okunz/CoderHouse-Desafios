import { Router } from "express";
import modeloDeProducto from "../../mongo/modelos/productModel.js";
import CommunsUtil from "../../utils/commun.js"

const PRouter = Router()

PRouter.get('/todos', async (req, res) => {
    const Productos = await modeloDeProducto.find();
    res.render("Productos", { payload: Productos });
})

PRouter.get('/categoria/:cate', async (req, res) => {
    try {
        const { cate } = req.params;
        const result = await modeloDeProducto.find({ categoria: cate });
        res.render("Productos", { payload: result })
    }
    catch {
        res.status(500).send("Server error");
    }
})

PRouter.get('/', async (req, res) => {
        const {query: {limit= 5, page= 1, sort}} = req
        const options = {
            limit,
            page
        }
        if (sort){
            options.sort = {precio : sort}
        }
        const result = await modeloDeProducto.paginate({},options)
        res.render("Productos", CommunsUtil.buidResponse({...result, sort}))

})

export default PRouter;