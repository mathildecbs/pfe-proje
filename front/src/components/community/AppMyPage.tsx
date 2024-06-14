import { useEffect, useState } from "react";
import { Post } from "../../types/PostType";
import { useAuth } from "../../contexts/AuthProvider";
import AppPost from "./AppPost";
import postService from "../../services/PostService";
import ToastUtils from "../../utils/ToastUtils";
import { Typography } from "@mui/material";
import AppHeaderProfile from "./AppHeaderProfile";
import styles from "../../css/AppMyPage.module.css";
import { usePosts } from "../../contexts/PostsProvider";

export default function AppMyPage() {
  const { myFeed, setMyFeed } = usePosts();
  const { user } = useAuth();

  useEffect(() => {
    fetchFeed();
  }, []);

  async function fetchFeed() {
    try {
      if (user) {
        const response = await postService.getFeed(user.username);
        setMyFeed(response);
      }
    } catch (error) {
      ToastUtils.error(error, "Erreur lors de la récupération des posts");
    }
  }

  function getPostRepostStatus(posts: Post[]) {
    const occurrences = new Map<number, number>();
    const repostStatus = new Map<number, boolean>();

    posts.forEach((post) => {
      const count = (occurrences.get(post.id) || 0) + 1;
      occurrences.set(post.id, count);
      repostStatus.set(
        post.id,
        count > 1 || post.user.username !== user?.username
      );
    });

    return repostStatus;
  }

  const repostStatus = getPostRepostStatus(myFeed);

  return (
    <div className={styles.Container}>
      {user ? (
        <>
          <AppHeaderProfile userProfile={user} currentUser={user} />

          {myFeed.length ? (
            <div className={styles.ContainerPosts}>
              {myFeed.map((myPost, index) => (
                <AppPost
                  key={`${myPost.id}${
                    !!repostStatus.get(myPost.id) &&
                    index === myFeed.findIndex((post) => post.id === myPost.id)
                  }}`}
                  post={myPost}
                  repost={
                    !!repostStatus.get(myPost.id) &&
                    index === myFeed.findIndex((post) => post.id === myPost.id)
                  }
                />
              ))}
            </div>
          ) : (
            <Typography variant="h6">
              Commencez à liker, reposter et écrire des posts !
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h6">Chargement du profil...</Typography>
      )}
    </div>
  );
}
