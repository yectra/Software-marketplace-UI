import { apiClient } from "@/common/hooks/useApiClient";
import { UpdateDeveloperDetails } from "../models";



const { httpGet,httpPut} = apiClient();

export interface IDeveloperInfo{
    getDeveloperProfile(email:string):Promise<any>;
    saveDeveloperInfo(developerDetails:UpdateDeveloperDetails):Promise<any>;

}
    

export class DeveloperInfo implements IDeveloperInfo{
  getDeveloperProfile(email: string): Promise<any> {
      return httpGet(`developer/profile/${email}`).
      then((response)=>response)
  }

  saveDeveloperInfo(developerDetails:UpdateDeveloperDetails): Promise<any> {
    return httpPut('developer/profile-save',developerDetails)
    .then((response)=>response)
    
  }
}