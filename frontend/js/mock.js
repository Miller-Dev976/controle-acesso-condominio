// fonte única de dados fake (formato = contrato-api.md)
const MORADORES_MOCK = [
  { id: 1, nome: "João Silva", cpf: "111.111.111-11", telefone: "11 99999-0001", email: "joao@email.com", unidade: { id: 1, nome: "A-101" }, taxaPendente: 0, status: "ATIVO" },
  { id: 2, nome: "Ana Lima", cpf: "222.222.222-22", telefone: "11 99999-0002", email: "ana@email.com", unidade: { id: 2, nome: "B-204" }, taxaPendente: 150.00, status: "ATIVO" },
  { id: 3, nome: "Carlos Pereira", cpf: "333.333.333-33", telefone: "11 99999-0003", email: "carlos@email.com", unidade: { id: 3, nome: "A-302" }, taxaPendente: 0, status: "INATIVO" }
];
const VISITANTES_MOCK = [
  { id: 1, nome: "Maria Souza", documento: "444.555.666-77", tipo: "VISITANTE", ultimaVisita: "2026-11-06" },
  { id: 2, nome: "Carlos Técnico", documento: "888.999.000-11", tipo: "PRESTADOR", ultimaVisita: "2026-11-05" },
  { id: 3, nome: "Entregas Express", documento: "12.345.678/0001-90", tipo: "ENTREGADOR", ultimaVisita: "2026-11-07" }
];
const EVENTOS_MOCK = [
  { id: 1, dataHora: "2026-11-07T14:32", visitante: "Maria Souza", unidade: "A-101", tipo: "ENTRADA", operador: "Portaria" },
  { id: 2, dataHora: "2026-11-07T14:05", visitante: "Carlos Técnico", unidade: "B-204", tipo: "SAIDA", operador: "Portaria" },
  { id: 3, dataHora: "2026-11-06T13:47", visitante: "Não identificado", unidade: "---", tipo: "NEGADO", operador: "Portaria" }
];
const AREAS_MOCK = [
  { id: 1, nome: "Salão de Festas", capacidade: 50 },
  { id: 2, nome: "Churrasqueira", capacidade: 20 },
  { id: 3, nome: "Quadra", capacidade: 30 }
];
const RESERVAS_MOCK = [
  { id: 1, morador: "João Silva", areaComum: "Salão de Festas", inicio: "2026-11-10T18:00", fim: "2026-11-10T22:00", status: "CONFIRMADA" },
  { id: 2, morador: "Ana Lima", areaComum: "Quadra", inicio: "2026-11-08T08:00", fim: "2026-11-08T10:00", status: "SOLICITADA" }
];