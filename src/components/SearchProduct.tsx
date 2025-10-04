import { CiSearch } from "react-icons/ci";

interface IPropsSearchProduct {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalResults: number;
}

const SearchProduct = (props: IPropsSearchProduct) => {
  const { searchTerm, onSearchChange, totalResults } = props;

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar productos por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <CiSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {searchTerm && (
        <p className="mt-2 text-sm text-gray-600">
          Se encontraron <span className="font-semibold">{totalResults}</span>{" "}
          resultado(s)
        </p>
      )}
    </div>
  );
};

export default SearchProduct;
