let ActionTypes = {};
[
  'REQUEST_CLI_INSTRUCTIONS',
  'REQUEST_CONFIG_ERROR',
  'REQUEST_CONFIG_SUCCESS',
  'REQUEST_COSMOS_PACKAGE_DESCRIBE_ERROR',
  'REQUEST_COSMOS_PACKAGE_DESCRIBE_SUCCESS',
  'REQUEST_COSMOS_PACKAGE_INSTALL_ERROR',
  'REQUEST_COSMOS_PACKAGE_INSTALL_SUCCESS',
  'REQUEST_COSMOS_PACKAGE_UNINSTALL_ERROR',
  'REQUEST_COSMOS_PACKAGE_UNINSTALL_SUCCESS',
  'REQUEST_COSMOS_PACKAGES_LIST_ERROR',
  'REQUEST_COSMOS_PACKAGES_LIST_SUCCESS',
  'REQUEST_COSMOS_PACKAGES_SEARCH_ERROR',
  'REQUEST_COSMOS_PACKAGES_SEARCH_SUCCESS',
  'REQUEST_COSMOS_REPOSITORIES_LIST_ERROR',
  'REQUEST_COSMOS_REPOSITORIES_LIST_SUCCESS',
  'REQUEST_COSMOS_REPOSITORY_ADD_ERROR',
  'REQUEST_COSMOS_REPOSITORY_ADD_SUCCESS',
  'REQUEST_COSMOS_REPOSITORY_DELETE_ERROR',
  'REQUEST_COSMOS_REPOSITORY_DELETE_SUCCESS',
  'REQUEST_CHRONOS_JOBS_ERROR',
  'REQUEST_CHRONOS_JOBS_ONGOING',
  'REQUEST_CHRONOS_JOBS_SUCCESS',
  'REQUEST_DCOS_METADATA',
  'REQUEST_HEALTH_NODE_ERROR',
  'REQUEST_HEALTH_NODE_SUCCESS',
  'REQUEST_HEALTH_NODE_UNIT_ERROR',
  'REQUEST_HEALTH_NODE_UNIT_SUCCESS',
  'REQUEST_HEALTH_NODE_UNITS_ERROR',
  'REQUEST_HEALTH_NODE_UNITS_SUCCESS',
  'REQUEST_HEALTH_NODES_ERROR',
  'REQUEST_HEALTH_NODES_SUCCESS',
  'REQUEST_HEALTH_UNIT_ERROR',
  'REQUEST_HEALTH_UNIT_NODE_ERROR',
  'REQUEST_HEALTH_UNIT_NODE_SUCCESS',
  'REQUEST_HEALTH_UNIT_NODES_ERROR',
  'REQUEST_HEALTH_UNIT_NODES_SUCCESS',
  'REQUEST_HEALTH_UNIT_SUCCESS',
  'REQUEST_HEALTH_UNITS_ERROR',
  'REQUEST_HEALTH_UNITS_SUCCESS',
  'REQUEST_LOGIN_ERROR',
  'REQUEST_LOGIN_SUCCESS',
  'REQUEST_LOGOUT_ERROR',
  'REQUEST_LOGOUT_SUCCESS',
  'REQUEST_MARATHON_GROUP_CREATE_ERROR',
  'REQUEST_MARATHON_GROUP_CREATE_SUCCESS',
  'REQUEST_MARATHON_GROUPS',
  'REQUEST_MARATHON_GROUPS_ERROR',
  'REQUEST_MARATHON_GROUPS_ONGOING',
  'REQUEST_MARATHON_GROUPS_SUCCESS',
  'REQUEST_MARATHON_DEPLOYMENTS',
  'REQUEST_MARATHON_DEPLOYMENTS_ERROR',
  'REQUEST_MARATHON_DEPLOYMENTS_ONGOING',
  'REQUEST_MARATHON_DEPLOYMENTS_SUCCESS',
  'REQUEST_MARATHON_QUEUE_SUCCESS',
  'REQUEST_MARATHON_QUEUE_ERROR',
  'REQUEST_MARATHON_QUEUE_ONGOING',
  'REQUEST_MARATHON_SERVICE_CREATE_ERROR',
  'REQUEST_MARATHON_SERVICE_CREATE_SUCCESS',
  'REQUEST_MARATHON_SERVICE_VERSION_ERROR',
  'REQUEST_MARATHON_SERVICE_VERSION_SUCCESS',
  'REQUEST_MARATHON_SERVICE_VERSIONS_ERROR',
  'REQUEST_MARATHON_SERVICE_VERSIONS_SUCCESS',
  'REQUEST_SUMMARY_HISTORY_SUCCESS',
  'REQUEST_MESOS_LOG_ERROR',
  'REQUEST_MESOS_LOG_OFFSET_ERROR',
  'REQUEST_MESOS_LOG_OFFSET_SUCCESS',
  'REQUEST_MESOS_LOG_SUCCESS',
  'REQUEST_MESOS_STATE_ERROR',
  'REQUEST_MESOS_STATE_ONGOING',
  'REQUEST_MESOS_STATE_SUCCESS',
  'REQUEST_SUMMARY_ERROR',
  'REQUEST_SUMMARY_ONGOING',
  'REQUEST_SUMMARY_SUCCESS',
  'REQUEST_METADATA',
  'REQUEST_PREVIOUS_MESOS_LOG_ERROR',
  'REQUEST_PREVIOUS_MESOS_LOG_SUCCESS',
  'REQUEST_SIDEBAR_CLOSE',
  'REQUEST_SIDEBAR_CLOSE',
  'REQUEST_SIDEBAR_OPEN',
  'REQUEST_SIDEBAR_OPEN',
  'REQUEST_TASK_DIRECTORY_ERROR',
  'REQUEST_TASK_DIRECTORY_SUCCESS',
  'REQUEST_USER_CREATE_ERROR',
  'REQUEST_USER_CREATE_SUCCESS',
  'REQUEST_USER_DELETE_ERROR',
  'REQUEST_USER_DELETE_SUCCESS',
  'REQUEST_USERS_ERROR',
  'REQUEST_USERS_SUCCESS',
  'REQUEST_VERSIONS_ERROR',
  'REQUEST_VERSIONS_SUCCESS',
  'SERVER_ACTION',
  'SIDEBAR_WIDTH_CHANGE',
  'SIDEBAR_ACTION'
].forEach(function (actionType) {
  ActionTypes[actionType] = actionType;
});

module.exports = ActionTypes;
