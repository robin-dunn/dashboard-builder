import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase.interface'

class HomeController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
    }

    index = (req: Request, res: Response) => {

        const widgets = [
            {
                id: 1,
                name: 'Widget1'
            },
            {
                id: 2,
                name: 'Widget2'
            },
            {
                id: 3,
                name: 'Widget3'
            }
        ]

        res.render('home/index', { widgets })
    }
}

export default HomeController
