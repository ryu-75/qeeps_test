import { ChangeEvent, Component, ReactNode } from "react";
import { AbsoluteCenter, Box, Button, Card, CardBody, Center, FormControl, FormHelperText, FormLabel, Grid, GridItem, HStack, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { TbMailForward } from "react-icons/tb";

interface SecurityCodeInputProps {
    fetchResendCode: () => void;
    email: string;
    code: string[];
}
  
interface SecurityCodeInputState {
  code: string[];
}

class OtpInput extends Component<SecurityCodeInputProps, SecurityCodeInputState> {
    constructor(props: SecurityCodeInputProps) {
      super(props);
      this.state = {
        code: props.code,
      }
    }
  
  handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newCode = [...this.state.code];
    newCode[index] = event.target.value;
    this.setState({ code: newCode });
    console.log(newCode);
  };

  handleContinue = async () => {
    const { code } = this.state;
    const { email } = this.props;

    try {
      const response = await fetch('http://localhost:3000/otp/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: code.join('') }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      alert('OTP sent succesfully');
    } catch (e: any) {
      console.error("Error sending OTP: ", e.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  render(): ReactNode {
    const { code } = this.state;

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
          <Box position={'relative'} display={'flex'} justifyContent={'center'} width={'100%'} ml={4}>
            <VStack align={'start'} width={'100%'} maxW="500px" mx={'auto'}>
              <Text
                  fontSize={"20px"}
                  lineHeight={"24px"}
                  fontWeight={600}
                >
                  Un petit coup d'oeil à vos mails? 📨
                </Text>
                <Text
                  fontSize={"12px"}
                  lineHeight={"18px"}
                  fontWeight={400}
                  color={'#808080'}
                >
                  Vous venez de recevoir un code d'accès de notre part !
                </Text>
                <Spacer marginTop={4} />
                <Card
                  boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.03)'}
                  borderRadius={'14px'}
                  width={'100%'}
                >
                  <CardBody margin={'14px'}>
                    <Stack>
                        <VStack borderRadius="md">
                            <Text 
                              sx={{
                                fontWeight: 500,
                                fontSize: "14px",
                                lineHeight: "17px",
                              }}
                            >
                            Code de sécurité
                            </Text>
                            <Spacer marginTop={2} />
                            <HStack spacing={2}>
                              {code.map((digit, index) => (
                                <Input
                                  key={index}
                                  value={digit}
                                  onChange={this.handleChange(index)}
                                  placeholder="*"
                                  _placeholder={{fontSize: '12px', textColor: '#B3B3B3'}}
                                  maxLength={1}
                                  textAlign="center"
                                  size="md"
                                  width="38px"
                                  height="40px"
                                  borderRadius={"14px"}
                                  fontSize="xl"
                                />
                              ))}
                            </HStack>
                            <Spacer marginTop={2} />
                            <VStack align={'center'} width={'100%'} maxW="500px" mx={'auto'}>
                              <Text
                                sx={{
                                  textColor: '#B3B3B3',
                                  fontWeight: 400,
                                  lineHeight: '18px',
                                  fontSize: '12px',
                                  display:'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textAlign: 'center'
                                }}
                              >
                                Merci d’entrer le code de sécurité que<br /> vous avec reçu par e-mail.
                              </Text>
                            </VStack>
                            <Button 
                                variant="outline" 
                                sx={{
                                    borderRadius: "14px",
                                    border: "1px solid #F2F2F2",
                                    margin: '10px',
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    lineHeight: "18px",
                                    width:"203px",
                                    height:"40px"
                                }}
                                onClick={this.handleContinue}
                            >
                                Je n’ai rien reçu
                                <Icon
                                    as={TbMailForward} // Utilisation de TbMailForward comme composant IconButton
                                    boxSize={4}
                                    ml={2}
                                    aria-label="Forward email" // Accessibilité
                                />
                            </Button>
                        </VStack>
                      </Stack>
                  </CardBody>
                </Card>
            </VStack>
          </Box>
        </GridItem>
        <GridItem area={'footer'}>
          <Box zIndex="1" position="relative" p={4}>
            <Center>
              <Button
                width={"361px"}
                height={"52px"}
                color="white"
                backgroundColor={"#164951"}
                borderRadius="14px"
                fontFamily="'Poppins', sans-serif"
              >
                Continuer
              </Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
    );
  };
}

export default OtpInput;