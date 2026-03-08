function StatusBadge({ status }) {
  const getClassName = () => {
    switch (status) {
      case "PENDING":
        return "badge bg-warning text-dark";
      case "CONFIRMED":
        return "badge bg-info text-dark";
      case "SHIPPED":
        return "badge bg-primary";
      case "DELIVERED":
        return "badge bg-success";
      case "CANCELLED":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return <span className={getClassName()}>{status}</span>;
}

export default StatusBadge;