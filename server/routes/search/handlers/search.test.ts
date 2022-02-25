import { Request, Response } from 'express'

import SearchRoutes from './search'
import OffenceService from '../../../services/offenceService'

const offenceService = new OffenceService() as jest.Mocked<OffenceService>

describe('Route Handlers - Search', () => {
  const handler = new SearchRoutes(offenceService)
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      query: {},
    } as unknown as Request
    res = {
      render: jest.fn(),
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
      offenceService.getOffencesByCode = jest.fn()
      offenceService.getOffencesByCode.mockResolvedValue([{ id: 1 }])
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/search/search', { offences: [{ id: 1 }] })
    })
  })
})
