import { FlowInstance } from 'twilio/lib/rest/studio/v1/flow';
/**
 * This function retrieves a list of all Studio Flows from the Twilio API.
 *
 * @example
 * const allStudioFlows = await getAllStudioFlows()
 */
export declare function getAllStudioFlows(): Promise<[] | FlowInstance[]>;
/**
 * This function retrieves a Studio Flow using its ID and returns a Promise that resolves with the Flow
 * object.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export declare function getStudioFlow(studioFlowSid: string): Promise<import("twilio/lib/rest/studio/v2/flow").FlowInstance | undefined>;
