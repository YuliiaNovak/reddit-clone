import { AuthModalState } from "@/atoms/AuthModalAtom";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const SignUp: React.FC = () => {
   const setAuthModalState = useSetRecoilState(AuthModalState);
   const [signUpForm, setSignUpForm] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });

   const onSubmit = () => {};

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpForm((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   return (
      <form onSubmit={onSubmit}>
         <Input
            required
            name="email"
            placeholder="Email"
            type="email"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
               bg: "white",
               border: "1px solid blue.500",
            }}
            _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid blue.500",
            }}
            bg="grey.500"
         />
         <Input
            required
            name="password"
            placeholder="Password"
            type="password"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
               bg: "white",
               border: "1px solid blue.500",
            }}
            _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid blue.500",
            }}
            bg="grey.500"
         />
         <Input
            required
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
               bg: "white",
               border: "1px solid blue.500",
            }}
            _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid blue.500",
            }}
            bg="grey.500"
         />
         <Button type="submit" width="100%" height="36px" mt={2} mb={2}>
            Sign Up
         </Button>
         <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>Already a redditor?</Text>
            <Text
               color="blue.500"
               fontWeight={700}
               cursor="pointer"
               onClick={() => {
                  setAuthModalState((prev) => ({
                     ...prev,
                     view: "login",
                  }));
               }}
            >
               LOG IN
            </Text>
         </Flex>
      </form>
   );
};
export default SignUp;
