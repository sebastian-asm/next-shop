import { compareSync } from 'bcrypt'

import { db } from '.'
import { User } from '../models'

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect()
  const user = await User.findOne({ email })
  await db.disconnect()

  if (!user) return null
  if (!compareSync(password, user.password!)) return null

  const { role, name, _id } = user
  return {
    _id,
    email: email.toLowerCase(),
    role,
    name,
  }
}

// verificar usuario vía OAuth
export const verifyOAuth = async (authEmail: string, authName: string) => {
  await db.connect()
  const user = await User.findOne({ email: authEmail })

  if (user) {
    await db.disconnect()
    const { _id, name, email, role } = user
    return { _id, name, email, role }
  }

  // los usuarios de otras redes no es necesario el manejo del password en nuestra db
  const newUser = new User({
    email: authEmail,
    name: authName,
    role: 'client',
    password: undefined,
  })

  await newUser.save()
  await db.disconnect()

  const { _id, name, email, role } = newUser
  return { _id, name, email, role }
}
