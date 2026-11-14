export interface TechPill {
  label: string;
  bg: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface ProjectScores {
  perf: string;
  sec: string;
  uptime: string;
  tests: string;
}

export interface MetricItem {
  tag: string;
  value: string;
  desc: string;
  bg: string;
}

export interface ArchitectureNode {
  step: string;
  title: string;
  tech: string;
  subtitle: string;
  detail: string;
}

export interface SchemaColumn {
  name: string;
  type: string;
}

export interface SchemaTable {
  name: string;
  badge: string;
  color: string;
  columns: SchemaColumn[];
}

export interface DecisionItem {
  badge: string;
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  name: string;
  categoryBadge: string;
  categoryBadgeBg: string;
  version: string;
  roleTimeline: string;
  subtitle: string;
  overview: string;
  previewImage: string;
  liveUrl: string;
  githubUrl: string;
  cloneCmd: string;
  techPills: TechPill[];
  specs: SpecItem[];
  scores: ProjectScores;
  metrics: MetricItem[];
  architectureNodes: ArchitectureNode[];
  schemaTables: SchemaTable[];
  codePath: string;
  codeNote: string;
  codeSnippet: string;
  challengeTitle: string;
  challengeBody: string;
  challengeBullets: string[];
  solutionTitle: string;
  solutionBody: string;
  solutionBullets: string[];
  decisions: DecisionItem[];
}

