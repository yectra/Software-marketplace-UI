
import { apiClient } from "@/common/hooks/useApiClient";
import { AddToMarketplace, ApprovalData, ReviewData, SaveDeploymentUrl } from "@/pages/adminpanel/admindashboard/models";

const { httpPut ,httpGet} = apiClient();

export interface IAdminService{
getPendingRequests():Promise<any>;
getRequestsCount():Promise<any>;
getApprovedRequests():Promise<any>;
getDeniedRequests():Promise<any>;
approveDeveloperRequests(approveForm:ApprovalData):Promise<any>;
submitReviewForm(reviewForm:ReviewData):Promise<any>;
getDeployedApps():Promise<any>;
getDeploymentDetailsofApps(email:string,appName:string):Promise<any>;
submitDeploymentUrl(deploymentUrls:SaveDeploymentUrl):Promise<any>;
moveToMarketplace(appdetail:AddToMarketplace):Promise<any>;
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

    getDeployedApps(): Promise<any> {
        return httpGet('admin/deployment/display')
        .then((response)=>response)
    }

    getDeploymentDetailsofApps(email:string,appName:string): Promise<any> {
        return httpGet(`admin/deployment/appdetail/${email}/${appName}`)
        .then((response)=>response) 
    }

    submitDeploymentUrl(deploymentUrls: SaveDeploymentUrl): Promise<any> {
        return httpPut('admin/deployment-link',deploymentUrls)
        .then((response)=>response)
    }

    moveToMarketplace(appdetail: AddToMarketplace): Promise<any> {
        return httpPut('admin/deployment/website',appdetail)
        .then((response)=>response)
    }





}