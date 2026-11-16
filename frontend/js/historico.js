/*
 * Felipe | JS | Página histórico (frontend/pages/historico.html)
 * Carregar depois do js/mock.js.
 *
 * Usa EVENTOS_MOCK do js/mock.js (formato do contrato-api.md):
 *   { id, dataHora: "2026-11-07T14:32", visitante, unidade: "A-101", tipo: "ENTRADA"|"SAIDA"|"NEGADO", operador }
 */
 
// ================= Felipe | JS | Dados =================
// Se o mock.js não carregar, a página abre com 0 eventos, sem erro
const eventos = typeof EVENTOS_MOCK !== "undefined" ? EVENTOS_MOCK : [];