import React, { useRef, useState } from "react";
import { styled } from "styled-components";

export default function WriteForm() {

  const [isConsumeWrite, setIsConsumeWrite] = useState(1); 

  const [category, setCategory] = useState('');
  const [consumeText, setconsumeText] = useState("");
  const [consumeDate, setconsumeDate] = useState(null); // 오늘 날짜로 초기화하고 싶은데 어케하는지 몰겠음;
  const [financialText, setfinancialText] = useState("");
  const [status, setStatus] = useState(1);
  const [amount, setAmount] = useState(0);

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

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
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
      <div>
        <button onClick={() => handleClick('consumeWrite')}>지출 입력</button>
        <button onClick={() => handleClick('permissionWrite')}>결재 받기</button>
        
        {isConsumeWrite === 1 && (
          <div>
              <img src="" alt="" />
              <StyledSelect value={category} onChange={handleCategoryChange}>
                <option value="">카테고리</option>
                <option value="1">식비</option>
                <option value="2">패션/미용</option>
                <option value="3">생활용품</option>
                <option value="4">교육</option>
                <option value="5">취미생활</option>
                <option value="6">기타</option>
              </StyledSelect>
              <input type="date" id="consumeDate" onChange={handleDateInput}/>
              <input type="text" name="consumeInput" placeholder="글을 작성하세요." onChange={handleCousumeInput}/>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              <input type="text" name="financialInput" placeholder="가계부 메모를 작성하세요." onChange={handleFinancialInput}/>
              <input type="text" name="amount" placeholder="금액" onChange={handleAmountChange} />
          </div>
        )}
        
        {isConsumeWrite === 2 && (
          <div>
              <img src="" alt="" />
              <input type="text" name="permissionInput" placeholder="글을 작성하세요."/>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              <input type="text" name="amount" placeholder="금액" onChange={handleAmountChange} />

          </div>
        )}
        <StyledSelect value={status} onChange={handleStatusChage}>
          <option value="1">전체공개</option>
          <option value="2">맞팔공개</option>
          <option value="3">비공개</option>
        </StyledSelect>
        <button onClick={submitNewData}>게시하기</button>
        
      </div>
    </>
  );
}


const StyledSelect = styled.select`
  padding: 5px 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #845EC2;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;  color: #333;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
`;