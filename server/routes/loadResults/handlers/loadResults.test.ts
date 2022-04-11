import { Request, Response } from 'express'

import LoadResultsRoutes from './loadResults'
import OffenceService from '../../../services/offenceService'
import { MostRecentLoadResult } from '../../../@types/manageOffences/manageOffencesClientTypes'

const offenceService = new OffenceService(null) as jest.Mocked<OffenceService>

describe('Route Handlers - LoadResults', () => {
  const handler = new LoadResultsRoutes(offenceService)
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
      offenceService.getMostRecentLoadResult = jest.fn()
      offenceService.getMostRecentLoadResult.mockResolvedValue([{ alphaChar: 'A' } as unknown as MostRecentLoadResult])
      await handler.GET(req, res)
      expect(res.render).toHaveBeenCalledWith('pages/loadResults/loadResults', { loadResults: [{ alphaChar: 'A' }] })
    })
  })
})
