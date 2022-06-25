import type { PropsWithChildren } from "react";
import { Box, Text, Flex, Show } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export const Header = ({ children }: PropsWithChildren<any>) => {
  return (
    <Box p={6} pl={12} pr={12}>
      <Flex
        w="full"
        align="baseline"
        justify={{ base: "center", lg: "space-even" }}
      >
        <Link to="/">
          <Text fontSize="2xl">flipnotes</Text>
        </Link>
        <Show above="lg">
          <Flex justify="end" w="full" align="center">
            {children}
          </Flex>
        </Show>
      </Flex>
    </Box>
  );
};
