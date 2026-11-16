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
functio proximoId(lista) {
    return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}