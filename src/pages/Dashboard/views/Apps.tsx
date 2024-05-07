import Appdetails from '../components/Appdetails';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import textsummarizer from '../assets/Logoimg/text_summarizer.png'
import creditcard from '../assets/Descriptionimg/creditcard.jpg'
import entity from '../assets/Descriptionimg/entity.png'
import text from '../assets/Descriptionimg/text-sum.png'
import pdfextrator from '../assets/Descriptionimg/PDF_extractor.png'
import incometax from '../assets/Descriptionimg/income-tax.jpg'
import ccg from '../assets/Logoimg/ccard.png'
import ee from '../assets/Logoimg/ee.png'
import pdf1 from '../assets/Logoimg/pdf1.png'
import pdf from '../assets/Logoimg/pdf.png'
import sa from '../assets/Logoimg/sa.png'
import tc from '../assets/Logoimg/tc.png'
import Test from '../assets/Logoimg/Test.png'
import jpg from '../assets/Logoimg/Thumbnail.png'
const Apps = () => {
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    height: '115px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between' 
}));
      
      const apps = [
        {
          title: "JPG Convertor",
          shortDescription: "It convert the image from any format to jpg .",
          longDescription: "Tax Calculator provides a quick and accurate way to estimate taxes, considering various factors like income, deductions, and tax credits, simplifying financial planning and budgeting.",
          logo: jpg,
          linktorun:"http://localhost:32768/",
          imgdes:"https://static-cse.canva.com/blob/1272305/tools_feature_jpeg-to-jpg_hero_mobile2x.jpg"
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
      imgdes:pdfextrator
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
    title: "Tax Calculator",
    shortDescription: "Calculate taxes with ease.",
    longDescription: "Tax Calculator provides a quick and accurate way to estimate taxes, considering various factors like income, deductions, and tax credits, simplifying financial planning and budgeting.",
    logo: tc,
    linktorun:"",
    imgdes:incometax
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
        title: "PDF Generator",
        shortDescription: "Generate PDFs from various data sources.",
        longDescription: "PDF Generator helps you create PDF documents dynamically from different data inputs, supporting customizable templates for reports, receipts, and business documents, ensuring consistency and professionalism.",
        logo: pdf1,
        linktorun:"",
        imgdes:"hiii"
    },
       
        {
            title: "Test credit Generator",
            shortDescription: "A test credit generator is a tool .",
            longDescription: "The Test Credit Generator is an indispensable tool for software developers, quality assurance professionals, and payment gateway testers.",
            logo: Test,
            linktorun:"",
            imgdes:"hiii"
        }
    ];
    
     
  return (
    <Box sx={{ flexGrow: 1,m:2 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {apps.map((app,index)=>(
        <Grid item xs={2} sm={4} md={4} key={index} >
          <Item>
              <Appdetails title={app.title} shdescription={app.shortDescription} logo={app.logo} lndescription={app.longDescription} linktorun={app.linktorun} imgdes={app.imgdes}></Appdetails></Item>
        </Grid>
      ))}
    </Grid>
  </Box>

  )
}

export default Apps
