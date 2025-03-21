const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Financial Data Schema
const financialDataSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  category: String,
  description: String
});

const FinancialData = mongoose.model('FinancialData', financialDataSchema);

// Analysis Results Schema
const analysisResultSchema = new mongoose.Schema({
  timestamp: Date,
  results: Object
});

const AnalysisResult = mongoose.model('AnalysisResult', analysisResultSchema);

// Analysis Endpoint
app.post('/analyze-financials', async (req, res) => {
  try {
    // 1. Fetch data from MongoDB
    const rawData = await FinancialData.find({});
    
    // 2. Preprocess data
    const processedData = rawData.map(record => ({
      date: record.date.toISOString(),
      amount: parseFloat(record.amount),
      category: record.category,
      description: record.description
    }));

    // 3. Prepare DeepSeek API request
    const payload = {
      data: processedData,
      analysis_type: "financial_summary"
    };

    // 4. Send to DeepSeek API
    const response = await axios.post(
      'https://api.deepseek.com/v1/analyze/financial',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 5. Save results to MongoDB
    const analysisRecord = new AnalysisResult({
      timestamp: new Date(),
      results: response.data
    });

    await analysisRecord.save();

    // 6. Return results to client
    res.json({
      success: true,
      results: response.data
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});