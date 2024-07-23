import { apiClient } from "@/common/hooks/useApiClient";

import { CreateAppDetails } from "@/pages/developerportal/developmentstarter/model";



const { httpPost} = apiClient();

export interface ICreateApp{
    createApp(Appdetails:CreateAppDetails):Promise<any>;
}
export class CreateApp implements ICreateApp{
    createApp(Appdetails: CreateAppDetails): Promise<any> {
        console.log(Appdetails);
        return httpPost('/developer/createapp',Appdetails).
        then((response)=>response);
    }
}