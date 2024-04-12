import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/getall/getall-category"
      );
      if (data?.success) {
        setCategories(data?.allCategory);

        console.log(data?.allCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return { categories };
}
