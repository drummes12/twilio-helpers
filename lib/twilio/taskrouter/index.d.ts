import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace';
declare let workspace: WorkspaceContext | null;
/**
 * This function initializes a Workspace with a given  SID and returns the Context
 * object.
 *
 * @example
 * const workspace = await initializerWorkspace('WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export declare function initializerWorkspace(workspaceSid: string): WorkspaceContext | null;
export { workspace };
