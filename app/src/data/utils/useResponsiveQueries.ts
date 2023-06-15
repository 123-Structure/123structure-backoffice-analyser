import { useMediaQuery } from "@mantine/hooks";

export const useResponsiveQueries = () => {
  const sm = useMediaQuery("(min-width: 576px)");
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 992px)");
  const xl = useMediaQuery("(min-width: 1200px)");
  const xxl = useMediaQuery("(min-width: 1400px)");

  return { sm, md, lg, xl, xxl };
};
