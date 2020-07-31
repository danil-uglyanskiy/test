const fields = ["email", "password"];

const labels = {
  email: "Form.Login",
  password: "Form.Password"
};

const placeholders = {};

const types = {
  password: "password"
};

const rules = {
  email: "email|required",
  password: "min:6|required"
};

const values = {
  email: "",
  password: ""
};

export default {
  fields,
  labels,
  placeholders,
  rules,
  types,
  values
};
