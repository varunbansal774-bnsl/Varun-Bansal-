import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'MOCK_KEY_FOR_BUILD',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST route to analyze protein powders using Gemini
app.post('/api/analyze-nutrition', async (req, res) => {
  const { brandName, scoopSize, proteinPerScoop, fatContent, proteinType, additives, customQuestion } = req.body;

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        content: `### ℹ️ Demonstration Mode Active
Your Gemini API Key is not yet configured in **Settings > Secrets**.
Here is a simulation of the analysis:

- **Protein Concentration**: ${((proteinPerScoop / (scoopSize || 30)) * 100).toFixed(1)}% of total scoop size is pure protein.
- **Estimated Bioavailability (BV)**: ${proteinType === 'Isolate' ? '140+ (Very High)' : proteinType === 'Hydrolyzed' ? '150+ (Instant absorption)' : '104 (High)'}
- **Additives Check**: Found: *${additives || 'None specified'}*. Less additives mean easier digestion.
- **Ask anything else once the API key is provided!**`
      });
    }

    let prompt = '';
    if (customQuestion) {
      prompt = `The user is asking a nutrition query regarding whey protein:
"${customQuestion}"

Please give a professionally structured, concise, and helpful response. Educate on protein sources, absorption rates, gut health, lactose contents, or processing differences if applicable. Maintain an objective, scientific, yet friendly tone. Keep it under 250 words. Use elegant Markdown details. Do not use greeting fluff.`;
    } else {
      prompt = `You are a professional nutrition scientist and sports supplement expert.
Analyze the following whey protein formulation and provide brief, punchy insights regarding its nutrition, protein concentration per scoop, fat content, bioavailability, and additives:

- **Product/Brand Name**: ${brandName || 'Custom Formulation'}
- **Scoop Size**: ${scoopSize}g
- **Protein per Scoop**: ${proteinPerScoop}g (Yielding: ${((proteinPerScoop / scoopSize) * 100).toFixed(1)}% protein by dry weight)
- **Fat content**: ${fatContent}g
- **Primary Protein Source**: ${proteinType}
- **Additives/Ingredients List**: ${additives || 'No major additives listed'}

Structure your output into these 4 concise Markdown bullet points (each under 2-3 sentences):
1. **Protein Concentration & Quality**: Contrast the scoop weight to pure protein yield. Explain what this means about fillers.
2. **Fat Content/Purity**: Analyze the fat level relative to the protein type (Isolate vs Concentrate).
3. **Estimated Bioavailability (BV)**: Rate and explain its biological absorption index based on the source (${proteinType}).
4. **Additive Impact ("Editates")**: Evaluate listed sweeteners, emulsifiers, or thickeners. Give tips on digestion (e.g., gut friendliness, bloating).

Keep the feedback highly scientific, accurate, and actionable. Avoid generic marketing puffery.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    res.status(200).json({ content: response.text });
  } catch (error: any) {
    console.error('Gemini call error:', error);
    res.status(500).json({ error: error.message || 'Error executing intelligence analysis.' });
  }
});

// Port configuration
const PORT = 3000;

// Integration of Vite Dev Server
if (process.env.NODE_ENV !== 'production') {
  console.log('Starting server in development mode...');
  // Dynamic import to prevent bundler problems in production builds
  import('vite').then(({ createServer }) => {
    createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    }).then((viteDevServer) => {
      app.use(viteDevServer.middlewares);

      // Handle fallback HTML routing
      app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
          let template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Whey Protein Comparison & Nutrition Analyzer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
          template = await viteDevServer.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e) {
          viteDevServer.ssrFixStacktrace(e as Error);
          next(e);
        }
      });

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    });
  });
} else {
  console.log('Starting server in production mode...');
  // Serve production build files
  const distPath = path.resolve(__dirname, './dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running in production on port ${PORT}`);
  });
}
