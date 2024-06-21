
 export interface AppVersion {
    v: string;
    githublink: string;
    dockerhublink: string;
  }
  
  export interface App {
    appname: string;
    status: string;
    versions: AppVersion[];
  }
  
  export interface Data {
    username: string;
    email: string;
    apps: App[];
  }
  
  export interface ApprovalData {
    isApproval: boolean;
    appname: string;
    email: string;
    version: string;
    githublink: string;
    dockerhublink: string;
    feedback: string;
  }

 export interface StatsData {
    label: string;
    value: number;
}
