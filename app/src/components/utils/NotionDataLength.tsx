import { Flex, Paper, Skeleton, Text, ThemeIcon } from "@mantine/core";
import {
  IconMessageCancel,
  IconMessageQuestion,
  IconReceipt,
  IconScale,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

interface NotionDataLengthProps {
  length: number;
  type: "demandeSpecifique" | "demandeAbandonnee" | "devisCommande";
}

const NotionDataLength = (props: NotionDataLengthProps) => {
  const title = () => {
    switch (props.type) {
      case "demandeSpecifique":
        return "Demande(s) spécifique(s)";
      case "demandeAbandonnee":
        return "Demande(s) abandonnée(s)";
      case "devisCommande":
        return "Devis et/ou commande(s)";
      default:
        return "-";
    }
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "16px",
  };

  const icon = () => {
    switch (props.type) {
      case "demandeSpecifique":
        return <IconMessageQuestion color="#CED4DA" style={iconStyle} />;
      case "demandeAbandonnee":
        return <IconMessageCancel color="#CED4DA" style={iconStyle} />;
      case "devisCommande":
        return <IconReceipt color="#CED4DA" style={iconStyle} />;
      default:
        return "-";
    }
  };

  return (
    <Paper shadow="xl" radius="md" p="md" w={"100%"} pos={"relative"}>
      {props.length > 0 ? (
        // Display the data when it is available
        <>
          {icon()}
          <Text tt={"uppercase"} fw={"bold"} fz={"xs"} c={"gray"}>
            {title()}
          </Text>
          <Flex gap="xs" justify="flex-start" align="center">
            <Text fw={"bold"} fz={"xl"}>
              {props.length}
            </Text>
            {/* <ThemeIcon color="green">
              <IconTrendingUp />
            </ThemeIcon>
            <ThemeIcon color="red">
              <IconTrendingDown />
            </ThemeIcon>
            <ThemeIcon color="gray">
              <IconScale />
            </ThemeIcon>
            <Text fz={"sm"} fw={"600"} mt={"xs"} c={"green"}>
              00%
            </Text> */}
          </Flex>
          <Text fz={"xs"} fs={"italic"} c={"gray"}>
            Depuis le 29/05/2023
          </Text>
        </>
      ) : (
        // Display a loading state while waiting for data
        <>
          <Skeleton height={12} my={6} w={"70%"} radius="xl" />
        </>
      )}
    </Paper>
  );
};

export default NotionDataLength;
