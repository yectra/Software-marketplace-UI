
  
  export interface AppDetails{
    appName:string,
    shortDescription:string,
    overallRating:number,
    icon:string,
    appImg:string
  }

  export interface AppOverview{
    shortDescription:string,
    appName:string,
    appDescription:string,
    createdAt:string,
    appImage:string,
    latestUpdatedOn:string,
    latestUpdateVersion:string
  }

  export interface AddReviewForm{
    userEmail:string,
    userName:string,
    rating:string,
    review:string
  }

  interface Review {
    _id: string;
    userName: string;
    timestamp: string;
    userEmail: string;
    likes: number;
    dislikes: number;
    rating: number;
    review: string;
  }

  export interface OverallRatingResponse {
    overallRating: number;
    ratingCounts: {
      [key: number]: number;
    };
    totalRatings: number;
    totalReviews: number;
    reviews: Review[];
  }

 export  interface QuestionAnswerResponse {
    questionId: string;
    userName: string;
    userEmail: string;
    timestamp: string;
    userProfilePic: string;
    answers: Answer[];
    questionText:string
  }
  
 export  interface Answer {
    _id: string;
    timestamp: string;
    userProfilePic: string;
    answerText:string
  }

  export interface QuestionParams{
    userName:string,
    userEmail:string,
    questionText:string
  }

  export interface Answerparams{
    userName:string,
    userEmail:string,
    answerText:string

  }