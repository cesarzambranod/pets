import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Exam from 'App/Models/Exam'
export default class ExamsController {
  public async index() {
    return Exam.all()
  }
  public async store({ request, response }: HttpContextContract) {
    const examSchema = schema.create({
      name: schema.string({ trim: true }),
      type_exams_id: schema.number(),
    })
    const payload = await request.validate({ schema: examSchema })
    const exam = await Exam.create(payload)
    response.status(201)
    return exam
  }

  public async show({ params }: HttpContextContract) {
    return await Exam.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const examSchema = schema.create({
      name: schema.string({ trim: true }),
      type_exams_id: schema.number(),
    })
    const payload = await request.validate({ schema: examSchema })
    const exam = await Exam.findOrFail(params.id)
    exam.name = payload.name
    exam.type_exams_id = payload.type_exams_id
    return exam.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const pet = await Exam.findOrFail(params.id)
    return pet.delete()
  }
}
