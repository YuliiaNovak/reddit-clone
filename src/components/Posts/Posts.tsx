import { Community } from "@/atoms/communitiesAtom";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/atoms/postsAtom";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";

type PostsProps = {
   communityData: Community;
   userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
   const [user] = useAuthState(auth);
   const [loading, setLoading] = useState(false);
   const {
      postStateValue,
      setPostStateValue,
      onVote,
      onSelectPost,
      onDeletePost,
   } = usePosts();

   const getPosts = async () => {
      try {
         const postsQuery = query(
            collection(firestore, "posts"),
            where("communityId", "==", communityData.id),
            orderBy("createdAt", "desc")
         );
         const postDocs = await getDocs(postsQuery);

         const posts = postDocs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setPostStateValue((prev) => ({
            ...prev,
            posts: posts as Post[],
         }));
      } catch (error: any) {
         console.log("getPosts error", error.message);
      }
   };

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <>
         {postStateValue.posts.map((post) => (
            <PostItem
               key={post.id}
               post={post}
               userIsCreator={user?.uid === post.creatorId}
               userVoteValue={undefined}
               onVote={onVote}
               onSelectPost={onSelectPost}
               onDeletePost={onDeletePost}
            />
         ))}
      </>
   );
};
export default Posts;
