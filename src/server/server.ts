import App from './app'
import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'
import HomeController from './controllers/home.controller'
import DashboardController from './controllers/dashboard.controller'
import LayerController from './controllers/layer.controller'

const app = new App({
    port: 5000,
    controllers: [
        new HomeController(),
        new DashboardController(),
        new LayerController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()

