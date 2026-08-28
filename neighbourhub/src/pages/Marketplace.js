import API from "../api/api";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";
import "../styles/Marketplace.css";
import "../styles/AddProductForm.css";

function Marketplace() {

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const response = await API.get("/listings");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  }

  async function addProduct(newProduct) {
    try {
      const productWithSeller = {
        name: newProduct.name,
        price: newProduct.price,
        seller: currentUser ? currentUser.name : "Unknown"
      };

      const response = await API.post("/listings", productWithSeller);
      setProducts([...products, response.data]);

    } catch (error) {
      console.error("Failed to add listing:", error);
      alert("Failed to add product.");
    }
  }

  async function deleteProduct(id) {
    try {
      await API.delete(`/listings/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Failed to delete product.");
    }
  }

  function startEdit(product) {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
  }

  async function updateProduct(e) {
    e.preventDefault();

    try {
      const updatedData = {
        name: editName,
        price: Number(editPrice),
        seller: editingProduct.seller
      };

      const response = await API.put(`/listings/${editingProduct.id}`, updatedData);

      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? response.data : product
      );

      setProducts(updatedProducts);
      setEditingProduct(null);

    } catch (error) {
      console.error("Failed to update listing:", error);
      alert("Failed to update product.");
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="marketplace-page">

      <h1>Marketplace</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <AddProductForm onAddProduct={addProduct} />

      {editingProduct && (
        <form className="edit-product-form" onSubmit={updateProduct}>

          <h2>Edit Product</h2>

          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Product Name"
          />

          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            placeholder="Price"
          />

          <button type="submit">
            Update Product
          </button>

          <button type="button" onClick={() => setEditingProduct(null)}>
            Cancel
          </button>

        </form>
      )}

      <div className="products-container">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={deleteProduct}
            onEdit={startEdit}
          />
        ))}

      </div>

    </div>
  );
}

export default Marketplace;