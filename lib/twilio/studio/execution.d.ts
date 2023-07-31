import { FlowInstance } from 'twilio/lib/rest/studio/v1/flow';
import { CreateExecutionStudioFlowOptions } from '../../types';
/**
 * This function retrieves all executions of a given Studio flow using pagination.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const allExecutionsStudioFlow = await getExecutionsStudioFlow(studioFlow)
 */
export declare function getExecutionsStudioFlow(studioFlow: FlowInstance): Promise<any>;
/**
 * This function creates a new execution for a given studio flow with specified parameters and error
 * handling.
 *
 * @example
 * const studioFlow = await getStudioFlow('FWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 * const executionStudioFlow = await createExecutionStudioFlow(studioFlow, {
 *  from: 'whatsapp:+1234567890',
 *  to: 'whatsapp:+1234567890',
 *  parameters: {
 *    test: 'test',
 *  }
 * })
 */
export declare function createExecutionStudioFlow(studioFlow: FlowInstance, { to, from, parameters }: CreateExecutionStudioFlowOptions): Promise<import("twilio/lib/rest/studio/v1/flow/execution").ExecutionInstance>;
