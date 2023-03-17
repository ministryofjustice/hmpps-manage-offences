import { Request, Response } from 'express'
import AdminService from '../../../services/adminService'
import AdminRoutes from './admin'

const adminService = new AdminService(null, null) as jest.Mocked<AdminService>

describe('Route Handlers - Admin within Search', () => {
  const handler = new AdminRoutes(adminService)
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      query: {},
      body: { offenceId: 123, offenceCodeSearch: 'SEARCH' },
    } as unknown as Request
    res = {
      render: jest.fn(),
      locals: {
        user: {
          username: 'user',
        },
      },
      redirect: jest.fn(),
    } as unknown as Response
  })

  describe('POST', () => {
    it('Deactivate NOMIS offence call', async () => {
      adminService.deactivateOffence = jest.fn()
      adminService.deactivateOffence.mockResolvedValue(null)
      await handler.DEACTIVATE_NOMIS_OFFENCE(req, res)
      expect(adminService.deactivateOffence).toHaveBeenCalledWith(123, res.locals.user)
      expect(res.redirect).toHaveBeenCalledWith(`/search/offence/123/view?offenceCodeSearch=SEARCH`)
    })
  })
})
