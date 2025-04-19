import React from "react";
import InfoCardList from "../../InfoCardList";

const AuditManagerModal = ({ isAuditClose, onClose }) => {
  return (
    <div className={`list-modal ${isAuditClose ? "closing" : ""}`}>
      <InfoCardList
        title="Audit Manager"
        onClose={onClose}
        data={[
          {
            image: "/images/male-1.jpg",
            name: "Justin ",
            link: "#",
          },
          {
            image: "/images/male-3.jpg",
            name: "Jassie",
            link: "#",
          },
          {
            image: "/images/female-2.jpg",
            name: "Shaify",
            link: "#",
          },
          {
            image: "/images/male-5.jpg",
            name: "Franci",
            link: "#",
          },
          {
            image: "/images/female-4.jpg",
            name: "Diana",
            link: "#",
          },
          {
            image: "/images/male-1.jpg",
            name: "Justin ",
            link: "#",
          },
          {
            image: "/images/male-3.jpg",
            name: "Jassie",
            link: "#",
          },
          {
            image: "/images/female-2.jpg",
            name: "Shaify",
            link: "#",
          },
          {
            image: "/images/male-5.jpg",
            name: "Franci",
            link: "#",
          },
        ]}
      />
    </div>
  );
};

export default AuditManagerModal;
