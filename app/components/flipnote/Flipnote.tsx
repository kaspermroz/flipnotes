import { useState } from "react";
import { Box, Center, Text } from "@chakra-ui/react";

type FlipnoteProps = {
  title: string;
  content: string;
};

export const Flipnote = ({ title, content }: FlipnoteProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      className="flip-card"
      onClick={() => setIsFlipped(!isFlipped)}
      w={{ base: 320, lg: 500 }}
      h={{ base: 320, lg: 500 }}
      borderRadius={25}
      data-testid="flipnote-container"
    >
      <Box
        className={`flip-card-inner ${
          isFlipped ? "flip-card-inner-rotate" : ""
        }`}
        borderRadius={25}
      >
        <Box
          className="flip-card-front"
          borderRadius={25}
          bg="#FFFFF0"
          border="1px solid #F6E05E"
          p={4}
          data-testid="flipnote-front"
        >
          <Center h="full">
            <Text fontSize={{ base: "2xl", lg: "4xl" }}>
              <b>{title}</b>
            </Text>
          </Center>
        </Box>
        <Box
          className="flip-card-back"
          borderRadius={25}
          bg="#FFFFF0"
          border="1px solid #F6E05E"
          p={4}
          data-testid="flipnote-back"
        >
          <Center h="full">
            <Text fontSize={{ base: "2xl", lg: "4xl" }}>{content}</Text>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};
