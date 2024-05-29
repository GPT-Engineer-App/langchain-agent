import { useState } from "react";
import { Container, VStack, Text, Input, Button, Box, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (input.trim() === "") {
      toast({
        title: "Input is empty.",
        description: "Please type a message before sending.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = { text: `Agent response to: ${input}`, sender: "agent" };
      setMessages((prevMessages) => [...prevMessages, agentMessage]);
    }, 1000);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Chat with the Agent</Text>
        <Box width="100%" height="60vh" overflowY="auto" border="1px solid #ccc" borderRadius="md" padding={4}>
          {messages.map((message, index) => (
            <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "blue.100" : "green.100"} borderRadius="md" padding={2} marginY={1}>
              <HStack>
                {message.sender === "agent" && <FaRobot />}
                <Text>{message.text}</Text>
              </HStack>
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
          <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
