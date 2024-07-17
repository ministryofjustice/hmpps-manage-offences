/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/admin/toggle-feature': {
    /** Enable / disable a feature */
    put: operations['toggleFeature']
  }
  '/schedule/unlink-offences': {
    /** Unlink offences from schedules - will also unlink any associated inchoate offences (i.e. if any of the passed in offences have children they will also be unlinked) */
    post: operations['unlinkOffences']
  }
  '/schedule/link-offence': {
    /** Link offence to a schedule part - will also link any associated inchoate offences (i.e. if  passed in offence has children they will also be linked) */
    post: operations['linkOffences']
  }
  '/schedule/create': {
    /** Create a schedule */
    post: operations['createSchedule']
  }
  '/admin/nomis/offences/reactivate': {
    /**
     * Reactivate offences in NOMIS
     * @description Reactivate offences in NOMIS, only to be used for offences that are end dated but NOMIS need them to be reactivated
     */
    post: operations['reactivateNomisOffence']
  }
  '/admin/nomis/offences/deactivate': {
    /**
     * Deactivate offences in NOMIS
     * @description Deactivate offences in NOMIS, only to be used for offences that are end dated but are active in NOMIS
     */
    post: operations['deactivateNomisOffence']
  }
  '/schedule/sds-exclusions': {
    /**
     * Determine if the passed in offence codes are either sexual or violent offences
     * @description This endpoint will return a list of offences and whether they are violent or sexual offences
     */
    get: operations['getSdsExclusionInformation']
  }
  '/schedule/sds-exclusion-lists': {
    /**
     * Retrieves the list of all the offences that are either sexual or violent
     * @description This endpoint will return a list of all the offences that are sexual (Schedule 3 or 15 Part 2) or violent (Schedule 15 Part 1)
     */
    get: operations['getSdsExclusionLists']
  }
  '/schedule/pcsc-lists': {
    /**
     * Retrieve all PCSC lists
     * @description This endpoint will return all four PCSC lists
     */
    get: operations['getPcscLists']
  }
  '/schedule/pcsc-indicators': {
    /**
     * Determine if the passed in offence codes are related to any of the PCSC lists
     * @description This endpoint will return a list of offences and whether they are im any of the PCSC lists
     */
    get: operations['getPcscInformation']
  }
  '/schedule/offence-mapping/id/{offenceId}': {
    /**
     * Get offence matching the passed ID - with schedule related data
     * @description This endpoint will return the offence that matches the unique ID passed in
     */
    get: operations['getOffenceToScheduleMapping']
  }
  '/schedule/by-id/{scheduleId}': {
    /** Get schedule by ID - includes all scheduled parts and mapped offences */
    get: operations['findScheduleById']
  }
  '/schedule/all': {
    /** Find all schedules - does not include mapped offences */
    get: operations['findAllSchedules']
  }
  '/offences/search': {
    /**
     * Get all offences matching the passed offence code, does a start with match
     * @description This endpoint will return the offences that start with the passed offence code
     */
    get: operations['searchOffences']
  }
  '/offences/load-results': {
    /**
     * Get the results of the most recent load
     * @description Get the results of the most recent load
     */
    get: operations['findLoadResults']
  }
  '/offences/id/{offenceId}': {
    /**
     * Get offence matching the passed ID
     * @description This endpoint will return the offence that matches the unique ID passed in
     */
    get: operations['getOffenceById']
  }
  '/offences/ho-code/{offenceCode}': {
    /**
     * Get the HO Code associated with an offence code
     * @description This endpoint will return the HO Code associated with an offence code, could return null
     */
    get: operations['getHoCodeByOffenceCode']
  }
  '/offences/code/{offenceCode}': {
    /**
     * Get all offences matching the passed offence code, does a start with match
     * @description This endpoint will return the offences that start with the passed offence code
     */
    get: operations['getOffencesByOffenceCode']
  }
  '/offences/code/unique/{offenceCode}': {
    /**
     * Get the unique offence matching the passed offence code
     * @description This endpoint will return the offence that matches the unique code passed in
     */
    get: operations['getOffenceByCode']
  }
  '/offences/code/multiple': {
    /**
     * Get a list of offences that match the passed in list of offence codes
     * @description This endpoint will return the offences that match the codes passed in
     */
    get: operations['getOffencesByCodes']
  }
  '/change-history/nomis': {
    /** Fetch changes pushed to NOMIS between a from and to date range (to defaults to now) */
    get: operations['getOffencesByOffenceCode_1']
  }
  '/admin/feature-toggles': {
    /** Get values of all feature toggles */
    get: operations['getAllToggles']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    /** @description Feature toggle details */
    FeatureToggle: {
      /**
       * @description Feature to be toggled: FULL_SYNC_NOMIS, DELTA_SYNC_NOMIS, FULL_SYNC_SDRS or DELTA_SYNC_SDRS
       * @enum {string}
       */
      feature:
        | 'FULL_SYNC_NOMIS'
        | 'DELTA_SYNC_NOMIS'
        | 'FULL_SYNC_SDRS'
        | 'DELTA_SYNC_SDRS'
        | 'SYNC_HOME_OFFICE_CODES'
        | 'PUBLISH_EVENTS'
        | 'UNLINK_SCHEDULES_NOMIS'
        | 'LINK_SCHEDULES_NOMIS'
      /** @description true or false - depending on whether the feature should be enabled */
      enabled: boolean
    }
    /** @description Schedule part ID and Offence ID - used for unlinking offences from schedules */
    SchedulePartIdAndOffenceId: {
      /** Format: int64 */
      schedulePartId: number
      /** Format: int64 */
      offenceId: number
    }
    LinkOffence: {
      /**
       * Format: int64
       * @description Unique ID of the offence
       */
      offenceId: number
      /**
       * Format: int64
       * @description The offence code
       */
      schedulePartId: number
      /** @description The line reference for the associated schedule's legislation */
      lineReference?: string
      /** @description The legislation text for the associated schedule */
      legislationText?: string
      /** @description Schedule paragraph title that this offence is mapped to */
      paragraphTitle?: string
      /** @description Schedule paragraph number that this offence is mapped to */
      paragraphNumber?: string
    }
    /** @description A list of child offence ID's; i.e. inchoate offences linked to this offence */
    BasicOffence: {
      /**
       * Format: int64
       * @description Unique ID of the offence
       */
      id: number
      /** @description The offence code */
      code: string
      /** @description The offence description (taken from SDRS CJSTitle field) */
      description?: string
      /**
       * Format: date
       * @description The offence start date
       */
      startDate: string
      /**
       * Format: date
       * @description The offence end date
       */
      endDate?: string
    }
    /** @description Schedule details when associated to an offence */
    LinkedScheduleDetails: {
      /** Format: int64 */
      id: number
      act: string
      code: string
      url?: string
      /** Format: int32 */
      partNumber: number
      paragraphNumber?: string
      paragraphTitle?: string
      lineReference?: string
      legislationText?: string
    }
    OffenceToScheduleMapping: {
      /**
       * Format: int64
       * @description Unique ID of the offence
       */
      id: number
      /** @description The offence code */
      code: string
      /** @description The offence description (taken from SDRS CJSTitle field) */
      description?: string
      /** @description The offence type (e.g CI) */
      offenceType?: string
      /**
       * Format: int32
       * @description The revision number of the offence
       */
      revisionId: number
      /**
       * Format: date
       * @description The offence start date
       */
      startDate: string
      /**
       * Format: date
       * @description The offence end date
       */
      endDate?: string
      /** @description The offence's home office stats code */
      homeOfficeStatsCode?: string
      /**
       * Format: date-time
       * @description The date this offence was last changed in SDRS
       */
      changedDate: string
      /**
       * Format: date-time
       * @description The date this offence was loaded into manage-offences from SDRS
       */
      loadDate?: string
      /** @description The schedules linked to this offence */
      schedules?: components['schemas']['LinkedScheduleDetails'][]
      /** @description If true then this is a inchoate offence; i.e. a child of another offence */
      isChild: boolean
      /**
       * Format: int64
       * @description The parent offence id of an inchoate offence
       */
      parentOffenceId?: number
      /** @description A list of child offence ID's; i.e. inchoate offences linked to this offence */
      childOffences?: components['schemas']['BasicOffence'][]
      /** @description The legislation associated to this offence (from actsAndSections in the SDRS response) */
      legislation?: string
      /** @description Set to true if max period is life */
      maxPeriodIsLife?: boolean
      /**
       * Format: int32
       * @description Set to the max period of indictment in years
       */
      maxPeriodOfIndictmentYears?: number
      /** @description The line reference for the associated schedule's legislation */
      lineReference?: string
      /** @description The legislation text for the associated schedule */
      legislationText?: string
      /** @description Schedule paragraph title that this offence is mapped to */
      paragraphTitle?: string
      /** @description Schedule paragraph number that this offence is mapped to */
      paragraphNumber?: string
    }
    /** @description Schedule details */
    Schedule: {
      /** Format: int64 */
      id: number
      act: string
      code: string
      url?: string
      scheduleParts?: components['schemas']['SchedulePart'][]
    }
    /** @description Schedule part details and associated offences */
    SchedulePart: {
      /** Format: int64 */
      id: number
      /** Format: int32 */
      partNumber: number
      offences?: components['schemas']['OffenceToScheduleMapping'][]
    }
    /** @description Categorises the offence based on the schedule it appears in */
    OffenceSdsExclusion: {
      offenceCode: string
      /**
       * @description Categories for the offence
       * @enum {string}
       */
      schedulePart: 'SEXUAL' | 'DOMESTIC_ABUSE' | 'VIOLENT' | 'NONE' | 'NATIONAL_SECURITY' | 'TERRORISM'
    }
    /** @description Contains the list of all the offences that are sexual, domestic abuse, national security, terrorism or violent */
    SdsExclusionLists: {
      /** @description Offence falls under the Sexual category */
      sexual: components['schemas']['OffenceToScheduleMapping'][]
      /** @description Offence falls under the Domestic Abuse category */
      domesticAbuse: components['schemas']['OffenceToScheduleMapping'][]
      /** @description Offence falls under the National Security category */
      nationalSecurity: components['schemas']['OffenceToScheduleMapping'][]
      /** @description Offence falls under the Violent category */
      violent: components['schemas']['OffenceToScheduleMapping'][]
      /** @description Offence falls under the Terrorism category */
      terrorism: components['schemas']['OffenceToScheduleMapping'][]
    }
    PcscLists: {
      /** @description Schedule 15 Part 1 + Schedule 15 Part 2 that attract life (exclude all offences that start on or after 28 June 2022) */
      listA: components['schemas']['OffenceToScheduleMapping'][]
      /** @description SDS between 4 and 7 years : Schedule 15 Part 2 that attract life + serious violent offences */
      listB: components['schemas']['OffenceToScheduleMapping'][]
      /** @description Sec250 >7 years = List C: Schedule 15 Part 2 that attract life + serious violent offences (same as List B) */
      listC: components['schemas']['OffenceToScheduleMapping'][]
      /** @description Schedule 15 Part 1 + Schedule 15 Part 2 that attract life */
      listD: components['schemas']['OffenceToScheduleMapping'][]
    }
    /** @description Shows which (if any) PCSC Marker the offence relates to */
    OffencePcscMarkers: {
      offenceCode: string
      pcscMarkers: components['schemas']['PcscMarkers']
    }
    PcscMarkers: {
      /** @description Schedule 15 Part 1 + Schedule 15 Part 2 that attract life (exclude all offences that start on or after 28 June 2022) */
      inListA: boolean
      /** @description SDS between 4 and 7 years : Schedule 15 Part 2 that attract life + serious violent offences */
      inListB: boolean
      /** @description Sec250 >7 years = List C: Schedule 15 Part 2 that attract life + serious violent offences (same as List B) */
      inListC: boolean
      /** @description Schedule 15 Part 1 + Schedule 15 Part 2 that attract life */
      inListD: boolean
    }
    /** @description Offence details */
    Offence: {
      /**
       * Format: int64
       * @description Unique ID of the offence
       */
      id: number
      /** @description The offence code */
      code: string
      /** @description The offence description (taken from SDRS CJSTitle field) */
      description?: string
      /** @description The offence type (e.g CI) */
      offenceType?: string
      /**
       * Format: int32
       * @description The revision number of the offence
       */
      revisionId: number
      /**
       * Format: date
       * @description The offence start date
       */
      startDate: string
      /**
       * Format: date
       * @description The offence end date
       */
      endDate?: string
      /** @description The offence's home office stats code */
      homeOfficeStatsCode?: string
      /** @description The offence's home office description */
      homeOfficeDescription?: string
      /**
       * Format: date-time
       * @description The date this offence was last changed in SDRS
       */
      changedDate: string
      /**
       * Format: date-time
       * @description The date this offence was loaded into manage-offences from SDRS
       */
      loadDate?: string
      /** @description The schedules linked to this offence */
      schedules?: components['schemas']['LinkedScheduleDetails'][]
      /** @description If true then this is a inchoate offence; i.e. a child of another offence */
      isChild: boolean
      /**
       * Format: int64
       * @description The parent offence id of an inchoate offence
       */
      parentOffenceId?: number
      /** @description A list of child offence ID's; i.e. inchoate offences linked to this offence */
      childOffenceIds?: number[]
      /** @description The legislation associated to this offence (from actsAndSections in the SDRS response) */
      legislation?: string
      /** @description Set to true if max period is life */
      maxPeriodIsLife?: boolean
      /**
       * Format: int32
       * @description Set to the max period of indictment in years
       */
      maxPeriodOfIndictmentYears?: number
      /**
       * @description Yes if the offence caries a custodial sentence, Either if it does when tried as an indictment and No otherwise.
       * @enum {string}
       */
      custodialIndicator?: 'Y' | 'N' | 'E'
    }
    /** @description Details of the load by SDRS Cache */
    MostRecentLoadResult: {
      /**
       * @description Associated SDRS Cache - indicates the part of the SDRS load this status relates to
       * @enum {string}
       */
      sdrsCache:
        | 'OFFENCES_A'
        | 'OFFENCES_B'
        | 'OFFENCES_C'
        | 'OFFENCES_D'
        | 'OFFENCES_E'
        | 'OFFENCES_F'
        | 'OFFENCES_G'
        | 'OFFENCES_H'
        | 'OFFENCES_I'
        | 'OFFENCES_J'
        | 'OFFENCES_K'
        | 'OFFENCES_L'
        | 'OFFENCES_M'
        | 'OFFENCES_N'
        | 'OFFENCES_O'
        | 'OFFENCES_P'
        | 'OFFENCES_Q'
        | 'OFFENCES_R'
        | 'OFFENCES_S'
        | 'OFFENCES_T'
        | 'OFFENCES_U'
        | 'OFFENCES_V'
        | 'OFFENCES_W'
        | 'OFFENCES_X'
        | 'OFFENCES_Y'
        | 'OFFENCES_Z'
        | 'GET_APPLICATIONS'
        | 'GET_MOJ_OFFENCE'
      /**
       * @description Load Status: SUCCESS or FAIL
       * @enum {string}
       */
      status?: 'SUCCESS' | 'FAIL'
      /**
       * @description Load Type: FULL_LOAD or UPDATE
       * @enum {string}
       */
      type?: 'FULL_LOAD' | 'UPDATE'
      /**
       * Format: date-time
       * @description The date and time of the load
       */
      loadDate?: string
      /**
       * Format: date-time
       * @description The date and time of the most recent successful load; if the load was successful this is the same as the loadDate
       */
      lastSuccessfulLoadDate?: string
    }
    /** @description This shows a change to NOMIS */
    NomisChangeHistory: {
      /** Format: int64 */
      id: number
      /** @description This is set depending on the nomisChangeType - could be the code of the offence, statute or Home Office Stats */
      code: string
      /** @description This description of the nomisChangeType */
      description: string
      /**
       * @description Could be INSERT or UPDATE
       * @enum {string}
       */
      changeType: 'INSERT' | 'DELETE' | 'UPDATE'
      /**
       * @description Could be OFFENCE or STATUTE
       * @enum {string}
       */
      nomisChangeType: 'OFFENCE' | 'STATUTE'
      /**
       * Format: date-time
       * @description The date this change was made in NOMIS
       */
      sentToNomisDate: string
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** Enable / disable a feature */
  toggleFeature: {
    requestBody: {
      content: {
        'application/json': components['schemas']['FeatureToggle'][]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: never
      }
    }
  }
  /** Unlink offences from schedules - will also unlink any associated inchoate offences (i.e. if any of the passed in offences have children they will also be unlinked) */
  unlinkOffences: {
    requestBody: {
      content: {
        'application/json': components['schemas']['SchedulePartIdAndOffenceId'][]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: never
      }
    }
  }
  /** Link offence to a schedule part - will also link any associated inchoate offences (i.e. if  passed in offence has children they will also be linked) */
  linkOffences: {
    requestBody: {
      content: {
        'application/json': components['schemas']['LinkOffence']
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: never
      }
    }
  }
  /** Create a schedule */
  createSchedule: {
    requestBody: {
      content: {
        'application/json': components['schemas']['Schedule']
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: never
      }
    }
  }
  /**
   * Reactivate offences in NOMIS
   * @description Reactivate offences in NOMIS, only to be used for offences that are end dated but NOMIS need them to be reactivated
   */
  reactivateNomisOffence: {
    requestBody: {
      content: {
        'application/json': number[]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: never
      }
    }
  }
  /**
   * Deactivate offences in NOMIS
   * @description Deactivate offences in NOMIS, only to be used for offences that are end dated but are active in NOMIS
   */
  deactivateNomisOffence: {
    requestBody: {
      content: {
        'application/json': number[]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: never
      }
    }
  }
  /**
   * Determine if the passed in offence codes are either sexual or violent offences
   * @description This endpoint will return a list of offences and whether they are violent or sexual offences
   */
  getSdsExclusionInformation: {
    parameters: {
      query: {
        offenceCodes: string[]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['OffenceSdsExclusion'][]
        }
      }
    }
  }
  /**
   * Retrieves the list of all the offences that are either sexual or violent
   * @description This endpoint will return a list of all the offences that are sexual (Schedule 3 or 15 Part 2) or violent (Schedule 15 Part 1)
   */
  getSdsExclusionLists: {
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['SdsExclusionLists']
        }
      }
    }
  }
  /**
   * Retrieve all PCSC lists
   * @description This endpoint will return all four PCSC lists
   */
  getPcscLists: {
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['PcscLists']
        }
      }
    }
  }
  /**
   * Determine if the passed in offence codes are related to any of the PCSC lists
   * @description This endpoint will return a list of offences and whether they are im any of the PCSC lists
   */
  getPcscInformation: {
    parameters: {
      query: {
        offenceCodes: string[]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['OffencePcscMarkers'][]
        }
      }
    }
  }
  /**
   * Get offence matching the passed ID - with schedule related data
   * @description This endpoint will return the offence that matches the unique ID passed in
   */
  getOffenceToScheduleMapping: {
    parameters: {
      path: {
        /**
         * @description The offence ID
         * @example 123456
         */
        offenceId: number
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['OffenceToScheduleMapping']
        }
      }
    }
  }
  /** Get schedule by ID - includes all scheduled parts and mapped offences */
  findScheduleById: {
    parameters: {
      path: {
        /**
         * @description The schedule ID
         * @example 1000011
         */
        scheduleId: number
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Schedule']
        }
      }
    }
  }
  /** Find all schedules - does not include mapped offences */
  findAllSchedules: {
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Schedule'][]
        }
      }
    }
  }
  /**
   * Get all offences matching the passed offence code, does a start with match
   * @description This endpoint will return the offences that start with the passed offence code
   */
  searchOffences: {
    parameters: {
      query: {
        searchString: string
        excludeLegislation?: boolean
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence'][]
        }
      }
    }
  }
  /**
   * Get the results of the most recent load
   * @description Get the results of the most recent load
   */
  findLoadResults: {
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['MostRecentLoadResult'][]
        }
      }
    }
  }
  /**
   * Get offence matching the passed ID
   * @description This endpoint will return the offence that matches the unique ID passed in
   */
  getOffenceById: {
    parameters: {
      path: {
        /**
         * @description The offence ID
         * @example 123456
         */
        offenceId: number
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence']
        }
      }
    }
  }
  /**
   * Get the HO Code associated with an offence code
   * @description This endpoint will return the HO Code associated with an offence code, could return null
   */
  getHoCodeByOffenceCode: {
    parameters: {
      path: {
        /**
         * @description The offence code
         * @example AA1256A
         */
        offenceCode: string
      }
    }
    responses: {
      /** @description Offence code exists and associated hoCode returned (could be null/empty) */
      200: {
        content: {
          'application/json': string
        }
      }
      /** @description No offence exists for the passed in offence code */
      404: {
        content: {
          'application/json': string
        }
      }
    }
  }
  /**
   * Get all offences matching the passed offence code, does a start with match
   * @description This endpoint will return the offences that start with the passed offence code
   */
  getOffencesByOffenceCode: {
    parameters: {
      path: {
        /**
         * @description The offence code
         * @example AA1256A
         */
        offenceCode: string
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence'][]
        }
      }
    }
  }
  /**
   * Get the unique offence matching the passed offence code
   * @description This endpoint will return the offence that matches the unique code passed in
   */
  getOffenceByCode: {
    parameters: {
      path: {
        /**
         * @description The offence Code
         * @example COML025
         */
        offenceCode: string
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence']
        }
      }
    }
  }
  /**
   * Get a list of offences that match the passed in list of offence codes
   * @description This endpoint will return the offences that match the codes passed in
   */
  getOffencesByCodes: {
    parameters: {
      query: {
        offenceCodes: string[]
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence'][]
        }
      }
    }
  }
  /** Fetch changes pushed to NOMIS between a from and to date range (to defaults to now) */
  getOffencesByOffenceCode_1: {
    parameters: {
      query: {
        from: string
        to?: string
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['NomisChangeHistory'][]
        }
      }
    }
  }
  /** Get values of all feature toggles */
  getAllToggles: {
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['FeatureToggle'][]
        }
      }
    }
  }
}
