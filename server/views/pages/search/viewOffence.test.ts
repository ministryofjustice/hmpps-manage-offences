import nunjucks, { Template } from 'nunjucks'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/search/viewOffence.njk')

describe('VIEW_OFFENCE /', () => {
  let compiledTemplate: Template
  const njkEnv = registerNunjucks()

  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
  })

  it('should render offence page when there are no markers', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offenceMarkers: {
        markersExist: false,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const offenceMarkers = $('#offence-markers')
    const noOffenceMarkers = $('#no-offence-markers')

    expect(offenceMarkers.length).toBe(0)
    expect(noOffenceMarkers.text()).toContain('None')
  })

  it('should render offence page with markers appropriately loaded', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1' },
      offenceMarkers: {
        isSexual: true,
        inListA: true,
        markersExist: true,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const offenceMarkers = $('#offence-markers')

    expect(offenceMarkers.length).toBe(1)
    expect(offenceMarkers.find('li').length).toBe(2)
    expect(offenceMarkers.text()).toContain('SDS Early Release Exclusion: Sexual')
    expect(offenceMarkers.text()).toContain('SDS+: SDS >7 years between 01 April 2020 and 28 June 2022')
    expect($('h1').text().trim()).toContain('AB: Offence 1')
  })

  it('violent marker should be rendered correctly', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1' },
      offenceMarkers: {
        isViolent: true,
        markersExist: true,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const offenceMarkers = $('#offence-markers')

    expect(offenceMarkers.length).toBe(1)
    expect(offenceMarkers.find('li').length).toBe(1)
    expect(offenceMarkers.text()).toContain(
      'SDS Early Release Exclusion: Violent (for sentences of four years and over)',
    )
  })

  it('terrorism marker should be rendered correctly', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1' },
      offenceMarkers: {
        isTerrorism: true,
        markersExist: true,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const offenceMarkers = $('#offence-markers')

    expect(offenceMarkers.length).toBe(1)
    expect(offenceMarkers.find('li').length).toBe(1)
    expect(offenceMarkers.text()).toContain('SDS Early Release Exclusion: Terrorism')
  })

  it('domestic abuse marker should be rendered correctly', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1' },
      offenceMarkers: {
        isDomesticAbuse: true,
        markersExist: true,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const offenceMarkers = $('#offence-markers')

    expect(offenceMarkers.length).toBe(1)
    expect(offenceMarkers.find('li').length).toBe(1)
    expect(offenceMarkers.text()).toContain('SDS Early Release Exclusion: Domestic Abuse')
  })

  it('domestic abuse marker should be rendered correctly', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1' },
      offenceMarkers: {
        isNationalSecurity: true,
        markersExist: true,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const offenceMarkers = $('#offence-markers')

    expect(offenceMarkers.length).toBe(1)
    expect(offenceMarkers.find('li').length).toBe(1)
    expect(offenceMarkers.text()).toContain('SDS Early Release Exclusion: National Security')
  })

  it('orphaned inchoate offences should display a warning banner', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1', isChild: true },
      offenceMarkers: {
        isNationalSecurity: true,
        markersExist: false,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const inchoateBanner = $('#inchoate-banner')

    expect(inchoateBanner.text()).toContain(
      'This is an Inchoate Offence that does not have a Parent Offence associated with it.',
    )

    const parentOffenceLabel = $('#parent-offence-warning')

    expect(parentOffenceLabel.text()).toContain('No parent offence specified!')
  })

  it('warning banner should not be present if there is a parent offence', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      offence: { code: 'AB', description: 'Offence 1', isChild: true, parentOffenceId: 1241 },
      parentOffence: { id: 1241, code: 'AB', description: 'Parent 1' },
      offenceMarkers: {
        isNationalSecurity: true,
        markersExist: false,
      },
    }
    const $ = cheerio.load(compiledTemplate.render(context))
    const inchoateBanner = $('#inchoate-banner')

    expect(inchoateBanner.text()).not.toContain(
      'This is an Inchoate Offence that does not have a Parent Offence associated with it.',
    )
    const parentOffenceLabel = $('#parent-offence-link')
    expect(parentOffenceLabel.text()).toContain('AB: Parent 1')
  })
})
