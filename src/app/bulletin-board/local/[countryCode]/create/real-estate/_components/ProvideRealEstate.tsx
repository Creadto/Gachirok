import { QuillEditor } from "@/app/bulletin-board/_components/QuillEditor";
import DropdownSelector from "@/core/components/DropdownSelector";
import {
  CheckColorIcon
} from "@/core/components/icons/create-profile/CheckIcon";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import SingleDateSelector from "@/core/components/SingleDateSelector";
import { CountryList } from "@/core/data/CountryList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

/**
 * @Description 부동산 - 방있어요에 해당하는 컴포넌트
 * @author 김영서
 **/
export default function ProvideRealEstate() {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
    // 여기에서 데이터를 서버로 전송하거나 다른 작업을 수행합니다.
  };

  const watchImages: FileList | undefined = watch("images") as FileList;

  // 부동산 종류
  const [selectedEstateType, setSelectedEstateType] = useState<string>("");
  const estateOptions = ["원룸", "투룸", "빌라", "아파트", "복층"];

  // 나라
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // 입주날짜
  const [isDateVisible, setIsDateVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const timePeriodOptions = ["1달", "3달", "6달", "1년", "2년", "3년", "5년"];
  const [isTodayDateClicked, setIsTodayDateClicked] = useState(false);

  //기간
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("");

  //가격
  const [price, setPrice] = useState<number | null>(null);

  //보증금
  const [deposit, setDeposit] = useState<number | null>(null);
  const [isNoDepositChecked, setIsNoDepositChecked] = useState(true); //"보증금 없어요" 버튼 체크 여부

  //침실
  const [bedroomNumber, setBedroomNumber] = useState<number|null>(null)
  const bedroomOptions = ["1", "2", "3", "4"];
  //욕실
  const [bathroomNumber, setBathroomNumber] = useState<number|null>(null)
  const bathroomOptions = ["1", "2", "3"];

  //면적
  const [area, setArea] = useState<number | null>(null);

  //성별
  const [sexType, setSexType] = useState<string>("NONE");
  const sexOptions = [
    { label: "상관없음", value: "NONE" },
    { label: "남자만", value: "MALE" },
    { label: "여자만", value: "FEMALE" },
  ];

  //조건/편의
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const conditionsOptions = [
    { label: "반려동물", value: "Animal" },
    { label: "흡연가능", value: "Smoking" },
    { label: "취사가능", value: "Cooking" },
    { label: "TV", value: "Television" },
    { label: "인터넷", value: "Internet" },
    { label: "주차가능", value: "Parking" },
    { label: "세탁기", value: "Laundry" },
    { label: "식기세척기", value: "Dishwash" },
    { label: "엘리베이터", value: "Elevator" },
    { label: "세탁시설", value: "Cleaning" },
  ];

  const countries = CountryList;

  //본문
  const [content, setContent] = useState("");

  //이미지 Thumbnail
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //미리보기 Modal 열림 여부

  // 즉시 입주 클릭 logic
  const handleTodayClick = () => {
    setIsTodayDateClicked(!isTodayDateClicked);
    if (isTodayDateClicked) {
      setSelectedDate(null);
      setValue("selectedDate", selectedDate);
    } else {
      const today = new Date();
      setSelectedDate(today);
    }
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  // 보증금 없음 클릭
  const handleNoDepositClick = () => {
    setIsNoDepositChecked(!isNoDepositChecked);
    setDeposit(null);
  };

  const handleConditionsClick = (options: string) => {
    setSelectedConditions((prevSelected) =>
      prevSelected?.includes(options)
        ? prevSelected.filter((condition) => condition !== options)
        : [...prevSelected, options]
    );
  };

  //값이 변경될 때마다 setValue()로 useForm의 data에 저장
  useEffect(() => {
    console.log("조건/편의 ", selectedConditions);
    selectedDate
      ? setValue("meetingDate", formatDate(selectedDate))
      : setValue("meetingDate", "");
  }, [selectedEstateType, selectedDate, selectedConditions]);

  useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const imageFiles = Array.from(watchImages); // 파일 배열로 변환
      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file)); // 각 파일에 대한 URL 생성
      setImagePreviews(imageUrls); // URL 상태로 저장

      // 메모리 누수 방지 위해 URL 해제
      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [watchImages]);

  const handleImageRemove = (index: number) => {
    const updatedImages = Array.from(watchImages).filter((_, i) => i !== index);

    // react-hook-form의 setValue로 FileList 업데이트
    const dataTransfer = new DataTransfer();
    updatedImages.forEach((file) => dataTransfer.items.add(file));
    setValue("images", dataTransfer.files);

    // 미리보기 이미지 업데이트
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  const customFileLabel =
    watchImages && watchImages.length > 0
      ? `${watchImages.length}개의 파일 선택됨`
      : "파일 선택";

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {/* 부동산 종류*/}
      <DropdownSelector
        selectedValue={selectedEstateType}
        setSelectedValue={setSelectedEstateType}
        register={register}
        errors={errors}
        options={estateOptions}
        name="estateType"
        errorMessage="부동산 종류는 필수항목입니다."
        placeholder="종류를 선택해주세요."
        label="종류"
        trigger={trigger}
        setValue={setValue}
      />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 위치 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        위치
      </label>
      <div className="flex gap-x-[20px]">
        {/* 국가 선택 */}
        <div className="relative flex flex-1">
          <div className="absolute left-[15px] top-[17px]">
            <LocationIcon />
          </div>
          <button
            type="button"
            {...register("countryCode", { required: true })}
            className="pl-[36px] block border w-full flex-1 text-[#A3A3A3] text-sm rounded-lg h-[50px] text-start bg-[#F6F6F6]"
            onClick={() => {
              setIsCountryDropdownOpen((prev) => !prev);
            }}
          >
            {selectedCountry ? (
              <div className="flex flex-row gap-x-[4px] items-center justify-start">
                {
                  countries.find((country) => country.code === selectedCountry)
                    ?.icon
                }
                <span>
                  {
                    countries.find(
                      (country) => country.code === selectedCountry
                    )?.name
                  }
                </span>
              </div>
            ) : (
              "국가를 선택해주세요"
            )}
          </button>

          {/* 국가 선택 드롭다운 */}
          {isCountryDropdownOpen && (
            <div className="top-[50px] absolute w-[95%] left-[24px] z-20  bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries.map(({ code, name, icon }) => (
                <button
                  key={code}
                  onClick={() => handleCountrySelect(code)}
                  className="w-full text-left flex items-center space-x-[10px] px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
                >
                  {icon}
                  <span>{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 우편번호 */}
        <div className="flex flex-1">
          <input
            type="number"
            {...register("zipCode", { required: true })}
            className="block border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px] w-full"
            placeholder="우편번호를 입력해주세요"
          />
        </div>
      </div>

      {/* 상세주소 */}
      <input
        type="text"
        {...register("location", { required: true })}
        className="mt-[10px] block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
        placeholder="상세 주소 입력"
      />

      <div className="flex  h-[150px] w-full  mt-[20px] rounded-lg">
        {/* 매물 위치 */}
        <div className="rounded-md flex flex-1 bg-[#F6F6F6] text-sm text-[#0676FC] items-center justify-center ">
          등록하실 매물의 위치를 표시합니다.
        </div>
      </div>

      {/* 상세주소 유의사항 */}
      <div className="flex flex-1 flex-col mt-[10px] gap-y-[5px]">
        <span className="text-xs ">상세주소 유의사항</span>
        <p className="text-xs text-[#A3A3A3]">
          상세주소가 정확하지 않으면 등기부등본 조회시 등록이 취소됩니다.
        </p>
        <p className="text-xs text-[#A3A3A3]">
          주소 및 면적 불일치로 검증이 실패될 경우 별도의 소명 기회 없이 수정,
          환불이 불가합니다.
        </p>
      </div>

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 입주날짜 */}
      <div className="flex flex-row gap-x-[20px]">
        <div className="flex flex-col flex-1">
          <label className="block text-xs text-[#808080] mb-[10px]">
            입주날짜
          </label>
          <SingleDateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            register={register}
            errors={errors}
            name="selectedDate"
            placeholder="입주날짜를 선택해주세요"
            setValue={setValue}
          />
          {/* 즉시입주 버튼 */}

          <button type="button" onClick={handleTodayClick}>
            <div className="flex flex-row mt-[10px] items-start justify-start">
              {isTodayDateClicked ? (
                <>
                  {" "}
                  <CheckColorIcon color="black" />{" "}
                  <span className="text-xs ">즉시입주</span>
                </>
              ) : (
                <>
                  <CheckColorIcon color="#A3A3A3" />{" "}
                  <span className="text-[#A3A3A3] text-xs ">즉시입주</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* 기간 */}
        <div className="flex flex-1">
          <DropdownSelector
            selectedValue={selectedTimePeriod}
            setSelectedValue={setSelectedTimePeriod}
            register={register}
            errors={errors}
            options={timePeriodOptions}
            name="estateType"
            errorMessage="입주 기간은 필수항목입니다."
            placeholder="기간을 선택해주세요."
            label="기간"
            trigger={trigger}
            setValue={setValue}
          />
        </div>
      </div>

      <div className="flex flex-row mt-[40px] gap-x-5">
        {/* 가격 */}
        <div className="flex flex-col flex-1 w-full relative">
          <label className="block text-xs text-[#808080] mb-[10px]">가격</label>
          <input
            type="number"
            value={price?.toString()}
            onChange={(e) => setPrice(parseInt(e.target.value, 10))}
            placeholder="가격을 입력해주세요."
            className=" block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
            style={{
              WebkitAppearance: "none", // Chrome, Safari, Edge
              MozAppearance: "textfield", // Firefox
            }}
          />
          <span className="absolute right-[15px] top-[40px]">원 / 월</span>
        </div>

        {/* 보증금 */}
        <div className="flex flex-row flex-1 ">
          <div className="flex flex-col flex-1 w-full relative">
            <label className="block text-xs text-[#808080] mb-[10px]">
              보증금
            </label>
            <input
              type="number"
              value={isNoDepositChecked ? "" : deposit || ""}
              disabled={isNoDepositChecked}
              onChange={(e) => setDeposit(parseInt(e.target.value, 10))}
              placeholder="보증금을 입력해주세요"
              className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
            />
            <span className="absolute right-[15px] top-[40px]">원</span>

            {/* 보증금 없어요 버튼 */}
            <button type="button" onClick={handleNoDepositClick}>
              <div className="flex flex-row mt-[10px] items-start justify-start">
                {isNoDepositChecked ? (
                  <>
                    {" "}
                    <CheckColorIcon color="black" />{" "}
                    <span className="text-xs ">보증금 없어요</span>
                  </>
                ) : (
                  <>
                    <CheckColorIcon color="#A3A3A3" />{" "}
                    <span className="text-[#A3A3A3] text-xs ">
                      보증금 없어요
                    </span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 침실 수 */}
      <div className=" flex flex-row gap-x-[20px]">
        <div className="flex flex-col flex-1 w-full relative">
        <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            침실 수
          </label>
          <input
            type="number"
            value={bedroomNumber ? bedroomNumber : ""}
            onChange={(e) =>
              setBedroomNumber(Number(parseFloat(e.target.value).toFixed(1)))
            }
            placeholder="침실 수를 입력해주세요"
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
            style={{
              WebkitAppearance: "none", // Chrome, Safari, Edge
              MozAppearance: "textfield", // Firefox
            }}
          />
        </div>

        {/* 욕실 수 */}
        <div className="flex flex-col flex-1 w-full">
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            욕실 수
          </label>
          <input
            type="number"
            value={ bathroomNumber ? bathroomNumber : ""}
            onChange={(e) =>
              setBathroomNumber(Number(parseFloat(e.target.value).toFixed(1)))
            }
            placeholder="욕실 수를 입력해주세요."
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
            style={{
              WebkitAppearance: "none", // Chrome, Safari, Edge
              MozAppearance: "textfield", // Firefox
            }}
          />

        
        </div>
      </div>
      {/* 면적 */}
      <div className="flex flex-row gap-x-[20px]">
        <div className="flex flex-col flex-1 w-full relative">
          <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
            면적
          </label>
          <input
            type="number"
            value={area?.toString()}
            onChange={(e) =>
              setArea(Number(parseFloat(e.target.value).toFixed(1)))
            }
            placeholder="면적을 입력해주세요."
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
            style={{
              WebkitAppearance: "none", // Chrome, Safari, Edge
              MozAppearance: "textfield", // Firefox
            }}
          />
          <span className="absolute right-[15px] top-[80px]">ft²</span>
        </div>

        {/* 성별 */}
        <div className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 w-full">
            <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
              성별
            </label>
            <div className="flex flex-row gap-x-3">
              {sexOptions.map((option, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSexType(option.value)}
                  className={`w-[100px] h-[50px] text-[14px] border border-[#EEEEEE] flex items-center justify-center rounded-lg ${
                    sexType === option.value
                      ? "bg-[#E62A2F] text-white border-none"
                      : "bg-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 조건/편의 */}
      <div className="flex flex-row flex-1 mt-[40px]">
        <div className="flex flex-col flex-1 w-full pt-1">
          <label className="block mb-2 text-xs">조건/편의</label>
          <div className="flex flex-row gap-x-2">
            {conditionsOptions.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleConditionsClick(option.value)}
                className={`w-[94px] h-[50px] border border-[##eeeeee] rounded-lg flex flex-wrap items-center justify-center text-[##a3a3a3] text-sm ${
                  selectedConditions.includes(option.value)
                    ? "bg-[#E62A2F] text-white border-none"
                    : "bg-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 기타 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        기타 (선택)
      </label>
      <input
        type="text"
        className="mt-[10px] block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px] rounded-lg p-[15px]"
        placeholder="기타사항을 입력해주세요"
      />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 소개 */}
      {/* 제목 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        매물 소개
      </label>
      <input
        type="text"
        {...register("title", { required: true })}
        className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
rounded-lg p-[15px]"
        placeholder="제목을 입력해주세요"
      />

      {/* 본문 */}
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        내용
      </label>
      <QuillEditor
        register={register}
        placeholder={"해당 집 내용을 자세히 작성해주세요."}
        trigger={trigger}
        name="introduction"
        errors={errors}
        value={content}
        onChange={(value) => {
          setContent(value);
          setValue("introduction", value);
          trigger("introduction");
        }}
      />

      {/* 이미지 업로드 */}
      <div>
        <div className="relative w-max mt-2">
          <input
            type="file"
            accept="image/*"
            {...register("images")}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="px-4 py-2 bg-[#E62A2F] text-white rounded-md text-center cursor-pointer">
            {customFileLabel}
          </div>
        </div>
        <p className="mt-[10px]">
          {watchImages
            ? `10개 중 ${watchImages.length}개 업로드됨`
            : "10개 중 0개 업로드"}
        </p>

        {/* 이미지 미리보기 섹션 */}
        <div className="flex flex-wrap gap-4 mt-4">
          {imagePreviews.map((src, index) => (
            <div
              key={index}
              className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden"
              onClick={() => handleImageRemove(index)}
            >
              <img
                src={src}
                alt={`미리보기 ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {/* 안내사항 */}
      <label className="block text-xs text-[#808080] mb-[10px]">안내사항</label>
      <textarea
        {...register("information", { required: true })}
        className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[150px]
rounded-lg p-[15px]"
        placeholder={`안내사항을 입력하세요. \n예) 타인을 배려하는 마음을 갖고 신청해주세요`}
      />
      {errors.information && (
        <p className="text-red-500">안내사항 입력은 필수항목입니다.</p>
      )}

      {/* 작성완료 */}
      <div className="flex items-center justify-center mt-[80px] mb-[150px]">
        <input
          type="submit"
          className="py-[19px] px-[124px] w-[300px] rounded-lg bg-[#E62A2F] text-white hover:cursor-pointer"
          value="작성완료"
        />
      </div>
    </form>
  );
}
