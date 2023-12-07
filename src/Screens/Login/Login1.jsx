import React from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import Background from "../../Assets/İmages/Background.png";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Grid
      templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]} 
      w="100vw"
      h="100vh"
      bgColor="#14162E"
      color="#fff"
    >
      
      <Box
        bgImage={`url(${Background})`}
        backgroundSize="cover"
        backgroundPosition="center"
      ></Box>

      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        p="0px 40px"
      >
        
        <Box>
          <LoginForm />
        </Box>
      </Flex>
    </Grid>
  );
};

export default Login;