import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor() {
    super('Manage offences')
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')

  courtRegisterLink = (): PageElement => cy.get('[href="/court-register"]')

  loadMonitorLink = (): PageElement => cy.get('[href="/load-results"]')

  toggleJobsLink = (): PageElement => cy.get('[href="/toggle-jobs"]')

  createScheduleLink = (): PageElement => cy.get('[href="/schedules/create"]')
}
