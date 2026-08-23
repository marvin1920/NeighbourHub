function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="product-card">

      <h2>{product.name}</h2>

      <p className="product-price">
        ₹{product.price}
      </p>

      <p>
        Seller: {product.seller}
      </p>

      <button onClick={() => onEdit(product)}>
        Edit
      </button>

      <button
        onClick={() => onDelete(product.id)}
        className="delete-button"
      >
        Delete
      </button>

    </div>
  );
}

export default ProductCard;