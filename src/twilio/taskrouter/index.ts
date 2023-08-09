
import { client } from '../twilio'
import { validateClientTwilio, validateVariables } from '../../common/utils'
import { schemaWorkspaceSid } from '../../common/schemas'
import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace'

let workspace: WorkspaceContext | null = null

/**
 * This function initializes a Workspace with a given  SID and returns the Context
 * object.
 *
 * @example
 * const workspace = await initializerWorkspace('WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
export function initializerWorkspace (workspaceSid: string) {
  validateClientTwilio()
  validateVariables(schemaWorkspaceSid, workspaceSid, 'initializerWorkspace')

  workspace = client?.taskrouter.v1.workspaces(workspaceSid) ?? null
  return workspace
}

export { workspace }

export * as task from './task'
export * as worker from './worker'
export * as taskQueue from './taskQueue'
