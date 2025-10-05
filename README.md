# Test List Products

Listado de productos con funcionalidades de búsqueda y paginación. Desarrollada con React, TypeScript y TailwindCSS.

## Características

- **Listado de Productos**: Visualización de productos en una cuadrícula responsiva con diseño moderno
- **Búsqueda en Tiempo Real**: Filtrado instantáneo por nombre, descripción y categoría
- **Paginación Inteligente**: Paginación (8 productos por página)
- **Gestión de Estados**: Manejo de estados de carga, error y datos vacíos.
- **Diseño Responsivo**: Interfaz adaptable a diferentes tamaños de pantalla
- **API REST**: Integración con JSON Server para simulación de backend

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 19.1.1 | Framework principal para la UI |
| TypeScript | 5.9.3 | Tipado estático y mejor DX |
| Vite | 7.1.7 | Build tool y dev server |
| TailwindCSS | 4.1.14 | Framework de utilidades CSS |
| React Icons | 5.5.0 | Biblioteca de iconos |
| JSON Server | 1.0.0-beta.3 | Mock API REST |
| clsx | 2.1.1 | Utilidad para clases condicionales |
| tailwind-merge | 3.3.1 | Fusión de clases de Tailwind |

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/rody-huancas/test-list-products

# Navegar al directorio del proyecto
cd test-list-products

# Instalar dependencias
pnpm install

# Ejecutar el servidor de desarrollo y la API simultáneamente
pnpm dev:all

# O ejecutarlos por separado:
# Terminal 1 - Frontend
pnpm dev

# Terminal 2 - API Mock
pnpm api
```

La aplicación estará disponible en `http://localhost:5173` y la API en `http://localhost:3001`.

## Estructura del Proyecto

```
src/
├── components/
│   ├── Alert.tsx                 # Componente de alertas con múltiples tipos
│   ├── CardProduct.tsx           # Tarjeta individual de producto
│   ├── ListProducts.tsx          # Contenedor principal del listado
│   ├── Loader.tsx                # Indicador de carga animado
│   ├── PaginationProducts.tsx    # Componente de paginación
│   └── SearchProduct.tsx         # Barra de búsqueda
├── hooks/
│   └── useFetchingProducts.ts    # Hook personalizado para gestión de productos
├── interfaces/
│   └── products.interface.ts     # Definiciones de tipos TypeScript
├── styles/
│   └── global.css                # Estilos globales y configuración de Tailwind
├── utils/
│   ├── index.ts                  # Utilidad cn() para merge de clases
│   └── pagination.util.ts        # Lógica de generación de números de página
├── App.tsx                       # Componente raíz de la aplicación
└── main.tsx                      # Punto de entrada de React
```

## Componentes Principales

### ListProducts
Componente contenedor principal que orquesta toda la funcionalidad del listado de productos.

```typescript
const ListProducts = () => {
  const { 
    products, loading, error, currentPage, totalPages, 
    searchTerm, setSearchTerm, goToPage, nextPage, prevPage 
  } = useFetchingProducts();

  return (
    <>
      <header>
        <h1>Listado de Productos</h1>
        <SearchProduct 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={products.length * totalPages}
        />
      </header>
      <main>{renderContent()}</main>
    </>
  );
};
```

### CardProduct
Tarjeta de producto con imagen, información.

```typescript
interface PropsCardProduct {
  product: IProduct;
}

const CardProduct = ({ product }: PropsCardProduct) => {
  const { name, price, category, image } = product;
  const [favorite, setFavorite] = useState(false);
  
  return (
    <div className="shadow-lg rounded-4xl group">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span>S/ {price}</span>
      <button>Comprar Ahora</button>
    </div>
  );
};
```

### SearchProduct
Barra de búsqueda.

```typescript
interface IPropsSearchProduct {
  searchTerm    : string;
  onSearchChange: (term: string) => void;
  totalResults  : number;
}

const SearchProduct = ({ searchTerm, onSearchChange, totalResults }: IPropsSearchProduct) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos por nombre o categoría..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && <p>Se encontraron {totalResults} resultado(s)</p>}
    </div>
  );
};
```

### PaginationProducts
Sistema de paginación con botones anterior/siguiente y números de página.

```typescript
interface IPaginationProps {
  currentPage : number;
  totalPages  : number;
  onPageChange: (page: number) => void;
  onNext      : () => void;
  onPrev      : () => void;
}
```

### Alert
Componente de alertas con cuatro variantes: error, success, warning, info.

```typescript
interface PropsAlert {
  type   : "error" | "success" | "warning" | "info";
  message: string;
}
```

### Loader
Indicador de carga animado.

## Custom Hook: useFetchingProducts

Hook personalizado que encapsula toda la lógica de gestión de productos, búsqueda y paginación.

### Retorno

```typescript
{
  products     : IProduct[];              // Productos paginados
  loading      : boolean;                 // Estado de carga
  error        : string | null;           // Mensaje de error
  searchTerm   : string;                  // Término de búsqueda actual
  currentPage  : number;                  // Página actual
  totalPages   : number;                  // Total de páginas
  setSearchTerm: (term: string) => void;  // Actualizar búsqueda
  goToPage     : (page: number) => void;  // Ir a página específica
  nextPage     : () => void;              // Página siguiente
  prevPage     : () => void;              // Página anterior
}
```

### Ejemplo de Uso

```typescript
const { 
  products, 
  loading, 
  error, 
  searchTerm, 
  setSearchTerm, 
  currentPage, 
  totalPages, 
  goToPage, 
  nextPage, 
  prevPage 
} = useFetchingProducts();

// Filtrado automático por nombre, descripción o categoría
// Paginación automática de 8 productos por página
// Reseteo de página al cambiar búsqueda
```

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `vite` | Inicia el servidor de desarrollo en modo watch |
| `api` | `json-server --watch mock/db.json --port 3001` | Ejecuta el servidor mock de la API REST |
| `dev:all` | `concurrently "pnpm dev" "pnpm api"` | Ejecuta frontend y API simultáneamente |
| `build` | `tsc -b && vite build` | Compila TypeScript y genera build de producción |
| `lint` | `eslint .` | Ejecuta el linter para análisis de código |
| `preview` | `vite preview` | Previsualiza el build de producción |

## Autor

**Rody Huancas**

GitHub: [https://github.com/rody-huancas](https://github.com/rody-huancas)
