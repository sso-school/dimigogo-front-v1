const ENV = {
  dev: {
    apiUrl: "http://0.0.0.0:3000",
  },
  prod: {
    apiUrl: "",
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars();
