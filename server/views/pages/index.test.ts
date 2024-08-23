import nunjucks, { Template } from 'nunjucks'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/index.njk')

describe('GET /', () => {
  let compiledTemplate: Template
  let viewContext: Record<string, unknown>

  const njkEnv = registerNunjucks()
  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
    viewContext = {
      user: { roles: [] },
    }
  })

  it('should render index page', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('h1').text().trim()).toBe('Manage offences')
    expect($('#service-uses-list').text()).toContain(
      'Manage offences, including loading, publishing, searching and augmenting',
    )
  })
})
