import API from "../api/api";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import AddServiceForm from "../components/AddServiceForm";
import "../styles/Services.css";
import "../styles/AddServiceForm.css";

function Services() {

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {

    if (!currentUser || !currentUser.society) {
      console.error("No logged-in user or society found.");
      return;
    }

    try {
      const response = await API.get(`/services?society=${encodeURIComponent(currentUser.society)}`);
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }

  async function addService(newService) {
    try {
      const serviceWithProvider = {
        name: newService.name,
        category: newService.category,
        provider: currentUser ? currentUser.name : "Unknown",
        contact: newService.contact,
        society: currentUser ? currentUser.society : ""
      };

      const response = await API.post("/services", serviceWithProvider);
      setServices([...services, response.data]);

    } catch (error) {
      console.error("Failed to add service:", error);
      alert("Failed to add service.");
    }
  }

  async function deleteService(id) {
    try {
      await API.delete(`/services/${id}`);
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Failed to delete service.");
    }
  }

  async function editService(service) {

    const newName = prompt("Enter service name:", service.name);
    const newCategory = prompt("Enter category:", service.category);
    const newContact = prompt("Enter contact number:", service.contact);

    if (newName && newCategory && newContact) {

      try {
        const updatedData = {
          name: newName,
          category: newCategory,
          provider: service.provider,
          contact: newContact,
          society: service.society
        };

        const response = await API.put(`/services/${service.id}`, updatedData);

        setServices(
          services.map((item) =>
            item.id === service.id ? response.data : item
          )
        );

      } catch (error) {
        console.error("Failed to update service:", error);
        alert("Failed to update service.");
      }
    }
  }

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