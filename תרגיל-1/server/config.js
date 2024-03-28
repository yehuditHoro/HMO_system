const config = {
    db: {
      connectionLimit: 10,
      // waitForConnctions:true,
      // queueLimit:0,
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "ROOT2024",
      database: "covid_database",
    },
  };
  module.exports = config;