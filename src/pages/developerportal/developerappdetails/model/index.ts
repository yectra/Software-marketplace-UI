export class MyAppsData {
    appName: string;
    status: string;
    versions: AppVersion[];
    size: string;
    published: boolean;
  }

  export class ApprovalStatus{
    email:string;
    status:string;
  }

  export class AppVersion {
    appVersion: string;
    approvedStatus: string;
    dockerHubLink: string;
    gitHubLink: string;
    status: string;
    updatedOn: string;
    versionDescription: string;
    versionFeedback: any[];
  }

