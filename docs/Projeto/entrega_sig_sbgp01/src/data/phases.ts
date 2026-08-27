// Softgoal Interdependency Graphs (SIG) — NFR Framework (Chung et al.)
// para a jornada do Pedido de Acesso à Informação (LAI) no INFORMA.BR

export type NodeKind = "softgoal" | "operationalizing" | "claim";
export type NodeStatus = "satisficed" | "weak" | "denied" | "undecided";
export type Contribution = "make" | "help" | "hurt" | "break" | "and" | "or";

export interface SigNode {
  id: string;
  kind: NodeKind;
  label: string;      // ex: "Rastreabilidade"
  topic?: string;     // ex: "[Pedido]"
  x: number;          // centro, viewBox 960 x 600
  y: number;
  w?: number;
  status?: NodeStatus;
}

export interface SigEdge {
  from: string;
  to: string;
  kind: Contribution;
}

export interface Phase {
  id: string;
  index: number;
  code: string;
  title: string;
  summary: string;
  narrative: string;
  nfrFocus: string[];
  nodes: SigNode[];
  edges: SigEdge[];
}

export const CONTRIB_LABEL: Record<Contribution, string> = {
  make: "++",
  help: "+",
  hurt: "−",
  break: "−−",
  and: "AND",
  or: "OR",
};

export const phases: Phase[] = [
  {
    id: "autenticacao",
    index: 1,
    code: "FASE 01",
    title: "Autenticação do Usuário",
    summary: "O cidadão se identifica para iniciar um pedido oficial.",
    narrative:
      "O usuário é redirecionado ao acesso unificado gov.br. Após login, o sistema valida a identidade e libera o painel de criação de pedidos.",
    nfrFocus: ["Segurança", "Identidade Confiável", "Usabilidade"],
    nodes: [
      { id: "seg", kind: "softgoal", label: "Segurança", topic: "[Acesso]", x: 480, y: 70, status: "satisficed" },
      { id: "ident", kind: "softgoal", label: "Identidade Confiável", topic: "[Cidadão]", x: 250, y: 230, status: "satisficed" },
      { id: "priv", kind: "softgoal", label: "Privacidade", topic: "[Dados]", x: 710, y: 230, status: "weak" },
      { id: "usab", kind: "softgoal", label: "Usabilidade", topic: "[Login]", x: 480, y: 280, status: "weak" },
      { id: "sso", kind: "operationalizing", label: "SSO gov.br", x: 250, y: 470, status: "satisficed" },
      { id: "val", kind: "operationalizing", label: "Validação de identidade", x: 560, y: 480, status: "satisficed" },
      { id: "redir", kind: "operationalizing", label: "Redirecionamento externo", x: 820, y: 460, status: "denied" },
    ],
    edges: [
      { from: "ident", to: "seg", kind: "make" },
      { from: "priv", to: "seg", kind: "help" },
      { from: "usab", to: "seg", kind: "help" },
      { from: "sso", to: "ident", kind: "make" },
      { from: "sso", to: "priv", kind: "help" },
      { from: "val", to: "ident", kind: "help" },
      { from: "val", to: "usab", kind: "hurt" },
      { from: "redir", to: "usab", kind: "hurt" },
      { from: "sso", to: "usab", kind: "help" },
    ],
  },
  {
    id: "formulacao",
    index: 2,
    code: "FASE 02",
    title: "Formulação do Pedido",
    summary: "O cidadão expressa sua necessidade de dados públicos.",
    narrative:
      "O cidadão descreve a solicitação em formulário claro, seleciona (ou é auxiliado a selecionar) o órgão responsável, e o sistema registra o pedido no banco de dados.",
    nfrFocus: ["Clareza do Pedido", "Roteamento Correto", "Rastreabilidade"],
    nodes: [
      { id: "qual", kind: "softgoal", label: "Qualidade do Pedido", topic: "[Formulação]", x: 480, y: 70, status: "satisficed" },
      { id: "clar", kind: "softgoal", label: "Clareza", topic: "[Descrição]", x: 230, y: 230, status: "weak" },
      { id: "rote", kind: "softgoal", label: "Roteamento Correto", topic: "[Órgão]", x: 730, y: 230, status: "satisficed" },
      { id: "rastr", kind: "softgoal", label: "Rastreabilidade", topic: "[Registro]", x: 480, y: 290, status: "satisficed" },
      { id: "form", kind: "operationalizing", label: "Formulário descritivo", x: 200, y: 470, status: "satisficed" },
      { id: "assist", kind: "operationalizing", label: "Seleção assistida de órgão", x: 500, y: 485, status: "satisficed" },
      { id: "reg", kind: "operationalizing", label: "Registro no banco de dados", x: 790, y: 465, status: "satisficed" },
    ],
    edges: [
      { from: "clar", to: "qual", kind: "help" },
      { from: "rote", to: "qual", kind: "make" },
      { from: "rastr", to: "qual", kind: "help" },
      { from: "form", to: "clar", kind: "help" },
      { from: "assist", to: "rote", kind: "make" },
      { from: "assist", to: "clar", kind: "help" },
      { from: "reg", to: "rastr", kind: "make" },
    ],
  },
  {
    id: "protocolo",
    index: 3,
    code: "FASE 03",
    title: "Protocolo e Prazos",
    summary: "O pedido é formalizado e inicia-se a contagem legal.",
    narrative:
      "Geração de número de protocolo único para rastreio e ativação da gestão de SLA — a contagem dos 20 dias da LAI — com alertas para cidadão e órgão.",
    nfrFocus: ["Rastreabilidade", "Conformidade Legal", "Transparência"],
    nodes: [
      { id: "conf", kind: "softgoal", label: "Conformidade Legal", topic: "[LAI]", x: 480, y: 68, status: "satisficed" },
      { id: "rastr", kind: "softgoal", label: "Rastreabilidade", topic: "[Protocolo]", x: 235, y: 225, status: "satisficed" },
      { id: "tempo", kind: "softgoal", label: "Tempestividade", topic: "[20 dias]", x: 730, y: 225, status: "weak" },
      { id: "transp", kind: "softgoal", label: "Transparência", topic: "[Cidadão]", x: 480, y: 285, status: "satisficed" },
      { id: "protoc", kind: "operationalizing", label: "Protocolo único", x: 210, y: 470, status: "satisficed" },
      { id: "sla", kind: "operationalizing", label: "Gestão de SLA", x: 500, y: 485, status: "satisficed" },
      { id: "alerta", kind: "operationalizing", label: "Alertas de prazo", x: 790, y: 465, status: "satisficed" },
    ],
    edges: [
      { from: "rastr", to: "conf", kind: "help" },
      { from: "tempo", to: "conf", kind: "make" },
      { from: "transp", to: "conf", kind: "help" },
      { from: "protoc", to: "rastr", kind: "make" },
      { from: "protoc", to: "transp", kind: "help" },
      { from: "sla", to: "tempo", kind: "make" },
      { from: "alerta", to: "tempo", kind: "help" },
      { from: "alerta", to: "transp", kind: "help" },
    ],
  },
  {
    id: "processamento",
    index: 4,
    code: "FASE 04",
    title: "Processamento pela Entidade",
    summary: "O servidor público do órgão analisa e responde.",
    narrative:
      "O órgão realiza a análise técnica da viabilidade e legalidade de entregar a informação e formaliza a emissão da resposta ao cidadão pela plataforma.",
    nfrFocus: ["Qualidade da Resposta", "Conformidade Legal", "Tempestividade"],
    nodes: [
      { id: "resp", kind: "softgoal", label: "Qualidade da Resposta", topic: "[Devolutiva]", x: 480, y: 68, status: "weak" },
      { id: "legal", kind: "softgoal", label: "Legalidade", topic: "[Entrega]", x: 235, y: 228, status: "satisficed" },
      { id: "compl", kind: "softgoal", label: "Completude", topic: "[Conteúdo]", x: 730, y: 228, status: "weak" },
      { id: "tempo", kind: "softgoal", label: "Tempestividade", topic: "[Prazo]", x: 480, y: 288, status: "weak" },
      { id: "analise", kind: "operationalizing", label: "Análise técnica interna", x: 250, y: 475, status: "satisficed" },
      { id: "devol", kind: "operationalizing", label: "Emissão da resposta", x: 640, y: 478, status: "satisficed" },
    ],
    edges: [
      { from: "legal", to: "resp", kind: "help" },
      { from: "compl", to: "resp", kind: "make" },
      { from: "tempo", to: "resp", kind: "help" },
      { from: "analise", to: "legal", kind: "make" },
      { from: "analise", to: "compl", kind: "help" },
      { from: "analise", to: "tempo", kind: "hurt" },
      { from: "devol", to: "resp", kind: "help" },
      { from: "devol", to: "tempo", kind: "help" },
    ],
  },
  {
    id: "avaliacao",
    index: 5,
    code: "FASE 05",
    title: "Avaliação do Cidadão",
    summary: "O cidadão decide se a resposta atende ao pedido.",
    narrative:
      "Cenário atendido: o sistema registra a satisfação e encerra o processo. Cenário não atendido: o sistema habilita a interposição de recurso.",
    nfrFocus: ["Satisfação do Cidadão", "Transparência", "Direito de Revisão"],
    nodes: [
      { id: "sat", kind: "softgoal", label: "Satisfação do Cidadão", topic: "[Resposta]", x: 480, y: 66, status: "weak" },
      { id: "transp", kind: "softgoal", label: "Transparência", topic: "[Avaliação]", x: 235, y: 225, status: "satisficed" },
      { id: "revisao", kind: "softgoal", label: "Direito de Revisão", topic: "[Cidadão]", x: 730, y: 225, status: "satisficed" },
      { id: "atend", kind: "operationalizing", label: "Registro de satisfação → encerramento", x: 250, y: 475, w: 230, status: "satisficed" },
      { id: "discordo", kind: "operationalizing", label: "Habilitar interposição de recurso", x: 700, y: 475, w: 220, status: "satisficed" },
      { id: "claim", kind: "claim", label: "Resposta incompleta ou negada", x: 700, y: 330, w: 200, status: "denied" },
    ],
    edges: [
      { from: "transp", to: "sat", kind: "help" },
      { from: "revisao", to: "sat", kind: "help" },
      { from: "atend", to: "sat", kind: "make" },
      { from: "atend", to: "transp", kind: "help" },
      { from: "discordo", to: "revisao", kind: "make" },
      { from: "claim", to: "discordo", kind: "help" },
      { from: "claim", to: "sat", kind: "break" },
    ],
  },
  {
    id: "recursal",
    index: 6,
    code: "FASE 06",
    title: "Fluxo Recursal (Instâncias)",
    summary: "Escalada do pedido por até quatro instâncias de revisão.",
    narrative:
      "Persistindo a negativa, o recurso escala: 1ª instância no próprio órgão, 2ª à autoridade máxima, 3ª à CGU e 4ª à CMRI — garantindo o direito de revisão.",
    nfrFocus: ["Direito de Revisão", "Imparcialidade", "Conformidade Legal"],
    nodes: [
      { id: "revisao", kind: "softgoal", label: "Direito de Revisão", topic: "[Recurso]", x: 480, y: 62, status: "satisficed" },
      { id: "imparc", kind: "softgoal", label: "Imparcialidade", topic: "[Instância]", x: 235, y: 210, status: "weak" },
      { id: "esgot", kind: "softgoal", label: "Esgotamento de Vias", topic: "[Recursal]", x: 730, y: 210, status: "satisficed" },
      { id: "i1", kind: "operationalizing", label: "1ª · Órgão de origem", x: 150, y: 420, w: 170, status: "satisficed" },
      { id: "i2", kind: "operationalizing", label: "2ª · Autoridade máxima", x: 380, y: 460, w: 175, status: "satisficed" },
      { id: "i3", kind: "operationalizing", label: "3ª · CGU", x: 610, y: 460, w: 150, status: "satisficed" },
      { id: "i4", kind: "operationalizing", label: "4ª · CMRI", x: 830, y: 420, w: 150, status: "satisficed" },
    ],
    edges: [
      { from: "imparc", to: "revisao", kind: "help" },
      { from: "esgot", to: "revisao", kind: "make" },
      { from: "i1", to: "esgot", kind: "help" },
      { from: "i2", to: "esgot", kind: "help" },
      { from: "i3", to: "imparc", kind: "make" },
      { from: "i3", to: "esgot", kind: "help" },
      { from: "i4", to: "imparc", kind: "make" },
      { from: "i4", to: "esgot", kind: "help" },
      { from: "i1", to: "imparc", kind: "hurt" },
    ],
  },
];
