

export const nameValidation = (name) => {
   return  /^[a-zA-Z\s]+$/.test(name)
}

export const imageValidation = (url) => {
   return /^(http|https):\/\/[^ "]+$/.test(url)
}

export const statsValidation = (value) => {
   return /^\d+$/.test(value)
}

export const typeValidation = (types) => {
return types.includes('fire') || types.includes('water') || types.includes('grass') || types.includes('poison') || types.includes('fighting')
}