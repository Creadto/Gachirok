import {
  CountryIconAR,
  CountryIconAU,
  CountryIconBR,
  CountryIconCA,
  CountryIconCN,
  CountryIconDE,
  CountryIconFR,
  CountryIconGB,
  CountryIconGU,
  CountryIconID,
  CountryIconJP,
  CountryIconKR,
  CountryIconKZ,
  CountryIconLA,
  CountryIconMY,
  CountryIconNZ,
  CountryIconPH,
  CountryIconRU,
  CountryIconSG,
  CountryIconTH,
  CountryIconUA,
  CountryIconUS,
  CountryIconUZ,
  CountryIconVN,
} from "../components/icons/CountryIcons";

interface CountryListProps {
  code: string;
  emoji: string;
  name: string;
  icon: JSX.Element;
}

export const CountryList: CountryListProps[] = [
  {
    code: "KR",
    emoji: countryCodeToEmoji("KR"),
    name: "대한민국",
    icon: CountryIconKR(),
  },
  {
    code: "US",
    emoji: countryCodeToEmoji("US"),
    name: "미국",
    icon: CountryIconUS(),
  },
  {
    code: "JP",
    emoji: countryCodeToEmoji("JP"),
    name: "일본",
    icon: CountryIconJP(),
  },
  {
    code: "CN",
    emoji: countryCodeToEmoji("CN"),
    name: "중국",
    icon: CountryIconCN(),
  },
  {
    code: "VN",
    emoji: countryCodeToEmoji("VN"),
    name: "베트남",
    icon: CountryIconVN(),
  },
  {
    code: "SG",
    emoji: countryCodeToEmoji("SG"),
    name: "싱가포르",
    icon: CountryIconSG(),
  },
  {
    code: "TH",
    emoji: countryCodeToEmoji("TH"),
    name: "태국",
    icon: CountryIconTH(),
  },
  {
    code: "PH",
    emoji: countryCodeToEmoji("PH"),
    name: "필리핀",
    icon: CountryIconPH(),
  },
  {
    code: "MY",
    emoji: countryCodeToEmoji("MY"),
    name: "말레이시아",
    icon: CountryIconMY(),
  },
  {
    code: "ID",
    emoji: countryCodeToEmoji("ID"),
    name: "인도네시아",
    icon: CountryIconID(),
  },
  {
    code: "GU",
    emoji: countryCodeToEmoji("GU"),
    name: "괌",
    icon: CountryIconGU(),
  },
  {
    code: "AU",
    emoji: countryCodeToEmoji("AU"),
    name: "호주",
    icon: CountryIconAU(),
  },
  {
    code: "UZ",
    emoji: countryCodeToEmoji("UZ"),
    name: "우즈베키스탄",
    icon: CountryIconUZ(),
  },
  {
    code: "CA",
    emoji: countryCodeToEmoji("CA"),
    name: "캐나다",
    icon: CountryIconCA(),
  },
  {
    code: "RU",
    emoji: countryCodeToEmoji("RU"),
    name: "러시아",
    icon: CountryIconRU(),
  },
  {
    code: "LA",
    emoji: countryCodeToEmoji("LA"),
    name: "라오스",
    icon: CountryIconLA(),
  },
  {
    code: "GB",
    emoji: countryCodeToEmoji("GB"),
    name: "영국",
    icon: CountryIconGB(),
  },
  {
    code: "DE",
    emoji: countryCodeToEmoji("DE"),
    name: "독일",
    icon: CountryIconDE(),
  },
  {
    code: "BR",
    emoji: countryCodeToEmoji("BR"),
    name: "브라질",
    icon: CountryIconBR(),
  },
  {
    code: "NZ",
    emoji: countryCodeToEmoji("NZ"),
    name: "뉴질랜드",
    icon: CountryIconNZ(),
  },
  {
    code: "FR",
    emoji: countryCodeToEmoji("FR"),
    name: "프랑스",
    icon: CountryIconFR(),
  },
  {
    code: "AR",
    emoji: countryCodeToEmoji("AR"),
    name: "아르헨티나",
    icon: CountryIconAR(),
  },
  {
    code: "UA",
    emoji: countryCodeToEmoji("UA"),
    name: "우크라이나",
    icon: CountryIconUA(),
  },
  {
    code: "KZ",
    emoji: countryCodeToEmoji("KZ"),
    name: "카자흐스탄",
    icon: CountryIconKZ(),
  },
];

export function countryCodeToEmoji(countryCode: string) {
  const upperCaseCountryCode = countryCode.toUpperCase();
  const firstLetter = upperCaseCountryCode.charCodeAt(0) - 0x41 + 0x1f1e6;
  const secondLetter = upperCaseCountryCode.charCodeAt(1) - 0x41 + 0x1f1e6;
  return String.fromCodePoint(firstLetter) + String.fromCodePoint(secondLetter);
}
