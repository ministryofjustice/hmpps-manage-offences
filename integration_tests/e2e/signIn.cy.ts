import IndexPage from '../pages/index'
import AuthSignInPage from '../pages/authSignIn'
import Page from '../pages/page'
import AuthManageDetailsPage from '../pages/authManageDetails'

context('Sign In', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubManageUser')
  })

  it('Unauthenticated user directed to auth', () => {
    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('Unauthenticated user navigating to sign in page directed to auth', () => {
    cy.visit('/sign-in')
    Page.verifyOnPage(AuthSignInPage)
  })

  it('User name visible in header', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.headerUserName().should('contain.text', 'J. Smith')
  })

  it('User can sign out', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.signOut().click()
    Page.verifyOnPage(AuthSignInPage)
  })

  it('User can manage their details', () => {
    cy.signIn()
    cy.task('stubAuthManageDetails')
    const indexPage = Page.verifyOnPage(IndexPage)

    indexPage.manageDetails().get('a').invoke('removeAttr', 'target')
    indexPage.manageDetails().click()
    Page.verifyOnPage(AuthManageDetailsPage)
  })

  it('Token verification failure takes user to sign in page', () => {
    cy.signIn()
    Page.verifyOnPage(IndexPage)
    cy.task('stubVerifyToken', false)

    // can't do a visit here as cypress requires only one domain
    cy.request('/').its('body').should('contain', 'Sign in')
  })

  it('Token verification failure clears user session', () => {
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    cy.task('stubVerifyToken', false)

    // can't do a visit here as cypress requires only one domain
    cy.request('/').its('body').should('contain', 'Sign in')

    cy.task('stubVerifyToken', true)
    cy.task('stubManageUser', 'bobby brown')
    cy.signIn()

    indexPage.headerUserName().contains('B. Brown')
  })

  it('admin user can see Load monitor and Toggle jobs nav buttons', () => {
    cy.task('stubSignIn', ['ROLE_MANAGE_OFFENCES_ADMIN'])
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.loadMonitorLink().should('exist')
    indexPage.toggleJobsLink().should('exist')
  })

  it('user with offence schedules role can see create new Schedule Link', () => {
    cy.task('stubSignIn', ['UPDATE_OFFENCE_SCHEDULES'])
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.createScheduleLink().should('exist')
  })

  it('user without offence schedules role should not see create new Schedule Link', () => {
    cy.task('stubSignIn', [])
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.createScheduleLink().should('not.exist')
  })
})
