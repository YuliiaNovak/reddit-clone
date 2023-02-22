import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle, useSignInWithFacebook } from "react-firebase-hooks/auth";
import {auth} from '../../../firebase/clientApp'

const OAuthButtons: React.FC = () => {
   const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth)
   const [signInWithFacebook, fbUser, fbLoading, fbError] = useSignInWithFacebook(auth)
   return (
      <Flex direction="column" width="100%" mb={4}>
         <Button variant="oauth" mb={2} isLoading={googleLoading} onClick={() => signInWithGoogle()}>
            <Image
               src="./images/googlelogo.png"
               alt="Google logo"
               height="20px"
               mr={4}
            />
            Continue with Google
         </Button>
         {googleError && <Text>{googleError.message}</Text>}
         <Button variant="oauth" mb={2} isLoading={fbLoading} onClick={() => signInWithFacebook()}>
            <Image
               src="./images/facebooklogo.png"
               alt="Google logo"
               height="20px"
               mr={4}
            />
            Continue with Facebook
         </Button>
         {fbError && <Text>{fbError.message}</Text>}
      </Flex>
   );
};
export default OAuthButtons;
