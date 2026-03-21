// Base WordPress node
export interface WPNode {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  modified: string;
  uri: string;
}

// Featured image
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  };
}

// Taxonomy term
export interface WPTerm {
  node: {
    id: string;
    name: string;
    slug: string;
  };
}

// Ponente (speaker) repeater
export interface Ponente {
  nombre: string;
  cargo?: string;
  bio?: string;
}

// Precio repeater
export interface Precio {
  tipo: string;
  importe: number;
  descripcion?: string;
}

// Diploma fields
export interface DiplomaFields {
  emiteDiploma: boolean;
  entidadEmisora?: string;
  horasConvalidables?: number;
}

// Formacion fields
export interface FormacionFields {
  fechaInicio: string;
  fechaFin?: string;
  horario?: string;
  horasLectivas?: number;
  ponentes?: Ponente[];
  lugar?: string;
  plazas?: number;
  tipoAcceso?: string;
  esGratuito: boolean;
  precios?: Precio[];
  programa?: string;
  urlInscripcion?: string;
  estado?: 'abierta' | 'cerrada' | 'completa' | 'cancelada';
  diploma?: DiplomaFields;
}

// Formacion (evento formativo)
export interface Formacion extends WPNode {
  formacionFields: FormacionFields;
  content?: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  categorias?: {
    nodes: WPTerm['node'][];
  };
}

// Curso fields (extends FormacionFields)
export interface CursoFields extends FormacionFields {
  duracionTexto?: string;
  dirigidoA?: string;
  objetivos?: string;
  modulos?: string;
  profesorado?: string;
  certificacion?: string;
  colaboradores?: string;
}

// Curso
export interface Curso extends WPNode {
  cursoFields: CursoFields;
  content?: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  categorias?: {
    nodes: WPTerm['node'][];
  };
}

// Profesional fields
export interface ProfesionalFields {
  numeroColegiado: string;
  nombreCompleto: string;
  foto?: FeaturedImage;
  despacho?: string;
  direccion?: string;
  codigoPostal?: string;
  telefono?: string;
  email?: string;
  web?: string;
  linkedin?: string;
  bio?: string;
  ejerciente: boolean;
  idiomas?: string[];
  aceptaTurnoOficio: boolean;
  mediadorRegistrado: boolean;
  visibleDirectorio: boolean;
}

// Profesional
export interface Profesional extends WPNode {
  profesionalFields: ProfesionalFields;
}

// Post extra fields
export interface PostExtraFields {
  subtitulo?: string;
  documentoAdjunto?: {
    mediaItemUrl: string;
    title: string;
  };
  fuenteExterna?: string;
  esDestacada: boolean;
}

// Post (blog)
export interface Post extends WPNode {
  postExtraFields: PostExtraFields;
  content?: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  categories?: {
    nodes: WPTerm['node'][];
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

// Pagination
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

// Generic connection type
export interface Connection<T> {
  nodes: T[];
  pageInfo: PageInfo;
}
