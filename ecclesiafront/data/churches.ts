export interface Church {
  id: number;
  nome: string;
  bairro: string;
  endereco: string;
  missas: { dia: string; horarios: string[] }[];
  confissoes: { dia: string; horarios: string[] }[];
  adoracao?: { dia: string; horarios: string[] }[];
}

export const churches: Church[] = [
  {
    id: 1,
    nome: "Catedral Metropolitana de Londrina",
    bairro: "Centro",
    endereco: "Rua Sergipe, 456 – Centro, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["7h", "9h", "11h", "18h"] },
      { dia: "Segunda a Sexta", horarios: ["7h", "12h", "18h"] },
      { dia: "Sábado", horarios: ["7h", "18h"] },
    ],
    confissoes: [
      { dia: "Quarta-feira", horarios: ["9h às 11h"] },
      { dia: "Sábado", horarios: ["15h às 17h"] },
    ],
    adoracao: [
      { dia: "Quinta-feira", horarios: ["8h às 12h"] },
    ],
  },
  {
    id: 2,
    nome: "Paróquia São José",
    bairro: "Jardim Califórnia",
    endereco: "Rua das Acácias, 120 – Jardim Califórnia, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["8h", "10h", "19h"] },
      { dia: "Segunda a Sexta", horarios: ["7h", "19h"] },
    ],
    confissoes: [
      { dia: "Sexta-feira", horarios: ["16h às 17h30"] },
    ],
  },
  {
    id: 3,
    nome: "Paróquia Nossa Senhora de Fátima",
    bairro: "Vila Brasil",
    endereco: "Av. São Paulo, 789 – Vila Brasil, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["7h30", "9h30", "19h"] },
      { dia: "Terça e Quinta", horarios: ["19h"] },
      { dia: "Sábado", horarios: ["17h"] },
    ],
    confissoes: [
      { dia: "Sábado", horarios: ["15h30 às 16h45"] },
    ],
    adoracao: [
      { dia: "Primeira sexta-feira do mês", horarios: ["8h às 17h"] },
    ],
  },
  {
    id: 4,
    nome: "Paróquia Santo Antônio",
    bairro: "Jardim Shangri-Lá",
    endereco: "Rua Belo Horizonte, 321 – Jardim Shangri-Lá, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["8h", "18h"] },
      { dia: "Quarta e Sexta", horarios: ["19h"] },
    ],
    confissoes: [
      { dia: "Quarta-feira", horarios: ["18h às 18h45"] },
    ],
  },
  {
    id: 5,
    nome: "Paróquia Sagrado Coração de Jesus",
    bairro: "Gleba Palhano",
    endereco: "Rua Ayrton Senna, 555 – Gleba Palhano, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["9h", "11h", "19h30"] },
      { dia: "Segunda a Sexta", horarios: ["12h15", "19h"] },
      { dia: "Sábado", horarios: ["18h"] },
    ],
    confissoes: [
      { dia: "Terça-feira", horarios: ["10h às 11h30"] },
      { dia: "Sábado", horarios: ["16h às 17h30"] },
    ],
    adoracao: [
      { dia: "Quarta-feira", horarios: ["9h às 17h"] },
    ],
  },
  {
    id: 6,
    nome: "Paróquia São Pedro",
    bairro: "Heimtal",
    endereco: "Rua Prefeito Faria Lima, 200 – Heimtal, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["8h", "17h"] },
      { dia: "Quinta-feira", horarios: ["19h"] },
    ],
    confissoes: [
      { dia: "Domingo", horarios: ["7h às 7h45"] },
    ],
  },
  {
    id: 7,
    nome: "Paróquia Santa Teresinha",
    bairro: "Conjunto Cafezal",
    endereco: "Rua José de Alencar, 88 – Conjunto Cafezal, Londrina – PR",
    missas: [
      { dia: "Domingo", horarios: ["7h", "9h", "19h"] },
      { dia: "Segunda a Sábado", horarios: ["7h"] },
    ],
    confissoes: [
      { dia: "Sábado", horarios: ["14h às 16h"] },
    ],
    adoracao: [
      { dia: "Terça-feira", horarios: ["8h às 12h"] },
    ],
  },
];

export const bairros = [...new Set(churches.map((c) => c.bairro))].sort();
