
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