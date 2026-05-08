import express from 'express'
import nunjucks, { Template } from 'nunjucks'
import * as cheerio from 'cheerio'
import fs from 'fs'
import nunjucksSetup from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/search/search.njk')

describe('GET /', () => {
  let compiledTemplate: Template
  const njkEnv = nunjucksSetup(express())
  let viewContext: Record<string, unknown>
  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
    viewContext = {
      user: { userRoles: [] },
    }
  })

  it('should render search page', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('h1').text().trim()).toBe('Search for offences')
  })
})
