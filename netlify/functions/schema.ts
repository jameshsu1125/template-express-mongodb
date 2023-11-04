export const schema = {
  name: String,
  url: String,
  repo: String,
  description: String,
};

export const useSchema = {
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  repo: String,
  description: {
    type: String,
    required: true,
  },
};
