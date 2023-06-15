import { Flex } from "@mantine/core";
import AllPagesGrid from "./components/AllPagesGrid";
import CurrentMonthGrid from "./components/CurrentMonthGrid";

const App = () => {
  return (
    <Flex gap={"lg"} direction={"column"} p={"xl"} align={"center"}>
      <AllPagesGrid />
      <CurrentMonthGrid />
    </Flex>
  );
};

export default App;
