import bcrypt from 'bcryptjs'

import User from '../models/crmModel'

import {Request, Response} from 'express'

import jwt from 'jsonwebtoken'


function generationToken(params = {}) {
    return jwt.sign(params, 'secret', {expiresIn: '1d'})
}


export class ContactController {

    public async addNewContact (req: Request, res: Response) {
         const {name, email,password} = req.body

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        

        const userFields = {
            name,
            email,
            password:hashed
        }

        const newContact = await User.findOne({email})

        if(newContact)
          return res.status(400).send({ error: 'User aready exists'})
          

        const user = await User.create(userFields)

        user.password = undefined;
        user.save()

        return res.json(
            {user,
            token: generationToken({id: user.id})
        })
    }

    public async authentication(req:Request, res: Response){
       
        const {email,password} = req.body

        const newContact = await User.findOne({email})


        if(!newContact){
            return res.status(400).send({ error: 'User not found'})
        }

        const comparePass = await bcrypt.compare(password, newContact.password)

        if(!comparePass){
            return res.status(401).send({message: "Password diferent"})
        }

        newContact.password = undefined;
       
 
      return res.json({
          newContact,
          token : generationToken({id:  newContact.id})
      })

    }

    public home(req: Request, res: Response) {
           res.send('ok')
        }

}