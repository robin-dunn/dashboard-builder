import * as express from 'express';
import * as path from "path";
import { DAL } from "./dal/dal";
import { Application } from 'express';

class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {

        // Init DB connection and model.
        DAL.init();

        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();

        this.app.set("views", path.join(__dirname, "/views"));
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use(controller.routeBase, controller.router);
        })
    }

    private assets() {
        this.app.use(express.static('public'))
        this.app.use(express.static(__dirname + '\views'))
    }

    private template() {
        this.app.set('view engine', 'pug')
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
