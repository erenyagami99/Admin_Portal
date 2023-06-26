import React, { useState, useEffect } from "react";
import { getPortals } from "../services/portalService";
import CreatePortalPopup from "../components/popUps/createPortalPopup";
import UpdatePortalPopup from "../components/popUps/updatePortalPopup";
import DeletePortalPopup from "../components/popUps/deletePortalPopup";
import Moment from "react-moment";
import moment from "moment";

const HomePage = () => {
  const now = moment();
  const [portals, setPortals] = useState([]);

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [portal, setPortal] = useState();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const getPortalsFromApi = async () => {
      try {
        const data = await getPortals();
        setPortals(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getPortalsFromApi();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="header">
          <button
            className="logout-button"
            onClick={() => {
              setModal(true);
            }}
          >
            Create Portal
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        <h1> Admin Portal</h1>
        <div className="portals-container">
          {portals.map((portal) => (
            <div className="portal-container">
              {console.log(portal, "Portal")}
              <div>
                <h1>App Code :</h1>
                <p>{portal.appCode}</p>
              </div>
              <div>
                <h1>Project Id :</h1>
                <p>{portal.projectId}</p>
              </div>
              <div>
                <h1>Model Id :</h1>
                <p>{portal.modelId}</p>
              </div>
              <div>
                <h1>Version :</h1>
                <p>{portal.version}</p>
              </div>
              <div>
                <h1>Title :</h1>
                <p>{portal.title}</p>
              </div>
              <div>
                <h1>Description :</h1>
                <p>{portal.description}</p>
              </div>

              <div>
                <button
                  className="delete-button"
                  onClick={() => {
                    setDeleteModal(true);
                    setPortal(portal);
                  }}
                >
                  DELETE
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    setUpdateModal(true);
                    setPortal(portal);
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && <CreatePortalPopup setModal={setModal} />}
      {updateModal && (
        <UpdatePortalPopup setModal={setUpdateModal} portal={portal} />
      )}
      {deleteModal && (
        <DeletePortalPopup setModal={setDeleteModal} portal={portal} />
      )}
    </>
  );
};

export default HomePage;
