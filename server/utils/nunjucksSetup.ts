/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nunjucks, { Environment } from 'nunjucks'
import express from 'express'
import path from 'path'

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
}

export default function nunjucksSetup(app: express.Express): void {
  app.set('view engine', 'njk')

  app.locals.asset_path = '/assets/'
  app.locals.applicationName = 'Manage Offences'

  // Cachebusting version string
  if (production) {
    // Version only changes on reboot
    app.locals.version = Date.now().toString()
  } else {
    // Version changes every request
    app.use((req, res, next) => {
      res.locals.version = Date.now().toString()
      return next()
    })
  }

  registerNunjucks(app)
}

export function registerNunjucks(app?: express.Express): Environment {
  const njkEnv = nunjucks.configure(
    [
      path.join(__dirname, '../views'),
      'node_modules/govuk-frontend/',
      'node_modules/govuk-frontend/components/',
      'node_modules/@ministryofjustice/frontend/',
      'node_modules/@ministryofjustice/frontend/moj/components/',
    ],
    {
      autoescape: true,
      express: app,
    }
  )

  njkEnv.addFilter('initialiseName', (fullName: string) => {
    // this check is for the authError page
    if (!fullName) {
      return null
    }
    const array = fullName.split(' ')
    return `${array[0][0]}. ${array.reverse()[0]}`
  })

  // monthLength can be 'short' (default) or 'full'
  njkEnv.addFilter('dateFormat', (dateString: string, monthLength = 'short') => {
    if (!dateString) return null
    const date = new Date(dateString)
    return `${toTwoDigits(date.getDate())} ${months[date.getMonth()][monthLength]} ${date.getFullYear()}`
  })

  njkEnv.addFilter('dateTimeFormat', (dateString: string, monthLength = 'short') => {
    if (!dateString) return null
    const date = new Date(dateString)
    if (!date || Number.isNaN(date.getTime())) return null
    return `${toTwoDigits(date.getDate())} ${months[date.getMonth()][monthLength]} ${date.getFullYear()} ${toTwoDigits(
      date.getHours()
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

  return njkEnv
}
