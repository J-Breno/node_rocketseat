# Node

## Stateful - Stateless

- Aplicação stateful vai ter sempre informação guardada em memória.
- Aplicação Stateless não salva nada em memória, salva em banco de dados.

## Stream

- Ler pequenas partes de alguma coisa e já conseguir trabalhar com aqueles dados mesmo antes de ler o arquivo por completo.
- Readable streams = leitura - lendo os arquivos aos poucos
- Writable stream - escrita - enviando os arquvio aos poucos
- Trabalhar com os dados mesmo antes deles estarem completos
- Buffer transição de dados entre streams - representação de um espaço na memória do computador para enviarem e serem removidos de uma forma bem performática.
- Req => ReadableStream
- res => WritableStream
- middlewares -> eles sempre recebe, o req e o res,

## Knex (banco de dados)

### Instalação

```
npm i knex
npm i sqlite3
```
Criar migration: npm run knex -- migrate:make create-documents
para executar: npm run knex -- migrate:latest    
para desfazer: npm run knex -- migrate:rollback 
npm i dotenv
npm i zod = validação de dados
npm i @fastify/cookie