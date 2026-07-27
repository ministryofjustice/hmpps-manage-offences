import { match } from 'path-to-regexp'
import { schedulePaths } from '../routes/schedules'
import AuthorisedRoles from '../enums/authorisedRoles'
import { loadResultPaths } from '../routes/loadResults'
import { toggleJobsPaths } from '../routes/toggleJobs'
import { adminPaths } from '../routes/search'

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
  [schedulePaths.CREATE_SCHEDULE]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.CREATE_SCHEDULE),
  },
  [schedulePaths.EDIT_SCHEDULE]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.EDIT_SCHEDULE),
  },
  [schedulePaths.ADD_SCHEDULE_PART]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.ADD_SCHEDULE_PART),
  },
  [schedulePaths.DELETE_SCHEDULE_PART]: {
    roles: [AuthorisedRoles.ROLE_UPDATE_OFFENCE_SCHEDULES],
    matchPath: getMatchPath(schedulePaths.DELETE_SCHEDULE_PART),
  },
  [schedulePaths.SCHEDULE_STATUS]: {
    roles: [AuthorisedRoles.ROLE_MANAGE_OFFENCES_ADMIN],
    matchPath: getMatchPath(schedulePaths.SCHEDULE_STATUS),
  },
  [loadResultPaths.LOAD_RESULTS]: {
    roles: [AuthorisedRoles.ROLE_MANAGE_OFFENCES_ADMIN],
    matchPath: getMatchPath(loadResultPaths.LOAD_RESULTS),
  },
  [toggleJobsPaths.TOGGLE_JOBS]: {
    roles: [AuthorisedRoles.ROLE_MANAGE_OFFENCES_ADMIN],
    matchPath: getMatchPath(toggleJobsPaths.TOGGLE_JOBS),
  },
  [adminPaths.REACTIVATE_NOMIS_OFFENCE]: {
    roles: [AuthorisedRoles.ROLE_NOMIS_OFFENCE_ACTIVATOR],
    matchPath: getMatchPath(adminPaths.REACTIVATE_NOMIS_OFFENCE),
  },
  [adminPaths.DEACTIVATE_NOMIS_OFFENCE]: {
    roles: [AuthorisedRoles.ROLE_NOMIS_OFFENCE_ACTIVATOR],
    matchPath: getMatchPath(adminPaths.DEACTIVATE_NOMIS_OFFENCE),
  },
}

export default urlToRoleMapping
