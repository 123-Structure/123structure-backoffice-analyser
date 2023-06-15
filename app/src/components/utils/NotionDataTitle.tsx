import { Flex, Text } from "@mantine/core";

interface INotionDataTitleProps {
  title: string;
  icon: JSX.Element;
}

const NotionDataTitle = (props: INotionDataTitleProps) => {
  return (
    <Flex gap={"sm"}>
      {props.icon}
      <Text fw={"bold"} fz={"lg"}>
        {props.title}
      </Text>
    </Flex>
  );
};

export default NotionDataTitle;
