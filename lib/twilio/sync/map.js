"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemMapSync = exports.fetchSyncMapItem = exports.createSyncMapItem = exports.ensureSyncMapExists = void 0;
const _1 = require(".");
const errors_1 = require("../../errors");
const schemas_1 = require("../../schemas");
const utils_1 = require("../../utils");
/**
 * Ensures that a Sync Map with the specified name exists in the specified Sync Service.
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 */
async function ensureSyncMapExists(MapName) {
    (0, utils_1.validateVariables)(schemas_1.schemaSyncService, _1.syncService, 'ensureSyncMapExists');
    (0, utils_1.validateVariables)(schemas_1.schemaString.required(), MapName, 'ensureSyncMapExists');
    try {
        return await _1.syncService?.syncMaps(MapName).fetch();
    }
    catch (error) {
        if (error.code === 20404) {
            return await _1.syncService?.syncMaps.create({ uniqueName: MapName });
        }
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ ensureSyncMapExists ~ ${message}`, { ...error });
    }
}
exports.ensureSyncMapExists = ensureSyncMapExists;
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
async function createSyncMapItem(syncMap, { key, data, itemTtl }) {
    (0, utils_1.validateVariables)(schemas_1.schemaSyncService, _1.syncService, 'createItemMapSync');
    (0, utils_1.validateVariables)(schemas_1.schemaCreateSyncMapItem, { syncMap, options: { key, data, itemTtl } }, 'createItemMapSync');
    return await syncMap
        .syncMapItems()
        .create({ key, data, itemTtl })
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ createSyncMapItem ~ ${message}`, { ...error });
    });
}
exports.createSyncMapItem = createSyncMapItem;
/**
 * Fetch an item in a Sync Map in Sync service
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const itemSyncMap = await fetchSyncMapItem(syncMap, 'test-item')
 */
async function fetchSyncMapItem(syncMap, key) {
    (0, utils_1.validateVariables)(schemas_1.schemaSyncService, _1.syncService, 'fetchSyncMapItem');
    (0, utils_1.validateVariables)(schemas_1.schemaSyncMapItem, { syncMap, key }, 'fetchSyncMapItem');
    return await syncMap
        .syncMapItems()
        .get(key)
        .fetch()
        .catch((error) => {
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ fetchSyncMapItem ~ ${message}`, { ...error });
    });
}
exports.fetchSyncMapItem = fetchSyncMapItem;
/**
 * Removes an item from a Sync Map in the Twilio API.
 *
 * @example
 * await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const syncMap = await ensureSyncMapExists('sync-map-name')
 * const wasRemovedItemSyncMap = await removeItemMapSync(syncMap, 'test-item')
 */
async function removeItemMapSync(syncMap, key) {
    (0, utils_1.validateVariables)(schemas_1.schemaSyncService, _1.syncService, 'removeItemMapSync');
    (0, utils_1.validateVariables)(schemas_1.schemaSyncMapItem, { syncMap, key }, 'removeItemMapSync');
    return await syncMap
        .syncMapItems()
        .get(key)
        .remove()
        .catch((error) => {
        if (error.code === 20404)
            return true;
        const message = error.message;
        throw new errors_1.TwilioError(`❌ ~ removeItemMapSync ~ ${message}`, { ...error });
    });
}
exports.removeItemMapSync = removeItemMapSync;
