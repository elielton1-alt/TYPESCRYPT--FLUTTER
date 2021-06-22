import {Response, Request, request} from "express"
import {ContactController} from '../controllers/crmController'
import authMiddleware from "../middleware/authMiddleware";



export class Routes {
    public contactController: ContactController = new ContactController();

    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) =>{
            res.status(200).send({
                message: " Get request success"
            })
        })

        app.route('/contact')
          .post(this.contactController.addNewContact)
           
        
        app.route('/authenticate')
        .post(this.contactController.authentication)

        app.route('/home')
        .get(authMiddleware,this.contactController.home)

    }
}