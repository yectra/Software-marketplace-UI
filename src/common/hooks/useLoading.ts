// useLoadingState.ts
import { useState } from 'react';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const setLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
  };

  return {
    isLoading,
    setLoading,
  };
};

export default useLoading;
