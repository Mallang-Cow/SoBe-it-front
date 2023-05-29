import React, { useEffect, useState } from "react";
import { getArticleDetailData } from "../../../api/getArticleDetailData";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useMutation, useQuery } from "react-query";
import { articeWrite } from "../../../api/articleWriteApi";
import { updataeArticle } from "../../../api/editArticle";

export default function ArticleEditForm(props) {
  const { setCenterContent, articleSeq, setArticleSeq } = props;
  const [articleType, setArticleType] = useState();
  const [category, setCategory] = useState(0);
  const [imageUrl, setImageUrl] = useState();
  const [isConsumeWrite, setIsConsumeWrite] = useState();
  const [consumeText, setconsumeText] = useState("");
  const [consumeDate, setconsumeDate] = useState();
  const [financialText, setfinancialText] = useState("");
  const [status, setStatus] = useState(1); // 공개여부
  const [amount, setAmount] = useState("");
  const [init, setInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState();

  // const [newData, setNewData] = {
  //   articleSeq: articleSeq,
  //   status: status,
  //   imageUrl: imageUrl,
  //   expenditureCategory: category,
  //   amount: Number(amount),
  //   financialText: financialText,
  //   articleText: consumeText,
  //   articleType: articleType,
  //   consumptionDate: consumeDate,
  //   isAllowed: "false",
  // };

  // 글 정보 가져와기
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery(["articleDetail", articleSeq], () => getArticleDetailData(articleSeq), {
    onSuccess: (response) => {
      // 처음 로딩 시 초기값 설정
      if (!init) {
        setCategory(response?.expenditureCategory);
        setImageUrl(response?.imageUrl);
        setconsumeText(response?.articleText);
        setconsumeDate(new Date(response?.consumptionDate));
        setfinancialText(response?.financialText);
        setStatus(response?.status);
        setArticleType(response?.articleType);
        setAmount(response?.amount);
        setInit(true);
      }
    },
    onError: () => {
      console.log("Error");
    },
  });

  // 뒤로 가기
  function goToBackPage() {
    setArticleSeq(articleSeq);
    setCenterContent("detail");
  }

  /**
   * @param {*} event
   * 소비 날짜 셋팅
   */
  const handleDateInput = (date) => {
    setconsumeDate(date);
  };

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  /**
   * 글 작성
   * @param {*} event
   */
  const handleCousumeInput = (event) => {
    setconsumeText(event.target.value);
  };

  /**
   * 가계부 메모
   * @param {*} event
   */
  const handleFinancialInput = (event) => {
    setfinancialText(event.target.value);
  };

  /**
   * 사진업로드
   * @param {*} event
   */
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    // 이제 file을 서버로 전송하거나 필요한 작업을 수행할 수 있습니다.
  };

  /**
   * 카테고리
   * @param {*} event
   */
  const handleCategoryChange = (event) => {
    setCategory(Number(event.target.value));
  };

  /**
   * 금액
   * @param {*} e
   */
  const handleAmountChange = (event) => {
    const value = event.target.value;
    const formattedValue = value.replace(/[^0-9]/g, ""); // 숫자만 허용
    setAmount(formattedValue);
  };

  /**
   * 금액 입력할때 쉼표 붙여주
   */
  const formatWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  /**
   * 공개여부
   * @param {*} event
   */
  const handleStatusChage = (event) => {
    setStatus(event.target.value);
  };

  /**
   * 입력 폼 제출
   */
  function submitNewData() {
    if (isConsumeWrite === 1) {
      if (consumeText === "") {
        alert("글을 입력해주세요.");
        return;
      }

      if (category === "") {
        alert("카테고리를 선택해주세요.");
        return;
      }

      if (amount === "") {
        alert("금액을 입력해주세요.");
        return;
      }

      if (status === "") {
        alert("공개여부를 선택해주세요.");
        return;
      }

      const newData = {
        articleDTO: {
          articleSeq: articleSeq,
          status: status,
          expenditureCategory: category,
          amount: Number(amount),
          financialText: financialText,
          articleText: consumeText,
          articleType: isConsumeWrite,
          consumptionDate: formatDate(consumeDate),
          isAllowed: "false",
        },
      };

      const formData = new FormData();
      const json = JSON.stringify(newData.articleDTO);
      const blob = new Blob([json], { type: "application/json" });

      formData.append("file", file);
      formData.append("articleDTO", blob);

      editArticle(formData);
    } else {
      if (consumeText === "") {
        alert("글을 입력해주세요.");
        return;
      }

      if (amount === "") {
        alert("금액을 입력해주세요.");
        return;
      }

      const newData = {
        articleDTO: {
          articleSeq: articleSeq,
          status: status,
          expenditureCategory: category,
          amount: Number(amount),
          financialText: financialText,
          articleText: consumeText,
          articleType: isConsumeWrite,
          consumptionDate: formatDate(consumeDate),
          isAllowed: "false",
        },
      };
      console.log(newData);
      const formData = new FormData();
      const json = JSON.stringify(newData.articleDTO);
      const blob = new Blob([json], { type: "application/json" });
      console.log(json);
      formData.append("file", file);
      formData.append("articleDTO", blob);

      editArticle(formData);
    }
  }

  const { mutate: editArticle } = useMutation(updataeArticle, {
    onSuccess: (response) => {
      setIsSuccess(true);
    },
    onError: () => {
      console.log("update error");
    },
  });

  // 수정 성공 시 화면 전환
  useEffect(() => {
    if (isSuccess) {
      setArticleSeq(articleSeq);
      setCenterContent("detail");
    }
  }, [isSuccess]);

  return (
    <>
      <HeaderContainer>
        <span
          className="material-symbols-rounded"
          onClick={() => {
            goToBackPage();
          }}>
          arrow_back
        </span>
        {articleType === 1 ? <header>지출 내역 수정</header> : <header>결재 내역 수정</header>}
      </HeaderContainer>

      <EditFormWrapper>
        {articleType === 1 && (
          <TopWrapper>
            <StyledSelect1 value={category} onChange={handleCategoryChange}>
              <option value="1">식비</option>
              <option value="2">패션/미용</option>
              <option value="3">생활용품</option>
              <option value="4">교육</option>
              <option value="5">취미생활</option>
              <option value="6">기타</option>
            </StyledSelect1>
            <DataPickerWrapper>
              <DatePicker
                selected={consumeDate}
                onChange={handleDateInput}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                wrapperClassName="w-full"
              />
            </DataPickerWrapper>
          </TopWrapper>
        )}

        <InputText
          name="consumeInput"
          value={consumeText}
          placeholder="글을 작성하세요."
          onChange={handleCousumeInput}
        />

        {imageUrl && !file && (
          <ImageContainer>
            <img src={imageUrl} alt="이미지"></img>
          </ImageContainer>
        )}

        {file && (
          <ImageContainer>
            <img src={URL.createObjectURL(file)} alt="File Preview" />
          </ImageContainer>
        )}

        <BottomWrapper>
          <LeftWrapper>
            <FinancialText
              type="text"
              value={financialText}
              name="financialInput"
              placeholder="가계부 메모를 작성하세요."
              onChange={handleFinancialInput}
            />
          </LeftWrapper>

          <AmountInput
            type="text"
            placeholder="금액 입력"
            value={formatWithCommas(amount)}
            onChange={handleAmountChange}
          />
        </BottomWrapper>

        <ButtonWrapper>
          <FileInputContainer>
            {file && <img src={URL.createObjectURL(file)} alt="File Preview" />}
            {file ? file.name : "Choose File"}
            <input type="file" name="file" accept="image/*" onChange={handleFileUpload} />
          </FileInputContainer>
          <SubmitAndPrivacySet>
            <StyledSelect2 value={status} onChange={handleStatusChage}>
              <option value="1">전체공개</option>
              <option value="2">맞팔공개</option>
              <option value="3">비공개</option>
            </StyledSelect2>
            <SubmitButton className="submit" onClick={submitNewData}>
              수정하기
            </SubmitButton>
          </SubmitAndPrivacySet>
        </ButtonWrapper>
      </EditFormWrapper>
    </>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 4rem 3rem 2rem;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};

  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.4rem;

  span {
    font-size: 3rem;
    margin-right: 1rem;
    cursor: pointer;
  }
`;
const EditFormWrapper = styled.section`
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  :focus,
  :focus-visible,
  :hover {
    outline: none;
  }
  .react-datepicker-wrapper {
    width: 10rem;
    text-align: center;
    margin-left: 40.1rem;
    margin-right: 4rem;
  }
  .react-datepicker__input-container input {
    width: 10rem;
    height: 100%;
    border-radius: 0.3rem;
    border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};

    text-align: center;
    color: #707070;
    cursor: pointer;
  }
`;

const DataPickerWrapper = styled.section`
  display: flex;
  height: 3rem;

  .react-datepicker-popper {
    //transform: translate3d(995px, 137.5px, 0px) !important;
  }
`;

// 카테고리 셀렉트
const StyledSelect1 = styled.select`
  font-size: 1.4rem;
  ${({ theme }) => theme.fonts.medium};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  appearance: none;

  border-radius: 3rem;
  height: 3rem;
  width: 8rem;

  cursor: pointer;
`;

const TopWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1.5rem;

  .react-datepicker-wrapper {
    margin: 0;
    width: fit-content;
    height: 100%;
    text-align: center;
  }
  .react-datepicker__input-container {
    margin-left: 5rem;
    width: fit-content;
    display: flex;
    height: 100%;
    justify-content: end;
  }
  .react-datepicker-ignore-onclickoutside {
    width: fit-content;
  }
  .react-datepicker__input-container input {
    text-align: center;
    padding: 1rem 0;
    width: fit-content;
    ${({ theme }) => theme.fonts.medium};
    font-size: 1.2rem;
  }
`;

const InputText = styled.textarea`
  width: 100%;
  height: 8rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  text-align: left;
  border-radius: 0.5rem;
  ${({ theme }) => theme.fonts.regular};
  resize: none;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  img {
    width: 30rem;
    height: 30rem;
    border-radius: 1rem;
  }
`;

const BottomWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0 1.5rem 0;
  width: 100%;
  .imgInput {
    width: 7rem;
  }
`;

const FileInputContainer = styled.label`
  display: inline-flex;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.2rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.mainpurple};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 오버플로우 처리 */
  max-width: 20rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
    color: ${({ theme }) => theme.colors.white};
  }

  input[type="file"] {
    position: absolute;
    top: -100px;
  }

  img {
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 8px;
    flex-shrink: 0;
  }

  text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    max-width: 150px; /* 버튼의 최대 너비 설정 */
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FinancialText = styled.input`
  width: 18rem;
  height: 3rem;
  padding: 0 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-radius: 0.4rem;
  text-align: left;
  font-size: 1.4rem;
`;

const AmountInput = styled.input`
  width: 12rem;
  height: 3rem;
  padding: 0 0.8rem;
  margin-left: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-radius: 0.4rem;
  text-align: center;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.mainpurple};
`;

const SubmitAndPrivacySet = styled.section`
  display: flex;
  justify-content: end;
  :focus {
    outline: none;
  }
  .submit:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }
`;

// 공개여부 셀렉트
const StyledSelect2 = styled.select`
  option {
    color: #845ec2;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  border: 1px solid ${({ theme }) => theme.colors.mainpurple};
  background-color: white;
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.mainpurple};
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;

  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  margin-left: 1.5rem;
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
