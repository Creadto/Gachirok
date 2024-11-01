
/**
 * @Description yyyy-MM-dd’T’HH:mm:ss 형식을 yy-mm-dd로 변환
 * @author 김영서
 **/
export const changeTimeFormatYYMMDD = (createDate: string) => {
  const date = new Date(createDate);

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * @Description yyyy-MM-dd’T’HH:mm:ss 형식을 답변에서 사용되는 형식으로 변환
 * @author 김영서
 **/
export const changeTimeFormatComment = (createDate: string) => {
  const postTime = new Date(createDate); // 서버에서 받은 ISO 형식 시간
  const currentTime = new Date();
  const differenceInMillis = currentTime.getTime() - postTime.getTime();

  const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));

  if (differenceInMinutes < 1) {
    return "방금";
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  } else {
    return `${differenceInDays}일 전`;
  }
};