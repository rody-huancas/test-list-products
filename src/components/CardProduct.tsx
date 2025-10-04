import { useState } from "react";
import type { IProduct } from "../interfaces/products.interface";
import { BiCart } from "react-icons/bi";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

interface PropsCardProduct {
  product: IProduct;
}

const CardProduct = ({ product }: PropsCardProduct) => {
  const { name, price, category, image } = product;

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => setFavorite(!favorite);

  return (
    <div className="w-full h-full overflow-hidden shadow-lg rounded-4xl group text-gray-700 p-5 relative">
      <div className="h-60 w-full overflow-hidden rounded-3xl">
        <img
          src={image}
          alt={`Imágen de ${name}`}
          className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300 ease-in"
        />
      </div>

      <div className="pt-5 flex flex-col justify-between space-y-3">
        <div className="block">
          <small className="inline-flex items-center bg-blue-500/10 border border-blue-500/40 text-blue-500 text-xs py-1 px-2 rounded-full">
            {category}
          </small>
        </div>

        <h3 className="text-xl font-bold">{name}</h3>
        <span className="block text-lg font-medium">S/ {price}</span>

        <button className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white rounded-full py-3 cursor-pointer">
          <BiCart className="text-xl" />
          <span className="text-lg">Comprar Ahora</span>
        </button>
      </div>

      <button
        className="absolute top-10 right-10 w-8 h-8 flex items-center justify-center bg-pink-500 rounded-xl text-white cursor-pointer"
        onClick={handleFavorite}
      >
        {favorite ? (
          <MdOutlineFavorite className="text-base" />
        ) : (
          <MdFavoriteBorder className="text-base" />
        )}
      </button>
    </div>
  );
};

export default CardProduct;
