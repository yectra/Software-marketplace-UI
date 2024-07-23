import { apiClient } from "@/common/hooks/useApiClient";
import { AddReviewForm, Answerparams, QuestionParams } from "@/pages/userportal/appoverview/models";



const { httpGet,httpPost} = apiClient();

export interface IGetApplications{
    getApplicationdetails(appId:string):Promise<any>;
    getApplicationOverview(appId:string):Promise<any>;
    getApplicationOverallRating(appId:string):Promise<any>;
    addApplicationRating(appId:string,reviewForm:AddReviewForm):Promise<any>;
    addVoteForRating(appId:string,reviewId:string,voteType:boolean):Promise<any>;
    getQnAforApps(appId:string):Promise<any>;
    addQuestionsForApps(appId:string,questions:QuestionParams):Promise<any>;
    addAnswerForQuestions(appId:string,questionId:string,answers:Answerparams):Promise<any>;
}

export class GetApplications implements IGetApplications{
   getApplicationdetails(appId:string): Promise<any> {
       return httpGet(`user/approved-apps/${appId}`)
   }
   getApplicationOverview(appId: string): Promise<any> {
       return httpGet(`/user/approved-apps/${appId}/overview`)
   }
   getApplicationOverallRating(appId: string): Promise<any> {
       return httpGet(`/user/approved-apps/${appId}/overall-ratings`)
   }
   addApplicationRating(appId: string,reviewForm:AddReviewForm): Promise<any> {
       return httpPost(`user/approved-apps/${appId}/add-rating`,reviewForm)
   }
   addVoteForRating(appId: string, reviewId: string,voteType:boolean): Promise<any> {
       return httpPost(`/user/approved-apps/${appId}/review/${reviewId}/vote`,{voteType:voteType})
   }
   getQnAforApps(appId: string): Promise<any> {
       return httpGet(`/user/approved-apps/${appId}/questions-answers`)
   }

   addQuestionsForApps(appId: string, questions: QuestionParams): Promise<any> {
       return httpPost(`/user/approved-apps/${appId}/questions`,questions)
   }

   addAnswerForQuestions(appId: string,questionId:string,answers:Answerparams): Promise<any> {
       return httpPost(`/user/approved-apps/${appId}/questions/${questionId}/answers`,answers)
   }



}