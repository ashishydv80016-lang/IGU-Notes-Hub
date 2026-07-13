import { useEffect, useState } from "react";
import api from "../services/api";

function FavoriteButton({ materialId }) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, [materialId]);

  const checkFavorite = async () => {
    try {
      const res = await api.get("/favorites");

      const exists = res.data.favorites.some(
        (item) => item.material?._id === materialId
      );

      setFavorite(exists);
    } catch (error) {
      console.error("Favorite Check Error:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      setLoading(true);

      if (!favorite) {
        const res = await api.post("/favorites", {
          materialId,
        });

        alert(res.data.message);

        setFavorite(true);
      } else {
        const res = await api.delete(`/favorites/${materialId}`);

        alert(res.data.message);

        setFavorite(false);
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`w-full mt-3 py-3 rounded-lg text-white font-semibold transition ${
        favorite
          ? "bg-red-600 hover:bg-red-700"
          : "bg-pink-500 hover:bg-pink-600"
      }`}
    >
      {loading
        ? "Please Wait..."
        : favorite
        ? "❤️ Remove Favorite"
        : "🤍 Add to Favorites"}
    </button>
  );
}

export default FavoriteButton;