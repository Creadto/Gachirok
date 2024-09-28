import { ProfileUI } from "@/app/profile/_types/ProfileUI";
import { ChangeEvent } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CountryStateCityUpdater from "./CountryStateCityUpdater";

interface UpdateProfileFormProps {
  profile: ProfileUI;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
}

/**
 * @Description 프로필을 업데이트 하는 Form(이미지 제외)
 * @author 김영서
 **/
const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  profile,
  onInputChange,
  onCheckboxChange,
  register,
  errors,
  setValue,
}) => {
  return (
    <div className="space-y-6">
      {/* 여행자/거주자 변경 */}
      <label className="block">
        <span className="text-gray-700">Traveler</span>
        <input
          {...register("traveler")}
          type="checkbox"
          checked={profile?.traveler || false}
          onChange={(e) =>
            onInputChange({
              target: { name: "traveler", value: e.target.checked },
            } as any)
          }
          className="ml-2"
        />
      </label>

      {/* 거주년수 변경 */}
      <label className="block">
        <span className="text-gray-700">Residence Year</span>
        <input
          {...register("residenceYear", { required: true })}
          type="number"
          value={profile?.residenceYear}
          onChange={onInputChange}
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.residenceYear && (
          <p className="text-red-500">거주년수는 필수항목입니다.</p>
        )}
      </label>

      {/* 닉네임 변경 */}
      <label className="block">
        <span className="text-gray-700">Nickname</span>
        <input
          type="text"
          value={profile?.nickname || ""}
          onChange={onInputChange}
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.nickname && (
          <p className="text-red-500">닉네임은 필수항목입니다.</p>
        )}
      </label>

      {/* Country, State, City 업데이트 */}
      <CountryStateCityUpdater profile={profile} setValue={setValue} />

      {/* 자기소개 */}
      <label className="block">
        <span className="text-gray-700">Introduction</span>
        <textarea
          {...register("introduction", { required: true })}
          value={profile?.introduction || ""}
          onChange={onInputChange}
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.introduction && (
          <p className="text-red-500">자기소개는 필수항목입니다.</p>
        )}
      </label>

      {/* 관심 분야 */}
      <label className="block">
        <span className="text-gray-700">Interests</span>
        {[
          "culture",
          "activity",
          "food",
          "self_development",
          "amity",
          "volunteer",
          "local",
        ].map((interest) => (
          <div key={interest} className="flex items-center space-x-2">
            <input
              {...register("interests", { required: true })}
              type="checkbox"
              value={interest}
              checked={profile?.interests.includes(interest)}
              onChange={onCheckboxChange}
              className="form-checkbox"
            />
            <span>{interest}</span>
          </div>
        ))}
        {errors.interests && (
          <p className="text-red-500">관심분야는 필수항목입니다.</p>
        )}
      </label>

      {/* 전문 분야 */}
      <label className="block">
        <span className="text-gray-700">Expertises</span>
        {[
          "culture",
          "activity",
          "food",
          "self_development",
          "amity",
          "volunteer",
          "local",
        ].map((expertise) => (
          <div key={expertise} className="flex items-center space-x-2">
            <input
              {...register("expertises", { required: true })}
              type="checkbox"
              value={expertise}
              checked={profile?.expertises.includes(expertise)}
              onChange={onCheckboxChange}
              className="form-checkbox"
            />
            <span>{expertise}</span>
          </div>
        ))}
        {errors.expertises && (
          <p className="text-red-500">전문분야는 필수항목입니다.</p>
        )}
      </label>
    </div>
  );
};

export default UpdateProfileForm;
