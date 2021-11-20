import bcrypt from 'bcryptjs'

const auth = {}

auth.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

auth.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.log(error)
  }
}

export default auth
