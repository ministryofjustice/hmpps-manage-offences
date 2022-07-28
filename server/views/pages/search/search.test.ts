import nunjucks, { Template } from 'nunjucks'
import cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/search/search.njk')

describe('GET /', () => {
  let compiledTemplate: Template
  const njkEnv = registerNunjucks()
  let viewContext: Record<string, unknown>
  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
    viewContext = {
      user: { roles: [] },
    }
  })

  it('should render search page', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('h1').text().trim()).toBe('Search for offences')
  })
})
