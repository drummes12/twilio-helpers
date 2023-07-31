import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace';
/**
 * Fetches a specific task from a Twilio TaskRouter workspace.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * try {
 *   const task = await fetchTask(workspace, 'WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
 *   console.log('Task fetched successfully:', task);
 * } catch (error) {
 *   console.error('Error fetching task:', error.message);
 * }
 */
export declare function fetchTask(workspace: WorkspaceContext, taskSid: string): Promise<import("twilio/lib/rest/taskrouter/v1/workspace/task").TaskInstance>;
/**
 * Finds tasks in a Twilio TaskRouter workspace that are evaluating specified attributes.
 *
 * @example
 * // Assuming 'workspace' are already defined:
 *
 * const evaluateTaskAttributes = '(language == "en" OR language == "fr") AND skill_rating >= 5.1'
 *
 * try {
 *   const tasks = await findTaskEvaluatingAttributes(workspace, evaluateTaskAttributes, 10);
 *   console.log('Matching tasks found:', tasks);
 * } catch (error) {
 *   console.error('Error finding tasks:', error.message);
 * }
 */
export declare function findTaskEvaluatingAttributes(workspace: WorkspaceContext, evaluateTaskAttributes: string, limit?: number): Promise<import("twilio/lib/rest/taskrouter/v1/workspace/task").TaskInstance[]>;
