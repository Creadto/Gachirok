import {http, HttpResponse } from 'msw';
import {mockNewsData} from "@/app/news/universal/_mock/mockNewsData";
import {numberToCategory} from "@/app/news/utils/Category";
import {mockReplyData} from "@/app/news/universal/_mock/mockReplyData";
import {mockAnnouncementData} from "@/app/announcement/_mock/mockAnnouncementData";
import {AnNumberToCategory} from "@/app/announcement/utils/Category";

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

        const news = mockNewsData.find((news)=>news.id === parseInt(params.newsId,10))

        return HttpResponse.json({
            news
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
   *   뉴스 개수 가져오는 API (실패함)
   */
    http.get('/api/news/total',()=>{
        return HttpResponse.json({
            newsDataLength: "gkgkgkgk"
        })
    }),
    /**
     * 전체 공지 사항 페이지네이션 해서 가져오는 API
     */
    http.get('/api/announcements/section/:sectionId',({params,request})=>{

        let announcementData;

        const category = AnNumberToCategory[params.sectionId];

        if(category === "전체"){
            announcementData = mockAnnouncementData;
        }
        else{
            announcementData = mockAnnouncementData.filter((data)=>data.category === category)
        }

        const url = new URL(request.url)
        const page= url.searchParams.get('page');
        const limit = url.searchParams.get('limit');
        const sort = url.searchParams.get('sort');

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const startIndex = (pageNumber-1)*limitNumber;
        const endIndex = startIndex+limitNumber;

        if(sort === "newest"){
            announcementData = announcementData.sort((a,b)=>{
                if(a.date > b.date){
                    return -1;
                }
                else if(a.date < b.date){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }
        else if(sort === "popular"){
            announcementData = announcementData.sort((a,b)=>{
                if(a.popular > b.popular){
                    return -1;
                }
                else if(a.popular < b.popular){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }
        else if(sort === "likes"){
            announcementData = announcementData.sort((a,b)=>{
                if(a.likes > b.likes){
                    return -1;
                }
                else if(a.likes < b.likes){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }
        else if(sort === "comments"){
            announcementData = announcementData.sort((a,b)=>{
                if(a.comments > b.comments){
                    return -1;
                }
                else if(a.comments < b.comments){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }

        const paginatedNews = announcementData.slice(startIndex, endIndex);

        const totalItems = announcementData.length;

        return HttpResponse.json({
            announcementData:paginatedNews,
            currentPage:pageNumber,
            totalPages: Math.ceil(totalItems/limitNumber),
            length : totalItems,
        })
    }),
    /*
    *   공지 ID에 해당하는 단일 공지를 가져오는 API ( 뉴스랑 똑같음 )
    */
    http.get('/api/announcement/:announcementId',({params})=>{

        const announcement = mockAnnouncementData.find((news)=>news.id === parseInt(params.announcementId,10))

        return HttpResponse.json({
            announcement
        })
    }),
    /*
    *   공지에 작성되어 있는 댓글 목록을 가져오는 API
    */
    http.get('/api/announcement/:announcementId/reply',({params})=>{
        const repliesData = mockReplyData.filter((reply)=> reply.id === parseInt(params.announcementId,10));
        return HttpResponse.json({
            repliesData
        })
    }),



]