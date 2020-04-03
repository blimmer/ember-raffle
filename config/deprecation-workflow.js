/* eslint-env browser */

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchId: "application-controller.router-properties" },
    { handler: "silence", matchId: "ember-intl.translationMacro" },
    { handler: "silence", matchId: "computed-property.override" },
    { handler: "silence", matchId: "ember-component.send-action" },
  ],
};
