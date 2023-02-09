import { AuthModalState } from "@/atoms/authModalAtom";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const SignUp: React.FC = () => {
   const setAuthModalState = useSetRecoilState(AuthModalState);
   const [signUpForm, setSignUpForm] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [error, setError] = useState("");
   const [createUserWithEmailAndPassword, user, loading, userError] =
      useCreateUserWithEmailAndPassword(auth);

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (error) setError("");
      if (!signUpForm.email.includes("@")) {
         return setError("Please enter a valid email");
      }
      if (signUpForm.password.length < 6) {
         return setError("Password must be at least 6 characters long");
      }
      if (signUpForm.password !== signUpForm.confirmPassword) {
         return setError("Passwords do not match");
      }

      createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
   };

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
         {error && (
            <Text textAlign="center" color="red" fontSize="10pt">
               {error}
            </Text>
         )}
         <Button
            type="submit"
            width="100%"
            height="36px"
            mt={2}
            mb={2}
            isLoading={loading}
         >
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
