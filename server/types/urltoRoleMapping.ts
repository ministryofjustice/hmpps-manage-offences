import { match } from 'path-to-regexp'
import { schedulePaths } from '../routes/schedules'
import AuthorisedRoles from '../enums/authorisedRoles'
import { loadResultPaths } from '../routes/loadResults'
import { toggleJobsPaths } from '../routes/toggleJobs'

function getMatchPath(path: string) {
  return match(path, { decode: decodeURIComponent })
}

const urlToRoleMapping = {
  [schedulePaths.LINK_OFFENCE_POST]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.LINK_OFFENCE_POST),
  },
  [schedulePaths.UNLINK_OFFENCE_POST]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.UNLINK_OFFENCE_POST),
  },
  [schedulePaths.LINK_OFFENCES]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.LINK_OFFENCES),
  },
  [loadResultPaths.LOAD_RESULTS]: {
    roles: [AuthorisedRoles.ROLE_MANAGE_OFFENCES_ADMIN],
    matchPath: getMatchPath(loadResultPaths.LOAD_RESULTS),
  },
  [toggleJobsPaths.TOGGLE_JOBS]: {
    roles: [AuthorisedRoles.ROLE_MANAGE_OFFENCES_ADMIN],
    matchPath: getMatchPath(toggleJobsPaths.TOGGLE_JOBS),
  },
}

export default urlToRoleMapping
