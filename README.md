# 💳 API de Cálculo de Boleto - NestJS

Esta API RESTful permite calcular o valor atualizado de um boleto vencido, incluindo **multa**, **juros por atraso** e, opcionalmente, o **parcelamento do pagamento** com acréscimo mensal.

---

## Funcionalidades

- ✅ Cálculo de multa (2%) e juros diários (0.033%)
- ✅ Retorno com detalhes do boleto atualizado
- ✅ Parcelamento com juros mensais (1.3% ao mês)
- ✅ Projeto modular, limpo e escalável
- ✅ Validações com `class-validator`
- ✅ Documentação automática com Swagger

---

## Instalação

```bash
npm install
npm init
```

## Rodando localmente

```bash
# development
npm run start:dev
```

## Rotas

Aqui estão as rotas para acessar a API:

- POST /api/calcular-boleto

```bash
# Exemplo de uso
{
  "valor": 1000.00,
  "vencimento": "2025-06-10",
  "data_pagamento": "2025-06-23",
  "parcelas": 3
}

# Exemplo de retorno(com parcelas)
{
  "valor_original": 1000,
  "dias_em_atraso": 13,
  "multa": 20,
  "juros": 4.29,
  "valor_atualizado": 1024.29,
  "parcelas": 3,
  "juros_parcelamento": 39.95,
  "valor_total_com_juros": 1064.24,
  "valor_parcela": 354.75
}
```

- GET /api/historico

```bash
# Exemplo de retorno de uso
[
  {
    "valor": 1000,
    "vencimento": "2025-06-10",
    "data_pagamento": "2025-06-23",
    "parcelas": 3
  },
  {
    "valor": 4444444,
    "vencimento": "2023-06-10",
    "data_pagamento": "2025-06-23",
    "parcelas": 5
  }
]
```

- GET /api/historico

```bash
# Exemplo de retorno de uso
[
  {
    "valor_original": 4444444,
    "dias_em_atraso": 744,
    "multa": 88888.88,
    "juros": 1091199.89,
    "valor_atualizado": 5624532.77,
    "parcelas": 5,
    "juros_parcelamento": 365594.63,
    "valor_total_com_juros": 5990127.4,
    "valor_parcela": 1198025.48
  },
  {
    "valor_original": 1111111111,
    "dias_em_atraso": 744,
    "multa": 22222222.22,
    "juros": 272799999.97,
    "valor_atualizado": 1406133333.19,
    "parcelas": 5,
    "juros_parcelamento": 91398666.66,
    "valor_total_com_juros": 1497531999.85,
    "valor_parcela": 299506399.97
  },
]
```

## Dependencias instaladas

```bash
# Pipes
$ npm i class-validatos
$ npm i class-transformer
```

## Autor

Feito por Henrique Baiardi de Menonça
