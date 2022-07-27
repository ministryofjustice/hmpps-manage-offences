import nunjucks, { Template } from 'nunjucks'
import cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/toggleJobs/toggleJobs.njk')

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

  it('should render toggle jobs page', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('h1').text().trim()).toBe('Toggle jobs')
  })
})
