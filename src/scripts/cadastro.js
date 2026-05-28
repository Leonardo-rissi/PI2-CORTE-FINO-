function mCpf(input) {
  let cpf = input.value;
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = cpf;
}

function mTel(input) {
  let tel = input.value;
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^(\d{2})(\d)/g, "($1)$2");
  tel = tel.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = tel;
}

function mCEP(input) {
  let cep = input.value;
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = cep;
}

function mRG(input) {
  let rg = input.value;
  rg = rg.replace(/[^0-9xX]/g, "");
  rg = rg.replace(/(\d{2})(\d)/, "$1.$2");
  rg = rg.replace(/(\d{3})(\d)/, "$1.$2");
  rg = rg.replace(/(\d{3})([0-9xX])$/, "$1-$2");
  input.value = rg;
}

function mCNPJ(input) {
  let cnpj = input.value;
  cnpj = cnpj.replace(/\D/g, "");
  cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
  input.value = cnpj;
}
function mTexto(input) {
  input.value = input.value.replace(
    /[0-9!@#$%^&*()_+=\[\]{};':",./<>?~`|\\-]/g,
    "",
  );
}
function mNumberResid(input) {
  input.value = input.value.replace(/\D/g, "");
}

function mostrarForm(qual) {
  let formSocio = document.querySelector("#formSocio");
  let formFornecedor = document.querySelector("#formFornecedor");
  let btnSocio = document.querySelector("#btnSocio");
  let btnFornecedor = document.querySelector("#btnFornecedor");

  if (qual === "socio") {
    formSocio.style.display = "block";
    formFornecedor.style.display = "none";
  } else {
    formSocio.style.display = "none";
    formFornecedor.style.display = "block";
  }
  btnSocio.style.background = "transparent";
  btnSocio.style.color = "#8B0000";

  btnFornecedor.style.background = "transparent";
  btnFornecedor.style.color = "#8B0000";
  if (qual === "socio") {
    btnSocio.style.background = "#8B0000";
    btnSocio.style.color = "white";
  } else {
    btnFornecedor.style.background = "#8B0000";
    btnFornecedor.style.color = "white";
  }
}

function validarEmail(input) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const msgErro = input.parentElement.querySelector(".msg-erro");
  if (!regexEmail.test(input.value)) {
    marcarErro(input, "E-mail inválido!", msgErro);
  } else {
    limparErro(input, msgErro);
  }
}

function limparErro(input, spanErro) {
  input.style.borderColor = "";
  input.style.backgroundColor = "";

  let span = spanErro || input.parentElement.querySelector(".msg-erro");
  if (span) {
    span.textContent = "";
    span.style.display = "none";
  }
}
function limparTodosErros(form) {
  document.querySelectorAll(".msg-erro").forEach(function (span) {
    span.remove();
  });

  document
    .querySelectorAll(
      "#formContato input, #formContato select, #formContato textarea",
    )
    .forEach(function (campo) {
      campo.style.border = "";
      campo.style.backgroundColor = "";
      campo.style.boxShadow = "";
    });
}

function validarCadastro(event, tipoForm) {
  event.preventDefault();
  let form = document.querySelector(
    tipoForm === "socio" ? "#formSocio" : "#formFornecedor",
  );
  limparTodosErros(form);
  let valido = true;
  let campos = form.querySelectorAll("input[required], textarea[required]");
  campos.forEach(function (input) {
    if (input.type === "radio") return;

    if (input.value.trim() === "") {
      marcarErro(input, "Este campo é obrigatório.");
      valido = false;
    }
  });
  if (tipoForm === "socio") {
    let inputNome = form.querySelector("#name");
    if (inputNome && inputNome.value.trim() !== "") {
      let palavras = inputNome.value
        .trim()
        .split(" ")
        .filter(function (p) {
          return p;
        });
      if (palavras.length < 2) {
        marcarErro(inputNome, "Informe nome e sobrenome.");
        valido = false;
      }
    }

    let inputEmail = form.querySelector("#email");
    if (inputEmail && inputEmail.value.trim() !== "") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!regexEmail.test(inputEmail.value)) {
        marcarErro(inputEmail, "E-mail inválido.");
        valido = false;
      }
    }
    let inputCPF = form.querySelector("#CPF");
    if (inputCPF && inputCPF.value.trim() !== "") {
      if (inputCPF.value.length < 14) {
        marcarErro(inputCPF, "CPF incompleto. Use o formato 000.000.000-00.");
        valido = false;
      }
    }
    let inputSenha = form.querySelector("#senha");
    let inputConfirma = form.querySelector("#senhaConfirma");
    valido = validarSenha(inputSenha, inputConfirma) && valido;
  } else {
    let inputRazao = form.querySelector("#razaosocial");
    if (inputRazao && inputRazao.value.trim() !== "") {
      let palavras = inputRazao.value
        .trim()
        .split(" ")
        .filter(function (p) {
          return p;
        });
      if (palavras.length < 2) {
        marcarErro(inputRazao, "Informe a razão social completa.");
        valido = false;
      }
    }
    let inputCNPJ = form.querySelector("#CNPJ");
    if (inputCNPJ && inputCNPJ.value.trim() !== "") {
      if (inputCNPJ.value.length < 18) {
        marcarErro(
          inputCNPJ,
          "CNPJ incompleto. Use o formato 00.000.000/0000-00.",
        );
        valido = false;
      }
    }
    let inputEmailCop = form.querySelector("#emailcop");
    if (inputEmailCop && inputEmailCop.value.trim() !== "") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!regexEmail.test(inputEmailCop.value)) {
        marcarErro(inputEmailCop, "E-mail inválido.");
        valido = false;
      }
    }
    let pagamentoMarcado = form.querySelector(
      "input[name='pagamento']:checked",
    );
    if (!pagamentoMarcado) {
      let primeiroPagamento = form.querySelector("input[name='pagamento']");
      marcarErro(primeiroPagamento, "Selecione uma forma de pagamento.");
      valido = false;
    }
    let inputSenha = form.querySelector("#senha");
    let inputConfirma = form.querySelector("#senhaConfirma");
    valido = validarSenha(inputSenha, inputConfirma) && valido;
  }
  if (valido) {
    mostrarSucesso();
  }
}
function validarSenha(inputSenha, inputConfirma) {
  let valido = true;
  if (inputSenha.value.trim() === "") {
    marcarErro(inputSenha, "Informe uma senha.");
    valido = false;
  } else {
    let regexSenhaForte = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!regexSenhaForte.test(inputSenha.value)) {
      marcarErro(
        inputSenha,
        "A senha precisa ter: mínimo 8 caracteres, 1 maiúscula, 1 número e 1 caractere especial.",
      );
      valido = false;
    }
  }
  if (inputConfirma.value.trim() === "") {
    marcarErro(inputConfirma, "Confirme sua senha.");
    valido = false;
  } else if (inputSenha.value !== inputConfirma.value) {
    marcarErro(inputConfirma, "As senhas não coincidem.");
    valido = false;
  }
  return valido;
}
function mostrarSucesso() {
  let divSucesso = document.createElement("div");
  divSucesso.textContent =
    "✓ Cadastro realizado com sucesso! Redirecionando...";
  divSucesso.style.cssText = `
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #d1e7dd;
    color: #0f5132;
    border: 1px solid #a3cfbb;
    border-radius: 8px;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(divSucesso);
  setTimeout(function () {
    window.location.href = "/index.html";
  }, 2500);
}
function marcarErro(input, mensagem) {
  input.style.cssText = `
    border: 2px solid #dc3545;
    background-color: #fff5f5;
    box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.12);
    transition: all 0.2s ease;
  `;
  let span = input.nextElementSibling;
  if (!span || !span.classList.contains("msg-erro")) {
    span = document.createElement("span");
    span.className = "msg-erro";
    input.insertAdjacentElement("afterend", span);
  }
  span.innerHTML = "Algo deu errado: " + mensagem;
  span.style.cssText = `
    display: block;
    color: #dc3545;
    font-size: 13px;
    font-weight: 600;
    margin-top: -10px;
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
  `;
}
async function verificarCEP(idCampo, idMensagem) {
  let inputCEP = document.querySelector(`#${idCampo}`);
  let mensagem = document.querySelector(`#${idMensagem}`);
  let cep = inputCEP.value.replace(/\D/g, "");
  if (cep.length !== 8) {
    mensagem.innerHTML = "❌ CEP inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }
  try {
    let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let dados = await resposta.json();
    if (dados.erro) {
      mensagem.innerHTML = "CEP não encontrado.";
      mensagem.style.color = "#dc3545";
    } else {
      mensagem.innerHTML = `CEP válido: ${dados.localidade} - ${dados.uf}`;

      mensagem.style.color = "#198754";
    }
  } catch {
    mensagem.innerHTML = "Erro ao consultar CEP.";

    mensagem.style.color = "#ffc107";
  }
}
function verificarCPF(idCampo, idMensagem) {
  let inputCPF = document.querySelector(`#${idCampo}`);
  let mensagem = document.querySelector(`#${idMensagem}`);
  let cpf = inputCPF.value.replace(/\D/g, "");
  if (cpf.length !== 11) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }
  if (/^(\d)\1+$/.test(cpf)) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    mensagem.innerHTML = " CPF inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    mensagem.innerHTML = "CPF inválido.";
    mensagem.style.color = "#dc3545";
  } else {
    mensagem.innerHTML = "CPF válido.";
    mensagem.style.color = "#198754";
  }
}
function verificarRG() {
  let inputRG = document.querySelector("#RG");
  let mensagem = document.querySelector("#mensagemRG");

  let rg = inputRG.value.replace(/\D/g, "");

  if (rg.length < 8 || rg.length > 9) {
    mensagem.innerHTML = "RG inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  if (/^(\d)\1+$/.test(rg)) {
    mensagem.innerHTML = "RG inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  mensagem.innerHTML = "RG válido.";
  mensagem.style.color = "#198754";
}
function validarNascimento() {
  let inputNascimento = document.querySelector("#nascimento");
  let mensagem = document.querySelector("#mensagemNascimento");

  let dataNascimento = new Date(inputNascimento.value);
  let hoje = new Date();

  if (!inputNascimento.value) {
    mensagem.innerHTML = "Informe sua data de nascimento.";
    mensagem.style.color = "#dc3545";
    return;
  }
  if (dataNascimento > hoje) {
    mensagem.innerHTML = "Data inválida.";
    mensagem.style.color = "#dc3545";
    return;
  }
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  let mes = hoje.getMonth() - dataNascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  if (idade < 18) {
    mensagem.innerHTML = "É necessário ter pelo menos 18 anos.";
    mensagem.style.color = "#dc3545";
    return;
  }
  if (idade > 120) {
    mensagem.innerHTML = "❌ Data inválida.";
    mensagem.style.color = "#dc3545";
    return;
  }
  mensagem.innerHTML = `Idade válida (${idade} anos).`;
  mensagem.style.color = "#198754";
}

function validarTelefone(idCampo, idMensagem) {
  let inputTelefone = document.querySelector(`#${idCampo}`);
  let mensagem = document.querySelector(`#${idMensagem}`);

  let telefone = inputTelefone.value.replace(/\D/g, "");

  if (telefone.length !== 11) {
    mensagem.innerHTML = "Telefone inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  if (/^(\d)\1+$/.test(telefone)) {
    mensagem.innerHTML = "Telefone inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  let ddd = parseInt(telefone.substring(0, 2));

  if (ddd < 11 || ddd > 99) {
    mensagem.innerHTML = "DDD inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  mensagem.innerHTML = "Telefone válido.";
  mensagem.style.color = "#198754";
}

function validarCNPJ() {
  let inputCNPJ = document.querySelector("#CNPJ");
  let mensagem = document.querySelector("#mensagemCNPJ");

  let cnpj = inputCNPJ.value.replace(/\D/g, "");

  if (cnpj.length !== 14) {
    mensagem.innerHTML = "CNPJ inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    mensagem.innerHTML = "CNPJ inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);

  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado != digitos.charAt(0)) {
    mensagem.innerHTML = "CNPJ inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);

  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado != digitos.charAt(1)) {
    mensagem.innerHTML = "CNPJ inválido.";
    mensagem.style.color = "#dc3545";
    return;
  }

  mensagem.innerHTML = "CNPJ válido.";
  mensagem.style.color = "#198754";
}
