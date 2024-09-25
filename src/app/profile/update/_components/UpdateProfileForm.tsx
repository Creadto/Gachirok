
import { ProfileUI } from "@/app/profile/_types/ProfileUI";
import { ChangeEvent } from "react";

interface UpdateProfileFormProps {
    profile: ProfileUI | null;
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

const UpdateProfileForm:  React.FC<UpdateProfileFormProps> = ({ profile, onInputChange, onCheckboxChange }) => {

    return(
        <div className="space-y-6">
        <label className="block">
          <span className="text-gray-700">Traveler</span>
          <input
            required
            type="checkbox"
            name="traveler"
            checked={profile?.traveler || false}
            onChange={(e) =>
                onInputChange({
                target: { name: "traveler", value: e.target.checked },
              } as any)
            }
            className="ml-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Residence Year</span>
          <input
            required
            type="number"
            name="residenceYear"
            value={profile?.residenceYear}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Nickname</span>
          <input
            required
            type="text"
            name="nickname"
            value={profile?.nickname || ""}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Residence Country Code</span>
          <input
            required
            type="text"
            name="residenceCountryCode"
            value={profile?.residenceCountryCode || ""}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Residence State Code</span>
          <input
            required
            type="text"
            name="residenceStateCode"
            value={profile?.residenceStateCode || ""}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Residence City Code</span>
          <input
            required
            type="text"
            name="residenceCityCode"
            value={profile?.residenceCityCode || ""}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Introduction</span>
          <textarea
            required
            name="introduction"
            value={profile?.introduction || ""}
            onChange={onInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>

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
                required
                type="checkbox"
                name="interests"
                value={interest}
                checked={profile?.interests.includes(interest)}
                onChange={onCheckboxChange}
                className="form-checkbox"
              />
              <span>{interest}</span>
            </div>
          ))}
        </label>

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
                required
                type="checkbox"
                name="expertises"
                value={expertise}
                checked={profile?.expertises.includes(expertise)}
                onChange={onCheckboxChange}
                className="form-checkbox"
              />
              <span>{expertise}</span>
            </div>
          ))}
        </label>

        </div>
    )
}

export default UpdateProfileForm;