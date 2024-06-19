import { Component, ReactNode } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowGoBackLine } from "react-icons/ri";
import Summary from "./summary";

interface SignupState {
  first_name: string;
  last_name: string;
  phone: string;
  isUpdate: boolean;
}

interface SignupProps {
  email: string;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      isUpdate: false,
    };
  }
  handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ first_name: e.target.value });
  }
  handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ last_name: e.target.value });
  }
  handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ phone: e.target.value });
    }
  updateUser = async (): Promise<void> => {
    const { first_name, last_name, phone } = this.state;
    const { email } = this.props;
    const newUserData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    };
    
    try {
      const response = await fetch(`http://localhost:3000/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newUserData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      this.setState({ isUpdate: true });
      const data = await response.json();
      console.log('Users:', data); // Utilisation des données reçues, par exemple
  
    } catch (e: any) {
      console.error("Error: ", e.message);
    }
  }
  
  signup = () => {
    return (
      <Box
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
        m={4}
      >
        <VStack align={"start"} width={"100%"} maxW="500px">
          <Text fontSize={"20px"} lineHeight={"24px"} fontWeight={600}>
            Dites-nous en plus sur vous !
          </Text>
          <Text fontSize={"12px"} lineHeight={"18px"} fontWeight={400} color={"#808080"}>
            Passons maintenant à vos informations personnelles.
          </Text>
          <Spacer marginTop={4} />
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <Input
              type="text"
              padding={"10px 16px"}
              placeholder="Michel"
              _placeholder={{ color: "#B3B3B3" }}
              fontSize={"12px"}
              borderRadius={"14px"}
              borderColor={"black"}
              onChange={this.handleLastname}
              pl={12}
              required
            />
            <FormHelperText textColor={"#B3B3B3"} fontSize={"12px"}>
              Votre nom complet
            </FormHelperText>
            <Spacer marginTop={6} />
            <FormLabel>Prénom</FormLabel>
            <Input
              type="text"
              padding={"10px 16px"}
              placeholder="Pierre"
              _placeholder={{ color: "#B3B3B3" }}
              fontSize={"12px"}
              borderRadius={"14px"}
              borderColor={"black"}
              onChange={this.handleFirstname}
              pl={12}
              required
            />
            <FormHelperText textColor={"#B3B3B3"} fontSize={"12px"}>
              Votre prénom complet
            </FormHelperText>
            <Spacer marginTop={6} />
            <FormLabel>Numéro de téléphone</FormLabel>
            <InputGroup alignSelf={"stretch"} mt={4}>
              <InputLeftElement pointerEvents="none">
                <Box color="#B3B3B3" fontWeight={"normal"} display={"flex"} alignItems={"center"} pl={6}>
                  <Text fontSize={12} m={2}>
                    FR
                  </Text>
                  <IoIosArrowDown size={14} />
                </Box>
                <Box height="70%" borderLeft="1px solid" borderColor="#B3B3B3" ml={2} />
              </InputLeftElement>
              <Input
                type="email"
                padding={"10px 16px"}
                placeholder="07 87 34 22 12"
                _placeholder={{ color: "#B3B3B3" }}
                fontSize={"12px"}
                borderRadius={"14px"}
                onChange={this.handlePhoneNumber}
                borderColor={"black"}
                pl={20}
                required
              />
            </InputGroup>
            <FormHelperText textColor={"#B3B3B3"} fontSize={"12px"}>
              Vous serez contacté via ce numéro.
            </FormHelperText>
            <Spacer marginTop={10} />
            <Container display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Button
                boxShadow={"sm"}
                sx={{
                  border: "1px solid",
                  borderRadius: "14px",
                  borderColor: "#F2F2F2",
                  fontSize: "12px",
                  lineHeight: "18px",
                  fontWeight: 500,
                  width: "93.3px",
                  height: "40px",
                }}
              >
                <Box mr={2}>
                  <RiArrowGoBackLine size={16} />
                </Box>
                Retour
              </Button>
              <Button
                boxShadow={"sm"}
                sx={{
                  border: "1px solid",
                  borderRadius: "14px",
                  borderColor: "#F2F2F2",
                  fontSize: "12px",
                  lineHeight: "18px",
                  fontWeight: 500,
                  width: "113.3px",
                  height: "40px",
                }}
                onClick={this.updateUser}
              >
                Continuer
              </Button>
            </Container>
          </FormControl>
        </VStack>
      </Box>
    );
  }
  render(): ReactNode {
    const { isUpdate } = this.state;
    return(
      <>
        {!isUpdate ? this.signup() : <Summary />}
      </>
    );
  }
} 

  export default Signup;
