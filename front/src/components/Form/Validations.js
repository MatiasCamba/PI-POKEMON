

export const nameValidation = (name) => {
  if(name.length > 20){
   return 'Error on name field'
  }
   return  /^[a-zA-Z\s]+$/.test(name)
}

export const imageValidation = (url) => {
   return /^(http|https):\/\/[^ "]+$/.test(url)
}

export const statsValidation = (value) => {
   return /^\d+$/.test(value)
}

export const typeValidation = (types) => {
   const allowedTypes = /^(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|unknown|shadow)$/;

   return types.every((type) => allowedTypes.test(type));
}
