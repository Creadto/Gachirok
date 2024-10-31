export default function getTodayTime(countryCode: string) {


    const weekday = ["일","월","화","수","목","금","토"];

    // countryCode를 기반으로 날짜 생성
    const date = new Date()

    const years = date.getFullYear() % 2000;
    const months = date.getMonth()+1;
    const days = date.getDate();
    const weeks = date.getDay();

    return years + '. ' + months + '. ' + days + ' (' + weekday[weeks] + ')';
}