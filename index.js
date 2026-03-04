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
app.post("/alistamento", (req, res) => {
    const { nome, idade, sexo } = req.body;

    if (!nome || !idade || !sexo) {
        return res.status(400).json({
            error: "Nome, idade e sexo são obrigatórios"
        });
    }

    if (sexo == "m" && idade >=18) {
        return res.json({
            nome,
            mensagem: "alistamento concluido com sucesso"
        });
    }

    if (idade < 18 && sexo == "m") {
        return res.json({
            nome,
            mensagem: "o exercito te aguarda"
        });
    }

    if (idade > 18 && sexo == "f") {
        return res.json({
            nome,
            mensagem: "busque um curso preparatorio"
        });
    }
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
