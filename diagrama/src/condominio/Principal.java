package condominio;

import java.time.LocalDateTime;
import java.util.List;

public class Principal {

    public static void main(String[] args) {
        // Agregação: as unidades existem sozinhas e o bloco só as agrupa
        Unidade unidade101 = new Unidade("101");
        Unidade unidade102 = new Unidade("102");
        Bloco blocoA = new Bloco("Bloco A");
        blocoA.adicionar(unidade101);
        blocoA.adicionar(unidade102);
        System.out.println(blocoA.getNome() + " tem " + blocoA.getUnidades().size() + " unidades.");

        Morador joao = new MoradorAdimplente("João Silva", "111.111.111-11", unidade101);
        Morador carlos = new MoradorAdimplente("Carlos Lima", "333.333.333-33", unidade101);
        MoradorInadimplente maria = new MoradorInadimplente("Maria Souza", "222.222.222-22", unidade102, 150.0);

        // Polimorfismo: a mesma pergunta, resposta diferente conforme o tipo
        List<Morador> moradores = List.of(joao, carlos, maria);
        for (Morador morador : moradores) {
            System.out.println(morador.getNome() + " (unidade " + morador.getUnidade().getNumero()
                    + ") pode reservar? " + morador.podeReservar());
        }

        AreaComum salaoDeFestas = new AreaComum("Salão de Festas", 80.0);
        LocalDateTime inicio = LocalDateTime.of(2026, 10, 10, 18, 0);
        LocalDateTime fim = LocalDateTime.of(2026, 10, 10, 22, 0);

        Reserva reservaJoao = salaoDeFestas.reservar(joao, inicio, fim);
        System.out.println("Reserva de " + reservaJoao.getMorador().getNome() + ": " + reservaJoao.getStatus()
                + " | taxa R$ " + reservaJoao.getCobranca().getValor());

        // Regra inegociável: mesma área, mesmo período
        try {
            salaoDeFestas.reservar(carlos, inicio, fim);
        } catch (IllegalStateException e) {
            System.out.println("Recusado: " + e.getMessage());
        }

        // Inadimplente bloqueado até quitar
        LocalDateTime outroInicio = LocalDateTime.of(2026, 10, 11, 18, 0);
        LocalDateTime outroFim = LocalDateTime.of(2026, 10, 11, 20, 0);
        try {
            salaoDeFestas.reservar(maria, outroInicio, outroFim);
        } catch (IllegalStateException e) {
            System.out.println("Recusado: " + e.getMessage());
        }

        maria.quitar(150.0);
        Reserva reservaMaria = salaoDeFestas.reservar(maria, outroInicio, outroFim);
        System.out.println("Maria quitou e reservou: " + reservaMaria.getStatus());

        // Estado só muda por operações e na ordem certa
        reservaJoao.confirmar();
        reservaJoao.getCobranca().quitar();
        System.out.println("Reserva do João: " + reservaJoao.getStatus()
                + " | cobrança paga? " + reservaJoao.getCobranca().estaPaga());

        reservaMaria.cancelar();
        try {
            reservaMaria.confirmar();
        } catch (IllegalStateException e) {
            System.out.println("Recusado: " + e.getMessage());
        }

        // Taxa negativa é recusada na entrada
        try {
            new AreaComum("Churrasqueira", -10.0);
        } catch (IllegalArgumentException e) {
            System.out.println("Recusado: " + e.getMessage());
        }

        System.out.println("Reservas registradas no " + salaoDeFestas.getNome() + ": "
                + salaoDeFestas.getReservas().size());
    }
}
