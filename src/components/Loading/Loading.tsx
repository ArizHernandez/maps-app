import "./styles.css";

export const Loading = () => {
  return (
    <div className="loading-map d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h3>Loading...</h3>
        <span>Locating</span>
      </div>
    </div>
  );
};
