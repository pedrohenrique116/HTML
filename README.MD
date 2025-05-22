Pedro Henrique Luiz Alves Duarte RM 563405
Guilherme Macedo Martins RM 562396
Gabriel hayashi Monteiro RM 562128




# Gorila vs 100 Humanos

Este projeto simula uma batalha entre um gorila e 100 humanos, onde o jogador controla o gorila e pode realizar três ações: atacar, defender e curar. Os humanos atacam automaticamente a cada turno.

## Tecnologias Utilizadas

- HTML5
- CSS3 (externo)
- JavaScript puro (sem frameworks)
- LocalStorage para persistência de dados

## Funcionalidades

- Interface HTML completa com gorila, humanos e barra de status
- Eventos de clique em botões para o gorila atacar, defender e curar
- Animações e efeitos visuais para cada ação
- Atualização dinâmica dos valores no DOM (vida, energia, humanos restantes)
- Funções modularizadas para as ações: atacar, defender, curar
- Array para representar os 100 humanos
- Loop para reduzir humanos vivos a cada ataque
- Logs de batalha exibidos dinamicamente na div #log
- Salvamento do estado da partida com LocalStorage
- Validação de fim de jogo (gorila derrotado ou todos humanos eliminados)
- Estilização com CSS externa, interface responsiva e temática

## Como Jogar

1. Use o botão "Atacar" para eliminar até 10 humanos aleatoriamente (custo: 20 de energia)
2. Use o botão "Defender" para aumentar sua defesa contra ataques (custo: 15 de energia)
3. Use o botão "Curar" para recuperar pontos de vida (custo: 30 de energia)
4. A energia do gorila recupera automaticamente com o tempo
5. Os humanos atacam automaticamente a cada turno
6. O jogo termina quando o gorila é derrotado ou todos os humanos são eliminados
7. O estado do jogo é salvo automaticamente e pode ser retomado ao recarregar a página

## Estrutura do Projeto

- `index.html` - Estrutura HTML da página
- `assets/style.css` - Estilos CSS externos
- `assets/javascript.js` - Lógica do jogo em JavaScript puro
- `assets/img/` - Imagens utilizadas no projeto
- `assets/mp3/` - Efeitos sonoros (opcional)

## Requisitos Técnicos Implementados

- ✅ Interface HTML completa com gorila, humanos e barra de status
- ✅ Eventos de clique em botão para gorila atacar (com animação/efeito visual)
- ✅ Atualização dos valores no DOM (vida, humanos restantes, ataques)
- ✅ Funções modularizadas para ações: atacar, defender, curar
- ✅ Array para representar os 100 humanos
- ✅ Loop para reduzir humanos vivos e atualizar interface
- ✅ Logs de batalha exibidos dinamicamente na div #log usando innerHTML
- ✅ Salvamento do estado com LocalStorage
- ✅ Validação de fim de jogo
- ✅ Estilização com CSS externa, interface responsiva e temática
- ✅ Uso de setInterval para recuperação automática de energia
- ✅ Uso de setTimeout para ataques automáticos dos humanos
- ✅ Classes CSS para mostrar visualmente quem está vivo ou derrotado
