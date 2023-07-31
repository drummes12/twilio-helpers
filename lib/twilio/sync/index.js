"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncService = exports.initializerSyncService = void 0;
const twilio_1 = require("../twilio");
const utils_1 = require("../../utils");
const schemas_1 = require("../../schemas");
let syncService = null;
exports.syncService = syncService;
/**
 * This function initializes a Sync service with a given service SID and returns the Sync service
 * object.
 *
 * @example
 * const syncService = await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
function initializerSyncService(serviceSid) {
    (0, utils_1.validateClientTwilio)();
    (0, utils_1.validateVariables)(schemas_1.schemaSyncServiceSid, serviceSid, 'initializerSyncService');
    exports.syncService = syncService = twilio_1.client?.sync.v1.services(serviceSid) ?? null;
    return syncService;
}
exports.initializerSyncService = initializerSyncService;
