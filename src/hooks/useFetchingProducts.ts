import { useEffect, useMemo, useState } from "react";
import type { IProduct } from "../interfaces/products.interface";

const API_URL = "http://localhost:3001/products";
const ITEMS_PER_PAGE = 8;

const useFetchingProducts = () => {
  const [products   , setProducts   ] = useState<IProduct[]>([]);
  const [loading    , setLoading    ] = useState(true);
  const [error      , setError      ] = useState<string | null>(null);
  const [searchTerm , setSearchTerm ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /*******************************************************************************/
  /********************* PETICIÓN PARA OBTENER LOS PRODUCTOS *********************/
  /*******************************************************************************/

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los productos`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al cargar productos");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  /*******************************************************************************/
  /****************************** FILTRAR PRODUCTOS ******************************/
  /*******************************************************************************/

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())        ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);


  /*******************************************************************************/
  /****************************** PAGINAR PRODUCTOS ******************************/
  /*******************************************************************************/

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex   = startIndex + ITEMS_PER_PAGE;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);


  /*******************************************************************************/
  /****************************** FUNCIONES DE AYUDA *****************************/
  /*******************************************************************************/

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    products: paginatedProducts,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    setSearchTerm,
    goToPage,
    nextPage,
    prevPage,
  };
};

export default useFetchingProducts;
