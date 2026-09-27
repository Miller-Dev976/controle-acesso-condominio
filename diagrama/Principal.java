package condominio;

import java.time.LocalDateTime;

public class Principal {

    public static void main(String[] args) {
        Unidade unidade101 = new Unidade("101");
        Unidade unidade102 = new Unidade("102");

        Morador joao = new Morador("João Silva", "111.111.111-11", unidade101);
        MoradorInadimplente maria = new MoradorInadimplente(
                "Maria Souza", "222.222.222-22", unidade102, 150.0);

        AreaComum salaoDeFestas = new AreaComum("Salão de Festas", 50);

        LocalDateTime inicio = LocalDateTime.of(2026, 10, 10, 18, 0);
        LocalDateTime fim = LocalDateTime.of(2026, 10, 10, 22, 0);

        Reserva reservaJoao = salaoDeFestas.reservar(joao, inicio, fim);
        System.out.println("Reserva criada para " + joao.getNome() + ": " + reservaJoao.getStatus());

        try {
            salaoDeFestas.reservar(joao, inicio, fim);
        } catch (IllegalStateException e) {
            System.out.println("Erro esperado (horário já ocupado): " + e.getMessage());
        }

        try {
            LocalDateTime outroInicio = LocalDateTime.of(2026, 10, 11, 18, 0);
            LocalDateTime outroFim = LocalDateTime.of(2026, 10, 11, 20, 0);
            salaoDeFestas.reservar(maria, outroInicio, outroFim);
        } catch (IllegalStateException e) {
            System.out.println("Erro esperado (morador inadimplente): " + e.getMessage());
        }

        maria.quitar(150.0);
        LocalDateTime novoInicio = LocalDateTime.of(2026, 10, 11, 18, 0);
        LocalDateTime novoFim = LocalDateTime.of(2026, 10, 11, 20, 0);
        Reserva reservaMaria = salaoDeFestas.reservar(maria, novoInicio, novoFim);
        System.out.println("Maria quitou e conseguiu reservar: " + reservaMaria.getStatus());
    }
}
