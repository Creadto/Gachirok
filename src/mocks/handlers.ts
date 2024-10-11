import {http, HttpResponse } from 'msw';
import {mockNewsData} from "@/app/news/universal/_mock/mockNewsData";
import {numberToCategory} from "@/app/news/utils/Category";
import {mockReplyData} from "@/app/news/universal/_mock/mockReplyData";

export const handlers = [
    /*
    *    (Universal)뉴스 카테고리에 해당하는 뉴스들을 가져오는 API
    */
    http.get(`/api/news/section/:sectionId`,({params})=>{
        const id = numberToCategory[params.sectionId];
        const sectionNews = mockNewsData.filter((newsData)=>newsData.category === id);

        return HttpResponse.json({
            sectionNews
        })
    }),
    /*
   *    (Local)뉴스 카테고리에 해당하는 뉴스들을 가져오는 API(미완성)
   */
    http.get(`/api/news/:countryCode/section/:sectionId`,({params})=>{
        const id = numberToCategory[params.sectionId];
        const countryCode= params.countryCode;
        const sectionNews = mockNewsData.filter((newsData)=>newsData.category === id);

        return HttpResponse.json({
            sectionNews
        })
    }),
    /*
    *   뉴스 ID에 해당하는 단일 뉴스를 가져오는 API
    */
    http.get('/api/news/:newsId',({params})=>{

        const newsData = mockNewsData.find((news)=>news.id === parseInt(params.newsId,10))

        return HttpResponse.json({
            newsData
        })
    }),
    /*
    *   뉴스에 작성되어 있는 댓글 목록을 가져오는 API
    */
    http.get('/api/news/:newsId/reply',({params})=>{
        const repliesData = mockReplyData.filter((reply)=> reply.id === parseInt(params.newsId,10));
        return HttpResponse.json({
            repliesData
        })
    }),
    /*
    *   뉴스에 댓글 작성하는 API
    */
    http.post('/api/news/:newsId/reply',({params,request})=>{

        return HttpResponse.json({
            message: "댓글 등록 성공~"
        })
    }),
    /*
   *   뉴스 개수 가져오는 API
   */
    http.get('/api/news/total',()=>{
        return HttpResponse.json({
            newsDataLength: "gkgkgkgk"
        })
    }),

]