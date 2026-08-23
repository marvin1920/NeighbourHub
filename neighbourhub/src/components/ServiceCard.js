function ServiceCard({ service, onDelete, onEdit }) {
  return (
    <div className="service-card">

      <h2>{service.name}</h2>

      <p className="service-category">
        Category: {service.category}
      </p>

      <p>
        Provider: {service.provider}
      </p>

      <p>
        Contact: {service.contact}
      </p>

      <button
        onClick={() => onEdit(service)}
        className="edit-button"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(service.id)}
        className="delete-button"
      >
        Delete
      </button>

    </div>
  );
}

export default ServiceCard;