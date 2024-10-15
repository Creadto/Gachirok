'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

/**
 * @Description 알림을 띄우는 모달창
 * @author 김영서
 **/
interface CustomAlertProps {
  message: string;
  onClose: () => void;
  route: string
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, route }) => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push(`${route}`);
    router.refresh(); // Navigate to the desired page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="p-6 text-center bg-white rounded-lg shadow-lg">
        <p className="mb-4 text-lg font-semibold">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 text-white bg-[#E62A2F] rounded focus:outline-none focus:ring-2 focus:ring-[#E62A2F]"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;