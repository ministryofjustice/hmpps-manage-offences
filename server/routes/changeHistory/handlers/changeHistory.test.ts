import { Request, Response } from 'express'

import ChangeHistoryRoutes from './changeHistory'
import AdminService from '../../../services/adminService'
import { NomisHistoryRecords } from '../../../@types/manageOffences/manageOffencesClientTypes'

const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

function getStartOfMonth() {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

describe('Route Handlers - Change History', () => {
  const handler = new ChangeHistoryRoutes(adminService)
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
    it('Nomis history screen without any search params', async () => {
      adminService.getNomisChangeHistory = jest.fn()
      adminService.getNomisChangeHistory.mockResolvedValue({
        newOffences: [{ id: 1 }],
      } as unknown as NomisHistoryRecords)

      await handler.GET_NOMIS(req, res)

      expect(res.render).toHaveBeenCalledWith('pages/changeHistory/nomis', {
        newOffences: [{ id: 1 }],
        updatedOffences: undefined,
        fromDate: getStartOfMonth(),
        toDate: expect.any(Date),
      })
    })

    it('Nomis history screen with search params', async () => {
      req = {
        query: { fromDate: { day: 1, month: 10, year: 2022 } },
      } as unknown as Request
      adminService.getNomisChangeHistory = jest.fn()
      adminService.getNomisChangeHistory.mockResolvedValue({
        newOffences: [{ id: 1 }],
      } as unknown as NomisHistoryRecords)

      await handler.GET_NOMIS(req, res)

      expect(res.render).toHaveBeenCalledWith('pages/changeHistory/nomis', {
        newOffences: [{ id: 1 }],
        updatedOffences: undefined,
        fromDate: new Date(2022, 9, 1),
        toDate: expect.any(Date),
      })
    })
  })
})
