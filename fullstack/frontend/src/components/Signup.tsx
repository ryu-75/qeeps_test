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
import Summary from "./Summary";
import axios from "axios";

/* 
  - first_name: Prénom saisi par l'utilisateur.
  - last_name: Nom saisi par l'utilisateur.
  - phone: Numéro de téléphone saisi par l'utilisateur.
  - isUpdate: Indique si les informations ont été correctement mises à jour.
  - errorMsg: Message d'erreur à afficher en cas de problème.
*/
interface SignupState {
  first_name: string;
  last_name: string;
  phone: string;
  isUpdate: boolean;
  errorMsg: string;
}

/* 
  - email: Email du client récupéré à partir d'un autre composant.
  - id: ID du client récupéré à partir d'un autre composant.
  - onBack: Fonction appelée lorsque le client souhaite revenir à l'étape précédente.
*/
interface SignupProps {
  email: string;
  id: string;
  onBack: () => void;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      isUpdate: false,
      errorMsg: "",
    };
  }


  // Affiche un message d'erreur lorsque les champs obligatoires ne sont pas remplis.
  handleErrorMsg = () => {
    this.setState({ errorMsg: "Veuillez remplir le champ." });
  }

  // Met à jour l'état avec le prénom saisi par le client.
  handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ first_name: e.target.value });
  }
  
  // Met à jour l'état avec le nom de famille saisi par le client.
  handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ last_name: e.target.value });
  }

  // Met à jour l'état avec le numéro de téléphone saisi par le client
  handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phone: e.target.value });
  }

  // Met à jour les données du client sur le serveur si les données saisies sont correctes.
  updateUser = async (): Promise<void> => {
    const { first_name, last_name, phone } = this.state;
    const { email, id } = this.props;

    // Vérfie bien que tous les champs ont étaient remplis et sont valides
    if (first_name == "" || last_name == "" || phone == "" || email == "" || phone.length < 10) {
      this.setState({ isUpdate: false });
      this.handleErrorMsg();
      throw new Error('All fields is required');
    }

    this.setState({ isUpdate: true });

    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
      }, { headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch users');
      }
      
      this.setState({ isUpdate: true });
    } catch (e: unknown) {
      if (e instanceof Error) console.error("Error: ", e.message);
    }
  }
  
  /* Est appelé dans Summary.tsx si le client souhaite apporter des modifications */
  backtoUpdate = () => {
    this.setState({ isUpdate: false });
    this.setState({ first_name: ""});
    this.setState({ last_name: ""});
    this.setState({ phone: ""});
  }

  /* Génère le contenu de signup */
  signup = (first: string, last: string, phone: string, error: string) => {
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
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <FormHelperText textColor={"#B3B3B3"} fontSize={"12px"}>
                Votre nom complet
              </FormHelperText>
              {!last && (
                <Text textColor={"red"} fontSize={"12px"} mt={2}>{ error }</Text>
              )}
            </Box>
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
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <FormHelperText textColor={"#B3B3B3"} fontSize={"12px"}>
                Votre prénom complet
              </FormHelperText>
              {!first && (
                <Text textColor={"red"} fontSize={"12px"} mt={2}>{ error }</Text>
              )}
            </Box>
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
                type="tel"
                padding={"10px 16px"}
                placeholder="07 87 34 22 12"
                _placeholder={{ color: "#B3B3B3" }}
                fontSize={"12px"}
                borderRadius={"14px"}
                onChange={this.handlePhoneNumber}
                borderColor={"black"}
                pl={20}
                maxLength={10}
                minLength={10}
                required
              />
            </InputGroup>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <FormHelperText textColor={"#B3B3B3"} fontSize={"12px"}>
                Vous serez contacté via ce numéro.
              </FormHelperText>
              {!phone && (
                <Text textColor={"red"} fontSize={"12px"} mt={2}>{ error }</Text>
              )}
            </Box>
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
                onClick={this.props.onBack}
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
    const { isUpdate, first_name, last_name, phone, errorMsg } = this.state;

    return(
      <>
        {!isUpdate ? this.signup(first_name, last_name, phone, errorMsg) : <Summary backToUpdate={this.backtoUpdate} />}
      </>
    );
  }
} 

  export default Signup;
