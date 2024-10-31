import axios from "axios";

interface HandleMediaUploadProps {
  photoURL: string[];
  accessToken: string | undefined;
  targetPrefix: string
}

export const HandleMediaUpload = async ({
  photoURL,
  accessToken,
  targetPrefix
}: HandleMediaUploadProps) => {
  const results = await Promise.all(
    photoURL.map(async (url) => {
      if (!url.includes("https://")) {
        const fileExtension = getFileExtensionFromDataUrl(url);
        const byteInformation = getBytesFromUrl(url);

        // fileExtension이 null이 아닌 경우에만 getPresignedUrl 호출
        if (fileExtension) {
          const presignedUrl = await getPresignedUrl(
            fileExtension,
            accessToken,
            targetPrefix
          );
          if (presignedUrl) {
            const imageUploaadResponse = await uploadImageToPresignedUrl(
              byteInformation,
              presignedUrl
            );
            if (imageUploaadResponse) {
              url = presignedUrl.split("?")[0]
            }
          }
        }
      }
      return url; 
    })
  );

  return results; // 모든 결과 반환
};


const getFileExtensionFromDataUrl = (dataUrl: string) => {
  // data:image/png;base64,... 형식에서 MIME 타입 부분을 추출
  const matches = dataUrl.match(/data:([^;]+);base64,/); // 세미콜론 이전의 모든 문자열 캡처

  if (matches && matches[1]) {
    const mimeType = matches[1]; // 예: image/png
    const extension = mimeType.split("/")[1]; // MIME 타입에서 확장자 부분을 추출 (png)
    return extension; // png 반환
  }

  return null; // 유효한 data URL이 아닌 경우 null 반환
};

//이미지 타입을 byte으로 변환하는 함수
const getBytesFromUrl = (dataUrl: string) => {
  const base64String = dataUrl.split(",")[1];

  // Base64 디코딩
  try {
    const binaryString = atob(base64String);

    // 디코딩된 결과를 바이트 배열로 변환
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  } catch (error) {
    console.error("Error decoding base64:", error);
    return new Uint8Array(); // 오류 발생 시 빈 배열 반환
  }
};

// Presigned URL을 가져오는 비동기 함수
const getPresignedUrl = async (
  fileExtension: string,
  accessToken: string | undefined,
  targetPrefix: string
) => {
  try {
    const response = await axios.get("/api/v1/files/presigned-url", {
      params: {
        targetPrefix: targetPrefix, // 쿼리 파라미터 설정
        contentType: fileExtension.toUpperCase(), // 쿼리 파라미터 설정
      },
      headers: {
        Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 accessToken 추가
      },
    });

    if (response) {
      // console.log(response.data.url); // 응답 데이터 출력
      return response.data.url; // 응답 데이터 반환 (필요에 따라 조정 가능)
    }
  } catch (error) {
    console.error("Error fetching presigned URL:", error); // 오류 출력
  }

  return null; // 실패한 경우 null 반환
};

const uploadImageToPresignedUrl = async (
  byteImage: Uint8Array,
  presignedUrl: string
) => {
  try {
    const response = await axios.put(presignedUrl, byteImage, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
  return false;
};