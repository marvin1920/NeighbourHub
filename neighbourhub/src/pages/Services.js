import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import AddServiceForm from "../components/AddServiceForm";
import "../styles/Services.css";
import "../styles/AddServiceForm.css";

function Services() {

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Electrician",
      category: "Home Repair",
      provider: "Rahul",
      contact: "9876543210"
    },
    {
      id: 2,
      name: "Plumber",
      category: "Home Repair",
      provider: "Amit",
      contact: "9876543211"
    },
    {
      id: 3,
      name: "Home Tutor",
      category: "Education",
      provider: "Priya",
      contact: "9876543212"
    }
  ]);

  const [search, setSearch] = useState("");

  // Add Service
  function addService(newService) {
    setServices([...services, newService]);
  }

  // Delete Service
  function deleteService(id) {
    setServices(
      services.filter((service) => service.id !== id)
    );
  }

  // Edit Service
  function editService(service) {
    const newName = prompt("Enter service name:", service.name);
    const newCategory = prompt("Enter category:", service.category);
    const newProvider = prompt("Enter provider name:", service.provider);
    const newContact = prompt("Enter contact number:", service.contact);

    if (newName && newCategory && newProvider && newContact) {
      setServices(
        services.map((item) =>
          item.id === service.id
            ? {
                ...item,
                name: newName,
                category: newCategory,
                provider: newProvider,
                contact: newContact
              }
            : item
        )
      );
    }
  }

  // Search Services
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="services-page">

      <h1>Local Services</h1>

      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <AddServiceForm onAddService={addService} />

      <div className="services-container">

        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onDelete={deleteService}
            onEdit={editService}
          />
        ))}

      </div>

    </div>
  );
}

export default Services;