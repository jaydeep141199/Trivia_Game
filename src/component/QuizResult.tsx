import React from "react";
import { Badge, Box, Flex, Text, Title } from "@mantine/core";
import { ResultProps } from "../interfaces/types";
const QuizResult: React.FC<ResultProps> = ({ rightanswer, wronganswer }) => {
    return (
        <>
            <Flex justify={"flex-end"}>
                <Badge h={30} color="orange" variant="light">
                    Total questions: {rightanswer + wronganswer}
                </Badge>
            </Flex>
            <Title order={3} ta="center" c={"green"} style={{ marginBottom: "20px" }}>
                Congratulations!!! You have Successfully Answer all the
                Questions
            </Title>
            <Title order={2} ta="center" style={{ marginBottom: "20px" }}>
                Quiz Result
            </Title>
            <Flex justify={"space-between"} mb={"20px"}>
                <Box bg={"green"} p={"20px"} mr={"10px"} ta={"center"}>
                    <Text style={{ marginBottom: "10px" }}>Right Answers</Text>
                    <Title style={{ fontSize: "24px" }}>{rightanswer}</Title>
                </Box>
                <Box
                    bg={"red"}
                    p={"20px"}
                    bd={"8px solid red"}
                    ml={"10px"}
                    ta={"center"}
                >
                    <Text style={{ marginBottom: "10px" }}>Wrong Answers</Text>
                    <Title style={{ fontSize: "24px" }}>{wronganswer}</Title>
                </Box>
            </Flex>
        </>

        // </Box>
    );
};

export default QuizResult;
