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
            image: "/images/person.jpg",
            name: "Justin Franci",
            link: "#",
          },
          {
            image: "/images/male-5.jpg",
            name: "piel",
            link: "#",
          },
          {
            image: "/images/female-6.jpg",
            name: "Sonia",
            link: "#",
          },
          {
            image: "/images/female-4.jpg",
            name: "Alinaa",
            link: "#",
          },
          {
            image: "/images/male-2.jpg",
            name: "Rohan",
            link: "#",
          },
          {
            image: "/images/male-5.jpg",
            name: "Jasvir ",
            link: "#",
          },
          {
            image: "/images/female-5.jpg",
            name: "visha",
            link: "#",
          },
          {
            image: "/images/female-4.jpg",
            name: "Alia",
            link: "#",
          },
        ]}
      />
    </div>
  );
};

export default PortAgentModal;
