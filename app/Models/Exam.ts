import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TypeExam from 'App/Models/TypeExam'

export default class Exam extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_exams_id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => TypeExam)
  public typeExam: HasMany<typeof TypeExam>
}
