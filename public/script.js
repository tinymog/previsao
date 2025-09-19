let chave = "ca69a224d3ad72ef1702053b15d13bcf";

const cliquenobotao = () => {
    let cidade = document.querySelector(".input-cidade").value;

    if (!cidade) {
        alert("Digite uma Cidade");
        return;
    }

    buscarCidade(cidade);
}

async function buscarCidade(cidade) {
    try {
        const resposta = await fetch(`api/previsao?cidade=${cidade}`);
        const dados = await resposta.json();

        if (resposta.status !== 200) {
            alert("Erro: " + (dados.erro || "Cidade não encontrada"));
            return;
        }

        colocarNaTela(dados);

    } catch (erro) {
        alert("Erro ao conectar ao servidor");
        console.error(erro);
    }
}

function colocarNaTela(dados) {
    document.querySelector(".nome-cidade").innerHTML = dados.name;
    document.querySelector(".graus-cidade").innerHTML = dados.main.temp;
    document.querySelector(".cidade-desc").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade-cidade").innerHTML = dados.main.humidity;
    const iconCode = dados.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.querySelector(".icon").innerHTML = `<img src="${iconUrl}" alt="Ícone do clima">`;
}