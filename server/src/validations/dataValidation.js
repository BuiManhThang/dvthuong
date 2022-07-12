const dataValidation = (schemaPaths, data) => {
  console.log(schemaPaths.fullName.validators)
  const errors = []
  for (const key in schemaPaths) {
    const field = schemaPaths[key]
    const validators = field.validators
    for (let index = 0; index < validators.length; index++) {
      const rule = validators[index]
      const isValid = rule.validator(data[key])
      console.log(isValid)
      if (!isValid) {
        const { validator, ...res } = rule
        let newMessage = res.message.replaceAll('`{PATH}`', key)
        newMessage = newMessage.replaceAll('`{VALUE}`', key)
        errors.push({
          ...res,
          message: newMessage,
          fieldName: key,
        })
        break
      }
    }
  }
  return errors
}

export default dataValidation
