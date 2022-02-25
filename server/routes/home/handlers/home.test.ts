import { Request, Response } from 'express'

import HomeRoutes from './home'

describe('Route Handlers - Home', () => {
  const handler = new HomeRoutes()
  let req: Request
  let res: Response

  beforeEach(() => {
    res = {
      render: jest.fn(),
    } as unknown as Response
  })

  describe('GET', () => {
    it('For case admin', async () => {
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/index')
    })
  })
})
