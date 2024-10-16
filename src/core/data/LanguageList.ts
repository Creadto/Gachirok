export interface LanguageListProps {
  id: number;
  language: string;
  level: string;
  language_level: string;
  language_level_name: string;
  levelDescription: string;
}

export const LanguageList: LanguageListProps[] = [

    // English
    {
      id: 1,
      language: "English",
      level: "High",
      language_level: "English_High",
      language_level_name: "영어(상)",
      levelDescription: "상 - 원어민 수준",
    },
    {
      id: 2,
      language: "English",
      level: "Middle",
      language_level: "English_Middle",
      language_level_name: "영어(중)",
      levelDescription: "중 - 상급자 수준",
    },
    {
      id: 3,
      language: "English",
      level: "Low",
      language_level: "English_Low",
      language_level_name: "영어(하)",
      levelDescription: "하 - 초보 수준",
    },
    {
      id: 4,
      language: "English",
      level: "Beginner",
      language_level: "English_Beginner",
      language_level_name: "영어(초급)",
      levelDescription: "초급 - 기초 수준",
    },
  
    // Chinese
    {
      id: 5,
      language: "Chinese",
      level: "High",
      language_level: "Chinese_High",
      language_level_name: "중국어(상)",
      levelDescription: "상 - 원어민 수준",
    },
    {
      id: 6,
      language: "Chinese",
      level: "Middle",
      language_level: "Chinese_Middle",
      language_level_name: "중국어(중)",
      levelDescription: "중 - 상급자 수준",
    },
    {
      id: 7,
      language: "Chinese",
      level: "Low",
      language_level: "Chinese_Low",
      language_level_name: "중국어(하)",
      levelDescription: "하 - 초보 수준",
    },
    {
      id: 8,
      language: "Chinese",
      level: "Beginner",
      language_level: "Chinese_Beginner",
      language_level_name: "중국어(초급)",
      levelDescription: "초급 - 기초 수준",
    },
  
    // Japanese
    {
      id: 9,
      language: "Japanese",
      level: "High",
      language_level: "Japanese_High",
      language_level_name: "일본어(상)",
      levelDescription: "상 - 원어민 수준",
    },
    {
      id: 10,
      language: "Japanese",
      level: "Middle",
      language_level: "Japanese_Middle",
      language_level_name: "일본어(중)",
      levelDescription: "중 - 상급자 수준",
    },
    {
      id: 11,
      language: "Japanese",
      level: "Low",
      language_level: "Japanese_Low",
      language_level_name: "일본어(하)",
      levelDescription: "하 - 초보 수준",
    },
    {
      id: 12,
      language: "Japanese",
      level: "Beginner",
      language_level: "Japanese_Beginner",
      language_level_name: "일본어(초급)",
      levelDescription: "초급 - 기초 수준",
    },
  
    // Spanish
    {
      id: 13,
      language: "Spanish",
      level: "High",
      language_level: "Spanish_High",
      language_level_name: "스페인어(상)",
      levelDescription: "상 - 원어민 수준",
    },
    {
      id: 14,
      language: "Spanish",
      level: "Middle",
      language_level: "Spanish_Middle",
      language_level_name: "스페인어(중)",
      levelDescription: "중 - 상급자 수준",
    },
    {
      id: 15,
      language: "Spanish",
      level: "Low",
      language_level: "Spanish_Low",
      language_level_name: "스페인어(하)",
      levelDescription: "하 - 초보 수준",
    },
    {
      id: 16,
      language: "Spanish",
      level: "Beginner",
      language_level: "Spanish_Beginner",
      language_level_name: "스페인어(초급)",
      levelDescription: "초급 - 기초 수준",
    },
  
    // French
    {
      id: 17,
      language: "French",
      level: "High",
      language_level: "French_High",
      language_level_name: "불어(상)",
      levelDescription: "상 - 원어민 수준",
    },
    {
      id: 18,
      language: "French",
      level: "Middle",
      language_level: "French_Middle",
      language_level_name: "불어(중)",
      levelDescription: "중 - 상급자 수준",
    },
    {
      id: 19,
      language: "French",
      level: "Low",
      language_level: "French_Low",
      language_level_name: "불어(하)",
      levelDescription: "하 - 초보 수준",
    },
    {
      id: 20,
      language: "French",
      level: "Beginner",
      language_level: "French_Beginner",
      language_level_name: "불어(초급)",
      levelDescription: "초급 - 기초 수준",
    }
  ];

interface LanguageTypeListProps {
  id: number,
  languageType: string,
  languageTypeName: string,
}

export const LanguageTypeList: LanguageTypeListProps[] = [
{id: 1, languageType: 'English', languageTypeName: '영어'},
{id: 2, languageType: 'Chinese' , languageTypeName: '중국어'},
{id: 3, languageType: 'Japanese', languageTypeName: '일본어'},
{id: 4, languageType: 'Spanish', languageTypeName: '스페인어'},
{id: 5, languageType: 'French', languageTypeName: '불어'},

]