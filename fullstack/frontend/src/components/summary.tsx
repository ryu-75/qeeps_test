import { Component, ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Circle,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

class Summary extends Component {
    render(): ReactNode {
        return (
            <Box
              position={"relative"}
              display={"flex"}
              justifyContent={"center"}
              m={4}
            >
              <VStack align={"start"} width={"100%"} maxW="500px">
                <Text fontSize={"20px"} lineHeight={"24px"} fontWeight={600}>
                  Bonjour Pierre,
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
                          Pierre Durant
                          </Text>
                          <Button
                            sx={{
                              borderRadius: "8px",
                              height: "40px",
                              border: "1px solid #F2F2F2",
                              background: "white"
                            }}
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
                              AGENT
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
                              06 73 78 44 65
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
                              pa.durip@gmail.com
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