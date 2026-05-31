# Avatar Chat Inútil

Projeto extremamente leve, até começar a crescer sozinho e virar dívida técnica.

## O que é isso

Um chat com um avatar em PNG que reage a eventos como se entendesse emoções humanas. Ele não entende.

## Stack

- React
- Next.js
- TypeScript (pra fingir segurança)
- Event Bus artesanal (porque padrão é coisa de gente feliz)

## Como funciona

Você dispara eventos no sistema e o avatar reage com mudanças de estado visual.

Exemplo de eventos:

- felicidade
- raiva
- decepção silenciosa (mais comum)

O avatar basicamente alterna imagens PNG. Isso não é IA, é teatro digital.

## Estrutura mental do projeto

- Chat envia eventos
- Event bus repassa eventos
- Avatar reage como se tivesse opinião própria
- Usuário acredita que existe inteligência envolvida

## Instalação

Se você chegou até aqui, provavelmente já instalou sem querer.

```bash
npm install
npm run dev
```
