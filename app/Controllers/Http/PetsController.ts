import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Pet from 'App/Models/Pet'

export default class PetsController {
  public async index() {
    return Pet.all()
  }
  public async store({ request, response }: HttpContextContract) {
    const petSchema = schema.create({
      name: schema.string({ trim: true }),
      client_id: schema.number(),
    })
    const payload = await request.validate({ schema: petSchema })
    const pet = await Pet.create(payload)
    response.status(201)
    return pet
  }

  public async show({ params }: HttpContextContract) {
    return await Pet.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const petSchema = schema.create({
      name: schema.string({ trim: true }),
      client_id: schema.number(),
    })
    const payload = await request.validate({ schema: petSchema })
    const pet = await Pet.findOrFail(params.id)
    pet.name = payload.name
    pet.client_id = payload.client_id
    return pet.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    return pet.delete()
  }
}
