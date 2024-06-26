import { ChangeEvent, Component, ReactNode } from "react";
import { AbsoluteCenter, Box, Button, Card, CardBody, Center, Grid, GridItem, HStack, Icon, Image, Input, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { TbMailForward } from "react-icons/tb";
import Signup from "./Signup";
import axios from "axios";

/* 
  - refetchOtp: Effectue un nouvel appel vers l'API et récupère un nouveau code OTP.
  - email: Adresse email de l'utilisateur.
  - code: Code OTP envoyé à l'utilisateur, sous forme de tableau de caractères.
  - otp: Code OTP complet sous forme de chaîne de caractères.
  - onBack: Permet de revenir à l'écran précédent.
*/
interface OtpInputProps {
    refetchOtp: (email: string) => Promise<void>;
    email: string;
    code: string[];
    otp: string;
    onBack: () => void;
}

/* 
  - newCode: Représente le nouveau code OTP saisi par le client.
  - isValidCode: Indique si le code saisi est valide.
  - id: Récupéré depuis l'API
*/
interface OtpInputState {
  newCode: string[];
  isValidCode: boolean;
  id: string;
}

class OtpInput extends Component<OtpInputProps, OtpInputState> {
  constructor(props: OtpInputProps) {
    super(props);
    this.state = {
      newCode: Array(5).fill(''), // Initialise un nouveau tableau de 5 chaînes
      isValidCode: false,
      id: "",
    }
  }

  /* Récupère les données du client depuis l'API */
  getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch users');
      }
  
      const data = await response.data;
      this.setState({ id: data[0]._id });
    } catch (e: unknown) {
      if (e instanceof Error) console.error("Error: ", e.message);
    }
  };

  /* Compare le code saisi par le client avec le code OTP reçu */
  compareCodeContent = async (newCode: string[], otp: string): Promise<boolean> => {
    let yourOtp = "";
    
    for (let i = 0; i < newCode.length; i++) yourOtp += newCode[i]; 
    if (yourOtp === otp) {
      await this.getUserData();
      this.setState({ isValidCode: true });
      return true;
    }
    alert('Code is not valid');
    return false;
  }

  /* Gère le changement de valeur dans les champs de saisie de l'OTP */
  handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { newCode } = this.state;
    const isNewCode = [...newCode];
    isNewCode[index] = value;
    this.setState({ newCode: isNewCode });
  };

  /* Génère le contenu du composant de l'OTP */
  otpContent = (refetchOtp: (email:string) => Promise<void>, email: string, newCode: string[]) => {
    return (
      <Box position={'relative'} display={'flex'} justifyContent={'center'} width={'100vw'}>
        <VStack align={'start'} width={'100%'} maxW="500px" m={4}>
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
                          {newCode.map((digit, index) => (
                            <Input
                              key={index}
                              value={digit}
                              onChange={this.handleChange(index)}
                              placeholder="*"
                              _placeholder={{fontSize: '12px', textColor: '#B3B3B3'}}
                              maxLength={1}
                              textAlign="center"
                              size="md"
                              width="45px"
                              height="45px"
                              borderRadius={"14px"}
                              fontSize="10px"
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
                            onClick={() => {
                              refetchOtp(email);
                            }}
                        >
                            Je n’ai rien reçu
                            <Icon
                                as={TbMailForward}
                                boxSize={4}
                                ml={2}
                                aria-label="Forward email" 
                            />
                        </Button>
                    </VStack>
                  </Stack>
              </CardBody>
            </Card>
        </VStack>
      </Box>
    )
  }

  render(): ReactNode {
    const { isValidCode, newCode, id } = this.state;
    const { email, refetchOtp, code, otp } = this.props;
    
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
          {!isValidCode ? this.otpContent(refetchOtp, email, newCode) : <Signup email={email} id={id} onBack={this.props.onBack} />}
        </GridItem>
        {!isValidCode && (
          <GridItem area={'footer'}>
            <Box zIndex="1" position="relative" p={4}>
              <Center>
                <Button
                  width={"361px"}
                  height={"52px"}
                  color="white"
                  backgroundColor="#164951"
                  borderRadius="14px"
                  fontFamily="'Poppins', sans-serif"
                  disabled={!code}
                  onClick={() => {
                    this.compareCodeContent(newCode, otp);
                  }}
                >
                  Continuer
                </Button>
              </Center>
            </Box>
          </GridItem>)}
      </Grid>
    );
  }
}

export default OtpInput;