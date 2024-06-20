import { Component, ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

// - backToUpdate: Reviens sur le composant (Signup.tsx) - Permet d'apporter des modifications au formulaire.
interface SummaryProps {
  backToUpdate: () => void;
}

// Définition de l'état du composant Summary, correspondant aux données client après récupérées via l'API
interface SummaryState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'agent' | 'candidat';
}

class Summary extends Component<SummaryProps, SummaryState>{
  constructor(props: SummaryProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      status: 'agent',
    };
  }

  // Appel à l'API pour récupérer les données utilisateur après le montage du composant
  componentDidMount() {
    this.getUserData();
  }

  /* 
    Récupère les données client depuis l'API
    Met à jour l'état de composant avec les données récupèrées
  */
  getUserData = async (): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:3000/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status !== 200) throw new Error('Failed to fetch users data');
      const data = await response.data;
      const user = data[0];
      this.setState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        status: user.status,
      })
    } catch (e: unknown) {
      if (e instanceof Error) console.log("Error: ", e.message);
    }
  }
  render(): ReactNode {
    const { first_name, last_name, email, phone, status } = this.state;
    return (
      <Box
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        m={4}
      >
        <VStack align={"start"} width={"100%"} maxW="500px" m={4}>
          <Text fontSize={"20px"} lineHeight={"24px"} fontWeight={600}>
            Bonjour { first_name },
          </Text>
          <Spacer marginTop={2} />
          <Box height="0px" width="348px" border="1px solid" borderColor="rgba(128, 128, 128, 0.1)" />
          <Spacer marginTop={2} />
          <Card
            border={"1px solid #F2F2F2"}
            borderRadius={'14px'}
            width={'358px'}
            height={'388px'}
          >
            <CardBody>
              <Stack>
                <VStack borderRadius="md">
                  <Box display={'flex'} alignItems={'centre'} justifyContent={'space-between'} width={'100%'}>
                    <Text
                      align={'left'} 
                      mt={'12px'}
                      sx={{
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "19px",
                      }}
                    >
                    { first_name } { last_name }
                    </Text>
                    <Button
                      sx={{
                        borderRadius: "8px",
                        height: "40px",
                        border: "1px solid #F2F2F2",
                        background: "white"
                      }}
                      onClick={this.props.backToUpdate}
                    >
                      <Image src={'/pen.png'} width={5} />
                    </Button>
                  </Box>
                  <VStack align={'start'} width={'100%'} maxW="500px" mx={'auto'}>
                    <Box 
                      border={"1px solid #F2F2F2"}
                      borderRadius={'8px'}
                      padding={"4px 8px"}
                    >
                      <Text
                        sx={{
                          textColor: '#B3B3B3',
                          fontWeight: 500,
                          lineHeight: '18px',
                          fontSize: '12px',
                          display:'flex',
                          alignItems: 'start',
                          color: "#164951"
                        }}
                      >
                        <Image src="/book.png" width={4} mr={3}/>
                        { status }
                      </Text>
                    </Box>
                  </VStack>
                  <Spacer marginTop={8} />
                  <VStack align={'start'} width={'100%'} maxW="500px" p={5}>
                    <Box>
                      <Text
                        sx={{
                          textColor: '#B3B3B3',
                          fontWeight: 500,
                          lineHeight: '18px',
                          fontSize: '12px',
                          display:'flex',
                          alignItems: 'start',
                        }}
                      >
                        <Image src="/phone.png" w={3} mr={3}/>
                        Téléphone
                      </Text>
                      <Text 
                        mt={2} 
                        fontSize={"12px"} 
                        lineHeight={"14px"} 
                        fontWeight={600}
                        color={"#073906"}
                      >
                        { phone }
                      </Text>
                    </Box>
                    <Spacer marginTop={6} />
                    <Box>
                      <Text
                        sx={{
                          textColor: '#B3B3B3',
                          fontWeight: 500,
                          lineHeight: '18px',
                          fontSize: '12px',
                          display:'flex',
                          alignItems: 'start',
                        }}
                      >
                        <Image src="/@.png" w={4} mr={3}/>
                        Adresse e-mail
                      </Text>
                      <Text 
                        mt={2} 
                        fontSize={"12px"} 
                        lineHeight={"14px"} 
                        fontWeight={600}
                        color={"#073906"}
                      >
                        { email }
                      </Text>
                    </Box>
                  </VStack>
                </VStack>
              </Stack>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    );
  }
}

export default Summary;