import { db } from '../config/db.server'
import { User } from '@prisma/client'
import crypto from 'crypto'

export const getAllUsers = () => {
  return db.user.findMany()
}

export const createUser = (user: User) => {
  const createBody = { ...user }
  createBody.password = crypto
    .createHash('sha256')
    .update(user.password)
    .digest('base64')
  return db.user.create({
    data: {
      ...createBody,
    },
  })
}

export const findUserByEmailAndPassword = (email: string, password: string) => {
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')

  return db.user.findUnique({
    where: { email, password: hashedPassword },
  })
}

export const findUserById = (id: number) =>
  db.user.findUnique({ where: { id } })

export const findUserByEmail = (email: string) =>
  db.user.findUnique({ where: { email } })

export const updateUserByEmail = (user: User, id: number) => {
  return db.user.update({
    data: user,
    where: {
      email: user.email,
      id,
    },
  })
}

export const deleteUserById = (id: number) => {
  return db.user.delete({ where: { id } })
}
