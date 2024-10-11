import { setupWorker } from 'msw/browser';
import { handlers } from './handlers'; // 요청을 처리할 핸들러들을 정의한 파일

// 서비스 워커를 설정하고 핸들러 목록을 전달
const worker = setupWorker(...handlers);

export default worker;