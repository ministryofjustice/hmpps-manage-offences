/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import path from 'path'
import nunjucks, { Environment } from 'nunjucks'
import express from 'express'
import fs from 'fs'
import { initialiseName } from './utils'
import config from '../config'
import logger from '../../logger'

const production = process.env.NODE_ENV === 'production'

const toTwoDigits = (val: number) => `${`0${val}`.slice(-2)}`

const months = {
  0: { short: 'Jan', full: 'January' },
  1: { short: 'Feb', full: 'February' },
  2: { short: 'Mar', full: 'March' },
  3: { short: 'Apr', full: 'April' },
  4: { short: 'May', full: 'May' },
  5: { short: 'Jun', full: 'June' },
  6: { short: 'Jul', full: 'July' },
  7: { short: 'Aug', full: 'August' },
  8: { short: 'Sep', full: 'September' },
  9: { short: 'Oct', full: 'October' },
  10: { short: 'Nov', full: 'November' },
  11: { short: 'Dec', full: 'December' },
} as const

type MonthKey = keyof typeof months

export default function nunjucksSetup(app: express.Express): void {
  app.set('view engine', 'njk')

  app.locals.asset_path = '/assets/'
  app.locals.applicationName = 'Manage Offences'
  app.locals.environmentName = config.environmentName
  app.locals.environmentNameColour = config.environmentName === 'PRE-PRODUCTION' ? 'govuk-tag--green' : ''
  let assetManifest: Record<string, string> = {}

  try {
    const assetMetadataPath = path.resolve(__dirname, '../../assets/manifest.json')
    assetManifest = JSON.parse(fs.readFileSync(assetMetadataPath, 'utf8'))
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') {
      logger.error(e, 'Could not read asset manifest file')
    }
  }

  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../../server/views'),
      'node_modules/govuk-frontend/dist/',
      'node_modules/@ministryofjustice/frontend/',
    ],
    {
      autoescape: true,
      express: app,
      noCache: process.env.NODE_ENV !== 'production',
    },
  )

  njkEnv.addFilter('initialiseName', initialiseName)
  njkEnv.addFilter('assetMap', (url: string) => assetManifest[url] || url)

  // monthLength can be 'short' (default) or 'full'
  njkEnv.addFilter('dateFormat', (dateString: string, monthLength: 'short' | 'full' = 'short') => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${toTwoDigits(date.getDate())} ${months[date.getMonth() as MonthKey][monthLength]} ${date.getFullYear()}`
  })

  njkEnv.addFilter('dateTimeFormat', (dateString: string, monthLength: 'short' | 'full' = 'short') => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (!date || Number.isNaN(date.getTime())) return null
    return `${toTwoDigits(date.getDate())} ${months[date.getMonth() as MonthKey][monthLength]} ${date.getFullYear()} ${toTwoDigits(
      date.getHours(),
    )}:${toTwoDigits(date.getMinutes())}`
  })

  njkEnv.addFilter('statusColour', (status: string) => {
    if (status === 'SUCCESS') {
      return 'govuk-tag--green'
    }

    if (status === 'FAIL') {
      return 'govuk-tag--red'
    }
    return 'govuk-tag--grey'
  })

  njkEnv.addFilter('loadType', (loadType: string) => {
    if (!loadType) return null
    return loadType === 'FULL_LOAD' ? 'Full load' : 'Update'
  })

  njkEnv.addFilter('asValueText', (list, valueKey, textKey) => {
    return list?.map((item: any) => ({ value: item[valueKey], text: item[textKey] }))
  })

  njkEnv.addFilter('checkRadioIfIncludes', (array, itemToCheck) => {
    return array.map((item: any) => (String(item.value) === String(itemToCheck) ? { ...item, checked: true } : item))
  })

}
