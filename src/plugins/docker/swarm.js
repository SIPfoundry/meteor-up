import nodemiral from 'nodemiral';

export function addManagers(managers, host, api) {
  const list = nodemiral.taskList('Setting Up Docker Swarm');
  const sessions = api.getSessionsForServers(managers);

  list.executeScript('Creating Manager', {
    script: api.resolvePath(__dirname, 'assets/init-swarm.sh'),
    vars: {
      host
    }
  });

  return api.runTaskList(list, sessions, { verbose: api.getVerbose() });
}

export function removeManagers(managers, api) {
  const list = nodemiral.taskList('Removing Swarm Managers');
  const sessions = api.getSessionsForServers(managers);

  list.executeScript('Removing Managers', {
    scripts: api.resolvePath(__dirname, 'assets/swarm-leave.sh')
  });

  return api.runTaskList(list, sessions, { verbose: api.getVerbose() });
}

export function joinNodes(servers, token, managerIP, api) {
  const list = nodemiral.taskList('Add Swarm Nodes');
  const sessions = api.getSessionsForServers(servers);

  list.executeScript('Joining node', {
    script: api.resolvePath(__dirname, 'assets/swarm-join.sh'),
    vars: {
      token,
      managerIP
    }
  });

  return api.runTaskList(list, sessions, { verbose: api.getVerbose() });
}
