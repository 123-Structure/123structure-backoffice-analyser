import { IGetCurrentMonthResponse } from "../../data/interfaces/IGetCurrentMonth";
import {
  Flex,
  Paper,
  Progress,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { getTitleCard } from "../../data/utils/getTitleCard";
import NotionIconCard from "./utils/CardIcon";

interface INotionProgressCardProps {
  data: IGetCurrentMonthResponse[];
  subtitle: string;
}

interface IProgressItem {
  value: number;
  color: string;
  label: string;
  tooltip: string;
}

const NotionProgressCard = (props: INotionProgressCardProps) => {
  const theme = useMantineTheme();

  const color = (category: string) => {
    switch (category) {
      case "🏡 Construction neuve":
        return theme.colors.cyan[5];
      case "🏡 Agrandissement par surélévation":
        return theme.colors.green[5];
      case "🏡 Agrandissement par extension":
        return theme.colors.gray[5];
      case "🏡 Rénovation":
        return theme.colors.pink[5];
      case "🏡 Dimensionnement d'élements":
        return theme.colors.violet[5];
      default:
        return theme.colors.yellow[5];
    }
  };

  const progressData = () => {
    const totalLength = props.data.reduce((acc: number, category) => {
      acc += category.length;
      return acc;
    }, 0);

    const data = props.data
      .filter((category) => category.length !== 0)
      .reduce((accumulator: IProgressItem[], category) => {
        accumulator.push({
          value: (category.length / totalLength) * 100,
          color: color(category.type.split(" (")[1].replace(")", "")),
          label: category.length.toString(),
          tooltip: `${category.type.split(" (")[1].replace(")", "")} (${
            category.length
          } - ${Math.round((category.length / totalLength) * 100)}%)`,
        });
        return accumulator;
      }, [])
      .sort((a, b) => b.value - a.value);
    return data;
  };

  const legend = () => {
    const categoryList = [
      "🏡 Construction neuve",
      "🏡 Agrandissement par surélévation",
      "🏡 Agrandissement par extension",
      "🏡 Rénovation",
      "🏡 Dimensionnement d'élements",
    ];

    return (
      <>
        {categoryList.map((category, index) => (
          <Flex gap={"xs"} justify="center" align="center" direction={"row"}>
            <div
              style={{
                width: "1rem",
                height: "1rem",
                borderRadius: "25%",
                backgroundColor: color(category),
              }}
            />
            <Text key={index} fz={"xs"}>
              {`: ${category.replace("🏡 ", "")}`}
            </Text>
          </Flex>
        ))}
      </>
    );
  };

  return (
    <Paper
      shadow="md"
      radius="md"
      p="md"
      w={"100%"}
      pos={"relative"}
      ta={"center"}
    >
      {props.data[0].length !== -1 ? (
        // Display the data when it is available
        <>
          {NotionIconCard(props.data[0].type.split(" ")[0])}
          <Text tt={"uppercase"} fw={"bold"} fz={"xs"} c={"gray"}>
            {getTitleCard(props.data[0].type.split(" ")[0])}
          </Text>
          <Flex
            gap="xs"
            justify="center"
            align="flex-start"
            py={"xs"}
            px={"xl"}
            direction={"column"}
          >
            <Progress size="xl" sections={progressData()} w={"100%"} />
            {legend()}
          </Flex>
          <Text fz={"xs"} fs={"italic"} c={"gray"}>
            {props.subtitle}
          </Text>
        </>
      ) : (
        // Display a loading state while waiting for data
        <Flex gap="sm" justify="center" align="center" direction={"column"}>
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"75%"} radius="xl" />
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"50%"} radius="xl" />
          <Skeleton height={12} my={2} w={"33%"} radius="xl" />
        </Flex>
      )}
    </Paper>
  );
};

export default NotionProgressCard;
