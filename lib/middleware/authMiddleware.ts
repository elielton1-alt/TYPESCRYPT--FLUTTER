import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export default function authMiddleware (
  req: Request, res: Response , next: NextFunction
){
    const {authorization} = req.headers;
    const partToken = authorization.split(' ');

    if(authorization) {
         console.log('1')

         if( partToken.length === 2){
       
          console.log(2)

              if( authorization.split(' ')[0] === 'Bearer'){

                const token = authorization.replace('Bearer', '').trim()
              try{
                  const data = jwt.verify(token, 'secret')
                  console.log(data)

                  next()
                  
              } catch(err){
                  return res.sendStatus(4011)
              }
         }
      }
  
    } else {
      res.status(401).send({message: " token error"})

    }
    
    //   const data = jwt.verify(token, 'secret', (err,decoded) =>{
    //       if(err) return res.sendStatus(401).send({ error: 'Token invalid'})
          
    //       return next()
  //})
  

}