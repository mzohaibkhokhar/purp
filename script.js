const screens = [...document.querySelectorAll('.screen')];
function showScreen(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>showScreen(btn.dataset.go)));
const plan={foodCategory:'',food:'Not chosen',dessert:'Not chosen',time:'Not chosen',venue:'Not chosen'};
const menus={
 fast:{title:'Fast Food Favourites',items:[['🍔','Zinger Burger'],['🍕','Pizza'],['🍟','Loaded Fries'],['🌭','Chicken Shawarma'],['🍗','Fried Chicken'],['🥪','Club Sandwich'],['🌮','Tacos'],['🥤','Burger & Shake']]},
 desi:{title:'Desi Pakistani Favourites',items:[['🍗','Chicken Karahi'],['🍚','Biryani'],['🥘','Nihari'],['🍢','Seekh Kebabs'],['🫓','Halwa Puri'],['🍖','Chicken Handi'],['🥩','Chapli Kebab'],['🍛','Daal Chawal'],['🥟','Samosay']]},
 chinese:{title:'Chinese Food Favourites',items:[['🍜','Chicken Chow Mein'],['🍚','Chicken Fried Rice'],['🥢','Chicken Manchurian'],['🍗','Chicken Chilli Dry'],['🥟','Dumplings'],['🍲','Hot & Sour Soup'],['🍝','Szechuan Noodles'],['🥡','Kung Pao Chicken']]}
};
const desserts=[['🍨','Ice Cream'],['🍰','Chocolate Cake'],['🍫','Brownie'],['🍮','Gulab Jamun'],['🥞','Waffles'],['🍩','Donuts'],['🍧','Falooda'],['🧁','Cupcakes'],['🍓','Strawberry Cheesecake']];
const times=['11:00 AM – 1:00 PM','1:00 PM – 3:00 PM','3:00 PM – 5:00 PM','5:00 PM – 7:00 PM','7:00 PM – 9:00 PM','Any time that suits you'];
const venues=[['🏔️','Hunza Valley','Mountain views and peaceful scenery'],['🌲','Nathia Gali','Pine forests and cool weather'],['🌄','Skardu','Lakes, mountains and stunning views'],['🌊','Khanpur Dam','Blue water and a relaxing day out'],['🌳','Shogran & Siri Paye','Green meadows and mountain air'],['🏙️','Islamabad & Daman-e-Koh','A lovely city view and a scenic stop'],['🏰','Lahore Fort & Food Street','History, lights and delicious food'],['🌸','Shalimar Gardens, Lahore','Beautiful gardens and peaceful walks'],['🌅','Murree','A classic hill-station escape']];
function makeChoice(container,items,callback,kind='food'){container.innerHTML='';items.forEach(([emoji,name,desc])=>{const b=document.createElement('button');b.className=kind==='venue'?'venue-card':'food-card';if(kind==='venue')b.innerHTML=`<div class="venue-art">${emoji}</div><b>${name}</b><small>${desc}</small>`;else b.innerHTML=`<span class="dish-emoji">${emoji}</span><b>${name}</b>`;b.addEventListener('click',()=>{container.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');callback(name);});container.appendChild(b);});}
document.getElementById('yesBtn').addEventListener('click',()=>showScreen('food-category'));
const noBtn=document.getElementById('noBtn');let noCount=0;
noBtn.addEventListener('mouseenter',moveNo);noBtn.addEventListener('click',moveNo);
function moveNo(){noCount++;const x=(Math.random()-.5)*260,y=(Math.random()-.5)*120;noBtn.style.transform=`translate(${x}px,${y}px)`;document.getElementById('noMessage').textContent=['Aww, that button is feeling shy 🙈','It keeps escaping! 🌸','You can still say no — no pressure 💗'][Math.min(noCount-1,2)];}
document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.category;plan.foodCategory=menus[key].title;document.getElementById('foodHeading').textContent=menus[key].title;makeChoice(document.getElementById('foodGrid'),menus[key].items,name=>{plan.food=name;showScreen('desserts');});showScreen('food-list');}));
makeChoice(document.getElementById('dessertGrid'),desserts,name=>{plan.dessert=name;showScreen('time');});
const timeGrid=document.getElementById('timeGrid');times.forEach(t=>{const b=document.createElement('button');b.className='time-option';b.textContent=t;b.addEventListener('click',()=>{plan.time=t;showScreen('venue');});timeGrid.appendChild(b);});
makeChoice(document.getElementById('venueGrid'),venues,(name)=>{plan.venue=name;showSummary();},'venue');
function showSummary(){document.getElementById('summaryCard').innerHTML=`<div>🍽️ <strong>Food:</strong> ${plan.foodCategory} — ${plan.food}</div><div>🍰 <strong>Dessert:</strong> ${plan.dessert}</div><div>🕰️ <strong>Time:</strong> ${plan.time}</div><div>📍 <strong>Place:</strong> ${plan.venue}</div>`;showScreen('summary');}
document.getElementById('finishBtn').addEventListener('click',()=>showScreen('message'));
document.querySelectorAll('.pick-heart').forEach(b=>b.addEventListener('click',()=>document.getElementById('heartResult').textContent=b.dataset.note));
let score=0,seconds=15,gameInterval=null,spawnInterval=null;
const area=document.getElementById('catchArea');
document.getElementById('startGame').addEventListener('click',()=>{clearInterval(gameInterval);clearInterval(spawnInterval);score=0;seconds=15;document.getElementById('score').textContent=score;document.getElementById('timer').textContent=seconds;area.innerHTML='';document.getElementById('startGame').textContent='Playing…';spawnHeart();spawnInterval=setInterval(spawnHeart,650);gameInterval=setInterval(()=>{seconds--;document.getElementById('timer').textContent=seconds;if(seconds<=0){clearInterval(gameInterval);clearInterval(spawnInterval);area.innerHTML='<span class="catch-hint">Lovely catching! 💗</span>';document.getElementById('startGame').textContent='Play again';}},1000);});
function spawnHeart(){const h=document.createElement('button');h.className='catch-heart';h.textContent=['💗','💖','💕','💘'][Math.floor(Math.random()*4)];h.style.left=Math.max(2,Math.random()*88)+'%';h.style.top=Math.max(2,Math.random()*72)+'%';h.addEventListener('click',()=>{score++;document.getElementById('score').textContent=score;h.remove();});area.appendChild(h);setTimeout(()=>h.remove(),1500);}
const questions = [
    {
        question: "What makes me happiest? 💗",
        options: ["Your Smile", "Your Eyes", "Angerness"],
        answer: "Your Smile"
    },
    {
        question: "What do I love the most about you? 🌸",
        options: ["Your Eyes", "Your Anger", "Your Silence"],
        answer: "Your Eyes"
    },
    {
        question: "Where would I love to take you? 🌹",
        options: ["Mountains", "Shopping Mall", "Chiijiiyan lenyyy"],
        answer: "Chiijiiyan lenyyy"
    },
    {
        question: "What is my favourite moment? 💕",
        options: ["Talking to You", "Sleeping", "Playing Games"],
        answer: "Talking to You"
    },
    {
        question: "Who is the most special girl to me? 🥰",
        options: ["Panda", "Nobody", "Someone Else"],
        answer: "Panda"
    }
];

{let currentQuestion = 0;
let score = 0;}

function startLoveQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("loveQuiz").style.display = "block";
    document.getElementById("quizResult").innerHTML = "";

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("quizQuestion").innerText = q.question;

    const optionsDiv = document.getElementById("quizOptions");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");

        btn.innerText = option;

        btn.onclick = function () {
            if (option === q.answer) {
                score++;
            }

            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showFinalScore();
            }
        };

        optionsDiv.appendChild(btn);
    });
}

function showFinalScore() {
    document.getElementById("quizQuestion").innerText =
        "You completed the Love Quiz, Noor! 💗";

    document.getElementById("quizOptions").innerHTML = "";

    document.getElementById("quizResult").innerHTML =
        `Your Score: ${score}/${questions.length} 🌸
        <br><br>
        Noor, no matter what your score is,
        you will always be special to me! ❤️
        <br><br>
        You have the most beautiful eyes,
        and your smile makes everything better! 🥰
        <br><br>
        <button onclick="startLoveQuiz()">Play Again 💕</button>`;
}
const flowerContainer = document.querySelector(".flower-container");
const sparkleContainer = document.querySelector(".sparkle-container");

const flowers = ["🌸", "🌷", "🌹", "🌺", "💮", "🪷"];

function createFlower() {
    const flower = document.createElement("div");

    flower.className = "flower";
    flower.innerText =
        flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration =
        (Math.random() * 5 + 5) + "s";

    flower.style.fontSize =
        (Math.random() * 15 + 20) + "px";

    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 10000);
}

function createSparkle() {
    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";
    sparkle.innerText = "✦";

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";

    sparkle.style.animationDelay =
        Math.random() * 2 + "s";

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 4000);
}

setInterval(createFlower, 500);
setInterval(createSparkle, 300);