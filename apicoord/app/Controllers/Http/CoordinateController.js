'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Coordinate = use('App/Models/Coordinate')
const { validateAll } = use('Validator')

/**
 * Resourceful controller for interacting with coordinates
 */
class CoordinateController {
  /**
   * Show a list of all coordinates.
   * GET coordinates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const { date } = request.get()

    const query = Coordinate.query()

    if (date) query.where('dateTime', date)

    return await query.fetch()
  }

  /**
   * Create/save a new coordinate.
   * POST coordinates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['latitude', 'longitude', 'dateTime'])

    const validation = await validateAll(data, {
      latitude: 'required',
      longitude: 'required',
      dateTime: 'required'
    })

    if (validation.fails())
      return response.status(400).json(validation.messages())

    const coordinate = await Coordinate.create(data)
    return response.status(201).json(coordinate)
  }

  /**
   * Display a single coordinate.
   * GET coordinates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    return await Coordinate.findOrFail(params.id)
  }

  /**
   * Delete a coordinate with id.
   * DELETE coordinates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const coordinate = await Coordinate.findOrFail(params.id)
    await coordinate.delete()

    return response.json({ message: 'Coordinate deleted' })
  }
}

module.exports = CoordinateController
