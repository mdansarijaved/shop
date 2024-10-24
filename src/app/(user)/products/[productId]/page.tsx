import React from "react";

function ProductPage({ params }: { params: { productId: string } }) {
  return <div>{params.productId} </div>;
}

export default ProductPage;
