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
      w={700}
      h={700}
      borderRadius={25}
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
        >
          <Center h="full">
            <Text fontSize="4xl">
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
        >
          <Center h="full">
            <Text fontSize="4xl">{content}</Text>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};
