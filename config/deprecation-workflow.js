window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    // https://github.com/DockYard/ember-route-action-helper/issues/54
    { handler: "silence", matchId: "ember-router.router" }
  ]
};
