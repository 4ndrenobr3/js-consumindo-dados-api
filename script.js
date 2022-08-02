async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('Cep Inválido!')
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep Inválido. Tente Novamente</p>`;
        return erro;
    }
}

// let ceps = ['83303320', '83303303'];
// let conjuntosCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntosCeps).then(respostas => console.log(respostas));

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
