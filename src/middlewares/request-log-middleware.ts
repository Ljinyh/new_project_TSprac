import { Request, Response, NextFunction } from 'express'

const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date())
    next()
}

export default requestMiddleware
