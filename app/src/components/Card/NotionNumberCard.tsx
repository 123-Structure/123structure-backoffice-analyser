import { Flex, Paper, Skeleton, Text } from "@mantine/core";
import { IGetAllPagesResponse } from "../../data/interfaces/IGetAllPagesResponse";
import { IGetCurrentMonthResponse } from "../../data/interfaces/IGetCurrentMonth";
import { getTitleCard } from "../../data/utils/getTitleCard";
import CardDifference from "./utils/CardDifference";
import CardIcon from "./utils/CardIcon";

interface NotionNumberCardProps {
  data: IGetAllPagesResponse | IGetCurrentMonthResponse;
  subtitle: string;
}

const NotionNumberCard = (props: NotionNumberCardProps) => {
  return (
    <Paper
      shadow="md"
      radius="md"
      p="md"
      w={"100%"}
      pos={"relative"}
      ta={"center"}
    >
      {props.data.length > 0 ? (
        // Display the data when it is available
        <>
          {CardIcon(props.data.type)}
          <Text tt={"uppercase"} fw={"bold"} fz={"xs"} c={"gray"}>
            {getTitleCard(props.data.type)}
          </Text>
          <Flex gap="xs" justify="center" align="center" py={"xs"} px={"xl"}>
            <Text fw={"bold"} fz={"xl"}>
              {props.data.length}
            </Text>
            {CardDifference(props.data)}
          </Flex>
          <Text fz={"xs"} fs={"italic"} c={"gray"}>
            {props.subtitle}
          </Text>
        </>
      ) : (
        // Display a loading state while waiting for data
        <Flex gap="md" justify="center" align="center" direction={"column"}>
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"33%"} radius="xl" />
          <Skeleton height={12} my={2} w={"33%"} radius="xl" />
        </Flex>
      )}
    </Paper>
  );
};

export default NotionNumberCard;
