const ENV = {
  dev: {
    // apiUrl: "http://0.0.0.0:3000",
    apiUrl: "http://172.16.18.72:3000",
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
