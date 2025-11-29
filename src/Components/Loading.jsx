import { Container, LinearProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-item">
        <LinearProgress />
      </div>
    </div>
  );
};

export default Loading;
