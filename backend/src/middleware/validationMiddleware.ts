import { Request, Response, NextFunction } from 'express'
import StatusCodes from 'http-status-codes'
import { z, ZodError } from 'zod'

const validateData = (
  schema: z.ZodObject<any, any> | z.ZodEffects<z.ZodObject<any, any>>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      console.log('parsed')
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          [issue.path.join('.')]: `${issue.message}`,
        }))
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid data', details: errorMessages })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' })
      }
    }
  }
}

export default validateData
