import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const newUserSchema = schema.create({
      email: schema.string([rules.email()]),
      password: schema.string([rules.confirmed(), rules.minLength(4)]),
    })

    const payload = await request.validate({
      schema: newUserSchema,
    })

    const user = await User.create(payload)
    return user
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30 mins',
      })
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').logout()
    response.status(200)
    return 'logout'
  }
}
