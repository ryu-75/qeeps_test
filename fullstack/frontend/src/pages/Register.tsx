import { AbsoluteCenter, Box, Button, Center, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Component, ReactNode } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

/* 
  Wrapper qui récupère le type de registre depuis les paramètres d'URL 
  et rend le composant correspondant.
*/
const RegisterWrapper = () => {
  const { type } = useParams<{type: string}>();
  const navigate = useNavigate();
  return <Register type={type!} navigate={navigate} />;
};

/* 
  - Gère la sélection du type d'utilisateur ('agent' | 'candidat').
  - Affiche le contenu correspondant en fonction du type sélectionné.
  - Permet la navigation vers EmailRegister.tsx une fois le bouton cliqué.
*/
interface RegisterProps {
    navigate: NavigateFunction;
    type: string;
}

class Register extends Component<RegisterProps> {
  /* Redirige vers EmailRegister.tsx */
  handleButtonClick = (): void => {
      const { navigate, type } = this.props;
      navigate(`/register/${type}/email`);
  };

  /* Retourne le composant correspondant au type de client */
  isAgentOrCandidat(): ReactNode {
    const { type } = this.props;

    if (type === 'agent') {
      return (
        <AbsoluteCenter position={'absolute'} width={'100vw'} height={'0'} >
          <Center>
            <Image zIndex={1} src={'/logo.png'} width={"104.05px"} height={"31px"} />
          </Center>
          <Center marginTop={'20px'}>
            <Text
              textAlign={"center"}
              sx={{
                display: 'flex',
                fontWeight: 700,
                fontSize: '40px',
                lineHeight: '42px',
                fontStyle: 'normal',
                alignItems: 'center',
              }}
            >Simplifiez votre gestion locatif</Text>
          </Center>
        </AbsoluteCenter>
      );
    } else {
      return (
        <AbsoluteCenter position={'absolute'} width={'100vw'} height={'0'} >
          <Center>
            <Image zIndex={1} src={'/logo.png'} width={"104.05px"} height={"31px"} />
          </Center>
          <Center marginTop={'20px'}>
            <Text
              textAlign={"center"}
              sx={{
                display: 'flex',
                fontWeight: 700,
                fontSize: '40px',
                lineHeight: '42px',
                fontStyle: 'normal',
                alignItems: 'center',
              }}
            >Trouvez votre<br /> chez-vous</Text>
          </Center>
        </AbsoluteCenter>
      );
    }
  }

  render(): ReactNode {
    return (
      <Grid
        templateAreas={`"main main"
                        "main main"
                        "footer footer"`}
        gridTemplateRows={'200px 1fr 100px'}
        gridTemplateColumns={'150px 1fr'}
        h='100vh'
        gap='1'
        color='#164951'
        fontFamily='"Poppins", sans-serif'
        backgroundImage={'/image.png'}
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
            background: 'linear-gradient(rgba(255, 255, 255, 0.6) 0.9%, rgba(255, 255, 255, 1) 58%)'
          }}
        />
        <GridItem area={'main'}>
          {this.isAgentOrCandidat()}
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
                onClick={this.handleButtonClick}
              >
                Connexion rapide
              </Button>
            </Center>
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default RegisterWrapper;
