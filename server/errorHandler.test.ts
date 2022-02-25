import type { Request, Response } from 'express'

import { HTTPError } from 'superagent'
import createErrorHandler from './errorHandler'

describe('Error Handler', () => {
  let req: Request
  let res: Response
  let error: HTTPError

  beforeEach(() => {
    req = {} as Request

    res = {
      redirect: jest.fn(),
      render: jest.fn(),
      status: jest.fn(),
      locals: {
        user: {
          username: 'user',
        },
      },
    } as unknown as Response
  })

  it('should log user out if error is 401', () => {
    const handler = createErrorHandler(false)

    error = {
      status: 401,
    } as HTTPError

    handler(error, req, res, jest.fn)

    expect(res.redirect).toHaveBeenCalledWith('/sign-out')
  })

  it('should log user out if error is 403', () => {
    const handler = createErrorHandler(false)

    error = {
      status: 403,
    } as HTTPError

    handler(error, req, res, jest.fn)

    expect(res.redirect).toHaveBeenCalledWith('/sign-out')
  })
})
