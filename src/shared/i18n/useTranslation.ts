import { es, type Dictionary } from "./es";

/**
 * Único idioma soportado por ahora. Si se agrega otro locale, este hook
 * es el único punto que cambia (selección por preferencia de usuario);
 * los componentes seguirán llamando a useTranslation() igual.
 */
export function useTranslation(): Dictionary {
  return es;
}
