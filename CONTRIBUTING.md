# Guia de contribuição

Obrigado por contribuir com o Projeto Governo Eletrônico. Este guia busca manter a documentação consistente, verificável e adequada aos critérios da disciplina Arquitetura e Desenho de Software.

Ao participar, você concorda em seguir o [Código de Conduta](CODE_OF_CONDUCT.md).

## Antes de começar

1. Consulte as issues, discussões do grupo e relatórios para evitar trabalho duplicado.
2. Confirme a subequipe, o foco e o artefato aos quais a contribuição pertence.
3. Para mudanças amplas de escopo ou estrutura, alinhe a proposta com o grupo antes da implementação.
4. Crie ou utilize uma branch específica; não desenvolva diretamente na `main`.

Sugestões de nomes de branch:

- `docs/ajuste-referencias`;
- `fix/link-sidebar`.

## Produção dos artefatos

Todo artefato acadêmico deve apresentar, quando aplicável:

- objetivo e escopo;
- metodologia utilizada;
- participantes e responsabilidades;
- justificativas e análise crítica das decisões;
- rastreabilidade com outros artefatos;
- referências confiáveis;
- histórico de versionamento;
- registro transparente do uso de IA generativa.

Não inclua dados pessoais, credenciais, informações sensíveis ou conteúdo protegido sem autorização. Ao analisar um sistema real, respeite seus termos de uso e limite a coleta ao necessário para a atividade acadêmica.

## Escrita e organização

- Escreva em português brasileiro, com linguagem clara e objetiva.
- Use títulos hierárquicos sem saltos desnecessários.
- Prefira links relativos para arquivos do próprio repositório.
- Adicione texto alternativo descritivo às imagens.
- Identifique figuras e informe sua fonte ou autoria.
- Use datas no formato `DD/MM/AAAA` nas tabelas acadêmicas.
- Não remova conteúdo de outra subequipe sem alinhamento prévio.

Os arquivos exibidos no site ficam em `docs/`. Ao adicionar uma página, inclua-a também em `docs/_sidebar.md`. Imagens e diagramas devem ficar próximos ao contexto correspondente, preferencialmente dentro de `docs/Base/Imagens/` ou da pasta do artefato.

## Commits

Faça commits pequenos e relacionados a uma única finalidade. Utilize mensagens no imperativo ou que descrevam objetivamente a alteração, seguindo este padrão:

```text
tipo: descrição breve
```

Tipos recomendados:

- `docs`: criação ou atualização de documentação;
- `fix`: correção de erro, link ou formatação;
- `feat`: inclusão de novo artefato ou funcionalidade;
- `refactor`: reorganização sem alteração de conteúdo;
- `chore`: manutenção do repositório.

Exemplos:

```text
docs: adiciona metodologia da engenharia reversa
fix: corrige link do diagrama BPMN
```

## Validação local

Antes de abrir um pull request, execute o site localmente:

```bash
npx docsify-cli serve docs
```

Verifique:

- se a página aparece no menu;
- se links e imagens carregam corretamente;
- se tabelas e diagramas estão legíveis;
- se não ficaram instruções de template, exemplos ou campos incompletos;
- se as participações e os versionamentos foram atualizados;
- se as fontes citadas aparecem nas referências.

## Pull requests

O pull request deve conter:

1. resumo do que foi alterado;
2. motivação da mudança;
3. artefatos e páginas afetados;
4. evidências visuais, quando houver alteração de diagramas ou layout;
5. forma de validação realizada;
6. vínculo com issue, tarefa ou foco da entrega, quando existente.

Solicite revisão de ao menos outro integrante. Resolva os comentários sem apagar o histórico da discussão e aguarde a aprovação antes da integração à `main`.

## Uso de IA generativa

Ferramentas de IA podem apoiar pesquisa, revisão e estruturação, mas não substituem a autoria e a avaliação crítica. Quem submete a contribuição é responsável por:

- conferir fatos, referências e coerência técnica;
- revisar integralmente o conteúdo gerado;
- declarar o uso da ferramenta na seção apropriada do relatório;
- evitar inserir dados pessoais ou materiais confidenciais em serviços externos;
- não apresentar conteúdo gerado automaticamente como evidência observacional;
- corrigir alucinações, omissões e vieses antes da submissão.

## Dúvidas

Use os canais internos do grupo ou abra uma issue com contexto suficiente. Questões acadêmicas que alterem os critérios da entrega devem ser confirmadas com a docente responsável.
