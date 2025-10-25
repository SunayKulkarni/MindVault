import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState<any[]>([]); 

  useEffect(() => {
    async function fetchContents() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await response.data;
        setContents(data.content); 
      } 
      catch (error) {
        console.error("Error fetching contents:", error);
      }
}

    fetchContents();
  }, []);

  return { contents };
}
