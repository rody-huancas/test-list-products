import Alert from "./Alert";
import Loader from "./Loader";
import CardProduct from "./CardProduct";
import SearchProduct from "./SearchProduct";
import PaginationProducts from "./PaginationProducts";
import useFetchingProducts from "../hooks/useFetchingProducts";

const ListProducts = () => {
  const { products, loading, error, currentPage, totalPages, searchTerm, setSearchTerm, goToPage, nextPage, prevPage } = useFetchingProducts();

  const renderLoadingState = () => (
    <div className="flex justify-center">
      <Loader />
    </div>
  );

  const renderErrorState = () => (
    <div className="flex justify-center">
      <Alert type="error" message="Ocurrió un error al cargar los productos" />
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex justify-center">
      <Alert type="info" message="No hay productos disponibles" />
    </div>
  );

  const renderProductsGrid = () => (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationProducts
          currentPage={currentPage}
          totalPages   = {totalPages}
          onPageChange = {goToPage}
          onNext       = {nextPage}
          onPrev       = {prevPage}
        />
      )}
    </div>
  );

  const renderContent = () => {
    if (loading)               return renderLoadingState();
    if (error)                 return renderErrorState()  ;
    if (products.length === 0) return renderEmptyState()  ;

    return renderProductsGrid();
  };

  return (
    <>
      <header className="space-y-7">
        <h1 className="text-4xl font-black text-gray-700 underline space-y-5">
          Listado de Productos
        </h1>

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

export default ListProducts;
