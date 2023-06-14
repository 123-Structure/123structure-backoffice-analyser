import { Flex, Paper, Skeleton, Text, ThemeIcon } from "@mantine/core";
import {
  IconMessageCancel,
  IconMessageQuestion,
  IconReceipt,
  IconScale,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import { IRequestNotionApiResponse } from "../../data/interfaces/IRequestNotionApiResponse";

interface NotionDataCardProps {
  data: IRequestNotionApiResponse;
  subtitle: string;
  difference?: boolean;
}

const NotionDataCard = (props: NotionDataCardProps) => {
  const title = () => {
    switch (props.data.type) {
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
    switch (props.data.type) {
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

  const difference = () => {
    if (props.difference) {
      if (props.data.difference) {
        if (props.data.difference.value > 0) {
          return (
            <>
              <ThemeIcon color="green">
                <IconTrendingUp />
              </ThemeIcon>
              <Text fz={"sm"} fw={"600"} mt={"xs"} c={"green"}>
                {`${props.data.difference.percent}% (${props.data.difference.value})`}
              </Text>
            </>
          );
        }
        if (props.data.difference.value < 0) {
          return (
            <>
              <ThemeIcon color="red">
                <IconTrendingDown />
              </ThemeIcon>
              <Text fz={"sm"} fw={"600"} mt={"xs"} c={"red"}>
                {`${props.data.difference.percent}% (${props.data.difference.value})`}
              </Text>
            </>
          );
        }
        if (props.data.difference.value > 0) {
          return (
            <>
              <ThemeIcon color="gray">
                <IconScale />
              </ThemeIcon>
              <Text fz={"sm"} fw={"600"} mt={"xs"} c={"gray"}>
                {`${props.data.difference.percent}% (${props.data.difference.value})`}
              </Text>
            </>
          );
        }
      }
    }
    return <></>;
  };

  return (
    <Paper
      shadow="xl"
      radius="md"
      p="md"
      w={"100%"}
      pos={"relative"}
      ta={"center"}
    >
      {props.data.length > 0 ? (
        // Display the data when it is available
        <>
          {icon()}
          <Text tt={"uppercase"} fw={"bold"} fz={"xs"} c={"gray"}>
            {title()}
          </Text>
          <Flex gap="xs" justify="center" align="center">
            <Text fw={"bold"} fz={"xl"}>
              {props.data.length}
            </Text>
            {difference()}
          </Flex>
          <Text fz={"xs"} fs={"italic"} c={"gray"}>
            {props.subtitle}
          </Text>
        </>
      ) : (
        // Display a loading state while waiting for data
        <Flex gap="xs" justify="center" align="center" direction={"column"}>
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"33%"} radius="xl" />
          <Skeleton height={12} my={2} w={"33%"} radius="xl" />
        </Flex>
      )}
    </Paper>
  );
};

export default NotionDataCard;
