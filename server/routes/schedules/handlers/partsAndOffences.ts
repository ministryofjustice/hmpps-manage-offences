import { Request, Response } from 'express'
import path from 'path'
import OffenceService from '../../../services/offenceService'
import { ImportCsvResult } from '../../../@types/manageOffences/manageOffencesClientTypes'

export default class PartsAndOffencesRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  isCSV = (file: Express.Multer.File): boolean => {
    const ext = path.extname(file.originalname).toLowerCase()
    const mime = file.mimetype
    return ext === '.csv' && mime === 'text/csv'
  }

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

  GET_SDS_EXCLUSION_LISTS = async (_req: Request, res: Response): Promise<void> => {
    const sdsExclusionLists = await this.offenceService.getSdsExclusionLists(res.locals.user)

    res.render('pages/schedules/sdsExclusionLists', {
      sdsExclusionLists,
    })
  }

  GET_PART_LINK_OFFENCES_CSV = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params

    const scheduleIdNumber = Number(scheduleId)
    const file = await this.offenceService.getScheduleLinkOffencesCsv(req.user, scheduleIdNumber)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="schedule_offences.csv"')
    res.send(file.toString('utf-8'))
  }

  GET_PART_LINK_OFFENCES = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const { errors } = req.query
    let parsedErrors: { text: string; href: string }[] = []
    if (typeof errors === 'string') {
      parsedErrors = errors.split(',').map(e => ({ text: e, href: '#' }))
    }
    const fullSchedule = await this.offenceService.getScheduleById(Number(scheduleId), res.locals.user)

    res.render('pages/schedules/linkSchedulePartOffences', { fullSchedule, errors: parsedErrors })
  }

  POST_PART_LINK_OFFENCES = async (req: Request, res: Response): Promise<void> => {
    const files = req.files as Express.Multer.File[] | undefined
    const { scheduleId, schedulePartId } = req.params

    if (!files || files.length === 0) {
      return res.redirect(
        `/schedules/parts-and-offences/${scheduleId}/part/${schedulePartId}/link?errors=${encodeURIComponent('No files uploaded')}`,
      )
    }

    const scheduleIdNumber = Number(scheduleId)
    const schedulePartIdNumber = Number(schedulePartId)

    if (Number.isNaN(scheduleIdNumber) || Number.isNaN(schedulePartIdNumber)) {
      return res.redirect(
        `/schedules/parts-and-offences/${scheduleId}/part/${schedulePartId}/link?errors=${encodeURIComponent('No files uploaded')}`,
      )
    }

    const file = files[0]

    if (!this.isCSV(file)) {
      return res.redirect(
        `/schedules/parts-and-offences/${scheduleId}/part/${schedulePartId}/link?errors=${encodeURIComponent('File must be valid CSV')}`,
      )
    }

    const result: ImportCsvResult = await this.offenceService.linkSchedulePartOffences(
      req.user,
      scheduleIdNumber,
      schedulePartIdNumber,
      file,
    )

    if (result.success === false) {
      const errors = result.errors.join(',')
      return res.redirect(`/schedules/parts-and-offences/${scheduleId}/part/${scheduleIdNumber}/link?errors=${errors}`)
    }

    return res.redirect(
      `/schedules/parts-and-offences/${scheduleId}/part/${scheduleIdNumber}/link/confirmation?message=${result.message}`,
    )
  }

  POST_PART_CREATE_CONFIRMATION = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params
    const { message } = req.query as Record<string, string>
    res.render('pages/schedules/linkScheduleOffencesConfirmation', { message, scheduleId })
  }
}
