"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspace = exports.initializerWorkspace = void 0;
const twilio_1 = require("../twilio");
const utils_1 = require("../../utils");
const schemas_1 = require("../../schemas");
let workspace = null;
exports.workspace = workspace;
/**
 * This function initializes a Workspace with a given  SID and returns the Context
 * object.
 *
 * @example
 * const workspace = await initializerWorkspace('WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
 */
function initializerWorkspace(workspaceSid) {
    (0, utils_1.validateClientTwilio)();
    (0, utils_1.validateVariables)(schemas_1.schemaWorkspaceSid, workspaceSid, 'initializerWorkspace');
    exports.workspace = workspace = twilio_1.client?.taskrouter.v1.workspaces(workspaceSid) ?? null;
    return workspace;
}
exports.initializerWorkspace = initializerWorkspace;
