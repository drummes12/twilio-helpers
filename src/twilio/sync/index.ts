import { ServiceContext } from 'twilio/lib/rest/sync/v1/service'

import { client } from '../twilio'
import { validateClientTwilio, validateVariables } from '../../common/utils'
import { schemaSyncServiceSid } from '../../common/schemas'

let syncService: ServiceContext | null = null

/**
 * This function initializes a Sync service with a given service SID and returns the Sync service
 * object.
 *
 * @example
 * const syncService = await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export function initializerSyncService (serviceSid: string) {
  validateClientTwilio()
  validateVariables(schemaSyncServiceSid, serviceSid, 'initializerSyncService')

  syncService = client?.sync.v1.services(serviceSid) ?? null
  return syncService
}

export { syncService }

export * as map from './map'
