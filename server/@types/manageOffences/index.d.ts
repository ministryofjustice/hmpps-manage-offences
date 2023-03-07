/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/queue-admin/retry-dlq/{dlqName}': {
    put: operations['retryDlq']
  }
  '/queue-admin/retry-all-dlqs': {
    put: operations['retryAllDlqs']
  }
  '/queue-admin/purge-queue/{queueName}': {
    put: operations['purgeQueue']
  }
  '/admin/toggle-feature': {
    put: operations['toggleFeature']
  }
  '/schedule/unlink-offences': {
    post: operations['unlinkOffences']
  }
  '/schedule/link-offence': {
    post: operations['linkOffences']
  }
  '/schedule/create': {
    post: operations['createSchedule']
  }
  '/schedule/offence-mapping/id/{offenceId}': {
    /** This endpoint will return the offence that matches the unique ID passed in */
    get: operations['getOffenceToScheduleMapping']
  }
  '/schedule/by-id/{scheduleId}': {
    get: operations['findScheduleById']
  }
  '/schedule/all': {
    get: operations['findAllSchedules']
  }
  '/queue-admin/get-dlq-messages/{dlqName}': {
    get: operations['getDlqMessages']
  }
  '/offences/load-results': {
    /** Get the results of the most recent load */
    get: operations['findLoadResults']
  }
  '/offences/id/{offenceId}': {
    /** This endpoint will return the offence that matches the unique ID passed in */
    get: operations['getOffenceById']
  }
  '/offences/ho-code/{offenceCode}': {
    /** This endpoint will return the HO Code associated with an offence code, could return null */
    get: operations['getHoCodeByOffenceCode']
  }
  '/offences/code/{offenceCode}': {
    /** This endpoint will return the offences that start with the passed offence code */
    get: operations['getOffencesByOffenceCode']
  }
  '/change-history/nomis': {
    get: operations['getOffencesByOffenceCode_1']
  }
  '/admin/feature-toggles': {
    get: operations['getAllToggles']
  }
}

export interface components {
  schemas: {
    Message: {
      messageId?: string
      receiptHandle?: string
      body?: string
      attributes?: { [key: string]: string }
      messageAttributes?: {
        [key: string]: components['schemas']['MessageAttributeValue']
      }
      md5OfBody?: string
      md5OfMessageAttributes?: string
    }
    MessageAttributeValue: {
      stringValue?: string
      binaryValue?: {
        /** Format: int32 */
        short?: number
        char?: string
        /** Format: int32 */
        int?: number
        /** Format: int64 */
        long?: number
        /** Format: float */
        float?: number
        /** Format: double */
        double?: number
        direct?: boolean
        readOnly?: boolean
      }
      stringListValues?: string[]
      binaryListValues?: {
        /** Format: int32 */
        short?: number
        char?: string
        /** Format: int32 */
        int?: number
        /** Format: int64 */
        long?: number
        /** Format: float */
        float?: number
        /** Format: double */
        double?: number
        direct?: boolean
        readOnly?: boolean
      }[]
      dataType?: string
    }
    RetryDlqResult: {
      /** Format: int32 */
      messagesFoundCount: number
      messages: components['schemas']['Message'][]
    }
    PurgeQueueResult: {
      /** Format: int32 */
      messagesFoundCount: number
    }
    /** @description Feature toggle details */
    FeatureToggle: {
      /**
       * @description Feature to be toggled: FULL_SYNC_NOMIS, DELTA_SYNC_NOMIS, FULL_SYNC_SDRS or DELTA_SYNC_SDRS
       * @enum {string}
       */
      feature: 'FULL_SYNC_NOMIS' | 'DELTA_SYNC_NOMIS' | 'FULL_SYNC_SDRS' | 'DELTA_SYNC_SDRS'
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
      /**
       * Format: int32
       * @description Schedule paragraph number that this offence is mapped to
       */
      paragraphNumber?: number
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
      /** Format: int32 */
      paragraphNumber?: number
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
      /** @description The line reference for the associated schedule's legislation */
      lineReference?: string
      /** @description The legislation text for the associated schedule */
      legislationText?: string
      /** @description Schedule paragraph title that this offence is mapped to */
      paragraphTitle?: string
      /**
       * Format: int32
       * @description Schedule paragraph number that this offence is mapped to
       */
      paragraphNumber?: number
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
    DlqMessage: {
      body: { [key: string]: { [key: string]: unknown } }
      messageId: string
    }
    GetDlqResult: {
      /** Format: int32 */
      messagesFoundCount: number
      /** Format: int32 */
      messagesReturnedCount: number
      messages: components['schemas']['DlqMessage'][]
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
}

export interface operations {
  retryDlq: {
    parameters: {
      path: {
        dlqName: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          '*/*': components['schemas']['RetryDlqResult']
        }
      }
    }
  }
  retryAllDlqs: {
    responses: {
      /** OK */
      200: {
        content: {
          '*/*': components['schemas']['RetryDlqResult'][]
        }
      }
    }
  }
  purgeQueue: {
    parameters: {
      path: {
        queueName: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          '*/*': components['schemas']['PurgeQueueResult']
        }
      }
    }
  }
  toggleFeature: {
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['FeatureToggle'][]
      }
    }
  }
  unlinkOffences: {
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['SchedulePartIdAndOffenceId'][]
      }
    }
  }
  linkOffences: {
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['LinkOffence']
      }
    }
  }
  createSchedule: {
    responses: {
      /** OK */
      200: unknown
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['Schedule']
      }
    }
  }
  /** This endpoint will return the offence that matches the unique ID passed in */
  getOffenceToScheduleMapping: {
    parameters: {
      path: {
        /** The offence ID */
        offenceId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['OffenceToScheduleMapping']
        }
      }
    }
  }
  findScheduleById: {
    parameters: {
      path: {
        /** The schedule ID */
        scheduleId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Schedule']
        }
      }
    }
  }
  findAllSchedules: {
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Schedule'][]
        }
      }
    }
  }
  getDlqMessages: {
    parameters: {
      path: {
        dlqName: string
      }
      query: {
        maxMessages?: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          '*/*': components['schemas']['GetDlqResult']
        }
      }
    }
  }
  /** Get the results of the most recent load */
  findLoadResults: {
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['MostRecentLoadResult'][]
        }
      }
    }
  }
  /** This endpoint will return the offence that matches the unique ID passed in */
  getOffenceById: {
    parameters: {
      path: {
        /** The offence ID */
        offenceId: number
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence']
        }
      }
    }
  }
  /** This endpoint will return the HO Code associated with an offence code, could return null */
  getHoCodeByOffenceCode: {
    parameters: {
      path: {
        /** The offence code */
        offenceCode: string
      }
    }
    responses: {
      /** Offence code exists and associated hoCode returned (could be null/empty) */
      200: {
        content: {
          'application/json': string
        }
      }
      /** No offence exists for the passed in offence code */
      404: {
        content: {
          'application/json': string
        }
      }
    }
  }
  /** This endpoint will return the offences that start with the passed offence code */
  getOffencesByOffenceCode: {
    parameters: {
      path: {
        /** The offence code */
        offenceCode: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['Offence'][]
        }
      }
    }
  }
  getOffencesByOffenceCode_1: {
    parameters: {
      query: {
        from: string
        to?: string
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['NomisChangeHistory'][]
        }
      }
    }
  }
  getAllToggles: {
    responses: {
      /** OK */
      200: {
        content: {
          'application/json': components['schemas']['FeatureToggle'][]
        }
      }
    }
  }
}
