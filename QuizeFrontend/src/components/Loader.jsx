export default function Loader({ children }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{children}</p>
    </div>
  );
}
