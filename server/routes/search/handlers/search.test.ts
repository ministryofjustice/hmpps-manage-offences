import { Request, Response } from 'express'

import SearchRoutes from './search'
import OffenceService from '../../../services/offenceService'
import { Offence } from '../../../@types/manageOffences/manageOffencesClientTypes'
import AdminService from '../../../services/adminService'

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>
const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

describe('Route Handlers - Search', () => {
  const handler = new SearchRoutes(offenceService, adminService)
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
    it('Search screen without any search params', async () => {
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/search/search', { offences: undefined })
    })

    it('Search screen without any a search param', async () => {
      req = {
        query: { offenceCode: 'ABC' },
      } as unknown as Request
      offenceService.searchOffences = jest.fn()
      offenceService.searchOffences.mockResolvedValue([{ id: 1 } as unknown as Offence])
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/search/search', { offences: [{ id: 1 }], offenceCode: 'ABC' })
    })
  })
})
