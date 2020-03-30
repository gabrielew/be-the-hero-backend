"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Ong = use("App/Models/Ong");
/**
 * Resourceful controller for interacting with ongs
 */
class OngController {
  /**
   * Show a list of all ongs.
   * GET ongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({}) {
    const ongs = await Ong.query()
      .select(["email", "name", "whatsapp", "city", "uf"])
      .fetch();
    return ongs;
  }
  /**
   * Create/save a new ong.
   * POST ongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "email",
      "password",
      "name",
      "whatsapp",
      "city",
      "uf"
    ]);
    const { email, name, whatsapp, city, uf } = await Ong.create(data);
    return { email, name, whatsapp, city, uf };
  }

  /**
   * Display a single ong.
   * GET ongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update ong details.
   * PUT or PATCH ongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a ong with id.
   * DELETE ongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = OngController;
