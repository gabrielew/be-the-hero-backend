"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.resource("ongs", "OngController").apiOnly();

Route.get("incidents", "IncidentController.index");

Route.group(() => {
  Route.resource("incidents", "IncidentController").only([
    "index",
    "store",
    "destroy"
  ]);
  // Route.post("incidents", "IncidentController.store");
  // Route.delete("incidents", "IncidentController.delete");
  Route.get("profile", "ProfileController.index");
}).middleware(["auth"]);

Route.post("sessions", "SessionController.session");
