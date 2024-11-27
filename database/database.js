const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/unyleya", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao MongoDB:", connection.connection.host);
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;
