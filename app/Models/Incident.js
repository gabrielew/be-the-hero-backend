"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Incident extends Model {
  ong() {
    return this.belongsTo("App/Models/Ong", "ong_id", "id");
  }
}

module.exports = Incident;
