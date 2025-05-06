import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GraduationCap, Calculator, Brain, ChevronRight, Ruler } from 'lucide-react';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentArea from './pages/StudentArea';
import GradePage from './pages/GradePage';
import SubjectPage from './pages/SubjectPage';
import ToolsPage from './pages/ToolsPage.tsx';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import { useAuth } from './contexts/AuthContext';

export const grades = [
  {
    year: 6,
    icon: Calculator,
    description: "Introdução aos números, formas geométricas e operações básicas",
    color: "from-blue-500 to-green-400",
    topics: [
      { 
        title: "Números", 
        content: "Visualizações de operações básicas, números inteiros e decimais", 
        path: "numeros",
        activities: [
          {
            title: "Operações Básicas",
            content: "Pratique adição, subtração, multiplicação e divisão",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Quanto é 125 + 375?",
                  options: ["400", "500", "600", "700"],
                  correctAnswer: 1,
                  xpReward: 20
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Álgebra", 
        content: "Introdução a padrões e sequências numéricas", 
        path: "algebra",
        activities: [
          {
            title: "Sequências Numéricas",
            content: "Descubra o padrão e complete a sequência",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é o próximo número na sequência: 2, 4, 6, 8, ...?",
                  options: ["9", "10", "11", "12"],
                  correctAnswer: 1,
                  xpReward: 20
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Geometria", 
        content: "Formas básicas, simetria e transformações", 
        path: "geometria",
        activities: [
          {
            title: "Formas Geométricas",
            content: "Explore diferentes formas geométricas e suas propriedades",
            hasGeometry: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Quantos lados tem um hexágono?",
                  options: ["4", "5", "6", "7"],
                  correctAnswer: 2,
                  xpReward: 20
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Grandezas e Medidas", 
        content: "Unidades de medida (comparações interativas)", 
        path: "grandezas",
        activities: [
          {
            title: "Medidas de Comprimento",
            content: "Aprenda a usar diferentes unidades de medida",
            hasRuler: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Quantos centímetros há em 1 metro?",
                  options: ["10", "100", "1000", "10000"],
                  correctAnswer: 1,
                  xpReward: 20
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Probabilidade e Estatística", 
        content: "Gráficos de barras e colunas, interpretação de dados", 
        path: "probabilidade",
        activities: [
          {
            title: "Leitura de Gráficos",
            content: "Aprenda a interpretar diferentes tipos de gráficos",
            hasGraph: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Em um gráfico de barras, qual é a altura da barra que representa 50 alunos?",
                  options: ["5 cm", "50 cm", "Depende da escala", "Sempre 50 cm"],
                  correctAnswer: 2,
                  xpReward: 15
                },
                {
                  id: 2,
                  question: "Qual tipo de gráfico é mais adequado para representar as notas de uma turma?",
                  options: ["Pizza", "Barras", "Linha", "Dispersão"],
                  correctAnswer: 1,
                  xpReward: 20
                }
              ]
            }
          },
          {
            title: "Probabilidade Básica",
            content: "Entenda conceitos básicos de probabilidade",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Ao lançar um dado, qual é a probabilidade de sair um número par?",
                  options: ["1/6", "1/2", "1/3", "2/3"],
                  correctAnswer: 1,
                  xpReward: 25
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Educação Financeira", 
        content: "Conceitos básicos de poupança e gastos", 
        path: "financeira",
        activities: [
          {
            title: "Orçamento Pessoal",
            content: "Aprenda a organizar receitas e despesas",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Se você recebe R$ 100,00 de mesada, quanto é recomendado guardar?",
                  options: ["Nada", "R$ 10,00", "R$ 20,00", "Todo o valor"],
                  correctAnswer: 1,
                  xpReward: 20
                }
              ]
            }
          },
          {
            title: "Consumo Consciente",
            content: "Aprenda a fazer escolhas financeiras responsáveis",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é a melhor atitude antes de comprar algo?",
                  options: [
                    "Comprar imediatamente",
                    "Pesquisar preços",
                    "Pedir emprestado",
                    "Usar o cartão de crédito"
                  ],
                  correctAnswer: 1,
                  xpReward: 25
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    year: 7,
    icon: Brain,
    description: "Números racionais, equações e geometria avançada",
    color: "from-purple-500 to-pink-400",
    topics: [
      { 
        title: "Números", 
        content: "Números racionais e operações", 
        path: "numeros",
        activities: [
          {
            title: "Frações e Decimais",
            content: "Aprenda a trabalhar com números racionais",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é a forma decimal de 3/4?",
                  options: ["0,25", "0,50", "0,75", "0,80"],
                  correctAnswer: 2,
                  xpReward: 25
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Álgebra", 
        content: "Equações e inequações (resolução passo a passo)", 
        path: "algebra",
        activities: [
          {
            title: "Equações do 1º Grau",
            content: "Resolva equações passo a passo",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Se 2x + 3 = 11, quanto vale x?",
                  options: ["3", "4", "5", "6"],
                  correctAnswer: 1,
                  xpReward: 30
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Geometria", 
        content: "Teoremas, retas e ângulos", 
        path: "geometria",
        activities: [
          {
            title: "Semelhança de Triângulos",
            content: "Explore as relações entre triângulos semelhantes",
            hasGeometry: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que determina se dois triângulos são semelhantes?",
                  options: [
                    "Mesma área",
                    "Mesmos ângulos",
                    "Mesmo perímetro",
                    "Mesma altura"
                  ],
                  correctAnswer: 1,
                  xpReward: 35
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Grandezas e Medidas", 
        content: "Volumes de sólidos geométricos", 
        path: "grandezas",
        activities: [
          {
            title: "Volumes de Sólidos",
            content: "Calcule volumes de diferentes sólidos geométricos",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é o volume de um cubo de aresta 3?",
                  options: ["9", "18", "27", "36"],
                  correctAnswer: 2,
                  xpReward: 30
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Probabilidade e Estatística", 
        content: "Probabilidade condicional e análise estatística", 
        path: "probabilidade",
        activities: [
          {
            title: "Probabilidade Condicional",
            content: "Aprenda a calcular probabilidades dependentes",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Em um baralho, qual a probabilidade de tirar um ás dado que a carta é de copas?",
                  options: ["1/52", "1/13", "1/4", "4/52"],
                  correctAnswer: 1,
                  xpReward: 50
                }
              ]
            }
          },
          {
            title: "Análise Estatística Avançada",
            content: "Trabalhe com conjuntos de dados complexos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual medida é mais adequada para dados assimétricos?",
                  options: ["Média", "Moda", "Mediana", "Variância"],
                  correctAnswer: 2,
                  xpReward: 45
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Educação Financeira", 
        content: "Planejamento financeiro e taxas", 
        path: "financeira",
        activities: [
          {
            title: "Planejamento Financeiro Avançado",
            content: "Aprenda sobre investimentos e aposentadoria",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que é diversificação de investimentos?",
                  options: [
                    "Investir tudo em um lugar",
                    "Dividir investimentos em diferentes tipos",
                    "Guardar dinheiro na poupança",
                    "Fazer empréstimos"
                  ],
                  correctAnswer: 1,
                  xpReward: 50
                }
              ]
            }
          },
          {
            title: "Taxas e Impostos",
            content: "Entenda os diferentes tipos de taxas e impostos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que é IOF?",
                  options: [
                    "Imposto sobre vendas",
                    "Taxa de banco",
                    "Imposto sobre operações financeiras",
                    "Taxa de juros"
                  ],
                  correctAnswer: 2,
                  xpReward: 45
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    year: 8,
    icon: Calculator,
    description: "Potenciação, álgebra e análise de dados",
    color: "from-indigo-500 to-blue-400",
    topics: [
      { 
        title: "Números", 
        content: "Potenciação e radiciação", 
        path: "numeros",
        activities: [
          {
            title: "Potências e Raízes",
            content: "Aprenda a trabalhar com potências e raízes",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é o valor de 2³?",
                  options: ["4", "6", "8", "16"],
                  correctAnswer: 2,
                  xpReward: 30
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Álgebra", 
        content: "Expressões algébricas e fatoração", 
        path: "algebra",
        activities: [
          {
            title: "Fatoração",
            content: "Aprenda a fatorar expressões algébricas",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é a fatoração de x² - 4?",
                  options: ["(x+2)(x-2)", "(x+2)(x+2)", "(x-2)(x-2)", "x(x-4)"],
                  correctAnswer: 0,
                  xpReward: 35
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Geometria", 
        content: "Teoremas, retas e ângulos", 
        path: "geometria",
        activities: [
          {
            title: "Semelhança de Triângulos",
            content: "Explore as relações entre triângulos semelhantes",
            hasGeometry: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que determina se dois triângulos são semelhantes?",
                  options: [
                    "Mesma área",
                    "Mesmos ângulos",
                    "Mesmo perímetro",
                    "Mesma altura"
                  ],
                  correctAnswer: 1,
                  xpReward: 35
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Grandezas e Medidas", 
        content: "Volumes de sólidos geométricos", 
        path: "grandezas",
        activities: [
          {
            title: "Volumes de Sólidos",
            content: "Calcule volumes de diferentes sólidos geométricos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é o volume de um cubo de aresta 3?",
                  options: ["9", "18", "27", "36"],
                  correctAnswer: 2,
                  xpReward: 30
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Probabilidade e Estatística", 
        content: "Probabilidade condicional e análise estatística", 
        path: "probabilidade",
        activities: [
          {
            title: "Probabilidade Condicional",
            content: "Aprenda a calcular probabilidades dependentes",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Em um baralho, qual a probabilidade de tirar um ás dado que a carta é de copas?",
                  options: ["1/52", "1/13", "1/4", "4/52"],
                  correctAnswer: 1,
                  xpReward: 50
                }
              ]
            }
          },
          {
            title: "Análise Estatística Avançada",
            content: "Trabalhe com conjuntos de dados complexos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual medida é mais adequada para dados assimétricos?",
                  options: ["Média", "Moda", "Mediana", "Variância"],
                  correctAnswer: 2,
                  xpReward: 45
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Educação Financeira", 
        content: "Planejamento financeiro e taxas", 
        path: "financeira",
        activities: [
          {
            title: "Planejamento Financeiro Avançado",
            content: "Aprenda sobre investimentos e aposentadoria",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que é diversificação de investimentos?",
                  options: [
                    "Investir tudo em um lugar",
                    "Dividir investimentos em diferentes tipos",
                    "Guardar dinheiro na poupança",
                    "Fazer empréstimos"
                  ],
                  correctAnswer: 1,
                  xpReward: 50
                }
              ]
            }
          },
          {
            title: "Taxas e Impostos",
            content: "Entenda os diferentes tipos de taxas e impostos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que é IOF?",
                  options: [
                    "Imposto sobre vendas",
                    "Taxa de banco",
                    "Imposto sobre operações financeiras",
                    "Taxa de juros"
                  ],
                  correctAnswer: 2,
                  xpReward: 45
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    year: 9,
    icon: GraduationCap,
    description: "Funções, geometria analítica e probabilidade",
    color: "from-orange-500 to-red-400",
    topics: [
      { 
        title: "Números", 
        content: "Números reais e irracionais", 
        path: "numeros",
        activities: [
          {
            title: "Números Irracionais",
            content: "Explore números como π e raiz quadrada de 2",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual destes é um número irracional?",
                  options: ["0,5", "√4", "π", "2,75"],
                  correctAnswer: 2,
                  xpReward: 30
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Álgebra", 
        content: "Funções e gráficos", 
        path: "algebra",
        activities: [
          {
            title: "Funções do 1º Grau",
            content: "Aprenda sobre funções lineares",
            hasGraph: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que representa o coeficiente angular de uma função linear?",
                  options: ["O ponto inicial", "A inclinação", "O ponto final", "A área"],
                  correctAnswer: 1,
                  xpReward: 35
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Geometria", 
        content: "Teoremas, retas e ângulos", 
        path: "geometria",
        activities: [
          {
            title: "Semelhança de Triângulos",
            content: "Explore as relações entre triângulos semelhantes",
            hasGeometry: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que determina se dois triângulos são semelhantes?",
                  options: [
                    "Mesma área",
                    "Mesmos ângulos",
                    "Mesmo perímetro",
                    "Mesma altura"
                  ],
                  correctAnswer: 1,
                  xpReward: 35
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Grandezas e Medidas", 
        content: "Volumes de sólidos geométricos", 
        path: "grandezas",
        activities: [
          {
            title: "Volumes de Sólidos",
            content: "Calcule volumes de diferentes sólidos geométricos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual é o volume de um cubo de aresta 3?",
                  options: ["9", "18", "27", "36"],
                  correctAnswer: 2,
                  xpReward: 30
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Probabilidade e Estatística", 
        content: "Probabilidade condicional e análise estatística", 
        path: "probabilidade",
        activities: [
          {
            title: "Probabilidade Condicional",
            content: "Aprenda a calcular probabilidades dependentes",
            hasCalculator: true,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Em um baralho, qual a probabilidade de tirar um ás dado que a carta é de copas?",
                  options: ["1/52", "1/13", "1/4", "4/52"],
                  correctAnswer: 1,
                  xpReward: 50
                }
              ]
            }
          },
          {
            title: "Análise Estatística Avançada",
            content: "Trabalhe com conjuntos de dados complexos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "Qual medida é mais adequada para dados assimétricos?",
                  options: ["Média", "Moda", "Mediana", "Variância"],
                  correctAnswer: 2,
                  xpReward: 45
                }
              ]
            }
          }
        ]
      },
      { 
        title: "Educação Financeira", 
        content: "Planejamento financeiro e taxas", 
        path: "financeira",
        activities: [
          {
            title: "Planejamento Financeiro Avançado",
            content: "Aprenda sobre investimentos e aposentadoria",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que é diversificação de investimentos?",
                  options: [
                    "Investir tudo em um lugar",
                    "Dividir investimentos em diferentes tipos",
                    "Guardar dinheiro na poupança",
                    "Fazer empréstimos"
                  ],
                  correctAnswer: 1,
                  xpReward: 50
                }
              ]
            }
          },
          {
            title: "Taxas e Impostos",
            content: "Entenda os diferentes tipos de taxas e impostos",
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "O que é IOF?",
                  options: [
                    "Imposto sobre vendas",
                    "Taxa de banco",
                    "Imposto sobre operações financeiras",
                    "Taxa de juros"
                  ],
                  correctAnswer: 2,
                  xpReward: 45
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

const sections = [
  {
    title: "Ensino Fundamental II",
    description: "Explore os conteúdos por ano",
    items: [
      {
        title: "6º Ano",
        description: "Operações básicas, formas geométricas e muito mais",
        icon: Calculator,
        color: "from-blue-500 to-green-400",
        link: "/grade/6"
      },
      {
        title: "7º Ano",
        description: "Números racionais, equações e geometria",
        icon: Brain,
        color: "from-purple-500 to-pink-400",
        link: "/grade/7"
      },
      {
        title: "8º Ano",
        description: "Potenciação, álgebra e análise de dados",
        icon: Calculator,
        color: "from-indigo-500 to-blue-400",
        link: "/grade/8"
      },
      {
        title: "9º Ano",
        description: "Funções, geometria analítica e probabilidade",
        icon: GraduationCap,
        color: "from-orange-500 to-red-400",
        link: "/grade/9"
      }
    ]
  },
  {
    title: "Recursos Educacionais",
    description: "Ferramentas interativas para aprendizado",
    items: [
      {
        title: "Calculadora Interativa",
        description: "Pratique operações matemáticas",
        icon: Calculator,
        color: "from-green-500 to-emerald-400",
        link: "/tools/calculator"
      },
      {
        title: "Visualizador de Gráficos",
        description: "Explore funções e gráficos",
        icon: Brain,
        color: "from-blue-500 to-cyan-400",
        link: "/tools/graphs"
      },
      {
        title: "Régua Interativa",
        description: "Meça e compare distâncias",
        icon: Ruler,
        color: "from-purple-500 to-pink-400",
        link: "/tools/ruler"
      },
      {
        title: "Formas Geométricas",
        description: "Calcule áreas e perímetros",
        icon: Calculator,
        color: "from-orange-500 to-red-400",
        link: "/tools/geometry"
      }
    ]
  }
];

declare global {
  interface Window {
    grades: typeof grades;
  }
}

window.grades = grades;

function App() {
  const { user, loading, isTeacher } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={
              isTeacher ? <Navigate to="/teacher" replace /> : <StudentDashboard sections={sections} />
            } />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/student" element={<StudentArea />} />
            <Route path="/grade/:year" element={<GradePage grades={grades} />} />
            <Route path="/grade/:grade/:subject" element={<SubjectPage />} />
            <Route path="/tools/calculator" element={<ToolsPage tool="calculator" />} />
            <Route path="/tools/graphs" element={<ToolsPage tool="graphs" />} />
            <Route path="/tools/ruler" element={<ToolsPage tool="ruler" />} />
            <Route path="/tools/geometry" element={<ToolsPage tool="geometry" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;