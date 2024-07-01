import {
    Badge,
    Box,
    Button,
    Flex,
    Loader,
    Radio,
    RadioGroup,
    Text,
    Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Question from "../interfaces/types";
import shuffleArray from "../utills/functions";
import QuizResult from "./QuizResult";

const Home: React.FC = () => {
    const [apiData, setApiData] = useState<Question[]>([]);
    const [id, setId] = useState<number>(0);
    const [submit, setSubmit] = useState<boolean>(false);
    const [TotalOutcome, setTotalOutcome] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [rightanswer, setRightAnswer] = useState<number>(0);
    const [wronganswer, setWrongAnswer] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true)

    const getTriggerQA = () => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                return response.json();
            })
            .then((data) => {
                const finalArray = data.results.map((obj: Question) => {
                    const { incorrect_answers, correct_answer } = obj;
                    const answers = incorrect_answers.concat(correct_answer) as [];
                    const answersArray = shuffleArray(answers);
                    const finalArray = { ...obj, answersArray };
                    return finalArray;
                });
                setApiData(finalArray);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    useEffect(() => {
        getTriggerQA();
    }, []);

    const radioOptionChange = (value: string) => {
        if (!isAnswered) {
            setSelectedAnswer(value);
            setShow(false);
            setIsAnswered(true);
        }
    };
    const checkanswer = () => {
        if (selectedAnswer === apiData[id].correct_answer) {
            setRightAnswer(rightanswer + 1);
        } else {
            setWrongAnswer(wronganswer + 1);
        }
    };
    const handleNextQuestion = () => {
        if (selectedAnswer === null) {
            setShow(true);
            return;
        }
        checkanswer();

        setSelectedAnswer(null);
        setIsAnswered(false);
        setId(id + 1);
    };

    useEffect(() => {
        if (id === apiData.length - 1) {
            setSubmit(true);
        }
    }, [id, apiData.length]);

    const handleSubmit = () => {
        checkanswer();
        setTotalOutcome(true);
    };

    return (
        <Flex justify="center" align="center" mih={"100vh"} bg="gray">
            {
                loading ? <Loader color="white" type="bars" /> : <Box
                    w={{ xs: "90%", sm: "70%", md: "50%" }}
                    h={"80%"}
                    bg={"white"}
                    p={"20px"}
                    bd={"12px"}
                >
                    {TotalOutcome ? (
                        <QuizResult rightanswer={rightanswer} wronganswer={wronganswer} />
                    ) : (
                        <>
                            {apiData.length > 0 &&
                                <>
                                    <Box>
                                        <Flex justify={"flex-end"}>
                                            <Badge h={20} color="orange" variant="light">{apiData[id].difficulty}</Badge>
                                        </Flex>
                                        <Title order={4} p={20}>{`Question ${id + 1}:- ${apiData[id].question
                                            }`}</Title>

                                        <RadioGroup
                                            value={selectedAnswer}
                                            onChange={radioOptionChange}


                                        >
                                            {apiData[id].answersArray.map((option, index) => (
                                                <Radio
                                                    key={index}
                                                    m={10}
                                                    value={option}
                                                    label={option}
                                                    p={10}
                                                    style={{
                                                        border:
                                                            selectedAnswer === option
                                                                ? selectedAnswer === apiData[id].correct_answer
                                                                    ? "2px solid green"
                                                                    : "2px solid red"
                                                                : apiData[id].correct_answer === option &&
                                                                    isAnswered
                                                                    ? "2px solid green"
                                                                    : "none",
                                                        borderRadius: "8px"

                                                    }}
                                                />
                                            ))}
                                        </RadioGroup>
                                        {show && <Text c={"red"} px={20}>Please select any   option</Text>}

                                        <Flex justify={"center"} align={"center"}>

                                            <Button
                                                onClick={submit ? handleSubmit : handleNextQuestion}
                                                mt={15}
                                            >
                                                {submit ? "Submit" : "Next "}
                                            </Button>
                                        </Flex>
                                    </Box>
                                </>
                            }
                        </>
                    )}
                </Box>
            }

        </Flex>
    );
};

export default Home;
