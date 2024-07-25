import nunjucks, { Template } from 'nunjucks'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/schedules/pcscLists.njk')

describe('scheduleOffenceListTable rendering /', () => {
  let compiledTemplate: Template
  const njkEnv = registerNunjucks()

  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
  })

  it('should render maxPeriodOfIndictment correctly', () => {
    const context: Record<string, unknown> = {
      user: { roles: [] },
      pcscLists: {
        listA: [
          {
            id: 1,
            code: '001',
            description: 'Offence 1',
            startDate: '2022-01-01',
            endDate: '2022-12-31',
            legislation: 'Legislation 1',
            maxPeriodOfIndictmentYears: '5',
            paragraphNumber: '1',
          },
          {
            id: 2,
            code: '002',
            description: 'Offence 2',
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            legislation: 'Legislation 2',
            maxPeriodOfIndictmentMonths: '10',
            paragraphNumber: '2',
          },
          {
            id: 3,
            code: '003',
            description: 'Offence 3',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            legislation: 'Legislation 3',
            maxPeriodIsLife: true,
            paragraphNumber: '3',
          },
          {
            id: 4,
            code: '004',
            description: 'Offence 4',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            legislation: 'Legislation 4',
            maxPeriodOfIndictmentDays: '30',
            paragraphNumber: '4',
          },
        ],
      },
      showMaxPeriodAndParagraph: true,
    }

    const renderedHtml = compiledTemplate.render(context)

    const $ = cheerio.load(renderedHtml)
    const rows = $('#pcsc-offence-table tbody tr')

    expect(rows.eq(0).find('td').eq(5).text().trim()).toBe('5 Years')
    expect(rows.eq(1).find('td').eq(5).text().trim()).toBe('10 Months')
    expect(rows.eq(2).find('td').eq(5).text().trim()).toBe('Life')
    expect(rows.eq(3).find('td').eq(5).text().trim()).toBe('30 Days')
  })
})
