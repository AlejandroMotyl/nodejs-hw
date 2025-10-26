import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page should have at least {#limit} characters',
    }),
    perPage: Joi.number().min(5).max(20).default(10).messages({
      'number.base': 'perPage must be a number',
      'number.min': 'perPage should have at least {#limit} characters',
      'number.max': 'perPage should have at most {#limit} characters',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .message({
        'string.base': 'Tag must be a string',
        'string.valid': "Tag doesn't exist",
      }),
    search: Joi.string().trim().allow('').message({
      'string.base': 'Search must be a string',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().trim().allow('').message({
      'string.base': 'content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .message({
        'string.base': 'Tag must be a string',
        'string.valid': "Tag doesn't exist",
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().trim().allow('').message({
      'string.base': 'content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .message({
        'string.base': 'Tag must be a string',
        'string.valid': "Tag doesn't exist",
      })
      .min(1),
  }),
};
