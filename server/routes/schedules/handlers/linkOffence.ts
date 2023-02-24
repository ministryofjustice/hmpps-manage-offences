import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import {DateInput} from "../../../@types/manageOffences/manageOffencesClientTypes";

export default class LinkOffenceRoutes {
  constructor(private readonly offenceService: OffenceService) {}

  GET = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId } = req.params
    const { offenceCode } = req.query as Record<string, string>
    const fullSchedule = await this.offenceService.getScheduleById(scheduleId as unknown as number, res.locals.user)
    const schedulePart = fullSchedule.scheduleParts.find(sp => sp.id === Number(schedulePartId))
    const offences = offenceCode
      ? await this.offenceService.getOffencesNotLinked(offenceCode, fullSchedule, res.locals.user)
      : undefined

    res.render('pages/schedules/linkOffences', {
      offences,
      offenceCode,
      fullSchedule,
      schedulePart,
    })
  }

  GET_LINK_SCREEN = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, partId, offenceId, offenceCodeSearch } = req.query
    console.log('>>>>' + scheduleId)

    const fullSchedule = await this.offenceService.getScheduleById(scheduleId as unknown as number, res.locals.user)
    const schedulePart = fullSchedule.scheduleParts.find(sp => sp.id === Number(partId))
    const offences = await this.offenceService.getOffenceById(offenceId as unknown as number, res.locals.user)
    console.log('>>>>' + JSON.stringify(offences))

    res.render('pages/schedules/createLink', {
      // offences,
      // offenceCode,
      // fullSchedule,
      // schedulePart,
    })
  }

  POST_LINK = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId, offenceCodeSearch, offenceId } = req.body
    await this.offenceService.linkOffence(schedulePartId, offenceId, res.locals.user)
    const queryString = new URLSearchParams({ offenceCode: offenceCodeSearch }).toString()
    res.redirect(`/schedules/link-offences/${scheduleId}/${schedulePartId}?${queryString}`)
  }

  POST_UNLINK = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId, offenceId, scheduleParagraphId } = req.body
    console.log('scheduleParagraphId')
    console.log(scheduleParagraphId)
    await this.offenceService.unlinkOffence(scheduleParagraphId, offenceId, res.locals.user)
    res.redirect(`/schedules/parts-and-offences/${scheduleId}#part-${schedulePartId}`)
  }
}
