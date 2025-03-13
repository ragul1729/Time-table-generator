import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-button">Home</button>
      <button className="sidebar-button">Degree</button>
      <button className="sidebar-button">Course</button>
      <button className="sidebar-button">Schedule</button>
      <button className="sidebar-button">View</button>
    </div>
  );
};

export default Sidebar;