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
  foto?: {
    node: {
      sourceUrl: string;
    };
  };
  linkedin?: string;
}

// Precio repeater
export interface Precio {
  concepto: string;
  importe: number;
  nota?: string;
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
  esGratuito: boolean;
  precioColegiado?: number | null;
  precioPrecolegiado?: number | null;
  precioExterno?: number | null;
  programa?: string;
  urlInscripcion?: string;
  estado?: 'abierta' | 'cerrada' | 'completa' | 'cancelada';
  esDestacada?: boolean;
}

// Formacion (evento formativo)
export interface Formacion extends WPNode {
  formacionFields: FormacionFields;
  modalidades?: {
    nodes: { name: string; slug: string }[];
  };
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
  apellidos?: string;
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
  modalidad?: 'ejerciente_libre' | 'ejerciente_empresa' | 'no_ejerciente' | 'numerario' | null;
  idiomas?: string[];
  aceptaTurnoOficio: boolean;
  mediadorRegistrado: boolean;
  visibleDirectorio: boolean;
}

export const MODALIDAD_LABEL: Record<NonNullable<ProfesionalFields['modalidad']>, string> = {
  ejerciente_libre: 'Ejerciente Libre',
  ejerciente_empresa: 'Ejerciente Empresa',
  no_ejerciente: 'No Ejerciente',
  numerario: 'Numerario',
};

// Profesional
export interface Profesional extends WPNode {
  profesionalFields: ProfesionalFields;
  especialidades?: {
    nodes: { name: string; slug: string }[];
  };
  localidades?: {
    nodes: { name: string; slug: string }[];
  };
}

// Post extra fields
export interface PostExtraFields {
  subtitulo?: string;
  documentoAdjunto?: {
    node: {
      mediaItemUrl: string;
      title: string;
    };
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
