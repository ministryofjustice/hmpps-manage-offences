import { Request, Response } from 'express'

import LoadResultsRoutes from './loadResults'
import { MostRecentLoadResult } from '../../../@types/manageOffences/manageOffencesClientTypes'
import AdminService from '../../../services/adminService'

const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

describe('Route Handlers - LoadResults', () => {
  const handler = new LoadResultsRoutes(adminService)
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      query: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
      locals: {
        user: {
          username: 'user',
        },
      },
    } as unknown as Response
  })

  describe('GET', () => {
    it('LoadResults screen without any a loadResults param', async () => {
      req = {
        query: { offenceCode: 'ABC' },
      } as unknown as Request
      adminService.getMostRecentLoadResult = jest.fn()
      adminService.getMostRecentLoadResult.mockResolvedValue([{ alphaChar: 'A' } as unknown as MostRecentLoadResult])
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/loadResults/loadResults', { loadResults: [{ alphaChar: 'A' }] })
    })
  })
})
