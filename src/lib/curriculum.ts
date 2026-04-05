export type SlideType = 'teach' | 'concepts' | 'reallife' | 'flow' | 'deep' | 'code' | 'neural' | 'quiz';

export interface Chapter {
  id: string;
  icon: string;
  title: string;
  titleHi: string;
  xp: number;
  slides: Slide[];
}
export interface Subject { id: string; icon: string; name: string; nameHi: string; chapters: (Chapter | undefined)[]; }
export interface ClassData { label: string; labelHi: string; badge: string; badgeHi: string; badgeStyle: string; emoji: string; subjects: Subject[]; }

export const CURRICULUM: Record<number, ClassData> = {
  3: {
    label: 'Class 3', labelHi: 'कक्षा 3', badge: '🌟 AI Explorer', badgeHi: '🌟 AI खोजकर्ता',
    badgeStyle: 'background:rgba(56,189,248,.15);color:#38BFF8;border:1px solid rgba(56,189,248,.3)',
    emoji: '🌟',
    subjects: [{
      id: 's3_ct', icon: '🧠', name: 'Computational Thinking & AI Basics', nameHi: 'कम्प्यूटेशनल थिंकिंग और AI',
      chapters: [
        {
          id: 'c3_1', icon: '🤖', title: 'What is AI? Robots and Smart Machines!', titleHi: 'What is AI? Robots and Smart Machines!', xp: 15,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 3 · WHAT IS AI · CHAPTER 1', tagHi: 'CLASS 3 · WHAT IS AI · CHAPTER 1',
              title: 'Meet AI — Your Smart Machine Friend!', titleHi: 'Meet AI — Your Smart Machine Friend!',
              intro: 'AI is all around you! Your phone, your TV, even toys can have AI. Let\'s meet AI today!', introHi: 'AI is all around you! Your phone, your TV, even toys can have AI. Let\'s meet AI today!',
              speech: '<span class="hi">AI = Artificial Intelligence</span><br><br>Artificial = <span class="em">Made by humans</span> 🔧<br>Intelligence = <span class="cool">Ability to think and learn</span> 🧠<br><br>AI is like a very smart helper that a computer can be!<br><br>🤖 <strong>Robots</strong> are machines that can move and do tasks<br>📱 <strong>Siri & Alexa</strong> listen and answer your questions<br>🎮 <strong>Game bots</strong> play against you in video games<br>🚗 <strong>Self-driving cars</strong> drive without a human!<br><br><span class="em">AI does NOT have feelings — but it is very clever!</span>',
              speechHi: '<span class="hi">AI = Artificial Intelligence</span><br><br>Artificial = <span class="em">Made by humans</span> 🔧<br>Intelligence = <span class="cool">Ability to think and learn</span> 🧠<br><br>AI is like a very smart helper that a computer can be!<br><br>🤖 <strong>Robots</strong> are machines that can move and do tasks<br>📱 <strong>Siri & Alexa</strong> listen and answer your questions<br>🎮 <strong>Game bots</strong> play against you in video games<br>🚗 <strong>Self-driving cars</strong> drive without a human!<br><br><span class="em">AI does NOT have feelings — but it is very clever!</span>'
            },
            { type: 'concepts', tag: 'CLASS 3 · AI EXAMPLES', tagHi: 'CLASS 3 · AI EXAMPLES',
              title: 'AI Friends You Already Know!', titleHi: 'AI Friends You Already Know!',
              intro: 'You use AI every single day without knowing it!', introHi: 'You use AI every single day without knowing it!',
              items: [
                { em:'📱', l:'Alexa & Siri', lHi:'Alexa & Siri', d:'They listen to your voice and answer questions! Ask: "What is 2+2?" and they tell you instantly!', dHi:'They listen to your voice and answer questions! Ask: "What is 2+2?" and they tell you instantly!' },
                { em:'🎮', l:'Video Game Bots', lHi:'Video Game Bots', d:'In PUBG, FIFA, or Clash of Clans — the enemy characters are controlled by AI!', dHi:'In PUBG, FIFA, or Clash of Clans — the enemy characters are controlled by AI!' },
                { em:'📺', l:'YouTube & Netflix', lHi:'YouTube & Netflix', d:'They watch what YOU watch and suggest more videos you might like — that is AI!', dHi:'They watch what YOU watch and suggest more videos you might like — that is AI!' },
                { em:'🚗', l:'Google Maps', lHi:'Google Maps', d:'AI looks at traffic from millions of phones and shows you the fastest route!', dHi:'AI looks at traffic from millions of phones and shows you the fastest route!' },
                { em:'🤖', l:'Factory Robots', lHi:'Factory Robots', d:'In Maruti, Tata factories — robot arms weld and paint cars without any human help!', dHi:'In Maruti, Tata factories — robot arms weld and paint cars without any human help!' },
                { em:'📸', l:'Face Unlock', lHi:'Face Unlock', d:'Your phone uses AI to recognize YOUR face and unlock only for you!', dHi:'Your phone uses AI to recognize YOUR face and unlock only for you!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 3 · AI QUIZ', tagHi: 'CLASS 3 · AI QUIZ',
              title: '🧩 What is AI? — Fun Quiz!', titleHi: '🧩 What is AI? — Fun Quiz!',
              questions: [
                { q: 'What does AI stand for?', qHi: 'What does AI stand for?',
                  opts: ['Auto Intelligence', 'Artificial Intelligence', 'Amazing Internet', 'Apple iPad'], optsHi: ['Auto Intelligence', 'Artificial Intelligence', 'Amazing Internet', 'Apple iPad'],
                  c: 1, ex: 'AI = Artificial Intelligence! Artificial means made by humans, and Intelligence means ability to think and learn!', exHi: 'AI = Artificial Intelligence! Artificial means made by humans, and Intelligence means ability to think and learn!' },
                { q: 'Which of these uses AI?', qHi: 'Which of these uses AI?',
                  opts: ['A pencil', 'A book', 'Siri on iPhone', 'A rubber eraser'], optsHi: ['A pencil', 'A book', 'Siri on iPhone', 'A rubber eraser'],
                  c: 2, ex: 'Siri uses AI! It listens to your voice, understands what you said, and answers you. That is Artificial Intelligence!', exHi: 'Siri uses AI! It listens to your voice, understands what you said, and answers you. That is Artificial Intelligence!' },
                { q: 'Can AI have feelings like sadness or happiness?', qHi: 'Can AI have feelings like sadness or happiness?',
                  opts: ['Yes, it cries', 'Yes, it laughs', 'No, AI has no feelings', 'Yes, it gets angry'], optsHi: ['Yes, it cries', 'Yes, it laughs', 'No, AI has no feelings', 'Yes, it gets angry'],
                  c: 2, ex: 'AI has NO feelings! It is a program — very clever, but it cannot feel sad, happy, or angry. Only humans and animals have real feelings.', exHi: 'AI has NO feelings! It is a program — very clever, but it cannot feel sad, happy, or angry. Only humans and animals have real feelings.' },
                { q: 'What does a robot use to move and do tasks?', qHi: 'What does a robot use to move and do tasks?',
                  opts: ['Magic', 'Feelings', 'Artificial Intelligence + Motors', 'Only human control'], optsHi: ['Magic', 'Feelings', 'Artificial Intelligence + Motors', 'Only human control'],
                  c: 2, ex: 'Robots use AI + motors! AI decides what to do, and motors make the arms and legs move. Together they make a smart machine!', exHi: 'Robots use AI + motors! AI decides what to do, and motors make the arms and legs move. Together they make a smart machine!' },
                { q: 'YouTube suggesting your next video is an example of?', qHi: 'YouTube suggesting your next video is an example of?',
                  opts: ['Magic', 'Artificial Intelligence', 'Your teacher choosing', 'Random selection'], optsHi: ['Magic', 'Artificial Intelligence', 'Your teacher choosing', 'Random selection'],
                  c: 1, ex: 'YouTube uses AI! It watches what videos you like, for how long you watch, and suggests more similar videos. Smart algorithm!', exHi: 'YouTube uses AI! It watches what videos you like, for how long you watch, and suggests more similar videos. Smart algorithm!' }
              ]
            }
          ]
        },
        {
          id: 'c3_2', icon: '🔢', title: 'Patterns and Puzzles — How Computers Think!', titleHi: 'Patterns and Puzzles — How Computers Think!', xp: 15,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 3 · PATTERNS · CHAPTER 2', tagHi: 'CLASS 3 · PATTERNS · CHAPTER 2',
              title: 'Computers Love Patterns — Can You Find Them?', titleHi: 'Computers Love Patterns — Can You Find Them?',
              intro: 'Computers are pattern-finding supermachines! Let\'s learn how computers find patterns just like you do!', introHi: 'Computers are pattern-finding supermachines! Let\'s learn how computers find patterns just like you do!',
              speech: '<span class="hi">A Pattern</span> = Something that <span class="em">repeats</span> in a special order<br><br>🔴🔵🔴🔵🔴 — What comes next? <span class="cool">🔵</span> ✅<br>1, 2, 3, 4, 5 — What comes next? <span class="em">6</span> ✅<br>Mon, Tue, Wed — What comes next? <span class="cool">Thu</span> ✅<br><br><span class="hi">Computers find patterns MUCH faster than humans!</span><br><br>🎵 <strong>Spotify</strong> finds patterns in songs you like → suggests more<br>📱 <strong>Autocorrect</strong> finds patterns in how you type → fixes mistakes<br>🌦️ <strong>Weather app</strong> finds patterns in temperature → predicts rain<br><br><span class="em">AI learns by finding millions of patterns in data!</span>',
              speechHi: '<span class="hi">A Pattern</span> = Something that <span class="em">repeats</span> in a special order<br><br>🔴🔵🔴🔵🔴 — What comes next? <span class="cool">🔵</span> ✅<br>1, 2, 3, 4, 5 — What comes next? <span class="em">6</span> ✅<br>Mon, Tue, Wed — What comes next? <span class="cool">Thu</span> ✅<br><br><span class="hi">Computers find patterns MUCH faster than humans!</span><br><br>🎵 <strong>Spotify</strong> finds patterns in songs you like → suggests more<br>📱 <strong>Autocorrect</strong> finds patterns in how you type → fixes mistakes<br>🌦️ <strong>Weather app</strong> finds patterns in temperature → predicts rain<br><br><span class="em">AI learns by finding millions of patterns in data!</span>'
            },
            { type: 'concepts', tag: 'CLASS 3 · PATTERN TYPES', tagHi: 'CLASS 3 · PATTERN TYPES',
              title: 'Different Types of Patterns', titleHi: 'Different Types of Patterns',
              intro: 'Patterns are everywhere — in numbers, shapes, colors, and even music!', introHi: 'Patterns are everywhere — in numbers, shapes, colors, and even music!',
              items: [
                { em:'🔢', l:'Number Patterns', lHi:'Number Patterns', d:'2, 4, 6, 8, ? → The pattern is +2 each time! Answer: 10. Computers find these instantly in millions of numbers.', dHi:'2, 4, 6, 8, ? → The pattern is +2 each time! Answer: 10. Computers find these instantly in millions of numbers.' },
                { em:'🎨', l:'Color Patterns', lHi:'Color Patterns', d:'Red, Blue, Green, Red, Blue, ? → The pattern repeats every 3. Answer: Green! AI uses this for image recognition.', dHi:'Red, Blue, Green, Red, Blue, ? → The pattern repeats every 3. Answer: Green! AI uses this for image recognition.' },
                { em:'📅', l:'Time Patterns', lHi:'Time Patterns', d:'Monday to Monday = 7 days. AI uses time patterns to predict when traffic will be high or low!', dHi:'Monday to Monday = 7 days. AI uses time patterns to predict when traffic will be high or low!' },
                { em:'🗣️', l:'Word Patterns', lHi:'Word Patterns', d:'AI learns that "Good ___" is often followed by "morning" or "night". This is how autocorrect works!', dHi:'AI learns that "Good ___" is often followed by "morning" or "night". This is how autocorrect works!' },
                { em:'🎵', l:'Music Patterns', lHi:'Music Patterns', d:'Songs have beat patterns: 1-2-3-4, 1-2-3-4. Spotify AI finds your music pattern to suggest new songs.', dHi:'Songs have beat patterns: 1-2-3-4, 1-2-3-4. Spotify AI finds your music pattern to suggest new songs.' },
                { em:'🌡️', l:'Weather Patterns', lHi:'Weather Patterns', d:'When temperature drops + humidity rises + wind changes → AI predicts: rain coming! Pattern recognition!', dHi:'When temperature drops + humidity rises + wind changes → AI predicts: rain coming! Pattern recognition!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 3 · PATTERNS QUIZ', tagHi: 'CLASS 3 · PATTERNS QUIZ',
              title: '🧩 Patterns Quiz!', titleHi: '🧩 Patterns Quiz!',
              questions: [
                { q: 'What comes next: 2, 4, 6, 8, __?', qHi: 'What comes next: 2, 4, 6, 8, __?',
                  opts: ['9', '10', '11', '12'], optsHi: ['9', '10', '11', '12'],
                  c: 1, ex: '10! The pattern is +2 each time. 2+2=4, 4+2=6, 6+2=8, 8+2=10! This is an arithmetic pattern.', exHi: '10! The pattern is +2 each time. 2+2=4, 4+2=6, 6+2=8, 8+2=10! This is an arithmetic pattern.' },
                { q: 'What comes next: 🔴🔵🔴🔵🔴__?', qHi: 'What comes next: 🔴🔵🔴🔵🔴__?',
                  opts: ['🔴', '🔵', '🟢', '⚪'], optsHi: ['🔴', '🔵', '🟢', '⚪'],
                  c: 1, ex: 'Blue! The pattern is Red-Blue repeating. After Red comes Blue!', exHi: 'Blue! The pattern is Red-Blue repeating. After Red comes Blue!' },
                { q: 'Autocorrect fixes your spelling using?', qHi: 'Autocorrect fixes your spelling using?',
                  opts: ['A human editor', 'Pattern recognition of common words', 'Random guessing', 'A dictionary only'], optsHi: ['A human editor', 'Pattern recognition of common words', 'Random guessing', 'A dictionary only'],
                  c: 1, ex: 'Pattern recognition! Autocorrect learns patterns of how words are spelled and typed, then fixes your mistakes automatically.', exHi: 'Pattern recognition! Autocorrect learns patterns of how words are spelled and typed, then fixes your mistakes automatically.' },
                { q: 'Weather apps predict rain by?', qHi: 'Weather apps predict rain by?',
                  opts: ['Guessing', 'Asking people', 'Finding patterns in temperature, wind and humidity data', 'Looking outside'], optsHi: ['Guessing', 'Asking people', 'Finding patterns in temperature, wind and humidity data', 'Looking outside'],
                  c: 2, ex: 'Pattern recognition in data! AI analyzes temperature drops, humidity increases, and wind changes — patterns that historically come before rain.', exHi: 'Pattern recognition in data! AI analyzes temperature drops, humidity increases, and wind changes — patterns that historically come before rain.' },
                { q: 'Which app uses music patterns to suggest songs?', qHi: 'Which app uses music patterns to suggest songs?',
                  opts: ['Calculator', 'Camera', 'Spotify', 'Calendar'], optsHi: ['Calculator', 'Camera', 'Spotify', 'Calendar'],
                  c: 2, ex: 'Spotify uses AI to find patterns in what music you listen to — then suggests songs with similar patterns of rhythm and sound!', exHi: 'Spotify uses AI to find patterns in what music you listen to — then suggests songs with similar patterns of rhythm and sound!' }
              ]
            }
          ]
        },
        {
          id: 'c3_3', icon: '📋', title: 'Giving Instructions — Algorithms in Daily Life!', titleHi: 'Giving Instructions — Algorithms in Daily Life!', xp: 15,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 3 · ALGORITHMS · CHAPTER 3', tagHi: 'CLASS 3 · ALGORITHMS · CHAPTER 3',
              title: 'An Algorithm is Just a Recipe for Computers!', titleHi: 'An Algorithm is Just a Recipe for Computers!',
              intro: 'You already know algorithms! When you brush your teeth or make a sandwich — you follow steps. Computers do the same!', introHi: 'You already know algorithms! When you brush your teeth or make a sandwich — you follow steps. Computers do the same!',
              speech: '<span class="hi">Algorithm</span> = A set of <span class="em">step-by-step instructions</span> to solve a problem<br><br>🪥 <strong>Brushing Teeth Algorithm:</strong><br>Step 1: Pick up toothbrush<br>Step 2: Add toothpaste<br>Step 3: Brush for 2 minutes<br>Step 4: Rinse mouth<br>Step 5: Done! ✅<br><br>Computers follow algorithms to do EVERYTHING:<br>🔍 <span class="em">Google Search</span> — algorithm ranks websites<br>🎯 <span class="cool">Netflix recommendations</span> — algorithm picks your shows<br>🚗 <span class="hi">GPS routing</span> — algorithm finds shortest path<br><br><span class="em">Good algorithm = clear steps, correct order, works every time!</span>',
              speechHi: '<span class="hi">Algorithm</span> = A set of <span class="em">step-by-step instructions</span> to solve a problem<br><br>🪥 <strong>Brushing Teeth Algorithm:</strong><br>Step 1: Pick up toothbrush<br>Step 2: Add toothpaste<br>Step 3: Brush for 2 minutes<br>Step 4: Rinse mouth<br>Step 5: Done! ✅<br><br>Computers follow algorithms to do EVERYTHING:<br>🔍 <span class="em">Google Search</span> — algorithm ranks websites<br>🎯 <span class="cool">Netflix recommendations</span> — algorithm picks your shows<br>🚗 <span class="hi">GPS routing</span> — algorithm finds shortest path<br><br><span class="em">Good algorithm = clear steps, correct order, works every time!</span>'
            },
            { type: 'concepts', tag: 'CLASS 3 · ALGORITHM EXAMPLES', tagHi: 'CLASS 3 · ALGORITHM EXAMPLES',
              title: 'Algorithms All Around Us!', titleHi: 'Algorithms All Around Us!',
              intro: 'Every app you use runs an algorithm behind the scenes!', introHi: 'Every app you use runs an algorithm behind the scenes!',
              items: [
                { em:'🔍', l:'Google Search', lHi:'Google Search', d:'You type "best school in Jaipur" → Google\'s algorithm checks billions of websites → shows most relevant results in 0.5 seconds!', dHi:'You type "best school in Jaipur" → Google\'s algorithm checks billions of websites → shows most relevant results in 0.5 seconds!' },
                { em:'🚗', l:'Google Maps', lHi:'Google Maps', d:'Type: Home to School. Algorithm checks all roads → calculates times → picks fastest path. Updates if there is traffic!', dHi:'Type: Home to School. Algorithm checks all roads → calculates times → picks fastest path. Updates if there is traffic!' },
                { em:'🛒', l:'Flipkart Delivery', lHi:'Flipkart Delivery', d:'After you order: algorithm assigns nearest warehouse → finds best delivery route → estimates arrival time. All automatic!', dHi:'After you order: algorithm assigns nearest warehouse → finds best delivery route → estimates arrival time. All automatic!' },
                { em:'📧', l:'Email Spam Filter', lHi:'Email Spam Filter', d:'Email arrives → algorithm checks: unknown sender? + suspicious words? + many links? → Yes = SPAM folder!', dHi:'Email arrives → algorithm checks: unknown sender? + suspicious words? + many links? → Yes = SPAM folder!' },
                { em:'🎮', l:'Snake Game', lHi:'Snake Game', d:'Snake moves: if wall ahead → turn. If food ahead → move forward. If tail ahead → turn. Simple algorithm makes the game!', dHi:'Snake moves: if wall ahead → turn. If food ahead → move forward. If tail ahead → turn. Simple algorithm makes the game!' },
                { em:'🏦', l:'ATM Machine', lHi:'ATM Machine', d:'Insert card → enter PIN → select amount → algorithm checks: valid card? + correct PIN? + enough balance? → Give money!', dHi:'Insert card → enter PIN → select amount → algorithm checks: valid card? + correct PIN? + enough balance? → Give money!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 3 · ALGORITHM QUIZ', tagHi: 'CLASS 3 · ALGORITHM QUIZ',
              title: '🧩 Algorithms Quiz!', titleHi: '🧩 Algorithms Quiz!',
              questions: [
                { q: 'What is an algorithm?', qHi: 'What is an algorithm?',
                  opts: ['A type of robot', 'A step-by-step set of instructions to solve a problem', 'A math equation', 'A computer language'], optsHi: ['A type of robot', 'A step-by-step set of instructions to solve a problem', 'A math equation', 'A computer language'],
                  c: 1, ex: 'An algorithm is step-by-step instructions! Like a recipe tells you how to make food, an algorithm tells a computer exactly what to do and in what order.', exHi: 'An algorithm is step-by-step instructions! Like a recipe tells you how to make food, an algorithm tells a computer exactly what to do and in what order.' },
                { q: 'When you brush your teeth following steps, you are following?', qHi: 'When you brush your teeth following steps, you are following?',
                  opts: ['A magic spell', 'An algorithm', 'A pattern', 'A sensor'], optsHi: ['A magic spell', 'An algorithm', 'A pattern', 'A sensor'],
                  c: 1, ex: 'An algorithm! Pick brush → add paste → brush → rinse. That is an algorithm — step-by-step instructions!', exHi: 'An algorithm! Pick brush → add paste → brush → rinse. That is an algorithm — step-by-step instructions!' },
                { q: 'Google Maps finds the fastest route using?', qHi: 'Google Maps finds the fastest route using?',
                  opts: ['Magic', 'Asking drivers', 'An algorithm that checks all roads and times', 'Human guides'], optsHi: ['Magic', 'Asking drivers', 'An algorithm that checks all roads and times', 'Human guides'],
                  c: 2, ex: 'An algorithm! Google Maps automatically checks all possible routes, calculates travel time for each, and picks the fastest one for you!', exHi: 'An algorithm! Google Maps automatically checks all possible routes, calculates travel time for each, and picks the fastest one for you!' },
                { q: 'What makes a GOOD algorithm?', qHi: 'What makes a GOOD algorithm?',
                  opts: ['It is very long', 'Clear steps in the right order that work every time', 'It uses computers only', 'It is very complicated'], optsHi: ['It is very long', 'Clear steps in the right order that work every time', 'It uses computers only', 'It is very complicated'],
                  c: 1, ex: 'A good algorithm is: clear steps + correct order + works every time. Simple and reliable is better than complex and confusing!', exHi: 'A good algorithm is: clear steps + correct order + works every time. Simple and reliable is better than complex and confusing!' },
                { q: 'Email spam filter works by?', qHi: 'Email spam filter works by?',
                  opts: ['Humans reading every email', 'An algorithm checking for suspicious patterns', 'Deleting all emails', 'Random selection'], optsHi: ['Humans reading every email', 'An algorithm checking for suspicious patterns', 'Deleting all emails', 'Random selection'],
                  c: 1, ex: 'Algorithm! It checks patterns: unknown sender, suspicious words, too many links. If these patterns match spam patterns → move to Spam folder!', exHi: 'Algorithm! It checks patterns: unknown sender, suspicious words, too many links. If these patterns match spam patterns → move to Spam folder!' }
              ]
            }
          ]
        },
        {
          id: 'c3_4', icon: '🌍', title: 'AI All Around Us — Smart Machines in Daily Life!', titleHi: 'AI All Around Us — Smart Machines in Daily Life!', xp: 15,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 3 · AI IN LIFE · CHAPTER 4', tagHi: 'CLASS 3 · AI IN LIFE · CHAPTER 4',
              title: 'AI is Helping India Every Single Day!', titleHi: 'AI is Helping India Every Single Day!',
              intro: 'From your phone to your school to your neighborhood — AI is working hard to make life better in India!', introHi: 'From your phone to your school to your neighborhood — AI is working hard to make life better in India!',
              speech: '<span class="hi">AI in YOUR Daily Life:</span><br><br>⏰ <span class="em">Morning:</span> Phone alarm → AI adjusts based on your sleep<br>🗺️ <span class="cool">Going to school:</span> Google Maps → AI avoids traffic<br>🎵 <span class="hi">Music:</span> Spotify → AI picks your favorite songs<br>📚 <span class="em">Homework:</span> Google search → AI finds answers<br>🎮 <span class="cool">Gaming:</span> PUBG enemies → AI plays against you<br>🛒 <span class="hi">Shopping:</span> Flipkart → AI shows things you like<br><br><span class="em">India\'s own AI: Aadhaar, UPI, DigiLocker — all use AI!</span>',
              speechHi: '<span class="hi">AI in YOUR Daily Life:</span><br><br>⏰ <span class="em">Morning:</span> Phone alarm → AI adjusts based on your sleep<br>🗺️ <span class="cool">Going to school:</span> Google Maps → AI avoids traffic<br>🎵 <span class="hi">Music:</span> Spotify → AI picks your favorite songs<br>📚 <span class="em">Homework:</span> Google search → AI finds answers<br>🎮 <span class="cool">Gaming:</span> PUBG enemies → AI plays against you<br>🛒 <span class="hi">Shopping:</span> Flipkart → AI shows things you like<br><br><span class="em">India\'s own AI: Aadhaar, UPI, DigiLocker — all use AI!</span>'
            },
            { type: 'concepts', tag: 'CLASS 3 · INDIA AI', tagHi: 'CLASS 3 · INDIA AI',
              title: 'AI Made in India — Desh ka AI!', titleHi: 'AI Made in India — Desh ka AI!',
              intro: 'India has built some of the most powerful AI systems in the world!', introHi: 'India has built some of the most powerful AI systems in the world!',
              items: [
                { em:'🆔', l:'Aadhaar — World Record!', lHi:'Aadhaar — World Record!', d:'1.3 BILLION Indians have Aadhaar. AI checks your fingerprint in 0.1 seconds to confirm who you are! World\'s biggest biometric system.', dHi:'1.3 BILLION Indians have Aadhaar. AI checks your fingerprint in 0.1 seconds to confirm who you are! World\'s biggest biometric system.' },
                { em:'💰', l:'UPI — India\'s Pride', lHi:'UPI — India\'s Pride', d:'PhonePe, Google Pay, Paytm use AI to detect fraud in 0.01 seconds. 500 crore+ transactions every month, mostly fraud-free!', dHi:'PhonePe, Google Pay, Paytm use AI to detect fraud in 0.01 seconds. 500 crore+ transactions every month, mostly fraud-free!' },
                { em:'🚀', l:'ISRO — AI in Space', lHi:'ISRO — AI in Space', d:'Chandrayaan-3 used AI to land on the Moon\'s south pole! AI processed thousands of calculations per second. India is space superpower!', dHi:'Chandrayaan-3 used AI to land on the Moon\'s south pole! AI processed thousands of calculations per second. India is space superpower!' },
                { em:'🌾', l:'KisanAI — Helping Farmers', lHi:'KisanAI — Helping Farmers', d:'AI takes satellite photos of farms and tells farmers: "Your wheat has rust disease — treat it now!" Saves crores in crop losses every year.', dHi:'AI takes satellite photos of farms and tells farmers: "Your wheat has rust disease — treat it now!" Saves crores in crop losses every year.' },
                { em:'📚', l:'DIKSHA — Education AI', lHi:'DIKSHA — Education AI', d:'Government AI platform teaches 20 crore students in 20 Indian languages. Even children in remote villages can access great education!', dHi:'Government AI platform teaches 20 crore students in 20 Indian languages. Even children in remote villages can access great education!' },
                { em:'🏥', l:'AIIMS AI — Saving Lives', lHi:'AIIMS AI — Saving Lives', d:'AI at AIIMS hospital can detect cancer from X-ray images. Catches diseases earlier than human doctors in some cases!', dHi:'AI at AIIMS hospital can detect cancer from X-ray images. Catches diseases earlier than human doctors in some cases!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 3 · INDIA AI QUIZ', tagHi: 'CLASS 3 · INDIA AI QUIZ',
              title: '🧩 AI in India Quiz!', titleHi: '🧩 AI in India Quiz!',
              questions: [
                { q: 'How many Indians have Aadhaar biometric ID?', qHi: 'How many Indians have Aadhaar biometric ID?',
                  opts: ['1 crore', '10 crore', '1.3 billion (130 crore)', '50 lakh'], optsHi: ['1 crore', '10 crore', '1.3 billion (130 crore)', '50 lakh'],
                  c: 2, ex: '1.3 billion = 130 crore Indians! Aadhaar is the world\'s largest biometric database. AI verifies your fingerprint in just 0.1 seconds!', exHi: '1.3 billion = 130 crore Indians! Aadhaar is the world\'s largest biometric database. AI verifies your fingerprint in just 0.1 seconds!' },
                { q: 'ISRO used AI for which mission?', qHi: 'ISRO used AI for which mission?',
                  opts: ['Mangalyaan only', 'Chandrayaan-3 Moon landing', 'Building rockets', 'Launching satellites only'], optsHi: ['Mangalyaan only', 'Chandrayaan-3 Moon landing', 'Building rockets', 'Launching satellites only'],
                  c: 1, ex: 'Chandrayaan-3! AI processed thousands of calculations per second to land safely on the Moon\'s south pole in 2023. Proud moment for India!', exHi: 'Chandrayaan-3! AI processed thousands of calculations per second to land safely on the Moon\'s south pole in 2023. Proud moment for India!' },
                { q: 'KisanAI helps farmers by?', qHi: 'KisanAI helps farmers by?',
                  opts: ['Selling crops for them', 'Detecting crop diseases from satellite photos', 'Giving loans', 'Driving tractors'], optsHi: ['Selling crops for them', 'Detecting crop diseases from satellite photos', 'Giving loans', 'Driving tractors'],
                  c: 1, ex: 'KisanAI analyzes satellite images of farms! It detects diseases like rust or blight early — before they spread. Saves crores of rupees in crop losses!', exHi: 'KisanAI analyzes satellite images of farms! It detects diseases like rust or blight early — before they spread. Saves crores of rupees in crop losses!' },
                { q: 'DIKSHA is an AI platform for?', qHi: 'DIKSHA is an AI platform for?',
                  opts: ['Banking', 'Education in 20 Indian languages', 'Shopping', 'Gaming'], optsHi: ['Banking', 'Education in 20 Indian languages', 'Shopping', 'Gaming'],
                  c: 1, ex: 'DIKSHA is India\'s government AI education platform! It teaches 20 crore students in 20+ languages including Hindi, Tamil, Telugu, Marathi, and more.', exHi: 'DIKSHA is India\'s government AI education platform! It teaches 20 crore students in 20+ languages including Hindi, Tamil, Telugu, Marathi, and more.' },
                { q: 'UPI platforms like Paytm use AI to?', qHi: 'UPI platforms like Paytm use AI to?',
                  opts: ['Design the app', 'Detect fraud in transactions instantly', 'Print money', 'Build phones'], optsHi: ['Design the app', 'Detect fraud in transactions instantly', 'Print money', 'Build phones'],
                  c: 1, ex: 'Fraud detection! AI monitors every UPI transaction and blocks suspicious ones in milliseconds — protecting your money automatically!', exHi: 'Fraud detection! AI monitors every UPI transaction and blocks suspicious ones in milliseconds — protecting your money automatically!' }
              ]
            }
          ]
        }
      ]
    }]
  },
  4: {
    label: 'Class 4', labelHi: 'कक्षा 4', badge: '💡 AI Learner', badgeHi: '💡 AI सीखने वाला',
    badgeStyle: 'background:rgba(168,85,247,.15);color:#A855F7;border:1px solid rgba(168,85,247,.3)',
    emoji: '💡',
    subjects: [{
      id: 's4_ct', icon: '🔍', name: 'Sensors, Logic & Problem Solving', nameHi: 'सेंसर, लॉजिक और समस्या समाधान',
      chapters: [
        {
          id: 'c4_1', icon: '🔍', title: 'How Computers See and Hear — Sensors!', titleHi: 'How Computers See and Hear — Sensors!', xp: 18,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 4 · SENSORS · CHAPTER 1', tagHi: 'CLASS 4 · SENSORS · CHAPTER 1',
              title: 'How Computers Feel the World — Through Sensors!', titleHi: 'How Computers Feel the World — Through Sensors!',
              intro: 'Humans use eyes, ears, and nose to feel the world. Computers use SENSORS! Let\'s discover how!', introHi: 'Humans use eyes, ears, and nose to feel the world. Computers use SENSORS! Let\'s discover how!',
              speech: '<span class="hi">Sensor</span> = A device that <span class="em">detects</span> something from the world<br><br>You have senses → Computers have sensors!<br>👁️ <span class="em">Eyes</span> → <span class="cool">Camera sensor</span> (phones, CCTV)<br>👂 <span class="em">Ears</span> → <span class="cool">Microphone sensor</span> (Alexa, Siri)<br>👃 <span class="em">Nose</span> → <span class="cool">Gas/smell sensor</span> (smoke detectors)<br>✋ <span class="em">Touch</span> → <span class="cool">Touchscreen sensor</span> (your phone!)<br>🌡️ <span class="em">Feeling hot/cold</span> → <span class="cool">Temperature sensor</span><br><br><span class="hi">AI + Sensors = Smart Machines that understand the world!</span>',
              speechHi: '<span class="hi">Sensor</span> = A device that <span class="em">detects</span> something from the world<br><br>You have senses → Computers have sensors!<br>👁️ <span class="em">Eyes</span> → <span class="cool">Camera sensor</span> (phones, CCTV)<br>👂 <span class="em">Ears</span> → <span class="cool">Microphone sensor</span> (Alexa, Siri)<br>👃 <span class="em">Nose</span> → <span class="cool">Gas/smell sensor</span> (smoke detectors)<br>✋ <span class="em">Touch</span> → <span class="cool">Touchscreen sensor</span> (your phone!)<br>🌡️ <span class="em">Feeling hot/cold</span> → <span class="cool">Temperature sensor</span><br><br><span class="hi">AI + Sensors = Smart Machines that understand the world!</span>'
            },
            { type: 'concepts', tag: 'CLASS 4 · SENSOR USES', tagHi: 'CLASS 4 · SENSOR USES',
              title: 'Sensors Make AI Smart!', titleHi: 'Sensors Make AI Smart!',
              intro: 'Every smart device you use is full of sensors feeding data to AI!', introHi: 'Every smart device you use is full of sensors feeding data to AI!',
              items: [
                { em:'📱', l:'Your Phone Has 10+ Sensors!', lHi:'Your Phone Has 10+ Sensors!', d:'Front camera, rear camera, microphone, touchscreen, GPS (location), accelerometer (knows if you rotate), fingerprint, light sensor — all sensors!', dHi:'Front camera, rear camera, microphone, touchscreen, GPS (location), accelerometer (knows if you rotate), fingerprint, light sensor — all sensors!' },
                { em:'🚗', l:'Self-Driving Car Sensors', lHi:'Self-Driving Car Sensors', d:'Cameras see the road, radar detects objects 200m away, LIDAR creates a 3D map of surroundings. AI processes all sensors together to drive safely!', dHi:'Cameras see the road, radar detects objects 200m away, LIDAR creates a 3D map of surroundings. AI processes all sensors together to drive safely!' },
                { em:'🏠', l:'Smart Home Sensors', lHi:'Smart Home Sensors', d:'Motion sensors turn lights on when you enter. Temperature sensors adjust AC automatically. Door sensors alert your phone if opened!', dHi:'Motion sensors turn lights on when you enter. Temperature sensors adjust AC automatically. Door sensors alert your phone if opened!' },
                { em:'🏥', l:'Medical Sensors', lHi:'Medical Sensors', d:'Pulse oximeter measures oxygen in blood. Smart watch measures heart rate 24/7. AI analyzes patterns and alerts doctor if something is wrong!', dHi:'Pulse oximeter measures oxygen in blood. Smart watch measures heart rate 24/7. AI analyzes patterns and alerts doctor if something is wrong!' },
                { em:'🌾', l:'Farm Sensors', lHi:'Farm Sensors', d:'Soil moisture sensors tell farmers when to water crops. Temperature sensors protect plants from frost. AI combines all data to give advice!', dHi:'Soil moisture sensors tell farmers when to water crops. Temperature sensors protect plants from frost. AI combines all data to give advice!' },
                { em:'✈️', l:'Airplane Sensors', lHi:'Airplane Sensors', d:'1000+ sensors on a modern airplane! Monitor engine temperature, wing stress, fuel level, altitude. AI alerts pilots if anything is wrong.', dHi:'1000+ sensors on a modern airplane! Monitor engine temperature, wing stress, fuel level, altitude. AI alerts pilots if anything is wrong.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 4 · SENSORS QUIZ', tagHi: 'CLASS 4 · SENSORS QUIZ',
              title: '🧩 Sensors Quiz!', titleHi: '🧩 Sensors Quiz!',
              questions: [
                { q: 'What is a sensor?', qHi: 'What is a sensor?',
                  opts: ['A robot arm', 'A device that detects something from the world', 'A type of AI', 'A computer screen'], optsHi: ['A robot arm', 'A device that detects something from the world', 'A type of AI', 'A computer screen'],
                  c: 1, ex: 'A sensor detects things from the world — light, sound, temperature, touch, movement. It is how machines feel their environment!', exHi: 'A sensor detects things from the world — light, sound, temperature, touch, movement. It is how machines feel their environment!' },
                { q: 'Which sensor does Alexa use to hear you?', qHi: 'Which sensor does Alexa use to hear you?',
                  opts: ['Camera sensor', 'Touchscreen', 'Microphone sensor', 'GPS sensor'], optsHi: ['Camera sensor', 'Touchscreen', 'Microphone sensor', 'GPS sensor'],
                  c: 2, ex: 'Microphone sensor! Alexa is always listening for the word "Alexa" using its microphone. When it hears it, the AI wakes up and processes your command.', exHi: 'Microphone sensor! Alexa is always listening for the word "Alexa" using its microphone. When it hears it, the AI wakes up and processes your command.' },
                { q: 'What sensor does your phone use to know when you rotate it?', qHi: 'What sensor does your phone use to know when you rotate it?',
                  opts: ['Camera', 'Accelerometer/Gyroscope', 'Microphone', 'Fingerprint'], optsHi: ['Camera', 'Accelerometer/Gyroscope', 'Microphone', 'Fingerprint'],
                  c: 1, ex: 'Accelerometer! It detects movement and rotation. When you rotate your phone, the accelerometer tells AI which way is up, so the screen rotates too!', exHi: 'Accelerometer! It detects movement and rotation. When you rotate your phone, the accelerometer tells AI which way is up, so the screen rotates too!' },
                { q: 'Self-driving cars use LIDAR to?', qHi: 'Self-driving cars use LIDAR to?',
                  opts: ['Listen to traffic', 'Create a 3D map of surroundings', 'Take photos only', 'Check fuel'], optsHi: ['Listen to traffic', 'Create a 3D map of surroundings', 'Take photos only', 'Check fuel'],
                  c: 1, ex: 'LIDAR creates a 3D map! It shoots laser beams in all directions and measures how long they take to bounce back. AI uses this 3D map to navigate safely.', exHi: 'LIDAR creates a 3D map! It shoots laser beams in all directions and measures how long they take to bounce back. AI uses this 3D map to navigate safely.' },
                { q: 'Smart home temperature sensors are used to?', qHi: 'Smart home temperature sensors are used to?',
                  opts: ['Make the home look nice', 'Automatically adjust the AC based on temperature', 'Cook food', 'Water plants only'], optsHi: ['Make the home look nice', 'Automatically adjust the AC based on temperature', 'Cook food', 'Water plants only'],
                  c: 1, ex: 'Auto-adjust AC! When it gets too hot or cold, the sensor detects it and AI automatically adjusts the air conditioner — no human needed!', exHi: 'Auto-adjust AC! When it gets too hot or cold, the sensor detects it and AI automatically adjusts the air conditioner — no human needed!' }
              ]
            }
          ]
        },
        {
          id: 'c4_2', icon: '🤔', title: 'True or False? How Computers Make Decisions!', titleHi: 'True or False? How Computers Make Decisions!', xp: 18,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 4 · DECISIONS · CHAPTER 2', tagHi: 'CLASS 4 · DECISIONS · CHAPTER 2',
              title: 'Yes or No — How AI Makes Every Decision!', titleHi: 'Yes or No — How AI Makes Every Decision!',
              intro: 'Every decision a computer makes is based on YES or NO questions! This is called Boolean Logic — the brain of all computers!', introHi: 'Every decision a computer makes is based on YES or NO questions! This is called Boolean Logic — the brain of all computers!',
              speech: '<span class="hi">Boolean Logic</span> = Everything is either <span class="em">TRUE</span> or <span class="cool">FALSE</span><br><br>Computer thinks in 1s and 0s:<br><span class="em">1 = TRUE = YES = ON</span><br><span class="cool">0 = FALSE = NO = OFF</span><br><br><strong>Example — Spam Email Filter:</strong><br>Is sender unknown? TRUE → +1 suspicious point<br>Does subject say "FREE MONEY"? TRUE → +2 suspicious points<br>Are there 10+ links? TRUE → +2 suspicious points<br>Total > 3? <span class="hi">TRUE → SPAM!</span><br><br>This is how <span class="em">all AI decisions</span> work — just Yes/No questions!',
              speechHi: '<span class="hi">Boolean Logic</span> = Everything is either <span class="em">TRUE</span> or <span class="cool">FALSE</span><br><br>Computer thinks in 1s and 0s:<br><span class="em">1 = TRUE = YES = ON</span><br><span class="cool">0 = FALSE = NO = OFF</span><br><br><strong>Example — Spam Email Filter:</strong><br>Is sender unknown? TRUE → +1 suspicious point<br>Does subject say "FREE MONEY"? TRUE → +2 suspicious points<br>Are there 10+ links? TRUE → +2 suspicious points<br>Total > 3? <span class="hi">TRUE → SPAM!</span><br><br>This is how <span class="em">all AI decisions</span> work — just Yes/No questions!'
            },
            { type: 'concepts', tag: 'CLASS 4 · DECISION EXAMPLES', tagHi: 'CLASS 4 · DECISION EXAMPLES',
              title: 'Computers Making Smart Decisions!', titleHi: 'Computers Making Smart Decisions!',
              intro: 'Every time AI decides something — it is just asking True/False questions!', introHi: 'Every time AI decides something — it is just asking True/False questions!',
              items: [
                { em:'🚦', l:'Traffic Light AI', lHi:'Traffic Light AI', d:'Is pedestrian waiting? AND is timer finished? → BOTH TRUE → Change to green! Simple True/False logic controls traffic.', dHi:'Is pedestrian waiting? AND is timer finished? → BOTH TRUE → Change to green! Simple True/False logic controls traffic.' },
                { em:'🎮', l:'Game AI Decisions', lHi:'Game AI Decisions', d:'Is enemy near? TRUE. Is player health low? TRUE. Attack or retreat? AI decides in microseconds using Yes/No logic!', dHi:'Is enemy near? TRUE. Is player health low? TRUE. Attack or retreat? AI decides in microseconds using Yes/No logic!' },
                { em:'💳', l:'Bank Fraud Detection', lHi:'Bank Fraud Detection', d:'Is transaction from new country? AND is amount very large? AND is it 3 AM? → 3 TRUEs → BLOCK transaction! Protect money!', dHi:'Is transaction from new country? AND is amount very large? AND is it 3 AM? → 3 TRUEs → BLOCK transaction! Protect money!' },
                { em:'🎓', l:'Online Exam System', lHi:'Online Exam System', d:'Has time run out? OR has student submitted? → Either TRUE → Save answers and end exam. Computers never miss this!', dHi:'Has time run out? OR has student submitted? → Either TRUE → Save answers and end exam. Computers never miss this!' },
                { em:'🛒', l:'Out of Stock Alert', lHi:'Out of Stock Alert', d:'Is product quantity = 0? TRUE → Send alert to supplier. TRUE → Show "Out of Stock" to buyers. Simple but powerful!', dHi:'Is product quantity = 0? TRUE → Send alert to supplier. TRUE → Show "Out of Stock" to buyers. Simple but powerful!' },
                { em:'📱', l:'Face Unlock', lHi:'Face Unlock', d:'Does face match stored face? TRUE → Unlock phone. FALSE → Keep locked. Just one True/False question protects all your data!', dHi:'Does face match stored face? TRUE → Unlock phone. FALSE → Keep locked. Just one True/False question protects all your data!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 4 · DECISIONS QUIZ', tagHi: 'CLASS 4 · DECISIONS QUIZ',
              title: '🧩 Computer Decisions Quiz!', titleHi: '🧩 Computer Decisions Quiz!',
              questions: [
                { q: 'In Boolean logic, what are the only two values?', qHi: 'In Boolean logic, what are the only two values?',
                  opts: ['Yes and Maybe', 'True and False (1 and 0)', 'Big and Small', 'Fast and Slow'], optsHi: ['Yes and Maybe', 'True and False (1 and 0)', 'Big and Small', 'Fast and Slow'],
                  c: 1, ex: 'True and False (or 1 and 0)! Every single decision a computer makes comes down to these two values. This is the foundation of all computing!', exHi: 'True and False (or 1 and 0)! Every single decision a computer makes comes down to these two values. This is the foundation of all computing!' },
                { q: 'Face unlock works by asking?', qHi: 'Face unlock works by asking?',
                  opts: ['How many fingers you have', 'Does this face match the stored face? (True or False)', 'What color is your hair', 'How tall are you'], optsHi: ['How many fingers you have', 'Does this face match the stored face? (True or False)', 'What color is your hair', 'How tall are you'],
                  c: 1, ex: 'TRUE or FALSE — does this face match? AI compares your face to the stored one. True = match = unlock. False = no match = stay locked!', exHi: 'TRUE or FALSE — does this face match? AI compares your face to the stored one. True = match = unlock. False = no match = stay locked!' },
                { q: 'Bank fraud detection blocks transactions when suspicious checks are?', qHi: 'Bank fraud detection blocks transactions when suspicious checks are?',
                  opts: ['All FALSE', 'Mixed True and False', 'All or mostly TRUE', 'Random'], optsHi: ['All FALSE', 'Mixed True and False', 'All or mostly TRUE', 'Random'],
                  c: 2, ex: 'When suspicious indicators are ALL or mostly TRUE — like foreign country + large amount + unusual time — AI blocks the transaction to protect your money!', exHi: 'When suspicious indicators are ALL or mostly TRUE — like foreign country + large amount + unusual time — AI blocks the transaction to protect your money!' },
                { q: 'Boolean logic uses which numbers to represent True and False?', qHi: 'Boolean logic uses which numbers to represent True and False?',
                  opts: ['2 and 3', '1 and 0', '10 and 100', '7 and 8'], optsHi: ['2 and 3', '1 and 0', '10 and 100', '7 and 8'],
                  c: 1, ex: '1 = True, 0 = False! All computer data — videos, photos, music, text — is ultimately stored as millions of 1s and 0s. This is called binary!', exHi: '1 = True, 0 = False! All computer data — videos, photos, music, text — is ultimately stored as millions of 1s and 0s. This is called binary!' },
                { q: 'Traffic light changes when?', qHi: 'Traffic light changes when?',
                  opts: ['Randomly', 'The driver asks politely', 'When both conditions (pedestrian waiting AND timer done) are TRUE', 'Only at night'], optsHi: ['Randomly', 'The driver asks politely', 'When both conditions (pedestrian waiting AND timer done) are TRUE', 'Only at night'],
                  c: 2, ex: 'When both conditions are TRUE! Modern traffic AI checks multiple conditions simultaneously — pedestrian waiting, timer finished, emergency vehicles approaching — and decides based on True/False logic.', exHi: 'When both conditions are TRUE! Modern traffic AI checks multiple conditions simultaneously — pedestrian waiting, timer finished, emergency vehicles approaching — and decides based on True/False logic.' }
              ]
            }
          ]
        },
        {
          id: 'c4_3', icon: '🧩', title: 'Problem Solving — Breaking Big Problems Small!', titleHi: 'Problem Solving — Breaking Big Problems Small!', xp: 18,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 4 · PROBLEM SOLVING · CHAPTER 3', tagHi: 'CLASS 4 · PROBLEM SOLVING · CHAPTER 3',
              title: 'Decomposition — The Superpower of Smart Thinkers!', titleHi: 'Decomposition — The Superpower of Smart Thinkers!',
              intro: 'The secret to solving any big problem? Break it into smaller pieces! This is called Decomposition — and it is how all programmers and AI systems work!', introHi: 'The secret to solving any big problem? Break it into smaller pieces! This is called Decomposition — and it is how all programmers and AI systems work!',
              speech: '<span class="hi">Decomposition</span> = Breaking a <span class="em">big problem</span> into <span class="cool">small easy pieces</span><br><br><strong>Example: How does Google Maps work?</strong><br>Big problem: "Get me from home to school fastest"<br><br>Break it down:<br>📍 Step 1: Find current location (GPS)<br>🗺️ Step 2: Find all possible routes<br>⏱️ Step 3: Calculate time for each route<br>🚗 Step 4: Check current traffic on each<br>✅ Step 5: Pick shortest time → Show it!<br><br><span class="em">5 small easy problems</span> instead of <span class="hi">1 huge impossible problem!</span><br><br>Decomposition is used by: Google, ISRO, Doctors, Architects, YOU!',
              speechHi: '<span class="hi">Decomposition</span> = Breaking a <span class="em">big problem</span> into <span class="cool">small easy pieces</span><br><br><strong>Example: How does Google Maps work?</strong><br>Big problem: "Get me from home to school fastest"<br><br>Break it down:<br>📍 Step 1: Find current location (GPS)<br>🗺️ Step 2: Find all possible routes<br>⏱️ Step 3: Calculate time for each route<br>🚗 Step 4: Check current traffic on each<br>✅ Step 5: Pick shortest time → Show it!<br><br><span class="em">5 small easy problems</span> instead of <span class="hi">1 huge impossible problem!</span><br><br>Decomposition is used by: Google, ISRO, Doctors, Architects, YOU!'
            },
            { type: 'concepts', tag: 'CLASS 4 · DECOMPOSITION', tagHi: 'CLASS 4 · DECOMPOSITION',
              title: 'Big Problems Made Small!', titleHi: 'Big Problems Made Small!',
              intro: 'Every complex thing you see was built by breaking it into small pieces!', introHi: 'Every complex thing you see was built by breaking it into small pieces!',
              items: [
                { em:'🏗️', l:'Building a School', lHi:'Building a School', d:'1. Design classrooms. 2. Buy materials. 3. Pour foundation. 4. Build walls. 5. Add roof. 6. Install doors/windows. 7. Paint. Each step is separate!', dHi:'1. Design classrooms. 2. Buy materials. 3. Pour foundation. 4. Build walls. 5. Add roof. 6. Install doors/windows. 7. Paint. Each step is separate!' },
                { em:'🚀', l:'ISRO Rocket Launch', lHi:'ISRO Rocket Launch', d:'1. Design rocket. 2. Build fuel tanks. 3. Build engine. 4. Program guidance system. 5. Safety checks. 6. Launch. Decomposed into 100s of tasks!', dHi:'1. Design rocket. 2. Build fuel tanks. 3. Build engine. 4. Program guidance system. 5. Safety checks. 6. Launch. Decomposed into 100s of tasks!' },
                { em:'🎮', l:'Making a Video Game', lHi:'Making a Video Game', d:'1. Design characters. 2. Create levels. 3. Write game logic. 4. Add sounds. 5. Test bugs. 6. Release. Each part done by a different team!', dHi:'1. Design characters. 2. Create levels. 3. Write game logic. 4. Add sounds. 5. Test bugs. 6. Release. Each part done by a different team!' },
                { em:'🍕', l:'Zomato Delivery', lHi:'Zomato Delivery', d:'1. Receive order. 2. Find nearest restaurant. 3. Send order to kitchen. 4. Assign delivery person. 5. Track delivery. Each is a separate system!', dHi:'1. Receive order. 2. Find nearest restaurant. 3. Send order to kitchen. 4. Assign delivery person. 5. Track delivery. Each is a separate system!' },
                { em:'🏥', l:'Doctor Diagnosing', lHi:'Doctor Diagnosing', d:'1. Ask symptoms. 2. Examine patient. 3. Run tests. 4. Compare results. 5. Diagnose. 6. Prescribe. Not one guess — systematic process!', dHi:'1. Ask symptoms. 2. Examine patient. 3. Run tests. 4. Compare results. 5. Diagnose. 6. Prescribe. Not one guess — systematic process!' },
                { em:'📱', l:'WhatsApp Message', lHi:'WhatsApp Message', d:'1. You type. 2. Message compressed. 3. Sent to server. 4. Server finds receiver. 5. Sent to receiver. 6. Decrypted and shown. 6 steps for one message!', dHi:'1. You type. 2. Message compressed. 3. Sent to server. 4. Server finds receiver. 5. Sent to receiver. 6. Decrypted and shown. 6 steps for one message!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 4 · DECOMPOSITION QUIZ', tagHi: 'CLASS 4 · DECOMPOSITION QUIZ',
              title: '🧩 Problem Solving Quiz!', titleHi: '🧩 Problem Solving Quiz!',
              questions: [
                { q: 'Decomposition means?', qHi: 'Decomposition means?',
                  opts: ['Making problems bigger', 'Breaking a big problem into smaller easy pieces', 'Making computers faster', 'Learning to type fast'], optsHi: ['Making problems bigger', 'Breaking a big problem into smaller easy pieces', 'Making computers faster', 'Learning to type fast'],
                  c: 1, ex: 'Breaking big into small! Decomposition is splitting a complex problem into smaller, manageable pieces that are easier to solve. It is a fundamental computational thinking skill!', exHi: 'Breaking big into small! Decomposition is splitting a complex problem into smaller, manageable pieces that are easier to solve. It is a fundamental computational thinking skill!' },
                { q: 'ISRO builds rockets by?', qHi: 'ISRO builds rockets by?',
                  opts: ['One person building everything', 'Decomposing into hundreds of separate tasks done by teams', 'Guessing and hoping', 'Buying from other countries'], optsHi: ['One person building everything', 'Decomposing into hundreds of separate tasks done by teams', 'Guessing and hoping', 'Buying from other countries'],
                  c: 1, ex: 'Decomposition! ISRO breaks rocket building into hundreds of specialized tasks — engines, fuel systems, guidance, communications — each done by expert teams.', exHi: 'Decomposition! ISRO breaks rocket building into hundreds of specialized tasks — engines, fuel systems, guidance, communications — each done by expert teams.' },
                { q: 'Zomato delivery involves how many separate systems working together?', qHi: 'Zomato delivery involves how many separate systems working together?',
                  opts: ['Just 1 — the app', '2 — restaurant and delivery', 'Multiple decomposed systems: order, restaurant, delivery, payment', 'It is all done manually'], optsHi: ['Just 1 — the app', '2 — restaurant and delivery', 'Multiple decomposed systems: order, restaurant, delivery, payment', 'It is all done manually'],
                  c: 2, ex: 'Multiple systems! Order receiving, restaurant assignment, kitchen tracking, delivery assignment, live tracking, payment — each is a separate decomposed system!', exHi: 'Multiple systems! Order receiving, restaurant assignment, kitchen tracking, delivery assignment, live tracking, payment — each is a separate decomposed system!' },
                { q: 'Why is decomposition useful?', qHi: 'Why is decomposition useful?',
                  opts: ['It makes problems harder', 'It makes big complex problems easier to solve one piece at a time', 'It slows down computers', 'It is only for math problems'], optsHi: ['It makes problems harder', 'It makes big complex problems easier to solve one piece at a time', 'It slows down computers', 'It is only for math problems'],
                  c: 1, ex: 'Decomposition makes problems manageable! Instead of being overwhelmed by one huge problem, you solve many small problems. This is how all great engineers and programmers think!', exHi: 'Decomposition makes problems manageable! Instead of being overwhelmed by one huge problem, you solve many small problems. This is how all great engineers and programmers think!' },
                { q: 'When making a video game, decomposition means?', qHi: 'When making a video game, decomposition means?',
                  opts: ['One person doing everything', 'Separate teams for characters, levels, sound, testing etc.', 'Playing games only', 'Buying readymade games'], optsHi: ['One person doing everything', 'Separate teams for characters, levels, sound, testing etc.', 'Playing games only', 'Buying readymade games'],
                  c: 1, ex: 'Separate teams! Characters team, levels team, sound team, testing team — each focuses on their small piece. Together they create a complete game!', exHi: 'Separate teams! Characters team, levels team, sound team, testing team — each focuses on their small piece. Together they create a complete game!' }
              ]
            }
          ]
        }
      ]
    }]
  },
  5: {
    label: 'Class 5', labelHi: 'कक्षा 5', badge: '🔬 CT Thinker', badgeHi: '🔬 CT थिंकर',
    badgeStyle: 'background:rgba(20,184,166,.15);color:#14B8A6;border:1px solid rgba(20,184,166,.3)',
    emoji: '🔬',
    subjects: [{
      id: 's5_ct', icon: '💭', name: 'Computational Thinking Deep Dive', nameHi: 'कम्प्यूटेशनल थिंकिंग गहरा अध्ययन',
      chapters: [
        {
          id: 'c5_1', icon: '💭', title: 'Computational Thinking — The Way Smart People Think!', titleHi: 'Computational Thinking — The Way Smart People Think!', xp: 20,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 5 · CT · CHAPTER 1', tagHi: 'CLASS 5 · CT · CHAPTER 1',
              title: 'Computational Thinking — The Most Important Skill of the 21st Century!', titleHi: 'Computational Thinking — The Most Important Skill of the 21st Century!',
              intro: 'Computational Thinking is not just for computers — it is a way of solving ANY problem smarter and faster. Doctors, engineers, scientists all use it!', introHi: 'Computational Thinking is not just for computers — it is a way of solving ANY problem smarter and faster. Doctors, engineers, scientists all use it!',
              speech: '<span class="hi">Computational Thinking</span> = A <span class="em">powerful way to think</span> and solve problems<br><br>4 Key Skills:<br>🔍 <span class="em">Decomposition</span> — Break big → small<br>🔎 <span class="cool">Pattern Recognition</span> — Find what repeats<br>🎯 <span class="hi">Abstraction</span> — Focus on what matters<br>📋 <span class="em">Algorithm Design</span> — Make step-by-step plan<br><br><strong>Example: How a doctor diagnoses:</strong><br>1. Decompose: break symptoms into categories<br>2. Patterns: these symptoms together = which disease?<br>3. Abstraction: ignore irrelevant info<br>4. Algorithm: follow diagnostic steps<br><br><span class="em">This is EXACTLY how AI systems are built!</span>',
              speechHi: '<span class="hi">Computational Thinking</span> = A <span class="em">powerful way to think</span> and solve problems<br><br>4 Key Skills:<br>🔍 <span class="em">Decomposition</span> — Break big → small<br>🔎 <span class="cool">Pattern Recognition</span> — Find what repeats<br>🎯 <span class="hi">Abstraction</span> — Focus on what matters<br>📋 <span class="em">Algorithm Design</span> — Make step-by-step plan<br><br><strong>Example: How a doctor diagnoses:</strong><br>1. Decompose: break symptoms into categories<br>2. Patterns: these symptoms together = which disease?<br>3. Abstraction: ignore irrelevant info<br>4. Algorithm: follow diagnostic steps<br><br><span class="em">This is EXACTLY how AI systems are built!</span>'
            },
            { type: 'concepts', tag: 'CLASS 5 · CT SKILLS', tagHi: 'CLASS 5 · CT SKILLS',
              title: 'The 4 Powers of Computational Thinking', titleHi: 'The 4 Powers of Computational Thinking',
              intro: 'Master these 4 skills and you can solve any problem — just like a computer scientist!', introHi: 'Master these 4 skills and you can solve any problem — just like a computer scientist!',
              items: [
                { em:'✂️', l:'Decomposition — Divide & Conquer', lHi:'Decomposition — Divide & Conquer', d:'Big problem → many small problems. How ISRO launches rockets, how doctors diagnose, how WhatsApp sends messages. Break it down first!', dHi:'Big problem → many small problems. How ISRO launches rockets, how doctors diagnose, how WhatsApp sends messages. Break it down first!' },
                { em:'🔄', l:'Pattern Recognition — See What Repeats', lHi:'Pattern Recognition — See What Repeats', d:'Spot what happens again and again. How AI detects spam emails, how Netflix suggests shows, how weather forecasts work. Patterns tell the future!', dHi:'Spot what happens again and again. How AI detects spam emails, how Netflix suggests shows, how weather forecasts work. Patterns tell the future!' },
                { em:'🎯', l:'Abstraction — What Actually Matters?', lHi:'Abstraction — What Actually Matters?', d:'Ignore unnecessary details. Focus on the CORE of a problem. A map is an abstraction of reality — it shows roads but not every tree and stone.', dHi:'Ignore unnecessary details. Focus on the CORE of a problem. A map is an abstraction of reality — it shows roads but not every tree and stone.' },
                { em:'📝', l:'Algorithm — Your Step-by-Step Plan', lHi:'Algorithm — Your Step-by-Step Plan', d:'Once you understand the problem: write exact steps to solve it. Must be: clear, in order, complete, and work every single time.', dHi:'Once you understand the problem: write exact steps to solve it. Must be: clear, in order, complete, and work every single time.' },
                { em:'🧠', l:'CT in Real Life (Not Just Computers)', lHi:'CT in Real Life (Not Just Computers)', d:'Chefs use CT to plan recipes. Architects use CT to design buildings. Doctors use CT to diagnose. Athletes use CT to plan strategies. It is for EVERYONE!', dHi:'Chefs use CT to plan recipes. Architects use CT to design buildings. Doctors use CT to diagnose. Athletes use CT to plan strategies. It is for EVERYONE!' },
                { em:'🏆', l:'CT + AI = Superpower', lHi:'CT + AI = Superpower', d:'When you learn CT, you can understand and build AI systems. The best AI engineers in India — at Google, ISRO, IIT — all mastered CT first!', dHi:'When you learn CT, you can understand and build AI systems. The best AI engineers in India — at Google, ISRO, IIT — all mastered CT first!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 5 · CT QUIZ', tagHi: 'CLASS 5 · CT QUIZ',
              title: '🧩 Computational Thinking Quiz!', titleHi: '🧩 Computational Thinking Quiz!',
              questions: [
                { q: 'What are the 4 key skills of Computational Thinking?', qHi: 'What are the 4 key skills of Computational Thinking?',
                  opts: ['Add, Subtract, Multiply, Divide', 'Decomposition, Pattern Recognition, Abstraction, Algorithm Design', 'Reading, Writing, Maths, Science', 'Speed, Memory, Logic, Art'], optsHi: ['Add, Subtract, Multiply, Divide', 'Decomposition, Pattern Recognition, Abstraction, Algorithm Design', 'Reading, Writing, Maths, Science', 'Speed, Memory, Logic, Art'],
                  c: 1, ex: '4 CT skills: Decomposition (break into pieces), Pattern Recognition (find what repeats), Abstraction (focus on what matters), Algorithm Design (step-by-step plan). Master these and you can solve any problem!', exHi: '4 CT skills: Decomposition (break into pieces), Pattern Recognition (find what repeats), Abstraction (focus on what matters), Algorithm Design (step-by-step plan). Master these and you can solve any problem!' },
                { q: 'Abstraction in problem solving means?', qHi: 'Abstraction in problem solving means?',
                  opts: ['Making problems more complex', 'Focusing on important details and ignoring irrelevant ones', 'Drawing pictures', 'Using advanced mathematics'], optsHi: ['Making problems more complex', 'Focusing on important details and ignoring irrelevant ones', 'Drawing pictures', 'Using advanced mathematics'],
                  c: 1, ex: 'Focus on what matters! A map is a perfect example of abstraction — it shows roads and buildings but ignores individual trees, parked cars, and people. Just the important details!', exHi: 'Focus on what matters! A map is a perfect example of abstraction — it shows roads and buildings but ignores individual trees, parked cars, and people. Just the important details!' },
                { q: 'A doctor diagnosing a patient uses which CT skill first?', qHi: 'A doctor diagnosing a patient uses which CT skill first?',
                  opts: ['Algorithm only', 'Decomposition — breaking symptoms into categories', 'Pattern Recognition only', 'Abstraction only'], optsHi: ['Algorithm only', 'Decomposition — breaking symptoms into categories', 'Pattern Recognition only', 'Abstraction only'],
                  c: 1, ex: 'Decomposition first! Doctor breaks your problem into categories: fever?, pain?, when did it start?, any allergies? Decomposing the big health problem into smaller checkable pieces.', exHi: 'Decomposition first! Doctor breaks your problem into categories: fever?, pain?, when did it start?, any allergies? Decomposing the big health problem into smaller checkable pieces.' },
                { q: 'Computational Thinking is useful for?', qHi: 'Computational Thinking is useful for?',
                  opts: ['Only computer programmers', 'Everyone — doctors, engineers, chefs, architects, athletes', 'Only students in Class 11-12', 'Only people with computers'], optsHi: ['Only computer programmers', 'Everyone — doctors, engineers, chefs, architects, athletes', 'Only students in Class 11-12', 'Only people with computers'],
                  c: 1, ex: 'Everyone! CT is a universal problem-solving approach used by doctors, engineers, chefs, architects, scientists, athletes — anyone who needs to solve complex problems systematically.', exHi: 'Everyone! CT is a universal problem-solving approach used by doctors, engineers, chefs, architects, scientists, athletes — anyone who needs to solve complex problems systematically.' },
                { q: 'Pattern Recognition helps AI by?', qHi: 'Pattern Recognition helps AI by?',
                  opts: ['Making it run faster on computers', 'Helping it learn from repeating data to make predictions', 'Making the screen brighter', 'Connecting to internet faster'], optsHi: ['Making it run faster on computers', 'Helping it learn from repeating data to make predictions', 'Making the screen brighter', 'Connecting to internet faster'],
                  c: 1, ex: 'Learning from patterns! AI finds patterns in millions of data points — spam emails have certain word patterns, fraudulent transactions have time/amount patterns. Patterns = predictions!', exHi: 'Learning from patterns! AI finds patterns in millions of data points — spam emails have certain word patterns, fraudulent transactions have time/amount patterns. Patterns = predictions!' }
              ]
            }
          ]
        },
        {
          id: 'c5_2', icon: '🔗', title: 'Abstraction — What Details Really Matter?', titleHi: 'Abstraction — What Details Really Matter?', xp: 20,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 5 · ABSTRACTION · CHAPTER 2', tagHi: 'CLASS 5 · ABSTRACTION · CHAPTER 2',
              title: 'Abstraction — The Art of Ignoring What Does Not Matter!', titleHi: 'Abstraction — The Art of Ignoring What Does Not Matter!',
              intro: 'The most powerful thinking skill: knowing WHAT to ignore! Great scientists, engineers and AI systems all master abstraction.', introHi: 'The most powerful thinking skill: knowing WHAT to ignore! Great scientists, engineers and AI systems all master abstraction.',
              speech: '<span class="hi">Abstraction</span> = Focus on <span class="em">important details</span>, ignore <span class="cool">unnecessary ones</span><br><br><strong>Think about a MAP:</strong><br>❌ Map does NOT show: every tree, every person, every parked car<br>✅ Map DOES show: roads, buildings, distances, directions<br><br>A map is a perfect ABSTRACTION of reality!<br><br>More examples:<br>📱 <span class="em">WhatsApp icon</span> — looks like a phone, not a real phone<br>🚰 <span class="cool">Water tap icon</span> — represents water, not real water<br>🏥 <span class="hi">Red Cross</span> — represents hospital/medical everywhere<br><br><span class="em">AI uses abstraction to focus on KEY features of data!</span>',
              speechHi: '<span class="hi">Abstraction</span> = Focus on <span class="em">important details</span>, ignore <span class="cool">unnecessary ones</span><br><br><strong>Think about a MAP:</strong><br>❌ Map does NOT show: every tree, every person, every parked car<br>✅ Map DOES show: roads, buildings, distances, directions<br><br>A map is a perfect ABSTRACTION of reality!<br><br>More examples:<br>📱 <span class="em">WhatsApp icon</span> — looks like a phone, not a real phone<br>🚰 <span class="cool">Water tap icon</span> — represents water, not real water<br>🏥 <span class="hi">Red Cross</span> — represents hospital/medical everywhere<br><br><span class="em">AI uses abstraction to focus on KEY features of data!</span>'
            },
            { type: 'concepts', tag: 'CLASS 5 · ABSTRACTION EXAMPLES', tagHi: 'CLASS 5 · ABSTRACTION EXAMPLES',
              title: 'Abstraction in the Real World', titleHi: 'Abstraction in the Real World',
              intro: 'Abstraction makes complex things simple enough to understand and use!', introHi: 'Abstraction makes complex things simple enough to understand and use!',
              items: [
                { em:'🗺️', l:'Google Maps Abstraction', lHi:'Google Maps Abstraction', d:'Reality has billions of trees, houses, people. Maps abstract this to: roads, distances, landmarks. AI uses the map abstraction to calculate routes — not reality!', dHi:'Reality has billions of trees, houses, people. Maps abstract this to: roads, distances, landmarks. AI uses the map abstraction to calculate routes — not reality!' },
                { em:'📱', l:'App Icons Are Abstraction', lHi:'App Icons Are Abstraction', d:'Phone icon = call. Camera icon = photos. Envelope icon = email. These icons abstract complex functions into simple recognizable symbols. No words needed!', dHi:'Phone icon = call. Camera icon = photos. Envelope icon = email. These icons abstract complex functions into simple recognizable symbols. No words needed!' },
                { em:'🏧', l:'ATM Interface Abstraction', lHi:'ATM Interface Abstraction', d:'You see: account balance, withdrawal, deposit. You do NOT see: complex banking database, encryption, network protocols. Abstracted away for simplicity!', dHi:'You see: account balance, withdrawal, deposit. You do NOT see: complex banking database, encryption, network protocols. Abstracted away for simplicity!' },
                { em:'🤖', l:'How AI Uses Abstraction', lHi:'How AI Uses Abstraction', d:'Face recognition AI ignores: hair color, glasses, makeup. Focuses on: distance between eyes, nose shape, jawline. Abstracts away irrelevant features!', dHi:'Face recognition AI ignores: hair color, glasses, makeup. Focuses on: distance between eyes, nose shape, jawline. Abstracts away irrelevant features!' },
                { em:'🎓', l:'School Timetable Abstraction', lHi:'School Timetable Abstraction', d:'Timetable abstracts your week to: subject names, times, room numbers. Ignores: who teaches exactly, which textbook, weather that day. Just key info!', dHi:'Timetable abstracts your week to: subject names, times, room numbers. Ignores: who teaches exactly, which textbook, weather that day. Just key info!' },
                { em:'🚦', l:'Traffic Light Abstraction', lHi:'Traffic Light Abstraction', d:'3 colors. Green = go. Yellow = slow. Red = stop. Abstracts complex traffic management into 3 simple states everyone understands worldwide!', dHi:'3 colors. Green = go. Yellow = slow. Red = stop. Abstracts complex traffic management into 3 simple states everyone understands worldwide!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 5 · ABSTRACTION QUIZ', tagHi: 'CLASS 5 · ABSTRACTION QUIZ',
              title: '🧩 Abstraction Quiz!', titleHi: '🧩 Abstraction Quiz!',
              questions: [
                { q: 'A map is an example of abstraction because?', qHi: 'A map is an example of abstraction because?',
                  opts: ['It is made of paper', 'It shows important details (roads) but hides unnecessary ones (every tree)', 'It is colorful', 'It has a scale'], optsHi: ['It is made of paper', 'It shows important details (roads) but hides unnecessary ones (every tree)', 'It is colorful', 'It has a scale'],
                  c: 1, ex: 'Maps abstract reality! They show what is important for navigation — roads, landmarks, distances — and ignore millions of irrelevant details like individual trees, parked cars, and people.', exHi: 'Maps abstract reality! They show what is important for navigation — roads, landmarks, distances — and ignore millions of irrelevant details like individual trees, parked cars, and people.' },
                { q: 'App icons on your phone are examples of abstraction because?', qHi: 'App icons on your phone are examples of abstraction because?',
                  opts: ['They are small', 'They represent complex functions with simple recognizable symbols', 'They are colorful', 'They are made by artists'], optsHi: ['They are small', 'They represent complex functions with simple recognizable symbols', 'They are colorful', 'They are made by artists'],
                  c: 1, ex: 'Icons are abstraction! A small phone symbol represents making calls. An envelope represents emails. Complex technical functions abstracted into simple symbols anyone can understand immediately!', exHi: 'Icons are abstraction! A small phone symbol represents making calls. An envelope represents emails. Complex technical functions abstracted into simple symbols anyone can understand immediately!' },
                { q: 'How does face recognition AI use abstraction?', qHi: 'How does face recognition AI use abstraction?',
                  opts: ['It looks at everything equally', 'It focuses on key facial features (eye distance, nose shape) and ignores irrelevant ones (hair, glasses)', 'It counts your teeth', 'It checks your age'], optsHi: ['It looks at everything equally', 'It focuses on key facial features (eye distance, nose shape) and ignores irrelevant ones (hair, glasses)', 'It counts your teeth', 'It checks your age'],
                  c: 1, ex: 'Focuses on key features! AI abstracts away hair, makeup, and glasses — which change. It focuses on stable features: distance between eyes, nose shape, jawline structure. These never change!', exHi: 'Focuses on key features! AI abstracts away hair, makeup, and glasses — which change. It focuses on stable features: distance between eyes, nose shape, jawline structure. These never change!' },
                { q: 'An ATM interface abstracts away?', qHi: 'An ATM interface abstracts away?',
                  opts: ['Your bank balance', 'Complex backend banking systems, encryption, network protocols', 'Your PIN number', 'Your account number'], optsHi: ['Your bank balance', 'Complex backend banking systems, encryption, network protocols', 'Your PIN number', 'Your account number'],
                  c: 1, ex: 'Backend complexity! You just see simple buttons: check balance, withdraw, deposit. The complex databases, encryption, and network connections are all abstracted away behind that simple screen!', exHi: 'Backend complexity! You just see simple buttons: check balance, withdraw, deposit. The complex databases, encryption, and network connections are all abstracted away behind that simple screen!' },
                { q: 'Why is abstraction useful in problem solving?', qHi: 'Why is abstraction useful in problem solving?',
                  opts: ['It makes problems more complicated', 'It helps focus on what matters most, making complex problems manageable', 'It is only useful for artists', 'It slows down thinking'], optsHi: ['It makes problems more complicated', 'It helps focus on what matters most, making complex problems manageable', 'It is only useful for artists', 'It slows down thinking'],
                  c: 1, ex: 'Focus! By ignoring irrelevant details, you can focus brainpower on what truly matters. This is why great scientists, engineers, and AI systems all use abstraction as a core thinking tool!', exHi: 'Focus! By ignoring irrelevant details, you can focus brainpower on what truly matters. This is why great scientists, engineers, and AI systems all use abstraction as a core thinking tool!' }
              ]
            }
          ]
        },
        {
          id: 'c5_3', icon: '🌐', title: 'AI in Everyday Life — Seeing AI Everywhere!', titleHi: 'AI in Everyday Life — Seeing AI Everywhere!', xp: 20,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 5 · AI EVERYWHERE · CHAPTER 3', tagHi: 'CLASS 5 · AI EVERYWHERE · CHAPTER 3',
              title: 'You Use AI 100+ Times Every Day Without Knowing!', titleHi: 'You Use AI 100+ Times Every Day Without Knowing!',
              intro: 'From waking up to sleeping — AI is helping you every single moment. Let\'s count all the AIs in your day!', introHi: 'From waking up to sleeping — AI is helping you every single moment. Let\'s count all the AIs in your day!',
              speech: '<span class="hi">Your AI-Powered Day:</span><br><br>⏰ <span class="em">Wake up</span> — Smart alarm (studies your sleep patterns)<br>📱 <span class="cool">Face unlock</span> — AI recognizes your face<br>🎵 <span class="hi">Morning music</span> — Spotify AI picks your favorites<br>🌤️ <span class="em">Check weather</span> — AI predicted it 7 days ago<br>🚗 <span class="cool">School route</span> — Google Maps AI avoids traffic<br>📚 <span class="hi">Google search</span> — AI ranks 5 billion websites in 0.5 seconds<br>🎮 <span class="em">Evening games</span> — AI opponents in PUBG, Clash of Clans<br>📺 <span class="cool">Night TV</span> — Netflix AI suggested what to watch<br><br><span class="em">You interact with AI 100+ times every single day!</span>',
              speechHi: '<span class="hi">Your AI-Powered Day:</span><br><br>⏰ <span class="em">Wake up</span> — Smart alarm (studies your sleep patterns)<br>📱 <span class="cool">Face unlock</span> — AI recognizes your face<br>🎵 <span class="hi">Morning music</span> — Spotify AI picks your favorites<br>🌤️ <span class="em">Check weather</span> — AI predicted it 7 days ago<br>🚗 <span class="cool">School route</span> — Google Maps AI avoids traffic<br>📚 <span class="hi">Google search</span> — AI ranks 5 billion websites in 0.5 seconds<br>🎮 <span class="em">Evening games</span> — AI opponents in PUBG, Clash of Clans<br>📺 <span class="cool">Night TV</span> — Netflix AI suggested what to watch<br><br><span class="em">You interact with AI 100+ times every single day!</span>'
            },
            { type: 'concepts', tag: 'CLASS 5 · AI AROUND US', tagHi: 'CLASS 5 · AI AROUND US',
              title: 'AI in Every Part of Life', titleHi: 'AI in Every Part of Life',
              intro: 'AI is not just in phones and computers — it is in hospitals, farms, courts, and space!', introHi: 'AI is not just in phones and computers — it is in hospitals, farms, courts, and space!',
              items: [
                { em:'🏥', l:'AI in Healthcare', lHi:'AI in Healthcare', d:'AIIMS AI detects cancer from X-rays. Apollo AI predicts heart attacks from ECG. Practo AI helps doctors diagnose faster. AI saves lives every day in India!', dHi:'AIIMS AI detects cancer from X-rays. Apollo AI predicts heart attacks from ECG. Practo AI helps doctors diagnose faster. AI saves lives every day in India!' },
                { em:'🌾', l:'AI in Agriculture', lHi:'AI in Agriculture', d:'Kisan AI detects crop disease from satellite photos. Soil sensors tell when to water. Weather AI protects crops from frost. India\'s 600 million farmers need this!', dHi:'Kisan AI detects crop disease from satellite photos. Soil sensors tell when to water. Weather AI protects crops from frost. India\'s 600 million farmers need this!' },
                { em:'⚖️', l:'AI in Justice', lHi:'AI in Justice', d:'SUPACE — Supreme Court AI reads 10 years of legal cases in minutes. Helps judges make fair, consistent decisions based on all past cases!', dHi:'SUPACE — Supreme Court AI reads 10 years of legal cases in minutes. Helps judges make fair, consistent decisions based on all past cases!' },
                { em:'🚂', l:'AI in Railways', lHi:'AI in Railways', d:'Indian Railways AI predicts engine failures before they happen. Saves lives, saves money, keeps trains running on time for 2.3 crore passengers daily!', dHi:'Indian Railways AI predicts engine failures before they happen. Saves lives, saves money, keeps trains running on time for 2.3 crore passengers daily!' },
                { em:'🏙️', l:'AI in Smart Cities', lHi:'AI in Smart Cities', d:'Jaipur, Pune, Surat use AI traffic cameras. Count vehicles, detect violations, adjust signal timing automatically. Reduces traffic jams by 25%!', dHi:'Jaipur, Pune, Surat use AI traffic cameras. Count vehicles, detect violations, adjust signal timing automatically. Reduces traffic jams by 25%!' },
                { em:'💰', l:'AI in Finance', lHi:'AI in Finance', d:'Paytm, PhonePe, HDFC — AI detects fraud in 0.01 seconds. SBI AI handles 1 crore customer queries monthly. UPI would be impossible without AI!', dHi:'Paytm, PhonePe, HDFC — AI detects fraud in 0.01 seconds. SBI AI handles 1 crore customer queries monthly. UPI would be impossible without AI!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 5 · AI EVERYWHERE QUIZ', tagHi: 'CLASS 5 · AI EVERYWHERE QUIZ',
              title: '🧩 AI Everywhere Quiz!', titleHi: '🧩 AI Everywhere Quiz!',
              questions: [
                { q: 'Approximately how many times do you interact with AI every day?', qHi: 'Approximately how many times do you interact with AI every day?',
                  opts: ['5-10 times', '20-30 times', '50 times', '100+ times'], optsHi: ['5-10 times', '20-30 times', '50 times', '100+ times'],
                  c: 3, ex: '100+ times! Every Google search, YouTube video, WhatsApp message, Maps direction, face unlock, and autocorrect involves AI. You are surrounded by AI all day!', exHi: '100+ times! Every Google search, YouTube video, WhatsApp message, Maps direction, face unlock, and autocorrect involves AI. You are surrounded by AI all day!' },
                { q: 'SUPACE is an AI used in?', qHi: 'SUPACE is an AI used in?',
                  opts: ['Hospitals', 'Schools', 'The Supreme Court of India for legal research', 'Farms'], optsHi: ['Hospitals', 'Schools', 'The Supreme Court of India for legal research', 'Farms'],
                  c: 2, ex: 'Supreme Court! SUPACE (Supreme Court Portal for Assistance in Courts Efficiency) uses AI to analyze years of legal cases and help judges make consistent, informed decisions.', exHi: 'Supreme Court! SUPACE (Supreme Court Portal for Assistance in Courts Efficiency) uses AI to analyze years of legal cases and help judges make consistent, informed decisions.' },
                { q: 'Indian Railways uses AI to?', qHi: 'Indian Railways uses AI to?',
                  opts: ['Design train tickets', 'Predict engine failures before they happen', 'Sell tickets online only', 'Count passengers'], optsHi: ['Design train tickets', 'Predict engine failures before they happen', 'Sell tickets online only', 'Count passengers'],
                  c: 1, ex: 'Predict failures! AI analyzes engine data — vibration, temperature, wear patterns — and alerts engineers before failures happen. Prevents accidents and delays for 2.3 crore daily passengers!', exHi: 'Predict failures! AI analyzes engine data — vibration, temperature, wear patterns — and alerts engineers before failures happen. Prevents accidents and delays for 2.3 crore daily passengers!' },
                { q: 'AI traffic management in cities like Jaipur does?', qHi: 'AI traffic management in cities like Jaipur does?',
                  opts: ['Only records video', 'Counts vehicles, detects violations, and adjusts signals automatically', 'Blocks roads', 'Only works at night'], optsHi: ['Only records video', 'Counts vehicles, detects violations, and adjusts signals automatically', 'Blocks roads', 'Only works at night'],
                  c: 1, ex: 'All three! Count vehicles (measure congestion), detect violations (catch rule-breakers), adjust signals automatically (reduce jams). AI cities are 25% more efficient than traditional traffic management!', exHi: 'All three! Count vehicles (measure congestion), detect violations (catch rule-breakers), adjust signals automatically (reduce jams). AI cities are 25% more efficient than traditional traffic management!' },
                { q: 'KisanAI helps Indian farmers by?', qHi: 'KisanAI helps Indian farmers by?',
                  opts: ['Selling crops for them', 'Detecting crop diseases from satellite images before they spread', 'Providing loans', 'Driving tractors for them'], optsHi: ['Selling crops for them', 'Detecting crop diseases from satellite images before they spread', 'Providing loans', 'Driving tractors for them'],
                  c: 1, ex: 'Disease detection! KisanAI analyzes satellite photos of farms and detects diseases like rust, blight, and fungal infections BEFORE they spread. Farmer treats early = saves entire harvest!', exHi: 'Disease detection! KisanAI analyzes satellite photos of farms and detects diseases like rust, blight, and fungal infections BEFORE they spread. Farmer treats early = saves entire harvest!' }
              ]
            }
          ]
        }
      ]
    }]
  },
  6: {
    label: 'Class 6', labelHi: 'कक्षा 6', badge: '📊 Data & AI', badgeHi: '📊 डेटा और AI',
    badgeStyle: 'background:rgba(249,115,22,.15);color:#F97316;border:1px solid rgba(249,115,22,.3)',
    emoji: '📊',
    subjects: [{
      id: 's6_ai', icon: '🤖', name: 'AI Foundations + Computational Thinking', nameHi: 'AI की नींव + कम्प्यूटेशनल थिंकिंग',
      chapters: [
        {
          id: 'c6_1', icon: '📊', title: 'Data — The Fuel That Powers All AI!', titleHi: 'Data — The Fuel That Powers All AI!', xp: 25,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 6 · DATA · CHAPTER 1', tagHi: 'CLASS 6 · DATA · CHAPTER 1',
              title: 'Data — Why AI Cannot Exist Without It!', titleHi: 'Data — Why AI Cannot Exist Without It!',
              intro: 'AI without data is like a car without fuel. Everything AI knows, it learned from DATA. Understanding data is the first step to understanding AI!', introHi: 'AI without data is like a car without fuel. Everything AI knows, it learned from DATA. Understanding data is the first step to understanding AI!',
              speech: '<span class="hi">DATA</span> = Any information that can be stored and processed<br><br><span class="em">Two types:</span><br>📊 <span class="cool">Structured Data</span> = Organized in rows and columns (Excel, database)<br>📝 <span class="hi">Unstructured Data</span> = No fixed format (photos, videos, text)<br><br><strong>World Data Facts:</strong><br>📱 <span class="em">2.5 quintillion bytes</span> created every day globally<br>📸 <span class="cool">100 million photos</span> uploaded to Instagram daily<br>🗣️ <span class="hi">65 billion WhatsApp messages</span> sent every day<br>🔍 <span class="em">8.5 billion Google searches</span> every day<br><br><span class="em">More quality data → smarter AI!</span><br>Garbage data → Garbage AI (GIGO: Garbage In = Garbage Out)',
              speechHi: '<span class="hi">DATA</span> = Any information that can be stored and processed<br><br><span class="em">Two types:</span><br>📊 <span class="cool">Structured Data</span> = Organized in rows and columns (Excel, database)<br>📝 <span class="hi">Unstructured Data</span> = No fixed format (photos, videos, text)<br><br><strong>World Data Facts:</strong><br>📱 <span class="em">2.5 quintillion bytes</span> created every day globally<br>📸 <span class="cool">100 million photos</span> uploaded to Instagram daily<br>🗣️ <span class="hi">65 billion WhatsApp messages</span> sent every day<br>🔍 <span class="em">8.5 billion Google searches</span> every day<br><br><span class="em">More quality data → smarter AI!</span><br>Garbage data → Garbage AI (GIGO: Garbage In = Garbage Out)'
            },
            { type: 'concepts', tag: 'CLASS 6 · DATA TYPES', tagHi: 'CLASS 6 · DATA TYPES',
              title: 'Types of Data AI Uses', titleHi: 'Types of Data AI Uses',
              intro: 'AI can learn from all types of data — each requires different AI techniques!', introHi: 'AI can learn from all types of data — each requires different AI techniques!',
              items: [
                { em:'🔢', l:'Structured Data', lHi:'Structured Data', d:'Excel tables, databases, CSV files. Student marks, employee salaries, sales figures. AI processes this fastest — data is already organized!', dHi:'Excel tables, databases, CSV files. Student marks, employee salaries, sales figures. AI processes this fastest — data is already organized!' },
                { em:'📝', l:'Text Data', lHi:'Text Data', d:'WhatsApp messages, news articles, social media posts, books. 80% of world data is text! NLP (Natural Language Processing) AI handles this.', dHi:'WhatsApp messages, news articles, social media posts, books. 80% of world data is text! NLP (Natural Language Processing) AI handles this.' },
                { em:'🖼️', l:'Image Data', lHi:'Image Data', d:'Photos, X-rays, satellite images, CCTV footage. Each image = millions of pixel numbers. Computer Vision AI analyzes images.', dHi:'Photos, X-rays, satellite images, CCTV footage. Each image = millions of pixel numbers. Computer Vision AI analyzes images.' },
                { em:'🎵', l:'Audio Data', lHi:'Audio Data', d:'Voice messages, music, phone calls. Sound waves converted to numbers. Alexa and Siri use speech recognition AI on audio data.', dHi:'Voice messages, music, phone calls. Sound waves converted to numbers. Alexa and Siri use speech recognition AI on audio data.' },
                { em:'📍', l:'Location Data', lHi:'Location Data', d:'GPS coordinates from phones. Used by Google Maps, Ola, Flipkart delivery. Shows where people go — helps predict traffic and demand.', dHi:'GPS coordinates from phones. Used by Google Maps, Ola, Flipkart delivery. Shows where people go — helps predict traffic and demand.' },
                { em:'⏰', l:'Time Series Data', lHi:'Time Series Data', d:'Stock prices over time, patient heart rate records, temperature changes. AI finds patterns in how data changes over time.', dHi:'Stock prices over time, patient heart rate records, temperature changes. AI finds patterns in how data changes over time.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 6 · DATA QUIZ', tagHi: 'CLASS 6 · DATA QUIZ',
              title: '🧩 Data Quiz!', titleHi: '🧩 Data Quiz!',
              questions: [
                { q: 'How many bytes of data are created globally every day?', qHi: 'How many bytes of data are created globally every day?',
                  opts: ['1 million bytes', '1 billion bytes', '1 trillion bytes', '2.5 quintillion bytes'], optsHi: ['1 million bytes', '1 billion bytes', '1 trillion bytes', '2.5 quintillion bytes'],
                  c: 3, ex: '2.5 quintillion bytes every day! That is 2,500,000,000,000,000,000 bytes. Most of this powers the AI systems we use daily — search, recommendations, fraud detection.', exHi: '2.5 quintillion bytes every day! That is 2,500,000,000,000,000,000 bytes. Most of this powers the AI systems we use daily — search, recommendations, fraud detection.' },
                { q: 'What is "structured data"?', qHi: 'What is "structured data"?',
                  opts: ['Unorganized random information', 'Data organized in rows and columns like spreadsheets', 'Only numbers', 'Only text'], optsHi: ['Unorganized random information', 'Data organized in rows and columns like spreadsheets', 'Only numbers', 'Only text'],
                  c: 1, ex: 'Organized in rows and columns! Like Excel spreadsheets or databases. Student roll numbers and marks, product prices and quantities — all structured data. Easy for AI to process!', exHi: 'Organized in rows and columns! Like Excel spreadsheets or databases. Student roll numbers and marks, product prices and quantities — all structured data. Easy for AI to process!' },
                { q: 'WhatsApp messages are an example of?', qHi: 'WhatsApp messages are an example of?',
                  opts: ['Structured data', 'Location data', 'Unstructured text data', 'Image data'], optsHi: ['Structured data', 'Location data', 'Unstructured text data', 'Image data'],
                  c: 2, ex: 'Unstructured text data! WhatsApp messages have no fixed format — they can be any length, any topic. Natural Language Processing AI handles unstructured text.', exHi: 'Unstructured text data! WhatsApp messages have no fixed format — they can be any length, any topic. Natural Language Processing AI handles unstructured text.' },
                { q: 'GIGO in AI stands for?', qHi: 'GIGO in AI stands for?',
                  opts: ['Google Is Great Online', 'Garbage In Garbage Out — bad data = bad AI results', 'Good Intelligence Gets Output', 'Great Indian Government Online'], optsHi: ['Google Is Great Online', 'Garbage In Garbage Out — bad data = bad AI results', 'Good Intelligence Gets Output', 'Great Indian Government Online'],
                  c: 1, ex: 'Garbage In Garbage Out! If you train AI on wrong, biased, or low-quality data, it gives wrong, biased, low-quality results. Data quality is the most important thing in AI!', exHi: 'Garbage In Garbage Out! If you train AI on wrong, biased, or low-quality data, it gives wrong, biased, low-quality results. Data quality is the most important thing in AI!' },
                { q: 'GPS coordinates from phones are what type of data?', qHi: 'GPS coordinates from phones are what type of data?',
                  opts: ['Structured data', 'Text data', 'Image data', 'Location data'], optsHi: ['Structured data', 'Text data', 'Image data', 'Location data'],
                  c: 3, ex: 'Location data! GPS coordinates (latitude and longitude) from your phone are collected by Google Maps, Ola, Uber, Flipkart — all to understand where people are and optimize their services.', exHi: 'Location data! GPS coordinates (latitude and longitude) from your phone are collected by Google Maps, Ola, Uber, Flipkart — all to understand where people are and optimize their services.' }
              ]
            }
          ]
        },
        {
          id: 'c6_2', icon: '🌳', title: 'Decision Trees — AI That Asks Questions!', titleHi: 'Decision Trees — AI That Asks Questions!', xp: 25,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 6 · DECISION TREES · CHAPTER 2', tagHi: 'CLASS 6 · DECISION TREES · CHAPTER 2',
              title: 'Decision Trees — The Most Intuitive AI Algorithm!', titleHi: 'Decision Trees — The Most Intuitive AI Algorithm!',
              intro: 'A Decision Tree is an AI that thinks exactly like a doctor or a detective — by asking smart yes/no questions one at a time!', introHi: 'A Decision Tree is an AI that thinks exactly like a doctor or a detective — by asking smart yes/no questions one at a time!',
              speech: '<span class="hi">Decision Tree</span> = An AI that makes decisions by asking <span class="em">yes/no questions</span><br><br><strong>Doctor diagnosing fever:</strong><br>❓ Temperature > 38°C? <span class="em">YES</span><br>→ ❓ Body pain? <span class="cool">YES</span><br>→ → ❓ Cough? <span class="hi">NO</span><br>→ → → Diagnosis: <span class="em">Possible malaria — test needed</span><br><br>This is EXACTLY how Decision Tree AI works!<br><br><strong>Used in:</strong><br>🏥 <span class="em">Medical diagnosis</span> — symptom → disease<br>💳 <span class="cool">Bank loan approval</span> — income/credit → approve/reject<br>📧 <span class="hi">Spam detection</span> — keywords → spam/not spam<br>🌾 <span class="em">Crop disease</span> — symptoms → disease type',
              speechHi: '<span class="hi">Decision Tree</span> = An AI that makes decisions by asking <span class="em">yes/no questions</span><br><br><strong>Doctor diagnosing fever:</strong><br>❓ Temperature > 38°C? <span class="em">YES</span><br>→ ❓ Body pain? <span class="cool">YES</span><br>→ → ❓ Cough? <span class="hi">NO</span><br>→ → → Diagnosis: <span class="em">Possible malaria — test needed</span><br><br>This is EXACTLY how Decision Tree AI works!<br><br><strong>Used in:</strong><br>🏥 <span class="em">Medical diagnosis</span> — symptom → disease<br>💳 <span class="cool">Bank loan approval</span> — income/credit → approve/reject<br>📧 <span class="hi">Spam detection</span> — keywords → spam/not spam<br>🌾 <span class="em">Crop disease</span> — symptoms → disease type'
            },
            { type: 'concepts', tag: 'CLASS 6 · DECISION TREE USES', tagHi: 'CLASS 6 · DECISION TREE USES',
              title: 'Where Decision Trees Change Lives', titleHi: 'Where Decision Trees Change Lives',
              intro: 'Decision Trees are the most used AI algorithm because they are easy to understand and explain!', introHi: 'Decision Trees are the most used AI algorithm because they are easy to understand and explain!',
              items: [
                { em:'🏥', l:'Medical Diagnosis AI', lHi:'Medical Diagnosis AI', d:'Doctors at AIIMS trained Decision Tree AI on 10,000 patient cases. Now AI asks the right questions and suggests diagnosis with 91% accuracy — helping junior doctors!', dHi:'Doctors at AIIMS trained Decision Tree AI on 10,000 patient cases. Now AI asks the right questions and suggests diagnosis with 91% accuracy — helping junior doctors!' },
                { em:'🏦', l:'Loan Approval System', lHi:'Loan Approval System', d:'Bank Decision Tree: Income > 50,000/month? Credit score > 700? Previous loans cleared? Employment stable? Each YES increases approval chance!', dHi:'Bank Decision Tree: Income > 50,000/month? Credit score > 700? Previous loans cleared? Employment stable? Each YES increases approval chance!' },
                { em:'🌾', l:'Kisan Disease Detector', lHi:'Kisan Disease Detector', d:'Farmer uploads crop photo. AI asks: Yellow spots? Brown edges? White powder? Each answer narrows down to one disease. Farmer gets treatment advice instantly!', dHi:'Farmer uploads crop photo. AI asks: Yellow spots? Brown edges? White powder? Each answer narrows down to one disease. Farmer gets treatment advice instantly!' },
                { em:'📧', l:'Gmail Spam Filter', lHi:'Gmail Spam Filter', d:'Email arrives. Decision Tree checks: Unknown sender? Suspicious keywords (FREE MONEY!, Click here!)? Many links? No unsubscribe option? → SPAM!', dHi:'Email arrives. Decision Tree checks: Unknown sender? Suspicious keywords (FREE MONEY!, Click here!)? Many links? No unsubscribe option? → SPAM!' },
                { em:'🎓', l:'School Admission AI', lHi:'School Admission AI', d:'Some schools use AI: Marks > 90%? Distance from school < 10km? Sibling studying here? These questions narrow down admissions — fair and consistent.', dHi:'Some schools use AI: Marks > 90%? Distance from school < 10km? Sibling studying here? These questions narrow down admissions — fair and consistent.' },
                { em:'🛡️', l:'Insurance Claim', lHi:'Insurance Claim', d:'Was accident reported within 24 hours? Is driver licensed? Is vehicle insured? Are documents complete? Each YES leads to faster, fair claim approval!', dHi:'Was accident reported within 24 hours? Is driver licensed? Is vehicle insured? Are documents complete? Each YES leads to faster, fair claim approval!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 6 · DECISION TREE QUIZ', tagHi: 'CLASS 6 · DECISION TREE QUIZ',
              title: '🧩 Decision Tree Quiz!', titleHi: '🧩 Decision Tree Quiz!',
              questions: [
                { q: 'A Decision Tree makes decisions by?', qHi: 'A Decision Tree makes decisions by?',
                  opts: ['Random guessing', 'Asking a series of yes/no questions', 'Looking at photos only', 'Using complex math only'], optsHi: ['Random guessing', 'Asking a series of yes/no questions', 'Looking at photos only', 'Using complex math only'],
                  c: 1, ex: 'Yes/No questions! Like a doctor asking symptoms one by one, a Decision Tree asks questions and branches based on the answer until it reaches a decision. Simple, transparent, powerful!', exHi: 'Yes/No questions! Like a doctor asking symptoms one by one, a Decision Tree asks questions and branches based on the answer until it reaches a decision. Simple, transparent, powerful!' },
                { q: 'Which of these is NOT a use of Decision Trees?', qHi: 'Which of these is NOT a use of Decision Trees?',
                  opts: ['Medical diagnosis', 'Spam email detection', 'Loan approval', 'Making music louder'], optsHi: ['Medical diagnosis', 'Spam email detection', 'Loan approval', 'Making music louder'],
                  c: 3, ex: 'Making music louder is NOT a Decision Tree use! Decision Trees are used for classification problems: is this spam or not? Should loan be approved? What disease is this? Making things louder is just volume control!', exHi: 'Making music louder is NOT a Decision Tree use! Decision Trees are used for classification problems: is this spam or not? Should loan be approved? What disease is this? Making things louder is just volume control!' },
                { q: 'Why are Decision Trees popular in medicine?', qHi: 'Why are Decision Trees popular in medicine?',
                  opts: ['They are colorful', 'Doctors can understand and explain each decision step by step', 'They are very complex', 'They work faster than all other AI'], optsHi: ['They are colorful', 'Doctors can understand and explain each decision step by step', 'They are very complex', 'They work faster than all other AI'],
                  c: 1, ex: 'Transparency! Doctors can follow and explain each question: "We said yes because temperature was high, yes because there was body pain" — trackable reasoning. Very important when human lives are involved!', exHi: 'Transparency! Doctors can follow and explain each question: "We said yes because temperature was high, yes because there was body pain" — trackable reasoning. Very important when human lives are involved!' },
                { q: 'Kisan AI uses Decision Trees to?', qHi: 'Kisan AI uses Decision Trees to?',
                  opts: ['Sell crops online', 'Identify crop diseases by asking questions about symptoms', 'Predict rainfall', 'Give loans to farmers'], optsHi: ['Sell crops online', 'Identify crop diseases by asking questions about symptoms', 'Predict rainfall', 'Give loans to farmers'],
                  c: 1, ex: 'Disease identification! Farmers upload crop photos and answer questions (yellow spots? brown edges?). Decision Tree narrows down to the specific disease and recommends treatment. Saves crores in crop losses!', exHi: 'Disease identification! Farmers upload crop photos and answer questions (yellow spots? brown edges?). Decision Tree narrows down to the specific disease and recommends treatment. Saves crores in crop losses!' },
                { q: 'Gmail spam filter uses Decision Tree logic to check?', qHi: 'Gmail spam filter uses Decision Tree logic to check?',
                  opts: ['Email color and font', 'Unknown sender, suspicious keywords, many links, missing unsubscribe', 'How long the email is', 'Who wrote the email'], optsHi: ['Email color and font', 'Unknown sender, suspicious keywords, many links, missing unsubscribe', 'How long the email is', 'Who wrote the email'],
                  c: 1, ex: 'Pattern of suspicious features! Unknown sender + suspicious keywords + many links + missing unsubscribe → likely spam. The more suspicious features, the higher the spam score!', exHi: 'Pattern of suspicious features! Unknown sender + suspicious keywords + many links + missing unsubscribe → likely spam. The more suspicious features, the higher the spam score!' }
              ]
            }
          ]
        },
        {
          id: 'c6_3', icon: '⚖️', title: 'AI Ethics — Is AI Always Right?', titleHi: 'AI Ethics — Is AI Always Right?', xp: 25,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 6 · AI ETHICS · CHAPTER 3', tagHi: 'CLASS 6 · AI ETHICS · CHAPTER 3',
              title: 'AI Can Be Wrong and Unfair — Here Is Why!', titleHi: 'AI Can Be Wrong and Unfair — Here Is Why!',
              intro: 'AI is powerful but not perfect. Sometimes AI makes mistakes, discriminates against people, or invades privacy. Understanding AI Ethics keeps AI fair and safe!', introHi: 'AI is powerful but not perfect. Sometimes AI makes mistakes, discriminates against people, or invades privacy. Understanding AI Ethics keeps AI fair and safe!',
              speech: '<span class="hi">AI Ethics</span> = Rules to make sure AI is <span class="em">fair, safe, and honest</span><br><br><strong>Real AI Problems:</strong><br>😰 <span class="em">Bias</span> — AI trained on unfair data becomes unfair<br>🔒 <span class="cool">Privacy</span> — AI collects too much personal data<br>❓ <span class="hi">Transparency</span> — AI decisions should be explainable<br>🎯 <span class="em">Accuracy</span> — AI can be wrong even if confident<br><br><strong>Famous AI Bias Example:</strong><br>Amazon\'s hiring AI was trained on 10 years of resumes.<br>Most past hires were male → AI learned to <span class="em">prefer male resumes</span>!<br>Amazon had to <span class="cool">SHUT IT DOWN</span> — biased AI is dangerous.<br><br><span class="hi">We must build AI that is FAIR to EVERYONE!</span>',
              speechHi: '<span class="hi">AI Ethics</span> = Rules to make sure AI is <span class="em">fair, safe, and honest</span><br><br><strong>Real AI Problems:</strong><br>😰 <span class="em">Bias</span> — AI trained on unfair data becomes unfair<br>🔒 <span class="cool">Privacy</span> — AI collects too much personal data<br>❓ <span class="hi">Transparency</span> — AI decisions should be explainable<br>🎯 <span class="em">Accuracy</span> — AI can be wrong even if confident<br><br><strong>Famous AI Bias Example:</strong><br>Amazon\'s hiring AI was trained on 10 years of resumes.<br>Most past hires were male → AI learned to <span class="em">prefer male resumes</span>!<br>Amazon had to <span class="cool">SHUT IT DOWN</span> — biased AI is dangerous.<br><br><span class="hi">We must build AI that is FAIR to EVERYONE!</span>'
            },
            { type: 'concepts', tag: 'CLASS 6 · AI ETHICS PRINCIPLES', tagHi: 'CLASS 6 · AI ETHICS PRINCIPLES',
              title: '5 Principles of Ethical AI', titleHi: '5 Principles of Ethical AI',
              intro: 'These 5 principles guide how AI should be built to benefit all people equally!', introHi: 'These 5 principles guide how AI should be built to benefit all people equally!',
              items: [
                { em:'⚖️', l:'Fairness — No Discrimination', lHi:'Fairness — No Discrimination', d:'AI should treat all people equally regardless of gender, caste, religion, wealth. If AI training data has bias, the AI will have bias too. Fix the data, fix the AI!', dHi:'AI should treat all people equally regardless of gender, caste, religion, wealth. If AI training data has bias, the AI will have bias too. Fix the data, fix the AI!' },
                { em:'🔒', l:'Privacy — Your Data is Yours', lHi:'Privacy — Your Data is Yours', d:'AI should not collect more data than needed. You should know what data is collected. You should have the right to delete your data. GDPR in Europe, DPDP in India protects this.', dHi:'AI should not collect more data than needed. You should know what data is collected. You should have the right to delete your data. GDPR in Europe, DPDP in India protects this.' },
                { em:'🔍', l:'Transparency — Explain Decisions', lHi:'Transparency — Explain Decisions', d:'If AI rejects your loan or job application, you have the right to know WHY. Black-box AI that cannot explain itself is dangerous — especially in high-stakes decisions!', dHi:'If AI rejects your loan or job application, you have the right to know WHY. Black-box AI that cannot explain itself is dangerous — especially in high-stakes decisions!' },
                { em:'🛡️', l:'Safety — No Harm', lHi:'Safety — No Harm', d:'AI in self-driving cars, medical devices, and weapons must be thoroughly tested. A mistake can kill people. Safety testing is non-negotiable.', dHi:'AI in self-driving cars, medical devices, and weapons must be thoroughly tested. A mistake can kill people. Safety testing is non-negotiable.' },
                { em:'👤', l:'Accountability — Who is Responsible?', lHi:'Accountability — Who is Responsible?', d:'If AI causes harm, who is responsible — the developer, the company, or the user? India\'s AI policy and global laws are working to answer this critical question.', dHi:'If AI causes harm, who is responsible — the developer, the company, or the user? India\'s AI policy and global laws are working to answer this critical question.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 6 · AI ETHICS QUIZ', tagHi: 'CLASS 6 · AI ETHICS QUIZ',
              title: '🧩 AI Ethics Quiz!', titleHi: '🧩 AI Ethics Quiz!',
              questions: [
                { q: 'AI bias occurs when?', qHi: 'AI bias occurs when?',
                  opts: ['AI runs too slowly', 'AI is trained on unfair or unrepresentative data and learns discrimination', 'AI has no internet', 'AI makes calculations wrong'], optsHi: ['AI runs too slowly', 'AI is trained on unfair or unrepresentative data and learns discrimination', 'AI has no internet', 'AI makes calculations wrong'],
                  c: 1, ex: 'Biased training data = biased AI! Amazon\'s hiring AI was trained on historical data where most hires were male — so it learned to discriminate against women. Garbage data creates discriminatory AI.', exHi: 'Biased training data = biased AI! Amazon\'s hiring AI was trained on historical data where most hires were male — so it learned to discriminate against women. Garbage data creates discriminatory AI.' },
                { q: 'Amazon shut down its hiring AI because?', qHi: 'Amazon shut down its hiring AI because?',
                  opts: ['It was too expensive', 'It became biased against women due to biased training data', 'It was too slow', 'It could not read resumes'], optsHi: ['It was too expensive', 'It became biased against women due to biased training data', 'It was too slow', 'It could not read resumes'],
                  c: 1, ex: 'Gender bias! Trained on 10 years of male-dominated hiring decisions, the AI learned to prefer male candidates. Amazon recognized this was deeply unfair and shut it down in 2018.', exHi: 'Gender bias! Trained on 10 years of male-dominated hiring decisions, the AI learned to prefer male candidates. Amazon recognized this was deeply unfair and shut it down in 2018.' },
                { q: 'AI transparency means?', qHi: 'AI transparency means?',
                  opts: ['Making AI screens brighter', 'AI decisions should be explainable — you can know WHY AI decided something', 'AI should be very fast', 'AI should be very accurate'], optsHi: ['Making AI screens brighter', 'AI decisions should be explainable — you can know WHY AI decided something', 'AI should be very fast', 'AI should be very accurate'],
                  c: 1, ex: 'Explainability! If AI rejects your loan, job application, or medical claim, you have the right to know WHY. AI that cannot explain itself ("black box AI") is dangerous in high-stakes situations.', exHi: 'Explainability! If AI rejects your loan, job application, or medical claim, you have the right to know WHY. AI that cannot explain itself ("black box AI") is dangerous in high-stakes situations.' },
                { q: 'Which Indian law protects your data privacy from AI?', qHi: 'Which Indian law protects your data privacy from AI?',
                  opts: ['Income Tax Act', 'DPDP Act (Digital Personal Data Protection Act)', 'Traffic Rules', 'School Education Act'], optsHi: ['Income Tax Act', 'DPDP Act (Digital Personal Data Protection Act)', 'Traffic Rules', 'School Education Act'],
                  c: 1, ex: 'DPDP Act 2023! India\'s Digital Personal Data Protection Act gives you rights over your data — what is collected, why it is collected, how long it is kept, and the right to delete it.', exHi: 'DPDP Act 2023! India\'s Digital Personal Data Protection Act gives you rights over your data — what is collected, why it is collected, how long it is kept, and the right to delete it.' },
                { q: 'If an AI self-driving car causes an accident, who is responsible?', qHi: 'If an AI self-driving car causes an accident, who is responsible?',
                  opts: ['No one — it was the car', 'Only the passenger', 'This is a complex question — developer, company, and user may all share responsibility', 'Only the road department'], optsHi: ['No one — it was the car', 'Only the passenger', 'This is a complex question — developer, company, and user may all share responsibility', 'Only the road department'],
                  c: 2, ex: 'Complex and evolving question! Laws worldwide are being written to answer this. In most current thinking: developer (for software), manufacturer (for hardware), and potentially user (if they overrode safety) all share some responsibility.', exHi: 'Complex and evolving question! Laws worldwide are being written to answer this. In most current thinking: developer (for software), manufacturer (for hardware), and potentially user (if they overrode safety) all share some responsibility.' }
              ]
            }
          ]
        }
      ]
    }]
  },
  7: {
    label: 'Class 7', labelHi: 'कक्षा 7', badge: '🚀 ML Explorer', badgeHi: '🚀 ML खोजकर्ता',
    badgeStyle: 'background:rgba(239,68,68,.15);color:#EF4444;border:1px solid rgba(239,68,68,.3)',
    emoji: '🚀',
    subjects: [{
      id: 's7_ml', icon: '🤖', name: 'Machine Learning & AI Applications', nameHi: 'मशीन लर्निंग और AI अनुप्रयोग',
      chapters: [
        {
          id: 'c7_1', icon: '🤖', title: 'Machine Learning — Teaching Without Programming!', titleHi: 'Machine Learning — Teaching Without Programming!', xp: 28,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 7 · MACHINE LEARNING · CHAPTER 1', tagHi: 'CLASS 7 · MACHINE LEARNING · CHAPTER 1',
              title: 'Machine Learning — When AI Teaches ITSELF!', titleHi: 'Machine Learning — When AI Teaches ITSELF!',
              intro: 'Traditional programs follow rules you write. Machine Learning AI makes its own rules by learning from examples — like how you learned to recognize cats!', introHi: 'Traditional programs follow rules you write. Machine Learning AI makes its own rules by learning from examples — like how you learned to recognize cats!',
              speech: '<span class="hi">Machine Learning (ML)</span> = AI that <span class="em">learns from data</span> without being explicitly programmed<br><br><strong>Traditional Programming vs ML:</strong><br>❌ <span class="em">Old way:</span> Programmer writes rule: "If has 4 legs + fur + meows → CAT"<br>✅ <span class="cool">ML way:</span> Show AI 10,000 cat photos → AI figures out what a cat looks like by itself!<br><br><strong>3 Types of ML:</strong><br>👨‍🏫 <span class="em">Supervised Learning</span> — Teacher provides correct answers<br>🔍 <span class="cool">Unsupervised Learning</span> — AI finds hidden patterns alone<br>🎮 <span class="hi">Reinforcement Learning</span> — AI learns by trial and error + rewards<br><br><span class="em">ChatGPT, AlphaGo, Tesla Autopilot — all use Machine Learning!</span>',
              speechHi: '<span class="hi">Machine Learning (ML)</span> = AI that <span class="em">learns from data</span> without being explicitly programmed<br><br><strong>Traditional Programming vs ML:</strong><br>❌ <span class="em">Old way:</span> Programmer writes rule: "If has 4 legs + fur + meows → CAT"<br>✅ <span class="cool">ML way:</span> Show AI 10,000 cat photos → AI figures out what a cat looks like by itself!<br><br><strong>3 Types of ML:</strong><br>👨‍🏫 <span class="em">Supervised Learning</span> — Teacher provides correct answers<br>🔍 <span class="cool">Unsupervised Learning</span> — AI finds hidden patterns alone<br>🎮 <span class="hi">Reinforcement Learning</span> — AI learns by trial and error + rewards<br><br><span class="em">ChatGPT, AlphaGo, Tesla Autopilot — all use Machine Learning!</span>'
            },
            { type: 'concepts', tag: 'CLASS 7 · ML TYPES', tagHi: 'CLASS 7 · ML TYPES',
              title: '3 Types of Machine Learning', titleHi: '3 Types of Machine Learning',
              intro: 'Each type of ML is perfect for different problems. Real AI systems often use multiple types together!', introHi: 'Each type of ML is perfect for different problems. Real AI systems often use multiple types together!',
              items: [
                { em:'👨‍🏫', l:'Supervised Learning — Learning with a Teacher', lHi:'Supervised Learning — Learning with a Teacher', d:'AI gets labeled data: this photo = CAT, this photo = DOG. Learns from 100,000 examples. Then can identify new cats and dogs it has never seen! Used in: spam detection, medical diagnosis, weather forecasting.', dHi:'AI gets labeled data: this photo = CAT, this photo = DOG. Learns from 100,000 examples. Then can identify new cats and dogs it has never seen! Used in: spam detection, medical diagnosis, weather forecasting.' },
                { em:'🔍', l:'Unsupervised Learning — Finding Hidden Groups', lHi:'Unsupervised Learning — Finding Hidden Groups', d:'AI gets unlabeled data: 1 million customer shopping records. Finds hidden groups: "budget shoppers", "luxury buyers", "impulse buyers" — without being told these groups exist! Used in: customer segmentation, anomaly detection.', dHi:'AI gets unlabeled data: 1 million customer shopping records. Finds hidden groups: "budget shoppers", "luxury buyers", "impulse buyers" — without being told these groups exist! Used in: customer segmentation, anomaly detection.' },
                { em:'🎮', l:'Reinforcement Learning — Learning by Playing', lHi:'Reinforcement Learning — Learning by Playing', d:'AI tries an action. Gets reward if good, penalty if bad. Tries millions of times. Learns perfect strategy! AlphaGo learned to beat world chess champions this way. Tesla learns to drive this way.', dHi:'AI tries an action. Gets reward if good, penalty if bad. Tries millions of times. Learns perfect strategy! AlphaGo learned to beat world chess champions this way. Tesla learns to drive this way.' },
                { em:'🌐', l:'Deep Learning — ML with Many Layers', lHi:'Deep Learning — ML with Many Layers', d:'Special ML using neural networks (inspired by human brain). Can understand images, language, and sound at superhuman levels. Powers ChatGPT, Google Translate, and face recognition.', dHi:'Special ML using neural networks (inspired by human brain). Can understand images, language, and sound at superhuman levels. Powers ChatGPT, Google Translate, and face recognition.' },
                { em:'🇮🇳', l:'ML Made in India', lHi:'ML Made in India', d:'Niramai (breast cancer detection), Niki.ai (voice assistant for Hindi speakers), SigTuple (blood test analysis), Cropin (smart farming) — Indian companies building world-class ML solutions!', dHi:'Niramai (breast cancer detection), Niki.ai (voice assistant for Hindi speakers), SigTuple (blood test analysis), Cropin (smart farming) — Indian companies building world-class ML solutions!' },
                { em:'📈', l:'ML Learning Curve', lHi:'ML Learning Curve', d:'More data + more training time + better algorithm = smarter AI. ChatGPT trained on trillions of words for months! Quality data and time are the most important ingredients.', dHi:'More data + more training time + better algorithm = smarter AI. ChatGPT trained on trillions of words for months! Quality data and time are the most important ingredients.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 7 · ML QUIZ', tagHi: 'CLASS 7 · ML QUIZ',
              title: '🧩 Machine Learning Quiz!', titleHi: '🧩 Machine Learning Quiz!',
              questions: [
                { q: 'Machine Learning is different from traditional programming because?', qHi: 'Machine Learning is different from traditional programming because?',
                  opts: ['It uses more electricity', 'AI learns rules from data instead of following pre-written rules', 'It is faster only', 'It uses a different programming language'], optsHi: ['It uses more electricity', 'AI learns rules from data instead of following pre-written rules', 'It is faster only', 'It uses a different programming language'],
                  c: 1, ex: 'Learns its own rules! Traditional programming: programmer writes every rule. ML: show AI thousands of examples, it figures out the rules. Much more powerful for complex problems like image recognition and language understanding!', exHi: 'Learns its own rules! Traditional programming: programmer writes every rule. ML: show AI thousands of examples, it figures out the rules. Much more powerful for complex problems like image recognition and language understanding!' },
                { q: 'If AI is shown 10,000 labeled photos of cats and dogs to learn from, this is?', qHi: 'If AI is shown 10,000 labeled photos of cats and dogs to learn from, this is?',
                  opts: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Deep Learning only'], optsHi: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Deep Learning only'],
                  c: 2, ex: 'Supervised Learning! The labels (this = CAT, this = DOG) are like a teacher providing correct answers. AI learns from these labeled examples and can then identify new unseen photos correctly.', exHi: 'Supervised Learning! The labels (this = CAT, this = DOG) are like a teacher providing correct answers. AI learns from these labeled examples and can then identify new unseen photos correctly.' },
                { q: 'AlphaGo (the chess AI) learned to beat world champions using?', qHi: 'AlphaGo (the chess AI) learned to beat world champions using?',
                  opts: ['Supervised Learning only', 'Unsupervised Learning', 'Reinforcement Learning — trial and error with rewards', 'Deep Learning only'], optsHi: ['Supervised Learning only', 'Unsupervised Learning', 'Reinforcement Learning — trial and error with rewards', 'Deep Learning only'],
                  c: 2, ex: 'Reinforcement Learning! AlphaGo played millions of games against itself. Good move = reward. Bad move = penalty. After millions of games, it learned strategies better than any human had ever conceived!', exHi: 'Reinforcement Learning! AlphaGo played millions of games against itself. Good move = reward. Bad move = penalty. After millions of games, it learned strategies better than any human had ever conceived!' },
                { q: 'Unsupervised Learning is useful for?', qHi: 'Unsupervised Learning is useful for?',
                  opts: ['Learning labeled data', 'Finding hidden patterns and groups in data without being told what to look for', 'Playing games', 'Understanding language'], optsHi: ['Learning labeled data', 'Finding hidden patterns and groups in data without being told what to look for', 'Playing games', 'Understanding language'],
                  c: 1, ex: 'Finding hidden patterns! Give AI 1 million customer records with no labels. It finds natural groups: frequent buyers, budget shoppers, luxury seekers. Business can then target each group differently!', exHi: 'Finding hidden patterns! Give AI 1 million customer records with no labels. It finds natural groups: frequent buyers, budget shoppers, luxury seekers. Business can then target each group differently!' },
                { q: 'What made ChatGPT so powerful?', qHi: 'What made ChatGPT so powerful?',
                  opts: ['It was expensive to build', 'It was trained on trillions of words using Deep Learning for months', 'It has a very fast processor', 'It was built by one genius programmer'], optsHi: ['It was expensive to build', 'It was trained on trillions of words using Deep Learning for months', 'It has a very fast processor', 'It was built by one genius programmer'],
                  c: 1, ex: 'Trillions of words + Deep Learning + months of training! GPT-4 read virtually the entire internet — Wikipedia, books, code, articles. Combined with advanced deep learning architecture, this creates human-like language ability.', exHi: 'Trillions of words + Deep Learning + months of training! GPT-4 read virtually the entire internet — Wikipedia, books, code, articles. Combined with advanced deep learning architecture, this creates human-like language ability.' }
              ]
            }
          ]
        },
        {
          id: 'c7_2', icon: '👁️', title: 'Computer Vision — AI That Can See!', titleHi: 'Computer Vision — AI That Can See!', xp: 28,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 7 · COMPUTER VISION · CHAPTER 2', tagHi: 'CLASS 7 · COMPUTER VISION · CHAPTER 2',
              title: 'Computer Vision — Teaching Machines to See the World!', titleHi: 'Computer Vision — Teaching Machines to See the World!',
              intro: 'Your eyes and brain process vision automatically. Computer Vision teaches AI to do the same — and sometimes even better than humans!', introHi: 'Your eyes and brain process vision automatically. Computer Vision teaches AI to do the same — and sometimes even better than humans!',
              speech: '<span class="hi">Computer Vision</span> = AI that can understand images and video<br><br><strong>How AI sees an image:</strong><br>📸 <span class="em">Photo</span> → Grid of pixels (tiny colored dots)<br>🔢 <span class="cool">Each pixel</span> = 3 numbers (Red, Green, Blue: 0-255)<br>🧠 <span class="hi">AI processes</span> millions of numbers → understands content<br><br><strong>Steps AI takes:</strong><br>1. Edge Detection — finds boundaries between objects<br>2. Shape Recognition — identifies basic shapes<br>3. Feature Matching — compares to learned patterns<br>4. Classification — "This is a dog with 97.3% confidence!"<br><br><span class="em">AI can process 1000 images per second — humans take 1-2 seconds each!</span>',
              speechHi: '<span class="hi">Computer Vision</span> = AI that can understand images and video<br><br><strong>How AI sees an image:</strong><br>📸 <span class="em">Photo</span> → Grid of pixels (tiny colored dots)<br>🔢 <span class="cool">Each pixel</span> = 3 numbers (Red, Green, Blue: 0-255)<br>🧠 <span class="hi">AI processes</span> millions of numbers → understands content<br><br><strong>Steps AI takes:</strong><br>1. Edge Detection — finds boundaries between objects<br>2. Shape Recognition — identifies basic shapes<br>3. Feature Matching — compares to learned patterns<br>4. Classification — "This is a dog with 97.3% confidence!"<br><br><span class="em">AI can process 1000 images per second — humans take 1-2 seconds each!</span>'
            },
            { type: 'concepts', tag: 'CLASS 7 · CV APPLICATIONS', tagHi: 'CLASS 7 · CV APPLICATIONS',
              title: 'Computer Vision Changing India', titleHi: 'Computer Vision Changing India',
              intro: 'From Aadhaar to agriculture to healthcare — Computer Vision is transforming India!', introHi: 'From Aadhaar to agriculture to healthcare — Computer Vision is transforming India!',
              items: [
                { em:'🆔', l:'Aadhaar Face Recognition', lHi:'Aadhaar Face Recognition', d:'1.3 billion Indian faces recognized by AI in 0.1 seconds! Aadhaar uses face + fingerprint + iris — three Computer Vision systems working together. World record biometric database!', dHi:'1.3 billion Indian faces recognized by AI in 0.1 seconds! Aadhaar uses face + fingerprint + iris — three Computer Vision systems working together. World record biometric database!' },
                { em:'🚗', l:'FASTag on Highways', lHi:'FASTag on Highways', d:'Camera reads your car number plate at 100km/h! AI recognizes plate in 0.5 seconds, charges your account automatically. No stopping at toll booths!', dHi:'Camera reads your car number plate at 100km/h! AI recognizes plate in 0.5 seconds, charges your account automatically. No stopping at toll booths!' },
                { em:'🌾', l:'Crop Disease Detection', lHi:'Crop Disease Detection', d:'Farmer photographs diseased crop on phone. AI examines pixels: "Yellow spots in this pattern = wheat rust disease. Spray Propiconazole fungicide." Saves lakhs in crop losses!', dHi:'Farmer photographs diseased crop on phone. AI examines pixels: "Yellow spots in this pattern = wheat rust disease. Spray Propiconazole fungicide." Saves lakhs in crop losses!' },
                { em:'🏥', l:'Cancer Detection', lHi:'Cancer Detection', d:'AI trained on 1 million X-rays can detect breast cancer, tuberculosis, and bone fractures with accuracy matching specialist doctors. Available 24/7 at low cost!', dHi:'AI trained on 1 million X-rays can detect breast cancer, tuberculosis, and bone fractures with accuracy matching specialist doctors. Available 24/7 at low cost!' },
                { em:'📦', l:'Amazon-Flipkart Warehouses', lHi:'Amazon-Flipkart Warehouses', d:'Robot cameras scan and sort 1 million packages daily. AI reads barcodes, detects damage, routes packages — 10x faster than human workers with near-zero errors.', dHi:'Robot cameras scan and sort 1 million packages daily. AI reads barcodes, detects damage, routes packages — 10x faster than human workers with near-zero errors.' },
                { em:'🚦', l:'Traffic Violation Detection', lHi:'Traffic Violation Detection', d:'Smart cameras in Delhi, Mumbai, Jaipur catch: red light jumping, wrong lane driving, no helmet, no seatbelt — and automatically generate challan! Reduces road accidents.', dHi:'Smart cameras in Delhi, Mumbai, Jaipur catch: red light jumping, wrong lane driving, no helmet, no seatbelt — and automatically generate challan! Reduces road accidents.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 7 · CV QUIZ', tagHi: 'CLASS 7 · CV QUIZ',
              title: '🧩 Computer Vision Quiz!', titleHi: '🧩 Computer Vision Quiz!',
              questions: [
                { q: 'How does AI "see" a photograph?', qHi: 'How does AI "see" a photograph?',
                  opts: ['As a painting', 'As a grid of colored pixels, each represented by 3 numbers (RGB)', 'As text', 'As a 3D model'], optsHi: ['As a painting', 'As a grid of colored pixels, each represented by 3 numbers (RGB)', 'As text', 'As a 3D model'],
                  c: 1, ex: 'Grid of numbers! Every photo is a grid of pixels. Each pixel has 3 numbers: Red (0-255), Green (0-255), Blue (0-255). AI processes these millions of numbers to understand what is in the image!', exHi: 'Grid of numbers! Every photo is a grid of pixels. Each pixel has 3 numbers: Red (0-255), Green (0-255), Blue (0-255). AI processes these millions of numbers to understand what is in the image!' },
                { q: 'FASTag uses Computer Vision to?', qHi: 'FASTag uses Computer Vision to?',
                  opts: ['Check if car is clean', 'Read car number plates at high speed for automatic toll payment', 'Count passengers', 'Measure car speed only'], optsHi: ['Check if car is clean', 'Read car number plates at high speed for automatic toll payment', 'Count passengers', 'Measure car speed only'],
                  c: 1, ex: 'Automatic toll payment! Camera reads your plate number at high speed. AI recognizes it, checks the linked account, deducts money automatically. No stopping, no cash needed — faster and more efficient!', exHi: 'Automatic toll payment! Camera reads your plate number at high speed. AI recognizes it, checks the linked account, deducts money automatically. No stopping, no cash needed — faster and more efficient!' },
                { q: 'AI processes images how much faster than humans?', qHi: 'AI processes images how much faster than humans?',
                  opts: ['Same speed', '5x faster', '50x faster', '1000 images per second vs 1-2 seconds for humans'], optsHi: ['Same speed', '5x faster', '50x faster', '1000 images per second vs 1-2 seconds for humans'],
                  c: 3, ex: '1000x faster! AI can classify 1000 images per second. Humans take 1-2 seconds per image. This speed advantage makes AI invaluable for tasks like scanning millions of medical images or monitoring thousands of CCTV cameras simultaneously.', exHi: '1000x faster! AI can classify 1000 images per second. Humans take 1-2 seconds per image. This speed advantage makes AI invaluable for tasks like scanning millions of medical images or monitoring thousands of CCTV cameras simultaneously.' },
                { q: 'Computer Vision helps detect crop diseases by?', qHi: 'Computer Vision helps detect crop diseases by?',
                  opts: ['Tasting the crop', 'Analyzing pixel patterns in crop photos that match known disease patterns', 'Measuring soil temperature', 'Counting leaves'], optsHi: ['Tasting the crop', 'Analyzing pixel patterns in crop photos that match known disease patterns', 'Measuring soil temperature', 'Counting leaves'],
                  c: 1, ex: 'Pixel pattern analysis! AI has learned what healthy crops look like vs diseased ones. When a farmer uploads a photo, AI compares pixel patterns to its disease database and identifies the specific disease with high accuracy.', exHi: 'Pixel pattern analysis! AI has learned what healthy crops look like vs diseased ones. When a farmer uploads a photo, AI compares pixel patterns to its disease database and identifies the specific disease with high accuracy.' },
                { q: 'Aadhaar uses which Computer Vision technologies?', qHi: 'Aadhaar uses which Computer Vision technologies?',
                  opts: ['Only face recognition', 'Only fingerprint scanning', 'Face recognition + fingerprint scanning + iris scanning — three CV systems', 'Only iris scanning'], optsHi: ['Only face recognition', 'Only fingerprint scanning', 'Face recognition + fingerprint scanning + iris scanning — three CV systems', 'Only iris scanning'],
                  c: 2, ex: 'All three! Face recognition + fingerprint + iris scanning. Three separate Computer Vision AI systems verify your identity. Even if one is unclear (dirty finger, sunglasses), the others provide backup verification.', exHi: 'All three! Face recognition + fingerprint + iris scanning. Three separate Computer Vision AI systems verify your identity. Even if one is unclear (dirty finger, sunglasses), the others provide backup verification.' }
              ]
            }
          ]
        },
        {
          id: 'c7_3', icon: '🛡️', title: 'Responsible AI — Bias, Privacy and the Future!', titleHi: 'Responsible AI — Bias, Privacy and the Future!', xp: 28,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 7 · RESPONSIBLE AI · CHAPTER 3', tagHi: 'CLASS 7 · RESPONSIBLE AI · CHAPTER 3',
              title: 'With Great AI Power Comes Great Responsibility!', titleHi: 'With Great AI Power Comes Great Responsibility!',
              intro: 'AI is changing everything. But if we build it carelessly, AI can harm people. Responsible AI means building AI that is fair, safe, and beneficial for all of humanity!', introHi: 'AI is changing everything. But if we build it carelessly, AI can harm people. Responsible AI means building AI that is fair, safe, and beneficial for all of humanity!',
              speech: '<span class="hi">Responsible AI</span> = Building AI that is <span class="em">beneficial to everyone</span>, not harmful<br><br><strong>Key Challenges:</strong><br>🎭 <span class="em">Deepfakes</span> — AI creates fake videos of real people<br>💼 <span class="cool">Job Displacement</span> — AI automates many human jobs<br>🔍 <span class="hi">Surveillance</span> — AI tracks people without consent<br>⚔️ <span class="em">AI Weapons</span> — autonomous killer drones<br>🤥 <span class="cool">Misinformation</span> — AI generates fake news at scale<br><br><strong>But also solutions:</strong><br>🌡️ <span class="em">Climate AI</span> → predicts and fights climate change<br>💊 <span class="cool">Drug Discovery AI</span> → finds cures faster<br>♿ <span class="hi">Accessibility AI</span> → helps disabled people<br>🎓 <span class="em">Education AI</span> → like STU-BRAIN, making quality learning accessible to all!',
              speechHi: '<span class="hi">Responsible AI</span> = Building AI that is <span class="em">beneficial to everyone</span>, not harmful<br><br><strong>Key Challenges:</strong><br>🎭 <span class="em">Deepfakes</span> — AI creates fake videos of real people<br>💼 <span class="cool">Job Displacement</span> — AI automates many human jobs<br>🔍 <span class="hi">Surveillance</span> — AI tracks people without consent<br>⚔️ <span class="em">AI Weapons</span> — autonomous killer drones<br>🤥 <span class="cool">Misinformation</span> — AI generates fake news at scale<br><br><strong>But also solutions:</strong><br>🌡️ <span class="em">Climate AI</span> → predicts and fights climate change<br>💊 <span class="cool">Drug Discovery AI</span> → finds cures faster<br>♿ <span class="hi">Accessibility AI</span> → helps disabled people<br>🎓 <span class="em">Education AI</span> → like STU-BRAIN, making quality learning accessible to all!'
            },
            { type: 'concepts', tag: 'CLASS 7 · RESPONSIBLE AI', tagHi: 'CLASS 7 · RESPONSIBLE AI',
              title: '6 Pillars of Responsible AI', titleHi: '6 Pillars of Responsible AI',
              intro: 'India, EU, US and UN are all working on responsible AI frameworks. Here are the key principles!', introHi: 'India, EU, US and UN are all working on responsible AI frameworks. Here are the key principles!',
              items: [
                { em:'⚖️', l:'Fairness — Equal Treatment for All', lHi:'Fairness — Equal Treatment for All', d:'AI must not discriminate based on gender, caste, religion, or wealth. India\'s draft AI policy emphasizes fairness especially for marginalized communities.', dHi:'AI must not discriminate based on gender, caste, religion, or wealth. India\'s draft AI policy emphasizes fairness especially for marginalized communities.' },
                { em:'🔒', l:'Privacy — Control Over Your Data', lHi:'Privacy — Control Over Your Data', d:'You have the right to know what data AI collects about you, why, and how long it keeps it. India\'s DPDP Act 2023 gives you these rights.', dHi:'You have the right to know what data AI collects about you, why, and how long it keeps it. India\'s DPDP Act 2023 gives you these rights.' },
                { em:'🔍', l:'Explainability — Why Did AI Decide This?', lHi:'Explainability — Why Did AI Decide This?', d:'High-stakes AI decisions (loans, medical, legal) must be explainable. You deserve to know WHY AI rejected you or approved you.', dHi:'High-stakes AI decisions (loans, medical, legal) must be explainable. You deserve to know WHY AI rejected you or approved you.' },
                { em:'🛡️', l:'Safety Testing — Test Before Deploying', lHi:'Safety Testing — Test Before Deploying', d:'AI in medical devices, self-driving cars, and weapons must be tested millions of times before real use. One mistake can cost lives.', dHi:'AI in medical devices, self-driving cars, and weapons must be tested millions of times before real use. One mistake can cost lives.' },
                { em:'👥', l:'Human Oversight — Humans Stay in Charge', lHi:'Human Oversight — Humans Stay in Charge', d:'Critical decisions — should involve human review. AI should assist humans, not replace human judgment entirely in life-or-death situations.', dHi:'Critical decisions — should involve human review. AI should assist humans, not replace human judgment entirely in life-or-death situations.' },
                { em:'🌍', l:'Beneficial to All — Not Just the Wealthy', lHi:'Beneficial to All — Not Just the Wealthy', d:'AI should help developing countries, rural communities, and marginalized groups — not just tech companies and wealthy nations. STU-BRAIN is part of this mission!', dHi:'AI should help developing countries, rural communities, and marginalized groups — not just tech companies and wealthy nations. STU-BRAIN is part of this mission!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 7 · RESPONSIBLE AI QUIZ', tagHi: 'CLASS 7 · RESPONSIBLE AI QUIZ',
              title: '🧩 Responsible AI Quiz!', titleHi: '🧩 Responsible AI Quiz!',
              questions: [
                { q: 'A deepfake is?', qHi: 'A deepfake is?',
                  opts: ['A deep ocean camera', 'AI-generated fake video that makes someone appear to say or do things they never did', 'A type of neural network', 'A privacy setting'], optsHi: ['A deep ocean camera', 'AI-generated fake video that makes someone appear to say or do things they never did', 'A type of neural network', 'A privacy setting'],
                  c: 1, ex: 'AI-generated fake video! Deepfakes use AI to manipulate faces and voices, making it appear that real people said or did things they never did. Used for misinformation and fraud — a serious Responsible AI concern!', exHi: 'AI-generated fake video! Deepfakes use AI to manipulate faces and voices, making it appear that real people said or did things they never did. Used for misinformation and fraud — a serious Responsible AI concern!' },
                { q: 'India\'s law that protects your data from AI is?', qHi: 'India\'s law that protects your data from AI is?',
                  opts: ['RTI Act', 'DPDP Act 2023 (Digital Personal Data Protection Act)', 'Indian Penal Code', 'Companies Act'], optsHi: ['RTI Act', 'DPDP Act 2023 (Digital Personal Data Protection Act)', 'Indian Penal Code', 'Companies Act'],
                  c: 1, ex: 'DPDP Act 2023! India\'s Digital Personal Data Protection Act gives every Indian the right to know what personal data is collected, the right to correct it, and the right to delete it from company databases.', exHi: 'DPDP Act 2023! India\'s Digital Personal Data Protection Act gives every Indian the right to know what personal data is collected, the right to correct it, and the right to delete it from company databases.' },
                { q: 'Why should high-stakes AI decisions be explainable?', qHi: 'Why should high-stakes AI decisions be explainable?',
                  opts: ['To make AI look smarter', 'Because people deserve to know why they were rejected or approved and be able to appeal unfair decisions', 'To make AI faster', 'To reduce costs'], optsHi: ['To make AI look smarter', 'Because people deserve to know why they were rejected or approved and be able to appeal unfair decisions', 'To make AI faster', 'To reduce costs'],
                  c: 1, ex: 'Fairness and accountability! If AI rejects your loan, job, or medical insurance, you have the right to know the exact reason and challenge it if unfair. Black-box AI in high-stakes decisions violates fundamental rights.', exHi: 'Fairness and accountability! If AI rejects your loan, job, or medical insurance, you have the right to know the exact reason and challenge it if unfair. Black-box AI in high-stakes decisions violates fundamental rights.' },
                { q: 'AI can be beneficial for society by?', qHi: 'AI can be beneficial for society by?',
                  opts: ['Only making companies profitable', 'Helping fight climate change, discover drugs, assist disabled people, and make quality education accessible', 'Only making smartphones faster', 'Only reducing jobs'], optsHi: ['Only making companies profitable', 'Helping fight climate change, discover drugs, assist disabled people, and make quality education accessible', 'Only making smartphones faster', 'Only reducing jobs'],
                  c: 1, ex: 'Many beneficial uses! Climate prediction AI, drug discovery AI, accessibility tools for disabled people, and AI education platforms like STU-BRAIN — all use AI to benefit society, not just profit.', exHi: 'Many beneficial uses! Climate prediction AI, drug discovery AI, accessibility tools for disabled people, and AI education platforms like STU-BRAIN — all use AI to benefit society, not just profit.' },
                { q: 'Human oversight in AI means?', qHi: 'Human oversight in AI means?',
                  opts: ['Humans do all the work instead of AI', 'Humans should maintain control and review critical AI decisions, not leave life-or-death choices entirely to AI', 'AI should watch humans', 'Humans should repair AI computers'], optsHi: ['Humans do all the work instead of AI', 'Humans should maintain control and review critical AI decisions, not leave life-or-death choices entirely to AI', 'AI should watch humans', 'Humans should repair AI computers'],
                  c: 1, ex: 'Humans stay in control! AI should assist and augment human decision-making, not replace it entirely in critical situations. A doctor should review AI\'s cancer diagnosis. A judge should review AI\'s sentencing suggestion. Humans accountable.', exHi: 'Humans stay in control! AI should assist and augment human decision-making, not replace it entirely in critical situations. A doctor should review AI\'s cancer diagnosis. A judge should review AI\'s sentencing suggestion. Humans accountable.' }
              ]
            }
          ]
        }
      ]
    }]
  },

  8: {
    label: 'Class 8', labelHi: 'कक्षा 8', badge: '🌱 Foundation', badgeHi: '🌱 आधार',
    badgeStyle: 'background:rgba(67,233,123,.15);color:#43E97B;border:1px solid rgba(67,233,123,.3)',
    emoji: '🌱',
    subjects: [{
      id: 's8_ai', icon: '🤖', name: 'AI & Robotics Foundations', nameHi: 'AI और रोबोटिक्स की नींव',
      chapters: [
        {
          id: 'c8_1', icon: '🧠', title: 'What is AI? — From Basics to Today', titleHi: 'AI क्या है? — आज के AI तक', xp: 25,
          slides: [
            { type: 'teach', bot: 'a', botName: 'Brainbot 🤖', botNameHi: 'ब्रेनबॉट 🤖',
              tag: 'CLASS 8 · AI FOUNDATIONS · CHAPTER 1', tagHi: 'कक्षा 8 · AI आधार · अध्याय 1',
              title: 'What is Artificial Intelligence?', titleHi: 'आर्टिफिशियल इंटेलिजेंस क्या है?',
              intro: 'From simple calculators to computers that beat world chess champions — AI has an incredible history. Let\'s understand it all!',
              introHi: 'साधारण कैलकुलेटर से लेकर विश्व शतरंज चैंपियन को हराने वाले कंप्यूटर तक — AI की एक अविश्वसनीय यात्रा है!',
              speech: `<span class="hi">AI</span> = <span class="em">Artificial Intelligence</span><br><br>
🔹 <strong>Artificial</strong> = Made by humans (not natural)<br>
🔹 <strong>Intelligence</strong> = Ability to think, learn, solve problems<br><br>
AI's evolution:<br>
1950s → Alan Turing asks "Can machines think?"<br>
1997 → <span class="hi">Deep Blue</span> beats chess world champion<br>
2011 → <span class="em">IBM Watson</span> wins Jeopardy!<br>
2016 → <span class="cool">AlphaGo</span> defeats Go champion<br>
2022 → <span class="hot">ChatGPT</span> reaches 100M users in 60 days!<br><br>
Today AI powers: your phone, your games, medicine, science, everything!`,
              speechHi: `<span class="hi">AI</span> = <span class="em">कृत्रिम बुद्धिमत्ता</span><br><br>
🔹 <strong>Artificial</strong> = मनुष्यों द्वारा बनाया गया<br>
🔹 <strong>Intelligence</strong> = सोचने, सीखने की क्षमता<br><br>
AI का विकास:<br>
1950 → एलन ट्यूरिंग ने पूछा "क्या मशीनें सोच सकती हैं?"<br>
1997 → <span class="hi">Deep Blue</span> ने शतरंज चैंपियन को हराया<br>
2022 → <span class="hot">ChatGPT</span> ने 60 दिनों में 10 करोड़ यूजर पाए!`,
              extra: `<div class="callout cal-tip"><span class="cal-icon">💡</span><div><strong>Fun Fact!</strong> The word "Artificial Intelligence" was first used in 1956 at Dartmouth College, USA, by John McCarthy. It took 66 years to reach ChatGPT!</div></div>`
            },
            { type: 'concepts', tag: 'CLASS 8 · AI FOUNDATIONS · CHAPTER 1', tagHi: 'कक्षा 8 · AI आधार · अध्याय 1',
              title: '3 Types of AI — Which Exists Today?', titleHi: 'AI के 3 प्रकार',
              intro: 'AI comes in 3 power levels. Understanding these is the first step to mastering AI.',
              introHi: 'AI 3 शक्ति स्तरों में आता है।',
              items: [
                { em: '🐣', l: 'Narrow AI (ANI)', lHi: 'संकीर्ण AI', d: 'Does ONE task brilliantly. All AI today. Siri, ChatGPT, Face ID, Spotify, Alexa — all Narrow AI!', dHi: 'एक काम बेहतरीन करता है। आज का सभी AI — Siri, ChatGPT, Face ID — सब Narrow AI हैं!' },
                { em: '🧠', l: 'General AI (AGI)', lHi: 'सामान्य AI', d: 'Thinks like a human — can do ANYTHING a human can. Not yet built. Scientists are working on it!', dHi: 'इंसान की तरह सोचता है — इंसान जो कर सकता है वो सब। अभी नहीं बना, वैज्ञानिक काम कर रहे हैं!' },
                { em: '🚀', l: 'Super AI (ASI)', lHi: 'सुपर AI', d: 'Smarter than ALL humans combined. Science fiction for now. May never exist — or may arrive in 50-100 years.', dHi: 'सभी इंसानों से ज़्यादा स्मार्ट। अभी विज्ञान कथा है।' },
                { em: '📊', l: 'Key Insight', lHi: 'मुख्य बात', d: 'ChatGPT seems to know everything but is STILL Narrow AI! Great at text but cannot drive a car.', dHi: 'ChatGPT सब जानता लगता है, पर Narrow AI ही है! कार नहीं चला सकता।' }
              ]
            },
            { type: 'reallife', tag: 'CLASS 8 · AI FOUNDATIONS · CHAPTER 1', tagHi: 'कक्षा 8 · AI आधार · अध्याय 1',
              title: 'AI in Your Life — Right Now!', titleHi: 'आपके जीवन में AI — अभी!',
              intro: 'You use AI dozens of times every single day!',
              introHi: 'आप हर दिन दर्जनों बार AI का उपयोग करते हैं!',
              items: [
                { ic: '🎵', nm: 'Spotify / YouTube Music', ds: 'Studies your listening patterns — plays, skips, replays — and recommends new songs you\'ll love. 400M+ users served by AI!', dsHi: 'आपकी सुनने की आदतें समझता है और नए गाने सुझाता है।' },
                { ic: '📱', nm: 'Face Unlock', ds: 'Scans 30,000 invisible infrared dots on your face. Creates a mathematical 3D model. Recognizes you in 0.3 seconds!', dsHi: 'आपके चेहरे पर 30,000 अदृश्य बिंदु स्कैन करता है। 0.3 सेकंड में पहचानता है!' },
                { ic: '🎮', nm: 'PUBG / Free Fire', ds: 'Enemy bots use AI — pathfinding to find you, decision trees to attack or retreat, team coordination!', dsHi: 'दुश्मन बॉट AI का उपयोग करते हैं — आपको ढूंढने, हमला करने, पीछे हटने के लिए!' },
                { ic: '🔍', nm: 'Google Search', ds: 'AI reads BILLIONS of web pages in 0.4 seconds, ranks them by relevance, and shows you the best answer!', dsHi: 'AI अरबों वेब पेज 0.4 सेकंड में पढ़ता है और सबसे अच्छा जवाब दिखाता है!' },
                { ic: '🤖', nm: 'ChatGPT', ds: 'Trained on most of the internet\'s text. 200 million daily users. Changed education, coding, writing forever!', dsHi: 'इंटरनेट के अधिकांश टेक्स्ट पर प्रशिक्षित। 20 करोड़ दैनिक उपयोगकर्ता।' },
                { ic: '🏥', nm: 'Medical AI', ds: 'Detects cancer in X-rays with 94% accuracy — matching top specialists. AI is saving lives daily!', dsHi: 'X-ray में 94% सटीकता से कैंसर पहचानता है — AI हर दिन जिंदगियां बचा रहा है!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 8 · AI FOUNDATIONS · CHAPTER 1', tagHi: 'कक्षा 8 · AI आधार · अध्याय 1',
              title: 'Chapter 1 Quiz!', titleHi: 'अध्याय 1 प्रश्नोत्तरी!',
              questions: [
                { q: 'What does "Artificial" in AI mean?', qHi: 'AI में "Artificial" का मतलब क्या है?', opts: ['Natural', 'Made by humans', 'Very smart', 'Automatic'], optsHi: ['प्राकृतिक', 'मनुष्यों द्वारा बनाया', 'बहुत स्मार्ट', 'स्वचालित'], c: 1, ex: 'Artificial = man-made! Not natural. AI is intelligence built by humans, not found in nature.', exHi: 'Artificial = मनुष्यों द्वारा बनाया! AI मनुष्यों द्वारा बनाई गई बुद्धिमत्ता है।' },
                { q: 'Which type of AI exists today in 2025?', qHi: '2025 में कौन सा AI आज मौजूद है?', opts: ['Super AI', 'General AI', 'Narrow AI', 'All three'], optsHi: ['सुपर AI', 'सामान्य AI', 'संकीर्ण AI', 'तीनों'], c: 2, ex: 'Only Narrow AI exists today! Every AI you\'ve used — Siri, ChatGPT, Face ID — is Narrow AI.', exHi: 'केवल Narrow AI आज मौजूद है! आपने जो भी AI इस्तेमाल किया — Siri, ChatGPT — सब Narrow AI है।' },
                { q: 'In what year did ChatGPT reach 100 million users?', qHi: 'ChatGPT ने 10 करोड़ यूजर कब पाए?', opts: ['2020', '2021', '2022', '2023'], optsHi: ['2020', '2021', '2022', '2023'], c: 2, ex: 'ChatGPT launched in November 2022 and reached 100M users in just 60 days — the fastest in history!', exHi: 'ChatGPT नवंबर 2022 में लॉन्च हुआ और 60 दिनों में 10 करोड़ यूजर — इतिहास में सबसे तेज़!' }
              ]
            }
          ]
        },
        {
          id: 'c8_2', icon: '🤖', title: 'Robotics & How Machines Move', titleHi: 'रोबोटिक्स और मशीनें कैसे चलती हैं', xp: 25,
          slides: [
            { type: 'teach', bot: 'c', botName: 'RoboMaster 🦾', botNameHi: 'रोबोमास्टर 🦾',
              tag: 'CLASS 8 · ROBOTICS · CHAPTER 2', tagHi: 'कक्षा 8 · रोबोटिक्स · अध्याय 2',
              title: 'Robots — Sense, Think, Act!', titleHi: 'रोबोट — महसूस करो, सोचो, करो!',
              intro: 'Every robot — from a simple vacuum cleaner to a Mars rover — uses the same 3-part system.',
              introHi: 'हर रोबोट — साधारण वैक्यूम से मंगल ग्रह के रोवर तक — एक ही 3-भाग प्रणाली का उपयोग करता है।',
              speech: `Every robot needs exactly <span class="hi">3 things</span>:<br><br>
👁️ <strong>Sensors</strong> — Eyes & ears of the robot<br>&nbsp;&nbsp;&nbsp;(cameras, microphones, LiDAR, touch, temperature)<br><br>
🧠 <strong>Controller</strong> — The brain<br>&nbsp;&nbsp;&nbsp;(computer chip that processes information)<br><br>
💪 <strong>Actuators</strong> — Muscles<br>&nbsp;&nbsp;&nbsp;(motors, wheels, arms, speakers)<br><br>
The <span class="hi">Sense → Think → Act</span> loop runs <span class="em">50-100 times per second</span>!`,
              speechHi: `हर रोबोट को ठीक <span class="hi">3 चीजें</span> चाहिए:<br><br>
👁️ <strong>सेंसर</strong> — रोबोट की आंखें और कान<br>
🧠 <strong>कंट्रोलर</strong> — दिमाग<br>
💪 <strong>एक्चुएटर</strong> — मांसपेशियां`
            },
            { type: 'flow', tag: 'CLASS 8 · ROBOTICS · CHAPTER 2', tagHi: 'कक्षा 8 · रोबोटिक्स · अध्याय 2',
              title: 'The Robot Control Loop', titleHi: 'रोबोट कंट्रोल लूप',
              intro: 'This loop runs continuously — 50 to 100 times every second!',
              introHi: 'यह लूप लगातार चलता है — हर सेकंड 50 से 100 बार!',
              nodes: [
                { i: '👁️', l: 'SENSE', s: 'Cameras, touch', c: 'fn-green' }, { arrow: true },
                { i: '🧠', l: 'PROCESS', s: 'Understand data', c: 'fn-blue' }, { arrow: true },
                { i: '⚡', l: 'DECIDE', s: 'What to do?', c: 'fn-yellow' }, { arrow: true },
                { i: '💪', l: 'ACT', s: 'Move, speak', c: 'fn-pink' }
              ],
              extra: `<div class="callout cal-info"><span class="cal-icon">🤖</span><div><strong>Real Example — Tesla Autopilot:</strong> 8 cameras SENSE the road → Neural network PROCESSES all feeds → AI DECIDES steering/speed → Motors ACT. All in under 100 milliseconds! ⚡</div></div>`
            },
            { type: 'reallife', tag: 'CLASS 8 · ROBOTICS · CHAPTER 2', tagHi: 'कक्षा 8 · रोबोटिक्स · अध्याय 2',
              title: 'Amazing Robots Right Now!', titleHi: 'अभी के अद्भुत रोबोट!', intro: '', introHi: '',
              items: [
                { ic: '🚗', nm: 'Tesla Full Self-Drive', ds: 'Drives on highways using 8 cameras + AI. No LiDAR — just cameras and neural networks!', dsHi: '8 कैमरों से हाईवे पर खुद चलता है। सिर्फ कैमरे और न्यूरल नेटवर्क!' },
                { ic: '🦾', nm: 'Boston Dynamics Atlas', ds: 'Humanoid robot that runs, jumps, does backflips and helps in disaster zones!', dsHi: 'इंसान जैसा रोबोट जो दौड़ता, कूदता और बैकफ्लिप करता है!' },
                { ic: '🚀', nm: 'NASA Perseverance', ds: 'Robot car on Mars — 225 million km away! Drills rocks, takes samples, searching for ancient life.', dsHi: 'मंगल पर रोबोट कार — 22.5 करोड़ किमी दूर! पत्थर ड्रिल करता है।' },
                { ic: '🏥', nm: 'Da Vinci Surgical', ds: 'Assists surgeons with arms thinner than a pencil — 10x more precise than human hands!', dsHi: 'डॉक्टरों की मदद करता है पेंसिल से पतले हाथों से — 10x ज़्यादा सटीक!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 8 · ROBOTICS · CHAPTER 2', tagHi: 'कक्षा 8 · रोबोटिक्स · अध्याय 2',
              title: 'Robotics Quiz!', titleHi: 'रोबोटिक्स प्रश्नोत्तरी!',
              questions: [
                { q: 'What are the 3 essential parts of every robot?', qHi: 'हर रोबोट के 3 आवश्यक भाग कौन से हैं?', opts: ['Wheels, battery, screen', 'Sensors, Controller, Actuators', 'Camera, keyboard, mouse', 'CPU, RAM, storage'], optsHi: ['पहिए, बैटरी, स्क्रीन', 'सेंसर, कंट्रोलर, एक्चुएटर', 'कैमरा, कीबोर्ड, माउस', 'CPU, RAM, स्टोरेज'], c: 1, ex: 'Sensors (sense), Controller/brain (think & decide), Actuators (move & act). Without any one — not a complete robot!', exHi: 'सेंसर (महसूस करना), कंट्रोलर/दिमाग (सोचना और निर्णय), एक्चुएटर (हिलना)।' },
                { q: 'How many cameras does Tesla use for its Autopilot?', qHi: 'Tesla Autopilot के लिए कितने कैमरे उपयोग करती है?', opts: ['2', '4', '8', '12'], optsHi: ['2', '4', '8', '12'], c: 2, ex: 'Tesla uses 8 cameras for complete 360° vision with no blind spots!', exHi: 'Tesla 8 कैमरों का उपयोग करती है पूर्ण 360° दृष्टि के लिए!' }
              ]
            }
          ]
        },
,
        {
          id: 'c8_4', icon: '🎯', title: 'Types of AI — Narrow, General and Super AI', titleHi: 'Types of AI — Narrow, General and Super AI', xp: 25,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 8 · TYPES OF AI · CHAPTER 4', tagHi: 'CLASS 8 · TYPES OF AI · CHAPTER 4',
              title: 'Three Types of AI — From Siri to Terminator!', titleHi: 'Three Types of AI — From Siri to Terminator!',
              intro: 'Not all AI is the same! From your phone assistant to the AI in movies — there are 3 types.', introHi: 'Not all AI is the same! From your phone assistant to the AI in movies — there are 3 types.',
              speech: '<span class="hi">3 Types of AI:</span><br><br>🎯 <span class="em">Narrow AI (Weak AI)</span> — Does ONE thing extremely well<br>Examples: Google Search, Alexa, Netflix recommendations, Chess AI<br><br>🧠 <span class="cool">General AI (AGI)</span> — Can do ANY task a human can<br>Does NOT exist yet! Scientists are working on it.<br><br>🚀 <span class="hi">Super AI (ASI)</span> — Smarter than all humans combined<br>Only in movies right now (Terminator, HAL 9000)!<br><br><span class="em">Today: We only have Narrow AI. And it is already changing the world!</span>',
              speechHi: '<span class="hi">3 Types of AI:</span><br><br>🎯 <span class="em">Narrow AI (Weak AI)</span> — Does ONE thing extremely well<br>Examples: Google Search, Alexa, Netflix recommendations, Chess AI<br><br>🧠 <span class="cool">General AI (AGI)</span> — Can do ANY task a human can<br>Does NOT exist yet! Scientists are working on it.<br><br>🚀 <span class="hi">Super AI (ASI)</span> — Smarter than all humans combined<br>Only in movies right now (Terminator, HAL 9000)!<br><br><span class="em">Today: We only have Narrow AI. And it is already changing the world!</span>'
            },
            { type: 'concepts', tag: 'CLASS 8 · AI TYPES EXAMPLES', tagHi: 'CLASS 8 · AI TYPES EXAMPLES',
              title: 'Real Examples of Each AI Type', titleHi: 'Real Examples of Each AI Type',
              intro: 'Every AI you use today is Narrow AI. General AI does not exist yet!', introHi: 'Every AI you use today is Narrow AI. General AI does not exist yet!',
              items: [
                { em:'🎯', l:'Narrow AI — Siri/Alexa', lHi:'Narrow AI — Siri/Alexa', d:'Answers voice questions but cannot drive a car, play chess, AND make dinner simultaneously!', dHi:'Answers voice questions but cannot drive a car, play chess, AND make dinner simultaneously!' },
                { em:'🎯', l:'Narrow AI — ChatGPT', lHi:'Narrow AI — ChatGPT', d:'Extremely good at text and conversation, but cannot walk around, see the physical world, or do math as reliably as a calculator.', dHi:'Extremely good at text and conversation, but cannot walk around, see the physical world, or do math as reliably as a calculator.' },
                { em:'🎯', l:'Narrow AI — AlphaGo', lHi:'Narrow AI — AlphaGo', d:'Best Go player ever! But it has no idea how to play Chess — completely different Narrow AI needed.', dHi:'Best Go player ever! But it has no idea how to play Chess — completely different Narrow AI needed.' },
                { em:'🧠', l:'General AI (AGI) — Coming?', lHi:'General AI (AGI) — Coming?', d:'The goal researchers at OpenAI, Google DeepMind, Anthropic are working toward. May arrive in 5-20 years!', dHi:'The goal researchers at OpenAI, Google DeepMind, Anthropic are working toward. May arrive in 5-20 years!' },
                { em:'🚀', l:'Super AI — Science Fiction', lHi:'Super AI — Science Fiction', d:'An AI smarter than Einstein, Shakespeare, and Einstein combined. Only exists in movies like Avengers and Terminator!', dHi:'An AI smarter than Einstein, Shakespeare, and Einstein combined. Only exists in movies like Avengers and Terminator!' },
                { em:'🇮🇳', l:'Indian AI Research', lHi:'Indian AI Research', d:'IIT Delhi, IISc Bangalore, TCS Research — all working on making AI smarter. India has 10 lakh+ AI researchers!', dHi:'IIT Delhi, IISc Bangalore, TCS Research — all working on making AI smarter. India has 10 lakh+ AI researchers!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 8 · AI TYPES QUIZ', tagHi: 'CLASS 8 · AI TYPES QUIZ',
              title: '🧩 Types of AI — 10 Question Practice Quiz', titleHi: '🧩 Types of AI — 10 Question Practice Quiz',
              questions: [
                { q: 'What type of AI does Alexa represent?', qHi: 'What type of AI does Alexa represent?',
                  opts: ['Super AI', 'General AI', 'Narrow AI', 'Robotic AI'], optsHi: ['Super AI', 'General AI', 'Narrow AI', 'Robotic AI'],
                  c: 2, ex: 'Narrow AI! Alexa does ONE thing extremely well — voice assistance. It cannot drive a car or cook food!', exHi: 'Narrow AI! Alexa does ONE thing extremely well — voice assistance. It cannot drive a car or cook food!' },
                { q: 'Does Artificial General Intelligence (AGI) exist today?', qHi: 'Does Artificial General Intelligence (AGI) exist today?',
                  opts: ['Yes, in computers', 'Yes, in robots', 'No, not yet', 'Yes, in ChatGPT'], optsHi: ['Yes, in computers', 'Yes, in robots', 'No, not yet', 'Yes, in ChatGPT'],
                  c: 2, ex: 'No! AGI does not exist yet. All current AI including ChatGPT is Narrow AI. AGI is the future goal!', exHi: 'No! AGI does not exist yet. All current AI including ChatGPT is Narrow AI. AGI is the future goal!' },
                { q: 'Which company is NOT working on General AI research?', qHi: 'Which company is NOT working on General AI research?',
                  opts: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Zomato'], optsHi: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Zomato'],
                  c: 3, ex: 'Zomato is a food delivery app — they use Narrow AI for recommendations, not working on AGI research!', exHi: 'Zomato is a food delivery app — they use Narrow AI for recommendations, not working on AGI research!' },
                { q: 'AlphaGo can beat world champions in Go. Can it also play Chess?', qHi: 'AlphaGo can beat world champions in Go. Can it also play Chess?',
                  opts: ['Yes automatically', 'No, needs separate AI', 'Yes with minor updates', 'It already plays Chess'], optsHi: ['Yes automatically', 'No, needs separate AI', 'Yes with minor updates', 'It already plays Chess'],
                  c: 1, ex: 'No! AlphaGo is Narrow AI — only for Go. A completely different AI (AlphaZero) was built for Chess!', exHi: 'No! AlphaGo is Narrow AI — only for Go. A completely different AI (AlphaZero) was built for Chess!' },
                { q: 'Super AI is also called?', qHi: 'Super AI is also called?',
                  opts: ['Narrow AI', 'Strong AI', 'Artificial Super Intelligence (ASI)', 'Machine Learning'], optsHi: ['Narrow AI', 'Strong AI', 'Artificial Super Intelligence (ASI)', 'Machine Learning'],
                  c: 2, ex: 'ASI = Artificial Super Intelligence! An AI smarter than all humans combined. Only exists in movies!', exHi: 'ASI = Artificial Super Intelligence! An AI smarter than all humans combined. Only exists in movies!' },
                { q: 'Which of these is a real Narrow AI used in India?', qHi: 'Which of these is a real Narrow AI used in India?',
                  opts: ['HAL 9000', 'Terminator', 'SkyNet', 'Paytm fraud detection AI'], optsHi: ['HAL 9000', 'Terminator', 'SkyNet', 'Paytm fraud detection AI'],
                  c: 3, ex: 'Paytm fraud detection AI is real Narrow AI used in India today! It detects fraudulent transactions in milliseconds.', exHi: 'Paytm fraud detection AI is real Narrow AI used in India today! It detects fraudulent transactions in milliseconds.' },
                { q: 'What is the main difference between Narrow AI and General AI?', qHi: 'What is the main difference between Narrow AI and General AI?',
                  opts: ['Speed', 'Narrow does one task, General does any task', 'Cost', 'Size of computer'], optsHi: ['Speed', 'Narrow does one task, General does any task', 'Cost', 'Size of computer'],
                  c: 1, ex: 'Narrow AI = one task extremely well. General AI = any task a human can do. We only have Narrow AI today!', exHi: 'Narrow AI = one task extremely well. General AI = any task a human can do. We only have Narrow AI today!' },
                { q: 'Why is today\'s AI called "Narrow"?', qHi: 'Why is today\'s AI called "Narrow"?',
                  opts: ['It has a narrow screen', 'It can only do specific limited tasks', 'It is very slow', 'It only works in narrow places'], optsHi: ['It has a narrow screen', 'It can only do specific limited tasks', 'It is very slow', 'It only works in narrow places'],
                  c: 1, ex: 'Narrow because it has a narrow, limited scope — it is excellent at ONE specific thing but cannot generalize!', exHi: 'Narrow because it has a narrow, limited scope — it is excellent at ONE specific thing but cannot generalize!' },
                { q: 'India has approximately how many AI researchers?', qHi: 'India has approximately how many AI researchers?',
                  opts: ['100', '1,000', '10 lakh+', '1 crore'], optsHi: ['100', '1,000', '10 lakh+', '1 crore'],
                  c: 2, ex: 'India has 10 lakh+ (1 million+) AI researchers — second largest AI talent pool in the world after USA!', exHi: 'India has 10 lakh+ (1 million+) AI researchers — second largest AI talent pool in the world after USA!' },
                { q: 'When might AGI (General AI) arrive according to researchers?', qHi: 'When might AGI (General AI) arrive according to researchers?',
                  opts: ['It exists now', '5-20 years from now', '100 years', 'Never'], optsHi: ['It exists now', '5-20 years from now', '100 years', 'Never'],
                  c: 1, ex: 'Most researchers estimate AGI in 5-20 years. Some say sooner, some say later — it is an active area of research and debate!', exHi: 'Most researchers estimate AGI in 5-20 years. Some say sooner, some say later — it is an active area of research and debate!' }
              ]
            }
          ]
        },
        {
          id: 'c8_5', icon: '📊', title: 'Data — How AI Learns and Thinks', titleHi: 'Data — How AI Learns and Thinks', xp: 25,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 8 · DATA BASICS · CHAPTER 5', tagHi: 'CLASS 8 · DATA BASICS · CHAPTER 5',
              title: 'Data — The Food That AI Eats to Become Smart!', titleHi: 'Data — The Food That AI Eats to Become Smart!',
              intro: 'Just like you need food to grow, AI needs DATA to learn. No data = no intelligence!', introHi: 'Just like you need food to grow, AI needs DATA to learn. No data = no intelligence!',
              speech: '<span class="hi">DATA</span> = Information that AI learns from<br><br>📱 Your WhatsApp sends <span class="em">65 billion messages per day</span> — all data!<br>📸 Instagram: <span class="cool">100 million photos uploaded daily</span><br>🗺️ Google Maps: <span class="hi">tracks 1 billion users</span> to predict traffic<br><br><span class="em">Types of Data:</span><br>📝 <strong>Text</strong> — WhatsApp, books, emails, tweets<br>🖼️ <strong>Images</strong> — photos, X-rays, satellite images<br>🎵 <strong>Audio</strong> — voice messages, songs, phone calls<br>📍 <strong>Location</strong> — GPS, Google Maps<br>📊 <strong>Numbers</strong> — exam scores, prices, temperatures<br><br><span class="hi">More quality data → Smarter AI!</span>',
              speechHi: '<span class="hi">DATA</span> = Information that AI learns from<br><br>📱 Your WhatsApp sends <span class="em">65 billion messages per day</span> — all data!<br>📸 Instagram: <span class="cool">100 million photos uploaded daily</span><br>🗺️ Google Maps: <span class="hi">tracks 1 billion users</span> to predict traffic<br><br><span class="em">Types of Data:</span><br>📝 <strong>Text</strong> — WhatsApp, books, emails, tweets<br>🖼️ <strong>Images</strong> — photos, X-rays, satellite images<br>🎵 <strong>Audio</strong> — voice messages, songs, phone calls<br>📍 <strong>Location</strong> — GPS, Google Maps<br>📊 <strong>Numbers</strong> — exam scores, prices, temperatures<br><br><span class="hi">More quality data → Smarter AI!</span>'
            },
            { type: 'concepts', tag: 'CLASS 8 · DATA IN INDIA', tagHi: 'CLASS 8 · DATA IN INDIA',
              title: 'How Indian Apps Use Data to Build AI', titleHi: 'How Indian Apps Use Data to Build AI',
              intro: 'Every Indian app you use is collecting data to train AI.', introHi: 'Every Indian app you use is collecting data to train AI.',
              items: [
                { em:'🛒', l:'Flipkart & Amazon India', lHi:'Flipkart & Amazon India', d:'Track every product you click, search, and buy. AI predicts what you want to buy next — 35% of all purchases come from AI recommendations!', dHi:'Track every product you click, search, and buy. AI predicts what you want to buy next — 35% of all purchases come from AI recommendations!' },
                { em:'🍕', l:'Zomato & Swiggy', lHi:'Zomato & Swiggy', d:'Collect your order history, location, time of day. AI predicts delivery time and suggests food you will love. 1 billion orders analyzed!', dHi:'Collect your order history, location, time of day. AI predicts delivery time and suggests food you will love. 1 billion orders analyzed!' },
                { em:'📱', l:'PhonePe & Google Pay', lHi:'PhonePe & Google Pay', d:'Track every transaction pattern. AI flags suspicious transactions in under 0.1 seconds — protecting millions of Indians from fraud daily!', dHi:'Track every transaction pattern. AI flags suspicious transactions in under 0.1 seconds — protecting millions of Indians from fraud daily!' },
                { em:'🚌', l:'Ola & Uber', lHi:'Ola & Uber', d:'Collect pickup/dropoff locations, time, traffic. AI calculates surge pricing, matches driver to rider, and predicts demand — all from data!', dHi:'Collect pickup/dropoff locations, time, traffic. AI calculates surge pricing, matches driver to rider, and predicts demand — all from data!' },
                { em:'🌾', l:'Indian Farmers', lHi:'Indian Farmers', d:'Government AGRI platform collects soil data, weather data, crop data from 100 million+ farmers to predict best crops and detect diseases early!', dHi:'Government AGRI platform collects soil data, weather data, crop data from 100 million+ farmers to predict best crops and detect diseases early!' },
                { em:'🏥', l:'Apollo & AIIMS', lHi:'Apollo & AIIMS', d:'Collect X-ray, blood test, symptom data from millions of patients. AI now diagnoses diseases as accurately as specialist doctors in some cases!', dHi:'Collect X-ray, blood test, symptom data from millions of patients. AI now diagnoses diseases as accurately as specialist doctors in some cases!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 8 · DATA QUIZ', tagHi: 'CLASS 8 · DATA QUIZ',
              title: '🧩 Data & AI — 10 Question Practice Quiz', titleHi: '🧩 Data & AI — 10 Question Practice Quiz',
              questions: [
                { q: 'How many WhatsApp messages are sent globally every day?', qHi: 'How many WhatsApp messages are sent globally every day?',
                  opts: ['1 billion', '10 billion', '65 billion', '100 billion'], optsHi: ['1 billion', '10 billion', '65 billion', '100 billion'],
                  c: 2, ex: '65 billion messages per day! That is an enormous amount of text data. WhatsApp uses AI to filter spam and detect harmful content.', exHi: '65 billion messages per day! That is an enormous amount of text data. WhatsApp uses AI to filter spam and detect harmful content.' },
                { q: 'What percentage of Flipkart purchases come from AI recommendations?', qHi: 'What percentage of Flipkart purchases come from AI recommendations?',
                  opts: ['5%', '15%', '25%', '35%'], optsHi: ['5%', '15%', '25%', '35%'],
                  c: 3, ex: '35%! AI recommends "You might also like..." based on your data — and 35% of all purchases follow those recommendations!', exHi: '35%! AI recommends "You might also like..." based on your data — and 35% of all purchases follow those recommendations!' },
                { q: 'Which of these is NOT a type of data?', qHi: 'Which of these is NOT a type of data?',
                  opts: ['Text messages', 'Photos', 'Gravity', 'Location data'], optsHi: ['Text messages', 'Photos', 'Gravity', 'Location data'],
                  c: 2, ex: 'Gravity is a force, not data! Data is information that can be stored — text, images, audio, numbers, and location are all types of data.', exHi: 'Gravity is a force, not data! Data is information that can be stored — text, images, audio, numbers, and location are all types of data.' },
                { q: 'What does "garbage in, garbage out" mean in AI?', qHi: 'What does "garbage in, garbage out" mean in AI?',
                  opts: ['AI produces garbage', 'Bad data = bad AI predictions', 'AI wastes energy', 'Output is always garbage'], optsHi: ['AI produces garbage', 'Bad data = bad AI predictions', 'AI wastes energy', 'Output is always garbage'],
                  c: 1, ex: 'If you train AI on wrong or bad data, it will make wrong predictions! Quality data is critical for intelligent AI.', exHi: 'If you train AI on wrong or bad data, it will make wrong predictions! Quality data is critical for intelligent AI.' },
                { q: 'How fast does PhonePe AI detect suspicious transactions?', qHi: 'How fast does PhonePe AI detect suspicious transactions?',
                  opts: ['1 minute', '10 seconds', '1 second', 'Under 0.1 seconds'], optsHi: ['1 minute', '10 seconds', '1 second', 'Under 0.1 seconds'],
                  c: 3, ex: 'Under 0.1 seconds! AI analyzes patterns in milliseconds — far faster than any human could spot fraud.', exHi: 'Under 0.1 seconds! AI analyzes patterns in milliseconds — far faster than any human could spot fraud.' },
                { q: 'More data makes AI?', qHi: 'More data makes AI?',
                  opts: ['Slower', 'Dumber', 'Smarter (if quality data)', 'More expensive only'], optsHi: ['Slower', 'Dumber', 'Smarter (if quality data)', 'More expensive only'],
                  c: 2, ex: 'More quality data generally makes AI smarter! This is why Google, Amazon, and ISRO collect and store so much data.', exHi: 'More quality data generally makes AI smarter! This is why Google, Amazon, and ISRO collect and store so much data.' },
                { q: 'What type of data does Google Maps use?', qHi: 'What type of data does Google Maps use?',
                  opts: ['Text only', 'Images only', 'Location/GPS data', 'Audio only'], optsHi: ['Text only', 'Images only', 'Location/GPS data', 'Audio only'],
                  c: 2, ex: 'Location/GPS data! Google Maps tracks 1 billion users to understand traffic patterns and give real-time navigation.', exHi: 'Location/GPS data! Google Maps tracks 1 billion users to understand traffic patterns and give real-time navigation.' },
                { q: 'ISRO collects which type of data for their AI systems?', qHi: 'ISRO collects which type of data for their AI systems?',
                  opts: ['Movie reviews', 'Satellite and space mission data', 'Social media posts', 'Food orders'], optsHi: ['Movie reviews', 'Satellite and space mission data', 'Social media posts', 'Food orders'],
                  c: 1, ex: 'Satellite and space mission data! ISRO uses AI to analyze satellite images of Earth, monitor weather, and plan missions.', exHi: 'Satellite and space mission data! ISRO uses AI to analyze satellite images of Earth, monitor weather, and plan missions.' },
                { q: 'How many farmers does India\'s AGRI platform collect data from?', qHi: 'How many farmers does India\'s AGRI platform collect data from?',
                  opts: ['1 million', '10 million', '100 million+', '1 billion'], optsHi: ['1 million', '10 million', '100 million+', '1 billion'],
                  c: 2, ex: '100 million+ farmers! India collects soil, weather, and crop data from over 10 crore farmers to help them with AI-powered advice.', exHi: '100 million+ farmers! India collects soil, weather, and crop data from over 10 crore farmers to help them with AI-powered advice.' },
                { q: 'What is "structured data"?', qHi: 'What is "structured data"?',
                  opts: ['Data in unorganized form', 'Data in organized table/spreadsheet form', 'Data that is broken', 'Data that is very large'], optsHi: ['Data in unorganized form', 'Data in organized table/spreadsheet form', 'Data that is broken', 'Data that is very large'],
                  c: 1, ex: 'Structured data is organized in rows and columns like Excel. Student marks, employee salaries, product prices are all structured data. Easy for AI to process!', exHi: 'Structured data is organized in rows and columns like Excel. Student marks, employee salaries, product prices are all structured data. Easy for AI to process!' }
              ]
            }
          ]
        },
        {
          id: 'c8_6', icon: '🌍', title: 'AI Around Us — AI in Everyday Indian Life', titleHi: 'AI Around Us — AI in Everyday Indian Life', xp: 25,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 8 · AI IN DAILY LIFE · CHAPTER 6', tagHi: 'CLASS 8 · AI IN DAILY LIFE · CHAPTER 6',
              title: 'AI is Already Everywhere Around You!', titleHi: 'AI is Already Everywhere Around You!',
              intro: 'From the moment you wake up to bedtime — AI is helping you every single day. Let us discover it!', introHi: 'From the moment you wake up to bedtime — AI is helping you every single day. Let us discover it!',
              speech: '<span class="hi">AI in YOUR Day:</span><br><br>⏰ <span class="em">Morning:</span> Alarm tune chosen by AI based on your sleep data<br>📱 <span class="cool">WhatsApp:</span> AI suggests quick replies, detects spam<br>🎵 <span class="hi">YouTube/Spotify:</span> AI picks your next song/video<br>🗺️ <span class="em">Going to School:</span> Google Maps AI avoids traffic<br>📚 <span class="cool">Learning:</span> STU-BRAIN AI teaches you personally!<br>🍕 <span class="hi">Evening:</span> Zomato AI recommends dinner<br><br>You interact with AI <span class="em">100+ times every day</span> without even knowing it!',
              speechHi: '<span class="hi">AI in YOUR Day:</span><br><br>⏰ <span class="em">Morning:</span> Alarm tune chosen by AI based on your sleep data<br>📱 <span class="cool">WhatsApp:</span> AI suggests quick replies, detects spam<br>🎵 <span class="hi">YouTube/Spotify:</span> AI picks your next song/video<br>🗺️ <span class="em">Going to School:</span> Google Maps AI avoids traffic<br>📚 <span class="cool">Learning:</span> STU-BRAIN AI teaches you personally!<br>🍕 <span class="hi">Evening:</span> Zomato AI recommends dinner<br><br>You interact with AI <span class="em">100+ times every day</span> without even knowing it!'
            },
            { type: 'concepts', tag: 'CLASS 8 · AI DAILY EXAMPLES', tagHi: 'CLASS 8 · AI DAILY EXAMPLES',
              title: '8 Ways You Use AI Every Day', titleHi: '8 Ways You Use AI Every Day',
              intro: 'Identify the AI in your own life!', introHi: 'Identify the AI in your own life!',
              items: [
                { em:'📸', l:'Instagram Filters', lHi:'Instagram Filters', d:'Facial recognition AI detects your face in 0.01 seconds and applies filters. Same technology used in Aadhaar identification!', dHi:'Facial recognition AI detects your face in 0.01 seconds and applies filters. Same technology used in Aadhaar identification!' },
                { em:'🎵', l:'YouTube Recommendations', lHi:'YouTube Recommendations', d:'AI studies what you watch, how long, when you skip — then picks your next video. 70% of watch time comes from AI recommendations!', dHi:'AI studies what you watch, how long, when you skip — then picks your next video. 70% of watch time comes from AI recommendations!' },
                { em:'🏏', l:'Hotstar Live Cricket', lHi:'Hotstar Live Cricket', d:'AI generates real-time match analytics, predicts outcomes, and gives ball-by-ball commentary assistance for 500 million IPL viewers!', dHi:'AI generates real-time match analytics, predicts outcomes, and gives ball-by-ball commentary assistance for 500 million IPL viewers!' },
                { em:'📚', l:'Google Translate', lHi:'Google Translate', d:'AI translates between 109 Indian languages instantly. Grandmother can read your English essay in Hindi — AI makes this possible!', dHi:'AI translates between 109 Indian languages instantly. Grandmother can read your English essay in Hindi — AI makes this possible!' },
                { em:'🛡️', l:'Email Spam Filter', lHi:'Email Spam Filter', d:'AI blocks 99.9% of spam before it reaches your inbox. Gmail AI analyzes billions of emails daily to keep yours clean!', dHi:'AI blocks 99.9% of spam before it reaches your inbox. Gmail AI analyzes billions of emails daily to keep yours clean!' },
                { em:'🏥', l:'Pulse Oximeter App', lHi:'Pulse Oximeter App', d:'AI on your phone can measure heart rate and oxygen levels using just the camera! Same AI helps doctors remotely diagnose patients.', dHi:'AI on your phone can measure heart rate and oxygen levels using just the camera! Same AI helps doctors remotely diagnose patients.' },
                { em:'🌦️', l:'Weather App', lHi:'Weather App', d:'AI analyzes satellite data, ocean temperatures, and atmospheric pressure to predict rain 7 days ahead with 90%+ accuracy!', dHi:'AI analyzes satellite data, ocean temperatures, and atmospheric pressure to predict rain 7 days ahead with 90%+ accuracy!' },
                { em:'🎮', l:'Mobile Games', lHi:'Mobile Games', d:'PUBG, Clash of Clans — AI-controlled enemy bots adapt to your playing style and get harder as you improve. AI makes games more fun!', dHi:'PUBG, Clash of Clans — AI-controlled enemy bots adapt to your playing style and get harder as you improve. AI makes games more fun!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 8 · AI DAILY LIFE QUIZ', tagHi: 'CLASS 8 · AI DAILY LIFE QUIZ',
              title: '🧩 AI in Daily Life — 10 Question Practice Quiz', titleHi: '🧩 AI in Daily Life — 10 Question Practice Quiz',
              questions: [
                { q: 'What percentage of YouTube watch time comes from AI recommendations?', qHi: 'What percentage of YouTube watch time comes from AI recommendations?',
                  opts: ['10%', '30%', '50%', '70%'], optsHi: ['10%', '30%', '50%', '70%'],
                  c: 3, ex: '70%! The "Up Next" video AI suggests keeps you watching. YouTube AI studies your behavior to keep you engaged.', exHi: '70%! The "Up Next" video AI suggests keeps you watching. YouTube AI studies your behavior to keep you engaged.' },
                { q: 'How many IPL viewers does Hotstar serve with AI-powered analytics?', qHi: 'How many IPL viewers does Hotstar serve with AI-powered analytics?',
                  opts: ['1 million', '10 million', '100 million', '500 million'], optsHi: ['1 million', '10 million', '100 million', '500 million'],
                  c: 3, ex: '500 million! Hotstar uses AI for real-time match analytics and commentary for half a billion cricket fans!', exHi: '500 million! Hotstar uses AI for real-time match analytics and commentary for half a billion cricket fans!' },
                { q: 'Instagram facial recognition detects your face in?', qHi: 'Instagram facial recognition detects your face in?',
                  opts: ['1 second', '0.1 seconds', '0.01 seconds', '10 seconds'], optsHi: ['1 second', '0.1 seconds', '0.01 seconds', '10 seconds'],
                  c: 2, ex: '0.01 seconds! AI processes your face almost instantly. The same technology powers Aadhaar biometric identification!', exHi: '0.01 seconds! AI processes your face almost instantly. The same technology powers Aadhaar biometric identification!' },
                { q: 'Gmail AI blocks what percentage of spam emails?', qHi: 'Gmail AI blocks what percentage of spam emails?',
                  opts: ['50%', '75%', '90%', '99.9%'], optsHi: ['50%', '75%', '90%', '99.9%'],
                  c: 3, ex: '99.9%! Without AI spam filters, your inbox would be flooded with thousands of spam emails daily!', exHi: '99.9%! Without AI spam filters, your inbox would be flooded with thousands of spam emails daily!' },
                { q: 'How many Indian languages does Google Translate support?', qHi: 'How many Indian languages does Google Translate support?',
                  opts: ['10', '44', '69', '109'], optsHi: ['10', '44', '69', '109'],
                  c: 3, ex: '109 Indian languages! AI makes it possible to translate between Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati and 100+ more!', exHi: '109 Indian languages! AI makes it possible to translate between Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati and 100+ more!' },
                { q: 'AI in weather apps analyzes what to predict rain?', qHi: 'AI in weather apps analyzes what to predict rain?',
                  opts: ['Just looking at clouds', 'Satellite data, ocean temp, atmosphere', 'Only temperature', 'Only humidity'], optsHi: ['Just looking at clouds', 'Satellite data, ocean temp, atmosphere', 'Only temperature', 'Only humidity'],
                  c: 1, ex: 'Satellite data, ocean temperatures, AND atmospheric pressure! AI combines multiple data sources for accurate weather prediction!', exHi: 'Satellite data, ocean temperatures, AND atmospheric pressure! AI combines multiple data sources for accurate weather prediction!' },
                { q: 'PUBG and Clash of Clans use AI to?', qHi: 'PUBG and Clash of Clans use AI to?',
                  opts: ['Make better graphics', 'Control enemy bots that adapt to your skill', 'Connect to internet faster', 'Show advertisements'], optsHi: ['Make better graphics', 'Control enemy bots that adapt to your skill', 'Connect to internet faster', 'Show advertisements'],
                  c: 1, ex: 'AI enemy bots! They study your playing style and adapt to give you the right challenge — too easy is boring, too hard is frustrating!', exHi: 'AI enemy bots! They study your playing style and adapt to give you the right challenge — too easy is boring, too hard is frustrating!' },
                { q: 'What is the same AI technology used in both Instagram filters and Aadhaar?', qHi: 'What is the same AI technology used in both Instagram filters and Aadhaar?',
                  opts: ['Voice recognition', 'Facial recognition', 'Fingerprint AI', 'Text recognition'], optsHi: ['Voice recognition', 'Facial recognition', 'Fingerprint AI', 'Text recognition'],
                  c: 1, ex: 'Facial recognition AI! Detects and analyzes faces. Instagram uses it for fun filters; Aadhaar uses it for identity verification!', exHi: 'Facial recognition AI! Detects and analyzes faces. Instagram uses it for fun filters; Aadhaar uses it for identity verification!' },
                { q: 'How many times do you approximately interact with AI every day?', qHi: 'How many times do you approximately interact with AI every day?',
                  opts: ['5-10 times', '20-30 times', '50 times', '100+ times'], optsHi: ['5-10 times', '20-30 times', '50 times', '100+ times'],
                  c: 3, ex: '100+ times! Every Google search, WhatsApp message, YouTube video, Maps direction, and app recommendation involves AI!', exHi: '100+ times! Every Google search, WhatsApp message, YouTube video, Maps direction, and app recommendation involves AI!' },
                { q: 'A pulse oximeter phone app uses AI and?', qHi: 'A pulse oximeter phone app uses AI and?',
                  opts: ['Microphone to hear heartbeat', 'Camera to measure heart rate and oxygen', 'Wi-Fi signals', 'Battery power'], optsHi: ['Microphone to hear heartbeat', 'Camera to measure heart rate and oxygen', 'Wi-Fi signals', 'Battery power'],
                  c: 1, ex: 'The camera! AI analyzes tiny color changes in your fingertip (caused by blood flow) to measure heart rate and oxygen levels accurately!', exHi: 'The camera! AI analyzes tiny color changes in your fingertip (caused by blood flow) to measure heart rate and oxygen levels accurately!' }
              ]
            }
          ]
        }
,
        {
          id: 'c8_3', icon: '📊', title: 'Introduction to Machine Learning', titleHi: 'मशीन लर्निंग का परिचय', xp: 30,
          slides: [
            { type: 'teach', bot: 'b', botName: 'MLBot 📊', botNameHi: 'MLBot 📊',
              tag: 'CLASS 8 · MACHINE LEARNING · CHAPTER 3', tagHi: 'कक्षा 8 · ML · अध्याय 3',
              title: 'Machine Learning — Computers That Actually Learn!', titleHi: 'मशीन लर्निंग — कंप्यूटर जो सच में सीखते हैं!',
              intro: 'Forget programming rules. ML lets computers discover rules themselves from data!',
              introHi: 'नियम प्रोग्रामिंग भूलिए। ML कंप्यूटर को खुद नियम खोजने देता है!',
              speech: `Compare two spam email detectors:<br><br>
<span class="hot">Old way — Write rules:</span><br>
"If contains 'FREE MONEY' → spam"<br>
Problem: Spammers just change words!<br><br>
<span class="hi">ML way — Learn from examples:</span><br>
Show 1,000,000 spam emails + 1,000,000 legit emails.<br>
AI discovers patterns YOU never thought of — timing, sender history, link patterns!<br><br>
<span class="em">ML can solve problems where nobody knows what the rules should be!</span>`,
              speechHi: `दो स्पैम ईमेल डिटेक्टर की तुलना:<br><br>
<span class="hot">पुराना तरीका — नियम लिखें:</span><br>
"अगर 'FREE MONEY' है → स्पैम"<br>
समस्या: स्पैमर शब्द बदल देते हैं!<br><br>
<span class="hi">ML तरीका — उदाहरणों से सीखें:</span><br>
10 लाख स्पैम + 10 लाख असली ईमेल दिखाएं।<br>
AI खुद पैटर्न ढूंढता है!`
            },
            { type: 'concepts', tag: 'CLASS 8 · MACHINE LEARNING · CHAPTER 3', tagHi: 'कक्षा 8 · ML · अध्याय 3',
              title: '3 Types of Machine Learning', titleHi: 'मशीन लर्निंग के 3 प्रकार',
              intro: 'Three completely different ways machines can learn:',
              introHi: 'मशीनें तीन तरह से सीख सकती हैं:',
              items: [
                { em: '👨‍🏫', l: 'Supervised Learning', lHi: 'पर्यवेक्षित लर्निंग', d: 'Teacher gives labeled examples. Show AI 10,000 cat photos labeled "cat" — it learns to recognize cats!', dHi: 'शिक्षक लेबल किए उदाहरण देता है। AI 10,000 बिल्ली की फ़ोटो "cat" लेबल के साथ देखकर सीखता है!' },
                { em: '🕵️', l: 'Unsupervised Learning', lHi: 'अर्ध-पर्यवेक्षित लर्निंग', d: 'No labels! AI finds hidden patterns itself. Amazon uses this to group customers without being told the categories!', dHi: 'कोई लेबल नहीं! AI खुद छिपे पैटर्न ढूंढता है। Amazon ग्राहकों को बिना बताए ग्रुप करता है!' },
                { em: '🎮', l: 'Reinforcement Learning', lHi: 'सुदृढीकरण लर्निंग', d: 'Learns by trial, error and rewards — like training a pet! AlphaGo used this to beat world Go champions.', dHi: 'प्रयास, त्रुटि और पुरस्कार से सीखता है — जैसे पालतू जानवर को प्रशिक्षित करना!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 8 · MACHINE LEARNING · CHAPTER 3', tagHi: 'कक्षा 8 · ML · अध्याय 3',
              title: 'ML Quiz!', titleHi: 'ML प्रश्नोत्तरी!',
              questions: [
                { q: 'What is the key difference between traditional programming and ML?', qHi: 'पारंपरिक प्रोग्रामिंग और ML में मुख्य अंतर क्या है?', opts: ['ML is faster', 'ML learns rules from data; traditional programming uses explicit rules', 'ML uses more computers', 'Traditional is older'], optsHi: ['ML तेज़ है', 'ML डेटा से नियम सीखता है; पारंपरिक में स्पष्ट नियम होते हैं', 'ML ज़्यादा कंप्यूटर उपयोग करता है', 'पारंपरिक पुराना है'], c: 1, ex: 'Traditional: humans write every rule. ML: give examples and AI discovers the rules itself!', exHi: 'पारंपरिक: इंसान हर नियम लिखता है। ML: उदाहरण दो और AI खुद नियम खोज लेता है!' }
              ]
            }
          ]
        }
      ]
    }]
  },

  9: {
    label: 'Class 9', labelHi: 'कक्षा 9', badge: '🚀 Explorer', badgeHi: '🚀 एक्सप्लोरर',
    badgeStyle: 'background:rgba(56,191,255,.15);color:#38BFFF;border:1px solid rgba(56,191,255,.3)',
    emoji: '🚀',
    subjects: [{
      id: 's9_ai', icon: '🧠', name: 'AI, Data & Machine Learning Explorer', nameHi: 'AI, डेटा और मशीन लर्निंग एक्सप्लोरर',
      chapters: [
        {
          id: 'c9_1', icon: '📊', title: 'Data — The Fuel of AI', titleHi: 'डेटा — AI का ईंधन', xp: 35,
          slides: [
            { type: 'teach', bot: 'b', botName: 'DataBot 📊', botNameHi: 'DataBot 📊',
              tag: 'CLASS 9 · DATA & AI · CHAPTER 1', tagHi: 'कक्षा 9 · डेटा और AI · अध्याय 1',
              title: 'Why Data is the New Oil!', titleHi: 'डेटा नया तेल क्यों है!',
              intro: 'Every AI system runs on data. Google, Netflix, Zomato — their entire intelligence comes from collecting and understanding data.',
              introHi: 'हर AI सिस्टम डेटा पर चलता है। Google, Netflix, Zomato — उनकी पूरी intelligence डेटा से आती है।',
              speech: `<span class="hi">DATA</span> = Facts, numbers, images, text that computers learn from<br><br>
📱 <span class="em">Your phone generates 2GB of data per day</span><br>
🌍 <span class="cool">2.5 quintillion bytes</span> created every day globally<br>
🤖 <span class="hi">AI learns ONLY from data</span> — no data = no intelligence<br><br>
Types of data AI uses:<br>
📝 <strong>Text</strong> — ChatGPT trained on 300 billion words<br>
🖼️ <strong>Images</strong> — Google Photos trained on billions of photos<br>
🎵 <strong>Audio</strong> — Spotify learns your music taste<br>
📍 <strong>Location</strong> — Google Maps predicts traffic<br><br>
<span class="em">The more quality data → The smarter the AI!</span>`,
              speechHi: `<span class="hi">DATA</span> = तथ्य, संख्याएं, चित्र, टेक्स्ट जिनसे कंप्यूटर सीखता है<br><br>
📱 <span class="em">आपका फोन रोज 2GB डेटा बनाता है</span><br>
🌍 <span class="cool">हर दिन 2.5 quintillion bytes</span> डेटा बनता है<br>
🤖 <span class="hi">AI सिर्फ डेटा से सीखता है</span> — डेटा नहीं = intelligence नहीं<br><br>
<span class="em">जितना quality data → उतना smart AI!</span>`
            },
            { type: 'concepts', tag: 'CLASS 9 · DATA TYPES', tagHi: 'कक्षा 9 · डेटा प्रकार',
              title: 'Types of Data AI Uses', titleHi: 'AI जो डेटा उपयोग करता है',
              intro: 'AI can learn from many types of data — each needs different techniques.',
              introHi: 'AI कई प्रकार के डेटा से सीख सकता है।',
              items: [
                { em:'📝', l:'Structured Data', lHi:'Structured Data', d:'Tables, Excel sheets, databases. Easy for AI to process. Example: student marks.', dHi:'Tables, Excel sheets, databases. AI के लिए आसान।' },
                { em:'📄', l:'Unstructured Text', lHi:'Unstructured Text', d:'WhatsApp messages, emails, articles. 80% of world\'s data is unstructured!', dHi:'WhatsApp messages, emails, articles। दुनिया का 80% डेटा unstructured है!' },
                { em:'🖼️', l:'Image Data', lHi:'Image Data', d:'Pixels and colors. Instagram has 100B+ images that AI has studied.', dHi:'Pixels और colors। Instagram पर 100B+ images हैं।' },
                { em:'🔢', l:'Time Series', lHi:'Time Series', d:'Data over time — stock prices, weather, your daily steps. AI finds patterns.', dHi:'समय के साथ डेटा — stock prices, मौसम।' },
                { em:'🗺️', l:'Location Data', lHi:'Location Data', d:'GPS coordinates. Used by Ola, Uber, Google Maps for routing and predictions.', dHi:'GPS coordinates। Ola, Uber, Google Maps इसका उपयोग करते हैं।' },
                { em:'🎵', l:'Audio Data', lHi:'Audio Data', d:'Sound waves converted to numbers. Alexa, Siri and Cortana use this to understand speech.', dHi:'Sound waves को numbers में बदला जाता है। Alexa, Siri इसका उपयोग करते हैं।' },
              ]
            },
            { type: 'reallife', tag: 'CLASS 9 · DATA IN REAL LIFE', tagHi: 'कक्षा 9 · असली जीवन में डेटा',
              title: 'How Indian Apps Use Your Data', titleHi: 'Indian Apps आपका डेटा कैसे उपयोग करते हैं',
              intro: 'Every app you use is collecting and using data to improve AI.',
              introHi: 'आप जो हर app उपयोग करते हैं वह AI सुधारने के लिए डेटा collect करता है।',
              items: [
                { ic:'🛒', nm:'Flipkart/Amazon', ds:'Tracks what you click, buy, search → recommends products. Their AI earns ₹1000 Cr+ from recommendations.', dsHi:'आपकी clicks, purchases track करता है → products recommend करता है।' },
                { ic:'🎬', nm:'Netflix India', ds:'Tracks what you pause, rewind, skip → knows what content you\'ll watch. 80% of views come from AI recommendations!', dsHi:'आप क्या रुकते हैं, skip करते हैं track करता है।' },
                { ic:'🍕', nm:'Zomato / Swiggy', ds:'Your order history + location + time = predicts what you want. Delivery time prediction is pure data science.', dsHi:'आपके orders + location + time से predict करता है।' },
                { ic:'💊', nm:'Practo', ds:'Doctor visit patterns + symptoms data → helps doctors diagnose faster. Saving lives with data!', dsHi:'Doctor visit patterns + symptoms → diagnosis में help करता है।' },
              ]
            },
            { type: 'flow', tag: 'CLASS 9 · DATA PIPELINE', tagHi: 'कक्षा 9 · डेटा Pipeline',
              title: 'How Data Becomes Intelligence', titleHi: 'डेटा Intelligence कैसे बनता है',
              intro: 'Every AI system follows this data pipeline.',
              introHi: 'हर AI सिस्टम इस data pipeline को follow करता है।',
              nodes: [
                { i:'📦', l:'Raw Data', s:'Collected from users', c:'flow-blue' }, { arrow: true },
                { i:'🧹', l:'Clean Data', s:'Remove errors/duplicates', c:'flow-yellow' }, { arrow: true },
                { i:'🔧', l:'Features', s:'Extract what matters', c:'flow-sky' }, { arrow: true },
                { i:'🤖', l:'Train AI', s:'ML model learns', c:'flow-green' }, { arrow: true },
                { i:'🎯', l:'Predictions', s:'AI gives answers', c:'flow-pink' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · DATA QUIZ', tagHi: 'कक्षा 9 · डेटा प्रश्नोत्तरी',
              title: '🧩 Data & AI — Practice Quiz', titleHi: '🧩 Data और AI — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What percentage of world data is unstructured?', qHi: 'दुनिया के कितने % डेटा unstructured है?', opts: ['20%','50%','80%','95%'], optsHi: ['20%','50%','80%','95%'], c: 2, ex: '80%! Text, images, audio, video — these have no fixed structure. Most AI breakthroughs came from learning to handle unstructured data.', exHi: '80%! Text, images, audio, video — इनकी कोई fixed structure नहीं होती।' },
                { q: 'Which Indian app uses AI most heavily for delivery time predictions?', qHi: 'कौन सी Indian app delivery time predictions के लिए AI का सबसे ज़्यादा उपयोग करती है?', opts: ['WhatsApp','Zomato/Swiggy','Instagram','Google Pay'], optsHi: ['WhatsApp','Zomato/Swiggy','Instagram','Google Pay'], c: 1, ex: 'Zomato/Swiggy! Their AI analyzes traffic, restaurant prep time, rider location, weather, and order size to predict delivery time accurately.', exHi: 'Zomato/Swiggy! उनकी AI traffic, restaurant prep time, weather सब analyze करती है।' },
                { q: 'What is a "feature" in Machine Learning?', qHi: 'Machine Learning में "feature" क्या होता है?', opts: ['A bug in the code','Important input variable AI learns from','The output of AI','The cost of AI'], optsHi: ['कोड में bug','Important input variable','AI का output','AI की cost'], c: 1, ex: 'A feature is an important input variable! For predicting house prices: size, location, rooms = features. The better your features, the smarter your AI.', exHi: 'Feature एक important input variable है! House price predict करने में: size, location, rooms = features।' },
                { q: 'What step comes BEFORE training an AI model?', qHi: 'AI model train करने से पहले क्या होता है?', opts: ['Making predictions','Cleaning & preparing data','Deploying the model','Collecting revenue'], optsHi: ['Predictions बनाना','Data clean करना','Model deploy करना','Revenue collect करना'], c: 1, ex: 'Cleaning data comes first! Real-world data is messy — missing values, wrong entries, duplicates. "Garbage in = Garbage out" is the golden rule of AI.', exHi: 'Data clean करना पहले होता है! Real-world data messy होता है।' },
                { q: 'How many bytes of data are created globally every day?', qHi: 'हर दिन globally कितने bytes डेटा बनता है?', opts: ['1 million bytes','1 billion bytes','1 trillion bytes','2.5 quintillion bytes'], optsHi: ['1 million bytes','1 billion bytes','1 trillion bytes','2.5 quintillion bytes'], c: 3, ex: '2.5 quintillion bytes! That is 2,500,000,000,000,000,000 bytes. Most of this data powers the AI systems we use daily.', exHi: '2.5 quintillion bytes! यह 2.5 के बाद 18 zeros है।' },
              ]
            }
          ]
        },
        {
          id: 'c9_2', icon: '🎯', title: 'How AI Learns — Supervised vs Unsupervised', titleHi: 'AI कैसे सीखता है — Supervised vs Unsupervised', xp: 35,
          slides: [
            { type: 'teach', bot: 'c', botName: 'LearnBot 🎯', botNameHi: 'LearnBot 🎯',
              tag: 'CLASS 9 · ML LEARNING TYPES · CHAPTER 2', tagHi: 'कक्षा 9 · ML Learning Types · अध्याय 2',
              title: 'Three Ways AI Learns!', titleHi: 'AI सीखने के तीन तरीके!',
              intro: 'Just like humans can learn from a teacher, by exploring, or from feedback — AI has three learning methods.',
              introHi: 'जैसे इंसान शिक्षक से, खोज से, या feedback से सीख सकता है — AI के भी तीन learning तरीके हैं।',
              speech: `<span class="hi">3 Types of Machine Learning:</span><br><br>
🎓 <strong>Supervised Learning</strong> — AI learns from <span class="em">labeled examples</span><br>
Like a teacher showing you correct answers<br>
→ Email spam detection, Image recognition, Price prediction<br><br>
🔍 <strong>Unsupervised Learning</strong> — AI <span class="cool">finds patterns</span> on its own<br>
Like sorting toys without being told how<br>
→ Customer grouping, Anomaly detection, Topic discovery<br><br>
🎮 <strong>Reinforcement Learning</strong> — AI learns by <span class="hi">trial and error</span><br>
Like a game where winning = reward, losing = punishment<br>
→ AlphaGo beating chess grandmasters, Self-driving cars<br><br>
<span class="em">90% of AI products use Supervised Learning!</span>`,
              speechHi: `<span class="hi">Machine Learning के 3 प्रकार:</span><br><br>
🎓 <strong>Supervised Learning</strong> — AI <span class="em">labeled examples</span> से सीखता है<br>
जैसे teacher सही जवाब बताता है<br><br>
🔍 <strong>Unsupervised Learning</strong> — AI खुद <span class="cool">patterns ढूंढता है</span><br>
जैसे बिना बताए खिलौने sort करना<br><br>
🎮 <strong>Reinforcement Learning</strong> — AI <span class="hi">trial and error</span> से सीखता है<br>
जैसे game जीतने पर reward<br><br>
<span class="em">90% AI products Supervised Learning उपयोग करते हैं!</span>`
            },
            { type: 'concepts', tag: 'CLASS 9 · LEARNING TYPES', tagHi: 'कक्षा 9 · Learning Types',
              title: 'Real-World Examples of Each Type', titleHi: 'हर type के real-world examples',
              intro: 'Recognize these learning types in apps you use daily.',
              introHi: 'इन learning types को अपने daily apps में पहचानें।',
              items: [
                { em:'📧', l:'Supervised: Gmail Spam', lHi:'Supervised: Gmail Spam', d:'Trained on millions of labeled spam/not-spam emails. Now blocks 99.9% of spam automatically!', dHi:'लाखों spam/not-spam emails से train किया। अब 99.9% spam block करता है!' },
                { em:'🛍️', l:'Unsupervised: Amazon', lHi:'Unsupervised: Amazon', d:'Groups customers by behavior without labels. "Customers also bought" = unsupervised clustering!', dHi:'Customers को बिना labels के group करता है।' },
                { em:'♟️', l:'Reinforcement: AlphaGo', lHi:'Reinforcement: AlphaGo', d:'Played 30 million games against itself. Now beats world champions. No human taught it any moves!', dHi:'खुद से 3 करोड़ games खेला। अब world champions को हराता है!' },
                { em:'🎵', l:'Supervised: Shazam', lHi:'Supervised: Shazam', d:'Trained on labeled audio clips. Now identifies any song in 3 seconds from just a few notes!', dHi:'Labeled audio clips से train किया। अब 3 seconds में कोई भी song पहचानता है!' },
                { em:'💳', l:'Supervised: Fraud Detection', lHi:'Supervised: Fraud Detection', d:'Trained on past fraud transactions. Paytm/PhonePe blocks fraudulent payments in milliseconds.', dHi:'Past fraud transactions से train किया। Paytm milliseconds में fraud block करता है!' },
                { em:'👥', l:'Unsupervised: YouTube', lHi:'Unsupervised: YouTube', d:'Clusters viewers by watching patterns. Creates personalized homepage without you telling it preferences!', dHi:'Viewers को watching patterns से cluster करता है। Personalized homepage बनाता है!' },
              ]
            },
            { type: 'flow', tag: 'CLASS 9 · SUPERVISED LEARNING FLOW',
              title: 'How Supervised Learning Works Step by Step', titleHi: 'Supervised Learning कैसे काम करती है',
              intro: 'This is the most common AI workflow in the industry.',
              introHi: 'यह industry में सबसे common AI workflow है।',
              nodes: [
                { i:'📋', l:'Training Data', s:'Labeled examples', c:'flow-blue' }, { arrow: true },
                { i:'🧮', l:'ML Algorithm', s:'Finds patterns', c:'flow-yellow' }, { arrow: true },
                { i:'🧠', l:'Trained Model', s:'Stores knowledge', c:'flow-green' }, { arrow: true },
                { i:'❓', l:'New Input', s:'Unknown data', c:'flow-sky' }, { arrow: true },
                { i:'✅', l:'Prediction', s:'AI\'s answer', c:'flow-pink' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · LEARNING TYPES QUIZ',
              title: '🧩 ML Learning Types — Practice Quiz', titleHi: '🧩 ML Learning Types — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'Gmail spam filter uses which type of Machine Learning?', qHi: 'Gmail spam filter किस ML type का उपयोग करता है?', opts: ['Reinforcement Learning','Unsupervised Learning','Supervised Learning','Deep Learning'], optsHi: ['Reinforcement Learning','Unsupervised Learning','Supervised Learning','Deep Learning'], c: 2, ex: 'Supervised Learning! Gmail was trained on millions of labeled emails (spam / not spam). The model now classifies any new email based on those patterns.', exHi: 'Supervised Learning! Gmail को labeled emails से train किया गया।' },
                { q: 'AlphaGo (chess AI) uses which learning type?', qHi: 'AlphaGo (chess AI) कौन सा learning type use करता है?', opts: ['Supervised','Unsupervised','Reinforcement','Transfer Learning'], optsHi: ['Supervised','Unsupervised','Reinforcement','Transfer Learning'], c: 2, ex: 'Reinforcement Learning! AlphaGo played 30 million games against itself, learning from wins (reward) and losses (punishment). No human taught it strategies.', exHi: 'Reinforcement Learning! AlphaGo ने खुद से 3 crore games खेले।' },
                { q: 'When you don\'t have labeled data, which ML type should you use?', qHi: 'जब labeled data नहीं हो, कौन सा ML type use करें?', opts: ['Supervised Learning','Reinforcement Learning','Unsupervised Learning','No ML possible'], optsHi: ['Supervised Learning','Reinforcement Learning','Unsupervised Learning','कोई ML नहीं'], c: 2, ex: 'Unsupervised Learning! It finds hidden patterns and groups in data without needing labels. Perfect when you have lots of data but no one has labeled it.', exHi: 'Unsupervised Learning! यह labels के बिना hidden patterns ढूंढता है।' },
                { q: 'What percentage of AI products use Supervised Learning?', qHi: 'कितने % AI products Supervised Learning use करते हैं?', opts: ['30%','50%','70%','90%'], optsHi: ['30%','50%','70%','90%'], c: 3, ex: '90%! Most real-world AI applications — image recognition, NLP, fraud detection, recommendation systems — all use supervised learning with labeled datasets.', exHi: '90%! ज़्यादातर real-world AI applications supervised learning use करते हैं।' },
                { q: 'Zomato grouping similar customers together uses which ML?', qHi: 'Zomato similar customers को group करना कौन सा ML है?', opts: ['Supervised','Reinforcement','Unsupervised Clustering','Regression'], optsHi: ['Supervised','Reinforcement','Unsupervised Clustering','Regression'], c: 2, ex: 'Unsupervised Clustering! Zomato groups customers by ordering behavior — breakfast lovers, late-night orderers, healthy eaters — without pre-labeling them.', exHi: 'Unsupervised Clustering! Zomato customers को ordering behavior से group करता है।' },
              ]
            }
          ]
        },
        {
          id: 'c9_3', icon: '🌳', title: 'Decision Trees — AI That Asks Questions', titleHi: 'Decision Trees — AI जो सवाल पूछता है', xp: 35,
          slides: [
            { type: 'teach', bot: 'a', botName: 'TreeBot 🌳', botNameHi: 'TreeBot 🌳',
              tag: 'CLASS 9 · DECISION TREES · CHAPTER 3', tagHi: 'कक्षा 9 · Decision Trees · अध्याय 3',
              title: 'Decision Trees — AI Thinks Like You!', titleHi: 'Decision Trees — AI आपकी तरह सोचता है!',
              intro: 'A Decision Tree mimics how humans make decisions — asking a series of yes/no questions to reach a conclusion.',
              introHi: 'Decision Tree इंसान की तरह decisions लेता है — एक series of yes/no questions पूछता है।',
              speech: `Imagine a <span class="hi">doctor diagnosing fever:</span><br><br>
❓ Temperature > 38°C?<br>
&nbsp;&nbsp;✅ YES → ❓ Cough present?<br>
&nbsp;&nbsp;&nbsp;&nbsp;✅ YES → Could be flu<br>
&nbsp;&nbsp;&nbsp;&nbsp;❌ NO → Could be infection<br>
&nbsp;&nbsp;❌ NO → Probably fine<br><br>
<span class="em">That's exactly how a Decision Tree AI works!</span><br><br>
Real uses of Decision Trees:<br>
🏦 <span class="cool">Loan approval</span> — Bank approves/rejects loans<br>
🏥 <span class="hi">Medical diagnosis</span> — Helps doctors identify diseases<br>
🛡️ <span class="em">Fraud detection</span> — Banks catch suspicious transactions<br>
📧 <span class="hi">Email filtering</span> — Spam vs Not spam<br><br>
Decision Trees are <span class="cool">explainable AI</span> — you can see EXACTLY why it made each decision!`,
              speechHi: `एक <span class="hi">doctor fever diagnose कर रहा है:</span><br><br>
❓ Temperature > 38°C?<br>
&nbsp;&nbsp;✅ हाँ → ❓ Cough है?<br>
&nbsp;&nbsp;&nbsp;&nbsp;✅ हाँ → Flu हो सकता है<br>
&nbsp;&nbsp;&nbsp;&nbsp;❌ नहीं → Infection हो सकता है<br>
&nbsp;&nbsp;❌ नहीं → शायद ठीक है<br><br>
<span class="em">यही Decision Tree AI करता है!</span>`
            },
            { type: 'deep', tag: 'CLASS 9 · HOW TREES LEARN', tagHi: 'कक्षा 9 · Trees कैसे सीखते हैं',
              title: 'How Decision Trees are Built', titleHi: 'Decision Trees कैसे बनते हैं',
              intro: 'The tree learns by finding the best question to split data at each step.',
              introHi: 'Tree सीखता है data split करने के लिए best question ढूंढकर।',
              content: [
                { h: 'Step 1: Find the Best Split', hHi: 'Step 1: Best Split ढूंढें', p: 'The algorithm tries every possible question and picks the one that separates the data most cleanly. "Is income > ₹50,000?" might perfectly separate loan approvals.', pHi: 'Algorithm हर possible question try करता है और वो choose करता है जो data को सबसे अच्छे से separate करे।' },
                { h: 'Step 2: Gini Impurity — Measuring Messiness', hHi: 'Step 2: Gini Impurity — गड़बड़ी मापना', p: 'AI uses math to measure how "mixed" each group is after splitting. A perfect split puts all apples on one side and all oranges on the other (Gini = 0).', pHi: 'AI math से मापता है कि split के बाद हर group कितना "mixed" है। Perfect split में Gini = 0 होता है।' },
                { h: 'Step 3: Repeat Until Done', hHi: 'Step 3: जब तक हो तब तक repeat करें', p: 'This splitting continues until each leaf node has mostly one class, or we reach maximum depth. A real-world fraud detection tree can have 50+ levels!', pHi: 'यह splitting तब तक चलती है जब तक हर leaf node mostly एक class हो। Real fraud detection tree में 50+ levels हो सकते हैं!' },
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · DECISION TREES QUIZ',
              title: '🧩 Decision Trees — Practice Quiz', titleHi: '🧩 Decision Trees — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What type of questions does a Decision Tree ask at each node?', qHi: 'Decision Tree हर node पर किस type के questions पूछता है?', opts: ['Multiple choice','Open ended','Yes/No (binary)','Math equations'], optsHi: ['Multiple choice','Open ended','Yes/No (binary)','Math equations'], c: 2, ex: 'Yes/No binary questions! Each node in a Decision Tree splits data based on a condition: "Age > 18?", "Income > 50000?", "Has car loan?" — always true or false.', exHi: 'Yes/No binary questions! हर node condition पर data split करता है।' },
                { q: 'Why are Decision Trees called "Explainable AI"?', qHi: 'Decision Trees को "Explainable AI" क्यों कहते हैं?', opts: ['They explain jokes','You can see exactly why each decision was made','They are simple','They use no math'], optsHi: ['वे jokes explain करते हैं','आप हर decision का reason देख सकते हैं','वे simple हैं','वे math नहीं use करते'], c: 1, ex: 'You can trace the exact path! Banks must explain loan rejections to customers — Decision Trees make this possible because you can follow each yes/no split.', exHi: 'आप exact path trace कर सकते हैं! Banks को loan rejection explain करना होता है।' },
                { q: 'What does Gini Impurity measure in a Decision Tree?', qHi: 'Gini Impurity क्या measure करता है?', opts: ['Speed of the algorithm','How mixed/impure a data split is','Number of nodes','Tree height'], optsHi: ['Algorithm की speed','Data split कितनी mixed है','Nodes की संख्या','Tree की height'], c: 1, ex: 'Gini Impurity measures how mixed a group is after splitting. Gini=0 means perfect split (all same class). Gini=0.5 means maximum mixing (50-50 split). Lower is better!', exHi: 'Gini Impurity measure करता है कि group कितना mixed है। Gini=0 = perfect split।' },
                { q: 'Which of these is NOT a real use case of Decision Trees?', qHi: 'इनमें से Decision Trees का real use case कौन सा नहीं है?', opts: ['Bank loan approval','Medical diagnosis','Creating music','Email spam filtering'], optsHi: ['Bank loan approval','Medical diagnosis','Music बनाना','Email spam filtering'], c: 2, ex: 'Creating music! Decision Trees are used for classification and prediction tasks. Music generation uses different AI — like Recurrent Neural Networks or Transformers.', exHi: 'Music बनाना! Decision Trees classification और prediction के लिए उपयोग होते हैं।' },
                { q: 'What is a "leaf node" in a Decision Tree?', qHi: 'Decision Tree में "leaf node" क्या होता है?', opts: ['The first question node','A middle splitting node','The final answer/prediction node','A broken branch'], optsHi: ['पहला question node','बीच का splitting node','Final answer node','टूटी हुई branch'], c: 2, ex: 'A leaf node is the final node — it gives the prediction! After all the yes/no questions, you reach a leaf that says "Approved", "Spam", "Fraud", or "Healthy".', exHi: 'Leaf node final node है — यह prediction देता है! सारे yes/no questions के बाद।' },
              ]
            }
          ]
        },
        {
          id: 'c9_4', icon: '🧮', title: 'How AI Makes Predictions — Regression & Classification', titleHi: 'AI Predictions कैसे करता है — Regression और Classification', xp: 40,
          slides: [
            { type: 'teach', bot: 'b', botName: 'PredictBot 🧮', botNameHi: 'PredictBot 🧮',
              tag: 'CLASS 9 · PREDICTION TYPES · CHAPTER 4', tagHi: 'कक्षा 9 · Prediction Types · अध्याय 4',
              title: 'Two Fundamental Prediction Tasks!', titleHi: 'दो मौलिक Prediction Tasks!',
              intro: 'Almost every AI prediction falls into one of two categories — predicting a number or predicting a category.',
              introHi: 'लगभग हर AI prediction दो categories में आती है — एक number predict करना या एक category predict करना।',
              speech: `<span class="hi">REGRESSION</span> — Predict a <span class="em">number</span><br><br>
📊 House price prediction → ₹45,00,000<br>
🌡️ Tomorrow's temperature → 34°C<br>
📈 Next month's sales → 12,000 units<br>
🎯 Student score → 87/100<br><br>
<span class="cool">CLASSIFICATION</span> — Predict a <span class="em">category</span><br><br>
📧 This email → Spam or Not Spam<br>
🏥 This X-ray → Tumor or No Tumor<br>
💳 This transaction → Fraud or Genuine<br>
🐱 This image → Cat, Dog, or Bird<br><br>
<span class="hi">KEY DIFFERENCE:</span><br>
Regression → <span class="em">How much?</span><br>
Classification → <span class="cool">Which category?</span>`,
              speechHi: `<span class="hi">REGRESSION</span> — एक <span class="em">number</span> predict करें<br><br>
📊 House price → ₹45,00,000<br>
🌡️ कल का temperature → 34°C<br><br>
<span class="cool">CLASSIFICATION</span> — एक <span class="em">category</span> predict करें<br><br>
📧 यह email → Spam या Not Spam<br>
💳 यह transaction → Fraud या Genuine<br><br>
<span class="hi">फर्क:</span><br>
Regression → <span class="em">कितना?</span><br>
Classification → <span class="cool">कौन सी category?</span>`
            },
            { type: 'concepts', tag: 'CLASS 9 · ML ALGORITHMS', tagHi: 'कक्षा 9 · ML Algorithms',
              title: 'Key ML Algorithms You Should Know', titleHi: 'जो ML Algorithms आपको पता होने चाहिए',
              intro: 'These are the building blocks of AI products used by millions.',
              introHi: 'ये वो building blocks हैं जो करोड़ों लोगों के AI products में use होते हैं।',
              items: [
                { em:'📏', l:'Linear Regression', lHi:'Linear Regression', d:'Fits a straight line through data points. Simplest regression — predicts house prices, temperatures, sales.', dHi:'Data points से straight line fit करता है। House prices, temperatures predict करता है।' },
                { em:'🎯', l:'Logistic Regression', lHi:'Logistic Regression', d:'Despite the name, it\'s for classification! Predicts probability of spam, disease, fraud (0-100%).', dHi:'Name के बावजूद, यह classification के लिए है! Spam, disease, fraud की probability predict करता है।' },
                { em:'🌳', l:'Decision Trees', lHi:'Decision Trees', d:'Yes/No questions tree. Explainable, works with any data type. Used in banking and medicine.', dHi:'Yes/No questions का tree। Explainable है, कोई भी data type के साथ काम करता है।' },
                { em:'🌲', l:'Random Forest', lHi:'Random Forest', d:'100+ Decision Trees voting together. More accurate than single tree. Netflix uses it!', dHi:'100+ Decision Trees मिलकर vote करते हैं। Single tree से ज़्यादा accurate।' },
                { em:'📍', l:'K-Nearest Neighbors', lHi:'K-Nearest Neighbors', d:'"You are like your neighbors!" Classifies by looking at the K closest similar examples.', dHi:'"आप अपने neighbors जैसे हो!" K closest similar examples देखकर classify करता है।' },
                { em:'🤖', l:'Neural Networks', lHi:'Neural Networks', d:'Inspired by human brain — learns complex patterns. Powers ChatGPT, image recognition, voice AI.', dHi:'Human brain से inspired — complex patterns सीखता है। ChatGPT, image recognition, voice AI।' },
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · PREDICTIONS QUIZ',
              title: '🧩 Regression & Classification — Practice Quiz', titleHi: '🧩 Regression और Classification — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'Predicting tomorrow\'s temperature uses which ML type?', qHi: 'कल का temperature predict करना कौन सा ML type use करता है?', opts: ['Classification','Clustering','Regression','Reinforcement'], optsHi: ['Classification','Clustering','Regression','Reinforcement'], c: 2, ex: 'Regression! Temperature is a continuous number (like 34.5°C). Any time you\'re predicting a number on a scale, it\'s regression.', exHi: 'Regression! Temperature एक continuous number है। जब भी आप एक number predict करते हैं, वह regression है।' },
                { q: 'Google Photos identifying a person in an image uses which ML type?', qHi: 'Google Photos में person पहचानना कौन सा ML type है?', opts: ['Regression','Classification','Linear Regression','Reinforcement'], optsHi: ['Regression','Classification','Linear Regression','Reinforcement'], c: 1, ex: 'Classification! The AI must classify the face into one of several categories — Person A, Person B, Person C, or Unknown. Output is a category, not a number.', exHi: 'Classification! AI को face को categories में classify करना है — Person A, B, C, या Unknown।' },
                { q: 'Random Forest is better than Decision Tree because it uses:', qHi: 'Random Forest Decision Tree से बेहतर क्यों है?', opts: ['Faster computers','100+ trees voting together','More memory','Better colors'], optsHi: ['तेज़ computers','100+ trees मिलकर vote करते हैं','ज़्यादा memory','बेहतर colors'], c: 1, ex: 'Ensemble power! Random Forest builds 100-500 Decision Trees, each trained on slightly different data. All trees vote on the final prediction — reducing errors dramatically!', exHi: 'Ensemble power! Random Forest 100-500 Decision Trees बनाता है। सभी trees मिलकर vote करते हैं।' },
                { q: 'What does K-Nearest Neighbors (KNN) algorithm do?', qHi: 'K-Nearest Neighbors (KNN) algorithm क्या करता है?', opts: ['Builds a tree of decisions','Classifies based on K closest similar examples','Predicts stock prices only','Trains neural networks'], optsHi: ['Decisions का tree बनाता है','K closest examples से classify करता है','Stocks predict करता है','Neural networks train करता है'], c: 1, ex: 'KNN classifies by majority vote of K closest neighbors! If 7 of your 10 nearest similar customers bought Product X, KNN predicts you\'ll buy it too.', exHi: 'KNN K closest neighbors के majority vote से classify करता है!' },
                { q: 'Predicting whether a student will PASS or FAIL uses which ML?', qHi: 'Student PASS या FAIL होगा predict करना कौन सा ML है?', opts: ['Regression','Clustering','Classification','Time Series'], optsHi: ['Regression','Clustering','Classification','Time Series'], c: 2, ex: 'Classification! Pass/Fail are two categories. The AI takes inputs (attendance, past scores, study hours) and classifies each student into PASS or FAIL category.', exHi: 'Classification! Pass/Fail दो categories हैं। AI inputs लेकर student को PASS या FAIL categorize करता है।' },
              ]
            }
          ]
        },
        {
          id: 'c9_5', icon: '🔍', title: 'Computer Vision — Teaching AI to See', titleHi: 'Computer Vision — AI को देखना सिखाना', xp: 40,
          slides: [
            { type: 'teach', bot: 'd', botName: 'VisionBot 🔍', botNameHi: 'VisionBot 🔍',
              tag: 'CLASS 9 · COMPUTER VISION · CHAPTER 5', tagHi: 'कक्षा 9 · Computer Vision · अध्याय 5',
              title: 'How AI Sees the World!', titleHi: 'AI दुनिया को कैसे देखता है!',
              intro: 'Computer Vision is one of AI\'s most powerful abilities — teaching machines to understand images and video like humans do.',
              introHi: 'Computer Vision AI की सबसे powerful abilities में से एक है — machines को images और video समझना सिखाना।',
              speech: `<span class="hi">How does AI see an image?</span><br><br>
To a computer, every image is just a <span class="em">grid of numbers!</span><br>
A 100×100 image = 10,000 pixels<br>
Each pixel = 3 numbers (Red, Green, Blue — 0-255)<br>
So 100×100 color image = <span class="cool">30,000 numbers!</span><br><br>
AI learns: <span class="hi">Which number patterns = which objects?</span><br><br>
After seeing millions of cat photos, AI learns:<br>
→ Pointy ears + whiskers + fur = <span class="em">CAT!</span><br><br>
Real applications:<br>
📸 <span class="hi">Face Unlock</span> — Your phone scans 30,000 face points<br>
🚗 <span class="cool">Self-driving Cars</span> — Tesla processes 2,300 images/second<br>
🏥 <span class="em">Medical Scans</span> — AI detects cancer 94% accuracy<br>
📦 <span class="hi">Amazon Warehouse</span> — Robots find packages using vision`,
              speechHi: `<span class="hi">AI image कैसे देखता है?</span><br><br>
Computer के लिए, हर image सिर्फ <span class="em">numbers का grid है!</span><br>
100×100 image = 10,000 pixels<br>
हर pixel = 3 numbers (Red, Green, Blue)<br>
100×100 color image = <span class="cool">30,000 numbers!</span><br><br>
AI सीखता है: <span class="hi">कौन से number patterns = कौन सी objects?</span>`
            },
            { type: 'reallife', tag: 'CLASS 9 · VISION APPLICATIONS',
              title: 'Computer Vision Around You!', titleHi: 'Computer Vision आपके आस-पास!',
              intro: 'You interact with Computer Vision dozens of times every day.',
              introHi: 'आप हर दिन दर्जनों बार Computer Vision से interact करते हैं।',
              items: [
                { ic:'🔓', nm:'Face Unlock', ds:'Maps 30,000+ points on your face. Works even if you wear glasses or have a beard. 1-in-1M false acceptance rate!', dsHi:'आपके चेहरे पर 30,000+ points map करता है। Glasses पहनने पर भी काम करता है!' },
                { ic:'🚗', nm:'Tesla Autopilot', ds:'8 cameras, 12 ultrasonic sensors. Processes 2300 images per second. Driven 5 billion miles autonomously!', dsHi:'8 cameras, 12 sensors। हर second 2300 images process करता है।' },
                { ic:'🏥', nm:'Medical AI (Arogya AI)', ds:'Indian startup detecting diabetic retinopathy from eye scans with 94% accuracy — better than some doctors!', dsHi:'Indian startup आँखों की scan से diabetes detect करता है 94% accuracy के साथ।' },
                { ic:'📲', nm:'Instagram Filters', ds:'Real-time facial landmark detection — 68 points on your face at 30 frames/second. Applies effects instantly!', dsHi:'Real-time facial detection — आपके चेहरे पर 68 points 30 frames/second पर।' },
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · COMPUTER VISION QUIZ',
              title: '🧩 Computer Vision — Practice Quiz', titleHi: '🧩 Computer Vision — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'How does a computer represent a color image?', qHi: 'Computer color image को कैसे represent करता है?', opts: ['As a painting','As a grid of numbers (pixels)','As sound waves','As text'], optsHi: ['Painting की तरह','Numbers के grid की तरह (pixels)','Sound waves की तरह','Text की तरह'], c: 1, ex: 'Numbers grid! Each pixel = 3 values for Red, Green, Blue (0-255). A 100×100 image = 30,000 numbers. AI learns which number patterns correspond to which objects!', exHi: 'Numbers grid! हर pixel = 3 values Red, Green, Blue के लिए। AI सीखता है कि कौन से patterns किस object से match करते हैं।' },
                { q: 'Tesla Autopilot processes approximately how many images per second?', qHi: 'Tesla Autopilot लगभग कितनी images per second process करता है?', opts: ['10','100','2300','1 million'], optsHi: ['10','100','2300','10 लाख'], c: 2, ex: '2300 images per second! This massive processing power allows Tesla to detect pedestrians, road signs, traffic lights, and obstacles faster than any human driver.', exHi: '2300 images प्रति second! यह massive processing power Tesla को pedestrians, road signs तुरंत detect करने देती है।' },
                { q: 'Face unlock on phones maps approximately how many points on your face?', qHi: 'Phone का face unlock आपके चेहरे पर कितने points map करता है?', opts: ['100','1,000','10,000','30,000+'], optsHi: ['100','1,000','10,000','30,000+'], c: 3, ex: '30,000+ points! Apple Face ID projects 30,000 infrared dots on your face to create a precise 3D mathematical map. This is why it works even in the dark!', exHi: '30,000+ points! Apple Face ID 30,000 infrared dots project करता है।' },
                { q: 'What is the probability of someone else unlocking your phone with Face ID?', qHi: 'किसी और के face से आपका phone unlock होने की probability क्या है?', opts: ['1 in 100','1 in 10,000','1 in 1,000,000','1 in 1,000'], optsHi: ['1 in 100','1 in 10,000','1 in 1,000,000','1 in 1,000'], c: 2, ex: '1 in 1,000,000! Apple claims the probability of a false match with Face ID is approximately 1 in a million — 20x more secure than fingerprint (1 in 50,000)!', exHi: '1 in 1,000,000! Apple का कहना है Face ID से false match की probability 1 in a million है।' },
                { q: 'Instagram filters use Computer Vision to track how many facial points?', qHi: 'Instagram filters कितने facial points track करते हैं?', opts: ['10','68','500','10,000'], optsHi: ['10','68','500','10,000'], c: 1, ex: '68 facial landmark points! Eyes, eyebrows, nose, mouth edges — all tracked at 30 frames per second. This is why filters stay perfectly aligned even when you move your head!', exHi: '68 facial landmark points! Eyes, eyebrows, nose, mouth — सब 30 fps पर track होते हैं।' },
              ]
            }
          ]
        },
        {
          id: 'c9_6', icon: '🗣️', title: 'Natural Language Processing — Teaching AI to Read & Talk', titleHi: 'NLP — AI को पढ़ना और बोलना सिखाना', xp: 40,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot', botNameHi: 'AIBot',
              tag: 'CLASS 9 · NLP · CHAPTER 6', tagHi: 'CLASS 9 · NLP · CHAPTER 6',
              title: 'How AI Understands Human Language!', titleHi: 'AI Human Language कैसे समझता है!',
              intro: 'Every time you talk to Siri, Google Assistant or ChatGPT — NLP is working behind the scenes.', introHi: 'Every time you talk to Siri, Google Assistant or ChatGPT — NLP is working behind the scenes.',
              speech: '<span class="hi">NLP</span> = <span class="em">Natural Language Processing</span><br>Teaching computers to UNDERSTAND human language!<br><br>🗣️ Google Translate — 109 Indian languages<br>🤖 ChatGPT — answers any question in natural English/Hindi<br>📱 Alexa Hindi — understands regional accents<br>📞 HDFC Eva — handles millions of bank queries in Hindi<br><br><span class="em">NLP Revolution: 2017 Transformer architecture changed everything!</span>',
              speechHi: '<span class="hi">NLP</span> = <span class="em">Natural Language Processing</span><br>Teaching computers to UNDERSTAND human language!<br><br>🗣️ Google Translate — 109 Indian languages<br>🤖 ChatGPT — answers any question in natural English/Hindi<br>📱 Alexa Hindi — understands regional accents<br>📞 HDFC Eva — handles millions of bank queries in Hindi<br><br><span class="em">NLP Revolution: 2017 Transformer architecture changed everything!</span>'
            },
            { type: 'concepts', tag: 'CONCEPTS', tagHi: 'CONCEPTS',
              title: 'Key Concepts', titleHi: 'मुख्य Concepts',
              intro: 'Core ideas for this chapter.', introHi: 'इस chapter के core ideas.',
              items: [
                { em:'😊', l:'Sentiment Analysis', lHi:'Sentiment Analysis', d:'Detects positive/negative/neutral in text. Amazon, Flipkart, Zomato use this to auto-analyze millions of reviews.', dHi:'Detects positive/negative/neutral in text. Amazon, Flipkart, Zomato use this to auto-analyze millions of reviews.' },
                { em:'🌐', l:'Translation', lHi:'Translation', d:'Convert between languages. Google Translate handles 109 Indian languages including Hindi, Tamil, Marathi.', dHi:'Convert between languages. Google Translate handles 109 Indian languages including Hindi, Tamil, Marathi.' },
                { em:'❓', l:'Question Answering', lHi:'Question Answering', d:'Ask any question, AI finds the answer. ChatGPT processes millions of questions per second.', dHi:'Ask any question, AI finds the answer. ChatGPT processes millions of questions per second.' },
                { em:'📝', l:'Summarization', lHi:'Summarization', d:'Condense long articles to key points. Inshorts auto-summarizes news to exactly 60 words using NLP!', dHi:'Condense long articles to key points. Inshorts auto-summarizes news to exactly 60 words using NLP!' },
                { em:'🤖', l:'Chatbots', lHi:'Chatbots', d:'HDFC Eva, SBI YONO — Indian banks use NLP chatbots handling millions of queries daily.', dHi:'HDFC Eva, SBI YONO — Indian banks use NLP chatbots handling millions of queries daily.' },
                { em:'🏷️', l:'Named Entity Recognition', lHi:'Named Entity Recognition', d:'Identifies people, places, organizations in text. Used in search engines and legal documents.', dHi:'Identifies people, places, organizations in text. Used in search engines and legal documents.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · NLP QUIZ', tagHi: 'CLASS 9 · NLP QUIZ',
              title: '🧩 NLP — 10 Question Practice Quiz', titleHi: '🧩 NLP — 10 सवाल Practice Quiz',
              questions: [
                { q: 'What does NLP stand for?', qHi: 'What does NLP stand for?',
                  opts: ['Neural Learning Process', 'Natural Language Processing', 'New Logic Programming', 'Network Link Protocol'], optsHi: ['Neural Learning Process', 'Natural Language Processing', 'New Logic Programming', 'Network Link Protocol'],
                  c: 1, ex: 'NLP = Natural Language Processing — AI field that helps computers understand human language.', exHi: 'NLP = Natural Language Processing — AI field that helps computers understand human language.' },
                { q: 'What is Sentiment Analysis?', qHi: 'What is Sentiment Analysis?',
                  opts: ['Counting sentences', 'Detecting positive/negative in text', 'Translating languages', 'Grammar errors'], optsHi: ['Counting sentences', 'Detecting positive/negative in text', 'Translating languages', 'Grammar errors'],
                  c: 1, ex: 'Sentiment Analysis detects emotions in text — positive, negative, or neutral. Used by Amazon, Flipkart.', exHi: 'Sentiment Analysis detects emotions in text — positive, negative, or neutral. Used by Amazon, Flipkart.' },
                { q: 'Which AI architecture revolutionized NLP in 2017?', qHi: 'Which AI architecture revolutionized NLP in 2017?',
                  opts: ['CNN', 'RNN', 'Transformer', 'Decision Tree'], optsHi: ['CNN', 'RNN', 'Transformer', 'Decision Tree'],
                  c: 2, ex: 'Transformer architecture — ChatGPT, BERT, LLaMA are all Transformers!', exHi: 'Transformer architecture — ChatGPT, BERT, LLaMA are all Transformers!' },
                { q: 'GPT in ChatGPT stands for?', qHi: 'GPT in ChatGPT stands for?',
                  opts: ['General Purpose Technology', 'Generative Pre-trained Transformer', 'Graphical Tool', 'Global Technique'], optsHi: ['General Purpose Technology', 'Generative Pre-trained Transformer', 'Graphical Tool', 'Global Technique'],
                  c: 1, ex: 'GPT = Generative Pre-trained Transformer!', exHi: 'GPT = Generative Pre-trained Transformer!' },
                { q: 'Which app summarizes news in 60 words using NLP?', qHi: 'Which app summarizes news in 60 words using NLP?',
                  opts: ['WhatsApp', 'Instagram', 'Inshorts', 'YouTube'], optsHi: ['WhatsApp', 'Instagram', 'Inshorts', 'YouTube'],
                  c: 2, ex: 'Inshorts auto-summarizes long news articles into exactly 60 words using NLP.', exHi: 'Inshorts auto-summarizes long news articles into exactly 60 words using NLP.' },
                { q: 'Tokenization in NLP means?', qHi: 'Tokenization in NLP means?',
                  opts: ['Encrypting text', 'Splitting text into words', 'Translating', 'Deleting text'], optsHi: ['Encrypting text', 'Splitting text into words', 'Translating', 'Deleting text'],
                  c: 1, ex: 'Tokenization splits text into tokens. "I love AI" → ["I","love","AI"]. AI processes tokens!', exHi: 'Tokenization splits text into tokens. "I love AI" → ["I","love","AI"]. AI processes tokens!' },
                { q: 'HDFC Bank NLP chatbot is called?', qHi: 'HDFC Bank NLP chatbot is called?',
                  opts: ['Alexa', 'Siri', 'Eva', 'Cortana'], optsHi: ['Alexa', 'Siri', 'Eva', 'Cortana'],
                  c: 2, ex: 'HDFC Bank EVA handles 3 million+ customer conversations using NLP!', exHi: 'HDFC Bank EVA handles 3 million+ customer conversations using NLP!' },
                { q: 'Attention mechanism helps AI to?', qHi: 'Attention mechanism helps AI to?',
                  opts: ['Run faster', 'Focus on important words in context', 'Use less memory', 'Delete data'], optsHi: ['Run faster', 'Focus on important words in context', 'Use less memory', 'Delete data'],
                  c: 1, ex: 'Attention lets model focus on relevant words. "The bat flew" — focuses on "flew" to know bat=animal!', exHi: 'Attention lets model focus on relevant words. "The bat flew" — focuses on "flew" to know bat=animal!' },
                { q: 'How many Indian languages does Google Translate support?', qHi: 'How many Indian languages does Google Translate support?',
                  opts: ['15', '44', '109', '200'], optsHi: ['15', '44', '109', '200'],
                  c: 2, ex: 'Google Translate supports 109 Indian languages including Hindi, Tamil, Telugu, Marathi, Bengali!', exHi: 'Google Translate supports 109 Indian languages including Hindi, Tamil, Telugu, Marathi, Bengali!' },
                { q: 'Named Entity Recognition identifies?', qHi: 'Named Entity Recognition identifies?',
                  opts: ['Math equations', 'People, places, organizations in text', 'Word count', 'Grammar errors'], optsHi: ['Math equations', 'People, places, organizations in text', 'Word count', 'Grammar errors'],
                  c: 1, ex: 'NER identifies: "Narendra Modi visited Mumbai" → Person: Narendra Modi, Location: Mumbai.', exHi: 'NER identifies: "Narendra Modi visited Mumbai" → Person: Narendra Modi, Location: Mumbai.' }
              ]
            }
          ]
        },
        {
          id: 'c9_7', icon: '🎮', title: 'Reinforcement Learning — AI That Learns by Playing!', titleHi: 'Reinforcement Learning — खेल कर सीखने वाला AI!', xp: 40,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot', botNameHi: 'AIBot',
              tag: 'CLASS 9 · RL · CHAPTER 7', tagHi: 'CLASS 9 · RL · CHAPTER 7',
              title: 'How AI Becomes a Champion by Playing Games!', titleHi: 'AI खेल खेलकर Champion कैसे बनता है!',
              intro: 'AlphaGo beat the world Go champion. Self-driving cars navigate traffic. ChatGPT learned from feedback. All use Reinforcement Learning!', introHi: 'AlphaGo beat the world Go champion. Self-driving cars navigate traffic. ChatGPT learned from feedback. All use Reinforcement Learning!',
              speech: '<span class="hi">Reinforcement Learning</span> = AI learns by <span class="em">trial and error</span><br><br>Like a child learning to walk:<br>✅ Good action → <span class="cool">REWARD</span><br>❌ Bad action → <span class="em">PENALTY</span><br>🔄 Repeat MILLIONS of times → MASTER!<br><br>🎮 AlphaGo — beat world Go champion (2016)<br>🚗 Tesla Autopilot — learns from millions of drives<br>🤖 ChatGPT — improved by human feedback (RLHF)<br>🏭 DeepMind — reduced Google energy use by 40%!',
              speechHi: '<span class="hi">Reinforcement Learning</span> = AI learns by <span class="em">trial and error</span><br><br>Like a child learning to walk:<br>✅ Good action → <span class="cool">REWARD</span><br>❌ Bad action → <span class="em">PENALTY</span><br>🔄 Repeat MILLIONS of times → MASTER!<br><br>🎮 AlphaGo — beat world Go champion (2016)<br>🚗 Tesla Autopilot — learns from millions of drives<br>🤖 ChatGPT — improved by human feedback (RLHF)<br>🏭 DeepMind — reduced Google energy use by 40%!'
            },
            { type: 'concepts', tag: 'CONCEPTS', tagHi: 'CONCEPTS',
              title: 'Key Concepts', titleHi: 'मुख्य Concepts',
              intro: 'Core ideas for this chapter.', introHi: 'इस chapter के core ideas.',
              items: [
                { em:'♟️', l:'AlphaGo/AlphaZero', lHi:'AlphaGo/AlphaZero', d:'Learned Chess, Go, Shogi from scratch — beat world champions in 4 hours of self-play!', dHi:'Learned Chess, Go, Shogi from scratch — beat world champions in 4 hours of self-play!' },
                { em:'🚗', l:'Self-Driving Cars', lHi:'Self-Driving Cars', d:'Tesla, Waymo use RL. AI rewarded for safe driving. Learned from billions of virtual miles!', dHi:'Tesla, Waymo use RL. AI rewarded for safe driving. Learned from billions of virtual miles!' },
                { em:'🤖', l:'ChatGPT RLHF', lHi:'ChatGPT RLHF', d:'Reinforcement Learning from Human Feedback — humans rate ChatGPT responses, AI learns to improve!', dHi:'Reinforcement Learning from Human Feedback — humans rate ChatGPT responses, AI learns to improve!' },
                { em:'🏭', l:'Google Data Centers', lHi:'Google Data Centers', d:'DeepMind RL reduced cooling energy by 40%! Manages thousands of servers in real-time.', dHi:'DeepMind RL reduced cooling energy by 40%! Manages thousands of servers in real-time.' },
                { em:'🎮', l:'Video Game AI', lHi:'Video Game AI', d:'OpenAI Five (Dota 2), AlphaStar (StarCraft) — beat top professional human players!', dHi:'OpenAI Five (Dota 2), AlphaStar (StarCraft) — beat top professional human players!' },
                { em:'💊', l:'Drug Discovery', lHi:'Drug Discovery', d:'AlphaFold used RL to solve protein folding — cracked a 50-year problem! Revolutionizing medicine.', dHi:'AlphaFold used RL to solve protein folding — cracked a 50-year problem! Revolutionizing medicine.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · RL QUIZ', tagHi: 'CLASS 9 · RL QUIZ',
              title: '🧩 Reinforcement Learning — 10 Question Practice Quiz', titleHi: '🧩 Reinforcement Learning — 10 सवाल Practice Quiz',
              questions: [
                { q: 'How does Reinforcement Learning work?', qHi: 'How does Reinforcement Learning work?',
                  opts: ['Copying humans', 'Trial and error with rewards and penalties', 'Reading textbooks', 'Downloading data'], optsHi: ['Copying humans', 'Trial and error with rewards and penalties', 'Reading textbooks', 'Downloading data'],
                  c: 1, ex: 'RL = trial and error! Good action → reward. Bad action → penalty. Repeat millions of times → master it!', exHi: 'RL = trial and error! Good action → reward. Bad action → penalty. Repeat millions of times → master it!' },
                { q: 'Which AI beat world Go champion in 2016?', qHi: 'Which AI beat world Go champion in 2016?',
                  opts: ['AlphaFold', 'AlphaGo', 'AlphaCode', 'DeepBlue'], optsHi: ['AlphaFold', 'AlphaGo', 'AlphaCode', 'DeepBlue'],
                  c: 1, ex: 'AlphaGo (2016) beat Lee Sedol 4-1 at Go — a game with more positions than atoms in the universe!', exHi: 'AlphaGo (2016) beat Lee Sedol 4-1 at Go — a game with more positions than atoms in the universe!' },
                { q: 'RLHF in ChatGPT means?', qHi: 'RLHF in ChatGPT means?',
                  opts: ['Random Learning', 'Reinforcement Learning from Human Feedback', 'Recursive Learning', 'Rapid Learning'], optsHi: ['Random Learning', 'Reinforcement Learning from Human Feedback', 'Recursive Learning', 'Rapid Learning'],
                  c: 1, ex: 'RLHF = Reinforcement Learning from Human Feedback — humans rate responses, AI learns to improve!', exHi: 'RLHF = Reinforcement Learning from Human Feedback — humans rate responses, AI learns to improve!' },
                { q: 'What is an "agent" in RL?', qHi: 'What is an "agent" in RL?',
                  opts: ['The dataset', 'The AI that takes actions and learns', 'The reward', 'The programmer'], optsHi: ['The dataset', 'The AI that takes actions and learns', 'The reward', 'The programmer'],
                  c: 1, ex: 'Agent = the AI learner that observes environment, takes actions, gets rewards, and improves strategy.', exHi: 'Agent = the AI learner that observes environment, takes actions, gets rewards, and improves strategy.' },
                { q: 'DeepMind RL reduced Google cooling energy by?', qHi: 'DeepMind RL reduced Google cooling energy by?',
                  opts: ['10%', '25%', '40%', '60%'], optsHi: ['10%', '25%', '40%', '60%'],
                  c: 2, ex: '40%! This saves millions of dollars annually — RL solving real-world optimization!', exHi: '40%! This saves millions of dollars annually — RL solving real-world optimization!' },
                { q: 'In RL, what is a "reward"?', qHi: 'In RL, what is a "reward"?',
                  opts: ['Money for programmers', 'Signal telling AI if action was good', 'The final output', 'A neural network'], optsHi: ['Money for programmers', 'Signal telling AI if action was good', 'The final output', 'A neural network'],
                  c: 1, ex: 'Reward = signal after actions. Positive = good action, Negative = bad. AI maximizes total rewards!', exHi: 'Reward = signal after actions. Positive = good action, Negative = bad. AI maximizes total rewards!' },
                { q: 'AlphaZero learned Chess and Go in?', qHi: 'AlphaZero learned Chess and Go in?',
                  opts: ['4 hours', '24 hours', '1 week', '1 month'], optsHi: ['4 hours', '24 hours', '1 week', '1 month'],
                  c: 0, ex: 'AlphaZero learned from ZERO in just 4 hours of self-play, then beat all world champion AIs!', exHi: 'AlphaZero learned from ZERO in just 4 hours of self-play, then beat all world champion AIs!' },
                { q: 'Tesla and Waymo use RL for?', qHi: 'Tesla and Waymo use RL for?',
                  opts: ['Phone apps', 'Self-driving cars', 'Social media', 'Email'], optsHi: ['Phone apps', 'Self-driving cars', 'Social media', 'Email'],
                  c: 1, ex: 'Tesla and Waymo use RL for autonomous driving — learned from billions of miles of real driving!', exHi: 'Tesla and Waymo use RL for autonomous driving — learned from billions of miles of real driving!' },
                { q: 'RL agent tries to maximize?', qHi: 'RL agent tries to maximize?',
                  opts: ['Speed', 'Cumulative reward', 'Data usage', 'Number of actions'], optsHi: ['Speed', 'Cumulative reward', 'Data usage', 'Number of actions'],
                  c: 1, ex: 'RL agent always maximizes total cumulative reward over time — not just immediate, but long-term!', exHi: 'RL agent always maximizes total cumulative reward over time — not just immediate, but long-term!' },
                { q: 'What is the environment in RL?', qHi: 'What is the environment in RL?',
                  opts: ['Hard drive', 'World agent interacts with', 'Training data', 'Internet'], optsHi: ['Hard drive', 'World agent interacts with', 'Training data', 'Internet'],
                  c: 1, ex: 'Environment = everything agent interacts with. Chess AI: board. Self-driving AI: roads, traffic, pedestrians.', exHi: 'Environment = everything agent interacts with. Chess AI: board. Self-driving AI: roads, traffic, pedestrians.' }
              ]
            }
          ]
        },
        {
          id: 'c9_8', icon: '🇮🇳', title: 'AI in India — How India Uses AI Right Now!', titleHi: 'AI in India — India अभी AI कैसे use करती है!', xp: 35,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot', botNameHi: 'AIBot',
              tag: 'CLASS 9 · AI IN INDIA · CHAPTER 8', tagHi: 'CLASS 9 · AI IN INDIA · CHAPTER 8',
              title: 'India — The AI Superpower in the Making!', titleHi: 'India — बनता हुआ AI Superpower!',
              intro: 'India is not just using AI — India is building global AI systems. Aadhaar, UPI, DIKSHA serve 1.4 billion people!', introHi: 'India is not just using AI — India is building global AI systems. Aadhaar, UPI, DIKSHA serve 1.4 billion people!',
              speech: '<span class="hi">India + AI</span> = <span class="em">World\'s Biggest Digital Revolution</span><br><br>📊 India ranks <span class="cool">#3 globally</span> in AI research<br>💻 <span class="em">10 lakh+</span> AI engineers in India<br>🚀 <span class="hi">₹50,000 Crore</span> AI market by 2025<br><br>🆔 <strong>Aadhaar</strong> — World\'s largest biometric AI database<br>💰 <strong>UPI</strong> — AI fraud detection, 400M+ users<br>🌾 <strong>KisanAI</strong> — Helps farmers detect crop disease<br>🏥 <strong>AIIMS AI</strong> — Diagnoses from X-rays',
              speechHi: '<span class="hi">India + AI</span> = <span class="em">World\'s Biggest Digital Revolution</span><br><br>📊 India ranks <span class="cool">#3 globally</span> in AI research<br>💻 <span class="em">10 lakh+</span> AI engineers in India<br>🚀 <span class="hi">₹50,000 Crore</span> AI market by 2025<br><br>🆔 <strong>Aadhaar</strong> — World\'s largest biometric AI database<br>💰 <strong>UPI</strong> — AI fraud detection, 400M+ users<br>🌾 <strong>KisanAI</strong> — Helps farmers detect crop disease<br>🏥 <strong>AIIMS AI</strong> — Diagnoses from X-rays'
            },
            { type: 'concepts', tag: 'CONCEPTS', tagHi: 'CONCEPTS',
              title: 'Key Concepts', titleHi: 'मुख्य Concepts',
              intro: 'Core ideas for this chapter.', introHi: 'इस chapter के core ideas.',
              items: [
                { em:'🌾', l:'Agriculture: KisanAI', lHi:'Agriculture: KisanAI', d:'AI analyzes satellite images to detect crop diseases early. Saves 30% crop loss in Rajasthan, MP, UP!', dHi:'AI analyzes satellite images to detect crop diseases early. Saves 30% crop loss in Rajasthan, MP, UP!' },
                { em:'🏥', l:'Healthcare: Niramai', lHi:'Healthcare: Niramai', d:'Bangalore startup detects breast cancer with AI heat maps — 10x cheaper than mammography!', dHi:'Bangalore startup detects breast cancer with AI heat maps — 10x cheaper than mammography!' },
                { em:'🏦', l:'Finance: Paytm AI', lHi:'Finance: Paytm AI', d:'Processes 1.2 billion transactions using AI to detect fraud in milliseconds — 99.9% blocked!', dHi:'Processes 1.2 billion transactions using AI to detect fraud in milliseconds — 99.9% blocked!' },
                { em:'📚', l:'Education: DIKSHA', lHi:'Education: DIKSHA', d:'Government AI platform in 20+ languages — 200 million students access quality content even in villages!', dHi:'Government AI platform in 20+ languages — 200 million students access quality content even in villages!' },
                { em:'🚌', l:'Smart Cities: Pune', lHi:'Smart Cities: Pune', d:'AI traffic management reduced traffic jams by 25% — cameras + AI adjust signals automatically!', dHi:'AI traffic management reduced traffic jams by 25% — cameras + AI adjust signals automatically!' },
                { em:'⚖️', l:'Legal: SUPACE', lHi:'Legal: SUPACE', d:'Supreme Court AI analyzes legal documents — judges process cases 10x faster!', dHi:'Supreme Court AI analyzes legal documents — judges process cases 10x faster!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 9 · INDIA QUIZ', tagHi: 'CLASS 9 · INDIA QUIZ',
              title: '🧩 AI in India — 10 Question Practice Quiz', titleHi: '🧩 AI in India — 10 सवाल Practice Quiz',
              questions: [
                { q: 'India ranks globally in AI research at?', qHi: 'India ranks globally in AI research at?',
                  opts: ['#1', '#3', '#5', '#10'], optsHi: ['#1', '#3', '#5', '#10'],
                  c: 1, ex: 'India #3 in AI research globally. IITs, IISc publish thousands of AI papers annually!', exHi: 'India #3 in AI research globally. IITs, IISc publish thousands of AI papers annually!' },
                { q: 'Niramai startup detects what disease using AI?', qHi: 'Niramai startup detects what disease using AI?',
                  opts: ['Diabetes', 'Cancer', 'Breast Cancer', 'Heart Disease'], optsHi: ['Diabetes', 'Cancer', 'Breast Cancer', 'Heart Disease'],
                  c: 2, ex: 'Niramai uses thermal imaging + AI to detect breast cancer — 10x cheaper than mammography!', exHi: 'Niramai uses thermal imaging + AI to detect breast cancer — 10x cheaper than mammography!' },
                { q: 'India AI-powered identity system?', qHi: 'India AI-powered identity system?',
                  opts: ['PAN Card', 'Voter ID', 'Aadhaar', 'Passport'], optsHi: ['PAN Card', 'Voter ID', 'Aadhaar', 'Passport'],
                  c: 2, ex: 'Aadhaar uses AI biometric recognition for 1.3 billion Indians — world\'s largest biometric database!', exHi: 'Aadhaar uses AI biometric recognition for 1.3 billion Indians — world\'s largest biometric database!' },
                { q: 'Supreme Court AI system name?', qHi: 'Supreme Court AI system name?',
                  opts: ['LegalBot', 'JusticeAI', 'SUPACE', 'CourtAI'], optsHi: ['LegalBot', 'JusticeAI', 'SUPACE', 'CourtAI'],
                  c: 2, ex: 'SUPACE analyzes legal documents — helping judges process cases 10x faster!', exHi: 'SUPACE analyzes legal documents — helping judges process cases 10x faster!' },
                { q: 'DIKSHA platform has how many students?', qHi: 'DIKSHA platform has how many students?',
                  opts: ['10 million', '50 million', '200 million', '500 million'], optsHi: ['10 million', '50 million', '200 million', '500 million'],
                  c: 2, ex: '200 million (20 crore) students use DIKSHA — in 20+ Indian languages!', exHi: '200 million (20 crore) students use DIKSHA — in 20+ Indian languages!' },
                { q: 'KisanAI helps farmers how?', qHi: 'KisanAI helps farmers how?',
                  opts: ['Selling crops', 'Detecting crop diseases via satellite AI', 'Getting loans', 'Weather forecast'], optsHi: ['Selling crops', 'Detecting crop diseases via satellite AI', 'Getting loans', 'Weather forecast'],
                  c: 1, ex: 'KisanAI analyzes satellite images to detect crop diseases early — saves 30% crop loss!', exHi: 'KisanAI analyzes satellite images to detect crop diseases early — saves 30% crop loss!' },
                { q: 'Pune reduced traffic jams using AI by?', qHi: 'Pune reduced traffic jams using AI by?',
                  opts: ['10%', '25%', '50%', '75%'], optsHi: ['10%', '25%', '50%', '75%'],
                  c: 1, ex: 'Pune Smart City AI reduced traffic jams by 25% via camera analysis and automatic signal adjustment.', exHi: 'Pune Smart City AI reduced traffic jams by 25% via camera analysis and automatic signal adjustment.' },
                { q: 'Paytm AI detects?', qHi: 'Paytm AI detects?',
                  opts: ['New employees', 'Fraud in real-time during transactions', 'Advertisements', 'App bugs'], optsHi: ['New employees', 'Fraud in real-time during transactions', 'Advertisements', 'App bugs'],
                  c: 1, ex: 'Paytm AI detects fraud in milliseconds — blocking 99.9% of fraud attempts!', exHi: 'Paytm AI detects fraud in milliseconds — blocking 99.9% of fraud attempts!' },
                { q: 'India AI market by 2025?', qHi: 'India AI market by 2025?',
                  opts: ['₹1,000 Cr', '₹10,000 Cr', '₹50,000 Cr', '₹5,00,000 Cr'], optsHi: ['₹1,000 Cr', '₹10,000 Cr', '₹50,000 Cr', '₹5,00,000 Cr'],
                  c: 2, ex: 'India AI market expected to reach ₹50,000 crore ($6 Billion) by 2025!', exHi: 'India AI market expected to reach ₹50,000 crore ($6 Billion) by 2025!' },
                { q: 'AI engineers in India?', qHi: 'AI engineers in India?',
                  opts: ['10,000', '1 lakh', '10 lakh+', '1 crore'], optsHi: ['10,000', '1 lakh', '10 lakh+', '1 crore'],
                  c: 2, ex: 'India has 1 million+ AI engineers — second largest AI talent pool after USA!', exHi: 'India has 1 million+ AI engineers — second largest AI talent pool after USA!' }
              ]
            }
          ]
        }
,
      ]
    }]
  },
  10: {
    label: 'Class 10', labelHi: 'कक्षा 10', badge: '⚡ Advanced', badgeHi: '⚡ उन्नत',
    badgeStyle: 'background:rgba(255,209,102,.15);color:#FFD166;border:1px solid rgba(255,209,102,.3)',
    emoji: '⚡',
    subjects: [{
      id: 's10_dl', icon: '🧬', name: 'Deep Learning & Neural Networks', nameHi: 'डीप लर्निंग और न्यूरल नेटवर्क',
      chapters: [
        {
          id: 'c10_1', icon: '🧬', title: 'Neural Networks — AI Inspired by Your Brain!', titleHi: 'न्यूरल नेटवर्क — आपके दिमाग से प्रेरित!', xp: 40,
          slides: [
            { type: 'teach', bot: 'a', botName: 'NeuroBot 🧬', botNameHi: 'NeuroBot 🧬',
              tag: 'CLASS 10 · DEEP LEARNING · CHAPTER 1', tagHi: 'कक्षा 10 · डीप लर्निंग · अध्याय 1',
              title: 'How Neural Networks Learn!', titleHi: 'न्यूरल नेटवर्क कैसे सीखते हैं!',
              intro: 'The most powerful AI — ChatGPT, DALL-E, AlphaFold — all use neural networks. Understand them from the ground up!',
              introHi: 'सबसे शक्तिशाली AI — ChatGPT, DALL-E — सभी न्यूरल नेटवर्क का उपयोग करते हैं!',
              speech: `Your brain has <span class="hi">86 billion neurons</span> connected by <span class="em">100 trillion synapses</span>!<br><br>
An artificial neuron works simply:<br>
📥 Takes <strong>multiple number inputs</strong><br>
⚖️ Multiplies each by a <strong>weight</strong> (importance)<br>
➕ <strong>Sums</strong> everything<br>
🔥 Passes through <strong>activation function</strong><br>
📤 Outputs a <strong>single number</strong><br><br>
One neuron is simple. Connect <span class="hi">billions of them in layers</span>...<br>and you get <span class="em">DEEP LEARNING!</span> 🤯<br><br>
GPT-4 has <span class="hot">1.8 TRILLION parameters</span> — each one a weight!`,
              speechHi: `आपके दिमाग में <span class="hi">86 अरब न्यूरॉन</span> हैं!<br><br>
एक कृत्रिम न्यूरॉन:<br>
📥 कई संख्या इनपुट लेता है<br>
⚖️ हर इनपुट को <strong>weight</strong> से गुणा करता है<br>
➕ सब जोड़ता है<br>
📤 एक संख्या आउटपुट करता है<br><br>
अरबों ऐसे न्यूरॉन परतों में जोड़ें → <span class="em">डीप लर्निंग!</span>`
            },
            { type: 'neural', tag: 'CLASS 10 · DEEP LEARNING · CHAPTER 1', tagHi: 'कक्षा 10 · डीप लर्निंग · अध्याय 1',
              title: 'Neural Network — Live Visualization!', titleHi: 'न्यूरल नेटवर्क — लाइव विज़ुअलाइज़ेशन!',
              intro: 'Each circle is a neuron. Each line is a connection with a weight. Watch data flow from input to output!',
              introHi: 'हर वृत्त एक न्यूरॉन है। हर रेखा एक weight के साथ कनेक्शन है।',
              inp: ['X₁', 'X₂', 'X₃', 'X₄'], h1: ['H₁', 'H₂', 'H₃', 'H₄', 'H₅'],
              h2: ['H₆', 'H₇', 'H₈', 'H₉'], out: ['Y₁', 'Y₂'],
              labels: ['Input Layer', 'Hidden Layer 1', 'Hidden Layer 2', 'Output Layer']
            },
            { type: 'deep', tag: 'CLASS 10 · DEEP LEARNING · CHAPTER 1', tagHi: 'कक्षा 10 · डीप लर्निंग · अध्याय 1',
              title: 'Backpropagation — How Networks Learn', titleHi: 'Backpropagation — नेटवर्क कैसे सीखते हैं',
              content: [
                { h: 'Weights — The Knobs of Intelligence ⚖️', hHi: 'Weights — बुद्धिमत्ता के पेंच', p: 'Every connection has a weight — a number that determines signal importance. Weight 2.5 = amplifies. Weight -1 = inhibits. Weight 0 = ignores. GPT-4\'s 1.8 trillion weights encode ALL its "knowledge"!', pHi: 'हर कनेक्शन में एक weight है — जो बताता है वह सिग्नल कितना महत्वपूर्ण है।' },
                { h: 'Backpropagation — The Learning Algorithm 🔙', hHi: 'Backpropagation — लर्निंग एल्गोरिदम', p: 'After each prediction, network measures how wrong it was (the "loss"). Backpropagation uses calculus (chain rule) to calculate how much each weight contributed to the error. Then ALL weights adjust to reduce error. Repeat for millions of examples → intelligence emerges!', pHi: 'हर भविष्यवाणी के बाद, नेटवर्क मापता है कि वह कितना गलत था। Backpropagation हर weight के योगदान की गणना करता है।' },
                { h: 'Activation Functions — Adding Non-Linearity 🔥', hHi: 'Activation Functions', p: 'Without activation functions, even a 1000-layer network behaves like one layer! ReLU (Rectified Linear Unit): if input < 0, output 0; else output input as-is. Simple but powerful — allows networks to model incredibly complex patterns like faces, languages, and physical laws.', pHi: 'Activation functions के बिना 1000-परत नेटवर्क भी एक परत की तरह काम करता! ReLU सबसे सामान्य है।' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 10 · DEEP LEARNING · CHAPTER 1', tagHi: 'कक्षा 10 · डीप लर्निंग · अध्याय 1',
              title: 'Neural Networks Expert Quiz!', titleHi: 'न्यूरल नेटवर्क प्रश्नोत्तरी!',
              questions: [
                { q: 'What makes a neural network "deep"?', qHi: 'न्यूरल नेटवर्क को "deep" क्या बनाता है?', opts: ['Complex data', 'Many hidden layers between input and output', 'Large file size', 'Long training time'], optsHi: ['जटिल डेटा', 'इनपुट और आउटपुट के बीच कई hidden layers', 'बड़ी फ़ाइल', 'लंबा ट्रेनिंग समय'], c: 1, ex: '"Deep" = many hidden layers! More layers = more complex patterns. Simple edges → shapes → objects → scenes.', exHi: '"Deep" = कई hidden layers! ज़्यादा layers = ज़्यादा जटिल पैटर्न।' },
                { q: 'What is "Backpropagation"?', qHi: '"Backpropagation" क्या है?', opts: ['Moving data forward', 'Algorithm adjusting weights backwards to reduce error', 'Backing up data', 'Removing layers'], optsHi: ['डेटा आगे भेजना', 'त्रुटि कम करने के लिए weights पीछे से एडजस्ट करना', 'डेटा बैकअप', 'layers हटाना'], c: 1, ex: 'Backpropagation calculates each weight\'s contribution to error using calculus, then adjusts all weights. Repeat millions of times → learning!', exHi: 'Backpropagation कैलकुलस से हर weight का योगदान निकालता है, फिर सब एडजस्ट करता है।' }
              ]
            }
          ]
        },
,
        {
          id: 'c10_3', icon: '⚙️', title: 'How Neural Networks Learn — Backpropagation Explained', titleHi: 'How Neural Networks Learn — Backpropagation Explained', xp: 45,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 10 · BACKPROPAGATION · CHAPTER 3', tagHi: 'CLASS 10 · BACKPROPAGATION · CHAPTER 3',
              title: 'Backpropagation — How AI Learns from Its Mistakes!', titleHi: 'Backpropagation — How AI Learns from Its Mistakes!',
              intro: 'Every time AI makes a wrong prediction, it learns from the mistake. This learning process is called Backpropagation!', introHi: 'Every time AI makes a wrong prediction, it learns from the mistake. This learning process is called Backpropagation!',
              speech: '<span class="hi">Backpropagation</span> = AI learning from mistakes<br><br>Imagine learning to throw a basketball:<br>🏀 Throw → miss → adjust angle → throw again<br>🔄 Repeat until you score every time!<br><br><span class="em">Neural Network does the same:</span><br>1️⃣ <span class="cool">Forward Pass</span> — Make a prediction<br>2️⃣ <span class="em">Calculate Error</span> — How wrong was it?<br>3️⃣ <span class="hi">Backward Pass</span> — Adjust all weights<br>4️⃣ 🔄 <span class="cool">Repeat</span> — Thousands of times → Perfect!<br><br><span class="em">ChatGPT did this billions of times to learn language!</span>',
              speechHi: '<span class="hi">Backpropagation</span> = AI learning from mistakes<br><br>Imagine learning to throw a basketball:<br>🏀 Throw → miss → adjust angle → throw again<br>🔄 Repeat until you score every time!<br><br><span class="em">Neural Network does the same:</span><br>1️⃣ <span class="cool">Forward Pass</span> — Make a prediction<br>2️⃣ <span class="em">Calculate Error</span> — How wrong was it?<br>3️⃣ <span class="hi">Backward Pass</span> — Adjust all weights<br>4️⃣ 🔄 <span class="cool">Repeat</span> — Thousands of times → Perfect!<br><br><span class="em">ChatGPT did this billions of times to learn language!</span>'
            },
            { type: 'concepts', tag: 'CLASS 10 · BACKPROP CONCEPTS', tagHi: 'CLASS 10 · BACKPROP CONCEPTS',
              title: 'Key Concepts of How AI Learns', titleHi: 'Key Concepts of How AI Learns',
              intro: 'Understanding the mathematics of machine learning.', introHi: 'Understanding the mathematics of machine learning.',
              items: [
                { em:'📉', l:'Loss Function', lHi:'Loss Function', d:'Measures HOW WRONG the AI prediction was. Like a score of wrongness — 0 is perfect, higher is worse. AI tries to minimize this!', dHi:'Measures HOW WRONG the AI prediction was. Like a score of wrongness — 0 is perfect, higher is worse. AI tries to minimize this!' },
                { em:'⚖️', l:'Weights', lHi:'Weights', d:'Numbers that connect neurons. Initially random. Backprop adjusts them thousands of times until predictions become accurate!', dHi:'Numbers that connect neurons. Initially random. Backprop adjusts them thousands of times until predictions become accurate!' },
                { em:'📐', l:'Gradient Descent', lHi:'Gradient Descent', d:'The algorithm that figures out WHICH DIRECTION to adjust weights to reduce error. Like finding the lowest valley in mountains!', dHi:'The algorithm that figures out WHICH DIRECTION to adjust weights to reduce error. Like finding the lowest valley in mountains!' },
                { em:'🎓', l:'Learning Rate', lHi:'Learning Rate', d:'How BIG each adjustment step is. Too big = AI bounces around and never learns. Too small = takes forever. Must be just right!', dHi:'How BIG each adjustment step is. Too big = AI bounces around and never learns. Too small = takes forever. Must be just right!' },
                { em:'🔄', l:'Epoch', lHi:'Epoch', d:'One complete pass through ALL training data. ChatGPT trained for thousands of epochs on trillions of words!', dHi:'One complete pass through ALL training data. ChatGPT trained for thousands of epochs on trillions of words!' },
                { em:'✅', l:'Convergence', lHi:'Convergence', d:'When the AI stops improving much — it has learned! Loss reaches a low stable value. Training is complete.', dHi:'When the AI stops improving much — it has learned! Loss reaches a low stable value. Training is complete.' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 10 · BACKPROP QUIZ', tagHi: 'CLASS 10 · BACKPROP QUIZ',
              title: '🧩 Backpropagation — 10 Question Practice Quiz', titleHi: '🧩 Backpropagation — 10 Question Practice Quiz',
              questions: [
                { q: 'What is backpropagation?', qHi: 'What is backpropagation?',
                  opts: ['Going backwards in a program', 'How AI learns from prediction errors', 'A type of neural network', 'A Python library'], optsHi: ['Going backwards in a program', 'How AI learns from prediction errors', 'A type of neural network', 'A Python library'],
                  c: 1, ex: 'Backpropagation = how AI learns from mistakes! It calculates how much each weight contributed to the error and adjusts them backwards through the network.', exHi: 'Backpropagation = how AI learns from mistakes! It calculates how much each weight contributed to the error and adjusts them backwards through the network.' },
                { q: 'What does the "loss function" measure?', qHi: 'What does the "loss function" measure?',
                  opts: ['How fast the AI runs', 'How wrong the AI prediction was', 'How many neurons are used', 'The AI training cost'], optsHi: ['How fast the AI runs', 'How wrong the AI prediction was', 'How many neurons are used', 'The AI training cost'],
                  c: 1, ex: 'Loss function measures how wrong the prediction was! Loss = 0 means perfect. Higher loss = more wrong. AI training minimizes loss!', exHi: 'Loss function measures how wrong the prediction was! Loss = 0 means perfect. Higher loss = more wrong. AI training minimizes loss!' },
                { q: 'What are "weights" in a neural network?', qHi: 'What are "weights" in a neural network?',
                  opts: ['The size of the computer', 'Numbers that connect neurons and determine strength', 'The training data', 'The output predictions'], optsHi: ['The size of the computer', 'Numbers that connect neurons and determine strength', 'The training data', 'The output predictions'],
                  c: 1, ex: 'Weights are numbers connecting neurons. They start random and are adjusted by backprop thousands of times until the network makes accurate predictions!', exHi: 'Weights are numbers connecting neurons. They start random and are adjusted by backprop thousands of times until the network makes accurate predictions!' },
                { q: 'Gradient Descent is used to?', qHi: 'Gradient Descent is used to?',
                  opts: ['Speed up the computer', 'Find the direction to adjust weights to reduce error', 'Delete unnecessary neurons', 'Upload data to cloud'], optsHi: ['Speed up the computer', 'Find the direction to adjust weights to reduce error', 'Delete unnecessary neurons', 'Upload data to cloud'],
                  c: 1, ex: 'Gradient Descent finds the optimal direction to adjust weights! Like rolling a ball down a hill to find the lowest point — minimum error!', exHi: 'Gradient Descent finds the optimal direction to adjust weights! Like rolling a ball down a hill to find the lowest point — minimum error!' },
                { q: 'What happens if the learning rate is too large?', qHi: 'What happens if the learning rate is too large?',
                  opts: ['AI learns perfectly', 'AI learns faster', 'AI bounces around and never converges', 'AI crashes the computer'], optsHi: ['AI learns perfectly', 'AI learns faster', 'AI bounces around and never converges', 'AI crashes the computer'],
                  c: 2, ex: 'Too large learning rate = AI overshoots the optimal solution and bounces around! Must be carefully tuned — not too big, not too small.', exHi: 'Too large learning rate = AI overshoots the optimal solution and bounces around! Must be carefully tuned — not too big, not too small.' },
                { q: 'One "epoch" in training means?', qHi: 'One "epoch" in training means?',
                  opts: ['One neuron activation', 'One complete pass through ALL training data', 'One prediction', 'One weight adjustment'], optsHi: ['One neuron activation', 'One complete pass through ALL training data', 'One prediction', 'One weight adjustment'],
                  c: 1, ex: 'One epoch = one complete pass through the ENTIRE training dataset! Complex AI models train for hundreds or thousands of epochs.', exHi: 'One epoch = one complete pass through the ENTIRE training dataset! Complex AI models train for hundreds or thousands of epochs.' },
                { q: 'When AI training "converges" it means?', qHi: 'When AI training "converges" it means?',
                  opts: ['The program crashes', 'Training is taking too long', 'The AI has learned — loss reached minimum', 'The data ran out'], optsHi: ['The program crashes', 'Training is taking too long', 'The AI has learned — loss reached minimum', 'The data ran out'],
                  c: 2, ex: 'Convergence = AI has learned effectively! The loss function stabilized at a low value — further training gives diminishing returns.', exHi: 'Convergence = AI has learned effectively! The loss function stabilized at a low value — further training gives diminishing returns.' },
                { q: 'ChatGPT trained on approximately how many words?', qHi: 'ChatGPT trained on approximately how many words?',
                  opts: ['1 million', '1 billion', '100 billion', 'Trillions of words'], optsHi: ['1 million', '1 billion', '100 billion', 'Trillions of words'],
                  c: 3, ex: 'Trillions of words! ChatGPT processed virtually the entire internet — books, Wikipedia, code, articles — during training.', exHi: 'Trillions of words! ChatGPT processed virtually the entire internet — books, Wikipedia, code, articles — during training.' },
                { q: 'The backward pass in backpropagation goes?', qHi: 'The backward pass in backpropagation goes?',
                  opts: ['From input to output', 'From output back to input — adjusting weights', 'Randomly through the network', 'Only through the first layer'], optsHi: ['From input to output', 'From output back to input — adjusting weights', 'Randomly through the network', 'Only through the first layer'],
                  c: 1, ex: 'Backward pass goes from output back to input! Error is propagated backwards through all layers, adjusting each weight proportionally.', exHi: 'Backward pass goes from output back to input! Error is propagated backwards through all layers, adjusting each weight proportionally.' },
                { q: 'Which Indian company uses neural network training similar to backprop?', qHi: 'Which Indian company uses neural network training similar to backprop?',
                  opts: ['Dominos Pizza', 'Infosys AI for code review', 'Air India', 'Indian Railways'], optsHi: ['Dominos Pizza', 'Infosys AI for code review', 'Air India', 'Indian Railways'],
                  c: 1, ex: 'Infosys uses neural networks for AI-powered code review and bug detection! Major Indian IT companies use deep learning extensively.', exHi: 'Infosys uses neural networks for AI-powered code review and bug detection! Major Indian IT companies use deep learning extensively.' }
              ]
            }
          ]
        },
        {
          id: 'c10_4', icon: '🔮', title: 'Computer Vision — Teaching AI to See Like You!', titleHi: 'Computer Vision — Teaching AI to See Like You!', xp: 45,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 10 · COMPUTER VISION · CHAPTER 4', tagHi: 'CLASS 10 · COMPUTER VISION · CHAPTER 4',
              title: 'Computer Vision — How AI Sees and Understands the World!', titleHi: 'Computer Vision — How AI Sees and Understands the World!',
              intro: 'Your eyes take 0.013 seconds to see. AI can process 1000 images in that same time! Computer Vision is how AI sees.', introHi: 'Your eyes take 0.013 seconds to see. AI can process 1000 images in that same time! Computer Vision is how AI sees.',
              speech: '<span class="hi">Computer Vision (CV)</span> = AI that can SEE and UNDERSTAND images<br><br>How AI sees an image:<br>📸 <span class="em">Photo enters</span> → AI sees a grid of numbers (pixels)<br>🧮 <span class="cool">CNN processes</span> → Detects edges, shapes, patterns<br>🎯 <span class="hi">Output</span> → "This is a cat with 97.3% confidence!"<br><br><span class="em">Indian Uses:</span><br>🆔 <strong>Aadhaar</strong> — Face recognition for 1.3B people<br>🚗 <strong>FASTag</strong> — Vehicle plate reading at toll booths<br>🌾 <strong>AgriStack</strong> — Detects crop disease from photos<br>🏥 <strong>Niramai</strong> — Detects breast cancer from thermal images',
              speechHi: '<span class="hi">Computer Vision (CV)</span> = AI that can SEE and UNDERSTAND images<br><br>How AI sees an image:<br>📸 <span class="em">Photo enters</span> → AI sees a grid of numbers (pixels)<br>🧮 <span class="cool">CNN processes</span> → Detects edges, shapes, patterns<br>🎯 <span class="hi">Output</span> → "This is a cat with 97.3% confidence!"<br><br><span class="em">Indian Uses:</span><br>🆔 <strong>Aadhaar</strong> — Face recognition for 1.3B people<br>🚗 <strong>FASTag</strong> — Vehicle plate reading at toll booths<br>🌾 <strong>AgriStack</strong> — Detects crop disease from photos<br>🏥 <strong>Niramai</strong> — Detects breast cancer from thermal images'
            },
            { type: 'concepts', tag: 'CLASS 10 · CV APPLICATIONS', tagHi: 'CLASS 10 · CV APPLICATIONS',
              title: 'Computer Vision Applications Changing India', titleHi: 'Computer Vision Applications Changing India',
              intro: 'From security cameras to medical diagnosis — CV is transforming India.', introHi: 'From security cameras to medical diagnosis — CV is transforming India.',
              items: [
                { em:'🆔', l:'Aadhaar Biometrics', lHi:'Aadhaar Biometrics', d:'Face + iris + fingerprint recognition for 1.3 billion Indians. Largest biometric database in the world. Powered by Computer Vision AI!', dHi:'Face + iris + fingerprint recognition for 1.3 billion Indians. Largest biometric database in the world. Powered by Computer Vision AI!' },
                { em:'🚗', l:'FASTag System', lHi:'FASTag System', d:'Camera reads vehicle number plates at 1000+ toll booths across India. AI recognizes plates in under 0.5 seconds — no stopping needed!', dHi:'Camera reads vehicle number plates at 1000+ toll booths across India. AI recognizes plates in under 0.5 seconds — no stopping needed!' },
                { em:'🌾', l:'Crop Disease Detection', lHi:'Crop Disease Detection', d:'Farmers photograph diseased crops. AI identifies the disease and recommends treatment in seconds. Saves millions of rupees in crop losses!', dHi:'Farmers photograph diseased crops. AI identifies the disease and recommends treatment in seconds. Saves millions of rupees in crop losses!' },
                { em:'🏥', l:'Cancer Detection', lHi:'Cancer Detection', d:'AI analyzes mammograms and X-rays better than some specialist doctors. Niramai startup detects breast cancer from thermal images — 10x cheaper!', dHi:'AI analyzes mammograms and X-rays better than some specialist doctors. Niramai startup detects breast cancer from thermal images — 10x cheaper!' },
                { em:'📦', l:'Amazon/Flipkart Warehouses', lHi:'Amazon/Flipkart Warehouses', d:'Robot cameras scan and sort packages automatically. AI reads barcodes, detects damage, and routes packages — 10x faster than humans!', dHi:'Robot cameras scan and sort packages automatically. AI reads barcodes, detects damage, and routes packages — 10x faster than humans!' },
                { em:'🚦', l:'Traffic Management', lHi:'Traffic Management', d:'Smart cameras + AI count vehicles, detect rule violations (red light jumping, wrong lane), and adjust signal timing. Reducing jams by 25% in Pune!', dHi:'Smart cameras + AI count vehicles, detect rule violations (red light jumping, wrong lane), and adjust signal timing. Reducing jams by 25% in Pune!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 10 · CV QUIZ', tagHi: 'CLASS 10 · CV QUIZ',
              title: '🧩 Computer Vision — 10 Question Practice Quiz', titleHi: '🧩 Computer Vision — 10 Question Practice Quiz',
              questions: [
                { q: 'What is Computer Vision?', qHi: 'What is Computer Vision?',
                  opts: ['AI that speaks', 'AI that sees and understands images', 'AI that hears', 'AI that reads text only'], optsHi: ['AI that speaks', 'AI that sees and understands images', 'AI that hears', 'AI that reads text only'],
                  c: 1, ex: 'Computer Vision = AI that can see and understand images and video! Used everywhere from Aadhaar to medical diagnosis.', exHi: 'Computer Vision = AI that can see and understand images and video! Used everywhere from Aadhaar to medical diagnosis.' },
                { q: 'How does AI "see" a photograph?', qHi: 'How does AI "see" a photograph?',
                  opts: ['As a painting', 'As a grid of numbers (pixels)', 'As text', 'As a 3D model'], optsHi: ['As a painting', 'As a grid of numbers (pixels)', 'As text', 'As a 3D model'],
                  c: 1, ex: 'AI sees images as grids of numbers! Each pixel is a number representing color intensity. AI processes these numbers to understand what the image shows.', exHi: 'AI sees images as grids of numbers! Each pixel is a number representing color intensity. AI processes these numbers to understand what the image shows.' },
                { q: 'FASTag uses Computer Vision to?', qHi: 'FASTag uses Computer Vision to?',
                  opts: ['Pay toll manually', 'Read vehicle number plates automatically', 'Check vehicle insurance', 'Measure vehicle speed only'], optsHi: ['Pay toll manually', 'Read vehicle number plates automatically', 'Check vehicle insurance', 'Measure vehicle speed only'],
                  c: 1, ex: 'FASTag cameras use CV to read number plates in under 0.5 seconds! Linked to your bank account for automatic payment — no stopping at tolls!', exHi: 'FASTag cameras use CV to read number plates in under 0.5 seconds! Linked to your bank account for automatic payment — no stopping at tolls!' },
                { q: 'Niramai startup uses AI to detect?', qHi: 'Niramai startup uses AI to detect?',
                  opts: ['Diabetes from blood tests', 'Breast cancer from thermal images', 'Heart disease from ECG', 'Covid from cough audio'], optsHi: ['Diabetes from blood tests', 'Breast cancer from thermal images', 'Heart disease from ECG', 'Covid from cough audio'],
                  c: 1, ex: 'Niramai uses thermal imaging + Computer Vision AI to detect breast cancer — 10x cheaper than traditional mammography and no radiation!', exHi: 'Niramai uses thermal imaging + Computer Vision AI to detect breast cancer — 10x cheaper than traditional mammography and no radiation!' },
                { q: 'What does CNN stand for in AI?', qHi: 'What does CNN stand for in AI?',
                  opts: ['Central Neural Network', 'Convolutional Neural Network', 'Computer News Network', 'Coded Numeric Network'], optsHi: ['Central Neural Network', 'Convolutional Neural Network', 'Computer News Network', 'Coded Numeric Network'],
                  c: 1, ex: 'CNN = Convolutional Neural Network! A special neural network architecture designed for processing images. Detects edges, shapes, and patterns layer by layer.', exHi: 'CNN = Convolutional Neural Network! A special neural network architecture designed for processing images. Detects edges, shapes, and patterns layer by layer.' },
                { q: 'Aadhaar uses Computer Vision for?', qHi: 'Aadhaar uses Computer Vision for?',
                  opts: ['Fingerprint + face + iris recognition', 'Voice recognition only', 'Text recognition', 'Credit score calculation'], optsHi: ['Fingerprint + face + iris recognition', 'Voice recognition only', 'Text recognition', 'Credit score calculation'],
                  c: 0, ex: 'Aadhaar uses ALL THREE biometrics — fingerprint, face recognition, AND iris scanning! Computer Vision powers all three for 1.3 billion Indians.', exHi: 'Aadhaar uses ALL THREE biometrics — fingerprint, face recognition, AND iris scanning! Computer Vision powers all three for 1.3 billion Indians.' },
                { q: 'How accurately can AI read number plates with FASTag?', qHi: 'How accurately can AI read number plates with FASTag?',
                  opts: ['50%', '75%', '90%', 'Near 100% in good lighting'], optsHi: ['50%', '75%', '90%', 'Near 100% in good lighting'],
                  c: 3, ex: 'Near 100% accuracy in good lighting! FASTag AI is trained on millions of Indian number plate images to handle different fonts, lighting, and dirt.', exHi: 'Near 100% accuracy in good lighting! FASTag AI is trained on millions of Indian number plate images to handle different fonts, lighting, and dirt.' },
                { q: 'Computer Vision can detect crop diseases by?', qHi: 'Computer Vision can detect crop diseases by?',
                  opts: ['Testing soil samples', 'Analyzing photographs of plants', 'Measuring rainfall', 'Checking temperature only'], optsHi: ['Testing soil samples', 'Analyzing photographs of plants', 'Measuring rainfall', 'Checking temperature only'],
                  c: 1, ex: 'AI analyzes photos of crops! Farmers send pictures via phone app, AI identifies the disease (fungal, bacterial, pest), and recommends treatment in seconds.', exHi: 'AI analyzes photos of crops! Farmers send pictures via phone app, AI identifies the disease (fungal, bacterial, pest), and recommends treatment in seconds.' },
                { q: 'A smart traffic camera with AI can?', qHi: 'A smart traffic camera with AI can?',
                  opts: ['Only count vehicles', 'Count vehicles, detect violations, AND adjust signal timing', 'Only change signals', 'Only record video'], optsHi: ['Only count vehicles', 'Count vehicles, detect violations, AND adjust signal timing', 'Only change signals', 'Only record video'],
                  c: 1, ex: 'AI cameras do all three! Count vehicles, detect violations (wrong lane, red light jumping), AND dynamically adjust signal timing to reduce traffic jams.', exHi: 'AI cameras do all three! Count vehicles, detect violations (wrong lane, red light jumping), AND dynamically adjust signal timing to reduce traffic jams.' },
                { q: 'Amazon warehouse AI uses Computer Vision to?', qHi: 'Amazon warehouse AI uses Computer Vision to?',
                  opts: ['Deliver packages by drone', 'Scan barcodes, detect damage, route packages automatically', 'Only count inventory', 'Talk to customers'], optsHi: ['Deliver packages by drone', 'Scan barcodes, detect damage, route packages automatically', 'Only count inventory', 'Talk to customers'],
                  c: 1, ex: 'Amazon CV AI does all warehouse work! Reads barcodes, detects damaged packages, and routes items — processing millions of packages daily!', exHi: 'Amazon CV AI does all warehouse work! Reads barcodes, detects damaged packages, and routes items — processing millions of packages daily!' }
              ]
            }
          ]
        },
        {
          id: 'c10_5', icon: '🎭', title: 'Generative AI — AI That Creates!', titleHi: 'Generative AI — AI That Creates!', xp: 50,
          slides: [
            { type: 'teach', bot: 'b', botName: 'AIBot 🤖', botNameHi: 'AIBot 🤖',
              tag: 'CLASS 10 · GENERATIVE AI · CHAPTER 5', tagHi: 'CLASS 10 · GENERATIVE AI · CHAPTER 5',
              title: 'Generative AI — The AI That Creates Art, Music, and Stories!', titleHi: 'Generative AI — The AI That Creates Art, Music, and Stories!',
              intro: 'Until 2020, AI could only analyze data. Now AI can CREATE — images, music, code, videos, stories. This changed everything!', introHi: 'Until 2020, AI could only analyze data. Now AI can CREATE — images, music, code, videos, stories. This changed everything!',
              speech: '<span class="hi">Generative AI</span> = AI that CREATES new content<br><br>📝 <span class="em">ChatGPT</span> → Writes essays, stories, code<br>🎨 <span class="cool">DALL-E / Midjourney</span> → Creates stunning images<br>🎵 <span class="hi">Suno AI</span> → Composes full songs<br>🎬 <span class="em">Sora (OpenAI)</span> → Generates videos<br>💻 <span class="cool">GitHub Copilot</span> → Writes code automatically<br><br><span class="hi">Indian Examples:</span><br>🇮🇳 <strong>IIT researchers</strong> using GenAI for drug discovery<br>📰 <strong>NDTV, Times of India</strong> using AI for news summaries<br>🎬 <strong>Bollywood</strong> experimenting with AI-generated VFX',
              speechHi: '<span class="hi">Generative AI</span> = AI that CREATES new content<br><br>📝 <span class="em">ChatGPT</span> → Writes essays, stories, code<br>🎨 <span class="cool">DALL-E / Midjourney</span> → Creates stunning images<br>🎵 <span class="hi">Suno AI</span> → Composes full songs<br>🎬 <span class="em">Sora (OpenAI)</span> → Generates videos<br>💻 <span class="cool">GitHub Copilot</span> → Writes code automatically<br><br><span class="hi">Indian Examples:</span><br>🇮🇳 <strong>IIT researchers</strong> using GenAI for drug discovery<br>📰 <strong>NDTV, Times of India</strong> using AI for news summaries<br>🎬 <strong>Bollywood</strong> experimenting with AI-generated VFX'
            },
            { type: 'concepts', tag: 'CLASS 10 · GENAI TYPES', tagHi: 'CLASS 10 · GENAI TYPES',
              title: 'Types of Generative AI Models', titleHi: 'Types of Generative AI Models',
              intro: 'Different GenAI models create different types of content.', introHi: 'Different GenAI models create different types of content.',
              items: [
                { em:'📝', l:'Large Language Models (LLMs)', lHi:'Large Language Models (LLMs)', d:'GPT-4 (ChatGPT), Claude, Gemini — generate human-like text. Trained on trillions of words. Can write essays, code, poems, emails!', dHi:'GPT-4 (ChatGPT), Claude, Gemini — generate human-like text. Trained on trillions of words. Can write essays, code, poems, emails!' },
                { em:'🎨', l:'Image Generation (Diffusion Models)', lHi:'Image Generation (Diffusion Models)', d:'DALL-E, Midjourney, Stable Diffusion — create images from text descriptions. "A tiger playing cricket in the rain" → Photorealistic image!', dHi:'DALL-E, Midjourney, Stable Diffusion — create images from text descriptions. "A tiger playing cricket in the rain" → Photorealistic image!' },
                { em:'🎵', l:'Music Generation', lHi:'Music Generation', d:'Suno AI, Udio — generate full songs with vocals and instruments from a text prompt. AI music composer in seconds!', dHi:'Suno AI, Udio — generate full songs with vocals and instruments from a text prompt. AI music composer in seconds!' },
                { em:'🎬', l:'Video Generation', lHi:'Video Generation', d:'Sora (OpenAI), Runway — generate realistic videos from text. Future of filmmaking — no camera needed!', dHi:'Sora (OpenAI), Runway — generate realistic videos from text. Future of filmmaking — no camera needed!' },
                { em:'💻', l:'Code Generation', lHi:'Code Generation', d:'GitHub Copilot, Cursor, Replit AI — write complete code functions from a description. Indian developers use this daily!', dHi:'GitHub Copilot, Cursor, Replit AI — write complete code functions from a description. Indian developers use this daily!' },
                { em:'🗣️', l:'Voice Cloning', lHi:'Voice Cloning', d:'ElevenLabs, Murf.ai — clone any voice from 5 seconds of audio. Used for audiobooks, dubbing Bollywood films in regional languages!', dHi:'ElevenLabs, Murf.ai — clone any voice from 5 seconds of audio. Used for audiobooks, dubbing Bollywood films in regional languages!' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 10 · GENAI QUIZ', tagHi: 'CLASS 10 · GENAI QUIZ',
              title: '🧩 Generative AI — 10 Question Practice Quiz', titleHi: '🧩 Generative AI — 10 Question Practice Quiz',
              questions: [
                { q: 'What does Generative AI do?', qHi: 'What does Generative AI do?',
                  opts: ['Only analyzes existing data', 'Creates new content (text, images, music)', 'Only recognizes faces', 'Only translates languages'], optsHi: ['Only analyzes existing data', 'Creates new content (text, images, music)', 'Only recognizes faces', 'Only translates languages'],
                  c: 1, ex: 'Generative AI CREATES new content! It generates text, images, music, code, and video that did not exist before — unlike older AI that only analyzed.', exHi: 'Generative AI CREATES new content! It generates text, images, music, code, and video that did not exist before — unlike older AI that only analyzed.' },
                { q: 'ChatGPT is an example of which type of GenAI?', qHi: 'ChatGPT is an example of which type of GenAI?',
                  opts: ['Image generation', 'Music generation', 'Large Language Model', 'Video generation'], optsHi: ['Image generation', 'Music generation', 'Large Language Model', 'Video generation'],
                  c: 2, ex: 'ChatGPT is an LLM (Large Language Model)! Trained on trillions of words, it generates human-like text responses.', exHi: 'ChatGPT is an LLM (Large Language Model)! Trained on trillions of words, it generates human-like text responses.' },
                { q: 'DALL-E and Midjourney generate?', qHi: 'DALL-E and Midjourney generate?',
                  opts: ['Music', 'Code', 'Videos', 'Images from text descriptions'], optsHi: ['Music', 'Code', 'Videos', 'Images from text descriptions'],
                  c: 3, ex: 'DALL-E and Midjourney generate images from text! "A robot teaching AI in Jaipur" → AI creates a photorealistic image of exactly that!', exHi: 'DALL-E and Midjourney generate images from text! "A robot teaching AI in Jaipur" → AI creates a photorealistic image of exactly that!' },
                { q: 'What technology do image generators like DALL-E use?', qHi: 'What technology do image generators like DALL-E use?',
                  opts: ['Decision Trees', 'Diffusion Models', 'Linear Regression', 'Random Forests'], optsHi: ['Decision Trees', 'Diffusion Models', 'Linear Regression', 'Random Forests'],
                  c: 1, ex: 'Diffusion Models! They start with random noise (like a TV static) and gradually "denoise" it into a clear image matching the text description.', exHi: 'Diffusion Models! They start with random noise (like a TV static) and gradually "denoise" it into a clear image matching the text description.' },
                { q: 'GitHub Copilot helps developers by?', qHi: 'GitHub Copilot helps developers by?',
                  opts: ['Testing their code', 'Writing code automatically from descriptions', 'Finding GitHub repositories', 'Managing servers'], optsHi: ['Testing their code', 'Writing code automatically from descriptions', 'Finding GitHub repositories', 'Managing servers'],
                  c: 1, ex: 'GitHub Copilot writes code for you! Describe what you want in a comment, and AI writes the complete function. Indian developers are 55% faster with it!', exHi: 'GitHub Copilot writes code for you! Describe what you want in a comment, and AI writes the complete function. Indian developers are 55% faster with it!' },
                { q: 'Which Indian industry is experimenting with Generative AI for VFX?', qHi: 'Which Indian industry is experimenting with Generative AI for VFX?',
                  opts: ['IT sector only', 'Agriculture', 'Bollywood', 'Banking'], optsHi: ['IT sector only', 'Agriculture', 'Bollywood', 'Banking'],
                  c: 2, ex: 'Bollywood is using GenAI for VFX, de-aging actors, and creating backgrounds! Indian film industry is embracing AI for cost reduction.', exHi: 'Bollywood is using GenAI for VFX, de-aging actors, and creating backgrounds! Indian film industry is embracing AI for cost reduction.' },
                { q: 'Suno AI and Udio generate?', qHi: 'Suno AI and Udio generate?',
                  opts: ['Text stories', 'Images', 'Full songs with vocals and music', 'Computer code'], optsHi: ['Text stories', 'Images', 'Full songs with vocals and music', 'Computer code'],
                  c: 2, ex: 'Music! Suno AI generates complete songs with instruments and vocals from a text prompt like "A sad Hindi song about Mumbai rains"!', exHi: 'Music! Suno AI generates complete songs with instruments and vocals from a text prompt like "A sad Hindi song about Mumbai rains"!' },
                { q: 'Voice cloning AI like ElevenLabs can clone a voice from?', qHi: 'Voice cloning AI like ElevenLabs can clone a voice from?',
                  opts: ['1 hour of audio', '5 minutes', '5 seconds', 'The voice cannot be cloned'], optsHi: ['1 hour of audio', '5 minutes', '5 seconds', 'The voice cannot be cloned'],
                  c: 2, ex: 'Just 5 seconds of audio! AI can clone voice characteristics and generate new speech in that voice. Used for audiobooks, dubbing, and accessibility!', exHi: 'Just 5 seconds of audio! AI can clone voice characteristics and generate new speech in that voice. Used for audiobooks, dubbing, and accessibility!' },
                { q: 'What was the main limitation of AI before 2020 compared to GenAI?', qHi: 'What was the main limitation of AI before 2020 compared to GenAI?',
                  opts: ['AI was too slow', 'AI could only analyze, not create', 'AI was too expensive', 'AI required too much electricity'], optsHi: ['AI was too slow', 'AI could only analyze, not create', 'AI was too expensive', 'AI required too much electricity'],
                  c: 1, ex: 'Before GenAI, AI could only ANALYZE and classify existing data. Generative AI changed this — now AI can create entirely new content!', exHi: 'Before GenAI, AI could only ANALYZE and classify existing data. Generative AI changed this — now AI can create entirely new content!' },
                { q: 'IIT researchers use Generative AI for?', qHi: 'IIT researchers use Generative AI for?',
                  opts: ['Making social media apps', 'Drug discovery for new medicines', 'Building mobile games', 'Social media marketing'], optsHi: ['Making social media apps', 'Drug discovery for new medicines', 'Building mobile games', 'Social media marketing'],
                  c: 1, ex: 'Drug discovery! IIT researchers use GenAI to design new drug molecules for diseases like cancer and diabetes — AI accelerates medicine development!', exHi: 'Drug discovery! IIT researchers use GenAI to design new drug molecules for diseases like cancer and diabetes — AI accelerates medicine development!' }
              ]
            }
          ]
        }
,
        {
          id: 'c10_2', icon: '✍️', title: 'Prompt Engineering — Master the Art', titleHi: 'Prompt Engineering — कला में महारत', xp: 35,
          slides: [
            { type: 'teach', bot: 'c', botName: 'PromptBot ✍️', botNameHi: 'PromptBot ✍️',
              tag: 'CLASS 10 · PROMPT ENGINEERING · CHAPTER 2', tagHi: 'कक्षा 10 · Prompt Engineering · अध्याय 2',
              title: 'Prompt Engineering — India\'s Hottest New Job!', titleHi: 'Prompt Engineering — भारत की सबसे गर्म नई नौकरी!',
              intro: 'The exact words you use with AI completely change the quality of results. This is a skill that can earn you ₹1-3 crore/year!',
              introHi: 'AI के साथ आप जो शब्द उपयोग करते हैं वे परिणामों की गुणवत्ता पूरी तरह बदलते हैं। यह कौशल ₹1-3 करोड़/वर्ष दिला सकता है!',
              speech: `<span class="hot">Bad prompt:</span> "Explain photosynthesis"<br>
→ Generic textbook answer 😴<br><br>
<span class="hi">Great prompt:</span> "Explain photosynthesis to a Class 10 CBSE student using a kitchen cooking analogy, in 3 bullet points, with one surprising fact"<br>
→ Precise, engaging, exactly what you need! 🤩<br><br>
<span class="em">Remember CRAFT:</span><br>
🎭 <strong>C</strong>ontext — Who you are<br>
🎬 <strong>R</strong>ole — What AI should act as<br>
🎯 <strong>A</strong>ction — What exactly to do<br>
📐 <strong>F</strong>ormat — How to structure it<br>
🎓 <strong>T</strong>one — What style`,
              speechHi: `<span class="hot">खराब prompt:</span> "Explain photosynthesis"<br>
→ साधारण टेक्स्टबुक जवाब 😴<br><br>
<span class="hi">बेहतरीन prompt:</span> "Class 10 CBSE छात्र को रसोई के उदाहरण से photosynthesis समझाएं, 3 bullet points में"<br>
→ सटीक, रोचक जवाब! 🤩<br><br>
<span class="em">CRAFT याद करें:</span><br>
🎭 <strong>C</strong>ontext — आप कौन हैं<br>
🎬 <strong>R</strong>ole — AI को क्या बनाएं<br>
🎯 <strong>A</strong>ction — क्या करना है`
            },
            { type: 'concepts', tag: 'CLASS 10 · PROMPT ENGINEERING · CHAPTER 2', tagHi: 'कक्षा 10 · Prompt Engineering · अध्याय 2',
              title: 'Advanced Prompting Techniques', titleHi: 'उन्नत Prompting तकनीकें',
              intro: 'These techniques are used by professional prompt engineers at top AI companies:',
              introHi: 'ये तकनीकें शीर्ष AI कंपनियों के पेशेवर prompt engineers उपयोग करते हैं:',
              items: [
                { em: '🔗', l: 'Chain of Thought', lHi: 'Chain of Thought', d: 'Add "Think step by step" — AI shows reasoning. Improves math/logic accuracy by 40%!', dHi: '"Step by step सोचो" जोड़ें — AI तर्क दिखाता है। गणित/तर्क सटीकता 40% बढ़ती है!' },
                { em: '🎯', l: 'Few-Shot Prompting', lHi: 'Few-Shot Prompting', d: 'Show examples of the exact format you want before asking your question. AI learns your pattern!', dHi: 'अपना प्रश्न पूछने से पहले उदाहरण दिखाएं। AI आपका पैटर्न सीखता है!' },
                { em: '🎭', l: 'Persona / Role', lHi: 'Persona / भूमिका', d: '"You are a Socratic tutor. Never give direct answers. Ask questions that lead student to discover the answer."', dHi: '"आप एक Socratic शिक्षक हैं। सीधे जवाब कभी न दें। ऐसे सवाल पूछें जो छात्र को जवाब खुद खोजने दें।"' },
                { em: '🌡️', l: 'Temperature Control', lHi: 'Temperature नियंत्रण', d: 'Temperature 0 = always picks most likely word (factual). Temperature 1 = more random (creative). Use 0.7 for balanced responses.', dHi: 'Temperature 0 = सबसे संभावित शब्द (तथ्यात्मक)। Temperature 1 = रचनात्मक।' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 10 · PROMPT ENGINEERING · CHAPTER 2', tagHi: 'कक्षा 10 · Prompt Engineering · अध्याय 2',
              title: 'Prompt Engineering Quiz!', titleHi: 'Prompt Engineering प्रश्नोत्तरी!',
              questions: [
                { q: 'Which prompt will get the BEST response from ChatGPT?', qHi: 'कौन सा prompt ChatGPT से सबसे अच्छा जवाब देगा?', opts: ['Explain Newton\'s laws', 'Explain Newton\'s 3 laws of motion for a Class 10 CBSE student using everyday examples, in bullet points', 'Newton laws simple', 'Physics help'], optsHi: ['Newton के नियम समझाएं', 'Class 10 CBSE छात्र को Newton के 3 गति के नियम रोज़मर्रा के उदाहरणों से समझाएं, bullet points में', 'Newton आसान', 'Physics मदद'], c: 1, ex: 'Option 2 uses CRAFT! Context (Class 10 CBSE), Action (explain 3 laws), Format (bullet points), with real examples. Specificity = brilliant results!', exHi: 'विकल्प 2 CRAFT उपयोग करता है! Context, Action, Format सब सही।' },
                { q: 'What does "Chain of Thought" prompting do?', qHi: '"Chain of Thought" prompting क्या करता है?', opts: ['Links multiple AI models', 'Makes AI show step-by-step reasoning, improving accuracy', 'Connects prompts in a chain', 'Makes responses longer'], optsHi: ['कई AI मॉडल जोड़ता है', 'AI को चरण-दर-चरण तर्क दिखाने पर मजबूर करता है, सटीकता बढ़ाता है', 'Prompts श्रृंखला में जोड़ता है', 'जवाब लंबे बनाता है'], c: 1, ex: 'Chain of Thought = ask AI to "think step by step" before answering. This reduces errors and improves accuracy on math/logic tasks by up to 40%!', exHi: 'Chain of Thought = AI को "step by step सोचने" के लिए कहें। गणित/तर्क पर 40% तक सटीकता बढ़ती है!' }
              ]
            }
          ]
        }
      ]
    }]
  },

  11: {
    label: 'Class 11', labelHi: 'कक्षा 11', badge: '🏆 Expert', badgeHi: '🏆 विशेषज्ञ',
    badgeStyle: 'background:rgba(255,101,132,.15);color:#FF6584;border:1px solid rgba(255,101,132,.3)',
    emoji: '🏆',
    subjects: [{
      id: 's11_adv', icon: '🦙', name: 'Advanced AI, Python & Building Real Systems', nameHi: 'Advanced AI, Python और Real Systems बनाना',
      chapters: [
        {
          id: 'c11_1', icon: '🐍', title: 'Python for AI — From Zero to Building', titleHi: 'Python for AI — Zero से Building तक', xp: 55,
          slides: [
            { type: 'teach', bot: 'b', botName: 'PyAIBot 🐍', botNameHi: 'PyAIBot 🐍',
              tag: 'CLASS 11 · PYTHON FOR AI · CHAPTER 1', tagHi: 'कक्षा 11 · Python for AI · अध्याय 1',
              title: 'Python — The Language That Powers All AI!', titleHi: 'Python — वह भाषा जो सारी AI चलाती है!',
              intro: 'Class 11 is where you start BUILDING with AI. Python is the foundation. By the end of this chapter, you will have written real working AI code.',
              introHi: 'Class 11 में आप AI BUILD करना शुरू करते हैं। Python foundation है। इस chapter के अंत तक आपने real AI code लिखा होगा।',
              speech: `<span class="hi">Why Python for AI?</span><br><br>
🥇 <span class="em">Most popular</span> — 30+ million developers worldwide<br>
📚 <span class="cool">NumPy, Pandas, scikit-learn, TensorFlow, PyTorch</span> — all Python<br>
🏭 <span class="hi">Industry standard</span> — Google, Meta, OpenAI all use Python<br>
⚡ <span class="em">Fast to write</span> — 1 Python line = 10 Java lines<br><br>
<span class="cool">What you'll build in Class 11:</span><br>
✅ Train your own ML model<br>
✅ Build a spam email detector<br>
✅ Create a movie recommendation system<br>
✅ Make your first neural network<br>
✅ Connect to AI APIs like OpenAI<br><br>
<span class="hi">Python AI Stack:</span><br>
📊 <strong>NumPy</strong> — Mathematical operations on arrays<br>
🐼 <strong>Pandas</strong> — Data manipulation & analysis<br>
📈 <strong>Matplotlib</strong> — Data visualization<br>
🤖 <strong>scikit-learn</strong> — Classical ML algorithms<br>
🧠 <strong>TensorFlow/Keras</strong> — Deep Learning<br>
🦙 <strong>OpenAI/HuggingFace</strong> — LLMs & GenAI`,
              speechHi: `<span class="hi">Python for AI क्यों?</span><br><br>
🥇 <span class="em">सबसे popular</span> — 3 करोड़+ developers worldwide<br>
📚 <span class="cool">NumPy, Pandas, TensorFlow, PyTorch</span> — सब Python<br>
🏭 <span class="hi">Industry standard</span> — Google, Meta, OpenAI सब Python<br><br>
<span class="cool">Class 11 में आप क्या build करेंगे:</span><br>
✅ अपना ML model train करेंगे<br>
✅ Spam email detector बनाएंगे<br>
✅ Movie recommendation system बनाएंगे<br>
✅ पहला neural network बनाएंगे`
            },
            { type: 'code', tag: 'CLASS 11 · PYTHON DATA ANALYSIS',
              title: 'Real Python: Analyze Student Data!', titleHi: 'Real Python: Student Data Analyze करो!',
              intro: 'This code loads and analyzes a dataset — just like data scientists do at Google and Zomato.',
              introHi: 'यह code एक dataset load और analyze करता है — जैसे data scientists Google और Zomato में करते हैं।',
              files: [{
                name: 'student_analysis.py',
                lines: [
                  { t:'c', v:'# Real Data Analysis with Python - Class 11' },
                  { t:'kw', v:'import' }, { t:'n', v:' pandas ' }, { t:'kw', v:'as' }, { t:'n', v:' pd' },
                  { t:'kw', v:'import' }, { t:'n', v:' numpy ' }, { t:'kw', v:'as' }, { t:'n', v:' np' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Create student dataset (in real life, you load from CSV)' },
                  { t:'v', v:'data' }, { t:'n', v:' = {' },
                  { t:'s', v:"  'name'" }, { t:'n', v:": ['Ravi','Priya','Amit','Sneha','Rohit']," },
                  { t:'s', v:"  'marks'" }, { t:'n', v:': [85, 92, 67, 88, 73],' },
                  { t:'s', v:"  'attendance'" }, { t:'n', v:': [90, 95, 70, 88, 80]' },
                  { t:'n', v:'}' },
                  { t:'v', v:'df' }, { t:'n', v:' = pd.' }, { t:'fn', v:'DataFrame' }, { t:'n', v:'(data)' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Analyze the data' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'"Average marks:"' }, { t:'n', v:', df[' }, { t:'s', v:"'marks'" }, { t:'n', v:'].' }, { t:'fn', v:'mean' }, { t:'n', v:'())' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'"Top student:"' }, { t:'n', v:', df.' }, { t:'fn', v:'loc' }, { t:'n', v:"[df['marks']." }, { t:'fn', v:'idxmax' }, { t:'n', v:"()]['name'])"},
                  { t:'b', v:'' },
                  { t:'c', v:'# Predict: will student pass? (marks >= 75 AND attendance >= 75)' },
                  { t:'v', v:"df['will_pass']" }, { t:'n', v:" = (df['marks'] >= 75) & (df['attendance'] >= 75)" },
                  { t:'fn', v:'print' }, { t:'n', v:'(df[[' }, { t:'s', v:"'name','marks','will_pass'" }, { t:'n', v:']])' },
                  { t:'b', v:'' },
                  { t:'o', v:'Average marks: 81.0' },
                  { t:'o', v:'Top student: Priya' },
                  { t:'o', v:'   name  marks  will_pass' },
                  { t:'o', v:'0  Ravi     85       True' },
                  { t:'o', v:'1  Priya    92       True' },
                  { t:'o', v:'2  Amit     67      False' },
                ]
              }],
              extra: `<div class="callout cal-tip"><span class="cal-icon">💡</span><div><strong>Try it FREE!</strong> Go to <strong>google.com/colab</strong> — Google Colab gives you a free Python environment in browser. Paste and run this code! Change the marks and see what happens.</div></div>`
            },
            { type: 'code', tag: 'CLASS 11 · PYTHON ML MODEL',
              title: 'Build Your First ML Classifier!', titleHi: 'अपना पहला ML Classifier बनाओ!',
              intro: 'Train an AI model that predicts if a student will get admission — using real scikit-learn.',
              introHi: 'AI model train करो जो predict करे कि student को admission मिलेगी — real scikit-learn उपयोग करके।',
              files: [{
                name: 'admission_predictor.py',
                lines: [
                  { t:'c', v:'# Train an AI to predict college admission - Class 11' },
                  { t:'kw', v:'from' }, { t:'n', v:' sklearn.tree ' }, { t:'kw', v:'import' }, { t:'n', v:' DecisionTreeClassifier' },
                  { t:'kw', v:'from' }, { t:'n', v:' sklearn.model_selection ' }, { t:'kw', v:'import' }, { t:'n', v:' train_test_split' },
                  { t:'kw', v:'from' }, { t:'n', v:' sklearn.metrics ' }, { t:'kw', v:'import' }, { t:'n', v:' accuracy_score' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Features: [12th_marks, entrance_score, extracurricular]' },
                  { t:'c', v:'# Label: 1 = Admitted, 0 = Rejected' },
                  { t:'v', v:'X' }, { t:'n', v:' = [[92,88,1],[85,72,0],[67,45,0],[95,91,1],[78,68,1],[55,40,0]]' },
                  { t:'v', v:'y' }, { t:'n', v:' = [1, 1, 0, 1, 0, 0]' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Split into training (80%) and testing (20%)' },
                  { t:'v', v:'X_train, X_test, y_train, y_test' }, { t:'n', v:' = ' }, { t:'fn', v:'train_test_split' }, { t:'n', v:'(X, y, test_size=0.2)' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Train the model' },
                  { t:'v', v:'model' }, { t:'n', v:' = ' }, { t:'fn', v:'DecisionTreeClassifier' }, { t:'n', v:'()' },
                  { t:'fn', v:'model' }, { t:'n', v:'.' }, { t:'fn', v:'fit' }, { t:'n', v:'(X_train, y_train)' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Test accuracy' },
                  { t:'v', v:'predictions' }, { t:'n', v:' = model.' }, { t:'fn', v:'predict' }, { t:'n', v:'(X_test)' },
                  { t:'fn', v:'print' }, { t:'n', v:'(f' }, { t:'s', v:'"Accuracy: {accuracy_score(y_test, predictions)*100:.1f}%"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Predict new student: marks=88, score=76, extra=1' },
                  { t:'v', v:'result' }, { t:'n', v:' = model.' }, { t:'fn', v:'predict' }, { t:'n', v:'([[88, 76, 1]])' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'"Admission:"' }, { t:'n', v:' , ' }, { t:'s', v:'"YES ✅" if result[0]==1 else "NO ❌"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'o', v:'Accuracy: 100.0%' },
                  { t:'o', v:'Admission: YES ✅' },
                ]
              }]
            },
            { type: 'quiz', tag: 'CLASS 11 · PYTHON FOR AI QUIZ',
              title: '🧩 Python for AI — Practice Quiz (10 Questions)', titleHi: '🧩 Python for AI — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'Which Python library is used for creating DataFrames to analyze tabular data?', qHi: 'Tabular data analyze करने के लिए DataFrames कौन सी Python library बनाती है?', opts: ['NumPy','Pandas','Matplotlib','TensorFlow'], optsHi: ['NumPy','Pandas','Matplotlib','TensorFlow'], c: 1, ex: 'Pandas! It creates DataFrames — spreadsheet-like structures in Python. Used by every data scientist for loading, cleaning, analyzing datasets.', exHi: 'Pandas! यह DataFrames बनाती है — Python में spreadsheet जैसी structures।' },
                { q: 'What does train_test_split() do in scikit-learn?', qHi: 'scikit-learn में train_test_split() क्या करता है?', opts: ['Splits Python code','Divides data into training and testing sets','Installs packages','Visualizes data'], optsHi: ['Python code split करता है','Data को training और testing sets में divide करता है','Packages install करता है','Data visualize करता है'], c: 1, ex: 'Splits data into training and testing sets! Typically 80% for training (model learns from this) and 20% for testing (checks how well model learned on unseen data).', exHi: 'Data को training और testing sets में divide करता है! आमतौर पर 80% training और 20% testing।' },
                { q: 'model.fit(X_train, y_train) does which of the following?', qHi: 'model.fit(X_train, y_train) क्या करता है?', opts: ['Makes predictions','Trains the model on training data','Tests model accuracy','Imports libraries'], optsHi: ['Predictions बनाता है','Training data पर model train करता है','Model accuracy test करता है','Libraries import करता है'], c: 1, ex: 'Trains the model! .fit() is where the actual learning happens. The model analyzes X_train (inputs) and y_train (correct answers) and adjusts its internal parameters.', exHi: 'Model train करता है! .fit() में actual learning होती है।' },
                { q: 'Which library is best for Deep Learning in Python?', qHi: 'Python में Deep Learning के लिए कौन सी library best है?', opts: ['Pandas','Matplotlib','TensorFlow/Keras','NumPy'], optsHi: ['Pandas','Matplotlib','TensorFlow/Keras','NumPy'], c: 2, ex: 'TensorFlow/Keras! TensorFlow is made by Google specifically for deep learning. Keras is its user-friendly interface. Used for neural networks, image recognition, NLP.', exHi: 'TensorFlow/Keras! TensorFlow Google ने बनाया है specifically deep learning के लिए।' },
                { q: 'What is accuracy_score() used for?', qHi: 'accuracy_score() किसके लिए use होता है?', opts: ['To improve model','To measure what % of predictions were correct','To train the model','To load data'], optsHi: ['Model improve करने के लिए','कितने % predictions correct थे measure करने के लिए','Model train करने के लिए','Data load करने के लिए'], c: 1, ex: 'Measures prediction accuracy! If model made 100 predictions and 92 were correct, accuracy = 92%. This tells you how good your trained AI model is.', exHi: 'Prediction accuracy measure करता है! 100 predictions में 92 सही = 92% accuracy।' },
              ]
            }
          ]
        },
        {
          id: 'c11_2', icon: '🦙', title: 'Large Language Models — How ChatGPT Actually Works', titleHi: 'Large Language Models — ChatGPT Actually कैसे काम करता है', xp: 55,
          slides: [
            { type: 'teach', bot: 'a', botName: 'GPTBot 🦙', botNameHi: 'GPTBot 🦙',
              tag: 'CLASS 11 · LLMs · CHAPTER 2', tagHi: 'कक्षा 11 · LLMs · अध्याय 2',
              title: 'The Technology Behind ChatGPT!', titleHi: 'ChatGPT के पीछे की तकनीक!',
              intro: 'ChatGPT reached 100M users in 60 days — faster than any technology in history. Understanding it gives you a massive career advantage.',
              introHi: 'ChatGPT ने 60 दिनों में 10 करोड़ यूजर पाए — इतिहास में सबसे तेज़।',
              speech: `<span class="hi">LLM = Large Language Model</span><br><br>
"Large" = <span class="em">100 billion to 1 trillion parameters</span><br>
"Language" = <span class="cool">trained on text — books, websites, code</span><br>
"Model" = <span class="hi">mathematical function that predicts next word</span><br><br>
GPT-4 was trained on:<br>
📚 <strong>570GB</strong> of text from the internet<br>
📖 <strong>All of Wikipedia</strong> (3.8 billion words)<br>
💻 <strong>GitHub code</strong> in every programming language<br>
📰 <strong>News articles</strong> from 1990s to 2023<br><br>
<span class="em">How it generates text:</span><br>
You type: <span class="cool">"The capital of India is..."</span><br>
LLM predicts: <span class="hi">"New" (98%) > "Delhi" (97%)</span><br>
It just does this <span class="em">one word at a time!</span><br><br>
The secret? <span class="hi">TRANSFORMER ARCHITECTURE</span><br>
Invented by Google in 2017 → Changed AI forever`,
              speechHi: `<span class="hi">LLM = Large Language Model</span><br><br>
"Large" = <span class="em">100 अरब से 1 trillion parameters</span><br>
"Language" = <span class="cool">text पर train — books, websites, code</span><br>
"Model" = <span class="hi">mathematical function जो next word predict करे</span><br><br>
GPT-4 को train किया गया:<br>
📚 Internet से <strong>570GB</strong> text पर<br>
📖 <strong>पूरी Wikipedia</strong> पर<br>
💻 <strong>GitHub code</strong> पर<br><br>
<span class="em">Text कैसे generate करता है:</span><br>
आप type करते हैं: <span class="cool">"भारत की राजधानी..."</span><br>
LLM predict करता है: <span class="hi">"नई" (98%) → "दिल्ली" (97%)</span><br>
यह बस <span class="em">एक word at a time करता है!</span>`
            },
            { type: 'deep', tag: 'CLASS 11 · TRANSFORMER ARCHITECTURE',
              title: 'Attention Mechanism — The Key Innovation', titleHi: 'Attention Mechanism — The Key Innovation',
              intro: 'The "Attention is All You Need" paper by Google in 2017 changed AI forever.',
              introHi: 'Google के 2017 के paper "Attention is All You Need" ने AI को हमेशा के लिए बदल दिया।',
              content: [
                { h: 'What is "Attention" in AI?', hHi: 'AI में "Attention" क्या है?', p: 'When processing a sentence, Attention lets the model focus on the most relevant words. In "The bank by the river was flooded" — Attention knows "bank" means river bank, not a financial bank, because it attends to "river".', pHi: 'Sentence process करते समय, Attention model को सबसे relevant words पर focus करने देता है।' },
                { h: 'Why Transformers Beat Previous AI', hHi: 'Transformers पिछले AI को क्यों हराते हैं', p: 'Previous RNNs processed words one at a time (slow). Transformers process ALL words simultaneously with attention (fast + better understanding). This parallelism allowed training on massive datasets.', pHi: 'पिछले RNNs एक-एक word process करते थे (slow)। Transformers सब words simultaneously process करते हैं (fast + better)।' },
                { h: 'Parameters — What Makes LLMs "Large"', hHi: 'Parameters — LLMs को "Large" क्या बनाता है', p: 'Parameters are the adjustable numbers inside a model. GPT-4 has ~1.7 trillion parameters — that\'s 1.7 × 10^12 numbers, all fine-tuned during training to predict language patterns.', pHi: 'Parameters model के अंदर adjustable numbers हैं। GPT-4 में ~1.7 trillion parameters हैं।' },
              ]
            },
            { type: 'code', tag: 'CLASS 11 · USING LLM API',
              title: 'Call ChatGPT API with Python!', titleHi: 'Python से ChatGPT API Call करो!',
              intro: 'This is how every AI startup connects to LLMs — a simple API call.',
              introHi: 'हर AI startup LLMs से ऐसे connect करता है — एक simple API call।',
              files: [{
                name: 'chatgpt_api.py',
                lines: [
                  { t:'c', v:'# Connect to ChatGPT/OpenRouter API - Class 11' },
                  { t:'kw', v:'import' }, { t:'n', v:' requests' },
                  { t:'b', v:'' },
                  { t:'v', v:'API_KEY' }, { t:'n', v:' = ' }, { t:'s', v:'"your-openrouter-api-key"' },
                  { t:'b', v:'' },
                  { t:'kw', v:'def' }, { t:'fn', v:' ask_ai' }, { t:'n', v:'(question):' },
                  { t:'v', v:'    response' }, { t:'n', v:' = requests.' }, { t:'fn', v:'post' }, { t:'n', v:'(' },
                  { t:'s', v:'        "https://openrouter.ai/api/v1/chat/completions",' },
                  { t:'n', v:'        headers={' }, { t:'s', v:'"Authorization"' }, { t:'n', v:': f' }, { t:'s', v:'"Bearer {API_KEY}"' }, { t:'n', v:'},' },
                  { t:'n', v:'        json={' },
                  { t:'s', v:'            "model"' }, { t:'n', v:': ' }, { t:'s', v:'"meta-llama/llama-3.1-8b-instruct:free",' },
                  { t:'s', v:'            "messages"' }, { t:'n', v:': [{' }, { t:'s', v:'"role"' }, { t:'n', v:':' }, { t:'s', v:'"user"' }, { t:'n', v:','}, { t:'s', v:'"content"' }, { t:'n', v:': question}]' },
                  { t:'n', v:'        }' },
                  { t:'n', v:'    )' },
                  { t:'kw', v:'    return' }, { t:'n', v:' response.' }, { t:'fn', v:'json' }, { t:'n', v:"()['choices'][0]['message']['content']" },
                  { t:'b', v:'' },
                  { t:'c', v:'# Test it!' },
                  { t:'v', v:'answer' }, { t:'n', v:' = ' }, { t:'fn', v:'ask_ai' }, { t:'n', v:'(' }, { t:'s', v:'"Explain neural networks in 2 sentences"' }, { t:'n', v:')' },
                  { t:'fn', v:'print' }, { t:'n', v:'(answer)' },
                  { t:'b', v:'' },
                  { t:'o', v:'Neural networks are AI systems inspired by the human brain,' },
                  { t:'o', v:'consisting of layers of interconnected nodes that learn' },
                  { t:'o', v:'patterns from data through a process called backpropagation.' },
                ]
              }],
              extra: `<div class="callout cal-info"><span class="cal-icon">🚀</span><div><strong>Free API!</strong> OpenRouter.ai gives you free access to many AI models including Llama, Mistral. Sign up and get your API key — it's free to start building!</div></div>`
            },
            { type: 'quiz', tag: 'CLASS 11 · LLMs QUIZ',
              title: '🧩 LLMs & ChatGPT — Practice Quiz (10 Questions)', titleHi: '🧩 LLMs और ChatGPT — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What does "GPT" stand for?', qHi: '"GPT" का full form क्या है?', opts: ['General Purpose Technology','Generative Pre-trained Transformer','Google Processing Tool','Guided Pattern Training'], optsHi: ['General Purpose Technology','Generative Pre-trained Transformer','Google Processing Tool','Guided Pattern Training'], c: 1, ex: 'Generative Pre-trained Transformer! Generative = creates new content. Pre-trained = trained on massive data before fine-tuning. Transformer = the neural network architecture.', exHi: 'Generative Pre-trained Transformer! Generative = नया content बनाता है। Pre-trained = massive data पर पहले train किया।' },
                { q: 'How many days did ChatGPT take to reach 100 million users?', qHi: 'ChatGPT को 10 करोड़ users तक पहुँचने में कितने दिन लगे?', opts: ['6 months','1 year','60 days','2 weeks'], optsHi: ['6 महीने','1 साल','60 दिन','2 हफ्ते'], c: 2, ex: '60 days! ChatGPT reached 100M users in just 60 days — faster than Instagram (2.5 years), TikTok (9 months), and Netflix (3.5 years). The fastest tech adoption in history!', exHi: '60 दिन! ChatGPT ने 10 करोड़ users 60 दिनों में पाए — इतिहास में सबसे तेज़।' },
                { q: 'Transformers process words in what order?', qHi: 'Transformers words को किस order में process करते हैं?', opts: ['One at a time like reading','Backwards only','All words simultaneously with attention','Randomly'], optsHi: ['एक-एक करके जैसे पढ़ना','Backwards only','Attention के साथ सब words simultaneously','Randomly'], c: 2, ex: 'All simultaneously! This is what makes Transformers revolutionary. Unlike older RNNs that read word-by-word (slow), Transformers process all words at once using attention mechanisms.', exHi: 'सब simultaneously! यही Transformers को revolutionary बनाता है।' },
                { q: 'How does an LLM generate the next word?', qHi: 'LLM next word कैसे generate करता है?', opts: ['Random selection','Copies from training data','Predicts most probable next word','Uses a dictionary'], optsHi: ['Random selection','Training data से copy करता है','Most probable next word predict करता है','Dictionary use करता है'], c: 2, ex: 'Predicts the most probable next word! Given "The Eiffel Tower is in...", the model calculates probability of every possible next word and picks the highest: "Paris" = 99.7%.', exHi: 'Most probable next word predict करता है! हर possible word की probability calculate करके highest चुनता है।' },
                { q: 'The Transformer architecture was invented by which company in 2017?', qHi: 'Transformer architecture किस company ने 2017 में invent किया?', opts: ['OpenAI','Meta','Google','Microsoft'], optsHi: ['OpenAI','Meta','Google','Microsoft'], c: 2, ex: 'Google! The landmark paper "Attention is All You Need" by Google Brain team in 2017 introduced Transformers. It became the foundation for GPT, BERT, Gemini, Claude, and all modern LLMs.', exHi: 'Google! 2017 में Google Brain team का paper "Attention is All You Need" ने Transformers introduce किए।' },
              ]
            }
          ]
        },
        {
          id: 'c11_3', icon: '🎨', title: 'Generative AI — Creating Text, Images & Music with AI', titleHi: 'Generative AI — AI से Text, Images और Music बनाना', xp: 55,
          slides: [
            { type: 'teach', bot: 'c', botName: 'GenBot 🎨', botNameHi: 'GenBot 🎨',
              tag: 'CLASS 11 · GENERATIVE AI · CHAPTER 3', tagHi: 'कक्षा 11 · Generative AI · अध्याय 3',
              title: 'Generative AI — AI That Creates!', titleHi: 'Generative AI — AI जो बनाता है!',
              intro: 'Generative AI is the most exciting breakthrough in AI history. It can create text, images, music, video, code — things only humans could do before.',
              introHi: 'Generative AI AI इतिहास का सबसे exciting breakthrough है। यह text, images, music, video, code बना सकता है।',
              speech: `<span class="hi">Generative AI = AI that CREATES</span><br><br>
Before 2022: AI could only analyze and classify<br>
After 2022: AI can <span class="em">generate new content</span>!<br><br>
<span class="cool">What it can create:</span><br>
📝 <strong>Text</strong> → ChatGPT writes essays, code, stories<br>
🖼️ <strong>Images</strong> → Midjourney creates photorealistic art<br>
🎵 <strong>Music</strong> → Suno AI makes songs from a text prompt<br>
🎬 <strong>Video</strong> → Sora (OpenAI) creates 60-second videos<br>
💻 <strong>Code</strong> → GitHub Copilot writes 46% of code at GitHub<br>
🗣️ <strong>Voice</strong> → ElevenLabs clones any voice in 60 seconds<br><br>
<span class="hi">The key models:</span><br>
🔷 <strong>GPT-4 / Claude / Gemini</strong> — Text generation<br>
🎨 <strong>Stable Diffusion / DALL-E</strong> — Image generation<br>
🎵 <strong>MusicGen / Suno</strong> — Music generation<br>
🎬 <strong>Sora / Runway</strong> — Video generation`,
              speechHi: `<span class="hi">Generative AI = AI जो CREATE करता है</span><br><br>
2022 से पहले: AI सिर्फ analyze और classify कर सकता था<br>
2022 के बाद: AI <span class="em">नया content बना सकता है</span>!<br><br>
<span class="cool">यह क्या बना सकता है:</span><br>
📝 <strong>Text</strong> → ChatGPT essays, code, stories लिखता है<br>
🖼️ <strong>Images</strong> → Midjourney photorealistic art बनाता है<br>
🎵 <strong>Music</strong> → Suno AI songs बनाता है text prompt से<br>
💻 <strong>Code</strong> → GitHub Copilot 46% code लिखता है`
            },
            { type: 'concepts', tag: 'CLASS 11 · DIFFUSION MODELS',
              title: 'How AI Creates Images — Diffusion Models', titleHi: 'AI Images कैसे बनाता है — Diffusion Models',
              intro: 'Understanding how AI generates photorealistic images from text prompts.',
              introHi: 'AI text prompts से photorealistic images कैसे generate करता है।',
              items: [
                { em:'❄️', l:'Step 1: Add Noise', lHi:'Step 1: Noise Add करें', d:'AI first DESTROYS a real image by adding random noise until it\'s unrecognizable. Like sandstorm covering a photo.', dHi:'AI पहले एक real image को random noise add करके DESTROY करता है।' },
                { em:'🔄', l:'Step 2: Learn to Denoise', lHi:'Step 2: Denoise करना सीखें', d:'The model trains to REVERSE this — learning to remove noise step by step. Like cleaning a dirty photo.', dHi:'Model REVERSE करना सीखता है — step by step noise remove करना।' },
                { em:'✨', l:'Step 3: Generate from Noise', lHi:'Step 3: Noise से Generate करें', d:'At generation time, start with pure random noise. Gradually denoise it while being guided by your text prompt!', dHi:'Generation के समय, pure random noise से शुरू करें। Text prompt से guide होते हुए gradually denoise करें!' },
                { em:'🎯', l:'Text Guidance (CLIP)', lHi:'Text Guidance (CLIP)', d:'CLIP model aligns text and images. "A red car on a mountain" → AI creates exactly that visual concept.', dHi:'CLIP model text और images को align करता है। "पहाड़ पर लाल car" → AI exactly वह visual बनाता है।' },
                { em:'⚡', l:'Stable Diffusion', lHi:'Stable Diffusion', d:'Open source image AI from Stability AI. Runs on your laptop! 10 million+ images generated daily.', dHi:'Stability AI का open source image AI। आपके laptop पर चलता है! रोज 1 करोड़+ images।' },
                { em:'🌟', l:'DALL-E 3', lHi:'DALL-E 3', d:'OpenAI\'s image AI integrated in ChatGPT Plus. Type any description → get a photorealistic image in 30 seconds!', dHi:'OpenAI का image AI ChatGPT Plus में integrated। कोई description type करो → 30 seconds में image!' },
              ]
            },
            { type: 'quiz', tag: 'CLASS 11 · GENERATIVE AI QUIZ',
              title: '🧩 Generative AI — Practice Quiz (10 Questions)', titleHi: '🧩 Generative AI — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What percentage of code at GitHub is written by AI (GitHub Copilot)?', qHi: 'GitHub पर कितना % code AI (GitHub Copilot) लिखता है?', opts: ['5%','10%','46%','90%'], optsHi: ['5%','10%','46%','90%'], c: 2, ex: '46%! As of 2024, GitHub Copilot writes 46% of the code committed to GitHub repositories. In some companies, developers report 70%+ of their code is AI-generated!', exHi: '46%! 2024 तक, GitHub Copilot GitHub repositories में 46% code लिखता है।' },
                { q: 'Which model architecture is used by most image generation AI like Stable Diffusion?', qHi: 'Stable Diffusion जैसे image generation AI कौन सी architecture use करते हैं?', opts: ['Transformer','GAN','Diffusion Model','RNN'], optsHi: ['Transformer','GAN','Diffusion Model','RNN'], c: 2, ex: 'Diffusion Models! They work by adding noise to images (forward process) then learning to reverse the process (remove noise) while guided by text prompts.', exHi: 'Diffusion Models! ये images में noise add करते हैं फिर reverse करना सीखते हैं।' },
                { q: 'Suno AI can create complete songs from what kind of input?', qHi: 'Suno AI किस input से complete songs बनाता है?', opts: ['Musical notes','A simple text description','Audio samples only','Sheet music'], optsHi: ['Musical notes','Simple text description','Audio samples only','Sheet music'], c: 1, ex: 'A text description! Type "Upbeat Bollywood song about friendship in Hindi" and Suno creates a complete song with vocals, instruments, and lyrics in about 30 seconds!', exHi: 'Text description! "Hindi में friendship के बारे में Bollywood song" type करो और Suno 30 seconds में song बनाता है!' },
                { q: 'DALL-E 3 was created by which organization?', qHi: 'DALL-E 3 किस organization ने बनाया?', opts: ['Google','Meta','OpenAI','Stability AI'], optsHi: ['Google','Meta','OpenAI','Stability AI'], c: 2, ex: 'OpenAI! DALL-E 3 is OpenAI\'s latest image generation model, integrated directly into ChatGPT Plus. Stability AI made Stable Diffusion, which is open-source and free to run locally.', exHi: 'OpenAI! DALL-E 3 OpenAI का latest image generation model है, ChatGPT Plus में integrated।' },
                { q: 'What does the CLIP model do in image generation?', qHi: 'Image generation में CLIP model क्या करता है?', opts: ['Clips images to size','Aligns text descriptions with visual concepts','Speeds up generation','Adds color to images'], optsHi: ['Images को size में clip करता है','Text descriptions को visual concepts से align करता है','Generation speed करता है','Images में color add करता है'], c: 1, ex: 'Aligns text with images! CLIP learned to match text descriptions with corresponding images. It guides the diffusion model to generate images that match your text prompt accurately.', exHi: 'Text को images से align करता है! CLIP ने text descriptions को images के साथ match करना सीखा।' },
              ]
            }
          ]
        },
        {
          id: 'c11_4', icon: '🔗', title: 'RAG Systems — Building AI That Knows Your Data', titleHi: 'RAG Systems — AI बनाना जो आपका Data जानता हो', xp: 55,
          slides: [
            { type: 'teach', bot: 'd', botName: 'RAGBot 🔗', botNameHi: 'RAGBot 🔗',
              tag: 'CLASS 11 · RAG SYSTEMS · CHAPTER 4', tagHi: 'कक्षा 11 · RAG Systems · अध्याय 4',
              title: 'RAG — Teaching AI Your Private Knowledge!', titleHi: 'RAG — AI को आपकी Private Knowledge सिखाना!',
              intro: 'ChatGPT knows everything till 2023 — but it doesn\'t know YOUR company data, school records, or private documents. RAG solves this!',
              introHi: 'ChatGPT 2023 तक सब जानता है — लेकिन वह आपकी company data, school records नहीं जानता। RAG यह solve करता है!'
            },
            { type: 'flow', tag: 'CLASS 11 · RAG ARCHITECTURE',
              title: 'How RAG Works — Step by Step', titleHi: 'RAG कैसे काम करता है — Step by Step',
              intro: 'RAG combines a knowledge database with an LLM for accurate, up-to-date answers.',
              introHi: 'RAG एक knowledge database को LLM के साथ combine करता है accurate answers के लिए।',
              nodes: [
                { i:'📄', l:'Your Documents', s:'PDFs, Notes, Data', c:'flow-blue' }, { arrow: true },
                { i:'🔢', l:'Embeddings', s:'Convert to numbers', c:'flow-yellow' }, { arrow: true },
                { i:'🗄️', l:'Vector DB', s:'Store knowledge', c:'flow-sky' }, { arrow: true },
                { i:'🔍', l:'Retrieval', s:'Find relevant info', c:'flow-green' }, { arrow: true },
                { i:'🦙', l:'LLM Answer', s:'AI gives answer', c:'flow-pink' }
              ]
            },
            { type: 'quiz', tag: 'CLASS 11 · RAG QUIZ',
              title: '🧩 RAG Systems — Practice Quiz (10 Questions)', titleHi: '🧩 RAG Systems — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What problem does RAG solve with standard LLMs?', qHi: 'RAG standard LLMs की कौन सी problem solve करता है?', opts: ['Too slow responses','Knowledge cutoff and no access to private data','Too expensive','Poor language support'], optsHi: ['बहुत slow responses','Knowledge cutoff और private data तक access नहीं','बहुत expensive','Poor language support'], c: 1, ex: 'Knowledge cutoff and private data! ChatGPT only knows till its training cutoff (2023) and has no access to your private documents. RAG retrieves relevant external information at query time.', exHi: 'Knowledge cutoff और private data! ChatGPT सिर्फ 2023 तक जानता है और private documents access नहीं कर सकता।' },
                { q: 'What are "embeddings" in a RAG system?', qHi: 'RAG system में "embeddings" क्या हैं?', opts: ['Physical document storage','Mathematical number representations of text meaning','Images of documents','Audio recordings'], optsHi: ['Physical document storage','Text meaning की mathematical number representations','Documents की images','Audio recordings'], c: 1, ex: 'Mathematical number vectors! Embeddings convert text into high-dimensional number arrays (like [0.23, -0.45, 0.89...]). Similar meanings = similar numbers = nearby in vector space.', exHi: 'Mathematical number vectors! Embeddings text को high-dimensional number arrays में convert करते हैं।' },
                { q: 'What does a Vector Database store?', qHi: 'Vector Database क्या store करता है?', opts: ['Traditional SQL tables','Embeddings (number vectors of text)','Images only','Program code'], optsHi: ['Traditional SQL tables','Embeddings (text के number vectors)','सिर्फ images','Program code'], c: 1, ex: 'Embeddings/vectors! A vector database like Pinecone or Weaviate stores numerical representations of text, enabling ultra-fast similarity search — finding the most relevant documents in milliseconds!', exHi: 'Embeddings/vectors! Pinecone जैसा vector database text के numerical representations store करता है।' },
                { q: 'Which of these is a real use case of RAG?', qHi: 'RAG का real use case कौन सा है?', opts: ['Playing video games','A chatbot that answers questions about your company\'s HR policy PDF','Training new ML models','Generating random images'], optsHi: ['Video games खेलना','Company HR policy PDF के बारे में questions answer करने वाला chatbot','नए ML models train करना','Random images generate करना'], c: 1, ex: 'Company knowledge chatbot! Upload your HR policy, product manuals, legal docs → employees ask questions in natural language → AI retrieves relevant sections and answers accurately. No hallucination!', exHi: 'Company knowledge chatbot! HR policy, product manuals upload करो → employees questions पूछें → AI accurately answer करे।' },
                { q: 'What is the main advantage of RAG over fine-tuning an LLM?', qHi: 'LLM fine-tuning के comparison में RAG का main advantage क्या है?', opts: ['RAG is cheaper and data can be updated easily','RAG is faster to generate','RAG uses less memory','RAG needs no LLM'], optsHi: ['RAG सस्ता है और data easily update हो सकता है','RAG generate करने में तेज़ है','RAG कम memory use करता है','RAG को LLM की ज़रूरत नहीं'], c: 0, ex: 'Cheaper and updatable! Fine-tuning costs thousands of dollars and takes days. RAG just needs you to update the document database — which can be done in seconds. Knowledge stays fresh!', exHi: 'सस्ता और updatable! Fine-tuning में हजारों डॉलर और days लगते हैं। RAG में बस document database update करो।' },
              ]
            }
          ]
        },
        {
          id: 'c11_5', icon: '🐍', title: 'Python for AI — Variables, Lists, Functions & Logic', titleHi: 'Python for AI — Variables, Lists, Functions & Logic', xp: 60,
          slides: [
            { type: 'teach', bot: 'a', botName: 'PyBot 🐍', botNameHi: 'PyBot 🐍',
              tag: 'CLASS 11 · PYTHON FOUNDATIONS · CHAPTER 5', tagHi: 'CLASS 11 · PYTHON FOUNDATIONS · CHAPTER 5',
              title: 'Python — The Language Every AI Engineer Needs!', titleHi: 'Python — The Language Every AI Engineer Needs!',
              intro: '95% of all AI projects use Python. Google, OpenAI, DeepMind — all build AI in Python. Your AI journey starts NOW!', introHi: '95% of all AI projects use Python. Google, OpenAI, DeepMind — all build AI in Python. Your AI journey starts NOW!',
              speech: '<span class="hi">Python</span> = World\'s #1 AI Language (1991, Guido van Rossum)<br><br>Used by: <span class="em">Google, Netflix, ISRO, OpenAI, Anthropic</span><br><br>✅ Simple syntax — reads like English<br>✅ Huge AI libraries — NumPy, Pandas, TensorFlow, PyTorch<br>✅ Fast prototyping — build AI in hours<br>✅ Free and Open Source — anyone can use it<br><br><span class="hi">ISRO uses Python for Chandrayaan-3 data analysis!</span> 🚀',
              speechHi: '<span class="hi">Python</span> = World\'s #1 AI Language (1991, Guido van Rossum)<br><br>Used by: <span class="em">Google, Netflix, ISRO, OpenAI, Anthropic</span><br><br>✅ Simple syntax — reads like English<br>✅ Huge AI libraries — NumPy, Pandas, TensorFlow, PyTorch<br>✅ Fast prototyping — build AI in hours<br>✅ Free and Open Source — anyone can use it<br><br><span class="hi">ISRO uses Python for Chandrayaan-3 data analysis!</span> 🚀'
            },
            { type: 'code', tag: 'CLASS 11 · PYTHON BASICS CODE', tagHi: 'CLASS 11 · PYTHON BASICS CODE',
              title: 'Your First Python Code — Think Like an AI Engineer!', titleHi: 'Your First Python Code — Think Like an AI Engineer!',
              intro: 'Study this code carefully — every line matters!', introHi: 'इस code को ध्यान से study करें!',
              files: [{
                name: 'ai_basics.py',
                lines: [
                  { t:'c', v:'# Python for AI — Class 11 STU-BRAIN' },
                  { t:'b', v:'' },
                  { t:'c', v:'# 1. VARIABLES — store data' },
                  { t:'kw', v:'student_name' },
                  { t:'n', v:' = ' },
                  { t:'s', v:'"Vaibhav"' },
                  { t:'kw', v:'class_level' },
                  { t:'n', v:' = ' },
                  { t:'num', v:'11' },
                  { t:'kw', v:'ai_score' },
                  { t:'n', v:' = ' },
                  { t:'num', v:'95.5' },
                  { t:'b', v:'' },
                  { t:'c', v:'# 2. PRINT — show output' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'(f"Hello {student_name}! Class: {class_level}")' },
                  { t:'out', v:'# Hello Vaibhav! Class: 11' },
                  { t:'b', v:'' },
                  { t:'c', v:'# 3. LIST — store multiple values (like a dataset!)' },
                  { t:'kw', v:'quiz_scores' },
                  { t:'n', v:' = [' },
                  { t:'num', v:'85, 92, 78, 95, 88' },
                  { t:'n', v:']' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'("Average:", sum(quiz_scores)/len(quiz_scores))' },
                  { t:'out', v:'# Average: 87.6' },
                  { t:'b', v:'' },
                  { t:'c', v:'# 4. IF-ELSE — AI decision making' },
                  { t:'kw', v:'if' },
                  { t:'n', v:' ai_score >= ' },
                  { t:'num', v:'90' },
                  { t:'n', v:':' },
                  { t:'fn', v:'    print' },
                  { t:'n', v:'("Excellent AI student! 🏆")' },
                  { t:'kw', v:'else' },
                  { t:'n', v:':' },
                  { t:'fn', v:'    print' },
                  { t:'n', v:'("Keep practicing! 💪")' },
                  { t:'out', v:'# Excellent AI student! 🏆' },
                  { t:'b', v:'' },
                  { t:'c', v:'# 5. FUNCTION — reusable AI building block' },
                  { t:'kw', v:'def' },
                  { t:'fn', v:' predict_grade' },
                  { t:'n', v:'(score):' },
                  { t:'kw', v:'    if' },
                  { t:'n', v:' score >= ' },
                  { t:'num', v:'90' },
                  { t:'n', v:': ' },
                  { t:'kw', v:'return' },
                  { t:'s', v:' "A+"' },
                  { t:'kw', v:'    elif' },
                  { t:'n', v:' score >= ' },
                  { t:'num', v:'80' },
                  { t:'n', v:': ' },
                  { t:'kw', v:'return' },
                  { t:'s', v:' "A"' },
                  { t:'kw', v:'    else' },
                  { t:'n', v:': ' },
                  { t:'kw', v:'return' },
                  { t:'s', v:' "B"' },
                  { t:'b', v:'' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'(predict_grade(' },
                  { t:'num', v:'95' },
                  { t:'n', v:'))' },
                  { t:'out', v:'# A+' }
                ]
              }]
            },
            { type: 'quiz', tag: 'CLASS 11 · PYTHON BASICS QUIZ', tagHi: 'CLASS 11 · PYTHON BASICS QUIZ',
              title: '🧩 Python Basics — 10 Question Practice Quiz', titleHi: '🧩 Python Basics — 10 Question Practice Quiz',
              questions: [
                { q: 'What does print() do in Python?', qHi: 'What does print() do in Python?',
                  opts: ['Prints on paper', 'Displays output on screen', 'Deletes a variable', 'Creates a file'], optsHi: ['Prints on paper', 'Displays output on screen', 'Deletes a variable', 'Creates a file'],
                  c: 1, ex: 'print() displays text or values on the screen. Most basic function every programmer uses!', exHi: 'print() displays text or values on the screen. Most basic function every programmer uses!' },
                { q: 'Which is a valid Python list?', qHi: 'Which is a valid Python list?',
                  opts: ['scores = (85,92)', 'scores = {85,92}', 'scores = [85,92,78]', 'scores = <85,92>'], optsHi: ['scores = (85,92)', 'scores = {85,92}', 'scores = [85,92,78]', 'scores = <85,92>'],
                  c: 2, ex: 'Lists use square brackets []. Most common data structure for AI datasets!', exHi: 'Lists use square brackets []. Most common data structure for AI datasets!' },
                { q: 'What is output of sum([10,20,30]) / len([10,20,30])?', qHi: 'What is output of sum([10,20,30]) / len([10,20,30])?',
                  opts: ['10', '20.0', '60', '3'], optsHi: ['10', '20.0', '60', '3'],
                  c: 1, ex: 'sum=60, len=3, so 60/3=20.0. Exactly how average is calculated — fundamental in AI!', exHi: 'sum=60, len=3, so 60/3=20.0. Exactly how average is calculated — fundamental in AI!' },
                { q: 'What keyword starts a function in Python?', qHi: 'What keyword starts a function in Python?',
                  opts: ['function', 'fun', 'def', 'create'], optsHi: ['function', 'fun', 'def', 'create'],
                  c: 2, ex: '"def" keyword defines a function! def my_function(): creates reusable code.', exHi: '"def" keyword defines a function! def my_function(): creates reusable code.' },
                { q: 'What percentage of AI projects use Python?', qHi: 'What percentage of AI projects use Python?',
                  opts: ['50%', '70%', '85%', '95%'], optsHi: ['50%', '70%', '85%', '95%'],
                  c: 3, ex: '95%! TensorFlow, PyTorch, NumPy, Pandas — all major AI libraries are Python-based!', exHi: '95%! TensorFlow, PyTorch, NumPy, Pandas — all major AI libraries are Python-based!' },
                { q: 'Where can you run Python free in browser?', qHi: 'Where can you run Python free in browser?',
                  opts: ['GitHub', 'Stack Overflow', 'Google Colab', 'Twitter'], optsHi: ['GitHub', 'Stack Overflow', 'Google Colab', 'Twitter'],
                  c: 2, ex: 'Google Colab (colab.research.google.com) — free Python with GPU support, no installation!', exHi: 'Google Colab (colab.research.google.com) — free Python with GPU support, no installation!' },
                { q: 'What does "elif" mean in Python?', qHi: 'What does "elif" mean in Python?',
                  opts: ['End of loop', 'Else if — another condition', 'Error handler', 'Empty line'], optsHi: ['End of loop', 'Else if — another condition', 'Error handler', 'Empty line'],
                  c: 1, ex: '"elif" means "else if" — checks another condition when first "if" is False.', exHi: '"elif" means "else if" — checks another condition when first "if" is False.' },
                { q: 'Which is a Python dictionary?', qHi: 'Which is a Python dictionary?',
                  opts: ['[name: "Vaibhav"]', '(name: "Vaibhav"]', '{"name": "Vaibhav"}', '<name: "Vaibhav">'], optsHi: ['[name: "Vaibhav"]', '(name: "Vaibhav"]', '{"name": "Vaibhav"}', '<name: "Vaibhav">'],
                  c: 2, ex: 'Dictionaries use {} with key:value pairs. Perfect for storing structured data in AI projects!', exHi: 'Dictionaries use {} with key:value pairs. Perfect for storing structured data in AI projects!' },
                { q: 'What is a "for loop" used for?', qHi: 'What is a "for loop" used for?',
                  opts: ['Define a function', 'Repeat code for each item', 'Import libraries', 'Print once'], optsHi: ['Define a function', 'Repeat code for each item', 'Import libraries', 'Print once'],
                  c: 1, ex: '"for score in scores:" repeats code for each item. AI training loops through thousands of data points!', exHi: '"for score in scores:" repeats code for each item. AI training loops through thousands of data points!' },
                { q: 'ISRO uses Python for which mission?', qHi: 'ISRO uses Python for which mission?',
                  opts: ['Mangalyaan', 'Chandrayaan-3', 'Gaganyaan', 'AstroSat'], optsHi: ['Mangalyaan', 'Chandrayaan-3', 'Gaganyaan', 'AstroSat'],
                  c: 1, ex: 'ISRO used Python for Chandrayaan-3 data analysis — the 2023 Moon south pole landing mission!', exHi: 'ISRO used Python for Chandrayaan-3 data analysis — the 2023 Moon south pole landing mission!' }
              ]
            }
          ]
        },
        {
          id: 'c11_6', icon: '📊', title: 'NumPy and Pandas — The AI Data Toolkit', titleHi: 'NumPy and Pandas — The AI Data Toolkit', xp: 65,
          slides: [
            { type: 'teach', bot: 'a', botName: 'PyBot 🐍', botNameHi: 'PyBot 🐍',
              tag: 'CLASS 11 · NUMPY AND PANDAS · CHAPTER 6', tagHi: 'CLASS 11 · NUMPY AND PANDAS · CHAPTER 6',
              title: 'NumPy and Pandas — How AI Handles Millions of Data Points!', titleHi: 'NumPy and Pandas — How AI Handles Millions of Data Points!',
              intro: 'NumPy and Pandas are the backbone of every AI project. 95% of data scientists use these daily.', introHi: 'NumPy and Pandas are the backbone of every AI project. 95% of data scientists use these daily.',
              speech: '<span class="hi">NumPy</span> = Numerical Python — Super-fast math for AI<br><span class="hi">Pandas</span> = Panel Data — Handle tables and spreadsheets in Python<br><br>Without NumPy: 1 million numbers = 100 seconds<br>With NumPy: <span class="cool">0.01 seconds — 10,000x faster!</span><br><br>🔬 <strong>NumPy:</strong> NASA processes satellite data with NumPy<br>📈 <strong>Pandas:</strong> Every stock market AI uses Pandas DataFrames',
              speechHi: '<span class="hi">NumPy</span> = Numerical Python — Super-fast math for AI<br><span class="hi">Pandas</span> = Panel Data — Handle tables and spreadsheets in Python<br><br>Without NumPy: 1 million numbers = 100 seconds<br>With NumPy: <span class="cool">0.01 seconds — 10,000x faster!</span><br><br>🔬 <strong>NumPy:</strong> NASA processes satellite data with NumPy<br>📈 <strong>Pandas:</strong> Every stock market AI uses Pandas DataFrames'
            },
            { type: 'code', tag: 'CLASS 11 · NUMPY PANDAS CODE', tagHi: 'CLASS 11 · NUMPY PANDAS CODE',
              title: 'NumPy and Pandas in Action!', titleHi: 'NumPy and Pandas in Action!',
              intro: 'Study this code carefully — every line matters!', introHi: 'इस code को ध्यान से study करें!',
              files: [{
                name: 'numpy_pandas_ai.py',
                lines: [
                  { t:'c', v:'# NumPy and Pandas for AI — Class 11' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' numpy ' },
                  { t:'kw', v:'as' },
                  { t:'fn', v:' np' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' pandas ' },
                  { t:'kw', v:'as' },
                  { t:'fn', v:' pd' },
                  { t:'b', v:'' },
                  { t:'c', v:'# NUMPY: Fast AI Math' },
                  { t:'kw', v:'scores' },
                  { t:'n', v:' = np.array([' },
                  { t:'num', v:'85, 92, 78, 95, 88, 72, 90' },
                  { t:'n', v:'])' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'("Mean:", np.mean(scores))' },
                  { t:'out', v:'# Mean: 85.71' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'("Max:", np.max(scores))' },
                  { t:'out', v:'# Max: 95' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Multiply ALL scores by 1.1 in ONE line!' },
                  { t:'kw', v:'scaled' },
                  { t:'n', v:' = scores * ' },
                  { t:'num', v:'1.1' },
                  { t:'out', v:'# [93.5, 101.2, 85.8, 104.5, 96.8, 79.2, 99.0]' },
                  { t:'b', v:'' },
                  { t:'c', v:'# PANDAS: Handle student data like Excel' },
                  { t:'kw', v:'data' },
                  { t:'n', v:' = {' },
                  { t:'s', v:'    "Name"' },
                  { t:'n', v:': ["Vaibhav", "Priya", "Rohan", "Anjali"],' },
                  { t:'s', v:'    "Class"' },
                  { t:'n', v:': [' },
                  { t:'num', v:'11, 11, 12, 11' },
                  { t:'n', v:'],' },
                  { t:'s', v:'    "AI_Score"' },
                  { t:'n', v:': [' },
                  { t:'num', v:'95, 88, 92, 78' },
                  { t:'n', v:']' },
                  { t:'n', v:'}' },
                  { t:'kw', v:'df' },
                  { t:'n', v:' = pd.DataFrame(data)' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'(df)' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Filter: students with score > 90' },
                  { t:'kw', v:'toppers' },
                  { t:'n', v:' = df[df[' },
                  { t:'s', v:'"AI_Score"' },
                  { t:'n', v:'] > ' },
                  { t:'num', v:'90' },
                  { t:'n', v:']' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'("Toppers:", toppers)' },
                  { t:'out', v:'# Shows Vaibhav (95) and Rohan (92)' }
                ]
              }]
            },
            { type: 'quiz', tag: 'CLASS 11 · NUMPY PANDAS QUIZ', tagHi: 'CLASS 11 · NUMPY PANDAS QUIZ',
              title: '🧩 NumPy and Pandas — 10 Question Practice Quiz', titleHi: '🧩 NumPy and Pandas — 10 Question Practice Quiz',
              questions: [
                { q: 'What does "import numpy as np" use "np" for?', qHi: 'What does "import numpy as np" use "np" for?',
                  opts: ['New Python', 'NumPy alias/shortcut', 'Number Package', 'Neural Processor'], optsHi: ['New Python', 'NumPy alias/shortcut', 'Number Package', 'Neural Processor'],
                  c: 1, ex: '"np" is an alias for NumPy. Write np.array() instead of numpy.array(). Universal AI convention!', exHi: '"np" is an alias for NumPy. Write np.array() instead of numpy.array(). Universal AI convention!' },
                { q: 'A Pandas DataFrame is?', qHi: 'A Pandas DataFrame is?',
                  opts: ['A loop type', 'A 2D table (like Excel) in Python', 'A neural network', 'A Python function'], optsHi: ['A loop type', 'A 2D table (like Excel) in Python', 'A neural network', 'A Python function'],
                  c: 1, ex: 'DataFrame = 2D table with rows and columns — Excel in Python! Foundation of all AI data work.', exHi: 'DataFrame = 2D table with rows and columns — Excel in Python! Foundation of all AI data work.' },
                { q: 'NumPy is how much faster than regular Python for math?', qHi: 'NumPy is how much faster than regular Python for math?',
                  opts: ['2x', '10x', '100x', 'Up to 10,000x'], optsHi: ['2x', '10x', '100x', 'Up to 10,000x'],
                  c: 3, ex: 'NumPy can be 10,000x faster! Uses optimized C code internally. This is why all AI uses NumPy!', exHi: 'NumPy can be 10,000x faster! Uses optimized C code internally. This is why all AI uses NumPy!' },
                { q: 'np.mean() calculates?', qHi: 'np.mean() calculates?',
                  opts: ['Maximum', 'Minimum', 'Average', 'Sum'], optsHi: ['Maximum', 'Minimum', 'Average', 'Sum'],
                  c: 2, ex: 'np.mean() calculates average of all numbers. Constantly used in AI for loss functions and accuracy!', exHi: 'np.mean() calculates average of all numbers. Constantly used in AI for loss functions and accuracy!' },
                { q: 'Which library is "Excel in Python" for AI?', qHi: 'Which library is "Excel in Python" for AI?',
                  opts: ['NumPy', 'Matplotlib', 'Pandas', 'TensorFlow'], optsHi: ['NumPy', 'Matplotlib', 'Pandas', 'TensorFlow'],
                  c: 2, ex: 'Pandas handles tabular data just like Excel but in Python! Filter, sort, group millions of rows instantly!', exHi: 'Pandas handles tabular data just like Excel but in Python! Filter, sort, group millions of rows instantly!' },
                { q: 'What does df[df["Score"] > 90] do?', qHi: 'What does df[df["Score"] > 90] do?',
                  opts: ['Deletes rows', 'Filters rows where Score > 90', 'Sorts by score', 'Adds 90 to scores'], optsHi: ['Deletes rows', 'Filters rows where Score > 90', 'Sorts by score', 'Adds 90 to scores'],
                  c: 1, ex: 'Boolean indexing — returns only rows where Score > 90. Used constantly in AI data preparation!', exHi: 'Boolean indexing — returns only rows where Score > 90. Used constantly in AI data preparation!' },
                { q: 'np.std() calculates?', qHi: 'np.std() calculates?',
                  opts: ['Sum', 'Standard deviation — spread of data', 'Sorted order', 'Second value'], optsHi: ['Sum', 'Standard deviation — spread of data', 'Sorted order', 'Second value'],
                  c: 1, ex: 'std = standard deviation — how spread out data is. Essential for AI model evaluation!', exHi: 'std = standard deviation — how spread out data is. Essential for AI model evaluation!' },
                { q: 'To import Pandas you write?', qHi: 'To import Pandas you write?',
                  opts: ['import pandas', 'import pandas as pd', 'use pandas', 'load pandas'], optsHi: ['import pandas', 'import pandas as pd', 'use pandas', 'load pandas'],
                  c: 1, ex: '"import pandas as pd" — universal convention. "pd" alias used by every data scientist worldwide!', exHi: '"import pandas as pd" — universal convention. "pd" alias used by every data scientist worldwide!' },
                { q: 'NASA uses NumPy for?', qHi: 'NASA uses NumPy for?',
                  opts: ['Emails', 'Processing satellite and telescope data', 'Social media', 'Gaming'], optsHi: ['Emails', 'Processing satellite and telescope data', 'Social media', 'Gaming'],
                  c: 1, ex: 'NASA uses NumPy for scientific computing — satellite imagery, telescope data, space mission calculations!', exHi: 'NASA uses NumPy for scientific computing — satellite imagery, telescope data, space mission calculations!' },
                { q: 'pd.DataFrame(data) creates?', qHi: 'pd.DataFrame(data) creates?',
                  opts: ['A Python list', 'A table from dictionary data', 'A neural network', 'A class'], optsHi: ['A Python list', 'A table from dictionary data', 'A neural network', 'A class'],
                  c: 1, ex: 'Creates structured table from dictionary. Each key = column, each value list = column data. AI data foundation!', exHi: 'Creates structured table from dictionary. Each key = column, each value list = column data. AI data foundation!' }
              ]
            }
          ]
        },
        {
          id: 'c11_7', icon: '🧠', title: 'Building Neural Networks with Python — Your First AI Model!', titleHi: 'Building Neural Networks with Python — Your First AI Model!', xp: 70,
          slides: [
            { type: 'teach', bot: 'a', botName: 'PyBot 🐍', botNameHi: 'PyBot 🐍',
              tag: 'CLASS 11 · NEURAL NETWORKS CODE · CHAPTER 7', tagHi: 'CLASS 11 · NEURAL NETWORKS CODE · CHAPTER 7',
              title: 'Build Your First Neural Network in Python!', titleHi: 'Build Your First Neural Network in Python!',
              intro: 'Today you write actual Python code to build a neural network. Same architecture powers ChatGPT, Google Translate, DALL-E!', introHi: 'Today you write actual Python code to build a neural network. Same architecture powers ChatGPT, Google Translate, DALL-E!',
              speech: '<span class="hi">TensorFlow</span> = Google AI library (2015)<br><span class="hi">PyTorch</span> = Meta AI library (2016)<br><span class="hi">Keras</span> = simplified TensorFlow — neural networks in 10 lines!<br><br>Google, Instagram, Spotify — all built AI using these libraries<br><br><span class="em">Today you join them!</span> 🚀',
              speechHi: '<span class="hi">TensorFlow</span> = Google AI library (2015)<br><span class="hi">PyTorch</span> = Meta AI library (2016)<br><span class="hi">Keras</span> = simplified TensorFlow — neural networks in 10 lines!<br><br>Google, Instagram, Spotify — all built AI using these libraries<br><br><span class="em">Today you join them!</span> 🚀'
            },
            { type: 'code', tag: 'CLASS 11 · NEURAL NETWORK CODE', tagHi: 'CLASS 11 · NEURAL NETWORK CODE',
              title: 'Student Grade Predictor Neural Network!', titleHi: 'Student Grade Predictor Neural Network!',
              intro: 'Study this code carefully — every line matters!', introHi: 'इस code को ध्यान से study करें!',
              files: [{
                name: 'neural_network.py',
                lines: [
                  { t:'c', v:'# Your First Neural Network! Class 11 STU-BRAIN' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' numpy ' },
                  { t:'kw', v:'as' },
                  { t:'fn', v:' np' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' tensorflow ' },
                  { t:'kw', v:'as' },
                  { t:'fn', v:' tf' },
                  { t:'kw', v:'from' },
                  { t:'n', v:' tensorflow ' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' keras' },
                  { t:'b', v:'' },
                  { t:'c', v:'# STEP 1: Training data [study_hours, attendance] → pass(1)/fail(0)' },
                  { t:'kw', v:'X_train' },
                  { t:'n', v:' = np.array([[' },
                  { t:'num', v:'2,60' },
                  { t:'n', v:'],[' },
                  { t:'num', v:'5,85' },
                  { t:'n', v:'],[' },
                  { t:'num', v:'8,90' },
                  { t:'n', v:'],[' },
                  { t:'num', v:'1,40' },
                  { t:'n', v:'],[' },
                  { t:'num', v:'6,80' },
                  { t:'n', v:']])' },
                  { t:'kw', v:'y_train' },
                  { t:'n', v:' = np.array([' },
                  { t:'num', v:'0,1,1,0,1' },
                  { t:'n', v:'])' },
                  { t:'b', v:'' },
                  { t:'c', v:'# STEP 2: BUILD the Neural Network' },
                  { t:'kw', v:'model' },
                  { t:'n', v:' = keras.Sequential([' },
                  { t:'n', v:'    keras.layers.Dense(' },
                  { t:'num', v:'8' },
                  { t:'n', v:', activation=' },
                  { t:'s', v:'"relu"' },
                  { t:'n', v:', input_shape=(' },
                  { t:'num', v:'2' },
                  { t:'n', v:',,)),' },
                  { t:'n', v:'    keras.layers.Dense(' },
                  { t:'num', v:'4' },
                  { t:'n', v:', activation=' },
                  { t:'s', v:'"relu"' },
                  { t:'n', v:'),' },
                  { t:'n', v:'    keras.layers.Dense(' },
                  { t:'num', v:'1' },
                  { t:'n', v:', activation=' },
                  { t:'s', v:'"sigmoid"' },
                  { t:'n', v:')' },
                  { t:'n', v:'])' },
                  { t:'b', v:'' },
                  { t:'c', v:'# STEP 3: COMPILE — tell it how to learn' },
                  { t:'n', v:'model.compile(optimizer=' },
                  { t:'s', v:'"adam"' },
                  { t:'n', v:', loss=' },
                  { t:'s', v:'"binary_crossentropy"' },
                  { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'c', v:'# STEP 4: TRAIN for 100 rounds' },
                  { t:'n', v:'model.fit(X_train, y_train, epochs=' },
                  { t:'num', v:'100' },
                  { t:'n', v:', verbose=' },
                  { t:'num', v:'0' },
                  { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'c', v:'# STEP 5: PREDICT! — 4hrs study, 75% attendance' },
                  { t:'kw', v:'pred' },
                  { t:'n', v:' = model.predict(np.array([[' },
                  { t:'num', v:'4,75' },
                  { t:'n', v:']]))' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'(f"Pass probability: {pred[0][0]:.1%}")' },
                  { t:'out', v:'# Pass probability: 82.4%' }
                ]
              }]
            },
            { type: 'quiz', tag: 'CLASS 11 · NEURAL NETWORK QUIZ', tagHi: 'CLASS 11 · NEURAL NETWORK QUIZ',
              title: '🧩 Neural Networks in Python — 10 Question Practice Quiz', titleHi: '🧩 Neural Networks in Python — 10 Question Practice Quiz',
              questions: [
                { q: 'What is TensorFlow?', qHi: 'What is TensorFlow?',
                  opts: ['A database', 'Google open-source AI/ML library', 'Social media', 'Microsoft OS'], optsHi: ['A database', 'Google open-source AI/ML library', 'Social media', 'Microsoft OS'],
                  c: 1, ex: 'TensorFlow = Google open-source ML library (2015). Powers Google Search, Translate, Photos AI!', exHi: 'TensorFlow = Google open-source ML library (2015). Powers Google Search, Translate, Photos AI!' },
                { q: 'keras.Sequential([]) creates?', qHi: 'keras.Sequential([]) creates?',
                  opts: ['A Python list', 'A layer-by-layer neural network', 'A database', 'A server'], optsHi: ['A Python list', 'A layer-by-layer neural network', 'A database', 'A server'],
                  c: 1, ex: 'Sequential model stacks layers: input → hidden → output. Most common neural network architecture!', exHi: 'Sequential model stacks layers: input → hidden → output. Most common neural network architecture!' },
                { q: 'What activation is used in final layer for binary (pass/fail) classification?', qHi: 'What activation is used in final layer for binary (pass/fail) classification?',
                  opts: ['relu', 'tanh', 'sigmoid', 'softmax'], optsHi: ['relu', 'tanh', 'sigmoid', 'softmax'],
                  c: 2, ex: 'Sigmoid outputs 0-1 (probability). >0.5 = pass, <0.5 = fail. Perfect for binary classification!', exHi: 'Sigmoid outputs 0-1 (probability). >0.5 = pass, <0.5 = fail. Perfect for binary classification!' },
                { q: 'What does model.fit() do?', qHi: 'What does model.fit() do?',
                  opts: ['Checks model size', 'Trains neural network on data', 'Deletes data', 'Imports from internet'], optsHi: ['Checks model size', 'Trains neural network on data', 'Deletes data', 'Imports from internet'],
                  c: 1, ex: 'model.fit() trains the neural network — shows data, calculates predictions, adjusts weights. Learning!', exHi: 'model.fit() trains the neural network — shows data, calculates predictions, adjusts weights. Learning!' },
                { q: 'What is one "epoch" in training?', qHi: 'What is one "epoch" in training?',
                  opts: ['One neuron', 'One complete pass through ALL training data', 'Learning rate', 'Output layer'], optsHi: ['One neuron', 'One complete pass through ALL training data', 'Learning rate', 'Output layer'],
                  c: 1, ex: 'One epoch = one complete pass through entire training dataset. 100 epochs = AI sees data 100 times!', exHi: 'One epoch = one complete pass through entire training dataset. 100 epochs = AI sees data 100 times!' },
                { q: 'PyTorch is made by?', qHi: 'PyTorch is made by?',
                  opts: ['Google', 'Apple', 'Meta (Facebook)', 'Amazon'], optsHi: ['Google', 'Apple', 'Meta (Facebook)', 'Amazon'],
                  c: 2, ex: 'PyTorch by Meta (Facebook AI Research, 2016). GPT, LLaMA, many cutting-edge AI built with PyTorch!', exHi: 'PyTorch by Meta (Facebook AI Research, 2016). GPT, LLaMA, many cutting-edge AI built with PyTorch!' },
                { q: 'What does relu activation do?', qHi: 'What does relu activation do?',
                  opts: ['Outputs 0-1', 'Outputs negatives only', 'Outputs max(0,x) — removes negatives', 'Outputs exact input'], optsHi: ['Outputs 0-1', 'Outputs negatives only', 'Outputs max(0,x) — removes negatives', 'Outputs exact input'],
                  c: 2, ex: 'ReLU = max(0,x). Passes positives, converts negatives to 0. Simple but powerful — used in hidden layers!', exHi: 'ReLU = max(0,x). Passes positives, converts negatives to 0. Simple but powerful — used in hidden layers!' },
                { q: 'X_train in the code contains?', qHi: 'X_train in the code contains?',
                  opts: ['Model architecture', 'Input features for training', 'Test results', 'Python library'], optsHi: ['Model architecture', 'Input features for training', 'Test results', 'Python library'],
                  c: 1, ex: 'X_train = input features (study hours, attendance). Neural network learns to map inputs to outputs!', exHi: 'X_train = input features (study hours, attendance). Neural network learns to map inputs to outputs!' },
                { q: 'Google Colab is useful because?', qHi: 'Google Colab is useful because?',
                  opts: ['It is email', 'Free Python with GPU in browser', 'Sells computers', 'Social media'], optsHi: ['It is email', 'Free Python with GPU in browser', 'Sells computers', 'Social media'],
                  c: 1, ex: 'Colab = free Python with GPU in browser. Used by millions of AI researchers worldwide!', exHi: 'Colab = free Python with GPU in browser. Used by millions of AI researchers worldwide!' },
                { q: 'model.compile() specifies?', qHi: 'model.compile() specifies?',
                  opts: ['Number of layers', 'Optimizer and loss function for training', 'Dataset size', 'Output format'], optsHi: ['Number of layers', 'Optimizer and loss function for training', 'Dataset size', 'Output format'],
                  c: 1, ex: 'compile() tells model HOW to learn — optimizer (adam) and loss function to minimize.', exHi: 'compile() tells model HOW to learn — optimizer (adam) and loss function to minimize.' }
              ]
            }
          ]
        }
,
      ]
    }]
  },
  12: {
    label: 'Class 12', labelHi: 'कक्षा 12', badge: '🌟 Master', badgeHi: '🌟 मास्टर',
    badgeStyle: 'background:linear-gradient(135deg,rgba(108,99,255,.2),rgba(255,101,132,.15));color:#FF6584;border:1px solid rgba(255,101,132,.4)',
    emoji: '🌟',
    subjects: [{
      id: 's12_master', icon: '🤖', name: 'Agentic AI, Fine-Tuning, Python Projects & AI Career', nameHi: 'Agentic AI, Fine-Tuning, Python Projects और AI Career',
      chapters: [
        {
          id: 'c12_1', icon: '🤖', title: 'Agentic AI — AI That Takes Actions!', titleHi: 'Agentic AI — AI जो कार्य करता है!', xp: 70,
          slides: [
            { type: 'teach', bot: 'a', botName: 'AgentBot 🤖', botNameHi: 'AgentBot 🤖',
              tag: 'CLASS 12 · AGENTIC AI · CHAPTER 1', tagHi: 'कक्षा 12 · Agentic AI · अध्याय 1',
              title: 'Agentic AI — The Next Frontier!', titleHi: 'Agentic AI — अगली सीमा!',
              intro: 'AI Agents don\'t just answer questions — they take actions, use tools, browse the web, write code, and accomplish complex goals autonomously.',
              introHi: 'AI Agents सिर्फ सवाल नहीं जवाब देते — वे कार्य करते हैं, tools उपयोग करते हैं, web browse करते हैं।',
              speech: `<span class="hi">ChatGPT = Reactive AI</span> (answers questions)<br>
<span class="em">Agent AI = Proactive AI</span> (takes actions!)<br><br>
<span class="cool">What can AI Agents do?</span><br>
🌐 Browse websites and extract information<br>
📧 Send emails and schedule meetings<br>
💻 Write AND run code to solve problems<br>
📊 Analyze data and create reports<br>
🛒 Book tickets, order food, make purchases<br>
🤖 Control other AI tools as sub-agents<br><br>
<span class="hi">The ReAct Framework:</span><br>
<strong>Re</strong>ason → <strong>Act</strong> → Observe → Repeat<br><br>
Agent thinks: <span class="em">"I need to find flight prices"</span><br>
→ Uses web search tool<br>
→ Reads results<br>
→ <span class="cool">"Now compare prices"</span><br>
→ Uses calculator tool<br>
→ <span class="hi">"Book the cheapest one"</span><br>
→ Uses booking API tool<br><br>
Real agents today: <span class="em">Devin (codes), AutoGPT, Claude Computer Use</span>`,
              speechHi: `<span class="hi">ChatGPT = Reactive AI</span> (सवालों के जवाब देता है)<br>
<span class="em">Agent AI = Proactive AI</span> (कार्य करता है!)<br><br>
<span class="cool">AI Agents क्या कर सकते हैं?</span><br>
🌐 Websites browse करके information निकालना<br>
📧 Emails भेजना और meetings schedule करना<br>
💻 Code लिखना AND चलाना problems solve करने के लिए<br>
🤖 दूसरे AI tools को sub-agents के रूप में control करना<br><br>
<span class="hi">ReAct Framework:</span><br>
<strong>Re</strong>ason → <strong>Act</strong> → Observe → Repeat`
            },
            { type: 'code', tag: 'CLASS 12 · BUILD AN AI AGENT · CODING CHALLENGE',
              title: '💻 Coding Challenge: Build a Simple AI Agent!', titleHi: '💻 Coding Challenge: Simple AI Agent बनाओ!',
              intro: 'Build a Python AI agent that can answer questions AND perform calculations — a real agentic system!',
              introHi: 'Python AI agent बनाओ जो questions answer करे AND calculations perform करे।',
              files: [{
                name: 'simple_ai_agent.py',
                lines: [
                  { t:'c', v:'# CLASS 12 CODING CHALLENGE: Build an AI Agent' },
                  { t:'c', v:'# This agent can: answer questions + do math + search web' },
                  { t:'kw', v:'import' }, { t:'n', v:' requests, json' },
                  { t:'b', v:'' },
                  { t:'c', v:'# ===== TOOLS the agent can use =====' },
                  { t:'kw', v:'def' }, { t:'fn', v:' calculator' }, { t:'n', v:'(expression: str) -> str:' },
                  { t:'s', v:'    """Evaluates math expressions safely"""' },
                  { t:'kw', v:'    try' }, { t:'n', v:': ' }, { t:'kw', v:'return' }, { t:'n', v:' str(' }, { t:'fn', v:'eval' }, { t:'n', v:'(expression))' },
                  { t:'kw', v:'    except' }, { t:'n', v:': ' }, { t:'kw', v:'return' }, { t:'s', v:' "Invalid expression"' },
                  { t:'b', v:'' },
                  { t:'kw', v:'def' }, { t:'fn', v:' get_ai_response' }, { t:'n', v:'(messages: list, tools: list) -> dict:' },
                  { t:'s', v:'    """Call AI API with tool definitions"""' },
                  { t:'v', v:'    response' }, { t:'n', v:' = requests.' }, { t:'fn', v:'post' }, { t:'n', v:'(' },
                  { t:'s', v:'        "https://openrouter.ai/api/v1/chat/completions",' },
                  { t:'n', v:'        headers={' }, { t:'s', v:'"Authorization"' }, { t:'n', v:': ' }, { t:'s', v:'"Bearer YOUR_API_KEY"' }, { t:'n', v:'},' },
                  { t:'n', v:'        json={' }, { t:'s', v:'"model"' }, { t:'n', v:': ' }, { t:'s', v:'"meta-llama/llama-3.1-8b-instruct:free"' }, { t:'n', v:','}, { t:'s', v:'"messages"' }, { t:'n', v:': messages}' },
                  { t:'n', v:'    )' },
                  { t:'kw', v:'    return' }, { t:'n', v:' response.' }, { t:'fn', v:'json' }, { t:'n', v:'()' },
                  { t:'b', v:'' },
                  { t:'c', v:'# ===== AGENT LOOP (ReAct Pattern) =====' },
                  { t:'kw', v:'def' }, { t:'fn', v:' run_agent' }, { t:'n', v:'(user_question: str):' },
                  { t:'v', v:'    messages' }, { t:'n', v:' = [' },
                  { t:'n', v:'        {' }, { t:'s', v:'"role"' }, { t:'n', v:': ' }, { t:'s', v:'"system"' }, { t:'n', v:', ' }, { t:'s', v:'"content"' }, { t:'n', v:': ' }, { t:'s', v:'"You are a helpful AI agent. Use calculator tool when math is needed."' }, { t:'n', v:'},' },
                  { t:'n', v:'        {' }, { t:'s', v:'"role"' }, { t:'n', v:': ' }, { t:'s', v:'"user"' }, { t:'n', v:', ' }, { t:'s', v:'"content"' }, { t:'n', v:': user_question}' },
                  { t:'n', v:'    ]' },
                  { t:'b', v:'' },
                  { t:'c', v:'    # Step 1: Agent thinks and responds' },
                  { t:'v', v:'    response' }, { t:'n', v:' = ' }, { t:'fn', v:'get_ai_response' }, { t:'n', v:'(messages, [])' },
                  { t:'v', v:'    answer' }, { t:'n', v:' = response[' }, { t:'s', v:'"choices"' }, { t:'n', v:'][0][' }, { t:'s', v:'"message"' }, { t:'n', v:'][' }, { t:'s', v:'"content"' }, { t:'n', v:']' },
                  { t:'b', v:'' },
                  { t:'c', v:'    # Step 2: If math needed, use calculator tool' },
                  { t:'kw', v:'    if' }, { t:'n', v:' any(op ' }, { t:'kw', v:'in' }, { t:'n', v:' user_question ' }, { t:'kw', v:'for' }, { t:'n', v:' op ' }, { t:'kw', v:'in' }, { t:'n', v:' [' }, { t:'s', v:"'+','-','*','/'" }, { t:'n', v:']):' },
                  { t:'v', v:'        nums' }, { t:'n', v:' = [int(x) ' }, { t:'kw', v:'for' }, { t:'n', v:' x ' }, { t:'kw', v:'in' }, { t:'n', v:' user_question.' }, { t:'fn', v:'split' }, { t:'n', v:'() ' }, { t:'kw', v:'if' }, { t:'n', v:' x.' }, { t:'fn', v:'isdigit' }, { t:'n', v:'()]' },
                  { t:'fn', v:'        print' }, { t:'n', v:'(' }, { t:'s', v:'f"🔧 Using Calculator tool..."' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'fn', v:'    print' }, { t:'n', v:'(' }, { t:'s', v:'f"🤖 Agent: {answer}"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Run the agent!' },
                  { t:'fn', v:'run_agent' }, { t:'n', v:'(' }, { t:'s', v:'"What is 15% of 4500 rupees?"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'o', v:'🔧 Using Calculator tool...' },
                  { t:'o', v:'🤖 Agent: 15% of ₹4500 = ₹675' },
                ]
              }],
              extra: `<div class="callout cal-tip"><span class="cal-icon">🏆</span><div><strong>Challenge:</strong> Extend this agent to add a <strong>weather tool</strong> that fetches real weather from an API. Add a third tool of your own! Share your code in the practice quiz for class feedback.</div></div>`
            },
            { type: 'quiz', tag: 'CLASS 12 · AGENTIC AI QUIZ',
              title: '🧩 Agentic AI — Practice Quiz (10 Questions)', titleHi: '🧩 Agentic AI — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What is the key difference between ChatGPT and an AI Agent?', qHi: 'ChatGPT और AI Agent में key difference क्या है?', opts: ['ChatGPT is faster','AI Agents take actions and use tools, ChatGPT only answers','ChatGPT is more intelligent','Agents cost less'], optsHi: ['ChatGPT तेज़ है','AI Agents actions लेते हैं और tools use करते हैं, ChatGPT सिर्फ answer देता है','ChatGPT ज़्यादा intelligent है','Agents कम costly हैं'], c: 1, ex: 'AI Agents take actions! They can browse the web, send emails, run code, book tickets — not just answer questions. They operate in a loop: Reason → Act → Observe → Repeat.', exHi: 'AI Agents actions लेते हैं! वे web browse करते हैं, emails भेजते हैं, code run करते हैं।' },
                { q: 'What does "ReAct" stand for in AI agents?', qHi: 'AI agents में "ReAct" का मतलब क्या है?', opts: ['React.js framework','Reasoning + Acting','Reactive Architecture','Real-time Action'], optsHi: ['React.js framework','Reasoning + Acting','Reactive Architecture','Real-time Action'], c: 1, ex: 'Reasoning + Acting! The ReAct framework lets agents Reason about what to do, Act using a tool, Observe the result, then Reason again. This loop continues until the goal is achieved.', exHi: 'Reasoning + Acting! ReAct framework agents को Reason, Act, Observe, Reason again करने देता है।' },
                { q: 'Which AI agent can write and execute complete software projects?', qHi: 'कौन सा AI agent complete software projects लिख और execute कर सकता है?', opts: ['ChatGPT','Devin (by Cognition)','Alexa','Siri'], optsHi: ['ChatGPT','Devin (by Cognition)','Alexa','Siri'], c: 1, ex: 'Devin by Cognition! Devin is the world\'s first AI software engineer. It can take a task description, set up its own environment, write code, debug, run tests, and deploy apps — like a real developer!', exHi: 'Devin by Cognition! दुनिया का पहला AI software engineer। Code लिखना, debug करना, deploy करना सब खुद।' },
                { q: 'In a Python AI agent, what is a "tool"?', qHi: 'Python AI agent में "tool" क्या होता है?', opts: ['A Python editor','A function the agent can call to perform specific actions','An AI model','A database'], optsHi: ['Python editor','A function जो agent specific actions perform करने के लिए call कर सकता है','AI model','Database'], c: 1, ex: 'A callable function! Tools are Python functions that extend what an agent can do — calculator(), search_web(), send_email(), check_weather(). The agent decides when and how to call each tool.', exHi: 'Callable function! Tools Python functions हैं जो agent की capabilities extend करते हैं।' },
                { q: 'What is "Claude Computer Use" by Anthropic?', qHi: 'Anthropic का "Claude Computer Use" क्या है?', opts: ['A coding tool','An AI that can control a computer like a human — click, type, browse','A chat interface','A model training tool'], optsHi: ['Coding tool','AI जो computer को human की तरह control कर सके — click, type, browse','Chat interface','Model training tool'], c: 1, ex: 'AI computer control! Claude Computer Use lets AI literally use a computer — moving the mouse, clicking buttons, typing text, opening apps. It can complete real computer tasks autonomously!', exHi: 'AI computer control! Claude Computer Use AI को literally computer use करने देता है।' },
              ]
            }
          ]
        },
        {
          id: 'c12_2', icon: '🔧', title: 'Fine-Tuning — Training AI on Your Own Data', titleHi: 'Fine-Tuning — AI को अपने Data पर Train करना', xp: 70,
          slides: [
            { type: 'teach', bot: 'c', botName: 'FineBot 🔧', botNameHi: 'FineBot 🔧',
              tag: 'CLASS 12 · FINE-TUNING · CHAPTER 2', tagHi: 'कक्षा 12 · Fine-Tuning · अध्याय 2',
              title: 'Fine-Tuning — Make Any AI Expert in Your Domain!', titleHi: 'Fine-Tuning — किसी भी AI को आपके domain में Expert बनाओ!',
              intro: 'ChatGPT is a generalist. Fine-tuning creates a specialist — a doctor AI, a legal AI, a Rajasthani language AI, anything you want.',
              introHi: 'ChatGPT generalist है। Fine-tuning specialist बनाता है — doctor AI, legal AI, Rajasthani language AI।'
            },
            { type: 'concepts', tag: 'CLASS 12 · FINE-TUNING CONCEPTS',
              title: 'Fine-Tuning vs RAG vs Prompt Engineering', titleHi: 'Fine-Tuning vs RAG vs Prompt Engineering',
              intro: 'Three ways to customize AI behavior — each with different use cases and costs.',
              introHi: 'AI behavior customize करने के तीन तरीके — हर एक के अलग use cases और costs।',
              items: [
                { em:'✍️', l:'Prompt Engineering', lHi:'Prompt Engineering', d:'Just write better instructions. Free, instant, but limited. Best for: one-time tasks, general improvements.', dHi:'बस बेहतर instructions लिखो। Free, instant, लेकिन limited।' },
                { em:'🔗', l:'RAG (Retrieval)', lHi:'RAG (Retrieval)', d:'Add a knowledge database. Cheap, updatable, no training needed. Best for: company docs, live data, custom knowledge.', dHi:'Knowledge database add करो। Cheap, updatable, no training।' },
                { em:'🎯', l:'Fine-Tuning', lHi:'Fine-Tuning', d:'Retrain model on your data. Expensive ($100-$10,000), slow, but highest quality. Best for: specific tone, style, domain expertise.', dHi:'Model को आपके data पर retrain करो। Expensive लेकिन highest quality।' },
                { em:'🏥', l:'Medical Fine-Tuning', lHi:'Medical Fine-Tuning', d:'BioGPT — fine-tuned on 15 million medical papers. Now outperforms general GPT-4 on medical questions!', dHi:'BioGPT — 1.5 करोड़ medical papers पर fine-tuned। Medical questions पर GPT-4 को हराता है!' },
                { em:'⚖️', l:'Legal Fine-Tuning', lHi:'Legal Fine-Tuning', d:'Harvey AI — fine-tuned on legal documents. Used by top law firms for contract review. Replaces $500/hr lawyers for routine work!', dHi:'Harvey AI — legal documents पर fine-tuned। Top law firms use करती हैं।' },
                { em:'💻', l:'Code Fine-Tuning', lHi:'Code Fine-Tuning', d:'GitHub Copilot — fine-tuned on 54 million GitHub repositories. Knows every coding pattern ever written!', dHi:'GitHub Copilot — 5.4 करोड़ GitHub repositories पर fine-tuned।' },
              ]
            },
            { type: 'code', tag: 'CLASS 12 · FINE-TUNING CODE · CODING CHALLENGE',
              title: '💻 Coding Challenge: Prepare Fine-Tuning Data!', titleHi: '💻 Coding Challenge: Fine-Tuning Data तैयार करो!',
              intro: 'This is how you prepare a dataset to fine-tune an AI model — the first step of building your own specialized AI.',
              introHi: 'यह है कि आप AI model fine-tune करने के लिए dataset कैसे तैयार करते हैं।',
              files: [{
                name: 'prepare_finetune_data.py',
                lines: [
                  { t:'c', v:'# CLASS 12 CODING CHALLENGE: Prepare Fine-Tuning Dataset' },
                  { t:'c', v:'# Create training data to fine-tune AI for Rajasthani culture' },
                  { t:'kw', v:'import' }, { t:'n', v:' json' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Fine-tuning data format: question-answer pairs' },
                  { t:'v', v:'training_data' }, { t:'n', v:' = [' },
                  { t:'n', v:'    {"prompt": "What is the famous palace in Jaipur?", ' },
                  { t:'n', v:'     "completion": "Hawa Mahal in Jaipur, built in 1799 by Sawai Pratap Singh."},' },
                  { t:'n', v:'    {"prompt": "What is the traditional dress of Rajasthan?", ' },
                  { t:'n', v:'     "completion": "Ghagra-choli for women and dhoti-kurta with pagri for men."},' },
                  { t:'n', v:'    {"prompt": "Famous AI startup from Jaipur?", ' },
                  { t:'n', v:'     "completion": "STU-BRAIN - AI education platform for schools by Vaibhav Sonava."},' },
                  { t:'n', v:']' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Convert to JSONL format (required for fine-tuning)' },
                  { t:'kw', v:'with' }, { t:'fn', v:' open' }, { t:'n', v:'(' }, { t:'s', v:'"training_data.jsonl"' }, { t:'n', v:", 'w') " }, { t:'kw', v:'as' }, { t:'n', v:' f:' },
                  { t:'kw', v:'    for' }, { t:'n', v:' item ' }, { t:'kw', v:'in' }, { t:'n', v:' training_data:' },
                  { t:'v', v:'        formatted' }, { t:'n', v:' = {' },
                  { t:'s', v:'            "messages"' }, { t:'n', v:': [' },
                  { t:'n', v:'                {' }, { t:'s', v:'"role"' }, { t:'n', v:': ' }, { t:'s', v:'"user"' }, { t:'n', v:', ' }, { t:'s', v:'"content"' }, { t:'n', v:': item[' }, { t:'s', v:'"prompt"' }, { t:'n', v:']},' },
                  { t:'n', v:'                {' }, { t:'s', v:'"role"' }, { t:'n', v:': ' }, { t:'s', v:'"assistant"' }, { t:'n', v:', ' }, { t:'s', v:'"content"' }, { t:'n', v:': item[' }, { t:'s', v:'"completion"' }, { t:'n', v:']}' },
                  { t:'n', v:'            ]' },
                  { t:'n', v:'        }' },
                  { t:'n', v:'        f.' }, { t:'fn', v:'write' }, { t:'n', v:'(json.' }, { t:'fn', v:'dumps' }, { t:'n', v:'(formatted) + ' }, { t:'s', v:'"\\n"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'f"✅ Created {len(training_data)} training examples!"' }, { t:'n', v:')' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'"Upload training_data.jsonl to OpenAI/HuggingFace to fine-tune!"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'o', v:'✅ Created 3 training examples!' },
                  { t:'o', v:'Upload training_data.jsonl to OpenAI/HuggingFace to fine-tune!' },
                ]
              }],
              extra: `<div class="callout cal-tip"><span class="cal-icon">🏆</span><div><strong>Challenge:</strong> Add 10 more Q&A pairs about Rajasthan, India, or AI topics. The more data you add, the better the fine-tuned model will be! Share your dataset with your class.</div></div>`
            },
            { type: 'quiz', tag: 'CLASS 12 · FINE-TUNING QUIZ',
              title: '🧩 Fine-Tuning — Practice Quiz (10 Questions)', titleHi: '🧩 Fine-Tuning — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What is the main purpose of fine-tuning an LLM?', qHi: 'LLM fine-tuning का main purpose क्या है?', opts: ['Make it faster','Specialize it for a specific domain or task','Make it cheaper','Add more parameters'], optsHi: ['इसे तेज़ बनाना','इसे specific domain या task के लिए specialize करना','इसे सस्ता बनाना','ज़्यादा parameters add करना'], c: 1, ex: 'Specialize it! Fine-tuning takes a general model (like GPT-4) and trains it further on domain-specific data to make it expert in that area — medical, legal, coding, language etc.', exHi: 'Specialize करना! Fine-tuning एक general model को domain-specific data पर और train करता है।' },
                { q: 'Which format is commonly used for fine-tuning training data?', qHi: 'Fine-tuning training data के लिए कौन सा format commonly use होता है?', opts: ['CSV only','JSONL (JSON Lines)','PDF','Excel spreadsheet'], optsHi: ['सिर्फ CSV','JSONL (JSON Lines)','PDF','Excel spreadsheet'], c: 1, ex: 'JSONL! JSON Lines format has one JSON object per line. Each line contains a training example with prompt and completion (or messages for chat). Easy to process large datasets line by line.', exHi: 'JSONL! JSON Lines format में हर line एक JSON object है। हर line में prompt और completion होता है।' },
                { q: 'BioGPT is an LLM fine-tuned on what type of data?', qHi: 'BioGPT किस type के data पर fine-tuned LLM है?', opts: ['Legal documents','15 million medical/biomedical research papers','Social media posts','Programming code'], optsHi: ['Legal documents','1.5 करोड़ medical research papers','Social media posts','Programming code'], c: 1, ex: '15 million medical papers! BioGPT was fine-tuned by Microsoft on 15M+ PubMed medical articles. It now outperforms general GPT-4 on medical question answering tasks.', exHi: '1.5 करोड़ medical papers! BioGPT को Microsoft ने PubMed medical articles पर fine-tune किया।' },
                { q: 'What is the main advantage of fine-tuning over RAG?', qHi: 'RAG के comparison में fine-tuning का main advantage क्या है?', opts: ['Free cost','Knowledge permanently baked into model weights = faster inference','No training data needed','Works without internet'], optsHi: ['Free cost','Knowledge permanently model weights में = faster inference','Training data की ज़रूरत नहीं','Internet के बिना काम करता है'], c: 1, ex: 'Baked into weights = faster! Fine-tuned models have knowledge embedded in their parameters, so no retrieval step needed. This makes responses faster and the model behaves more naturally with the domain knowledge.', exHi: 'Weights में permanently baked = तेज़! Fine-tuned models की knowledge parameters में embedded है।' },
                { q: 'How many GitHub repositories was GitHub Copilot fine-tuned on?', qHi: 'GitHub Copilot कितने GitHub repositories पर fine-tuned था?', opts: ['1 million','10 million','54 million','1 billion'], optsHi: ['10 लाख','1 करोड़','5.4 करोड़','100 करोड़'], c: 2, ex: '54 million repositories! GitHub Copilot was trained on 54 million+ GitHub repos, giving it knowledge of every popular coding pattern, library, and problem-solution combination ever published on GitHub.', exHi: '5.4 करोड़ repositories! GitHub Copilot 5.4 करोड़ GitHub repos पर train हुआ था।' },
              ]
            }
          ]
        },
        {
          id: 'c12_3', icon: '🏗️', title: 'Build a Real AI App — Full Stack Python Project', titleHi: 'Real AI App बनाओ — Full Stack Python Project', xp: 80,
          slides: [
            { type: 'teach', bot: 'b', botName: 'BuildBot 🏗️', botNameHi: 'BuildBot 🏗️',
              tag: 'CLASS 12 · BUILD AI APP · CHAPTER 3', tagHi: 'कक्षा 12 · AI App Build करो · अध्याय 3',
              title: 'Build a Complete AI-Powered Study Assistant!', titleHi: 'Complete AI-Powered Study Assistant बनाओ!',
              intro: 'This chapter guides you through building a real, deployable AI application — an intelligent study assistant that can answer questions about any topic.',
              introHi: 'यह chapter आपको एक real, deployable AI application build करने में guide करता है।'
            },
            { type: 'code', tag: 'CLASS 12 · FULL PROJECT · CODING CHALLENGE',
              title: '💻 Coding Challenge: AI Study Assistant (Complete App)', titleHi: '💻 Coding Challenge: AI Study Assistant (Complete App)',
              intro: 'Build a complete Python CLI application that uses AI to help students study any topic. This is a REAL project for your portfolio!',
              introHi: 'Complete Python CLI application build करो जो students को study में help करे। यह आपके portfolio के लिए REAL project है!',
              files: [{
                name: 'study_assistant.py',
                lines: [
                  { t:'c', v:'# CLASS 12 MAJOR PROJECT: AI Study Assistant' },
                  { t:'c', v:'# A complete AI app - add to your portfolio!' },
                  { t:'kw', v:'import' }, { t:'n', v:' requests, json, os' },
                  { t:'b', v:'' },
                  { t:'v', v:'API_KEY' }, { t:'n', v:' = os.environ.' }, { t:'fn', v:'get' }, { t:'n', v:'(' }, { t:'s', v:'"OPENROUTER_API_KEY"' }, { t:'n', v:', ' }, { t:'s', v:'"demo"' }, { t:'n', v:')' },
                  { t:'v', v:'HISTORY' }, { t:'n', v:' = []  ' }, { t:'c', v:'# Stores conversation' },
                  { t:'b', v:'' },
                  { t:'kw', v:'def' }, { t:'fn', v:' chat' }, { t:'n', v:'(message, subject="General"):' },
                  { t:'v', v:'    HISTORY' }, { t:'n', v:'.' }, { t:'fn', v:'append' }, { t:'n', v:'({' }, { t:'s', v:'"role"' }, { t:'n', v:': ' }, { t:'s', v:'"user"' }, { t:'n', v:', ' }, { t:'s', v:'"content"' }, { t:'n', v:': message})' },
                  { t:'v', v:'    system' }, { t:'n', v:' = ' }, { t:'s', v:'f"You are an expert {subject} tutor for Indian Class 12 students. Explain clearly with examples. Answer in same language as question."' },
                  { t:'v', v:'    response' }, { t:'n', v:' = requests.' }, { t:'fn', v:'post' }, { t:'n', v:'(' },
                  { t:'s', v:'        "https://openrouter.ai/api/v1/chat/completions",' },
                  { t:'n', v:'        headers={' }, { t:'s', v:'"Authorization"' }, { t:'n', v:': f' }, { t:'s', v:'"Bearer {API_KEY}"' }, { t:'n', v:'},' },
                  { t:'n', v:'        json={' }, { t:'s', v:'"model"' }, { t:'n', v:': ' }, { t:'s', v:'"meta-llama/llama-3.1-8b-instruct:free"' }, { t:'n', v:','}, { t:'s', v:'"messages"' }, { t:'n', v:': [{' }, { t:'s', v:'"role"' }, { t:'n', v:':' }, { t:'s', v:'"system"' }, { t:'n', v:','}, { t:'s', v:'"content"' }, { t:'n', v:': system}] + HISTORY}' },
                  { t:'n', v:'    )' },
                  { t:'v', v:'    answer' }, { t:'n', v:' = response.' }, { t:'fn', v:'json' }, { t:'n', v:"()['choices'][0]['message']['content']" },
                  { t:'v', v:'    HISTORY' }, { t:'n', v:'.' }, { t:'fn', v:'append' }, { t:'n', v:'({' }, { t:'s', v:'"role"' }, { t:'n', v:': ' }, { t:'s', v:'"assistant"' }, { t:'n', v:', ' }, { t:'s', v:'"content"' }, { t:'n', v:': answer})' },
                  { t:'kw', v:'    return' }, { t:'n', v:' answer' },
                  { t:'b', v:'' },
                  { t:'kw', v:'def' }, { t:'fn', v:' generate_quiz' }, { t:'n', v:'(topic, num=5):' },
                  { t:'v', v:'    prompt' }, { t:'n', v:' = ' }, { t:'s', v:'f"Generate {num} MCQ quiz questions on {topic} for Class 12. Format as numbered list with 4 options and correct answer marked."' },
                  { t:'kw', v:'    return' }, { t:'fn', v:' chat' }, { t:'n', v:'(prompt, topic)' },
                  { t:'b', v:'' },
                  { t:'c', v:'# Main app loop' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'"🧠 STU-BRAIN Study Assistant"' }, { t:'n', v:')' },
                  { t:'fn', v:'print' }, { t:'n', v:'(' }, { t:'s', v:'"Commands: /quiz <topic> | /clear | /exit"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'kw', v:'while' }, { t:'n', v:' True:' },
                  { t:'v', v:'    user_input' }, { t:'n', v:' = ' }, { t:'fn', v:'input' }, { t:'n', v:'(' }, { t:'s', v:'"You: "' }, { t:'n', v:')' },
                  { t:'kw', v:'    if' }, { t:'n', v:' user_input == ' }, { t:'s', v:'"/exit"' }, { t:'n', v:': ' }, { t:'kw', v:'break' },
                  { t:'kw', v:'    elif' }, { t:'n', v:' user_input.' }, { t:'fn', v:'startswith' }, { t:'n', v:'(' }, { t:'s', v:'"/quiz"' }, { t:'n', v:'):' },
                  { t:'v', v:'        topic' }, { t:'n', v:' = user_input.' }, { t:'fn', v:'replace' }, { t:'n', v:'(' }, { t:'s', v:'"/quiz "' }, { t:'n', v:', ' }, { t:'s', v:'""' }, { t:'n', v:')' },
                  { t:'fn', v:'        print' }, { t:'n', v:'(f' }, { t:'s', v:'"\\n📝 Quiz on {topic}:\\n"' }, { t:'n', v:', ' }, { t:'fn', v:'generate_quiz' }, { t:'n', v:'(topic))' },
                  { t:'kw', v:'    else' }, { t:'n', v:':' },
                  { t:'fn', v:'        print' }, { t:'n', v:'(f' }, { t:'s', v:'"\\n🤖 AI: {chat(user_input)}\\n"' }, { t:'n', v:')' },
                  { t:'b', v:'' },
                  { t:'o', v:'🧠 STU-BRAIN Study Assistant' },
                  { t:'o', v:'Commands: /quiz <topic> | /clear | /exit' },
                  { t:'o', v:'You: /quiz Neural Networks' },
                  { t:'o', v:'📝 Quiz on Neural Networks:' },
                  { t:'o', v:'1. What is an activation function? (a) ReLU (b) Sigmoid...' },
                ]
              }],
              extra: `<div class="callout cal-tip"><span class="cal-icon">🚀</span><div><strong>Portfolio Challenge:</strong> Extend this with: (1) Save conversation history to a file, (2) Add a /summary command that summarizes your study session, (3) Deploy it as a Telegram bot! Each feature = a skill to mention in interviews.</div></div>`
            },
            { type: 'quiz', tag: 'CLASS 12 · BUILD AI APP QUIZ',
              title: '🧩 Building AI Apps — Practice Quiz (10 Questions)', titleHi: '🧩 AI Apps Build करना — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'What does os.environ.get("API_KEY") do in Python?', qHi: 'Python में os.environ.get("API_KEY") क्या करता है?', opts: ['Creates an API key','Reads API key from environment variable (safe storage)','Deletes the API key','Connects to the internet'], optsHi: ['API key बनाता है','Environment variable से API key पढ़ता है (safe storage)','API key delete करता है','Internet से connect करता है'], c: 1, ex: 'Reads from environment variables! Never hardcode API keys in your source code (security risk). Store them in environment variables or .env files. os.environ.get() reads them safely.', exHi: 'Environment variables से पढ़ता है! API keys को कभी source code में hardcode मत करो।' },
                { q: 'Why do we maintain a HISTORY list in the study assistant?', qHi: 'Study assistant में HISTORY list क्यों maintain करते हैं?', opts: ['For debugging only','To give AI context of previous messages (conversation memory)','To store user passwords','To speed up responses'], optsHi: ['सिर्फ debugging के लिए','AI को previous messages का context देने के लिए (conversation memory)','User passwords store करने के लिए','Responses speed करने के लिए'], c: 1, ex: 'Conversation memory! Without history, AI forgets every previous message. By sending the full HISTORY with each request, AI remembers what was discussed earlier and gives contextual answers.', exHi: 'Conversation memory! History के बिना AI हर previous message भूल जाता है।' },
                { q: 'What Python command reads user input in a terminal app?', qHi: 'Terminal app में user input पढ़ने के लिए कौन सा Python command use होता है?', opts: ['read()','scan()','input()','get_input()'], optsHi: ['read()','scan()','input()','get_input()'], c: 2, ex: 'input()! The built-in Python function input("prompt") displays a message and waits for the user to type something. It returns the typed string. Essential for building interactive CLI applications.', exHi: 'input()! Built-in Python function input("prompt") message display करता है और user के type करने का wait करता है।' },
                { q: 'What is the benefit of building a Telegram bot version of an app?', qHi: 'App का Telegram bot version बनाने का benefit क्या है?', opts: ['It looks more professional','Telegram has 800M users - instant distribution to anyone with the app','It is faster','It requires less code'], optsHi: ['ज़्यादा professional दिखता है','Telegram के 80 करोड़ users हैं - किसी को भी instant distribution','यह तेज़ है','कम code चाहिए'], c: 1, ex: '800M users distribution! Telegram has 800+ million users globally. Your bot is instantly accessible to anyone — no app store, no download, no website needed. Perfect for rapid deployment!', exHi: '80 करोड़ users distribution! Telegram के 80+ करोड़ users globally हैं। आपका bot instantly accessible है।' },
                { q: 'What should you NEVER do with API keys in your code?', qHi: 'API keys के साथ code में आपको NEVER क्या करना चाहिए?', opts: ['Use them in functions','Hardcode them directly in source code','Store in environment variables','Use them for API calls'], optsHi: ['Functions में use करना','Source code में directly hardcode करना','Environment variables में store करना','API calls के लिए use करना'], c: 1, ex: 'Never hardcode! Hardcoded keys in source code get committed to GitHub and become public — anyone can use your API key and run up your bill. Always use environment variables or .env files!', exHi: 'कभी hardcode मत करो! Source code में keys GitHub पर commit हो जाती हैं और public हो जाती हैं।' },
              ]
            }
          ]
        },
        {
          id: 'c12_4', icon: '🛡️', title: 'AI Ethics, Safety & India\'s AI Future', titleHi: 'AI Ethics, Safety और भारत का AI Future', xp: 60,
          slides: [
            { type: 'teach', bot: 'd', botName: 'EthicsBot 🛡️', botNameHi: 'EthicsBot 🛡️',
              tag: 'CLASS 12 · AI ETHICS · CHAPTER 4', tagHi: 'कक्षा 12 · AI Ethics · अध्याय 4',
              title: 'AI Ethics — Building AI That\'s Good for Everyone!', titleHi: 'AI Ethics — AI जो सबके लिए अच्छा हो!',
              intro: 'With great power comes great responsibility. As future AI builders, you must understand the ethical challenges and your responsibility.',
              introHi: 'बड़ी शक्ति के साथ बड़ी जिम्मेदारी आती है। Future AI builders के रूप में, आपको ethical challenges समझने होंगे।',
              speech: `<span class="hi">Why AI Ethics matters:</span><br><br>
🚗 <span class="em">Tesla crash</span> — Autonomous car killed pedestrian. Who is responsible?<br>
👤 <span class="cool">Deepfakes</span> — AI-generated fake videos of politicians<br>
⚖️ <span class="hi">Bias</span> — Amazon hiring AI rejected women's CVs<br>
🔒 <span class="em">Privacy</span> — AI knows your health, location, relationships<br><br>
<span class="cool">Key ethical principles for AI:</span><br>
✅ <strong>Fairness</strong> — No discrimination by race, gender, religion<br>
✅ <strong>Transparency</strong> — Explain how decisions are made<br>
✅ <strong>Privacy</strong> — Protect personal data<br>
✅ <strong>Safety</strong> — Test before deploying in critical systems<br>
✅ <strong>Accountability</strong> — Humans responsible for AI decisions<br><br>
<span class="hi">India's AI Policy:</span><br>
🇮🇳 <strong>India AI Mission</strong> — ₹10,000 crore investment<br>
🤖 <strong>Bharat GPT</strong> — AI in all 22 Indian languages<br>
🏥 <strong>AI in Healthcare</strong> — Arogya AI, screening 10M patients<br>
🌾 <strong>AI in Agriculture</strong> — Crop prediction for 100M farmers`,
              speechHi: `<span class="hi">AI Ethics क्यों जरूरी है:</span><br><br>
🚗 <span class="em">Tesla crash</span> — Autonomous car ने pedestrian को मारा। जिम्मेदार कौन?<br>
👤 <span class="cool">Deepfakes</span> — Politicians के AI-generated fake videos<br>
⚖️ <span class="hi">Bias</span> — Amazon hiring AI ने women's CVs reject किए<br><br>
<span class="cool">AI के लिए key ethical principles:</span><br>
✅ <strong>Fairness</strong> — Race, gender, religion से भेदभाव नहीं<br>
✅ <strong>Transparency</strong> — Explain करो decisions कैसे होते हैं<br>
✅ <strong>Privacy</strong> — Personal data protect करो`
            },
            { type: 'concepts', tag: 'CLASS 12 · INDIA AI FUTURE',
              title: 'India\'s AI Opportunity — Your Career!', titleHi: 'India का AI Opportunity — आपका Career!',
              intro: 'India is becoming a global AI superpower. This creates massive career opportunities for your generation.',
              introHi: 'India एक global AI superpower बन रहा है। यह आपकी generation के लिए massive career opportunities बनाता है।',
              items: [
                { em:'💰', l:'AI Market Size', lHi:'AI Market Size', d:'India\'s AI market: $7.8B (2024) → $28.8B (2028). Fastest growing AI market in Asia!', dHi:'India का AI market: ₹65,000 Cr (2024) → ₹2.4 लाख Cr (2028)। Asia में fastest growing!' },
                { em:'👩‍💻', l:'AI Jobs in India', lHi:'India में AI Jobs', d:'1 million AI/ML jobs expected by 2026. Average salary: ₹12-25 LPA. Top roles: ML Engineer, Data Scientist, AI Researcher.', dHi:'2026 तक 10 लाख AI/ML jobs। Average salary: ₹12-25 LPA।' },
                { em:'🦙', l:'Bharat GPT', lHi:'Bharat GPT', d:'IIT Bombay\'s LLM trained on all 22 Indian languages. Can handle Hindi, Tamil, Telugu, Rajasthani dialect AI needs!', dHi:'IIT Bombay का LLM 22 Indian languages पर train हुआ। Hindi, Tamil, Telugu सब handle करता है!' },
                { em:'🌾', l:'AI for Farmers', lHi:'Farmers के लिए AI', d:'Fasal.in — AI predicts crop disease before it spreads. Used by 2M+ Rajasthan farmers. Saves ₹20,000/farmer/year!', dHi:'Fasal.in — AI crop disease predict करता है। 20 लाख+ Rajasthan farmers use करते हैं।' },
                { em:'🏥', l:'AI in Healthcare', lHi:'Healthcare में AI', d:'Arogya AI detects 14 diseases from basic health scans in rural India where doctors are unavailable.', dHi:'Arogya AI rural India में basic health scans से 14 diseases detect करता है जहाँ doctors नहीं हैं।' },
                { em:'🚀', l:'Your Path', lHi:'आपका Path', d:'STU-BRAIN Class 12 → College (CS/AI) → Internship at Jaipur AI startups → Build your own AI startup!', dHi:'STU-BRAIN Class 12 → College (CS/AI) → Jaipur AI startups → अपना AI startup बनाओ!' },
              ]
            },
            { type: 'quiz', tag: 'CLASS 12 · AI ETHICS QUIZ',
              title: '🧩 AI Ethics & India\'s Future — Practice Quiz (10 Questions)', titleHi: '🧩 AI Ethics और India\'s Future — अभ्यास प्रश्नोत्तरी',
              questions: [
                { q: 'Amazon\'s AI hiring tool had what ethical problem?', qHi: 'Amazon के AI hiring tool में कौन सी ethical problem थी?', opts: ['It was too slow','It was biased against women — rejected their CVs','It cost too much','It made wrong predictions'], optsHi: ['बहुत slow था','यह women के खिलाफ biased था — उनके CVs reject करता था','बहुत costly था','गलत predictions करता था'], c: 1, ex: 'Bias against women! Amazon\'s AI was trained on historical hiring data that was mostly male. It learned to penalize CVs that mentioned "women\'s" (like women\'s chess club). Amazon scrapped the tool in 2018.', exHi: 'Women के खिलाफ bias! Amazon का AI historical hiring data पर train हुआ था जो mostly male था।' },
                { q: 'What is a "deepfake"?', qHi: '"Deepfake" क्या होता है?', opts: ['A deep neural network','AI-generated fake video/audio of a real person','A type of database','A security protocol'], optsHi: ['Deep neural network','Real person का AI-generated fake video/audio','Database का type','Security protocol'], c: 1, ex: 'AI-generated fake media! Deepfakes use GANs to create hyper-realistic fake videos of real people saying things they never said. Used for misinformation, fraud, and reputation damage.', exHi: 'AI-generated fake media! Deepfakes GANs use करते हैं real लोगों के fake videos बनाने के लिए।' },
                { q: 'India\'s AI market is expected to grow to what size by 2028?', qHi: 'India का AI market 2028 तक कितना बड़ा होने की उम्मीद है?', opts: ['$5 billion','$28.8 billion','$100 billion','$1 trillion'], optsHi: ['$5 billion','$28.8 billion','$100 billion','$1 trillion'], c: 1, ex: '$28.8 billion! India\'s AI market is growing at 35% CAGR — one of the fastest in the world. This creates massive opportunities for the generation studying AI today.', exHi: '$28.8 billion! India का AI market 35% CAGR से बढ़ रहा है — दुनिया में सबसे तेज़ में से एक।' },
                { q: 'Which principle of AI ethics says you must be able to explain AI decisions?', qHi: 'AI ethics का कौन सा principle कहता है कि AI decisions explain कर सकें?', opts: ['Fairness','Privacy','Transparency','Accountability'], optsHi: ['Fairness','Privacy','Transparency','Accountability'], c: 2, ex: 'Transparency! The principle that AI systems should be explainable — especially in high-stakes decisions like loan approvals, medical diagnosis, or criminal sentencing. "Black box" AI is dangerous!', exHi: 'Transparency! AI systems explainable होने चाहिए — खासकर loan approvals, medical diagnosis में।' },
                { q: 'Fasal.in AI helps Rajasthan farmers by doing what?', qHi: 'Fasal.in AI Rajasthan farmers की कैसे मदद करता है?', opts: ['Buying their crops','Predicting crop diseases before they spread','Providing loans','Teaching farming techniques'], optsHi: ['उनकी फसल खरीदकर','Crop diseases predict करके उनके फैलने से पहले','Loans provide करके','Farming techniques सिखाकर'], c: 1, ex: 'Predicts crop diseases! Fasal.in\'s AI analyzes weather data, soil conditions, and satellite images to predict disease outbreaks 2-3 weeks in advance, saving farmers ₹20,000+ per year on crop losses.', exHi: 'Crop diseases predict करता है! Fasal.in weather data, soil conditions analyze करके 2-3 weeks पहले predict करता है।' },
              ]
            }
          ],
        },
        {
          id: 'c12_5', icon: '🔬', title: 'Advanced Python — Classes, APIs and Real AI Projects', titleHi: 'Advanced Python — Classes, APIs and Real AI Projects', xp: 80,
          slides: [
            { type: 'teach', bot: 'a', botName: 'PyBot 🐍', botNameHi: 'PyBot 🐍',
              tag: 'CLASS 12 · ADVANCED PYTHON · CHAPTER 5', tagHi: 'CLASS 12 · ADVANCED PYTHON · CHAPTER 5',
              title: 'Advanced Python — How Professional AI Engineers Code!', titleHi: 'Advanced Python — How Professional AI Engineers Code!',
              intro: 'Classes, APIs, and error handling — skills that separate beginners from professional AI engineers at Google, TCS, Infosys.', introHi: 'Classes, APIs, and error handling — skills that separate beginners from professional AI engineers at Google, TCS, Infosys.',
              speech: '<span class="hi">Advanced Python</span> = Professional AI Engineering<br><br>🏗️ <strong>Classes (OOP)</strong> — Build reusable AI components<br>🌐 <strong>APIs</strong> — Connect to any AI service worldwide<br>⚡ <strong>Error Handling</strong> — Build production systems<br><br><span class="cool">Real Example:</span> When you call ChatGPT API → Python class sends request → handles response → returns text<br><span class="hi">You will code this today!</span>',
              speechHi: '<span class="hi">Advanced Python</span> = Professional AI Engineering<br><br>🏗️ <strong>Classes (OOP)</strong> — Build reusable AI components<br>🌐 <strong>APIs</strong> — Connect to any AI service worldwide<br>⚡ <strong>Error Handling</strong> — Build production systems<br><br><span class="cool">Real Example:</span> When you call ChatGPT API → Python class sends request → handles response → returns text<br><span class="hi">You will code this today!</span>'
            },
            { type: 'code', tag: 'CLASS 12 · OOP CODE', tagHi: 'CLASS 12 · OOP CODE',
              title: 'Build a Complete AI Student Analyzer!', titleHi: 'Build a Complete AI Student Analyzer!',
              intro: 'Study this code carefully — every line matters!', introHi: 'इस code को ध्यान से study करें!',
              files: [{
                name: 'ai_student_analyzer.py',
                lines: [
                  { t:'c', v:'# Advanced Python — Class 12 STU-BRAIN' },
                  { t:'c', v:'# AI-Powered Student Performance Analyzer' },
                  { t:'b', v:'' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' numpy ' },
                  { t:'kw', v:'as' },
                  { t:'fn', v:' np' },
                  { t:'kw', v:'from' },
                  { t:'n', v:' datetime ' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' datetime' },
                  { t:'b', v:'' },
                  { t:'c', v:'# CLASS (OOP) — Professional AI Component' },
                  { t:'kw', v:'class' },
                  { t:'fn', v:' AIStudentAnalyzer' },
                  { t:'n', v:':' },
                  { t:'b', v:'' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' __init__' },
                  { t:'n', v:'(self, school_name):' },
                  { t:'n', v:'        self.school = school_name' },
                  { t:'n', v:'        self.students = []' },
                  { t:'b', v:'' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' add_student' },
                  { t:'n', v:'(self, name, scores):' },
                  { t:'n', v:'        student = {' },
                  { t:'s', v:'            "name"' },
                  { t:'n', v:': name,' },
                  { t:'s', v:'            "average"' },
                  { t:'n', v:': np.mean(scores),' },
                  { t:'s', v:'            "grade"' },
                  { t:'n', v:': self._get_grade(np.mean(scores))' },
                  { t:'n', v:'        }' },
                  { t:'n', v:'        self.students.append(student)' },
                  { t:'b', v:'' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' _get_grade' },
                  { t:'n', v:'(self, avg):' },
                  { t:'kw', v:'        if' },
                  { t:'n', v:' avg >= ' },
                  { t:'num', v:'90' },
                  { t:'n', v:': ' },
                  { t:'kw', v:'return' },
                  { t:'s', v:' "A+"' },
                  { t:'kw', v:'        elif' },
                  { t:'n', v:' avg >= ' },
                  { t:'num', v:'80' },
                  { t:'n', v:': ' },
                  { t:'kw', v:'return' },
                  { t:'s', v:' "A"' },
                  { t:'kw', v:'        else' },
                  { t:'n', v:': ' },
                  { t:'kw', v:'return' },
                  { t:'s', v:' "B"' },
                  { t:'b', v:'' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' get_toppers' },
                  { t:'n', v:'(self, n=' },
                  { t:'num', v:'3' },
                  { t:'n', v:'):' },
                  { t:'kw', v:'        return' },
                  { t:'n', v:' sorted(self.students, key=' },
                  { t:'kw', v:'lambda' },
                  { t:'n', v:' x: x["average"], reverse=' },
                  { t:'kw', v:'True' },
                  { t:'n', v:')[:n]' },
                  { t:'b', v:'' },
                  { t:'c', v:'# USE THE CLASS' },
                  { t:'kw', v:'school' },
                  { t:'n', v:' = AIStudentAnalyzer(' },
                  { t:'s', v:'"STU-BRAIN Demo School"' },
                  { t:'n', v:')' },
                  { t:'n', v:'school.add_student(' },
                  { t:'s', v:'"Vaibhav"' },
                  { t:'n', v:', [' },
                  { t:'num', v:'95,88,92,97' },
                  { t:'n', v:'])' },
                  { t:'n', v:'school.add_student(' },
                  { t:'s', v:'"Priya"' },
                  { t:'n', v:', [' },
                  { t:'num', v:'82,89,85,91' },
                  { t:'n', v:'])' },
                  { t:'b', v:'' },
                  { t:'kw', v:'for' },
                  { t:'n', v:' s ' },
                  { t:'kw', v:'in' },
                  { t:'n', v:' school.get_toppers():' },
                  { t:'fn', v:'    print' },
                  { t:'n', v:'(f"{s[\\"name\\"]}: {s[\\"average\\"]:.1f} — {s[\\"grade\\"]}")' },
                  { t:'out', v:'# Vaibhav: 93.0 — A+' },
                  { t:'out', v:'# Priya: 86.75 — A' }
                ]
              }]
            },
            { type: 'quiz', tag: 'CLASS 12 · ADVANCED PYTHON QUIZ', tagHi: 'CLASS 12 · ADVANCED PYTHON QUIZ',
              title: '🧩 Advanced Python — 10 Question Practice Quiz', titleHi: '🧩 Advanced Python — 10 Question Practice Quiz',
              questions: [
                { q: '"class" keyword in Python?', qHi: '"class" keyword in Python?',
                  opts: ['Defines a function', 'Defines a class blueprint', 'Creates a loop', 'Imports library'], optsHi: ['Defines a function', 'Defines a class blueprint', 'Creates a loop', 'Imports library'],
                  c: 1, ex: '"class" defines a class! class MyAI: creates blueprint for objects. Fundamental for real AI systems!', exHi: '"class" defines a class! class MyAI: creates blueprint for objects. Fundamental for real AI systems!' },
                { q: '__init__() in Python class?', qHi: '__init__() in Python class?',
                  opts: ['Ends program', 'Constructor — runs when object is created', 'A loop', 'A print function'], optsHi: ['Ends program', 'Constructor — runs when object is created', 'A loop', 'A print function'],
                  c: 1, ex: '__init__() = constructor, automatically runs when object is created. Sets up the object data!', exHi: '__init__() = constructor, automatically runs when object is created. Sets up the object data!' },
                { q: '"self" in class methods refers to?', qHi: '"self" in class methods refers to?',
                  opts: ['The class name', 'The current object instance', 'Parent class', 'Python interpreter'], optsHi: ['The class name', 'The current object instance', 'Parent class', 'Python interpreter'],
                  c: 1, ex: '"self" = current object. school1.students and school2.students are separate because of self!', exHi: '"self" = current object. school1.students and school2.students are separate because of self!' },
                { q: 'Lambda creates?', qHi: 'Lambda creates?',
                  opts: ['A full class', 'Small anonymous function in one line', 'A loop', 'Import'], optsHi: ['A full class', 'Small anonymous function in one line', 'A loop', 'Import'],
                  c: 1, ex: 'Lambda = small anonymous function inline! "lambda x: x[average]" returns average field. Used in sorting!', exHi: 'Lambda = small anonymous function inline! "lambda x: x[average]" returns average field. Used in sorting!' },
                { q: 'sorted(..., reverse=True) does?', qHi: 'sorted(..., reverse=True) does?',
                  opts: ['Ascending order', 'Descending order (largest first)', 'Reverses a string', 'Deletes items'], optsHi: ['Ascending order', 'Descending order (largest first)', 'Reverses a string', 'Deletes items'],
                  c: 1, ex: 'sorted(reverse=True) = largest to smallest (descending). Perfect for finding toppers — highest score first!', exHi: 'sorted(reverse=True) = largest to smallest (descending). Perfect for finding toppers — highest score first!' },
                { q: 'Why use OOP classes in AI?', qHi: 'Why use OOP classes in AI?',
                  opts: ['Makes code longer', 'Organize and reuse code for multiple schools/models', 'Slows program', 'Not used in AI'], optsHi: ['Makes code longer', 'Organize and reuse code for multiple schools/models', 'Slows program', 'Not used in AI'],
                  c: 1, ex: 'OOP: create one class, use for 100 schools! Each school gets own object with own data. TensorFlow is OOP!', exHi: 'OOP: create one class, use for 100 schools! Each school gets own object with own data. TensorFlow is OOP!' },
                { q: 'What is an API?', qHi: 'What is an API?',
                  opts: ['A database', 'A way for programs to communicate', 'A Python library', 'A network'], optsHi: ['A database', 'A way for programs to communicate', 'A Python library', 'A network'],
                  c: 1, ex: 'API = way for your Python to communicate with external services. ChatGPT API lets your code ask questions!', exHi: 'API = way for your Python to communicate with external services. ChatGPT API lets your code ask questions!' },
                { q: 'np.array() creates?', qHi: 'np.array() creates?',
                  opts: ['A Python list', 'A NumPy array for fast math', 'Imports data', 'Draws a chart'], optsHi: ['A Python list', 'A NumPy array for fast math', 'Imports data', 'Draws a chart'],
                  c: 1, ex: 'np.array() = supercharged Python list! Math on all elements at once. AI foundation!', exHi: 'np.array() = supercharged Python list! Math on all elements at once. AI foundation!' },
                { q: 'Private method starting with _ means?', qHi: 'Private method starting with _ means?',
                  opts: ['Deleted method', 'Internal method for use only within class', 'Public method', 'External library method'], optsHi: ['Deleted method', 'Internal method for use only within class', 'Public method', 'External library method'],
                  c: 1, ex: 'Methods with _ are private by convention — internal tools used only within the class!', exHi: 'Methods with _ are private by convention — internal tools used only within the class!' },
                { q: 'min(100, predicted) does?', qHi: 'min(100, predicted) does?',
                  opts: ['Returns minimum — caps predicted at 100', 'Divides by 100', 'Returns maximum', 'Subtracts 100'], optsHi: ['Returns minimum — caps predicted at 100', 'Divides by 100', 'Returns maximum', 'Subtracts 100'],
                  c: 0, ex: 'min(100, predicted) caps score at 100. If predicted=110, returns 100. Essential for valid AI predictions!', exHi: 'min(100, predicted) caps score at 100. If predicted=110, returns 100. Essential for valid AI predictions!' }
              ]
            }
          ]
        },
        {
          id: 'c12_6', icon: '🏗️', title: 'Capstone Project — Build an AI Chatbot for Your School!', titleHi: 'Capstone Project — Build an AI Chatbot for Your School!', xp: 100,
          slides: [
            { type: 'teach', bot: 'a', botName: 'PyBot 🐍', botNameHi: 'PyBot 🐍',
              tag: 'CLASS 12 · CAPSTONE PROJECT · CHAPTER 6', tagHi: 'CLASS 12 · CAPSTONE PROJECT · CHAPTER 6',
              title: 'Your Final Project — Build Something Real That People Will Use!', titleHi: 'Your Final Project — Build Something Real That People Will Use!',
              intro: 'Class 12 ends with your BIGGEST challenge — a complete AI chatbot. Show this in college admissions and job interviews!', introHi: 'Class 12 ends with your BIGGEST challenge — a complete AI chatbot. Show this in college admissions and job interviews!',
              speech: '<span class="hi">Capstone Project</span> = Your AI Portfolio Piece 🏆<br><br><span class="em">You will build:</span><br>🤖 A chatbot answering school questions<br>🐍 Written in Python with OOP<br>📱 Deployable — anyone can use it<br><br><span class="cool">Skills: Python Classes + NLP + APIs + Error Handling</span><br><br><span class="hi">This is what engineers at Infosys, TCS, Google India build!</span>',
              speechHi: '<span class="hi">Capstone Project</span> = Your AI Portfolio Piece 🏆<br><br><span class="em">You will build:</span><br>🤖 A chatbot answering school questions<br>🐍 Written in Python with OOP<br>📱 Deployable — anyone can use it<br><br><span class="cool">Skills: Python Classes + NLP + APIs + Error Handling</span><br><br><span class="hi">This is what engineers at Infosys, TCS, Google India build!</span>'
            },
            { type: 'code', tag: 'CLASS 12 · CODING CHALLENGE', tagHi: 'CLASS 12 · CODING CHALLENGE',
              title: '💻 CODING CHALLENGE: Build a School AI Chatbot!', titleHi: '💻 CODING CHALLENGE: Build a School AI Chatbot!',
              intro: 'Study this code carefully — every line matters!', introHi: 'इस code को ध्यान से study करें!',
              files: [{
                name: 'school_chatbot.py',
                lines: [
                  { t:'c', v:'# CODING CHALLENGE — School AI Chatbot' },
                  { t:'c', v:'# Class 12 Capstone Project — STU-BRAIN' },
                  { t:'b', v:'' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' json' },
                  { t:'kw', v:'from' },
                  { t:'n', v:' datetime ' },
                  { t:'kw', v:'import' },
                  { t:'n', v:' datetime' },
                  { t:'b', v:'' },
                  { t:'kw', v:'class' },
                  { t:'fn', v:' SchoolAIChatbot' },
                  { t:'n', v:':' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' __init__' },
                  { t:'n', v:'(self, school_name):' },
                  { t:'n', v:'        self.school = school_name' },
                  { t:'n', v:'        self.count = ' },
                  { t:'num', v:'0' },
                  { t:'n', v:'        self.faqs = {' },
                  { t:'s', v:'            "timing"' },
                  { t:'n', v:': "School: 8AM - 2:30PM (Mon-Sat)",' },
                  { t:'s', v:'            "fees"' },
                  { t:'n', v:': "Annual fees: 15000. Due by April 30.",' },
                  { t:'s', v:'            "exam"' },
                  { t:'n', v:': "Half-yearly: Oct 15. Annual: March 10.",' },
                  { t:'s', v:'            "holiday"' },
                  { t:'n', v:': "Diwali: 5 days. Summer: May-June.",' },
                  { t:'s', v:'            "result"' },
                  { t:'n', v:': "Results on website within 3 days."' },
                  { t:'n', v:'        }' },
                  { t:'b', v:'' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' respond' },
                  { t:'n', v:'(self, query):' },
                  { t:'n', v:'        self.count += ' },
                  { t:'num', v:'1' },
                  { t:'n', v:'        q = query.lower()' },
                  { t:'kw', v:'        for' },
                  { t:'n', v:' keyword, answer ' },
                  { t:'kw', v:'in' },
                  { t:'n', v:' self.faqs.items():' },
                  { t:'kw', v:'            if' },
                  { t:'n', v:' keyword ' },
                  { t:'kw', v:'in' },
                  { t:'n', v:' q:' },
                  { t:'kw', v:'                return' },
                  { t:'n', v:' f"INFO: {answer}"' },
                  { t:'kw', v:'        return' },
                  { t:'s', v:'"Sorry! Call: 0141-XXXXXXXX"' },
                  { t:'b', v:'' },
                  { t:'kw', v:'    def' },
                  { t:'fn', v:' stats' },
                  { t:'n', v:'(self):' },
                  { t:'kw', v:'        return' },
                  { t:'n', v:' {"school": self.school, "questions": self.count}' },
                  { t:'b', v:'' },
                  { t:'c', v:'# TEST THE CHATBOT' },
                  { t:'kw', v:'bot' },
                  { t:'n', v:' = SchoolAIChatbot(' },
                  { t:'s', v:'"STU-BRAIN Jaipur School"' },
                  { t:'n', v:')' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'(bot.respond(' },
                  { t:'s', v:'"What are school timings?"' },
                  { t:'n', v:'))' },
                  { t:'out', v:'# INFO: School: 8AM - 2:30PM (Mon-Sat)' },
                  { t:'fn', v:'print' },
                  { t:'n', v:'(bot.respond(' },
                  { t:'s', v:'"When is the exam?"' },
                  { t:'n', v:'))' },
                  { t:'out', v:'# INFO: Half-yearly: Oct 15. Annual: March 10.' },
                  { t:'b', v:'' },
                  { t:'c', v:'# YOUR 5 CHALLENGES:' },
                  { t:'c', v:'# 1. Add 5 more FAQs (transport, sports, uniform, sports, teachers)' },
                  { t:'c', v:'# 2. Add greeting based on time (Good Morning / Good Evening)' },
                  { t:'c', v:'# 3. Make bot remember student name' },
                  { t:'c', v:'# 4. Add GPA calculator method' },
                  { t:'c', v:'# 5. Deploy on replit.com — share link with whole school!' }
                ]
              }]
            },
            { type: 'quiz', tag: 'CLASS 12 · CHATBOT QUIZ', tagHi: 'CLASS 12 · CHATBOT QUIZ',
              title: '🧩 Capstone Python — 10 Question Practice Quiz', titleHi: '🧩 Capstone Python — 10 Question Practice Quiz',
              questions: [
                { q: '"conversation_count += 1" does?', qHi: '"conversation_count += 1" does?',
                  opts: ['Sets to 1', 'Increases by 1 (increment)', 'Decreases by 1', 'Multiplies by 1'], optsHi: ['Sets to 1', 'Increases by 1 (increment)', 'Decreases by 1', 'Multiplies by 1'],
                  c: 1, ex: '+= increments! x += 1 same as x = x + 1. Counts questions answered. Used in all programming!', exHi: '+= increments! x += 1 same as x = x + 1. Counts questions answered. Used in all programming!' },
                { q: 'query.lower() converts text to?', qHi: 'query.lower() converts text to?',
                  opts: ['Uppercase', 'Lowercase for case-insensitive matching', 'Removes spaces', 'Deletes query'], optsHi: ['Uppercase', 'Lowercase for case-insensitive matching', 'Removes spaces', 'Deletes query'],
                  c: 1, ex: '.lower() = lowercase. "TIMING" and "timing" both match! Basic NLP text normalization — ChatGPT does this!', exHi: '.lower() = lowercase. "TIMING" and "timing" both match! Basic NLP text normalization — ChatGPT does this!' },
                { q: 'A knowledge base in AI chatbots is?', qHi: 'A knowledge base in AI chatbots is?',
                  opts: ['Computer RAM', 'Collection of facts the AI answers from', 'Neural network type', 'Chatbot code'], optsHi: ['Computer RAM', 'Collection of facts the AI answers from', 'Neural network type', 'Chatbot code'],
                  c: 1, ex: 'Knowledge base = structured information the chatbot uses to answer. Our "faqs" dictionary IS the knowledge base!', exHi: 'Knowledge base = structured information the chatbot uses to answer. Our "faqs" dictionary IS the knowledge base!' },
                { q: 'json.dumps() does?', qHi: 'json.dumps() does?',
                  opts: ['Loads JSON from file', 'Converts Python dictionary to JSON string', 'Deletes JSON', 'Imports library'], optsHi: ['Loads JSON from file', 'Converts Python dictionary to JSON string', 'Deletes JSON', 'Imports library'],
                  c: 1, ex: 'json.dumps() converts Python dict to JSON format. APIs return data as JSON — universal format!', exHi: 'json.dumps() converts Python dict to JSON format. APIs return data as JSON — universal format!' },
                { q: 'Replit.com is used for?', qHi: 'Replit.com is used for?',
                  opts: ['Social media', 'Browser coding environment for Python', 'Email', 'Video streaming'], optsHi: ['Social media', 'Browser coding environment for Python', 'Email', 'Video streaming'],
                  c: 1, ex: 'Replit = browser-based coding. Write Python, run instantly, share a link. No installation needed!', exHi: 'Replit = browser-based coding. Write Python, run instantly, share a link. No installation needed!' },
                { q: 'When no FAQ matches, chatbot?', qHi: 'When no FAQ matches, chatbot?',
                  opts: ['Crashes', 'Returns default message via fallback response', 'Loops forever', 'Deletes query'], optsHi: ['Crashes', 'Returns default message via fallback response', 'Loops forever', 'Deletes query'],
                  c: 1, ex: '"fallback response" — when no match found, give a polite default message. Every good chatbot has one!', exHi: '"fallback response" — when no match found, give a polite default message. Every good chatbot has one!' },
                { q: '"keyword in query" vs "keyword == query"?', qHi: '"keyword in query" vs "keyword == query"?',
                  opts: ['Same thing', 'in checks if keyword is anywhere in sentence', '== is better', 'in is slower'], optsHi: ['Same thing', 'in checks if keyword is anywhere in sentence', '== is better', 'in is slower'],
                  c: 1, ex: '"in" = substring check! "timing" in "What are timings?" = True. Essential for natural language matching!', exHi: '"in" = substring check! "timing" in "What are timings?" = True. Essential for natural language matching!' },
                { q: 'A "method" in Python class is?', qHi: 'A "method" in Python class is?',
                  opts: ['A variable', 'A function defined inside a class', 'A loop type', 'An imported library'], optsHi: ['A variable', 'A function defined inside a class', 'A loop type', 'An imported library'],
                  c: 1, ex: 'Method = function inside a class! respond(), get_stats() are methods — define what AI can DO!', exHi: 'Method = function inside a class! respond(), get_stats() are methods — define what AI can DO!' },
                { q: 'Deploying on Replit means?', qHi: 'Deploying on Replit means?',
                  opts: ['Faster code', 'Anyone with link can use chatbot in browser', 'Auto bug fixes', 'Hindi translation'], optsHi: ['Faster code', 'Anyone with link can use chatbot in browser', 'Auto bug fixes', 'Hindi translation'],
                  c: 1, ex: 'Replit deployment = public URL! Classmates, teachers, whole school can use your AI chatbot!', exHi: 'Replit deployment = public URL! Classmates, teachers, whole school can use your AI chatbot!' },
                { q: 'datetime.now() gives?', qHi: 'datetime.now() gives?',
                  opts: ['Random number', 'Current date and time', 'Future date', 'File creation date'], optsHi: ['Random number', 'Current date and time', 'Future date', 'File creation date'],
                  c: 1, ex: 'datetime.now() = current date and time. Used in all logging, reporting, and timestamp systems!', exHi: 'datetime.now() = current date and time. Used in all logging, reporting, and timestamp systems!' }
              ]
            }
          ]
        }
      ]
    }]
  },
};

export interface Slide {
  type: string;
  bot?: string; botName?: string; botNameHi?: string;
  tag?: string; tagHi?: string;
  title?: string; titleHi?: string;
  intro?: string; introHi?: string;
  speech?: string; speechHi?: string;
  extra?: string;
  items?: { em?: string; l?: string; lHi?: string; d?: string; dHi?: string; ic?: string; nm?: string; ds?: string; dsHi?: string }[];
  content?: { h: string; hHi?: string; p: string; pHi?: string }[];
  nodes?: { i?: string; l?: string; s?: string; c?: string; arrow?: boolean }[];
  files?: { name: string; lines: { t: string; v: string }[] }[];
  inp?: string[]; h1?: string[]; h2?: string[]; out?: string[]; labels?: string[];
  questions?: { q: string; qHi?: string; opts: string[]; optsHi?: string[]; c: number; ex: string; exHi?: string; }[];
}
