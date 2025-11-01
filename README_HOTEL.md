# Hotel Admin - Sistema de Gestión Hotelera

Panel de administración completo para gestión hotelera con datos mock intercambiables.

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

El sistema iniciará en `http://localhost:8080`

## 🔐 Acceso al Sistema

Usuarios de prueba (cualquier contraseña funciona):

- **Administrador**: `admin@hotel.com`
- **Recepción**: `recepcion@hotel.com`  
- **Finanzas**: `finanzas@hotel.com`

## 📋 Funcionalidades Implementadas

### ✅ Completadas

1. **Autenticación Mock**
   - Login con roles: Administrador, Recepción, Finanzas
   - Protección de rutas
   - Persistencia de sesión

2. **Dashboard**
   - Métricas en tiempo real: ocupación, ingresos, check-ins/outs
   - Gráfico de ocupación últimos 7 días
   - Distribución por tipo de habitación
   - Estadísticas de reservas pendientes

3. **Reservas**
   - Listado completo con búsqueda
   - Información detallada: código, huésped, fechas, estado
   - Estados: pendiente, confirmada, check-in, check-out, cancelada, no-show
   - Cálculo automático de tarifas por noche

4. **Habitaciones**
   - Vista de tarjetas con información detallada
   - Estados: Disponible, Ocupada, Mantenimiento
   - Tipos: Sencilla, Doble, Suite
   - Amenities y capacidad
   - Búsqueda y filtrado

5. **Huéspedes**
   - Base de datos completa de huéspedes
   - Información de contacto y documentos
   - Historial de estancias
   - Preferencias personalizadas

### 🚧 Placeholders (por implementar)

- Calendario (vista timeline/Gantt)
- Check-in (flujo guiado)
- Check-out (flujo guiado)
- Facturación (generación de facturas)
- Reportes (ADR, RevPAR, exportación)
- Ajustes (configuración del hotel)

## 🎨 Diseño

- **Tema**: Teal/azul profesional con acentos dorados
- **Dark Mode**: Soporte completo con toggle
- **Responsive**: Optimizado para desktop y móvil
- **Componentes**: shadcn/ui personalizados

## 🗄️ Datos Mock

El sistema genera automáticamente:

- **50 habitaciones** distribuidas en 5 pisos
- **200 huéspedes** con datos realistas
- **250 reservas** distribuidas en 90 días (pasado y futuro)

### Prevención de Conflictos

- No permite solapamiento de reservas en la misma habitación
- Estados coherentes según fechas (pasadas = check-out, futuras = confirmada, etc.)
- Datos persistentes en localStorage

## 🏗️ Arquitectura

```
src/
├── lib/
│   ├── types.ts              # Tipos TypeScript
│   ├── stores/               # Zustand stores
│   │   ├── auth-store.ts     # Autenticación
│   │   └── data-store.ts     # Datos (rooms, guests, reservations)
│   ├── utils/
│   │   ├── currency.ts       # Formato COP
│   │   └── dates.ts          # Zona horaria Bogotá
│   └── mock/
│       └── faker-data.ts     # Generación de datos
├── components/
│   ├── layout/               # Sidebar, Header
│   └── ui/                   # shadcn/ui components
└── pages/                    # Páginas de la aplicación
```

## 💰 Formato de Moneda

Todo el sistema usa **Peso Colombiano (COP)**:
- Formato: `$150.000` (sin decimales)
- Separador de miles automático
- Utilidad: `formatCOP(amount)`

## 📅 Zona Horaria

Todas las fechas usan **America/Bogota**:
- Formato por defecto: `DD/MM/YYYY`
- Con hora: `DD/MM/YYYY HH:mm`
- Utilidades en `lib/utils/dates.ts`

## 🔄 Intercambio de Data Layer

El sistema está diseñado para facilitar el cambio de mock a API real:

1. **Stores de Zustand** (`lib/stores/`) contienen toda la lógica de datos
2. Reemplaza las funciones mock por llamadas HTTP
3. Mantén la misma interfaz de stores para no afectar componentes

Ejemplo futuro:
```typescript
// Cambiar esto:
initialize: () => {
  const rooms = generateRooms(50);
  set({ rooms });
}

// Por esto:
initialize: async () => {
  const rooms = await api.getRooms();
  set({ rooms });
}
```

## 🎯 Reglas de Negocio

1. **No solapamiento**: Una habitación no puede tener dos reservas solapadas
2. **Check-in**: Solo si fecha actual ≥ fecha entrada y estado "confirmada"
3. **Check-out**: Solo si fecha actual ≥ fecha salida y estado "check-in"
4. **Estados automáticos**: Se asignan según fechas al generar datos

## 🛠️ Tecnologías

- **Framework**: React 18 + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Estado**: Zustand con persistencia
- **Formularios**: React Hook Form + Zod (ready para usar)
- **Gráficos**: Recharts
- **Fechas**: date-fns-tz
- **Mock Data**: @faker-js/faker
- **Iconos**: lucide-react

## 📦 Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run preview      # Preview build
npm run lint         # Linting
```

## 🚀 Próximos Pasos

1. Implementar calendario con drag & drop
2. Flujos de check-in/check-out
3. Sistema de facturación completo
4. Reportes con exportación CSV/XLSX
5. Configuración del hotel (impuestos, políticas)
6. Conectar APIs reales cuando estén listas

## 📝 Notas

- Los datos se regeneran cada vez que recargas si cambias el seed en `faker-data.ts`
- La autenticación persiste en localStorage
- Todas las operaciones CRUD están preparadas en los stores (add/update/delete)

---

**Desarrollado con** ❤️ **para gestión hotelera moderna**
