import { apiClient } from "@/common/hooks/useApiClient";



const { httpGet} = apiClient();

export interface IMarketplaceApplications{
    getAllApplications():Promise<any>;
}

export class MarketplaceApplications implements IMarketplaceApplications{
    getAllApplications(): Promise<any> {
        return httpGet('/user/userdisplay')
        .then(response=>response)
    }
}