const express = require("express");
const connectDatabase = require("./database/database");
const authService = require("./service/auth.service");
const jwt = require("jsonwebtoken");

const app = express();

connectDatabase();

const port = 3000;
const secret = "segredoaleatorio";

app.use(express.json());

app.get("/", (req, res) => {
    console.log(token());
    res.send("Hello World")
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginService(email);

    if(!user) {
        return res.status(400).send({ message: "Usuario nao encontrado, tente novamente"})
    }

    if(password != user.password) {
        return res.status(400).send({ message: "Senha invalida" })
    }

    const token = authService.generateToken(user.id, secret)
    console.log(user);

    res.status(200).send({ user, token });
});

app.get("/test-token", (req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).send({ message: "O token nao foi informado"})
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2) {
        return res.status(401).send({ message: "token invalido"})
    }

    const [schema, token] = parts;

    if(!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ message: "token mal formado"})
    }

    jwt.verify(token, secret, (err, decoded) => {

        if(err) {
            console.log(`erro: ${err}`);
            return res.status(500).send({ message: "erro interno,tente novamente"})
        }

        console.log(decoded.id);
        res.send(decoded);
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});