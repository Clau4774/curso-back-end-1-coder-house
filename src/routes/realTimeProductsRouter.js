import { Router } from "express";

export const realTimeProductsRoute = Router();

realTimeProductsRoute.get('/', (req, res) => {
    const user = {
        firstName: 'Dante',
        lastName: "D'Angiolo"
    }
    res.render('index', user);
})

