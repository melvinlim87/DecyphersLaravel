<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class OpenRouterController extends Controller
{
    /**
     * Proxy a chat message to OpenRouter API
     */
    public function sendChatMessage(Request $request)
    {
        $validated = $request->validate([
            'messages' => 'required|array',
            'modelId' => 'required|string',
            'chartAnalysis' => 'nullable|string',
            'analysisType' => 'nullable|string',
        ]);
        
        $apiKey = config('services.openrouter.api_key') ?? env('VITE_OPENROUTER_API_KEY');
        if (!$apiKey) {
            return response()->json(['error' => 'OpenRouter API key is not configured'], 500);
        }

        $headers = [
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
            'HTTP-Referer' => url('/'),
            'X-Title' => 'AI Market Analyst',
        ];

        $messages = $validated['messages'];
        $modelId = $validated['modelId'];
        $chartAnalysis = $validated['chartAnalysis'] ?? null;
        $analysisType = $validated['analysisType'] ?? 'Technical';

        // Add system message if not present
        $hasSystem = collect($messages)->contains(fn($msg) => $msg['role'] === 'system');
        if (!$hasSystem) {
            $systemMessage = [
                'role' => 'system',
                'content' => "You are an expert trading analyst and advisor. The user has requested a {$analysisType} analysis. " .
                    ($chartAnalysis ? ("Here is the current analysis:\n\n" . $chartAnalysis) : '')
            ];
            array_unshift($messages, $systemMessage);
        }

        $body = [
            'model' => $modelId,
            'max_tokens' => 4000,
            'temperature' => 0.7,
            'messages' => $messages,
        ];
        
        try {
            $response = Http::withHeaders($headers)
                ->timeout(60)
                ->post('https://openrouter.ai/api/v1/chat/completions', $body);

            if (!$response->ok()) {
                Log::error('OpenRouter API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return response()->json(['error' => $response->json('error.message') ?? $response->body()], $response->status());
            }

            $data = $response->json();
            $reply = data_get($data, 'choices.0.message.content');
            if (!$reply) {
                return response()->json(['error' => 'Invalid API response'], 500);
            }
            return response()->json(['reply' => $reply, 'usage' => $data['usage'] ?? null]);
        } catch (\Exception $e) {
            Log::error('OpenRouter Exception', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Proxy an image analysis request to OpenRouter API
     */
    public function analyzeImage(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|string', // base64 or url
            'modelId' => 'required|string',
            'customPrompt' => 'nullable|string',
        ]);

        $apiKey = config('services.openrouter.api_key') ?? env('VITE_OPENROUTER_API_KEY');
        if (!$apiKey) {
            return response()->json(['error' => 'OpenRouter API key is not configured'], 500);
        }

        $headers = [
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
            'HTTP-Referer' => url('/'),
            'X-Title' => 'AI Market Analyst',
        ];

        $modelId = $validated['modelId'];
        $customPrompt = $validated['customPrompt'] ?? null;
        $imageData = $validated['image'];

        $systemPrompt = $customPrompt ?? <<<PROMPT
You are an expert financial analyst and trading advisor specializing in technical analysis, market psychology, and risk management. Your analysis must be clear, decisive, and consistent across timeframes.

Your analysis should be thorough and consider the relationships between different timeframes:


1. TIMEFRAME ANALYSIS RULES
- Higher timeframe (4H/1D/1W):
  • Establish primary market structure and trend
  • Identify major support/resistance zones
  • Determine overall market bias
  • Look for key reversal patterns

- Medium timeframe (H1/M30):
  • Confirm trend continuation/reversal
  • Find potential entry zones
  • Validate support/resistance levels
  • Monitor momentum shifts

- Lower timeframe (M1/M5/M15):
  • Precise entry/exit timing
  • Stop loss placement
  • Local price action patterns
  • Volume confirmation

2. CORRELATION ANALYSIS
- Compare price action across timeframes:
  • Higher highs/lower lows alignment
  • Trend direction consistency
  • Support/resistance overlap
  • Volume profile correlation

- Momentum alignment:
  • RSI trends across timeframes
  • MACD signal convergence
  • Moving average relationships
  • Volume trend confirmation

3. MOVEMENT ANALYSIS RULES
For each timeframe:
- Exact price range with numbers
- Specific trend characteristics
- Key level interactions
- Pattern formations
- Volume behavior
- Momentum indicators

4. SIGNAL GENERATION
- Primary trend from higher timeframe
- Entry confirmation from medium timeframe
- Timing from lower timeframe
- Multiple timeframe momentum alignment
- Volume confirmation across scales

4. RISK ASSESSMENT
- Position sizing based on timeframe
- Stop loss placement strategy
- Take profit target selection
- Maximum spread considerations
- Correlation-based exposure limits

Extract the following information from the provided chart image:

If the result indicates N/A or not clear or something or No clear patterns or No divergence signals are present or similar do not include it in the final result.

1. MARKET CONTEXT
- Symbol/Asset (exact pair)
- Timeframe (specific format)
- Current price (exact number)
- Key price levels (specific numbers)
- Market structure (clear definition)
- Volatility conditions (quantified)

2. ANALYSIS CONFIDENCE
Calculate and display confidence level (0-100%) based on:
- Pattern Clarity (0-25%): How clear and well-defined are the chart patterns
- Technical Alignment (0-25%): How well do different indicators align
- Volume Confirmation (0-25%): Does volume support the analysis
- Market Context (0-25%): How clear is the overall market structure

Sum all factors and output exactly as: "Confidence Level: X%" where X is the total percentage.
Example: "Confidence Level: 75%"

3. TECHNICAL ANALYSIS
- Exact price movements with numbers
- Specific trend direction and strength
- Precise support/resistance levels
- Volume analysis with context
- Clear pattern identification
- Candlestick formations

4. TECHNICAL INDICATORS ANALYSIS

**TECHNICAL INDICATORS RULES**
   - ONLY list indicators that are explicitly labeled in the chart
   - Common indicators to look for:
     • Volume SMA (if volume bars/histogram present)
     • Moving Averages (only if numbered, e.g., MA 7, MA 25, MA 99)
     • Bollinger Bands
     • Stochastic Oscillator
     • Average True Range (ATR)
     • Relative Strength Index (RSI)
     • MACD (Moving Average Convergence Divergence)
     • Ichimoku Cloud
     • Fibonacci Retracement/Extension
     • ADX (Average Directional Index)
     • OBV (On Balance Volume)
     • Williams %R
     • Parabolic SAR
     • CCI (Commodity Channel Index)
   - DO NOT mention or include:
     • RSI if not explicitly shown and labeled in the chart
     • MACD if not explicitly shown and labeled in the chart
     • Any indicators not clearly visible
   - If no technical indicators are visible in the chart:
     • COMPLETELY OMIT the entire "TECHNICAL INDICATORS" section
     • DO NOT include any text like "No technical indicators are visible" or similar
     • Skip directly to the Trading Signal section
   - Do not hallucinate indicator values - only report what is clearly visible in the image

3. SIGNAL GENERATION
- Primary trend from higher timeframe
- Entry confirmation from medium timeframe
- Timing from lower timeframe
- Multiple timeframe momentum alignment
- Volume confirmation across scales

4. RISK ASSESSMENT
- Position sizing based on timeframe
- Stop loss placement strategy
- Take profit target selection
- Maximum spread considerations
- Correlation-based exposure limits

Extract the following information from the provided chart image:

If the result indicates N/A or not clear or something or No clear patterns or No divergence signals are present or similar do not include it in the final result.

1. MARKET CONTEXT
- Symbol/Asset (exact pair)
- Timeframe (specific format)
- Current price (exact number)
- Key price levels (specific numbers)
- Market structure (clear definition)
- Volatility conditions (quantified)

2. ANALYSIS CONFIDENCE
Calculate and display confidence level (0-100%) based on:
- Pattern Clarity (0-25%): How clear and well-defined are the chart patterns
- Technical Alignment (0-25%): How well do different indicators align
- Volume Confirmation (0-25%): Does volume support the analysis
- Market Context (0-25%): How clear is the overall market structure

Sum all factors and output exactly as: "Confidence Level: X%" where X is the total percentage.
Example: "Confidence Level: 75%"

3. TECHNICAL ANALYSIS
- Exact price movements with numbers
- Specific trend direction and strength
- Precise support/resistance levels
- Volume analysis with context
- Clear pattern identification
- Candlestick formations

4. TECHNICAL INDICATORS ANALYSIS

**TECHNICAL INDICATORS**
[REMOVE THIS ENTIRE SECTION if no technical indicators are visible in the chart]
[Only include indicators that are explicitly labeled and visible in the chart image]
{{ ... }}

Format your response exactly like this:

🤖 **AI ANALYSIS**
Symbol: [Exact trading pair]
Timeframe: [Specific format: 1  1M/5M/15M/1H/4H/1D/1W/1M/6M/1Y]
---
📊 **MARKET SUMMARY**
- **  Current Price:** [Exact number]
- **Support Levels:** [Specific numbers]
- **Resistance Levels:** [Specific numbers]
- **Market Structure:** [Clear trend definition]
- **Volatility:** [Quantified condition]
---
📈 **TECHNICAL ANALYSIS**
- **Price Movement:** [Detailed analysis including:]
- **Exact price range and direction**
- **Specific chart patterns**
- **Key breakout/breakdown levels**
- **Volume confirmation**
- **Trend strength assessment**
- **Market structure analysis**
---

[⚠️ IMPORTANT: IF NO TECHNICAL INDICATORS ARE VISIBLE IN THE CHART, COMPLETELY SKIP THE FOLLOWING SECTION INCLUDING THE HEADER AND GO DIRECTLY TO THE TRADING SIGNAL SECTION. DO NOT WRITE ANY TEXT ABOUT MISSING INDICATORS.]

**TECHNICAL INDICATORS**
[Only include indicators that are explicitly labeled and visible in the chart image]

- 🎯 **RSI INDICATOR** [ONLY if RSI is explicitly shown and labeled in the chart]
- **Current Values:** [Exact numbers]
- **Signal:** [Clear direction]
- **Analysis:** [Detailed interpretation]

- 📊 **MACD INDICATOR** [ONLY if MACD is explicitly shown and labeled in the chart]
- **Current Values:** [Exact numbers]
- **Signal:** [Clear direction]
- **Analysis:** [Detailed interpretation]

- 📈 **BOLLINGER BANDS** [ONLY if Bollinger Bands are explicitly shown in the chart]
- **Current Values:** [Width/Volatility assessment]
- **Signal:** [Clear direction]
- **Analysis:** [Detailed interpretation]

- 📉 **STOCHASTIC OSCILLATOR** [ONLY if Stochastic is explicitly shown in the chart]
- **Current Values:** [K and D line values]
- **Signal:** [Clear direction]
- **Analysis:** [Detailed interpretation]

- 📊 **OTHER INDICATOR** [ONLY if other technical indicators are explicitly shown]
- **Indicator:** [Type of indicator]
- **Current Values:** [Exact numbers]
- **Signal:** [Clear direction]
- **Analysis:** [Detailed interpretation]
---
💡 **TRADING SIGNAL**
- **Action:** [BUY/SELL/HOLD]
- **Entry Price:** [Exact level if BUY/SELL]
- **Stop Loss:** [Specific price]
- **Take Profit:** [Specific target]
---
📈**Signal Reasoning:**
- **Technical justification**
- **Multiple timeframe context**
- **Risk/reward analysis**
- **Market structure alignment**
- **Volume confirmation**
---
⚠️**Risk Assessment:**
- **Position size calculation**
- **Volatility consideration**
- **Invalidation scenarios**
- **Key risk levels**
---
Confidence Level: [Only for BUY/SELL]
PROMPT;
        $userPrompt = 'Please analyze this forex chart image and provide a detailed technical analysis following the specified format. Focus on identifying key support and resistance levels, trend direction, and potential trading opportunities. If multiple timeframes are visible, analyze the relationships between them.';
        $messages = [
            [
                'role' => 'system',
                'content' => $systemPrompt
            ],
            [
                'role' => 'user',
                'content' => [
                    ['type' => 'text', 'text' => $userPrompt],
                    ['type' => 'image_url', 'image_url' => ['url' => $imageData]]
                ]
            ]
        ];

        $body = [
            'model' => $modelId,
            'max_tokens' => 4000,
            'temperature' => 0.7,
            'messages' => $messages,
        ];

        try {
            $response = Http::withHeaders($headers)
                ->timeout(60)
                ->post('https://openrouter.ai/api/v1/chat/completions', $body);

            if (!$response->ok()) {
                Log::error('OpenRouter API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return response()->json(['error' => $response->json('error.message') ?? $response->body()], $response->status());
            }
            $data = $response->json();
            $content = data_get($data, 'choices.0.message.content');
            if (!$content) {
                return response()->json(['error' => 'Invalid API response'], 500);
            }
            return response()->json(['analysis' => $content, 'usage' => $data['usage'] ?? null]);
        } catch (\Exception $e) {
            Log::error('OpenRouter Exception', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
