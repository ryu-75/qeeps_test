import { AbsoluteCenter, Box, Button, Card, CardBody, Center, Circle, Container, Grid, GridItem, Image, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/home.css";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const [redirection, setRedirection] = useState<string | null>(null); // Défaut à "candidat"

    const   handleCardClick = (cardType: string) => {
        if (cardType) setRedirection(cardType);
    };

    const   handleButtonClick = () =>  {
        if (redirection) navigate(`/register/${redirection}`);
    }
    return(
        <Grid
            templateAreas={`"header header"
                            "main main"
                            "footer footer"`}
            gridTemplateRows={'200px 1fr 100px'}
            gridTemplateColumns={'150px 1fr'}
            h='100vh'
            gap='1'
            color='#164951'
            fontFamily='"Poppins", sans-serif'
            backgroundImage={'/public/background.png'}
            backgroundSize={"contain"}
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                zIndex="0"
                height="100vh"
                width="100vw"
                sx={{
                  background: 'linear-gradient(to bottom, rgba(242, 242, 242, 0.8) 0%, rgba(242, 242, 242, 1) 12%)'
                }}
            />
            <GridItem area={'header'}>
                <Box position={"relative"} h={200}>
                    <AbsoluteCenter>
                        <Image src={'./public/logo.png'} width={"104.05px"} height={"31px"} />
                    </AbsoluteCenter>
                </Box>
            </GridItem>
            <GridItem area={'main'}>
                <Center zIndex={10} position={'relative'}>
                    <Box height={69.6} width={358} display={'flex'} alignItems={'flex-start'} >
                        <VStack align={"start"} flexDirection={'column'} >
                            <Text fontSize={20} fontWeight={"semibold"}>Qui êtes-vous ?</Text>
                            <Text fontStyle={"normal"} fontSize={12} color={"#808080"}>Sélectionnez si vous êtes un agent ou bien si vous êtes un candidat.</Text>
                        </VStack>
                    </Box>
                </Center>
                <Container marginTop={10}>
                    <Center>
                        <Card
                            height={'184.5px'} 
                            width={'361px'}  
                            display={'flex'} 
                            justifyContent={'center'}
                            onClick={() => handleCardClick('agent')}
                            _hover={{ cursor: 'pointer', boxShadow: 'lg' }}
                            boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.03)'}
                            border={redirection === 'agent' ? '3px solid  rgba(22, 73, 81, 0.2)' : 'none'}
                            backgroundColor={redirection === 'agent' ? 'rgba(22, 73, 81, 0.05)' : 'white'}
                        >
                            <CardBody>
                              <Stack mt='6' spacing='3'>
                                <VStack margin={12}>
                                    <Circle size='70px' bg={"#EDF2F7"}>
                                        <Image src={'./public/agent.png'} width={9}/>
                                    </Circle>
                                    <Text
                                        sx={{
                                            color: "#164951",
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "18px"
                                        }}
                                    >
                                      Je suis un agent
                                    </Text>
                                </VStack>
                              </Stack>
                            </CardBody>
                        </Card>
                    </Center>
                    <Spacer />
                    <Center>
                        <Card 
                            height={'184.5px'} 
                            width={'361px'} 
                            display={'flex'} 
                            justifyContent={'center'} 
                            marginTop={3}
                            onClick={() => handleCardClick('candidat')}
                            _hover={{ cursor: 'pointer', boxShadow: 'lg' }}
                            boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.03)'}
                            border={redirection === 'candidat' ? '3px solid rgba(22, 73, 81, 0.2)' : 'none'}
                            backgroundColor={redirection === 'candidat' ? 'rgba(22, 73, 81, 0.05)' : 'white'}
                        >
                            <CardBody>
                              <Stack mt='6' >
                                <VStack margin={12}>
                                    <Circle size='70px' bg={"#EDF2F7"}>
                                        <Image src={'./public/candidat.png'} width={9}/>
                                    </Circle>
                                    <Text
                                        sx={{
                                            color: "#164951",
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            lineHeight: "18px"
                                        }}
                                    >
                                      Je suis un candidat
                                    </Text>
                                </VStack>
                              </Stack>
                            </CardBody>
                        </Card>
                    </Center>
                </Container>    
            </GridItem>
            <GridItem area={'footer'}>
                <Box zIndex="1" position="relative" p={4}>
                    <Center>
                        <Button
                          sx={{
                            position: "absolute",
                            width: "361px",
                            height: "52px",
                            color: "white",
                            backgroundColor:!redirection ? "rgba(22, 73, 81, 0.3)" : "#164951",
                            borderRadius: "14px",
                            fontFamily: "'Poppins', sans-serif"
                          }}
                          onClick={() => {
                            handleButtonClick();
                          }}
                          disabled={!redirection}
                        >
                          Connexion rapide
                        </Button>
                    </Center>
                </Box>
            </GridItem>
        </Grid>
    )
}
export default Home;