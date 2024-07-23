
  
 export class DeveloperApp {
    appDescription: string;
    appName: string;
    createdGit: string;
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
    version: string;
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
