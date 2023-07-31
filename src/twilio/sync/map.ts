import { SyncMapInstance } from "twilio/lib/rest/sync/v1/service/syncMap"
import { syncService } from "."
import { TwilioError } from "../../errors"
import { schemaCreateSyncMapItem, schemaString, schemaSyncMapItem, schemaSyncService } from "../../schemas"
import { validateVariables } from "../../utils"
import { CreateSyncMapItemOptions } from "../../types"


/**
 * Ensures that a Sync Map with the specified name exists in the specified Sync Service.
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 */
export async function ensureSyncMapExists(MapName: string) {
  validateVariables(schemaSyncService, syncService, 'ensureSyncMapExists')
  validateVariables(schemaString.required(), MapName, 'ensureSyncMapExists')

  try {
    return await syncService?.syncMaps(MapName).fetch()
  } catch (error: any) {
    if (error.code === 20404) {
      return await syncService?.syncMaps.create({ uniqueName: MapName })
    }
    throw new TwilioError(`❌ ~ ensureSyncMapExists ~ ${error.message}`, { ...error })
  }
}

/**
 * Creates an item in a Sync Map in Sync service
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const itemSyncMap = await createSyncMapItem(syncMap, {
 *  key: 'test-item',
 *  data: { test: 'example' },
 *  itemTtl: 3600,
 * })
 */
export function createSyncMapItem(syncMap: SyncMapInstance, { key, data, itemTtl }: CreateSyncMapItemOptions) {
  validateVariables(schemaSyncService, syncService, 'createSyncMapItem')
  validateVariables(schemaCreateSyncMapItem, { syncMap, options: { key, data, itemTtl } }, 'createItemMapSync')

  return syncMap
    .syncMapItems()
    .create({ key, data, itemTtl })
    .catch((error) => {
      throw new TwilioError(`❌ ~ createSyncMapItem ~ ${error.message}`, { ...error })
    })
}

/**
 * Fetch an item in a Sync Map in Sync service
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const itemSyncMap = await fetchSyncMapItem(syncMap, 'test-item')
 */
export function fetchSyncMapItem(syncMap: SyncMapInstance, key: string) {
  validateVariables(schemaSyncService, syncService, 'fetchSyncMapItem')
  validateVariables(schemaSyncMapItem, { syncMap, key }, 'fetchSyncMapItem')

  return syncMap
    .syncMapItems()
    .get(key)
    .fetch()
    .catch((error) => {
      throw new TwilioError(`❌ ~ fetchSyncMapItem ~ ${error.message}`, { ...error })
    })
}

/**
 * Removes an item from a Sync Map in the Twilio API.
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const wasRemovedItemSyncMap = await removeItemMapSync(syncMap, 'test-item')
 */
export function removeItemMapSync(syncMap: SyncMapInstance, key: string) {
  validateVariables(schemaSyncService, syncService, 'removeItemMapSync')
  validateVariables(schemaSyncMapItem, { syncMap, key }, 'removeItemMapSync')

  return syncMap
    .syncMapItems()
    .get(key)
    .remove()
    .catch((error) => {
      if (error.code === 20404) return true
      throw new TwilioError(`❌ ~ removeItemMapSync ~ ${error.message}`, { ...error })
    })
}