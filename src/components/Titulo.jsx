import React from "react";

const Titulo = ({ children, style, ...props }) => {
  const titleStyle = {
    margin: 0, // <---
    ...style,
  };

  return (
    <h1
      style={titleStyle}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Titulo;