import { SyncMapInstance } from 'twilio/lib/rest/sync/v1/service/syncMap';
import { CreateSyncMapItemOptions } from '../../types';
/**
 * Ensures that a Sync Map with the specified name exists in the specified Sync Service.
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 */
export declare function ensureSyncMapExists(MapName: string): Promise<SyncMapInstance | undefined>;
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
export declare function createSyncMapItem(syncMap: SyncMapInstance, { key, data, itemTtl }: CreateSyncMapItemOptions): Promise<import("twilio/lib/rest/sync/v1/service/syncMap/syncMapItem").SyncMapItemInstance>;
/**
 * Fetch an item in a Sync Map in Sync service
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const itemSyncMap = await fetchSyncMapItem(syncMap, 'test-item')
 */
export declare function fetchSyncMapItem(syncMap: SyncMapInstance, key: string): Promise<import("twilio/lib/rest/sync/v1/service/syncMap/syncMapItem").SyncMapItemInstance>;
/**
 * Removes an item from a Sync Map in the Twilio API.
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const wasRemovedItemSyncMap = await removeItemMapSync(syncMap, 'test-item')
 */
export declare function removeItemMapSync(syncMap: SyncMapInstance, key: string): Promise<boolean>;
