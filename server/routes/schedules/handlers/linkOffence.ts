import { Request, Response } from 'express'
import OffenceService from '../../../services/offenceService'
import { LinkOffence } from '../../../@types/manageOffences/manageOffencesClientTypes'

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
    const { scheduleId, partId, offenceId, offenceCodeSearch } = req.query as Record<string, string>
    const fullSchedule = await this.offenceService.getScheduleById(scheduleId as unknown as number, res.locals.user)
    const schedulePart = fullSchedule.scheduleParts.find(sp => sp.id === Number(partId))
    const offence = await this.offenceService.getOffenceWithScheduleDataById(
      offenceId as unknown as number,
      res.locals.user,
    )

    res.render('pages/schedules/createLink', {
      offence,
      offenceCodeSearch,
      fullSchedule,
      schedulePart,
    })
  }

  POST_LINK = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, offenceId, schedulePartId, paragraphNumber, legislationText, paragraphTitle, lineReference } =
      req.body
    const linkOffence: LinkOffence = {
      offenceId,
      schedulePartId,
      paragraphNumber,
      legislationText,
      paragraphTitle,
      lineReference,
    }

    await this.offenceService.linkOffence(linkOffence, res.locals.user)
    res.redirect(`/schedules/parts-and-offences/${scheduleId}#part-${schedulePartId}`)
  }

  POST_UNLINK = async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, schedulePartId, offenceId } = req.body
    await this.offenceService.unlinkOffence(schedulePartId, offenceId, res.locals.user)
    res.redirect(`/schedules/parts-and-offences/${scheduleId}#part-${schedulePartId}`)
  }
}
