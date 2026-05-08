import express from 'express'
import nunjucks, { Template } from 'nunjucks'
import * as cheerio from 'cheerio'
import fs from 'fs'
import nunjucksSetup from '../../../utils/nunjucksSetup'

const snippet = fs.readFileSync('server/views/pages/loadResults/loadResults.njk')

describe('GET /', () => {
  let compiledTemplate: Template
  let viewContext: Record<string, unknown>
  const njkEnv = nunjucksSetup(express())
  beforeEach(() => {
    compiledTemplate = nunjucks.compile(snippet.toString(), njkEnv)
    viewContext = {
      user: { userRoles: [] },
    }
  })

  it('should render loadResults page', () => {
    const $ = cheerio.load(compiledTemplate.render(viewContext))

    expect($('h1').text().trim()).toBe('Latest load results')
  })
})
