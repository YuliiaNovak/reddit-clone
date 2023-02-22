import { AuthModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
   const setAuthModalState = useSetRecoilState(AuthModalState);
   const [loginForm, setLoginForm] = useState({
      email: "",
      password: "",
   });
   const [ signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      signInWithEmailAndPassword(loginForm.email, loginForm.password)
   };

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm((prev) => ({
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
         <Text textAlign='center' color='red' fontSize='10pt'>
            {error && FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
         </Text>
         <Button type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
            Log In
         </Button>
         <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>New here?</Text>
            <Text
               color="blue.500"
               fontWeight={700}
               cursor="pointer"
               onClick={() => {
                  setAuthModalState((prev) => ({
                     ...prev,
                     view: "signup",
                  }));
               }}
            >
               SIGN UP
            </Text>
         </Flex>
      </form>
   );
};
export default Login;
