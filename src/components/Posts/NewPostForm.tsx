import { Alert, AlertDescription, AlertIcon, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import uuid from "react-uuid";
import {
   addDoc,
   collection,
   serverTimestamp,
   Timestamp,
   updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostFormProps = {
   user: User;
};

const formTabs = [
   {
      title: "Post",
      icon: IoDocumentText,
   },
   {
      title: "Images & Video",
      icon: IoImageOutline,
   },
   {
      title: "Link",
      icon: BsLink45Deg,
   },
   {
      title: "Poll",
      icon: BiPoll,
   },
   {
      title: "Talk",
      icon: BsMic,
   },
];

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
   const defaultInputState = {
      title: "",
      postBody: "",
   };

   const router = useRouter();
   const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
   const [textInputs, setTextInputs] = useState(defaultInputState);
   const [selectedFile, setSelectedFile] = useState<string>();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const handleCreatePost = async () => {
      const { communityId } = router.query;
      console.log("communityId from newpostform", communityId);
      const newPost: Post = {
         id: uuid(),
         communityId: communityId as string,
         creatorId: user.uid,
         creatorDisplayName: user.email!.split("@")[0],
         title: textInputs.title,
         postBody: textInputs.postBody,
         numberOfComments: 0,
         voteStatus: 0,
         createdAt: serverTimestamp() as Timestamp,
      };

      setLoading(true);
      try {
         const postDocRef = await addDoc(
            collection(firestore, "posts"),
            newPost
         );

         if (selectedFile) {
            const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(postDocRef, {
               image: downloadURL,
            });
         }
         setTextInputs(defaultInputState);
         setSelectedFile("");
      } catch (error: any) {
         console.log("handleCreatePost error", error);
         setError(true);
      }
      setLoading(false);
      // router.back();
   };

   const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();

      if (e.target.files?.[0]) {
         reader.readAsDataURL(e.target.files[0]);
      }

      reader.onload = (readerEvent) => {
         if (readerEvent.target?.result) {
            setSelectedFile(readerEvent.target.result as string);
         }
      };
   };

   const onTextChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const {
         target: { name, value },
      } = e;
      setTextInputs((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   return (
      <Flex direction="column" bg="white" borderRadius={4} mt={2}>
         <Flex width="100%">
            {formTabs.map((item) => (
               <TabItem
                  key={item.title}
                  item={item}
                  selected={item.title === selectedTab}
                  setSelectedTab={setSelectedTab}
               />
            ))}
         </Flex>
         <Flex p={4}>
            {selectedTab === "Post" && (
               <TextInputs
                  textInputs={textInputs}
                  handleCreatePost={handleCreatePost}
                  onChange={onTextChange}
                  loading={loading}
               />
            )}
            {selectedTab === "Images & Video" && (
               <ImageUpload
                  onSelectImage={onSelectImage}
                  selectedFile={selectedFile}
                  setSelectedTab={setSelectedTab}
                  setSelectedFile={setSelectedFile}
               />
            )}
         </Flex>
         {error && (
            <Alert status="error">
               <AlertIcon />
               <AlertDescription>Error creating post!</AlertDescription>
            </Alert>
         )}
      </Flex>
   );
};
export default NewPostForm;
