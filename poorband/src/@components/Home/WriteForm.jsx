import React, { useRef, useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useMutation } from "react-query";
import { articeWrite } from "../../../api/articleWriteApi";
import { useRecoilState } from "recoil";
import { nowUserState } from "../../recoil/nowUserInfo";

export default function WriteForm(props) {
  const { setReloadFeed } = props;
  const [isConsumeWrite, setIsConsumeWrite] = useState(1);
  const [isclicked, setisclicked] = useState(true);

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [consumeText, setconsumeText] = useState("");
  const [consumeDate, setconsumeDate] = useState(new Date());
  const [financialText, setfinancialText] = useState("");
  const [status, setStatus] = useState("1"); // 공개여부
  const [amount, setAmount] = useState("");

  const [nowUser] = useRecoilState(nowUserState);

  /**
   * 지출입력 or 결재받기 버튼선택
   * @param {*} type
   */
  const handleClick = (type) => {
    // 입력값 초기화 해야함.
    setIsConsumeWrite(type);
  };

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
    const file = event.target.files[0];
    setFile(file);
    console.log(file);
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

      writeArticle(formData);
    } else {
      const newData = {
        articleDTO: {
          status: status,
          expenditureCategory: category,
          amount: Number(amount),
          financialText: financialText,
          articleText: consumeText,
          articleType: isConsumeWrite,
          isAllowed: "false",
        },
      };

      if (consumeText === "") {
        alert("글을 입력해주세요.");
        return;
      }

      if (amount === "") {
        alert("금액을 입력해주세요.");
        return;
      }

      const formData = new FormData();
      const json1 = JSON.stringify(newData.articleDTO);
      const blob = new Blob([json1], { type: "application/json" });
      formData.append("file", file);
      formData.append("articleDTO", blob);

      writeArticle(formData);
    }
  }

  const { mutate: writeArticle } = useMutation(articeWrite, {
    onSuccess: (response) => {
      console.log(response);
      // 글쓰기 성공하면 바로 피드랑 입력폼 새로고침 해주기.
      // 성공하면 따로 alert를 줄건지?
      setconsumeText("");
      setCategory("");
      setfinancialText("");
      setAmount("");
      setStatus("1");
      setconsumeDate(new Date());
      setReloadFeed(true);
      setFile(null);
    },
    onError: (error) => {
      // 실패시 뭐하지
      console.log(error);
      alert("게시글 업로드에 실패했습니다.");
    },
  });

  return (
    <>
      {/* isConsumeWrite에 따라 지출 받기 / 결재 받기 바뀌기 */}
      <WriteFormWrapper>
        <ButtonWrapper>
          <Button1
            data-isclicked={isclicked}
            onClick={() => {
              handleClick(1);
              setisclicked(true);
            }}>
            지출 입력
          </Button1>
          <Button2
            data-isclicked={isclicked}
            onClick={() => {
              handleClick(2);
              setisclicked(false);
            }}>
            결재 받기
          </Button2>
        </ButtonWrapper>

        <InputWrapper>
          {isConsumeWrite === 1 && (
            <ConsumeFormWrapper>
              <TopWrapper>
                <ImageAndCategorySelect>
                  <Image src={nowUser.profileImgUrl} alt="" />
                  <StyledSelect1 value={category} onChange={handleCategoryChange}>
                    <option value="">카테고리 ⬇️</option>
                    <option value="1">식비😋</option>
                    <option value="2">패션/미용🕶</option>
                    <option value="3">생활용품🌂</option>
                    <option value="4">교육📚</option>
                    <option value="5">취미생활🎾</option>
                    <option value="6">기타🤔</option>
                  </StyledSelect1>
                </ImageAndCategorySelect>
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

              <InputText
                name="consumeInput"
                value={consumeText}
                placeholder="글을 작성하세요."
                onChange={handleCousumeInput}
              />

              <BottomWrapper>
                <FinancialTextWrapper>
                  <FinancialText
                    type="text"
                    value={financialText}
                    name="financialInput"
                    placeholder="가계부 메모를 작성하세요."
                    onChange={handleFinancialInput}
                  />
                </FinancialTextWrapper>

                <AmountInput
                  type="text"
                  placeholder="금액 입력"
                  value={formatWithCommas(amount)}
                  onChange={handleAmountChange}
                />
              </BottomWrapper>
            </ConsumeFormWrapper>
          )}

          {isConsumeWrite === 2 && (
            <PermissionFormWrapper>
              <TopWrapper>
                <Image
                  src="https://play-lh.googleusercontent.com/glrEciSE3ySHXWTRktXfIim8WWK9-ptxB3D04Dpbel6aqT4QZLauuf2ytS0fF1x0bp4=w240-h480-rw"
                  alt=""
                />
              </TopWrapper>

              <InputText
                type="text"
                name="permissionInput"
                placeholder="글을 작성하세요."
                onChange={handleCousumeInput}
              />

              <BottomWrapper>
                <PermissionBottomDiv></PermissionBottomDiv>
                <AmountInput
                  type="text"
                  placeholder="금액 입력"
                  value={formatWithCommas(amount)}
                  onChange={handleAmountChange}
                />
              </BottomWrapper>
            </PermissionFormWrapper>
          )}
          <SubmitAndPrivacySet>
            <FileInputContainer>
              {file && <img src={URL.createObjectURL(file)} alt="File Preview" />}
              {file ? file.name : "Choose File"}
              <input type="file" name="file" accept="image/*" onChange={handleFileUpload} />
            </FileInputContainer>
            <StatusAndSubmitWrapper>
              <StyledSelect2 value={status} onChange={handleStatusChage}>
                <option value="1">전체공개</option>
                <option value="2">맞팔공개</option>
                <option value="3">비공개</option>
              </StyledSelect2>
              <SubmitButton
                onClick={() => {
                  submitNewData();
                }}>
                게시하기
              </SubmitButton>
            </StatusAndSubmitWrapper>
          </SubmitAndPrivacySet>
        </InputWrapper>
      </WriteFormWrapper>
    </>
  );
}

const WriteFormWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
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
  width: 10rem;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }
`;

// 공개여부 셀렉트
const StyledSelect2 = styled.select`
  margin-left: 1rem;
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.mainpurple};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
  cursor: pointer;
  appearance: none;
  text-align: center;
  &:hover {
    /* filter: brightness(0.95); */
    background-color: ${({ theme }) => theme.colors.darkpurple};
  }
`;

const ConsumeFormWrapper = styled.section`
  display: flex;
  width: 100%;
  text-align: center;
  flex-wrap: wrap;
`;

const PermissionFormWrapper = styled.section`
  display: flex;
  width: 100%;
  text-align: center;
  flex-wrap: wrap;
`;

const Button1 = styled.button`
  ${({ theme }) => theme.fonts.bold};
  width: 50%;
  font-size: 1.6rem;

  text-align: center;
  color: ${(props) => (props["data-isclicked"] ? "#000000" : "#C4C4C4")};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  position: relative; // 막대가 버튼 안에 고정되게하기 위해

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.darkpurple_2};
    transition: width 0.3s;

    ${(props) =>
      props["data-isclicked"] &&
      css`
        width: 100%;
      `}
  }
`;

const Button2 = styled.button`
  ${({ theme }) => theme.fonts.bold};
  width: 50%;
  font-family: "Spoqa Han Sans Neo";
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${(props) => (props["data-isclicked"] ? "#C4C4C4" : "#000000")};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  position: relative; // 막대가 버튼 안에 고정되게하기 위해

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.darkpurple_2};
    transition: width 0.3s;

    ${(props) =>
      !props["data-isclicked"] &&
      css`
        width: 100%;
      `}
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  width: 699px;
  height: 5rem;
  margin-bottom: 0.6rem;
  margin-top: 1.5rem;
  /* padding-bottom: 1.5rem; */
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};

  button {
    border: none;
    outline: none;
  }
`;

const ImageAndCategorySelect = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.section`
  /* width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white}; */
  padding: 2rem;
`;

const BottomWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1.3rem;
`;

const TopWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const DataPickerWrapper = styled.section`
  display: flex;
  height: 3rem;

  .react-datepicker-popper {
    //transform: translate3d(995px, 137.5px, 0px) !important;
  }
`;

const Image = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1.5rem;
  border-radius: 0.7rem;
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;

  width: 5rem;
  height: 5rem;

  & > span {
    font-size: 3rem;
  }
`;
const FinancialTextWrapper = styled.div`
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

  transition: border 0.3s ease-in-out; /* 애니메이션 효과를 원래 상태에 적용합니다 */

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainpurple};
  }
`;

const PermissionBottomDiv = styled.section`
  width: 180px;
`;

const AmountInput = styled.input`
  width: 14rem;
  height: 3rem;
  padding: 0 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-radius: 0.4rem;
  text-align: center;
  font-size: 1.4rem;

  transition: border 0.3s ease-in-out; /* 애니메이션 효과를 원래 상태에 적용합니다 */

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainpurple};
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
  margin-top: 1rem;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.mainpurple};
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

const StatusAndSubmitWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitAndPrivacySet = styled.section`
  display: flex;
  justify-content: space-between;
  :focus {
    outline: none;
  }
  .submit:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }
  padding-top: 1rem;
`;

const SubmitButton = styled.button`
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkpurple_2};
  }

  margin-left: 1rem;
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
`;
