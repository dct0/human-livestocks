export const bullConfig = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: 0,
    tls: {
      secureProtocol: "TLS_method",
    },
  },
};
