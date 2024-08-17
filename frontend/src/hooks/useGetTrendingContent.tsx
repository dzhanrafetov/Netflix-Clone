import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null) as any;
  const contentType = useContentStore((state) => state.contentType);

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };

    getTrendingContent();  // Fetch data every time contentType changes

  }, [contentType]); // Trigger effect when contentType changes

  return { trendingContent };
};

export default useGetTrendingContent;
