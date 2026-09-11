function ServiceCard({
  service,
  onDelete,
  onEdit,
  currentUser
}) {

  const isOwner =
    currentUser &&
    currentUser.name === service.provider;

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

      {isOwner && (
        <>
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
        </>
      )}

    </div>
  );
}

export default ServiceCard;