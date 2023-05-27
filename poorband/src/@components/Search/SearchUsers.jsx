import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { searchUser } from "../../../api/searchAPI";
import UserCard from "../common/UserCard";

export default function SearchUsers(props) {
  const { searchWord } = props;
  const [searchUserResult, setSearchUserResult] = useState([]);
  const [isError, setIsError] = useState(false);

  const { mutate: searchUserMutation, isLoading } = useMutation(searchUser, {
    onSuccess: (response) => {
      console.log(response);
      setSearchUserResult(response); // API에서 받은 사용자 검색 결과를 상태로 설정
      setIsError(false);
    },
    onError: (error) => {
      console.log(error);

      if (error.message === "Request failed with status code 500") {
        setIsError(true);
        setSearchUserResult([]);
      }
    }
  });

  useEffect(() => {
    const searchText = {
      inputText: searchWord
    };

    searchUserMutation(searchText);
  }, [searchUserMutation, searchWord]);

  return (
    <>
      {/* 로딩 중인 경우 로딩 표시 */}
      { isLoading && 
        <div>Loading...</div> }

      {/* 사용자 검색 결과 쭉 불러오기 */}
      { searchUserResult.map((resultUser) => (
        <UserCard 
          key={ resultUser.userSeq }
          userId={ resultUser.userId }
          nickname={ resultUser.nickname }
          userTier={ resultUser.userTier }
          introduction={ resultUser.introduction }
          profileImgUrl={ resultUser.profileImgUrl }
          status={ resultUser.status }
        />
      )) }

      {/* 500 에러가 발생한 경우 에러 메시지 표시 */}
      { isError && 
        <div>Error: Failed to search users.</div> }
    </>
  );
}
