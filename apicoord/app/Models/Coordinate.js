'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Coordinate extends Model {
  static get createdAtColumn() {
    return false
  }

  static get updatedAtColumn() {
    return false
  }
}

module.exports = Coordinate
