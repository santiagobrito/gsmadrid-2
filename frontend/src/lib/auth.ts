const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://gsmadrid-2-wordpress.a7lflv.easypanel.host';
const API_BASE = `${WP_URL}/wp-json/gsmadrid/v1`;

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  displayName: string;
  roles: string[];
  profesionalPostId: number | null;
  numeroColegiado: string | null;
}

export interface ProfesionalProfile {
  dni_nie: string;
  numero_colegiado: string;
  nombre_completo: string;
  apellidos: string;
  foto: { url: string; sizes?: { medium?: string; thumbnail?: string } } | null;
  despacho: string;
  direccion: string;
  codigo_postal: string;
  telefono: string;
  email: string;
  web: string;
  linkedin: string;
  bio: string;
  ejerciente: boolean;
  idiomas: string;
  acepta_turno_oficio: boolean;
  mediador_registrado: boolean;
  visible_directorio: boolean;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  message?: string;
}

export interface MeResponse {
  user: AuthUser;
  profile: ProfesionalProfile | null;
  especialidades: string[];
  localidades: string[];
  allEspecialidades: string[];
  allLocalidades: string[];
}

export interface ProfileUpdateResponse {
  success: boolean;
  updatedFields: string[];
  message: string;
}

// Token management (client-side only)
const TOKEN_KEY = 'gsmadrid_auth_token';
const USER_KEY = 'gsmadrid_auth_user';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setAuth(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// API calls
async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE}${endpoint}`, { ...options, headers });
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data: LoginResponse = await res.json();
  if (data.success && data.token && data.user) {
    setAuth(data.token, data.user);
  }
  return data;
}

export async function fetchMe(): Promise<MeResponse | null> {
  try {
    const res = await authFetch('/auth/me');
    if (!res.ok) {
      clearAuth();
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}

export async function updateProfile(fields: Partial<ProfesionalProfile> & { especialidades?: string[]; localidades?: string[] }): Promise<ProfileUpdateResponse> {
  const res = await authFetch('/profile/update', {
    method: 'POST',
    body: JSON.stringify(fields),
  });
  return res.json();
}

export interface UploadPhotoResponse {
  success: boolean;
  message: string;
  attachmentId?: number;
  url?: string;
}

export async function uploadProfilePhoto(file: File): Promise<UploadPhotoResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append('photo', file);

  const res = await fetch(`${API_BASE}/profile/upload-photo`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  return res.json();
}

export async function logout(): Promise<void> {
  try {
    await authFetch('/auth/logout', { method: 'POST' });
  } catch {
    // Best-effort server-side token cleanup
  }
  clearAuth();
  window.location.href = '/area-privada';
}
