"use server"

import {JSDOM} from 'jsdom'
import { HandleSingleMediaUpload } from './handleSingleMediaUpload';
import { HandleHtmlContentUpload } from './handleHtmlContentUpload';

export const replaceImageWithS3 = async (
  htmlContent: string,
  accessToken: string | undefined,
  targetPrefix: string
) => {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const imgTags = document.querySelectorAll("img");

  let firstImageS3Url: string | null = null; // 변환된 첫 번째 이미지 URL 저장

  // 비동기 처리를 위해 for...of를 사용하여 이미지 태그를 순회
  for (const img of Array.from(imgTags)) {
    const src = img.getAttribute("src");

    if (src && src.startsWith("data:")) {
      const s3Url = await HandleHtmlContentUpload({
        photoUrl: src,
        accessToken,
        targetPrefix,
      });
      if (s3Url) {
        img.setAttribute("src", s3Url);

        // 첫 번째 이미지의 S3 URL 저장
        if (!firstImageS3Url) {
          firstImageS3Url = s3Url;
        }
      }
    } else if (src && src.startsWith("http")) {
      const s3Url = await HandleSingleMediaUpload({
        photoUrl: src,
        accessToken,
        targetPrefix,
      });
      if (s3Url) {
        img.setAttribute("src", s3Url);

        // 첫 번째 이미지의 S3 URL 저장
        if (!firstImageS3Url) {
          firstImageS3Url = s3Url;
        }
      }
    }
  }

  // 첫 번째 이미지가 변환되었다면 thumbnailPhotoUrl 설정
  if (firstImageS3Url) {
    // 다음에 필요한 곳에서 thumbnailPhotoUrl로 사용 가능
    return { htmlContent: document.documentElement.outerHTML, thumbnailPhotoUrl: firstImageS3Url };
  }

  // 변환된 HTML 반환
  return { htmlContent: document.documentElement.outerHTML, thumbnailPhotoUrl: null };
};