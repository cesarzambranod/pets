import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import MedicalHistory from 'App/Models/MedicalHistory'

export default class MedicalHistoriesController {
  public async index(ctx: HttpContextContract) {
    return MedicalHistory.all()
  }
  public async store({ request, response }: HttpContextContract) {
    const medicalHistorySchema = schema.create({
      description: schema.string({ trim: true }),
      pets_id: schema.number(),
    })
    const payload = await request.validate({ schema: medicalHistorySchema })
    const medicalHistory = await MedicalHistory.create(payload)
    response.status(201)
    return medicalHistory
  }

  public async show({ params }: HttpContextContract) {
    return await MedicalHistory.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const medicalHistorySchema = schema.create({
      description: schema.string({ trim: true }),
      pets_id: schema.number(),
    })
    const payload = await request.validate({ schema: medicalHistorySchema })
    const medicalHistory = await MedicalHistory.findOrFail(params.id)
    medicalHistory.description = payload.description
    medicalHistory.pets_id = payload.pets_id
    return medicalHistory.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const pet = await MedicalHistory.findOrFail(params.id)
    return pet.delete()
  }
}
