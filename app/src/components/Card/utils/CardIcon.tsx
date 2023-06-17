import {
  IconMessageQuestion,
  IconMessageCancel,
  IconReceipt,
} from "@tabler/icons-react";

const iconStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  margin: "16px",
};

const CardIcon = (type: string) => {
  switch (type) {
    case "demandeSpecifique":
      return <IconMessageQuestion color="#CED4DA" style={iconStyle} />;
    case "demandeAbandonnee":
      return <IconMessageCancel color="#CED4DA" style={iconStyle} />;
    case "devisCommande":
      return <IconReceipt color="#CED4DA" style={iconStyle} />;
    default:
      return <></>;
  }
};

export default CardIcon;
