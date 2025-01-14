import Joi from 'joi';

export const dashboardValidation = {
  updateLayout: {
    body: Joi.object({
      widgets: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          type: Joi.string().required(),
          position: Joi.object({
            x: Joi.number().required(),
            y: Joi.number().required(),
            width: Joi.number().required(),
            height: Joi.number().required()
          }).required(),
          config: Joi.object().required()
        })
      ).required()
    })
  }
};
