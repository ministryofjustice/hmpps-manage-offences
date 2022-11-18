import { Request, Response } from 'express'
import ChangeHistoryService from '../../../services/changeHistoryService'
import { DateInput } from '../../../@types/manageOffences/manageOffencesClientTypes'

export default class ChangeHistoryRoutes {
  constructor(private readonly changeHistoryService: ChangeHistoryService) {}

  GET_NOMIS = async (req: Request, res: Response): Promise<void> => {
    const { fromDate: from, toDate: to } = req.query as unknown as Record<string, DateInput>
    const fromDate = from ? this.parseDate(from, this.getStartOfMonth()) : this.getStartOfMonth()
    const toDate = to ? this.parseDate(to, new Date()) : new Date()

    const { newOffences, updatedOffences, statutes } = await this.changeHistoryService.getNomisChangeHistory(
      fromDate,
      toDate,
      res.locals.user,
    )
    res.render('pages/changeHistory/nomis', { newOffences, updatedOffences, statutes, fromDate, toDate })
  }

  private getStartOfMonth() {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  }

  private parseDate(date: DateInput, alternativeDate: Date) {
    const dateParsed = Date.parse(`${date.year}-${date.month}-${date.day}`)
    return Number.isNaN(dateParsed) ? alternativeDate : new Date(dateParsed)
  }
}
