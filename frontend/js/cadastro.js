/*
 * Felipe | JS | Página moradores - cadastro de moradores (frontend/pages/moradores.html)
 * Carregar depois do js/mock.js.
 *
 * Usa MORADORES_MOCK do js/mock.js (formato do contrato-api.md):
 *   { id, nome, cpf, telefone, email, unidade: { id, nome }, taxaPendente, status: "ATIVO"|"INATIVO" }
 */
 
// ================= Felipe | JS | Dados =================
// Se o mock.js não carregar, a página abre com a tabela vazia, sem erro
const moradores = typeof MORADORES_MOCK !== "undefined" ? MORADORES_MOCK : [];

// ================= Felipe | JS | Funções de apoio =================
function proximoId(lista) {
    return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

// evita que texto digitado vire HTML na tabela
function esc(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

// toast: tipo = "sucesso" | "erro"
function mostrarToast(mensagem, tipo = "sucesso") {
    let area = document.querySelector(".toast-area");
    if (!area) {
        area = document.createElement("div");
        area.className = "toast-area";
        document.body.appendChild(area);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;
    area.appendChild(toast);
    setTimeout(() => toast.classList.add("saindo"), 3200);
    setTimeout(() => toast.remove(), 3600);
}
function buscarMorador(id) {
    return moradores.find(m => m.id === Number(id));
}

// unidades que aparecem nos moradores do mock (o contrato não tem lista separada de unidades)
function listarUnidades() {
    const mapa = new Map();
    moradores.forEach(m => {
        if (m.unidade) mapa.set(m.unidade.id, m.unidade);
    });
    return [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome));
}
// ================= Felipe | JS | Página: moradores =================
const cardForm = document.getElementById("cardForm");
const form = document.getElementById("formMorador");
const tituloForm = document.getElementById("tituloForm");
const btnSalvar = document.getElementById("btnSalvar");
const tabela = document.getElementById("tabelaMoradores");
const campoCpf = document.getElementById("cpf");
const selectUnidade = document.getElementById("unidade");

let idEmEdicao = null; // null = cadastrando, número = editando

// ---------- Felipe | JS | select de unidades ----------
selectUnidade.innerHTML = `<option value="">Selecione a unidade</option>` +
    listarUnidades().map(u => `<option value="${u.id}">${esc(u.nome)}</option>`).join("");

    // ---------- Felipe | JS | abrir / fechar formulário ----------

    function abrirForm(morador) {
    idEmEdicao = morador ? morador.id : null;
    tituloForm.textContent = morador ? "Editar morador" : "Novo morador";
    btnSalvar.textContent = morador ? "Salvar alterações" : "Cadastrar";
    form.reset();
    if (morador) {
        document.getElementById("nome").value = morador.nome;
        campoCpf.value = morador.cpf;
        document.getElementById("telefone").value = morador.telefone;
        document.getElementById("email").value = morador.email;
        selectUnidade.value = morador.unidade ? morador.unidade.id : "";
    }
    cardForm.classList.remove("oculto");
    document.getElementById("nome").focus();
}
function fecharForm() {
    cardForm.classList.add("oculto");
    form.reset();
    idEmEdicao = null;
}
 
document.getElementById("btnAbrirForm").addEventListener("click", () => {
    if (cardForm.classList.contains("oculto") || idEmEdicao !== null) abrirForm(null);
    else fecharForm();
});
document.getElementById("btnCancelar").addEventListener("click", fecharForm);

// ---------- Felipe | JS | máscara de CPF ----------
function somenteDigitos(texto) {
    return texto.replace(/\D/g, "");
}
 
campoCpf.addEventListener("input", () => {
    const d = somenteDigitos(campoCpf.value).slice(0, 11);
    campoCpf.value = d
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});
// ---------- Felipe | JS | tabela ----------
function estaAtivo(m) {
    return m.status === "ATIVO";
}
function badgeSituacao(m) {
    return m.taxaPendente > 0
        ? `<span class="badge badge-inadimplente">Inadimplente</span>`
        : `<span class="badge badge-ok">Financeira OK</span>`;
}

function badgeStatus(m) {
    return estaAtivo(m)
        ? `<span class="badge badge-ativo">Ativo</span>`
        : `<span class="badge badge-inativo">Inativo</span>`;
}
 
function renderizarTabela() {
    if (moradores.length === 0) {
        tabela.innerHTML = `<tr><td colspan="6" class="vazio">Nenhum morador cadastrado</td></tr>`;
        return;
    }
    tabela.innerHTML = moradores.map(m => `
        <tr class="${estaAtivo(m) ? "" : "linha-inativa"}">
            <td>${esc(m.nome)}</td>
            <td>${esc(m.cpf)}</td>
            <td>${m.unidade ? esc(m.unidade.nome) : "-"}</td>
            <td>${badgeSituacao(m)}</td>
            <td>${badgeStatus(m)}</td>
            <td>
                <div class="acoes">
                    <button class="btn btn-secundario btn-pequeno" data-acao="editar" data-id="${m.id}">Editar</button>
                    ${estaAtivo(m)
                        ? `<button class="btn btn-perigo btn-pequeno" data-acao="inativar" data-id="${m.id}">Inativar</button>`
                        : `<button class="btn btn-secundario btn-pequeno" data-acao="reativar" data-id="${m.id}">Reativar</button>`}
                </div>
            </td>
        </tr>
    `).join("");
}

tabela.addEventListener("click", (e) => {
    const botao = e.target.closest("button[data-acao]");
    if (!botao) return;
    const morador = buscarMorador(botao.dataset.id);
 
    if (botao.dataset.acao === "editar") {
        abrirForm(morador);
    } else if (botao.dataset.acao === "inativar") {
        morador.status = "INATIVO";
        mostrarToast(`${morador.nome} foi inativado`);
        renderizarTabela();
    } else if (botao.dataset.acao === "reativar") {
        morador.status = "ATIVO";
        mostrarToast(`${morador.nome} foi reativado`);
        renderizarTabela();
    }
});