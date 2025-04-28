import "./Loader.css";

function Loader({ color = "#fff" }) {
  return (
    <div
      className="loading"
      style={{
        "--loader-color": color, // Set the CSS variable for dynamic color
      }}
    >
      <div className="lds-spinner">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default Loader;
