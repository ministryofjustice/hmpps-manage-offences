import nunjucks, { Template } from 'nunjucks'
import cheerio from 'cheerio'
import fs from 'fs'
import { registerNunjucks } from '../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/index.njk')

describe('GET /', () => {
  let compiledTemplate: Template

  const njkEnv = registerNunjucks()
  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
  })

  it('should render index page', () => {
    const $ = cheerio.load(compiledTemplate.render())

    expect($('h1').text().trim()).toBe('Manage offences')
    expect($('#service-uses-list').text()).toContain('loading offence data into both NOMIS and Delius')
  })
})
