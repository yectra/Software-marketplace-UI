import { apiClient } from "@/common/hooks/useApiClient";
import { ApprovalStatus } from "@/pages/developerportal/developerappdetails/model";



const { httpPost,httpGet} = apiClient();

export interface IAppInfo{
    getAppsbasedonStatus(status:ApprovalStatus):Promise<any>;
    getAppsBySearch(email:string,value:string):Promise<any>;
}

export class AppInfo implements IAppInfo{
    getAppsbasedonStatus(status: ApprovalStatus): Promise<any> {
        return httpPost('/developer/devdisplay',status).
        then((response)=>response)
    }

    getAppsBySearch(email: string, value: string): Promise<any> {
        return httpGet(`/developer/devsearch/${email}/${value}`).
        then((response)=>response)
    }
}