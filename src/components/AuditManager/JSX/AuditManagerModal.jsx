import React, { useEffect, useState } from "react";
import { getUserByRole } from "../../../api/admin";
import InfoCardList from "../../InfoCardList";

const AuditManagerModal = ({ isAuditClose, onClose }) => {
  const [users, setUsers] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setBusy(true);
      const response = await getUserByRole("Audit Manager"); // Fetch data from API
      setBusy(false);

      if (!response.error) setUsers(response.users); // Use API data
    };

    fetchData();
  }, []);

  return (
    <div className={`list-modal ${isAuditClose ? "closing" : ""}`}>
      <InfoCardList
        title="Audit Manager"
        onClose={onClose}
        busy={busy}
        users={users.map(user => ({
          id: user?._id,
          image: user?.profilePhoto?.url || "/images/user.png",
          name: user?.fullName,
        }))}
      />
    </div>
  );
};

export default AuditManagerModal;
