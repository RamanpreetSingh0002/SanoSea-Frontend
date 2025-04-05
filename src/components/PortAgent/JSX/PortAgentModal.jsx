import React from "react";
import InfoCardList from "../../InfoCardList";

const PortAgentModal = ({ isPortClose, onClose }) => {
  return (
    <div className={`list-modal ${isPortClose ? "closing" : ""}`}>
      <InfoCardList
        title="Port Agent"
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
        ]}
      />
    </div>
  );
};

export default PortAgentModal;
