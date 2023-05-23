import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useMutation } from "react-query";
import { articeWrite } from "../../../api/articleWriteApi";

export default function WriteForm() {

  const [isConsumeWrite, setIsConsumeWrite] = useState(1); 
  const [isclicked, setisclicked] = useState(true);

  const [category, setCategory] = useState('');
  const [consumeText, setconsumeText] = useState("");
  const [consumeDate, setconsumeDate] = useState(new Date());
  const [financialText, setfinancialText] = useState("");
  const [status, setStatus] = useState(''); // 공개여부
  const [amount, setAmount] = useState("");

  const newData = {
    status:status,
    imageUrl:"url",
    expenditureCategory:category,
    amount:Number(amount),
    financialText:financialText,
    articleText:consumeText,
    articleType:isConsumeWrite,
    consumptionDate:consumeDate,
    isAllowed:"false"
  };

  /**
   * 지출입력 or 결재받기 버튼선택
   * @param {*} type 
   */
  const handleClick = (type) => {
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
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  /**
   * 글 작성
   * @param {*} event 
   */
  const handleCousumeInput = (event) => {
    setconsumeText(event.target.value)
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
    const formattedValue = value.replace(/[^0-9]/g, '');  // 숫자만 허용
    setAmount(formattedValue);
  }

  /**
   * 금액 입력할때 쉼표 붙여주
   */
  const formatWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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

      if (amount === '') {
        alert("금액을 입력해주세요.");
        return;
      }

      if (status === "") {
        alert("공개여부를 선택해주세요.");
        return;
      }

      if (newData.amount&&newData.articleText&&newData.articleType&&
        newData.consumptionDate&&newData.expenditureCategory&&newData.status){
        // API 호출
        newData.consumptionDate = formatDate(consumeDate);
        writeArticle(newData);
        
        // console.log(newData);
      }
    } else {
      if (consumeText === "") {
        alert("글을 입력해주세요.");
        return;
      }

      if (amount === '') {
        alert("금액을 입력해주세요.");
        return;
      }

      if (newData.articleText&&newData.amount&&newData.status){
        // API 호출
        newData.consumptionDate = formatDate(consumeDate);
        writeArticle(newData);
      }
    }
  }

  const {mutate : writeArticle} = useMutation(articeWrite, {
    onSuccess: (response) => {
      console.log(response);
      // 글쓰기 성공하면 바로 피드랑 입력폼 새로고침 해주기.
      setconsumeText("");
      setCategory('');
      setfinancialText("");
      setAmount("");
      setStatus('');
      setconsumeDate(new Date());

    },
    onError:() => {
      // 실패시 뭐하지
      
    },
  });


  return (
    <>
      {/* isConsumeWrite에 따라 지출 받기 / 결재 받기 바뀌기 */}
      <WriteFormWrapper>
        <ButtonWrapper>
          <Button1 data-isclicked={isclicked} onClick={() => { handleClick(1); setisclicked(true); }}>지출 입력</Button1>
          <Button2 data-isclicked={isclicked} onClick={() => { handleClick(2); setisclicked(false); }}>결재 받기</Button2>
        </ButtonWrapper>
        
        {isConsumeWrite === 1 && (
          <ConsumeFormWrapper>
              <TopWrapper>
                <Image src="https://play-lh.googleusercontent.com/glrEciSE3ySHXWTRktXfIim8WWK9-ptxB3D04Dpbel6aqT4QZLauuf2ytS0fF1x0bp4=w240-h480-rw" alt="" />
                <StyledSelect1 value={category} onChange={handleCategoryChange}>
                  <option value="">카테고리 ⬇️</option>
                  <option value="1">식비</option>
                  <option value="2">패션/미용</option>
                  <option value="3">생활용품</option>
                  <option value="4">교육</option>
                  <option value="5">취미생활</option>
                  <option value="6">기타</option>
                </StyledSelect1>
                <DatePicker selected={consumeDate} onChange={handleDateInput} locale={ko} dateFormat="yyyy-MM-dd" />
              </TopWrapper>

              <InputText name="consumeInput" value={consumeText} placeholder="글을 작성하세요." onChange={handleCousumeInput}/>

              <BottomWrapper>
                <FileLabel htmlFor="file">
                  <span className="material-symbols-outlined" >
                    image
                  </span>
                </FileLabel>
                <input type="file" name="file" id="file" accept="image/*" onChange={handleFileUpload} style={{display: 'none'}}/>
                <FinancialTextWrapper>
                  <FinancialText type="text" value={financialText} name="financialInput" placeholder="가계부 메모를 작성하세요." onChange={handleFinancialInput}/>
                </FinancialTextWrapper>

                <AmountInput type="text" placeholder="금액 입력" value={formatWithCommas(amount)} onChange={handleAmountChange} />

              </BottomWrapper>

          </ConsumeFormWrapper>
        )}
        
        {isConsumeWrite === 2 && (
          <PermissionFormWrapper>
              
              <TopWrapper>
                <Image src="https://play-lh.googleusercontent.com/glrEciSE3ySHXWTRktXfIim8WWK9-ptxB3D04Dpbel6aqT4QZLauuf2ytS0fF1x0bp4=w240-h480-rw" alt="" />
              </TopWrapper>

              <InputText type="text" name="permissionInput" placeholder="글을 작성하세요." onChange={handleCousumeInput}/>
              
              <BottomWrapper>
                <FileLabel htmlFor="file">
                  <span className="material-symbols-outlined">
                    image
                  </span>
                </FileLabel>  
                <input type="file" name="file" id="file" accept="image/*" onChange={handleFileUpload} style={{display: 'none'}}/>
                <PermissionBottomDiv></PermissionBottomDiv>

                <AmountInput type="text" placeholder="금액 입력" value={formatWithCommas(amount)} onChange={handleAmountChange} />

              </BottomWrapper>

          </PermissionFormWrapper>
        )}
        <SubmitAndPrivacySet>
          <StyledSelect2 value={status} onChange={handleStatusChage}>
            <option value="">공개여부 ⬇️</option>
            <option value="1">전체공개</option>
            <option value="2">맞팔공개</option>
            <option value="3">비공개</option>
          </StyledSelect2>
          <SubmitButton onClick={submitNewData}>게시하기</SubmitButton>  
        </SubmitAndPrivacySet>
      </WriteFormWrapper>
    </>
  );
}

const WriteFormWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;

// 카테고리 셀렉트
const StyledSelect1 = styled.select`
  option {
    color : #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  width: 9rem;
  height: 100%;
  border-radius: 3rem;
  background-color: #845EC2;
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.1rem;
  color: white;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  display: flex;
  justify-content: center;
`;

// 공개여부 셀렉트
const StyledSelect2 = styled.select`
option {
    color : #845EC2;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  width: 9.4rem;
  height: 2.65rem;
  border-radius: 3rem;
  border: 1px solid #845EC2;
  background-color: white;
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.1rem;
  color: #845EC2;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  margin-left: auto;
  display: flex;
`;

const ConsumeFormWrapper=styled.section` 

  .react-datepicker-wrapper {
      width: 10rem;
      text-align: center;
      margin-left: 40.1rem;
      margin-right: 4rem;
  }
  .react-datepicker__input-container input {
    width: 10rem;
    height: 2.3rem;
    border: 1px solid #ddd;
    font-size: 1.1rem;
    text-align: center;
    color: #707070;
  }
  
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

const Button1=styled.button`
  
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props['data-isclicked'] ? '#000000' : '#C4C4C4'};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  height:100%;
`;

const Button2=styled.button`
  
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props['data-isclicked'] ? '#C4C4C4' : '#000000'};
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  height:100%;
`;

const ButtonWrapper=styled.section`
  display: flex;
  justify-content: space-evenly;
  width:699px;
  height: 5rem;
  margin-bottom: 2rem;
  /* padding-bottom: 1.5rem; */
  border-bottom: 1px solid #E6E6E6;
`;

const BottomWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

const TopWrapper = styled.section`
  display: flex;
  height: 2.3rem;
`

const Image=styled.img`
  width: 2.3rem;
  height: 2.3rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 0.8rem;
  text-align: center;
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
`
const FinancialTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FinancialText = styled.input`
  width: 18rem;
  height: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  text-align: center;
  font-size: 1.25rem;
  /* margin-top: 1.24rem; */
`;

const PermissionBottomDiv = styled.section`
  width: 180px;
`;

const AmountInput = styled.input`
  width: 14rem;
  height: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  text-align: center;
  font-size: 15px;
  margin-top: 1.24rem;
  margin-left: 28.5rem;
  color: #845EC2;
`;

const InputText = styled.textarea`
  width: 640px;
  height: 6.7rem;
  border: 1px solid #ddd;
  text-align: left;
  margin-left: 1.5rem;
  margin-right: 3.5rem;
  margin-top: 1.3rem;
  border-radius: 0.5rem;
`;

const SubmitAndPrivacySet = styled.section`
  display: flex;
  margin-right: 4.5rem;
`;

const SubmitButton = styled.button`
  option {
    color : #FFFFFF;
  }
  width: 8rem;
  height: 2.65rem;
  border-radius: 3rem;
  background-color: #845EC2;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.1rem;
  font-style: normal;
  color: white;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;
