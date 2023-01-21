import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'
export default class ClientsController {
  public async index(ctx: HttpContextContract) {
    return Client.all()
  }
  public async store({ request, response }: HttpContextContract) {
    const clientSchema = schema.create({
      name: schema.string({ trim: true }),
      address: schema.string({ trim: true }),
      phone: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: clientSchema })
    const client = await Client.create(payload)
    response.status(201)
    return client
  }

  public async show({ params }: HttpContextContract) {
    return await Client.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const clientSchema = schema.create({
      name: schema.string({ trim: true }),
      address: schema.string({ trim: true }),
      phone: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: clientSchema })
    const client = await Client.findOrFail(params.id)
    client.name = payload.name
    client.address = payload.address
    client.phone = payload.phone
    return client.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const pet = await Client.findOrFail(params.id)
    return pet.delete()
  }
}
