const express = require("express");

require("dotenv").config();

const app = express();

const porta = 3000

app.use(express.static("public"));


app.get("/api/previsao", async (req, res) => {
    const cidade = req.query.cidade;
    const chave = process.env.API_CHAVE;

    if (!cidade) return res.status(400).json({ erro: "Cidade não informada" });

    if (!chave) return res.status(500).json({ erro: "Chave da API não configurada" });

    try {
        const resposta = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            cidade +
            "&appid=" +
            chave +
            "&lang={pt-br}" +
            "&units=metric"
        );

        const dados = await resposta.json();

        if (dados.cod !== 200) return res.status(dados.cod).json({ erro: dados.message });

        res.json(dados);

    } catch (erro) {
        console.error("Erro interno", erro)
        res.status(500).json({ erro: "Erro ao buscar previsão" })
    }
});

app.listen(porta, () =>
    console.log(`Servidor Rodando em http://localhost:${porta}`));