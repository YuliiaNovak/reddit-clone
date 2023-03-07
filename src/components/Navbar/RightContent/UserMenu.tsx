import { ChevronDownIcon } from "@chakra-ui/icons";
import {
   Menu,
   MenuButton,
   Button,
   MenuList,
   MenuItem,
   Flex,
   Icon,
   Text,
   MenuDivider,
} from "@chakra-ui/react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoSparkles } from "react-icons/io5";
import { signOut, User } from "firebase/auth";
import { MdOutlineLogin } from "react-icons/md";
import React from "react";
import { auth } from "@/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";

type UserMenuProps = {
   user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
   const resetCommunityState = useResetRecoilState(communityState);
   const setAuthModalState = useSetRecoilState(AuthModalState);

   const logout = async () => {
      await signOut(auth);
      resetCommunityState();
   };

   return (
      <Menu>
         <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius={4}
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
         >
            <Flex align="center">
               <Flex align="center">
                  {user ? (
                     <>
                        <Icon
                           fontSize={24}
                           mr={1}
                           color="gray.300"
                           as={FaRedditSquare}
                        />
                        <Flex
                           display={{ base: "none", lg: "flex" }}
                           flexDirection="column"
                           fontSize="8pt"
                           alignItems="flex-start"
                           mr={8}
                        >
                           <Text fontWeight={700}>
                              {user?.displayName || user?.email?.split("@")[0]}
                           </Text>
                           <Flex alignItems="center">
                              <Icon as={IoSparkles} color="brand.100" mr={1} />
                              <Text color="gray.400">1 karma</Text>
                           </Flex>
                        </Flex>
                     </>
                  ) : (
                     <Icon
                        fontSize={24}
                        color="gray.400"
                        mr={1}
                        as={VscAccount}
                     />
                  )}
               </Flex>
               <ChevronDownIcon />
            </Flex>
         </MenuButton>
         <MenuList>
            {user ? (
               <>
                  <MenuItem
                     fontSize="10pt"
                     fontWeight={700}
                     _hover={{ bg: "blue.500", textColor: "white" }}
                  >
                     <Flex align="center">
                        <Icon fontSize={20} mr={2} as={CgProfile} />
                        Profile
                     </Flex>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                     fontSize="10pt"
                     fontWeight={700}
                     _hover={{ bg: "blue.500", textColor: "white" }}
                     onClick={logout}
                  >
                     <Flex align="center">
                        <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                        Logout
                     </Flex>
                  </MenuItem>
               </>
            ) : (
               <>
                  <MenuItem
                     fontSize="10pt"
                     fontWeight={700}
                     _hover={{ bg: "blue.500", textColor: "white" }}
                     onClick={() =>
                        setAuthModalState({ open: true, view: "login" })
                     }
                  >
                     <Flex align="center">
                        <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                        Log In / Sign Up
                     </Flex>
                  </MenuItem>
               </>
            )}
         </MenuList>
      </Menu>
   );
};
export default UserMenu;
