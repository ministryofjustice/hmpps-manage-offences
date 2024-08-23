import nunjucks, { Template } from 'nunjucks'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/changeHistory/nomis.njk')

describe('GET /', () => {
  let compiledTemplate: Template
  const njkEnv = registerNunjucks()
  let viewContext: Record<string, unknown>
  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
    viewContext = {
      user: { roles: [] },
      fromDate: new Date(),
      toDate: new Date(),
    }
  })

  it('should render change history page', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('h1').text().trim()).toBe('NOMIS Change History')
  })
})
