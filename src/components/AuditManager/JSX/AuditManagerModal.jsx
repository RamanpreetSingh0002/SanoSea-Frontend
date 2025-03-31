import React from "react";
import InfoCardList from "../../InfoCardList";

const AuditManagerModal = ({ isClosing, onClose }) => {
  return (
    <div className={`list-modal ${isClosing ? "closing" : ""}`}>
      <InfoCardList
        title="Audit Manager"
        onClose={onClose}
        data={[
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
        ]}
      />
    </div>
  );
};

export default AuditManagerModal;
