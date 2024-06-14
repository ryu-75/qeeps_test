import { AbsoluteCenter, Box, Button, Card, CardBody, Center, Circle, Container, Grid, GridItem, Image, Link, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const Subscription = () => {
    const { type }  = useParams();

    return (
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
                        <Image src={'/public/logo.png'} width={"104.05px"} height={"31px"} />
                    </AbsoluteCenter>
                </Box>
            </GridItem>
            <GridItem area={'main'}>
            </GridItem>
            <GridItem area={'footer'}>
                <Box zIndex="1" position="relative" p={4}>
                    <Center>
                        <Button
                          sx={{
                            position: "absolute",
                            width: "361px",
                            height: "52px",
                            backgroundColor: "#164951",
                            color: "white",
                            borderRadius: "14px",
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          Connexion rapide
                        </Button>
                    </Center>
                </Box>
            </GridItem>
        </Grid>
    )
}

export default Subscription;