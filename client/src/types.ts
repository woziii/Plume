// types.ts
export type ContentType = 'jurisprudence' | 'source' | 'doctrine' | 'adage';
export type SectionType = 'text' | 'numbered' | 'list';

// Structure de base pour le contenu détaillé
interface BaseDetailContent {
  type: ContentType;
  header: {
    title: string;
    date?: string;
    link?: string;
    reference?: string;
    relevanceScore: number;
  };
  relevanceNote: {
    score: number;
    explanation: string;
  };
  mainContent: {
    summary: string;
    sections: ContentSection[];
  };
  metadata?: {
    relatedDocs?: RelatedDocument[];
    link?: string;
  };
  actions: {
    tags: string[];
  };
}

export interface ContentSection {
  title: string;
  content: string | Array<{key: string; value: string}>;
  type: SectionType;
}

export interface RelatedDocument {
  title: string;
  summary: string;
  date?: string;
}

// Spécifications pour chaque type
export interface JurisprudenceDetail extends BaseDetailContent {
  type: 'jurisprudence';
  header: BaseDetailContent['header'] & {
    jurisdiction: string;
    chamber?: string;
  };
}

export interface SourceDetail extends BaseDetailContent {
  type: 'source';
  header: BaseDetailContent['header'] & {
    dossierNum: string;
  };
}

export interface DoctrineDetail extends BaseDetailContent {
  type: 'doctrine';
  header: BaseDetailContent['header'] & {
    author: string;
    publication: string;
  };
}

export interface AdageDetail extends BaseDetailContent {
  type: 'adage';
  header: BaseDetailContent['header'] & {
    category?: string;
  };
}

export type DetailContent = JurisprudenceDetail | SourceDetail | DoctrineDetail | AdageDetail;

// Types pour le dashboard
export interface RelatedDocument {
  id: string;
  title: string;
  summary: string;
  date?: string;
  link?: string;
}

export interface DashboardItem {
  id: string;
  type: ContentType;
  displayData: {
    title: string;
    summary: string;
    date?: string;
    relevanceScore: number;
    isPrimary?: boolean;
    tags: string[];
  };
  metadata?: {
    link?: string;
    relatedDocs?: RelatedDocument[];  // Optionnel
  };
  detailContent: DetailContent;
}

export interface DashboardData {
  header: {
    factsummary: string;
    legalquestion: string;
  };
  internalSources: DashboardItem[];
  jurisprudences: DashboardItem[];
  doctrine: DashboardItem[];
  adages: DashboardItem[];
}