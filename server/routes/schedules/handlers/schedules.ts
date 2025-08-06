import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'

export default class ScheduleRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const allSchedules = await this.offenceService.getAllSchedules(res.locals.user)
    const schedules = allSchedules
      .map(s => ({ ...s, fullName: `Schedule ${s.code} (${s.act})` }))
      .sort((a, b) => a.code.localeCompare(b.code))
    const { scheduleId } = req.query as Record<string, string>
    if (!scheduleId) {
      return res.render('pages/schedules/schedules', { schedules })
    }

    return res.redirect(`/schedules/parts-and-offences/${scheduleId}`)
  }

  GET_CREATE = async (req: Request, res: Response): Promise<void> => {
    const { errors } = req.query
    let parsedErrors: string[] = []
    if (typeof errors === 'string') {
      parsedErrors = errors.split(',')
    }
    return res.render('pages/schedules/createSchedule', { errors: parsedErrors })
  }

  POST_CREATE = async (req: Request, res: Response): Promise<void> => {
    const { scheduleAct, scheduleCode, scheduleParts, scheduleUrl } = req.body
    const missingAct = !scheduleAct?.trim()
    const missingCode = !scheduleCode?.trim()
    const missingParts = !scheduleParts || Number.isNaN(Number(scheduleParts))
    const allSchedules = await this.offenceService.getAllSchedules(res.locals.user)
    const existingSchedule = allSchedules.some(s => s.act === scheduleAct && s.code === scheduleCode)

    if (missingAct || missingCode || missingParts || existingSchedule) {
      const errors = []
      if (missingAct) errors.push('act')
      if (missingCode) errors.push('code')
      if (missingParts) errors.push('parts')
      if (existingSchedule) errors.push('existingSchedule')
      return res.redirect(`/schedules/create?errors=${errors.join(',')}`)
    }

    await this.offenceService.createSchedule(res.locals.user, scheduleAct, scheduleCode, scheduleParts, scheduleUrl)

    return res.redirect('/schedules')
  }
}
