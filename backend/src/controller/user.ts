import { db } from '../config/db.server'

export const createUser = (
  firstName: string,
  lastName: string,
  birthday: Date,
  password: string
) => {
  return db.user.create({
    data: {
      firstName,
      lastName,
      birthday,
      password,
    },
  })
}
