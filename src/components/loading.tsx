import React from "react";

const DefaultLoading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-main"></div>
    </div>
  );
};

export default DefaultLoading;
