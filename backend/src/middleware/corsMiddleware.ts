import { NextFunction, Request, Response } from 'express'

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Credentials', 'true')
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.set(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  next()
}

export default corsMiddleware
