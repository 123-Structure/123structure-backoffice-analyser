import { Text, ThemeIcon } from "@mantine/core";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconScale,
} from "@tabler/icons-react";
import { IGetAllPagesResponse } from "../../../data/interfaces/IGetAllPagesResponse";
import { IGetCurrentMonthResponse } from "../../../data/interfaces/IGetCurrentMonth";

const CardDifference = (
  data: IGetAllPagesResponse | IGetCurrentMonthResponse
) => {
  if ("difference" in data && data.difference) {
    if (data.difference.value > 0) {
      return (
        <>
          <ThemeIcon color="green">
            <IconTrendingUp />
          </ThemeIcon>
          <Text fz={"sm"} fw={"600"} mt={"xs"} c={"green"}>
            {`${data.difference.percent}% (${data.difference.value})`}
          </Text>
        </>
      );
    }
    if (data.difference.value < 0) {
      return (
        <>
          <ThemeIcon color="red">
            <IconTrendingDown />
          </ThemeIcon>
          <Text fz={"sm"} fw={"600"} mt={"xs"} c={"red"}>
            {`${data.difference.percent}% (${data.difference.value})`}
          </Text>
        </>
      );
    }
    if (data.difference.value > 0) {
      return (
        <>
          <ThemeIcon color="gray">
            <IconScale />
          </ThemeIcon>
          <Text fz={"sm"} fw={"600"} mt={"xs"} c={"gray"}>
            {`${data.difference.percent}% (${data.difference.value})`}
          </Text>
        </>
      );
    }
  }
  return <></>;
};

export default CardDifference;
