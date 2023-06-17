import { Flex, Text } from "@mantine/core";

interface IGridTitleProps {
  title: string;
  icon: JSX.Element;
}

const GridTitle = (props: IGridTitleProps) => {
  return (
    <Flex gap={"sm"}>
      {props.icon}
      <Text fw={"bold"} fz={"lg"}>
        {props.title}
      </Text>
    </Flex>
  );
};

export default GridTitle;
