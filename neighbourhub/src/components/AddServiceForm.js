import { useState } from "react";

function AddServiceForm({ onAddService }) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [contact, setContact] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !category || !provider || !contact) {
      alert("Please fill all fields");
      return;
    }

    const newService = {
      id: Date.now(),
      name: name,
      category: category,
      provider: provider,
      contact: contact
    };

    onAddService(newService);

    setName("");
    setCategory("");
    setProvider("");
    setContact("");
  }

  return (
    <div className="add-service-form">

      <h2>Add Service</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Provider Name"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <button type="submit">
          Add Service
        </button>

      </form>

    </div>
  );
}

export default AddServiceForm;