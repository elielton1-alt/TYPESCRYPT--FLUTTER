import express from "express"
import {Routes} from './routes/crmRoutes'
import mongoose from 'mongoose'


class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb+srv://elielton:elielton@cluster0.yh7vb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

    constructor(){
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup()
        
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}))
    }
    private mongoSetup(): void {
        mongoose.Promise= global.Promise;
        mongoose.connect(this.mongoUrl ,{
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
    }
}

export default new App().app;