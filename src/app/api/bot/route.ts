import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '';
if(!OPENROUTER_KEY) console.warn('[WARN] OPENROUTER_API_KEY not set in environment');

export async function POST(req: NextRequest) {
  let lang = 'en';
  try {
    const body = await req.json();
    const { question, context } = body;
    lang = body.lang || 'en';
    const isHindi = lang === 'hi';

    if (!question?.trim()) {
      return NextResponse.json({ answer: isHindi ? 'कुछ पूछें! 😊' : 'Please ask something! 😊' });
    }

    const systemPrompt = `You are STU-BRAIN AI Doubt Bot — friendly expert tutor for Indian school students (Class 8-12).
STU-BRAIN teaches AI, ML, Neural Networks, Python, LLMs, Robotics, Deep Learning, NLP, Computer Vision.
${context ? `Student context: ${context}` : ''}
Reply in ${isHindi ? 'Hindi (Devanagari script)' : 'English'}. Max 3 sentences. Warm and encouraging. Use 1-2 emojis. Give Indian examples (ISRO, Zomato, IIT, Paytm).`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ];

    // Try Nvidia Nemotron first (with reasoning for better answers)
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://stu-brain.vercel.app',
          'X-Title': 'STU-BRAIN',
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-3-super-120b-a12b:free',
          messages,
          max_tokens: 250,
          temperature: 0.7,
          reasoning: { enabled: true, max_tokens: 100 },
        }),
        signal: AbortSignal.timeout(12000),
      });

      if (res.ok) {
        const data = await res.json();
        const answer = data.choices?.[0]?.message?.content?.trim();
        if (answer && answer.length > 5) {
          return NextResponse.json({ answer });
        }
      }
    } catch { /* try next */ }

    // Fallback models in parallel
    const fallbackModels = [
      'meta-llama/llama-3.1-8b-instruct:free',
      'google/gemma-2-9b-it:free',
      'mistralai/mistral-7b-instruct:free',
    ];

    const answer = await Promise.race([
      Promise.any(
        fallbackModels.map(model =>
          fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENROUTER_KEY}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://stu-brain.vercel.app',
              'X-Title': 'STU-BRAIN',
            },
            body: JSON.stringify({ model, messages, max_tokens: 200, temperature: 0.7 }),
            signal: AbortSignal.timeout(12000),
          })
            .then(r => r.json())
            .then(d => {
              const ans = d.choices?.[0]?.message?.content?.trim();
              if (!ans || ans.length < 5) throw new Error('empty');
              return ans;
            })
        )
      ).catch(() => null),
      new Promise<null>(r => setTimeout(() => r(null), 13000)),
    ]);

    if (answer) return NextResponse.json({ answer });

    // Smart content fallback
    const q = question.toLowerCase();
    let fallback = '';
    if (q.includes('python') || q.includes('code')) {
      fallback = isHindi ? '🐍 Python AI की #1 language है! Google Colab पर free में try करो। Variables, loops, functions से शुरू करो — फिर NumPy और TensorFlow!' : '🐍 Python is the #1 AI language! Try it free on Google Colab. Start with variables and loops, then move to NumPy and TensorFlow!';
    } else if (q.includes('neural') || q.includes('network') || q.includes('deep')) {
      fallback = isHindi ? '🧠 Neural Network आपके brain जैसा है! Neurons connected होते हैं — Input → Hidden Layers → Output। Backpropagation से mistakes सीखता है!' : '🧠 Neural Networks work like your brain! Input → Hidden Layers → Output. It learns from mistakes using Backpropagation — same tech as ChatGPT!';
    } else if (q.includes('llm') || q.includes('gpt') || q.includes('chatgpt')) {
      fallback = isHindi ? '🤖 ChatGPT जैसे LLMs trillions of words पर train होते हैं! Transformer architecture use करते हैं जो 2017 में Google ने बनाया। GPT, Claude, Gemini — सब Transformers हैं!' : '🤖 LLMs like ChatGPT train on trillions of words using Transformer architecture (invented by Google in 2017)! They predict the next word to generate human-like text.';
    } else if (q.includes('isro') || q.includes('india') || q.includes('भारत')) {
      fallback = isHindi ? '🇮🇳 India AI में #3 globally है! ISRO Chandrayaan data के लिए Python use करता है। IITs, AIIMS, Paytm — सब AI use कर रहे हैं। आप सही जगह हो!' : '🇮🇳 India ranks #3 in AI globally! ISRO uses Python for Chandrayaan data, AIIMS uses AI for diagnosis, Paytm uses ML for fraud detection. Great time to learn AI!';
    } else {
      fallback = isHindi ? '🤔 फिर से पूछें! STU-BRAIN chapters में सभी answers हैं। AI = Data + Algorithm + Compute 🚀' : '🤔 Please rephrase and ask again! Check your STU-BRAIN chapter for detailed explanations. AI = Data + Algorithm + Compute 🚀';
    }

    return NextResponse.json({ answer: fallback });

  } catch (e) {
    console.error('Bot error:', e instanceof Error ? e.message : e);
    return NextResponse.json({
      answer: lang === 'hi' ? '⚠️ फिर से पूछें! 🙏' : '⚠️ Please try again! 🙏'
    });
  }
}
