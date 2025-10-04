import { cn } from "../utils";
import { generatePageNumbers } from "../utils/pagination.util";

interface IPaginationProps {
  currentPage : number;
  totalPages  : number;
  onPageChange: (page: number) => void;
  onNext      : () => void;
  onPrev      : () => void;
}

const PaginationProducts = (props: IPaginationProps) => {
  const { currentPage, totalPages, onPageChange, onNext, onPrev } = props;

  if (totalPages <= 1) return null;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>

        {generatePageNumbers(currentPage, totalPages).map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={cn(
              "px-4 py-2 rounded-md border transition-colors",
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : page === "..."
                ? "border-transparent cursor-default"
                : "border-gray-300 bg-white hover:bg-gray-50"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default PaginationProducts;
