import * as Joi from 'joi';

const incorrectValueMessage = 'Incorrect email or password';
const emptyFieldMessage = 'All fields must be filled';

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.empty': emptyFieldMessage,
    'string.email': incorrectValueMessage,
  }),
  password: Joi.string().min(7).required().messages({
    'string.empty': emptyFieldMessage,
    'string.min': incorrectValueMessage,
  }),
});

export default loginSchema;
