import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function WriteForm() {

  const [isConsumeWrite, setIsConsumeWrite] = useState(1); 
  const [isButton1Clicked, setIsButton1Clicked] = useState(true);


  const [category, setCategory] = useState('');
  const [consumeText, setconsumeText] = useState("");
  const [consumeDate, setconsumeDate] = useState(new Date());
  const [financialText, setfinancialText] = useState("");
  const [status, setStatus] = useState(1);
  const [amount, setAmount] = useState(null);

  const [newData, setnewData] = useState({
    "status":status,
    "imageUrl":"url",
    "expenditureCategory":category,
    "amount":amount,
    "financialText":financialText,
    "articleText":consumeText,
    "articleType":isConsumeWrite,
    "consumptionDate":consumeDate,
    "isAllowed":"false"
  });

  let getToday = new Date();
  let year = getToday.getFullYear(); // 년도
  let month = getToday.getMonth() + 1;  // 월
  let date = getToday.getDate();  // 날짜
  let today = year + "-" + month +"-"+date;
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
  const handleDateInput = (event) => {
    setconsumeDate((prev)=>({...prev, consumeDate:event.target.value}));
  };

  /**
   * 글 작성
   * @param {*} event 
   */
  const handleCousumeInput = (event) => {
    setconsumeText((prev)=>({...prev,consumeText:event.target.value}));
  };

  /**
   * 가계부 메모
   * @param {*} event 
   */
  const handleFinancialInput = (event) => {
    setfinancialText((prev)=>({...prev, financialText:event.target.value}));
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

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }

  const handleAmountChange = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setAmount(str);
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
      if (newData.amount&&newData.articleText&&newData.articleType&&
        newData.consumptionDate&&newData.expenditureCategory&&newData.status){
        // API 호출
        }
    } else {
      if (newData.articleText&&newData.amount&&newData.status){
        // API 호출
      }
    }
  }
  return (
    <>
      {/* isConsumeWrite에 따라 지출 받기 / 결재 받기 바뀌기 */}
      <WriteFormWrapper>
        <ButtonWrapper>
          <Button1 isButton1Clicked={isButton1Clicked} onClick={() => { handleClick(1); setIsButton1Clicked(true); }}>지출 입력</Button1>
          <Button2 isButton1Clicked={isButton1Clicked} onClick={() => { handleClick(2); setIsButton1Clicked(false); }}>결재 받기</Button2>
        </ButtonWrapper>
        
        {isConsumeWrite === 1 && (
          <ConsumeFormWrapper>
              <TopWrapper>
                <Image src="https://play-lh.googleusercontent.com/glrEciSE3ySHXWTRktXfIim8WWK9-ptxB3D04Dpbel6aqT4QZLauuf2ytS0fF1x0bp4=w240-h480-rw" alt="" />
                <StyledSelect1 value={category} onChange={handleCategoryChange}>
                  <option value="">카테고리 ↓</option>
                  <option value="1">식비</option>
                  <option value="2">패션/미용</option>
                  <option value="3">생활용품</option>
                  <option value="4">교육</option>
                  <option value="5">취미생활</option>
                  <option value="6">기타</option>
                </StyledSelect1>
                <DatePicker selected={consumeDate} onChange={date => setStartDate(date)} locale={ko} dateFormat="yyyy-MM-dd" />
              </TopWrapper>

              <InputText name="consumeInput" placeholder="글을 작성하세요." onChange={handleCousumeInput}/>
              
              <BottomWrapper>
                <FileLabel htmlFor="file">
                  <span className="material-symbols-outlined" >
                    image
                  </span>
                </FileLabel>
                <input type="file" name="file" id="file" accept="image/*" onChange={handleFileUpload} style={{display: 'none'}}/>
                <FinancialTextWrapper>
                  <FinancialText type="text" name="financialInput" placeholder="가계부 메모를 작성하세요." onChange={handleFinancialInput}/>
                </FinancialTextWrapper>
                <AmountInput type="text" placeholder="금액 입력" onChange={(e) => handleAmountChange(e)} value={addComma(amount) || ""}/>
              </BottomWrapper>

          </ConsumeFormWrapper>
        )}
        
        {isConsumeWrite === 2 && (
          <PermissionFormWrapper>
              
              <TopWrapper>
                <Image src="https://play-lh.googleusercontent.com/glrEciSE3ySHXWTRktXfIim8WWK9-ptxB3D04Dpbel6aqT4QZLauuf2ytS0fF1x0bp4=w240-h480-rw" alt="" />
              </TopWrapper>

              <InputText type="text" name="permissionInput" placeholder="글을 작성하세요."/>
              
              <BottomWrapper>
                <FileLabel htmlFor="file">
                  <span className="material-symbols-outlined">
                    image
                  </span>
                </FileLabel>  
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{display: 'none'}}/>
                <PermissionBottomDiv></PermissionBottomDiv>
                <AmountInput type="text" placeholder="금액 입력" onChange={(e) => handleAmountChange(e)} value={addComma(amount) || ""}/>
              </BottomWrapper>

          </PermissionFormWrapper>
        )}
        <SubmitAndPrivacySet>
          <StyledSelect2 value={status} onChange={handleStatusChage}>
            <option value="">공개여부 ↓</option>
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


const StyledSelect1 = styled.select`
  option {
    color : #FFFFFF;
  }
  width: 9rem;
  height: 100%;
  border-radius: 3rem;
  background-color: #845EC2;
  ${({ theme }) => theme.fonts.regular};
  font-style: normal;
  color: white;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  display: flex;
  justify-content: center;
`;

const StyledSelect2 = styled.select`
option {
    color : #845EC2;
  }
  width: 9.4rem;
  height: 2.65rem;

  padding: 5px 5px;
  border-radius: 3rem;
  border: 1px solid #845EC2;
  background-color: white;
  ${({ theme }) => theme.fonts.regular};
  font-style: normal;
  line-height: 18px;  
  color: #845EC2;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  margin-left: auto;
`

const ConsumeFormWrapper=styled.section` 

  .react-datepicker-wrapper {
      width: 10rem;
      text-align: center;
      margin-left: 40.1rem;
      margin-right: 4rem;
  }
  .react-datepicker__input-container input {
    width: 10rem;
    height: 27px;
    border: 1px solid #ddd;
    font-size: 13px;
    text-align: center;
    color: #707070;
  }
  
  display: flex;
  width: 699px;
  text-align: center;
  flex-wrap: wrap;
`;

const PermissionFormWrapper = styled.section`
  display: flex;
  width: 699px;
  text-align: center;
  flex-wrap: wrap;
`;

const Button1=styled.button`
  
  ${({ theme }) => theme.fonts.bold};

  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props.isButton1Clicked ? '#000000' : '#C4C4C4'};
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
  font-size: 16px;
  line-height: 1.25rem;
  /* identical to box height */

  text-align: center;
  color: ${props => props.isButton1Clicked ? '#C4C4C4' : '#000000'};
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
  height: 27px;
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
    font-size: 30px;
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
  font-size: 14px;
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
  height: 68px;
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
  font-size: 12px;
  font-style: normal;
  color: white;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;
