import { apiClient } from "@/common/hooks/useApiClient";
import { AddReviewForm } from "../models";



const { httpGet,httpPost} = apiClient();

export interface IGetApplications{
    getApplicationdetails(appId:string,version_id:string):Promise<any>;
    getApplicationOverview(appId:string,version_id:string):Promise<any>;
    getApplicationReviews(app_id:string):Promise<any>;
    addApplicationReview(app_id:string,reviewData:AddReviewForm):Promise<any>;
  
}

export class GetApplications implements IGetApplications{
   getApplicationdetails(appId:string,version_id:string): Promise<any> {
       return httpGet(`user/appdetails/${appId}/${version_id}`)
   }
   getApplicationOverview(app_id: string,version_id:string): Promise<any> {
       return httpGet(`/user/app-overview/${app_id}/${version_id}`)
   }
   getApplicationReviews(app_id: string): Promise<any> {
       return httpGet(`/user/review/display/${app_id}`)
   }
   addApplicationReview(app_id: string,reviewData:AddReviewForm): Promise<any> {
       return httpPost(`/user/review/${app_id}`,reviewData)
   }

  

}