import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import { ImportCsvResult } from '../../../@types/manageOffences/manageOffencesClientTypes'

export default class PartsAndOffencesRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)

    res.render('pages/schedules/partsAndOffences', {
      fullSchedule,
    })
  }

  GET_PART_CREATE = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)
    const newPartNumber =
      fullSchedule.scheduleParts.reduce((max, p) => (p.partNumber > max ? p.partNumber : max), 0) + 1

    res.render('pages/schedules/createSchedulePart', {
      fullSchedule,
      newPartNumber,
    })
  }

  POST_PART_CREATE = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const { newPartNumber } = req.body
    const { user } = req
    await this.offenceService.createSchedulePart(user, Number(scheduleId), newPartNumber)
    return res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }

  GET_PCSC_LISTS = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.query as Record<string, string>
    const pcscLists = await this.offenceService.getPcscLists(res.locals.user)

    res.render('pages/schedules/pcscLists', {
      pcscLists,
      scheduleId,
    })
  }

  GET_SDS_EXCLUSION_LISTS = async (req: Request, res: Response): Promise<void> => {
    const sdsExclusionLists = await this.offenceService.getSdsExclusionLists(res.locals.user)

    res.render('pages/schedules/sdsExclusionLists', {
      sdsExclusionLists,
    })
  }

  GET_PART_LINK_OFFENCES = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)

    res.render('pages/schedules/linkSchedulePartOffences', { fullSchedule })
  }

  POST_PART_LINK_OFFENCES = async (req: Request, res: Response): Promise<void> => {
    const files = req.files as Express.Multer.File[] | undefined
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'No files uploaded' })
    }

    const { scheduleId, schedulePartId } = req.params as Record<string, string>
    const scheduleIdNumber = Number(scheduleId)
    const schedulePartIdNumber = Number(schedulePartId)

    if (Number.isNaN(scheduleIdNumber) || Number.isNaN(schedulePartIdNumber)) {
      res.status(400).json({ error: "Invalid ID's" })
    }

    const file = files[0]

    const result: ImportCsvResult = await this.offenceService.linkSchedulePartOffences(
      req.user,
      scheduleIdNumber,
      schedulePartIdNumber,
      file,
    )

    if (result.success === false) {
      const errors = result.errors.join(',')
      return res.redirect(`/schedules/parts-and-offences/${scheduleId}?errors=${errors}`)
    }

    return res.redirect(
      `/schedules/parts-and-offences/${scheduleId}/part/${scheduleIdNumber}/link/confirmation?message=${result.message}`,
    )
  }

  POST_PART_CREATE_CONFIRMATION = async (req: Request, res: Response): Promise<void> => {
    const { message } = req.query as Record<string, string>
    res.render('pages/schedules/linkScheduleOffencesConfirmation', { message })
  }
}
