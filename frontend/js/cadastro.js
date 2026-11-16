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
    retrn [...mapa.values()].sort((a, b) => a.nome.localeCompare(b.nome));
}