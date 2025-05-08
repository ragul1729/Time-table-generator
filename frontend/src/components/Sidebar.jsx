import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <button className="sidebar-button" onClick={ () => navigate("/home") }>Home</button>
      <button className="sidebar-button" onClick={ () => navigate("/degreebranch") }>Degree</button>
      <button className="sidebar-button" onClick={ () => navigate("/addcourse") }>Course</button>
      <button className="sidebar-button" onClick={ () => navigate("/schedule") }>Schedule</button>
      <button className="sidebar-button" onClick={ () => navigate("/TimeTable") }>View</button>
    </div>
  );
};

export default Sidebar;