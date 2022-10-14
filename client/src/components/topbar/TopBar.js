import { useContext } from "react";
import { InvestmentTrackerContext } from '../../context/context';
import { useNavigate } from "react-router-dom";
import "./topbar.css";

export default function TopBar() {
  const { dispatch } = useContext(InvestmentTrackerContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('\auth');
  };
  return (
    <div className="top">
      <div className="topLeft">
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem" onClick={handleLogout}>
            LOGOUT
          </li>
        </ul>
      </div>
      <div className="topRight">
      </div>
    </div>
  );
}