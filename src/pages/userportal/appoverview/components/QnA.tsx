// import React, { useEffect, useState } from "react";


// import { GetApplications } from "@/pages/userportal/appoverview/services";
// import { useLocation } from "react-router-dom";
// import useLoading from "@/common/hooks/useLoading";
// import LoadingBackdrop from "@/common/UI/LoadingBackdrop";
// import { getUserDetailsFromMsal } from "@/common/services/AuthHelper";

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Avatar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
// } from "@mui/material";

// import { useMsal } from "@azure/msal-react";

// interface QnAProps {}

// const QnA: React.FC<QnAProps> = () => {
//   const [questions, setQuestions] = useState<QuestionAnswerResponse[]>([]);
//   const [open, setOpen] = useState<boolean>(false);
//   const [newQuestion, setNewQuestion] = useState<string>("");
//   const [newAnswer, setNewAnswer] = useState<string>("");
//   const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
//     null
//   );
//   const location = useLocation();
//   const { isLoading, setLoading } = useLoading();
//   const { appId } = location.state;
//   const { accounts } = useMsal();
//   const getApplications = new GetApplications();

//   const userDetails = getUserDetailsFromMsal(accounts);

//   // const fetchQnA = () => {
//   //   setLoading(true);
//   //   getApplications
//   //     .getQnAforApps(appId)
//   //     .then((response) => {
//   //       setQuestions(response);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       setLoading(false);
//   //     });
//   // };

//   // useEffect(() => {
//   //   fetchQnA();
//   // }, [appId]);

//   const handleClickOpen = (questionId: string) => {
//     setSelectedQuestionId(questionId);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedQuestionId(null);
//     setNewQuestion("");
//     setNewAnswer("");
//   };

//   // const handleSubmitQuestion = async () => {
//   //   const newQuestionDetails: QuestionParams = {
//   //     userName: userDetails.name,
//   //     userEmail: userDetails.email,
//   //     questionText: newQuestion,
//   //   };
//   //   try {
//   //     setLoading(true);
//   //     const response = await getApplications.addQuestionsForApps(
//   //       appId,
//   //       newQuestionDetails
//   //     );
//   //     console.log(response);
//   //   } catch (err) {
//   //     console.error(err);
//   //   } finally {
//   //     fetchQnA();
//   //     setLoading(false);
//   //     setOpen(false);
//   //   }
//   // };

//   // const handleSubmitAnswer = async () => {
//   //   if (!selectedQuestionId || !newAnswer.trim()) {
//   //     return;
//   //   }
//   //   const answerDetails: Answerparams = {
//   //     userName: userDetails.name,
//   //     userEmail: userDetails.email,
//   //     answerText: newAnswer,
//   //   };
//   //   try {
//   //     setLoading(true);
//   //     const response = await getApplications.addAnswerForQuestions(
//   //       appId,
//   //       selectedQuestionId,
//   //       answerDetails
//   //     );
//   //     console.log(response);
//   //   } catch (err) {
//   //     console.error(err);
//   //   } finally {
//   //     fetchQnA();
//   //     setLoading(false);
//   //     handleClose();
//   //   }
//   // };

//   return (
//     <Box sx={{ p: 3 }}>
//       <LoadingBackdrop isLoading={isLoading} />
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h5" gutterBottom>
//           Q & A
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ mb: 3, bgcolor: "#0C9DBD", "&:hover": { bgcolor: "#087a95" } }}
//           onClick={() => setOpen(true)}
//         >
//           Ask A Question
//         </Button>
//       </Box>
//       <Grid container spacing={3}>
//         {questions.map((q) => (
//           <Grid item xs={12} key={q.questionId}>
//             <Card>
//               <CardContent sx={{ display: "flex" }}>
//                 <Avatar
//                   sx={{ width: 56, height: 56, mr: 2, bgcolor: "#0C9DBD" }}
//                 >
//                   {q.userName.charAt(0)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                     {q.questionText}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mt: 1 }}
//                   >
//                     {q.answers.length > 0
//                       ? q.answers[0].answerText
//                       : "No answers yet"}
//                   </Typography>
//                   {selectedQuestionId === q.questionId ? (
//                     <Box sx={{ mt: 2 }}>
//                       <TextField
//                         autoFocus
//                         fullWidth
//                         variant="outlined"
//                         value={newAnswer}
//                         onChange={(e) => setNewAnswer(e.target.value)}
//                         sx={{ mb: 1 }}
//                       />
//                       <Button
                        
//                         sx={{ bgcolor: "#0C9DBD", color: "white" }}
//                       >
//                         Send
//                       </Button>
//                     </Box>
//                   ) : (
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleClickOpen(q.questionId)}
//                       sx={{ mt: 1 }}
//                     >
//                       Reply
//                     </Button>
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Ask Question</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter your question about the app below.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             label="Your Question"
//             fullWidth
//             variant="outlined"
//             multiline
//             rows={2}
//             sx={{ mt: 2 }}
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} sx={{ color: "grey" }}>
//             Cancel
//           </Button>
//           <Button sx={{ color: "#0C9DBD" }}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default QnA;
