interface CountryListProps {
  code: string;
  emoji: string;
  name: string;
}

export const CountryList: CountryListProps[] = [
  { code: "KR", emoji: countryCodeToEmoji("KR"), name: "대한민국" },
  { code: "US", emoji: countryCodeToEmoji("US"), name: "미국" },
  { code: "JP", emoji: countryCodeToEmoji("JP"), name: "일본" },
  { code: "CN", emoji: countryCodeToEmoji("CN"), name: "중국" },
  { code: "VN", emoji: countryCodeToEmoji("VN"), name: "베트남" },
  { code: "SG", emoji: countryCodeToEmoji("SG"), name: "싱가포르" },
  { code: "TH", emoji: countryCodeToEmoji("TH"), name: "태국" },
  { code: "PH", emoji: countryCodeToEmoji("PH"), name: "필리핀" },
  { code: "MY", emoji: countryCodeToEmoji("MY"), name: "말레이시아" },
  { code: "ID", emoji: countryCodeToEmoji("ID"), name: "인도네시아" },
  { code: "GU", emoji: countryCodeToEmoji("GU"), name: "괌" },
  { code: "AU", emoji: countryCodeToEmoji("AU"), name: "호주" },
  { code: "UZ", emoji: countryCodeToEmoji("UZ"), name: "우즈베키스탄" },
  { code: "CA", emoji: countryCodeToEmoji("CA"), name: "캐나다" },
  { code: "RU", emoji: countryCodeToEmoji("RU"), name: "러시아" },
  { code: "LA", emoji: countryCodeToEmoji("LA"), name: "라오스" },
  { code: "GB", emoji: countryCodeToEmoji("GB"), name: "영국" },
  { code: "DE", emoji: countryCodeToEmoji("DE"), name: "독일" },
  { code: "BR", emoji: countryCodeToEmoji("BR"), name: "브라질" },
  { code: "NZ", emoji: countryCodeToEmoji("NZ"), name: "뉴질랜드" },
  { code: "FR", emoji: countryCodeToEmoji("FR"), name: "프랑스" },
  { code: "AR", emoji: countryCodeToEmoji("AR"), name: "아르헨티나" },
  { code: "UA", emoji: countryCodeToEmoji("UA"), name: "우크라이나" },
  { code: "KZ", emoji: countryCodeToEmoji("KZ"), name: "카자흐스탄" },
];


export function countryCodeToEmoji(countryCode: string) {
  const upperCaseCountryCode = countryCode.toUpperCase();
  const firstLetter = upperCaseCountryCode.charCodeAt(0) - 0x41 + 0x1F1E6;
  const secondLetter = upperCaseCountryCode.charCodeAt(1) - 0x41 + 0x1F1E6;
  return String.fromCodePoint(firstLetter) + String.fromCodePoint(secondLetter);
}


