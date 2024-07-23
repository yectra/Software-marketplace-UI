
import { apiClient } from "@/common/hooks/useApiClient";
import { ApprovalData, ReviewData } from "@/pages/adminpanel/admindashboard/models";

const { httpPut ,httpGet} = apiClient();

export interface IAdminService{
getPendingRequests():Promise<any>;
getRequestsCount():Promise<any>;
getApprovedRequests():Promise<any>;
getDeniedRequests():Promise<any>;
approveDeveloperRequests(approveForm:ApprovalData):Promise<any>;
submitReviewForm(reviewForm:ReviewData):Promise<any>;

}

export class AdminService implements IAdminService{
    getPendingRequests(): Promise<any> {
        return httpGet(`/admin/admindisplay/inprogress`).
        then((response)=>response);
    }

    getRequestsCount(): Promise<any> {
        return httpGet('/admin/requests').then((response)=>response)
    }

    getApprovedRequests(): Promise<any> {
        return httpGet('admin/admindisplay/accepted').
        then((response)=>response)
    }

    getDeniedRequests(): Promise<any> {
        return httpGet('admin/admindisplay/denied').
        then((response)=>response)
    }
    approveDeveloperRequests(approveForm:ApprovalData): Promise<any> {
        return httpPut('admin/approval',approveForm).
        then((response)=>response)
        
    }

    submitReviewForm(reviewForm: ReviewData): Promise<any> {
        return httpPut('admin/save-analysis',reviewForm).
        then((response)=>response)
    }


}