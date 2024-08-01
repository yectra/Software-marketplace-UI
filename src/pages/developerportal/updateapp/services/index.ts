import { apiClient } from "@/common/hooks/useApiClient";
import { UpdateAppdetails,  getLatestVersion } from "@/pages/developerportal/updateapp/models";

const {httpPut,httpGet} =apiClient();

export interface IAppManagementService{
    uploadAppdetails(appDetails:FormData):Promise<any>;
    updateAppdetails(appDetails:UpdateAppdetails):Promise<any>;
    getLatestVersion(appDetails:getLatestVersion):Promise<any>;
}

export class AppManagementService implements IAppManagementService{
    uploadAppdetails(appDetails:FormData): Promise<any> {
        return httpPut('/developer/request',appDetails).
        then((response)=>response)
    }
    updateAppdetails(appDetails: UpdateAppdetails): Promise<any> {
        return httpPut('/developer/request',appDetails).
        then((response)=>response);
    }
    getLatestVersion(appDetails: getLatestVersion): Promise<any> {
        return httpGet(`/developer/version/${appDetails.email}/${appDetails.appName}`).
        then((response)=>response);
    }
}