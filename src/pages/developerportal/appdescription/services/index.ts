import { apiClient } from "@/common/hooks/useApiClient";
import { Appparams } from "@/pages/developerportal/appdescription/models";


const { httpPost} = apiClient();


export interface IAppReport{
  
    getVersiondetails(requestAppdetails:Appparams):Promise<any>;

}

export  class AppReport implements IAppReport{
    getVersiondetails(requestAppdetails: Appparams): Promise<any> {
        return httpPost('developer/devdisplay/application',requestAppdetails).
        then((response)=>response)
    }
}