const mongoose = require("mongoose");

// Schema do usuário
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Campo obrigatório
        trim: true,     // Remove espaços em branco no início/fim
    },
    email: {
        type: String,
        required: true,
        unique: true,   // Garante que o email seja único
        trim: true,
        lowercase: true // Converte o email para letras minúsculas
    },
    password: {
        type: String,
        required: true,
        minlength: 6    // Define um tamanho mínimo para a senha
    },
    // token: {
    //     type: String,
    //     required: true,   
    // }
}, {
    timestamps: true // Adiciona `createdAt` e `updatedAt` automaticamente
});

// Modelo do usuário
const User = mongoose.model("User", UserSchema);

module.exports = User;
