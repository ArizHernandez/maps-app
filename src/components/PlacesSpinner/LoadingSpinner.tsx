import "./styles.css";

export const LoadingSpinner = () => {
  return (
    <div className="loading__spinner">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
