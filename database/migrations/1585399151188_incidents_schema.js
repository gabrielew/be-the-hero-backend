"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class IncidentsSchema extends Schema {
  up() {
    this.create("incidents", table => {
      table.increments();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.decimal("value").notNullable();
      table.boolean("saved").defaultTo(false);
      table
        .integer("ong_id")
        .notNullable()
        .references("id")
        .inTable("ongs");
      table.timestamps();
    });
  }

  down() {
    this.drop("incidents");
  }
}

module.exports = IncidentsSchema;
