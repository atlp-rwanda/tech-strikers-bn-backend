const validation = (data, schema) => {
  const { error } = schema.validate(data);

  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    return message;
  }
};
export default {
  validation,
};
