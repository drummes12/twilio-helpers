import { ServiceContext } from 'twilio/lib/rest/sync/v1/service';
declare let syncService: ServiceContext | null;
/**
 * This function initializes a Sync service with a given service SID and returns the Sync service
 * object.
 *
 * @example
 * const syncService = await initializerSyncService('ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export declare function initializerSyncService(serviceSid: string): ServiceContext | null;
export { syncService };
