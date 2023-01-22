import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import TypeExam from 'App/Models/TypeExam'
export default class TypeExamsController {
  public async index() {
    return TypeExam.all()
  }
  public async store({ request, response }: HttpContextContract) {
    const typeExamSchema = schema.create({
      name: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: typeExamSchema })
    const typeExam = await TypeExam.create(payload)
    response.status(201)
    return typeExam
  }

  public async show({ params }: HttpContextContract) {
    return await TypeExam.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const typeExamSchema = schema.create({
      name: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: typeExamSchema })
    const typeExam = await TypeExam.findOrFail(params.id)
    typeExam.name = payload.name
    return typeExam.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const pet = await TypeExam.findOrFail(params.id)
    return pet.delete()
  }
}
