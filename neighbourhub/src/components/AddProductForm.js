import { useState } from "react";

function AddProductForm({ onAddProduct }) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: name,
      price: Number(price),
      seller: seller
    };

    onAddProduct(newProduct);

    setName("");
    setPrice("");
    setSeller("");
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>

      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Seller Name"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
      />

      <button type="submit">
        Add Product
      </button>

    </form>
  );
}

export default AddProductForm;