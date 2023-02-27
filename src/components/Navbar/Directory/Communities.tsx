import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
   const [open, setOpen] = useState(false);

   return (
      <Fragment>
         <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
         <MenuItem
            width="100%"
            fontSize="10pt"
            _hover={{ bg: "gray.100" }}
            onClick={() => setOpen(true)}
         >
            <Flex align="center">
               <Icon mr={2} fontSize={20} as={GrAdd} />
               Create Community
            </Flex>
         </MenuItem>
      </Fragment>
   );
};
export default Communities;
