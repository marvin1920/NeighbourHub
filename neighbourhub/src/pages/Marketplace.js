import API from "../api/api";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";
import "../styles/Marketplace.css";
import "../styles/AddProductForm.css";

function Marketplace() {

  // -----------------------------
  // Test Backend Connection
  // -----------------------------

  async function testBackend() {
  console.log("1. Button clicked");

  try {
    const response = await API.get("/users");

    console.log("2. Backend response received");
    console.log("Users from backend:", response.data);

    alert("Backend connected successfully!");
  } catch (error) {
    console.log("3. Backend connection failed");
    console.error(error);

    alert("Backend connection failed. Check Console.");
  }
}

  // -----------------------------
  // Products
  // -----------------------------

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "HP Laptop",
      price: 25000,
      seller: "Martin"
    },
    {
      id: 2,
      name: "iPhone 13",
      price: 45000,
      seller: "Rahul"
    },
    {
      id: 3,
      name: "Study Table",
      price: 3500,
      seller: "Priya"
    }
  ]);

  // -----------------------------
  // Search
  // -----------------------------

  const [search, setSearch] = useState("");

  // -----------------------------
  // Edit Product
  // -----------------------------

  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editSeller, setEditSeller] = useState("");

  // -----------------------------
  // Add Product
  // -----------------------------

  function addProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  // -----------------------------
  // Delete Product
  // -----------------------------

  function deleteProduct(id) {
    setProducts(
      products.filter((product) => product.id !== id)
    );
  }

  // -----------------------------
  // Start Editing
  // -----------------------------

  function startEdit(product) {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditSeller(product.seller);
  }

  // -----------------------------
  // Update Product
  // -----------------------------

  function updateProduct(e) {
    e.preventDefault();

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: editName,
            price: Number(editPrice),
            seller: editSeller
          }
        : product
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
  }

  // -----------------------------
  // Search Products
  // -----------------------------

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="marketplace-page">

      <h1>Marketplace</h1>

      {/* Test Backend */}

      <button onClick={testBackend}>
  Test Backend
</button>
        
      {/* Search Bar */}

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Add Product */}

      <AddProductForm
        onAddProduct={addProduct}
      />

      {/* Edit Product Form */}

      {editingProduct && (
        <form
          className="edit-product-form"
          onSubmit={updateProduct}
        >

          <h2>Edit Product</h2>

          <input
            type="text"
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)
            }
            placeholder="Product Name"
          />

          <input
            type="number"
            value={editPrice}
            onChange={(e) =>
              setEditPrice(e.target.value)
            }
            placeholder="Price"
          />

          <input
            type="text"
            value={editSeller}
            onChange={(e) =>
              setEditSeller(e.target.value)
            }
            placeholder="Seller Name"
          />

          <button type="submit">
            Update Product
          </button>

          <button
            type="button"
            onClick={() =>
              setEditingProduct(null)
            }
          >
            Cancel
          </button>

        </form>
      )}

      {/* Product Cards */}

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