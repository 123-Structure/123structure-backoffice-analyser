import { Flex } from "@mantine/core";
import AllPagesGrid from "./components/AllPagesGrid";
import CurrentMonthGrid from "./components/CurrentMonthGrid";

const App = () => {
  return (
    <Flex gap={"md"} direction={"column"} py={"lg"}>
      <AllPagesGrid />
      <CurrentMonthGrid />
    </Flex>
  );
};

export default App;
