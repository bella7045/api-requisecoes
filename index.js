const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/saudacao', (req, res) => {
    const nome = req.query.nome;

    if (!nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    res.json({ message: `Olá, ${nome}` });
});

app.post("/imc", (req, res) => {
    const { nome, idade, altura, peso } = req.body;

    if (!nome || !idade || !altura || !peso) {
        return res.status(400).json({
            error: 'Os dados estão incompletos'
        });
    }

    const imc = peso / (altura * altura);

    res.json({
        nome,
        imc: imc.toFixed(2)
    });
});
app.post("/nota", (req, res) => {
    const { nome, nota1,nota2 } = req.body;

    if (!nome || !nota1 || !nota2) {
        return res.status(400).json({
            error: "Nome e notas são obrigatórios"
        });
    }

    const status = (nota1 + nota2) / 2 >= 7 ? "Aprovado" : "Reprovado";

    res.json({
        nome,
        nota1,
        nota2,
        status
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});