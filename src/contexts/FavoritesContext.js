import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;

      if (user) {
        const userFavoritesDoc = doc(
          db,
          "users",
          user.uid,
          "favorites",
          "userFavorites"
        );
        const docSnap = await getDoc(userFavoritesDoc);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites || []);
        } else {
          setFavorites([]); // Empty if no favorites are found
        }
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [auth.currentUser]);

  const addFavorite = async (workout) => {
    const user = auth.currentUser;
    if (user) {
      const updatedFavorites = [...favorites, workout];
      setFavorites(updatedFavorites);
      await setDoc(doc(db, "users", user.uid, "favorites", "userFavorites"), {
        favorites: updatedFavorites,
      });
    }
  };

  const removeFavorite = async (workout) => {
    const user = auth.currentUser;
    if (user) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== workout.id);
      setFavorites(updatedFavorites);
      await setDoc(doc(db, "users", user.uid, "favorites", "userFavorites"), {
        favorites: updatedFavorites,
      });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {loading ? <div>Loading...</div> : children}
    </FavoritesContext.Provider>
  );
};
