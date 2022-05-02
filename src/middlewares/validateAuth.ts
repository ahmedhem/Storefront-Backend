import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const handleUnauthorizedError = (next: NextFunction) => {
  next('Error unvalid authentication')
}
const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]

      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        if (decode) {
          next()
        } else {
          // Failed to authenticate user.
          handleUnauthorizedError(next)
        }
      } else {
        // token type not bearer
        handleUnauthorizedError(next)
      }
    } else {
      // No Token Provided.
      handleUnauthorizedError(next)
    }
  } catch (err) {
    handleUnauthorizedError(next)
  }
}

export default validateTokenMiddleware
