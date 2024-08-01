
 export class DeveloperApp {
    appDescription: string;
    appName: string;
    adminCreatedGit: string;
    deployInAzure: boolean;
    dockerHubLink: string;
    gitHubLink: string;
    updatedOn: string;
    updatedVersion: string;
    versionFeedback: ReviewData[]; 
    versionStatus: string;
  }
  
  export class AppDetails {
    userName: string;
    email: string;
    developerApps: DeveloperApp[];
  }
  
  export class ApprovalData {
    isApproval: boolean;
    appName: string;
    email: string;
    appVersion: string;
    readability: string;
    maintainability: string;
    vulnerability: string;
    security: string;
    memoryUsage:string;
    optimization:string;
    codeDescription: string;
    adminComments: string;
    ratings: RatingItem[];

  }

export class RatingItem {
  label: string;
  value: number;
}

export class ReviewData {
  readability: string;
  maintainability: string;
  vulnerability: string;
  security: string;
  memoryUsage:string;
  optimization:string;
  codeDescription: string;
  adminComments: string;
  ratings: RatingItem[];
  email:string;
  appName:string;
  version:string;
}

export class DeployedAppDetails{
  userName:string;
  email:string;
  appName:string;
  appType:string;
  location:string;
  resourceGroup:string;
  functionAppURL:string;
  staticWebAppURL:string;
  appLogo:string
}



export class DeployedAppOverview{
  adminApproval: boolean;
  adminCreatedGit: string;
  adminDeployInAzure: boolean;
  adminDeployInWebsite: boolean;
  adminVersionApproval: boolean;
  appDescription: string;
  appName: string;
  appVersion: string;
  app_id: string;
  approvedStatus: string;
  category: string;
  createdAt: string;
  dockerHubLink: string;
  functionAppURL: string;
  gitHubCreated: boolean;
  gitHubLink: string;
  keywords: string;
  location: string;
  resourceGroup: string;
  searchApp: string;
  shortDescription: string;
  staticWebAppURL: string;
  status: string;
  updatedOn: string;
  versionDescription: string;
  versionFeedback: any[];
  version_id: string;
}


export class SaveDeploymentUrl{
  email:string;
  appName:string;
  staticWebAppURL:string;
  functionAppURL:string;
  gitHubActions:string;
  location:string;
  resourceGroup:string;
}

export class AddToMarketplace{
  email:string;
  appName:string;
  appVersion:string
}