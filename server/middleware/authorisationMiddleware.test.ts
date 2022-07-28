import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'

import authorisationMiddleware from './authorisationMiddleware'
import { schedulePaths } from '../routes/schedules'

function createToken(authorities: string[]) {
  const payload = {
    user_name: 'USER1',
    scope: ['read', 'write'],
    auth_source: 'nomis',
    authorities,
    jti: 'a610a10-cca6-41db-985f-e87efb303aaf',
    client_id: 'clientid',
  }

  return jwt.sign(payload, 'secret', { expiresIn: '1h' })
}

function createResWithToken({ authorities }: { authorities: string[] }): Response {
  return {
    locals: {
      user: {
        token: createToken(authorities),
      },
    },
    redirect: (redirectUrl: string) => {
      return redirectUrl
    },
  } as unknown as Response
}

const next = jest.fn()

describe('authorisationMiddleware', () => {
  const req = { session: {}, originalUrl: 'ORIGINAL' } as unknown as Request

  it('should return next when no required roles', () => {
    const res = createResWithToken({ authorities: [] })

    const authorisationResponse = authorisationMiddleware()(req, res, next)

    expect(authorisationResponse).toEqual(next())
  })

  it('should redirect when user has no authorised roles', () => {
    const res = createResWithToken({ authorities: [] })

    const authorisationResponse = authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)

    expect(authorisationResponse).toEqual('/authError')
  })

  it('should return next when user has authorised role', () => {
    const res = createResWithToken({ authorities: ['SOME_REQUIRED_ROLE'] })

    const authorisationResponse = authorisationMiddleware(['SOME_REQUIRED_ROLE'])(req, res, next)

    expect(authorisationResponse).toEqual(next())
  })
})

describe('Role based access to urls tests', () => {
  const reqToLinkOffences = {
    session: {},
    originalUrl: schedulePaths.LINK_OFFENCES,
    path: schedulePaths.LINK_OFFENCES,
  } as unknown as Request

  it('should redirect when user doesnt have the correct role to view the link offences page', () => {
    const res = createResWithToken({ authorities: [] })

    const authorisationResponse = authorisationMiddleware([])(reqToLinkOffences, res, next)

    expect(authorisationResponse).toEqual('/authError')
  })

  it('should go to next page if user has the correct role to view the link offences page', () => {
    const res = createResWithToken({ authorities: ['ROLE_UPDATE_OFFENCE_SCHEDULES'] })

    const authorisationResponse = authorisationMiddleware([])(reqToLinkOffences, res, next)

    expect(authorisationResponse).toEqual(next())
  })
})
