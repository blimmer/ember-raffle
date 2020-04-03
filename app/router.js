import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route("raffles", function () {
    this.route("raffle", { path: ":raffle_id" }, function () {
      this.route("setup", function () {
        this.route("add-participants");
        this.route("confirm-participants");
        this.route("settings");
      });
      this.route("ready-for-drawing");
      this.route("run-drawing");
      this.route("winners");
    });
  });
});

export default Router;
