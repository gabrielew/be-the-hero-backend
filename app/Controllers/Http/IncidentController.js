"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Incident = use("App/Models/Incident");
/**
 * Resourceful controller for interacting with incidents
 */
class IncidentController {
  /**
   * Show a list of all incidents.
   * GET incidents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const { page = 1 } = request.get();

    const savedCount = await Incident.query()
      .where("saved", false)
      .getCount();

    const incidents = await Incident.query()
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ])
      .fetch();
    response.header("X-Total-Count", savedCount);
    return incidents;
  }

  /**
   * Create/save a new incident.
   * POST incidents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["title", "description", "value"]);
    data.ong_id = auth.user.id;
    const { title, description, value, ong_id } = await Incident.create(data);

    return { title, description, value, ong_id };
  }

  /**
   * Display a single incident.
   * GET incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update incident details.
   * PUT or PATCH incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a incident with id.
   * DELETE incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    const incident = await Incident.find(params.id);
    if (!incident) {
      return { status: "error", message: "Not found" };
    } else if (incident.ong_id === auth.user.id) {
      incident.delete();
      return { status: "ok", message: "Deleted" };
    } else {
      return response
        .status(401)
        .json({ error: "error", message: "Operation not permitted" });
    }
  }
}

module.exports = IncidentController;
