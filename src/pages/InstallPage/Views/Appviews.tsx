import { Box, Typography,Grid } from "@mui/material"
import { experimentalStyled as styled } from '@mui/material/styles';
import Appdetails from "../../Dashboard/components/Appdetails"
import Paper from '@mui/material/Paper';
import tc from "../../Dashboard/assets/Logoimg/tc.png"
import ee from "../../Dashboard/assets/Logoimg/ee.png"
import pdf from "../../Dashboard/assets/Logoimg/pdf.png"
import pdf1 from "../../Dashboard/assets/Logoimg/pdf1.png"
import logo_theme from '../../Dashboard/assets/Logoimg/logo_theme.svg'
import sa from '../../Dashboard/assets/Logoimg/sa.png'
import ccg from '../../Dashboard/assets/Logoimg/ccard.jpg'
import text from '../../Dashboard/assets/Descriptionimg/text-sum.png'
import textsummarizer from '../../Dashboard/assets/Logoimg/text-summarizer.png'
import creditcard from '../../Dashboard/assets/Descriptionimg/creditcard.jpg'
import entity from '../../Dashboard/assets/Descriptionimg/entity.png'
import Test from '../../Dashboard/assets/Logoimg/Test.png'
import { useLocation } from "react-router-dom";

const Appviews = () => {
    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
       
      }));
      const location=useLocation()
      const {title}=location.state
       
      const apps = [
        {
          title: "JPG Convertor",
          shortDescription: "It convert the image from any format to jpg .",
          longDescription: "Tax Calculator provides a quick and accurate way to estimate taxes, considering various factors like income, deductions, and tax credits, simplifying financial planning and budgeting.",
          logo: logo_theme,
          linktorun:"http://localhost:32768/",
          imgdes:"https://static-cse.canva.com/blob/1272305/tools_feature_jpeg-to-jpg_hero_mobile2x.jpg"
      },
        {
            title: "Sentimental Analysis",
            shortDescription: "Analyze sentiments in text quickly and efficiently.",
            longDescription: "Sentimental Analysis app leverages advanced machine learning models to accurately determine the emotional tone behind words to provide a deeper understanding of the sentiments expressed in social media posts, reviews, and more.",
            logo: sa,
            linktorun:"http://localhost:32769/docs",
            imgdes:"https://d3caycb064h6u1.cloudfront.net/wp-content/uploads/2021/06/sentimentanalysishotelgeneric-2048x803-1.jpg"
        },
        {
          title: "Credit card Generator",
          shortDescription: "A credit card generator.",
          longDescription: "A credit card generator is an essential tool designed to provide developers, testers, and quality assurance professionals with valid credit card numbers for system evaluation without the risk of exposing real financial details.",
          logo:ccg,
          linktorun:"https://testcreditgenerator.azurewebsites.net/docs",
          imgdes: creditcard
      },
      {
        title: "Text summarization",
        shortDescription: "It can be used to summarize texts.",
        longDescription: "Text summarization is an advanced NLP technique designed to automatically generate concise and meaningful summaries of lengthy texts.This technology employs algorithms to distill the most essential information, facilitating quick understanding without the need to read through entire documents. ",
        logo: textsummarizer,
        linktorun:"https://text-summarization.azurewebsites.net/docs",
        imgdes:text
    },
    {
        title: "PDF Data Extractor",
        shortDescription: "Extract data from PDF files seamlessly.",
        longDescription: "PDF Data Extractor allows you to effortlessly retrieve and manipulate data locked in PDF files, enabling efficient data processing and automation for reports, invoices, and other document types.",
        logo: pdf,
        linktorun:"https://pdftowordexttactor.azurewebsites.net/docs",
      imgdes:"hiii"
    },
    {
        title: "PDF Generator",
        shortDescription: "Generate PDFs from various data sources.",
        longDescription: "PDF Generator helps you create PDF documents dynamically from different data inputs, supporting customizable templates for reports, receipts, and business documents, ensuring consistency and professionalism.",
        logo: pdf1,
        linktorun:"",
        imgdes:"hiii"
    },
        {
            title: "Entity Extractor",
            shortDescription: "Extract entities from text using AI.",
            longDescription: "Entity Extractor utilizes cutting-edge natural language processing technologies to identify and categorize key information from text, such as names, organizations, locations, and more, enhancing data analysis and business intelligence.",
            logo: ee,
            linktorun:"https://entity-extractor.azurewebsites.net/docs",
            imgdes:entity
        },
       
        {
            title: "Design and Publish",
            shortDescription: "Design and publish your digital content easily.",
            longDescription: "Design and Publish streamlines the process of creating and distributing digital content, offering tools for design, layout, and publishing all in one platform, ideal for marketers, publishers, and content creators.",
            logo: Test,
            linktorun:"",
            imgdes:"hiii"
        },
        {
            title: "Tax Calculator",
            shortDescription: "Calculate taxes with ease.",
            longDescription: "Tax Calculator provides a quick and accurate way to estimate taxes, considering various factors like income, deductions, and tax credits, simplifying financial planning and budgeting.",
            logo: tc,
            linktorun:"",
            imgdes:"hiii"
        }
    ];
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" sx={{ color: "#6D6767" }}>People also use</Typography>
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 12 }}>
      {apps.filter(app => app.title !== title).map((app, index) => (
          <Grid item xs={6} sm={6} md={6} key={index}>
            <Item>
              <Appdetails
                title={app.title}
                shdescription={app.shortDescription}
                logo={app.logo}
                lndescription={app.longDescription}
                linktorun={app.linktorun}
                imgdes={app.imgdes}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Appviews