export const es = {
  common: {
    loading: "Cargando...",
    retry: "Reintentar",
    save: "Guardar",
    cancel: "Cancelar",
    requiredField: "Este campo es obligatorio",
    genericError: "Ocurrió un error inesperado. Intenta de nuevo.",
    emptyTitle: "No hay datos para mostrar",
  },
  auth: {
    login: {
      title: "Iniciar sesión",
      subtitle: "Ingresa con tu cuenta de IperIA",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "nombre@empresa.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "••••••••",
      submit: "Ingresar",
      submitting: "Ingresando...",
      invalidEmail: "Ingresa un correo válido",
      invalidCredentials: "Correo o contraseña incorrectos",
      genericError: "No se pudo iniciar sesión. Intenta de nuevo.",
    },
    session: {
      expiredMessage: "Tu sesión expiró. Vuelve a iniciar sesión.",
      loggedOutMessage: "Sesión cerrada correctamente.",
    },
    logout: "Cerrar sesión",
  },
  nav: {
    matriz: "Matriz IPERC",
    roles: {
      OPERARIO: "Operario",
      SUPERVISOR: "Supervisor",
      GERENCIA_EHS: "Gerencia EHS",
      BRIGADISTA: "Brigadista",
    },
    noScreensTitle: "Todavía no hay pantallas para tu rol en este panel",
    noScreensDescription:
      "Las pantallas de operario y brigadista se gestionan desde la app de planta (iperia-mobile).",
    appName: "IperIA",
  },
  iperc: {
    matriz: {
      title: "Matriz IPERC",
      subtitle: "Identificación de peligros y evaluación de riesgos",
      newItem: "Nuevo registro",
      fields: {
        puesto: "Puesto de trabajo",
        tarea: "Tarea",
        actividad: "Actividad",
        peligro: "Peligro",
        riesgo: "Riesgo",
        probabilidad: "Probabilidad",
        severidad: "Severidad",
        nivelRiesgo: "Nivel de riesgo",
      },
      riskLevels: {
        aceptable: "Aceptable",
        moderado: "Moderado",
        importante: "Importante",
        intolerable: "Intolerable",
      },
      submit: "Calcular y guardar",
      submitting: "Calculando...",
      empty: "Aún no hay registros en la matriz IPERC",
      loadError: "No se pudo cargar la matriz IPERC",
      saveError: "No se pudo guardar el registro",
    },
  },
} as const;

export type Dictionary = typeof es;
