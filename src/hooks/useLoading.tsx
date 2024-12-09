import { useState, useCallback, ReactNode } from "react";
import DefaultLoading from "../components/ui/loading";
import React from "react";

// Define the useLoading hook
const useLoading = (
  LoadingComponent: () => React.ReactNode = DefaultLoading
) => {
  // State to keep track of loading
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  // Return the loading state and functions to control it
  const renderLoading = () => (isLoading ? <LoadingComponent /> : null);
  return { isLoading, startLoading, stopLoading, renderLoading };
};

export default useLoading;
