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
// ================= Felipe | JS | Funções de apoio =================
// "2026-11-07T14:32" -> "07/11/2026 14:32"
function formatarDataHora(iso) {
    if (!iso) return "-";
    const [data, hora] = iso.split("T");
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}${hora ? " " + hora.slice(0, 5) : ""}`;
}
// evita que texto vire HTML na tabela
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
// ================= Felipe | JS | Página: histórico =================
const tabela = document.getElementById("tabelaHistorico");
const contador = document.getElementById("contador");
const selectUnidade = document.getElementById("filtroUnidade");
 
const EVENTOS = {
    ENTRADA: { texto: "Entrada", classe: "badge-entrada" },
    SAIDA:   { texto: "Saída",   classe: "badge-saida" },
    NEGADO:  { texto: "Negado",  classe: "badge-negado" }
};

// ---------- Felipe | JS | select de unidades (as que aparecem nos eventos) ----------
const unidades = [...new Set(eventos.map(ev => ev.unidade))].sort();
selectUnidade.innerHTML = `<option value="">Todas</option>` +
    unidades.map(u => `<option value="${esc(u)}">${esc(u)}</option>`).join("");
 
let resultado = []; // o que está na tela (é isso que vai pro CSV)

// ---------- Felipe | JS | filtros ----------
function aplicarFiltros() {
    const inicio = document.getElementById("dataInicio").value;   // "2026-11-01"
    const fim = document.getElementById("dataFim").value;
    const unidade = selectUnidade.value;
    const evento = document.getElementById("filtroEvento").value;
 
    if (inicio && fim && fim < inicio) {
        mostrarToast("Data fim não pode ser antes da data início", "erro");
        return;
    }
 
    resultado = eventos
        .filter(ev => {
            const dia = ev.dataHora.slice(0, 10);
            if (inicio && dia < inicio) return false;
            if (fim && dia > fim) return false;
            if (unidade && ev.unidade !== unidade) return false;
            if (evento && ev.tipo !== evento) return false;
            return true;
        })
        .sort((a, b) => b.dataHora.localeCompare(a.dataHora));
 
    renderizarTabela();
}

// ---------- Felipe | JS | tabela + contador ----------
function badgeEvento(tipo) {
    const ev = EVENTOS[tipo] || { texto: tipo, classe: "" };
    return `<span class="badge ${ev.classe}">${esc(ev.texto)}</span>`;
}

function renderizarTabela() {
    contador.textContent = resultado.length;
 
    if (resultado.length === 0) {
        tabela.innerHTML = `<tr><td colspan="5" class="vazio">Nenhum evento para esses filtros</td></tr>`;
        return;
    }
 
    tabela.innerHTML = resultado.map(ev => `
        <tr>
            <td>${formatarDataHora(ev.dataHora)}</td>
            <td>${esc(ev.visitante)}</td>
            <td>${esc(ev.unidade)}</td>
            <td>${badgeEvento(ev.tipo)}</td>
            <td>${esc(ev.operador)}</td>
        </tr>
    `).join("");
}

document.getElementById("formFiltros").addEventListener("submit", (e) => {
    e.preventDefault();
    aplicarFiltros();
});

// ---------- Felipe | JS | exportar CSV (gerado no próprio JS) ----------
function campoCsv(valor) {
    const texto = String(valor ?? "");
    return /[;"\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
}
 
document.getElementById("btnExportar").addEventListener("click", () => {
    if (resultado.length === 0) {
        mostrarToast("Nenhum evento para exportar", "erro");
        return;
    }
 
    const cabecalho = ["Data/Hora", "Visitante", "Unidade", "Evento", "Operador"];
    const linhas = resultado.map(ev => [
        formatarDataHora(ev.dataHora),
        ev.visitante,
        ev.unidade,
        (EVENTOS[ev.tipo] || { texto: ev.tipo }).texto,
        ev.operador
    ]);

    // ";" porque o Excel em português usa ponto e vírgula; ﻿ faz os acentos abrirem certo
    const csv = "﻿" + [cabecalho, ...linhas]
        .map(linha => linha.map(campoCsv).join(";"))
        .join("\r\n");
 
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `historico-acessos-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
 
    mostrarToast(`${resultado.length} eventos exportados`);
});
 
aplicarFiltros();