import { AbsoluteCenter, Box, Button, Card, CardBody, Center, FormControl, FormHelperText, FormLabel, Grid, GridItem, Image, Input, InputGroup, InputLeftElement, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import React, { Component, ReactNode } from "react";

interface EmailFormProps {
    onSubmit: (email: string) => Promise<void>;
  }
  
  interface EmailFormState {
    email: string;
    error: string;
  }

class EmailInput extends Component<EmailFormProps, EmailFormState> {
    constructor(props: EmailFormProps) {
      super(props);
      this.state = {
        email: "",
        error: "",
      };
    }
  
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ email: event.target.value, error: "" });
    };
  
    // validateEmail = (email: string) => {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //   return emailRegex.test(email);
    // };
  
    render(): ReactNode {
        const { email, error } = this.state;
        return (
            <Grid
              templateAreas={`"header header"
                              "main main"
                              "footer footer"`}
              gridTemplateRows={'200px 1fr 100px'}
              gridTemplateColumns={'1fr'}
              h='100vh'
              color={'#164951'}
              gap='1'
              fontFamily='"Poppins", sans-serif'
              backgroundImage={'/background.png'}
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
                    <Image src={'/logo.png'} width={"104.05px"} height={"31px"} />
                  </AbsoluteCenter>
                </Box>
              </GridItem>
              <GridItem area={'main'}>
                <FormControl p={4} isInvalid={error !== ""}>
                  <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                    <VStack align={'start'} width={'100%'} maxW="500px" mx={'auto'}>
                      <FormLabel
                        sx={{
                          fontStyle: 'normal',
                          fontSize: '24px',
                          lineHeight: '24px',
                          fontWeight: 600,
                        }}
                      >
                        Renseigner votre email
                      </FormLabel>
                      <FormHelperText
                        sx={{
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '18px',
                          color: '#808080',
                          fontStyle: 'normal'
                        }}
                      >
                        Rejoignez des milliers de locataires qui ont trouvé leur bonheur sur Qeeps !
                      </FormHelperText>
                      <Spacer marginTop={10} />
                      <Card
                        boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.03)'}
                        width={'100%'}
                        borderRadius={'14px'}
                      >
                        <CardBody>
                          <Stack margin={'16px'}>
                            <VStack>
                              <Text
                                sx={{
                                  color: "#164951",
                                  fontFamily: "'Poppins', sans-serif",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "17px"
                                }}
                              >
                                Votre e-mail
                              </Text>
                              <InputGroup alignSelf={'stretch'} mt={4}>
                                <InputLeftElement pointerEvents="none">
                                  <Box display="flex" alignItems="center">
                                    <Box color="#B3B3B3" fontWeight={"normal"}>
                                      <Image src={'/@.png'} width={4} ml={3} />
                                    </Box>
                                  </Box>
                                  <Box height="70%" borderLeft="1px solid" borderColor="#F2F2F2" ml={3} />
                                </InputLeftElement>
                                <Input
                                  type="email"
                                  padding={'10px 16px'}
                                  placeholder="maildecontact@example.fr"
                                  _placeholder={{color: "#B3B3B3"}}
                                  fontSize={"12px"}
                                  value={email}
                                  onChange={this.handleChange}
                                  borderRadius={'14px'}
                                  borderColor={'#F2F2F2'}
                                  pl={12}
                                />
                              </InputGroup>
                              { (error || !email) && (
                                <FormHelperText
                                  sx={{
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    color: '#808080',
                                    fontStyle: 'normal',
                                  }}>
                                    {error}
                                </FormHelperText>
                              )}
                            </VStack>
                          </Stack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </Box>
                </FormControl>
              </GridItem>
              <GridItem area={'footer'}>
                <Box zIndex="1" position="relative" p={4}>
                  <Center>
                    <Button
                      width={"361px"}
                      height={"52px"}
                      color="white"
                      backgroundColor={!email ? "rgba(22, 73, 81, 0.3)" : "#164951"}
                      borderRadius="14px"
                      fontFamily="'Poppins', sans-serif"
                      onClick={() => {
                        this.props.onSubmit(email);
                      }}
                      disabled={!email}
                    >
                      Continuer
                    </Button>
                  </Center>
                </Box>
              </GridItem>
            </Grid>
        );
    }
}

export default EmailInput;