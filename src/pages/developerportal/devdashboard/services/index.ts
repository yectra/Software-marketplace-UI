import { apiClient } from "@/common/hooks/useApiClient";



const { httpGet} = apiClient();

export interface IDeveloperInfo{
    getDeveloperProfile(email:string):Promise<any>;

}
    

export class DeveloperInfo implements IDeveloperInfo{
  getDeveloperProfile(email: string): Promise<any> {
      return httpGet(`developer/profile/${email}`).
      then((response)=>response)
  }
}