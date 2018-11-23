'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoordinateSchema extends Schema {
  up () {
    this.create('coordinates', (table) => {
      table.increments()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      table.datetime('dateTime').notNullable()
    })
  }

  down () {
    this.drop('coordinates')
  }
}

module.exports = CoordinateSchema
