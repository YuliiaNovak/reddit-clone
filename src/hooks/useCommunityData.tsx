import { AuthModalState } from "@/atoms/authModalAtom";
import {
   Community,
   CommunitySnippet,
   communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
   collection,
   doc,
   getDocs,
   increment,
   writeBatch,
} from "firebase/firestore";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
   const [user] = useAuthState(auth);
   const [communityStateValue, setCommunityStateValue] =
      useRecoilState(communityState);
   const setAuthModalState = useSetRecoilState(AuthModalState);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const onJoinOrLeaveCommunity = (
      communityData: Community,
      isJoined: boolean
   ) => {
      if (!user) {
         setAuthModalState({ open: true, view: "login" });
         return;
      }

      if (isJoined) {
         leaveCommunity(communityData.id);
         return;
      }

      joinCommunity(communityData);
   };

   const getMySnippets = useCallback(async () => {
      setLoading(true);
      try {
         const snippetDocs = await getDocs(
            collection(firestore, `users/${user?.uid}/communitySnippets`)
         );

         const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
         setCommunityStateValue((prev) => ({
            ...prev,
            mySnippets: snippets as CommunitySnippet[],
         }));
      } catch (error: any) {
         console.log("getMySnippets error", error);
         setError(error.message);
      }
      setLoading(false);
   }, [setCommunityStateValue, user?.uid]);

   const joinCommunity = async (communityData: Community) => {
      try {
         const batch = writeBatch(firestore);
         const newSnippet: CommunitySnippet = {
            communityId: communityData.id,
            image: communityData.image || "",
         };

         batch.set(
            doc(
               firestore,
               `users/${user?.uid}/communitySnippets`,
               communityData.id
            ),
            newSnippet
         );

         batch.update(doc(firestore, "communities", communityData.id), {
            numberOfMembers: increment(1),
         });

         await batch.commit();

         setCommunityStateValue((prev) => ({
            ...prev,
            mySnippets: [...prev.mySnippets, newSnippet],
         }));
      } catch (error: any) {
         console.log("joinCommunity error", error);
         setError(error.message);
      }
      setLoading(false);
   };

   const leaveCommunity = async (communityId: string) => {
      try {
         const batch = writeBatch(firestore);
         batch.delete(
            doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
         );
         batch.update(doc(firestore, "communities", communityId), {
            numberOfMembers: increment(-1),
         });
         await batch.commit();
         setCommunityStateValue((prev) => ({
            ...prev,
            mySnippets: prev.mySnippets.filter(
               (item) => item.communityId !== communityId
            ),
         }));
      } catch (error: any) {
         console.log("joinCommunity error", error);
         setError(error.message);
      }
      setLoading(false);
   };

   useEffect(() => {
      if (!user) return;
      getMySnippets();
   }, [user, getMySnippets]);

   return {
      communityStateValue,
      onJoinOrLeaveCommunity,
      loading,
   };
};
export default useCommunityData;
