(function(){
const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const AURI_IMG={"cheer": "assets/milo/cheer.webp", "f_angry": "assets/milo/f_angry.webp", "f_content": "assets/milo/f_content.webp", "f_curious": "assets/milo/f_curious.webp", "f_excited": "assets/milo/f_excited.webp", "f_happy": "assets/milo/f_happy.webp", "f_laughing": "assets/milo/f_laughing.webp", "f_proud_face": "assets/milo/f_proud_face.webp", "f_sad": "assets/milo/f_sad.webp", "f_sleepy_face": "assets/milo/f_sleepy_face.webp", "f_surprised": "assets/milo/f_surprised.webp", "f_winking": "assets/milo/f_winking.webp", "f_worried": "assets/milo/f_worried.webp", "hello": "assets/milo/hello.webp", "jump": "assets/milo/jump.webp", "love": "assets/milo/love.webp", "oh": "assets/milo/oh.webp", "proud": "assets/milo/proud.webp", "sit": "assets/milo/sit.webp", "sitcalm": "assets/milo/sitcalm.webp", "sleepy": "assets/milo/sleepy.webp", "think": "assets/milo/think.webp", "thumbs": "assets/milo/thumbs.webp", "wave": "assets/milo/wave.webp"};
const AURI_ALT={hello:'waving hello',wave:'waving',sit:'sitting happily',jump:'jumping for joy',oh:'surprised',proud:'proud',sitcalm:'sitting calmly',cheer:'cheering',love:'full of love',think:'thinking',sleepy:'sleepy',thumbs:'giving a thumbs up'};

const MOOD_COL={happy:'#FFD66B',excited:'#FFB347',content:'#9ED9B8',curious:'#A9C8FF',sad:'#AEB8D6',worried:'#F7CC74',angry:'#F2876B',sleepy_face:'#CFC6EC'};
function moodIcon(k,size=48){ const c=MOOD_COL[k]||'#FFD66B', K='#1B1F3B';
  const eyes = k==='sleepy_face' ? `<path d="M15 22q4 3 8 0M33 22q4 3 8 0" stroke="${K}" stroke-width="2.6" fill="none" stroke-linecap="round"/>` : `<circle cx="19" cy="22" r="3.2" fill="${K}"/><circle cx="37" cy="22" r="3.2" fill="${K}"/>`;
  const brows = k==='angry' ? `<path d="M13 15l9 4M43 15l-9 4" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/>` : k==='worried' ? `<path d="M14 17l8-3M42 17l-8-3" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>` : '';
  const mouth = {happy:'<path d="M18 33q10 9 20 0" stroke="#1B1F3B" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
    excited:'<path d="M17 31q11 14 22 0z" fill="#1B1F3B"/>',content:'<path d="M21 34q7 4 14 0" stroke="#1B1F3B" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
    curious:'<circle cx="28" cy="36" r="3.6" fill="#1B1F3B"/>',sad:'<path d="M19 39q9-8 18 0" stroke="#1B1F3B" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
    worried:'<path d="M19 37q4.5-4 9 0t9 0" stroke="#1B1F3B" stroke-width="2.6" fill="none" stroke-linecap="round"/>',angry:'<path d="M20 38q8-5 16 0" stroke="#1B1F3B" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
    sleepy_face:'<ellipse cx="28" cy="37" rx="4" ry="3" fill="#1B1F3B"/>'}[k]||'';
  return `<svg width="${size}" height="${size}" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="${c}"/>${brows}${eyes}${mouth}</svg>`; }
const ICO={
  idea:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/></svg>',
  up:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  book:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
  trophy:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C97A12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
  search:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  meet:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.8-3.5 3.3-5.5 6-5.5s5.2 2 6 5.5M15 15c2.6 0 4.6 1.6 5.5 4.5"/></svg>'};
function auri(size=64, mood='', cls=''){
  let k = size>=90 ? 'hello' : 'f_happy'; /* Milo keeps one emotion everywhere: happy */
  const alt = 'Milo the golden retriever, ' + (AURI_ALT[k] || k.replace('f_','').replace('_face','') );
  return `<img class="auri ${cls}" src="${AURI_IMG[k]}" alt="${alt}" style="height:${size}px;width:auto;max-width:100%" draggable="false">`;
}
const HERO_ANIM='assets/milo-hero.webp';
const HERO_POSTER='assets/milo-hero-poster.jpg';
const logo = () => `<span class="wordmark">Socius</span>`;

const AVIMG=["assets/avatars/avatar-01.webp", "assets/avatars/avatar-02.webp", "assets/avatars/avatar-03.webp", "assets/avatars/avatar-04.webp", "assets/avatars/avatar-05.webp", "assets/avatars/avatar-06.webp", "assets/avatars/avatar-07.webp", "assets/avatars/avatar-08.webp", "assets/avatars/avatar-09.webp", "assets/avatars/avatar-10.webp", "assets/avatars/avatar-11.webp", "assets/avatars/avatar-12.webp", "assets/avatars/avatar-13.webp", "assets/avatars/avatar-14.webp", "assets/avatars/avatar-15.webp", "assets/avatars/avatar-16.webp"];
const AVS=["#E6E2F7", "#FEE9C5", "#CFDFD9", "#D4DFF4", "#FDDEC9", "#E9E1F1", "#FED9DB", "#FFEECA", "#FDE3C9", "#FFDCDE", "#D6E6DD", "#DFE5F7", "#F0E8F5", "#FFEFCC", "#FED8D6", "#DDF0EB"].map((bg,i)=>({bg,style:i%8}));
function avSVGold(i, size=44, o={}){
  const a=AVS[((i%AVS.length)+AVS.length)%AVS.length], st=a.style, K='#111';
  const sw='stroke="#111" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"';
  const back=[
    `<path d="M29 62C27 34 43 23 60 23s33 11 31 39v32c-4 3-9 3-12 0V60H41v34c-3 3-8 3-12 0z" fill="${K}"/>`,
    ``,
    `<path d="M31 62C29 36 44 25 60 25s31 11 29 37v14H31z" fill="${K}"/>`,
    ``,
    `<circle cx="30" cy="74" r="11" fill="${K}"/><circle cx="90" cy="74" r="11" fill="${K}"/>`,
    ``,
    `<path d="M78 34c10-4 18 4 18 16 0 14-6 26-2 36-10-6-12-20-10-30 0-8-2-14-6-22z" fill="${K}"/><circle cx="80" cy="33" r="6" fill="${K}"/>`,
    `<path d="M28 62C26 32 43 22 60 22s34 10 32 40v58H28z" fill="${K}"/>`][st];
  const ears = [0,2,7].includes(st) ? '' : `<ellipse cx="34" cy="68" rx="5.5" ry="7.5" fill="#fff" ${sw}/><ellipse cx="86" cy="68" rx="5.5" ry="7.5" fill="#fff" ${sw}/>`;
  const front=[
    `<path d="M33 60C32 38 45 30 60 30s28 8 27 30z" fill="${K}"/>`,
    `<path d="M33 62C30 38 45 27 61 27c17 0 29 10 26 35-4-11-10-16-19-17-9 4-20 4-28-1-5 3-6 9-7 18z" fill="${K}"/><path d="M40 40c0-16 16-24 34-18 10 4 14 12 12 20-6-10-20-14-34-10z" fill="${K}"/>`,
    `<path d="M33 60C32 38 45 30 60 30s28 8 27 30z" fill="${K}"/>`,
    `<path d="M33 60C32 38 44 28 60 28s28 10 27 32c-3-8-8-13-14-14l-3-5-4 4c-6 1-14 1-20-1-6 3-10 8-13 16z" fill="${K}"/>`,
    `<path d="M33 64C31 38 45 28 62 28c16 0 27 12 25 34-6-12-16-18-30-16-10 2-18 8-24 18z" fill="${K}"/><path d="M48 31c6-6 16-6 22-2" fill="none" stroke="#fff" stroke-width="1.6" opacity=".6"/>`,
    `<path d="M35 58C35 39 46 32 60 32s25 7 25 26c-5-8-13-11-25-11s-20 3-25 11z" fill="${K}"/>`,
    `<path d="M33 62C31 38 45 28 61 28c16 0 28 10 26 34-4-10-12-15-22-15-8 2-14-2-18-2-8 2-12 8-14 17z" fill="${K}"/>`,
    `<path d="M33 60C32 38 45 30 60 30s28 8 27 30z" fill="${K}"/>`][st];
  const bangsDown=[0,2,7].includes(st);
  const brows = (bangsDown||st===1||st===5) ? '' : o.mood==='wow' ? `<path d="M44 55q5-4 10-1M66 54q5-3 10 1" fill="none" stroke="${K}" stroke-width="3.6" stroke-linecap="round"/>` : `<path d="M44 58h10M66 58h10" stroke="${K}" stroke-width="3.6" stroke-linecap="round"/>`;
  const braids = st===2 ? `<g fill="${K}"><circle cx="32" cy="82" r="6"/><circle cx="31" cy="93" r="6"/><circle cx="31" cy="104" r="5"/><circle cx="88" cy="82" r="6"/><circle cx="89" cy="93" r="6"/><circle cx="89" cy="104" r="5"/></g><path d="M22 86l9 4-9 4zM40 86l-9 4 9 4zM80 86l9 4-9 4zM98 86l-9 4 9 4z" fill="#fff" stroke="${K}" stroke-width="2" stroke-linejoin="round"/>` : '';
  const glasses = (st===1||st===5) ? (st===1?`<g fill="none" stroke="${K}" stroke-width="3"><rect x="40" y="60" width="17" height="12" rx="2"/><rect x="63" y="60" width="17" height="12" rx="2"/><path d="M57 65h6M40 64h-6M80 64h6"/></g>`:`<g fill="none" stroke="${K}" stroke-width="3"><circle cx="49" cy="67" r="8"/><circle cx="71" cy="67" r="8"/><path d="M57 66h6"/></g>`) : '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true" style="${o.bare?'overflow:visible':'border-radius:50%'};flex:none;display:block">${o.bare?'':`<rect width="120" height="120" fill="${a.bg}"/>`}<g transform="translate(60 70) scale(1.16) translate(-60 -70)">
    ${back}<path d="M26 122c2-14 14-22 34-22s32 8 34 22z" fill="#fff" ${sw}/>${ears}
    <path d="M34 62c0-20 11-30 26-30s26 10 26 30c0 22-11 36-26 36S34 84 34 62z" fill="#fff" ${sw}/>
    ${front}${brows}
    <ellipse cx="49" cy="67" rx="4.4" ry="5.4" fill="${K}"/><ellipse cx="71" cy="67" rx="4.4" ry="5.4" fill="${K}"/><circle cx="50.6" cy="65.2" r="1.4" fill="#fff"/><circle cx="72.6" cy="65.2" r="1.4" fill="#fff"/>
    <path d="M60 72l-1.6 6h2.6" fill="none" stroke="${K}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${o.mood==='smile'?`<path d="M51 82q9 10 18 0z" fill="${K}"/><path d="M54 85q6 4 12 0" fill="#F07A86"/>`:o.mood==='wow'?`<ellipse cx="60" cy="87" rx="5" ry="6.5" fill="${K}"/><ellipse cx="60" cy="90" rx="3" ry="2.4" fill="#F07A86"/>`:`<path d="M56 85h8" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/>`}
    <path d="M40 78l3-3M44 79l3-3M73 79l3-3M77 78l3-3" stroke="${K}" stroke-width="1.7" stroke-linecap="round"/>
    ${glasses}${braids}</g></svg>`;
}

function avSVG(i, size=44){ const k=((i%AVIMG.length)+AVIMG.length)%AVIMG.length; return `<img class="avimg" src="${AVIMG[k]}" width="${size}" height="${size}" alt="" style="width:${size}px;height:${size}px;border-radius:50%;display:block;flex:none;object-fit:cover">`; }
const AV_MAP={'Kabir Sethi':8,'Riya Menon':9,'Farhan Ali':4,'Sneha Iyer':2,'Aditya Rao':11,'Tanvi Joshi':12,'Rohit Nair':14,'Zoya Khan':7,'Ishaan Gupta':11,'Pooja Reddy':10,'Ananya Desai':6,'Vikram Shetty':7,'Meher Kaur':1,'Arnav Bose':5,'Divya Pillai':3,'Nikhil Menon':11,'Meera Iyer':15,'Rohan Kapoor':13,'Dr. Sana Qureshi':12};
const avIdx = n => (n in AV_MAP) ? AV_MAP[n] : [...n].reduce((a,c)=>a+c.charCodeAt(0),0);
const nameAvRaw = (n, s=44) => avSVG(avIdx(n), s);
const nameAv = (n, s=44) => n===S.name ? avSVG(S.avatar,s) : `<button class="avbtn" data-user="${esc(n)}" aria-label="View ${esc(n)}'s profile">${avSVG(avIdx(n), s)}</button>`;

const KEY='socius-demo-v2';
const DEFAULTS = { signedIn:false, firstDayDone:false, name:'Aarav Sharma', handle:'aarav.reads', age:'23', city:'Bengaluru', joined:'July 2040',
  avatar:0, interests:['Books','Running','Startups'], extra:[], invited:['Kabir Sethi','Riya Menon','Farhan Ali'],
  goal:20, safety:'Kabir Sethi', gems:540, xp:340, level:2, todayMin:12, done:['l1a','l1b','l1c'], reached:[], following:['Kabir Sethi','Riya Menon','Ananya Desai','Farhan Ali','Sneha Iyer','Meher Kaur','Aditya Rao','Tanvi Joshi','Vikram Shetty'], guide:[], rsvp:false };
let S = load();
function load(){ try{ const r=localStorage.getItem(KEY); if(r) return Object.assign(JSON.parse(JSON.stringify(DEFAULTS)),JSON.parse(r)); }catch(e){} return JSON.parse(JSON.stringify(DEFAULTS)); }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
const has=(arr,v)=>S[arr].includes(v); const toggle=(arr,v)=>{ S[arr]=has(arr,v)?S[arr].filter(x=>x!==v):S[arr].concat(v); };
const first = n => n.split(' ')[0];
const ui = {page:'home', board:'week', prog:'week', feel:'All', ftab:'following', ob:0, nudge:true, clanView:'mine', memberQ:''};

const AGENT_INTERESTS=['Books','Running','Startups'];
const INTERESTS=['Books','Running','Startups','Design','Music','Chess','Cooking','Cricket','Sketching','Board games','Films','Volunteering'];
const FRIENDS=[
  ['Kabir Sethi','Moved cities for his first job','4 months ago','College'],['Riya Menon','Got through a rough first review at work','2 months ago','School'],
  ['Farhan Ali','Lives alone in a PG, just like you','6 months ago','Hostel'],['Sneha Iyer','Started her first job in Bengaluru','3 months ago','School'],
  ['Aditya Rao','Switched to remote work last year','8 months ago','College'],['Tanvi Joshi','Moved away from family at 22','5 months ago','Coaching class'],
  ['Rohit Nair','Made it through placement season','1 year ago','Hostel'],['Zoya Khan','Found her people through a run club','7 months ago','School'],
  ['Ishaan Gupta','Spent his first year in a new city','9 months ago','College'],['Pooja Reddy','Healed after a hard breakup','5 months ago','Internship']];
const PEOPLE=[['Ananya Desai','Koramangala Readers'],['Vikram Shetty','HSR Run Crew'],['Meher Kaur','Koramangala Readers'],['Arnav Bose','BTM Startup Chai'],['Divya Pillai','Whitefield Design Circle'],['Nikhil Menon','Koramangala Readers']];
const FOLLOWERS=['Kabir Sethi','Ananya Desai','Meher Kaur','Sneha Iyer','Riya Menon','Nikhil Menon','Zoya Khan','Ishaan Gupta','Pooja Reddy','Rohit Nair'];
const CLANS={week:[['Indiranagar Readers','Books',3.4,62],['HSR Run Crew','Running',3.1,88],['Jayanagar Chess Collective','Chess',2.9,41],['Koramangala Readers','Books',2.6,57],['Malleshwaram Music Room','Music',2.4,35],['Cubbon Park Sketchers','Sketching',2.2,29],['BTM Startup Chai','Startups',2.0,74],['Whitefield Design Circle','Design',1.9,48],['Bellandur Board Gamers','Board games',1.7,33],['Banashankari Kitchen Club','Cooking',1.5,26]],
  month:[['HSR Run Crew','Running',12.8,88],['Koramangala Readers','Books',11.9,57],['Indiranagar Readers','Books',11.2,62],['Jayanagar Chess Collective','Chess',10.4,41],['Cubbon Park Sketchers','Sketching',9.7,29],['Malleshwaram Music Room','Music',9.1,35],['Whitefield Design Circle','Design',8.6,48],['BTM Startup Chai','Startups',8.0,74],['Banashankari Kitchen Club','Cooking',7.2,26],['Bellandur Board Gamers','Board games',6.9,33]]};
let MY_CLAN=(S.clan&&S.clan.name)||'Koramangala Readers';
const LEVELS=[
  {n:1,title:'Say hello',kind:'Like-minded',blurb:'Say hi to someone.',tasks:[['l1a','Pick your clan'],['l1b','Chat with one clan member'],['l1c','Reach out to an old friend']]},
  {n:2,title:'Keep it going',kind:'Like-minded',blurb:'Chat, then ask one question.',tasks:[['l2a','Chat with Ananya','chat'],['l2b','Ask her one question','auto'],['l2c','Reply to an old friend','dm']]},
  {n:3,title:'Show up',kind:'Like-minded',blurb:'Go to one meetup.',tasks:[['l3a','Check in at book club','meet']]},
  {n:4,title:'Someone new',kind:'Unlike-minded',blurb:'Meet someone different.',tasks:[['l4a','Walk with someone from the Run Crew']]},
  {n:5,title:'Swap a favour',kind:'Unlike-minded',blurb:'Help someone, get help.',tasks:[['l5a','Trade CV tips for design tips']]},
  {n:6,title:'Host',kind:'Unlike-minded',blurb:'Bring people together.',tasks:[['l6a','Host a clan meetup']]}];
const PROG={week:{moments:5,conv:4,meet:1,revived:1,min:118,label:'This week',bars:[['Mon',1],['Tue',0],['Wed',2],['Thu',1],['Fri',0],['Sat',1],['Sun',0]]},
  month:{moments:19,conv:14,meet:4,revived:2,min:470,label:'October',bars:[['Week 1',3],['Week 2',4],['Week 3',7],['Week 4',5]]},
  year:{moments:61,conv:44,meet:13,revived:4,min:1520,label:'Since July',bars:[['Jul',4],['Aug',9],['Sep',22],['Oct',26]]}};
const VIDEOS=[
  {t:'Loneliness',by:'Kurzgesagt',len:'10 min',ph:'Loneliness',url:'https://www.youtube.com/watch?v=n3Xv_g3g-mA',yt:'n3Xv_g3g-mA',bg:'linear-gradient(135deg,#1B1F3B,#4B5390)',why:'Why we feel lonely, what it does to our bodies, and why it is a signal to reach out, not a flaw.'},
  {t:'The gift and power of emotional courage',by:'Susan David · TED',len:'16 min',ph:'Emotions',url:'https://www.youtube.com/watch?v=NDQ1Mi5I4rg',yt:'NDQ1Mi5I4rg',bg:'linear-gradient(135deg,#3D6FF0,#7FA2FF)',why:'Why naming hard feelings, instead of pushing them away, makes them lighter.'},
  {t:'The power of vulnerability',by:'Brené Brown · TED',len:'20 min',ph:'Vulnerability',url:'https://www.youtube.com/watch?v=iCvmsMzlF7o',yt:'iCvmsMzlF7o',bg:'linear-gradient(135deg,#E8553F,#FF9A7A)',why:'How letting people see the real you is where connection begins.'},
  {t:'What makes a good life?',by:'Robert Waldinger · TED',len:'13 min',ph:'Happiness',url:'https://www.youtube.com/watch?v=8KkKuTCFvzI',yt:'8KkKuTCFvzI',bg:'linear-gradient(135deg,#1FA971,#6BD3A6)',why:'What a decades-long Harvard study learned: good relationships keep us happier and healthier.'},
  {t:'Why we all need to practice emotional first aid',by:'Guy Winch · TED',len:'17 min',ph:'Loneliness',url:'https://www.ted.com/talks/guy_winch_the_case_for_emotional_hygiene',bg:'linear-gradient(135deg,#C97A12,#F2A93B)',why:'How to care for loneliness and rejection the way you would care for a cut.'},
  {t:'10 ways to have a better conversation',by:'Celeste Headlee · TED',len:'12 min',ph:'Conversation',url:'https://www.youtube.com/watch?v=R1vskiVDwl4',yt:'R1vskiVDwl4',bg:'linear-gradient(135deg,#0E9AAB,#5FD0DC)',why:'Simple rules for real-life chats: be present, ask open questions, listen to understand, and keep it short.'},
  {t:'Why you should talk to strangers',by:'Kio Stark · TED',len:'11 min',ph:'Conversation',url:'https://www.youtube.com/watch?v=rFpDK2KhAgw',yt:'rFpDK2KhAgw',bg:'linear-gradient(135deg,#8B5CF6,#B9A1FF)',why:'Small moments with people you do not know make a city feel like home. Here is how to start one.'},
  {t:'How to speak so that people want to listen',by:'Julian Treasure · TED',len:'10 min',ph:'Conversation',url:'https://www.youtube.com/watch?v=eIho2S0ZahI',yt:'eIho2S0ZahI',bg:'linear-gradient(135deg,#1B1F3B,#3D6FF0)',why:'The habits that make people tune out, and the small changes in voice and honesty that draw them in.'},
  {t:'5 ways to listen better',by:'Julian Treasure · TED',len:'8 min',ph:'Conversation',url:'https://www.youtube.com/watch?v=cSohjlYQI2A',yt:'cSohjlYQI2A',bg:'linear-gradient(135deg,#1FA971,#0E9AAB)',why:'Listening is half of every conversation. Five tiny exercises to get better at it.'}];
['10:42','16:18','20:49','13:20','17:05','12:36','11:00','10:16','8:27'].forEach((d,k)=>{ if(VIDEOS[k]) VIDEOS[k].dur=d; });
const READS=[
  {t:'Talking to people IRL: a starter kit',ph:'Conversation',read:'3 min read',body:`<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px;text-align:left"><li><b>Open with what's around you.</b> "Is this your first meetup too?" beats "So, what do you do?"</li><li><b>Ask how, not just what.</b> "How did you get into running?" invites a story.</li><li><b>Follow up once.</b> Pick one thing they said and ask more. People feel heard.</li><li><b>Share a little back.</b> A small honest detail makes it a conversation, not an interview.</li><li><b>Put the phone face down.</b> Even on the table, it makes chats feel shallower.</li><li><b>End warmly.</b> "This was nice, see you Thursday?" turns a chat into a next time.</li></ol>`},
  {t:'6 signs you are bottling up your feelings',ph:'Emotions',read:'3 min read',body:`<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px;text-align:left"><li>Small things make you snap.</li><li>You numb out with scrolling or binge-watching.</li><li>You feel like a different person in private and in public.</li><li>Other people's feelings make you uneasy.</li><li>You watch your life more than you live it.</li><li>You avoid hard conversations.</li></ol><p class="muted" style="margin-top:10px;text-align:left">Spotted 3 or more? That's okay, and you're not alone. Feelings are just signals. Try naming one today, then share it with one person.</p>`},
  {t:'How to name what you feel',ph:'Emotions',read:'2 min read',body:`<p style="text-align:left">"Bad" can mean tired, lonely, embarrassed or left out, and each needs something different.</p><ol style="margin:10px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:6px;text-align:left"><li>Pause and notice where you feel it: chest, stomach, shoulders.</li><li>Pick the closest word.</li><li>Say it to yourself, then to someone you trust.</li></ol>`},
  {t:"Alone or lonely? They're different",ph:'Loneliness',read:'2 min read',body:`<p style="text-align:left">Being alone is about how many people are around you. Feeling lonely is the gap between the closeness you have and the closeness you want. You can feel lonely in a full room, and perfectly fine on a quiet evening.</p>`},
  {t:'Why about 15 close friends is the magic number',ph:'Happiness',read:'2 min read',body:`<p style="text-align:left">Researchers like Robin Dunbar find most of us keep about 5 very close people and about 15 close ones in total. Each of those friendships needs regular time together, so a few minutes a day really adds up.</p>`}];
const ACH=[
  ['First hello','Reach out to 1 old friend',1,1,'#E8553F','wave'],['Memory lane','Reconnect with 5 old friends',1,5,'#C97A12','heart'],
  ['Showing up','Attend 3 meetups',1,3,'#1FA971','pin'],['Bridge builder','Have 3 chats with someone different',0,3,'#8B5CF6','bridge'],
  ['Good listener','Ask 10 follow-up questions',6,10,'#3D6FF0','ear']];
const ICON={wave:'<path d="M8 14c2-5 5-8 8-8M5 18c1 2 3 3 5 3h4a6 6 0 0 0 6-6V9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
  heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="#fff"/>',
  pin:'<path d="M12 21s6-6 6-11a6 6 0 0 0-12 0c0 5 6 11 6 11z" fill="#fff"/><circle cx="12" cy="10" r="2.2" fill="#1FA971"/>',
  bridge:'<path d="M3 17h18M5 17v-4M19 17v-4M5 13c3-5 11-5 14 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
  ear:'<path d="M8 10a4 4 0 1 1 8 0c0 3-3 4-3 7a2 2 0 0 1-4 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'};


function storeBtn(k){ const ios=k==='ios';
  return `<button class="store" data-app="${k}" aria-label="Download for ${ios?'iPhone':'Android'}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ios?'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>':'<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M12 7v7M9 11l3 3 3-3"/>'}</svg><span><small>Download for</small><b>${ios?'iPhone':'Android'}</b></span></button>`; }
function qrSVG(){ let x=7919, c=''; const rnd=()=>{ x=(x*16807)%2147483647; return x/2147483647; };
  const eye=(a,b)=>`<rect x="${a}" y="${b}" width="7" height="7" fill="#1B1F3B"/><rect x="${a+1}" y="${b+1}" width="5" height="5" fill="#fff"/><rect x="${a+2}" y="${b+2}" width="3" height="3" fill="#1B1F3B"/>`;
  for(let i=0;i<25;i++) for(let j=0;j<25;j++){ if((i<8&&j<8)||(i<8&&j>16)||(i>16&&j<8)) continue; if(rnd()>.52) c+=`<rect x="${i}" y="${j}" width="1" height="1" fill="#1B1F3B"/>`; }
  return `<svg viewBox="-1 -1 27 27" width="110" height="110" aria-hidden="true"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/>${c}${eye(0,0)}${eye(18,0)}${eye(0,18)}</svg>`; }
function openApp(k){ const ios=k==='ios';
  modal(`${auri(120,'wave','pop')}<span class="eyebrow">Download for ${ios?'iPhone':'Android'}</span><h2>Milo is almost in your pocket!</h2><p class="muted">The Socius app is in its Bengaluru pilot. Leave your email and we'll send you the ${ios?'App Store':'Play Store'} link the day it opens.</p>
    <form id="appF" style="width:100%;display:flex;gap:8px;flex-wrap:wrap" novalidate><input id="appE" type="email" placeholder="you@email.com" aria-label="Your email" style="flex:1;min-width:180px;border:1.5px solid var(--line);border-radius:12px;padding:11px"><button class="btn gold" type="submit">Notify me</button></form>
    <p class="err small" id="appErr" hidden role="alert"></p><button class="link" id="cl">Maybe later</button>`,(m,c)=>{ $('#cl',m).onclick=c;
    $('#appF',m).addEventListener('submit',e=>{ e.preventDefault(); const v=$('#appE',m).value.trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ const er=$('#appErr',m); er.textContent='Enter a valid email address.'; er.hidden=false; return; } c(); toast(`You're on the list! We'll email ${v} when the app is live.`); }); },'mc'); }
function toast(m){ const t=document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2800); }
function modal(html, mount, cls=''){ const bg=document.createElement('div'); bg.className='modal-bg'; bg.innerHTML=`<div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  bg.addEventListener('click',e=>{ if(e.target===bg) bg.remove(); }); document.body.appendChild(bg); mount && mount(bg.firstElementChild,()=>bg.remove()); }
function view(v){ ['land','login','ob','app'].forEach(x=>$('#v-'+x).hidden = x!==v); window.scrollTo(0,0); }
const gemIcon = s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9z" fill="#2F9BE6"/><path d="M2 9h20M9 3l3 6 3-6M12 9v12" fill="none" stroke="#fff" stroke-width="1.3" opacity=".7"/></svg>`;
const starIcon = s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#F2A93B"/></svg>`;
const boltIcon = s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="#F2A93B"/></svg>`;
const clockIcon = s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#1FA971"/><path d="M12 7v5l3 2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`;

function renderLand(){
  const FAM=[
    ['You told your AI about your day. Nobody else heard it.','chat'],
    ['Your old group chat is still there. It\'s just quieter, and texting first feels like a lot.','group'],
    ['Something good happened today, and you sat there with it.','spark'],
    ['It\'s Sunday evening, and you\'ve scrolled further than you meant to.','moon']];
  const FI={chat:'<path d="M4 5h16v11H8l-4 4z"/>',group:'<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.8-3.5 3.3-5.5 6-5.5s5.2 2 6 5.5M15 15c2.6 0 4.6 1.6 5.5 4.5"/>',spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'};
  const STEPS=[
    ['Milo spots the quiet.','Tell Milo how your week went, or let your AI agent flag the signs, like late nights and cancelled plans. Milo only ever sees patterns, never what you write.'],
    ['Milo picks someone who\'s been there.','An old friend who has been through the same thing comes first. Then new people who get it. You both say yes before anything is sent.'],
    ['You say hi, then keep showing up.','Milo gives you the first line and a small favour to ask. A chat becomes a call, a call becomes a coffee. Tiny daily goals and city clans keep it going, and you level up only when a real person replies.']];
  const FAQ=[
    ['What if they never reply?','Rejection hurts most when you\'re already lonely, so nobody is introduced unless both of you say yes first, and a "no" is never shown. Milo gives you the opener and a small favour to ask, so replying is easy. And people are gladder to hear from you than you think.'],
    ['Is Milo reading my messages?','No. Milo only sees patterns like late nights and cancelled plans, never what you write. You can delete your data any time.'],
    ['What will people see about me?','Only what you choose to share. Your weekly mood report is private, and clans are built around what you like to do, not how your week went.'],
    ['Is this dating?','No. Socius is for friends, 18 and over. There is no swiping, and nobody is rated.'],
    ['Won\'t Milo become one more AI to lean on?','No. AI comfort fades by morning, so Milo is a bridge, not a companion: short replies, each ending with a starter for a real person. Gems and XP come only when a human replies.'],
    ['Why not just use WhatsApp?','WhatsApp keeps your contacts. It never tells you who to reach out to, when, or what to say. Milo does all three.'],
    ['What if I\'m really struggling?','If Milo sees signs of a crisis, someone you chose in advance gets a gentle heads-up. Socius is not therapy and not an emergency service.'],
    ['Isn\'t this profiting from loneliness?','You never pay to connect, and there are no ads. Colleges and companies pay for seats, because young people now spend about 35 minutes a day with friends, down from an hour, and isolated students and staff burn out. The optional coach is the only paid extra.'],
    ['How will you know it\'s working?','We count one thing above all: moments each week when a feeling reaches a real person and gets a reply within 48 hours. We also agreed in advance when to stop: if fewer than 1 in 4 intros are accepted, or loneliness scores don\'t drop.']];
  const STORIES=[
    ['Kabir Sethi','moved to Bengaluru for work','“I nearly didn\'t send it. Milo said Aarav had moved the same month I did, and that he\'d said yes too. One ‘hi’ later we have Sunday breakfast, and I\'ve stopped eating alone.”','3 weeks in'],
    ['Riya Menon','first job, rough first review','“After my first bad review I typed all of it to my AI at 2 a.m. Milo suggested sending a shorter version to Sneha, a friend from college. She replied with a voice note, and I actually slept.”','5 weeks in'],
    ['Ananya Desai','Koramangala Readers','“I joined a book clan for the books. The first ten minutes of the meetup were awkward, and then it was the first time in months I laughed out loud.”','2 months in'],
    ['Farhan Ali','lives alone in a PG','“The daily goal was tiny: message one person. No scores, no pressure. By week three, reaching out stopped feeling heavy.”','6 weeks in']];
  const LEARN=[['Feeling off.',0,'Why it happens, and why it\'s normal after a move.'],['Finding words.',1,'Name the feeling first. It makes the message easier to write.'],['Reaching out.',2,'Why showing a bit of the real you is how friendships begin.']];
  const enterLbl=S.signedIn?'Open my dashboard':'Get Milo';
  $('#v-land').innerHTML=`
  <header class="topbar"><div class="top gutter"><div class="logo">${logo()}</div>
    <nav class="topnav" aria-label="Website"><button data-jumpto="how">How it works</button><button data-jumpto="game">The game</button><button data-jumpto="questions">Questions</button><button data-jumpto="stories">Stories</button><button data-jumpto="learn">Learn</button></nav>
    <div class="top-acts">${S.signedIn?`<button class="btn gold" data-enter>Open my dashboard</button>`:`<button class="btn line" data-enter>Log in</button><button class="btn gold" data-enter>Sign up</button>`}</div></div></header>
  <div class="land gutter">
    <section class="hero">
      <div class="hero-txt"><span class="eyebrow">A friendly game for real friendships</span>
        <h1>Your AI listens. Your people should too.</h1>
        <p class="lead">Milo finds an old friend, or someone new, who has felt the same way and said yes to hearing from you. You get the first line. You just press send.</p>
        <div class="ctas"><button class="btn gold lg" data-enter>${S.signedIn?'Continue':'Find my first hello'}</button><button class="link" id="howBtn">See how it works ↓</button></div>
</div>
      <div class="hero-art">
        <div class="hero-dog"><img class="hero-vid" src="${matchMedia('(prefers-reduced-motion: reduce)').matches?HERO_POSTER:HERO_ANIM}" alt="Milo, the Socius golden retriever, waving hello" width="400" height="400"></div>
      </div>
    </section>

    <section id="familiar" class="fam" aria-labelledby="famH">
      <div class="sec-intro"><h2 id="famH" class="h2">Sound familiar?</h2><p class="muted">A new city is exciting. It's also a lot of evenings with nobody to tell.</p></div>
      <div class="fam-grid">${FAM.map(([t,ic])=>`<div class="fam-card"><span class="fam-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${FI[ic]}</svg></span><p>${t}</p></div>`).join('')}</div>
      <div class="fam-facts one"><div><b>1 in 6</b><p>If this sounds like you, you're not alone. About 1 in 6 people around the world feel this way right now (WHO, 2025). It's common, it isn't your fault, and it can change, one hello at a time.</p></div></div>
      <p class="fam-close">Making a friend takes hours, not charm.</p>
    </section>

    <section id="how" class="howv" aria-labelledby="howH">
      <div class="sec-intro"><h2 id="howH" class="h2">From a quiet week to Sunday breakfast</h2></div>
      <ol class="how-steps">${STEPS.map(([t,d],i)=>`<li><span class="hs-n">${i+1}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ol>
      <p class="how-close">Your AI will always be there. <b>Milo makes sure your people are too.</b></p>
      <button class="link" data-jumpto="questions">Wondering what Milo can see? Read this ↓</button>
    </section>

    <section id="game" class="gamebox" aria-labelledby="gameH">
      <h2 id="gameH" class="h2 gb-title">From hello to host</h2>
      <ol class="gb-path">${[['Say hello','Say hi to someone'],['Keep it going','Chat, then ask a question'],['Show up','Go to one meetup'],['Someone new','Meet someone different'],['Swap a favour','Help someone, get help'],['Host','Bring people together']].map(([t,d],i)=>`<li><span>${i+1}</span><b>${t}</b><small>${d}</small></li>`).join('')}</ol>
      <p class="gb-foot">Gems only when a real person replies. Nobody is ever rated.</p>
    </section>

    <section id="questions" class="faq" aria-labelledby="faqH">
      <div class="sec-intro"><span class="eyebrow">Before you say hi</span><h2 id="faqH" class="h2">Fair questions, straight answers</h2><p class="muted">Moving is hard enough without a confusing app. Here's what you'd want to know.</p></div>
      <div class="faq-list">${FAQ.map(([q,a],i)=>`<details class="faq-i"><summary>${q}<span class="faq-x" aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div>
    </section>

    <section id="stories" class="tst" aria-labelledby="tstH">
      <div class="tst-head"><span class="eyebrow">Stories</span><h2 id="tstH">It started with one “hi”</h2>
        <p class="muted">What the first weeks can feel like, in the words of people who just moved.</p></div>
      <div class="tst-grid">${STORIES.map(([n,c,q,t])=>`<figure class="tst-card"><blockquote>${q}</blockquote><figcaption>${nameAvRaw(n,44)}<div><b>${n}</b><span>${c}</span></div><em>${t}</em></figcaption></figure>`).join('')}</div>
      <p class="small muted tst-note">Sample stories for this prototype. The people are illustrative, not real users.</p>
    </section>

    <section id="learn" style="display:flex;flex-direction:column;gap:16px">
      <div class="sec-intro"><h2 class="h2">Three short videos for the nervous first message</h2><p class="muted">Free, and they open in a new tab. Start with the one that sounds like your week.</p></div>
      <div class="videos">${LEARN.map(([lab,i,d])=>{ const v=VIDEOS[i]; return `<a class="vid" href="${v.url}" target="_blank" rel="noopener" data-vid>${thumbArt(v)}<div><span class="lv-lab">${lab}</span><h3 style="margin-top:4px">${esc(v.t)}</h3><p class="lv-d">${d}</p><p class="small muted">${esc(v.by)}</p></div></a>`; }).join('')}</div>
    </section>

    <section id="getapp" class="appband">
      <div class="ab-text"><span class="eyebrow" style="color:#FFD27A">Get the app</span><h2>Make this Sunday less quiet.</h2>
        <p>Free to start. Both of you say yes before anyone messages.</p>
        <div class="stores">${storeBtn('ios')}${storeBtn('android')}</div></div>
      <div class="ab-art"><div class="phone"><div class="ph-notch"></div><div class="ph-screen"><div class="ph-chat"><span class="pc them">Kabir moved cities too</span><span class="pc me">Say hi?</span></div><i>Say hi</i></div></div>
        <div class="qr" role="img" aria-label="QR code to get Milo">${qrSVG()}<span class="small">Scan to get Milo</span></div></div>
    </section>
    <footer id="socials" class="foot">
      <div><div class="logo">${logo()}</div><p class="small muted" style="margin-top:8px">Real friends, one hello at a time.</p></div>
      <div><b>App</b><ul><li><button class="link" data-app="ios">Download for iPhone</button></li><li><button class="link" data-app="android">Download for Android</button></li></ul></div>
      <div><b>Socials</b><ul><li>Instagram · @socius.app</li><li>LinkedIn · Socius</li><li>X · @sociusapp</li><li>YouTube · Socius with Milo</li></ul></div>
      <div><b>Say hello</b><ul><li>hello@socius.app</li><li>Bringing Socius to your campus or company? partners@socius.app</li></ul></div>
      <p class="small muted" style="grid-column:1/-1">Prototype for a product-design challenge. Handles, people, clans and numbers are examples.</p>
    </footer>
  </div>`;
  const tb=$('#v-land .topbar'); if(tb){ const on=()=>tb.classList.toggle('scrolled',window.scrollY>8); window.addEventListener('scroll',on,{passive:true}); on(); }
  $('#v-land').querySelectorAll('[data-jumpto]').forEach(b=>b.onclick=()=>$('#'+b.dataset.jumpto).scrollIntoView({behavior:'smooth'}));
  $('#v-land').querySelectorAll('[data-enter]').forEach(b=>b.onclick=()=>{ if(S.signedIn) enterApp(true,true); else { renderLogin(); view('login'); hist({v:'login'}); } });
  $('#howBtn').onclick=()=>$('#how').scrollIntoView({behavior:'smooth'});
  document.querySelectorAll('#v-land [data-app]').forEach(b=>b.onclick=()=>openApp(b.dataset.app));
}

function renderLogin(){
  $('#v-login').innerHTML=`<div class="center gutter"><form class="panel" id="loginForm">
    <div class="logo">${logo()}</div>
    <div class="say">${auri(80,'wave')}<div class="b">Hi there! We're so happy you're here.</div></div>
    <div><h1 style="font-size:32px">Log in to Socius</h1><p class="muted" style="margin-top:6px">Use your college or work email. Your college or company only ever sees totals for the whole group, never anything about you.</p></div>
    <div class="field"><label for="em" class="small" style="font-weight:700">Email</label><input id="em" type="email" value="aarav@iitd.ac.in"></div>
    <div class="field"><label for="pw" class="small" style="font-weight:700">Password</label><input id="pw" type="password" value="prototype"></div>
    <label class="row small" style="gap:8px"><input type="checkbox" id="remember" checked> Keep me signed in on this device</label>
    <button class="btn gold" type="submit">Log in</button>
    <button class="btn line" type="button" id="agentLogin">Continue with your AI agent</button>
    <button class="small muted" type="button" id="backLand">Back to the website</button>
  </form></div>`;
  const go=()=>{ S.signedIn=$('#remember').checked; save(); ui.ob=0; renderOb(); view('ob'); hist({v:'ob',ob:0}); };
  $('#loginForm').onsubmit=e=>{ e.preventDefault(); go(); };
  $('#agentLogin').onclick=go;
  $('#backLand').onclick=()=>{ if(history.state&&history.state.v==='login') history.back(); else { renderLand(); view('land'); } };
}

function renderOb(){
  const s=ui.ob, N=4; let body='', cta='Continue', ok=true;
  if(s===0){
    const all=S.interests.concat(S.extra);
    body=`<div class="say">${auri(72,'curious')}<div class="b">Let's get to know you a little!</div></div>
      <div><span class="eyebrow">Step 1 of 4</span><h1 style="font-size:30px;margin-top:6px">What are you into?</h1>
      <p class="muted" style="margin-top:6px">Your agent filled these in. Add more if you like.</p></div>
      <div class="chips">${INTERESTS.map(c=>`<button class="chip" aria-pressed="${all.includes(c)}" data-int="${c}">${c}</button>`).join('')}</div>`;
    ok=all.length>0; if(!ok) cta='Pick at least one';
  } else if(s===1){
    body=`<div class="say">${auri(72,'excited')}<div class="b">I sniffed out a few familiar faces!</div></div>
      <div><span class="eyebrow">Step 2 of 4</span><h1 style="font-size:30px;margin-top:6px">Let's visit some older memories</h1>
      <p class="muted" style="margin-top:6px">Old friends who've walked your road. We connect you only if they say yes.</p></div>
      <div class="card">${FRIENDS.slice(0,6).map(f=>`<div class="li"><div class="row" style="min-width:0">${nameAv(f[0],42)}<div><b>${f[0]}</b><div class="small muted">${f[1]} · last talked ${f[2]}</div></div></div>
        <button class="toggle" role="switch" aria-checked="${has('invited',f[0])}" aria-label="Reconnect with ${f[0]}" data-inv="${esc(f[0])}"></button></div>`).join('')}</div>`;
  } else if(s===2){
    const all=S.interests.concat(S.extra).map(x=>x.toLowerCase());
    const list=CLANS.week.slice().sort((a,b)=>(all.some(i=>b[1].toLowerCase().includes(i)||i.includes(b[1].toLowerCase()))?1:0)-(all.some(i=>a[1].toLowerCase().includes(i)||i.includes(a[1].toLowerCase()))?1:0)).slice(0,6);
    const picked=S.clanChosen&&S.clan?S.clan.name:'';
    body=`<div class="say">${auri(72,'excited')}<div class="b">Your people nearby, picked from what you're into!</div></div>
      <div><span class="eyebrow">Step 3 of 4</span><h1 style="font-size:30px;margin-top:6px">Join a clan near you</h1>
      <p class="muted" style="margin-top:6px">A clan is a small local group around one interest. You meet every few weeks. Pick one now, or later.</p></div>
      <div class="obclans" role="radiogroup" aria-label="Clans near you">${list.map(([n,t,km,m])=>`<button class="obclan" role="radio" aria-checked="${picked===n}" data-oclan="${esc(n)}"><b>${esc(n)}</b><span class="small muted">${esc(t)} · ${km} km away · ${m} members</span>${picked===n?'<em>Joined ✓</em>':'<em>Join</em>'}</button>`).join('')}</div>`;
    cta=picked?'Continue':'Decide later';
  } else {
    const G=[[10,'Gentle','A quick chat or voice note'],[20,'Steady','A real catch-up'],[30,'Social butterfly','Chats plus a meetup now and then']];
    body=`<div class="say">${auri(72,'winking')}<div class="b">Last one, I promise!</div></div>
      <div><span class="eyebrow">Step 4 of 4</span><h1 style="font-size:30px;margin-top:6px">Set your daily energy</h1>
      <p class="muted" style="margin-top:6px">Minutes a day for your people. Each chat uses a little.</p></div>
      <div class="goal">${G.map(([m,t,d])=>`<button aria-pressed="${S.goal===m}" data-goal="${m}"><b>${m} min/day</b><span style="font-weight:700">${t}</span><span class="small muted">${d}</span></button>`).join('')}</div>
      <div class="plainsec"><b>One person who's always got your back</b><p class="small muted" style="margin-top:4px">If you go quiet for a long while, we'll check in with you first, then gently let them know.</p>
        <div class="chips" style="margin-top:10px">${S.invited.concat(['Mom']).map(n=>`<button class="chip" aria-pressed="${S.safety===n}" data-safe="${esc(n)}">${esc(n)}</button>`).join('')}</div></div>`;
    cta='Take me to Socius';
  }
  $('#v-ob').innerHTML=`<div class="center gutter"><div class="panel">
    <div class="between"><div class="logo">${logo()}</div><button class="small muted" id="obSkip">Skip for now</button></div>
    <div class="dots">${Array.from({length:N},(_,i)=>`<i class="${i<=s?'on':''}"></i>`).join('')}</div>
    ${body}
    <div class="row">${s>0?'<button class="btn line" id="obBack">Back</button>':''}<button class="btn gold" id="obNext" style="flex:1" ${ok?'':'disabled'}>${cta}</button></div></div></div>`;
  const el=$('#v-ob');
  $('#obNext').onclick=()=>{ save(); if(s<N-1){ ui.ob++; renderOb(); window.scrollTo(0,0); hist({v:'ob',ob:ui.ob}); } else enterApp(false,true); };
  $('#obSkip').onclick=()=>enterApp(false,true);
  const b=$('#obBack'); if(b) b.onclick=()=>{ if(history.state&&history.state.v==='ob'&&history.state.ob===s) history.back(); else { ui.ob--; renderOb(); } };
  el.querySelectorAll('[data-int]').forEach(c=>c.onclick=()=>{ const k=c.dataset.int; if(S.interests.includes(k)) S.interests=S.interests.filter(x=>x!==k); else if(S.extra.includes(k)) S.extra=S.extra.filter(x=>x!==k); else S.extra.push(k); renderOb(); });
  el.querySelectorAll('[data-oclan]').forEach(b=>b.onclick=()=>{ const n=b.dataset.oclan; if(S.clanChosen&&S.clan&&S.clan.name===n){ S.clan=null; S.clanChosen=false; S.guide=S.guide.filter(g=>g!=='clan'); } else { S.clan={name:n,custom:false}; S.clanChosen=true; MY_CLAN=n; if(!S.guide.includes('clan')) S.guide.push('clan'); } save(); renderOb(); });
  el.querySelectorAll('[data-inv]').forEach(t=>t.onclick=()=>{ toggle('invited',t.dataset.inv); t.setAttribute('aria-checked',has('invited',t.dataset.inv)); });
  el.querySelectorAll('[data-goal]').forEach(c=>c.onclick=()=>{ S.goal=+c.dataset.goal; renderOb(); });
  el.querySelectorAll('[data-safe]').forEach(c=>c.onclick=()=>{ S.safety=c.dataset.safe; renderOb(); });
}

function enterApp(returning,push){
  view('app'); $('#sideLogo').innerHTML=logo(); $('#sideLogo').onclick=()=>go('home'); initDock(); go('home',{fromPop:true}); hist({v:'app',page:'home',cv:ui.clanView},!push);
  if(returning){ toast(`Welcome back, ${first(S.name)}! Milo missed you.`); return; }
  if(!S.firstDayDone){ S.firstDayDone=true; save();
    modal(`${auri(170,'jump','pop')}<h1 style="font-size:34px">Hoooray! You made it to your first day!</h1>
      <p class="muted">We're so glad you're here, ${esc(first(S.name))}. Milo will walk you through it, one small step at a time. No pressure, ever.</p>
      <button class="btn gold" id="yay">Let's go!</button>`,(m,c)=>{ $('#yay',m).onclick=c; },'mc');
  }
}

function go(p,opts={}){ const prev=ui.page; if(p==='chats'&&prev&&prev!=='chats') ui.prevPage=prev; if(!opts.fromPop&&!opts.noTrail&&prev&&prev!==p){ ui.trail=ui.trail||[]; ui.trail.push(prev); ui.trail=ui.trail.slice(-30); } ui.page=p; if(!opts.fromPop) pushNav();
  document.querySelectorAll('#nav button').forEach(b=>b.setAttribute('aria-current', b.dataset.page===p?'page':'false'));
  const mc=$('#meCard'); if(mc){ mc.classList.toggle('on',p==='profile'); mc.setAttribute('aria-current',p==='profile'?'page':'false'); }
  document.body.classList.toggle('chatmode',p==='chats');
  ({home:pageHome,play:pagePlay,clans:pageClans,chats:pageChats,progress:pageProgress,blogs:pageBlogs,profile:pageProfile,coach:pageCoach}[p])();
  document.body.classList.toggle('page-home',p==='home'); chrome(); updBack(); window.scrollTo(0,0); document.body.classList.toggle('page-chats',p==='chats'); }
function chrome(){
  $('#meCard').innerHTML=`${avSVG(S.avatar,38)}<div class="who"><b>${esc(first(S.name))}</b><div class="small muted">Level ${S.level} · see profile</div></div>`;
  const left=Math.max(0,S.goal-S.todayMin);
  const nextSave=10*Math.pow(2,S.streakSaves||0);
  $('#statbar').innerHTML=`<button class="sbx" data-econ aria-describedby="tipGem" aria-label="Gems: ${S.gems}. What are gems?">${gemIcon(22)}<b>${S.gems}</b><small>gems</small><span class="sbtip" id="tipGem" role="tooltip"><b>Gems save your streak</b>Missed a day? Spend gems to keep your streak alive. The first save costs <b>10</b>, then <b>20</b>, <b>40</b>, <b>80</b>… it doubles each time, so showing up is always cheaper.<em>Next save: ${nextSave} gems · earned only when a real person replies</em></span></button><button class="sbx" data-econ aria-describedby="tipXp" aria-label="${S.xp} XP. What is XP?">${starIcon(22)}<b>${S.xp}</b><small>XP</small><span class="sbtip" id="tipXp" role="tooltip"><b>XP is your experience</b>How much real-life connecting you've done on Socius. Early quests give a little (10–20 XP); bigger steps like meetups give more (up to 80 XP). It builds your level and your profile.<em>Level ${S.level} · ${S.xp} XP so far</em></span></button><button class="sbx ${left?'':'empty'}" data-econ aria-describedby="tipEn" aria-label="Energy: ${left} of ${S.goal} minutes left today">${boltIcon(22)}<b>${left}/${S.goal}</b><small>min energy</small><span class="sbtip" id="tipEn" role="tooltip"><b>Energy is your daily time</b>The minutes you chose to give your people today. Each chat uses a little, and it refills tomorrow.</span></button><button class="sb-chat" id="sbChat" aria-label="Open chats">${ICON_CHAT}<b>Chats</b>${unread()?`<i>${unread()}</i>`:''}</button>`;
  $('#sbChat').onclick=()=>openChat(null); const nb=$('#navBadge'); if(nb){ const u=unread(); nb.hidden=!u; nb.textContent=u; } document.querySelectorAll('#statbar [data-econ]').forEach(b=>b.onclick=openEcon); const fb=$('#fabBadge'); if(fb){ const u=unread(); fb.hidden=!u; fb.textContent=u; }
}
document.querySelectorAll('#nav button').forEach(b=>{ b.onclick=()=>go(b.dataset.page); const t=b.querySelector('span'); if(t) b.title=t.textContent.charAt(0)+t.textContent.slice(1).toLowerCase(); });
function applySide(){ document.body.classList.toggle('sidecollapsed',!!S.sideCollapsed); const b=$('#sideCol'); if(b){ b.setAttribute('aria-expanded',!S.sideCollapsed); b.setAttribute('aria-label',S.sideCollapsed?'Expand side panel':'Collapse side panel'); b.title=S.sideCollapsed?'Expand side panel':'Collapse side panel'; } }
$('#sideCol').onclick=()=>{ S.sideCollapsed=!S.sideCollapsed; save(); applySide(); };
applySide();
$('#meCard').onclick=()=>go('profile');
function wire(root){
  root.querySelectorAll('[data-to]').forEach(b=>b.onclick=()=>go(b.dataset.to));
  root.querySelectorAll('[data-reach]').forEach(b=>b.onclick=()=>openChat(b.dataset.reach));
  root.querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>{ const a=READS[+b.dataset.read]; modal(`${auri(72,'content')}<span class="eyebrow">${a.ph} · ${a.read}</span><h2>${a.t}</h2>${a.body}<button class="btn" id="cl">Close</button>`,(m,c)=>{ $('#cl',m).onclick=c; markGuide('read'); },'mc'); });
}

const FOLLOWERS_SET = () => FOLLOWERS;
function followBtn(n, back=false){ const on=S.following.includes(n);
  return `<button class="btn sm fbtn ${on?'on':'gold'}" data-fl="${esc(n)}" aria-pressed="${on}">${on?'Following ✓':(back?'Follow back':'Follow')}</button>`; }
function rerender(){ const f={home:pageHome,play:pagePlay,clans:pageClans,chats:pageChats,progress:pageProgress,blogs:pageBlogs,profile:pageProfile,coach:pageCoach}[ui.page]; if(f) f(); chrome(); }
function paintFollow(n){ document.querySelectorAll('[data-fl]').forEach(b=>{ if(b.dataset.fl!==n) return; const on=S.following.includes(n); b.classList.toggle('on',on); b.classList.toggle('gold',!on); b.setAttribute('aria-pressed',on); b.textContent=on?'Following ✓':'Follow'; });
  document.querySelectorAll('[data-ucount]').forEach(el=>{ if(el.dataset.ucount===n) el.textContent=userStats(n).followers+(S.following.includes(n)?1:0); }); }
function setFollow(n,on){ S.following = on ? S.following.filter(x=>x!==n).concat(n) : S.following.filter(x=>x!==n); save(); paintFollow(n); rerender(); }
function askUnfollow(n){ const fn=first(n);
  modal(`${nameAvRaw(n,84)}<h2>Unfollow ${esc(fn)}?</h2><p class="muted">You'll stop seeing ${esc(fn)}'s updates on your profile. Don't worry, ${esc(fn)} won't be told.</p>
    <div class="row" style="width:100%"><button class="btn" style="flex:1;background:var(--coral);color:#fff" id="uf">Unfollow</button><button class="btn line" style="flex:1" id="cn">Cancel</button></div>`,
    (m,c)=>{ $('#cn',m).onclick=c; $('#uf',m).onclick=()=>{ c(); setFollow(n,false); toast(`You unfollowed ${fn}.`); }; },'mc'); }
function userInfo(n){ const f=FRIENDS.find(x=>x[0]===n), p=PEOPLE.find(x=>x[0]===n), mem=(typeof MEMBERS!=='undefined'?MEMBERS:[]).find(x=>x[0]===n);
  const h=avIdx(n); return { handle:n.toLowerCase().replace(/[^a-z ]/g,'').trim().replace(/ +/g,'.'), id:'SC-'+String(1000+(h*37)%9000), 
    sub: f ? `Old friend from ${f[3]} · ${f[1]}` : p ? `${p[1]} clan` : mem ? `${MY_CLAN} clan` : 'Socius member',
    level: 1+(h%5), joined: ['March','April','May','June','July'][h%5]+' 2040', interests: [INTERESTS[h%12],INTERESTS[(h+5)%12]] }; }
function userStats(n){ const h=avIdx(n); return {following: 12+(h%40), followers: 18+(h%55)}; }
function openUser(n){
  if(n===S.name){ go('profile'); return; }
  const u=userInfo(n), st=userStats(n), fn=first(n), followsYou=FOLLOWERS.includes(n);
  modal(`<div class="ucover" style="background:${AVS[avIdx(n)%AVS.length].bg}">${nameAvRaw(n,120)}</div>
    <div style="text-align:center"><h2>${esc(n)}</h2><p class="muted small">@${u.handle}${followsYou?' · <span class="tag leaf">Follows you</span>':''}</p><p class="small" style="margin-top:6px">${esc(u.sub)}</p></div>
    <div class="ucounts"><div><b>${st.following}</b><span class="small muted">Following</span></div><div><b data-ucount="${esc(n)}">${st.followers+(S.following.includes(n)?1:0)}</b><span class="small muted">Followers</span></div><div><b>Lv ${u.level}</b><span class="small muted">Level</span></div></div>
    <div class="row" style="width:100%">${followBtn(n,followsYou).replace('btn sm','btn')}<button class="btn line" id="chatU" style="flex:1">Chat</button></div>
    <button class="link" id="viewId">View ID</button>
    <div class="idcard" id="idc" hidden><div class="between"><span class="eyebrow">Socius ID</span><b>${u.id}</b></div>
      <div class="li"><span class="muted">Username</span><b class="small">@${u.handle}</b></div><div class="li"><span class="muted">Joined</span><b class="small">${u.joined}</b></div><div class="li"><span class="muted">Into</span><b class="small">${u.interests.join(', ')}</b></div>
      <button class="btn line sm" id="cpId" style="margin-top:8px">Copy ID</button></div>
    <button class="btn line" id="cl" style="width:100%">Close</button>`,(m,c)=>{
      $('#cl',m).onclick=c; $('#chatU',m).onclick=()=>{ c(); openChat(n); };
      $('#viewId',m).onclick=()=>{ const d=$('#idc',m); d.hidden=!d.hidden; $('#viewId',m).textContent=d.hidden?'View ID':'Hide ID'; };
      $('#cpId',m).onclick=()=>{ try{ navigator.clipboard.writeText(u.id); }catch(e){} toast(`Copied ${u.id}`); };
    },'mc');
}
const REPLIES=["Haha, that's so true!","Aw, I'm really glad you messaged.","Same here honestly. The first few months were rough.","Want to grab filter coffee this week?","Tell me more, how did that go?","I remember feeling exactly like that."];
function openChat(n){ document.querySelectorAll('.modal-bg').forEach(x=>x.remove()); ui.chatWith=n||null; if(ui.page==='chats') pageChats(); else go('chats'); }
function openMilo(){ document.querySelectorAll('.modal-bg').forEach(x=>x.remove()); ui.chatWith='__milo'; if(ui.page==='chats') pageChats(); else go('chats'); }
const hhmm=t=>{ try{ return new Date(t).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}); }catch(e){ return ''; } };
function chatSeed(){ S.chats=S.chats||{}; if(S.chatsSeeded) return; const now=Date.now(), m=60000;
  const seed={
    'Kabir Sethi':[{me:false,t:`Hey ${first(S.name)}! Milo told me you moved to Bengaluru too 😄`,at:now-190*m},{me:true,t:'Haha yes! Week 6 now. Still figuring out where to buy groceries.',at:now-185*m},{me:false,t:'Ha, same thing happened to me. Want to grab filter coffee near Koramangala this weekend?',at:now-180*m}],
    'Riya Menon':[{me:false,t:'Saw your clan climbed to #4! Proud of you 🎉',at:now-26*60*m}],
    'Ananya Desai':[{me:true,t:'That book club chat was fun. See you Thursday?',at:now-2*24*60*m},{me:false,t:'Yes! Bringing the second book too.',at:now-2*24*60*m+20*m}]};
  Object.entries(seed).forEach(([k,v])=>{ if(!S.chats[k]) S.chats[k]=v; }); S.chatsSeeded=true; save(); }
function chatPeople(){ const keys=Object.keys(S.chats).sort((a,b)=>((S.chats[b].at(-1)||{}).at||0)-((S.chats[a].at(-1)||{}).at||0));
  return [...new Set(keys.concat(S.following, FRIENDS.slice(0,6).map(f=>f[0])))].filter(n=>n!==S.name); }

function miloPane(narrow){ const tips=MILO_TIPS[ui.prevPage]||MILO_TIPS.home; ui.miloLog=ui.miloLog||[];
  return `<section class="cpane milo-pane">
    <header class="cpane-h">${narrow?'<button class="link" id="cBack">‹ Chats</button>':''}<span class="milo-av">${auri(44,'happy')}</span><div style="flex:1;min-width:0"><b>Milo</b><div class="small muted">Your guide. Points you to real people, never keeps you here.</div></div><button class="btn line sm" id="aiSet">AI settings</button></header>
    <div class="cmsgs" id="miMsgs">
      <div class="bub">Hi ${esc(first(S.name))}! Here's what's next for you.</div>
      <div class="mi-tips">${tips.map((t,i)=>`<button class="mi-tip" data-tip="${esc(t[2])}"><span class="mi-n">${i+1}</span><span class="mi-t"><b>${esc(t[0])}</b><small>${esc(t[1])}</small></span><span class="mi-go">GO →</span></button>`).join('')}</div>
      ${ui.miloLog.map(m=>`<div class="bub ${m.me?'me':''}">${esc(m.t)}</div>`).join('')}
      <div id="miOut" aria-live="polite"></div>
    </div>
    <div class="chips mi-chips">${['Chat with Kabir','Open my report','Go to clans','How am I feeling?'].map(c=>`<button class="chip" data-cmd="${c}">${c}</button>`).join('')}</div>
    <form class="composer" id="miF"><button type="button" class="mic" id="miMic" aria-label="Speak to Milo" aria-pressed="false">${ICON_MIC}</button><input id="miIn" autocomplete="off" placeholder="Ask Milo or say a command" aria-label="Ask Milo"><button type="submit" class="csend" aria-label="Send">${ICON_SEND}</button></form>
    <p class="small muted cnote">${{openai:'AI: your OpenAI key',claude:'AI: Claude',none:'AI is off: quick buttons and commands still work'}[aiProvider()]}</p></section>`; }
function wireMilo(){ const pg=$('#page'), box=$('#miMsgs'); box.scrollTop=box.scrollHeight;
  const push=(me,t)=>{ ui.miloLog.push({me,t}); ui.miloLog=ui.miloLog.slice(-20); };
  const run=async t=>{ t=(t||'').trim(); if(!t) return; const r=runCommand(t); if(!r) return; push(true,t);
    const out=$('#miOut'); out.insertAdjacentHTML('beforebegin',`<div class="bub me">${esc(t)}</div>`);
    if(aiProvider()==='none'){ push(false,r); out.insertAdjacentHTML('beforebegin',`<div class="bub">${esc(r)}</div>`); box.scrollTop=1e9; return; }
    out.innerHTML=`<div class="bub" id="aiB"><span class="typing"><span></span><span></span><span></span></span></div>`; box.scrollTop=1e9;
    try{ const full=await aiAsk(t,txt=>{ const b=$('#aiB'); if(b) b.textContent=splitAction(txt).text||'…'; });
      const {text,act}=splitAction(full); push(false,text); const b=$('#aiB'); if(b){ b.removeAttribute('id'); b.textContent=text; out.insertAdjacentElement('beforebegin',b); out.innerHTML=''; if(act){ const btn=document.createElement('button'); btn.className='lgo sm'; btn.style.cssText='margin-top:8px;display:block'; btn.textContent=actLabel(act)+' →'; btn.onclick=()=>{ const a=act.toLowerCase().startsWith('chat:')?'chat:'+act.slice(5).trim():act.toLowerCase(); doTip(a); }; b.appendChild(btn); } } }
    catch(e){ const b=$('#aiB'); if(b){ b.removeAttribute('id'); b.textContent=aiErrCopy(e&&e.code); } }
    box.scrollTop=1e9; };
  pg.querySelectorAll('[data-tip]').forEach(b=>b.onclick=()=>doTip(b.dataset.tip));
  pg.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>run(b.dataset.cmd));
  $('#miF').onsubmit=e=>{ e.preventDefault(); const v=$('#miIn').value; $('#miIn').value=''; run(v); };
  $('#miMic').onclick=()=>listen($('#miMic'),t=>{ $('#miIn').value=t; run(t); });
  $('#aiSet').onclick=openAISettings;
  if(!matchMedia('(max-width:760px)').matches) $('#miIn').focus(); }
function pageChats(){
  chatSeed(); const q=(ui.chatQ||'').toLowerCase();
  const people=chatPeople().filter(n=>n.toLowerCase().includes(q));
  const cur=ui.chatWith; const narrow=matchMedia('(max-width:760px)').matches;
  const pinned=`<button class="citem pin" aria-current="${cur==='__milo'}" data-chat="__milo"><span class="milo-av">${auri(46,'happy')}</span><div class="ci-t"><div class="between"><b>Milo</b><span class="bot-tag">Guide</span></div><div class="small muted ci-p">Ask anything, or tell me where to go</div></div></button>`
    +(ui.questOn?`<button class="citem pin quest" aria-current="${cur==='__quest'}" data-chat="__quest">${nameAvRaw('Ananya Desai',46)}<div class="ci-t"><div class="between"><b>Ananya Desai</b><span class="bot-tag q">Quest</span></div><div class="small muted ci-p">Level ${S.level} quest · say hi</div></div></button>`:'');
  const list=`<aside class="clist ${narrow&&cur?'hide':''}"><div class="clist-h"><h2>Chats</h2><input id="cq" placeholder="Search people" value="${esc(ui.chatQ||'')}" aria-label="Search chats"></div>
    <div class="clist-b">${q?'':pinned}${people.map(n=>{ const msgs=S.chats[n]||[], last=msgs.at(-1);
      return `<button class="citem" aria-current="${n===cur}" data-chat="${esc(n)}">${nameAvRaw(n,46)}<div class="ci-t"><div class="between"><b>${esc(n)}</b><span class="small muted">${last&&last.at?hhmm(last.at):''}</span></div>
        <div class="small muted ci-p">${last?(last.me?'You: ':'')+esc(last.t):'<i>Say hi 👋</i>'}</div></div></button>`; }).join('')||'<p class="muted small" style="padding:16px">No one by that name.</p>'}</div></aside>`;
  let pane;
  if(cur==='__milo'){ pane=miloPane(narrow); }
  else if(cur==='__quest'){ pane=`<section class="cpane qpane">${narrow?'<header class="cpane-h"><button class="link" id="cBack">‹ Chats</button><b>Quest</b></header>':''}<div id="chatArea" class="qarea"></div></section>`; }
  else if(!cur){ pane=`<section class="cpane empty">${auri(150,'love')}<h2>Your chats</h2><p class="muted">Pick someone on the left to start talking. Real people, your own words.</p></section>`; }
  else { const u=userInfo(cur), msgs=S.chats[cur]||[], fn=first(cur);
    const starters=[`Hey ${fn}! How's your week going?`,`Remember ${['our college canteen chai','that trip we planned','those late-night study sessions'][avIdx(cur)%3]}? Made me think of you.`,`Free for a 10-min call this week?`];
    pane=`<section class="cpane">
      <header class="cpane-h">${narrow?'<button class="link" id="cBack">‹ Chats</button>':''}${nameAv(cur,44)}<div style="flex:1;min-width:0"><b>${esc(cur)}</b><div class="small muted">${esc(u.sub)}</div></div><button class="btn line sm" data-user="${esc(cur)}">View profile</button></header>
      <div class="cmsgs" id="cmsgs">${msgs.length?'<div class="cday">Recent</div>':''}${msgs.map(x=>`<div class="bub ${x.me?'me':''}">${esc(x.t)}${x.at?`<span class="bt">${hhmm(x.at)}</span>`:''}</div>`).join('')}
        ${msgs.length<2?`<div class="cstart">${auri(60,'curious')}<div><b class="small">Not sure how to start?</b><div class="chips" style="margin-top:6px">${starters.map((t,i)=>`<button class="chip" data-st="${i}">${esc(t)}</button>`).join('')}</div></div></div>`:''}
        <div class="typing" id="typing" hidden><span></span><span></span><span></span></div></div>
      <form class="composer" id="cform"><input id="cmsg" autocomplete="off" placeholder="Message ${esc(fn)}…" aria-label="Message ${esc(fn)}"><button type="submit" class="csend" aria-label="Send"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button></form>
      <p class="small muted cnote">Human to human. Socius never writes or sends messages for you.</p></section>`; }
  $('#page').innerHTML=`<div class="chatapp">${list}${pane}</div>`;
  const pg=$('#page');
  const cq=$('#cq'); cq.oninput=()=>{ ui.chatQ=cq.value; const pos=cq.selectionStart; pageChats(); const n=$('#cq'); n.focus(); n.setSelectionRange(pos,pos); };
  pg.querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>{ if(b.dataset.chat==='__quest'){ ui.chatWith='__quest'; pageChats(); questRender(); return; } ui.chatWith=b.dataset.chat; pageChats(); });
  { const back=$('#cBack'); if(back) back.onclick=()=>{ ui.chatWith=null; pageChats(); }; }
  if(cur==='__milo'){ wireMilo(); return; }
  if(cur==='__quest') return;
  if(!cur) return;
  const box=$('#cmsgs'); box.scrollTop=box.scrollHeight;
  const back=$('#cBack'); if(back) back.onclick=()=>{ ui.chatWith=null; pageChats(); };
  const inp=$('#cmsg');
  const send=t=>{ t=(t||'').trim(); if(!t) return; S.chats[cur]=S.chats[cur]||[]; S.chats[cur].push({me:true,t,at:Date.now()}); if(FRIENDS.some(f=>f[0]===cur)) markGuide('hi'); save(); pageChats();
    const who=cur; setTimeout(()=>{ if(ui.page!=='chats'||ui.chatWith!==who) return; const ty=$('#typing'); if(ty){ ty.hidden=false; $('#cmsgs').scrollTop=1e9; } },400);
    setTimeout(()=>{ S.chats[who].push({me:false,t:REPLIES[S.chats[who].length%REPLIES.length],at:Date.now()}); save(); if(ui.page==='chats'){ const keep=document.activeElement&&document.activeElement.id==='cmsg'; pageChats(); if(keep&&$('#cmsg')) $('#cmsg').focus(); } },1700); };
  $('#cform').addEventListener('submit',e=>{ e.preventDefault(); send(inp.value); setTimeout(()=>$('#cmsg')&&$('#cmsg').focus(),0); });
  pg.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{ inp.value=b.textContent; inp.focus(); });
  if(!narrow) inp.focus();
}
document.addEventListener('click',e=>{
  const fb=e.target.closest('[data-fl]'); if(fb){ e.preventDefault(); e.stopPropagation(); const n=fb.dataset.fl; if(S.following.includes(n)) askUnfollow(n); else { setFollow(n,true); toast(`You're following ${first(n)} now!`); } return; }
  const ub=e.target.closest('[data-user]'); if(ub){ e.preventDefault(); openUser(ub.dataset.user); return; }
  const row=e.target.closest('.person,.member,.contact'); if(row && !e.target.closest('button,a,input')){ const u=row.querySelector('[data-user]'); if(u) openUser(u.dataset.user); }
}, true);

const ICON_CHAT='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.6-4.6A8 8 0 1 1 21 12z"/></svg>';
const ICON_MIC='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
const ICON_SEND='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>';
function buzz(p){ try{ if(navigator.vibrate) navigator.vibrate(p); }catch(e){} }
// Smooth press feedback: ripple + light haptic on every tappable control
document.addEventListener('pointerdown',e=>{ const b=e.target.closest('.btn,.store,.chip,.nav button,.fr,.obclan,.pitem,.bookc,.sb-chat,.navback,.fr-arr,.dockfab,.toggle,[data-goal],[data-oclan]'); if(!b||b.disabled) return;
  buzz(b.classList.contains('btn')&&b.classList.contains('gold')?8:4); b.classList.remove('pressed'); void b.offsetWidth; if(b.classList.contains('gold')) b.classList.add('pressed');
  if(!b.classList.contains('btn')||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r=b.getBoundingClientRect(), d=Math.max(r.width,r.height)*2.2, sp=document.createElement('span'); sp.className='rip';
  sp.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`; b.appendChild(sp); setTimeout(()=>sp.remove(),650); },{passive:true});
document.addEventListener('animationend',e=>{ if(e.animationName==='pressGlow') e.target.classList.remove('pressed'); });

function unread(){ try{ chatSeed(); S.seen=S.seen||{}; return Object.entries(S.chats).filter(([n,m])=>{ const l=m.at(-1); return l&&!l.me&&(S.seen[n]||0)<(l.at||1); }).length; }catch(e){ return 0; } }
const MILO_TIPS={
  home:[['Say hi to Kabir','He moved cities too','chat:Kabir Sethi'],['Join the annual meetup','1st Dec · 38 going','meetup'],['Check in with yourself','30 seconds','feel']],
  play:[['Finish today\'s clan chat','Ananya is free now','play'],['Reply to Riya','She wrote yesterday','chat:Riya Menon'],['See your next level','Level 3 opens soon','go:play']],
  clans:[['RSVP Thursday book club','9 going','go:clans'],['Say hi to Ananya','Your clan host','chat:Ananya Desai'],['See the leaderboard','You are #4','go:clans']],
  progress:[['Reply to Riya','Keeps things warm','chat:Riya Menon'],['Plan a weekend moment','Weekends were quiet','go:clans'],['Check in with yourself','Mood log','feel']],
  blogs:[['Watch: 10 ways to talk better','12 min','go:blogs'],['Try one tip with Kabir','Practice makes easy','chat:Kabir Sethi'],['Check in with yourself','Mood log','feel']],
  profile:[['Invite a friend','+50 gems each','invite'],['Find friends','From your clan','find'],['Say hi to Farhan','Lives alone in a PG too','chat:Farhan Ali']]};
function doTip(a){ if(a.startsWith('chat:')) return openDock('chats',a.slice(5)); closeDock(); if(a==='feel') return openFeel(); if(a==='meetup'){ go('home'); setTimeout(()=>{ const m=$('.meetup'); if(m) m.scrollIntoView({behavior:'smooth',block:'center'}); },60); return; }
  if(a==='play'){ go('play'); setTimeout(()=>{ try{ startChat(); }catch(e){} },60); return; } if(a==='invite'){ go('profile'); setTimeout(()=>$('#invF')&&$('#invF').click(),60); return; } if(a==='find'){ go('profile'); setTimeout(()=>$('#findF')&&$('#findF').click(),60); return; } if(a.startsWith('go:')) go(a.slice(3)); }
function runCommand(t){ const q=t.toLowerCase().trim(); if(!q) return '';
  const ppl=chatPeople(); const who=ppl.find(n=>q.includes(first(n).toLowerCase()));
  if(who && /(chat|message|talk|hi|hello|text|open)/.test(q)){ openDock('chats',who); return ''; }
  const pages={home:'home',play:'play',game:'play',clan:'clans',progress:'progress',report:'progress',learn:'blogs',video:'blogs',profile:'profile',coach:'coach',therap:'coach',plus:'coach'};
  for(const k in pages){ if(q.includes(k)){ closeDock(); go(pages[k]); const nm={home:'Home',play:'Play',clans:'Clans',progress:'your report',blogs:'Learn',profile:'your profile',coach:'Coach'}[pages[k]]; toast(`Opened ${nm}`); return ''; } }
  if(/feel|mood|check in/.test(q)){ closeDock(); openFeel(); return ''; }
  if(/meetup|event|rsvp/.test(q)){ doTip('meetup'); return ''; }
  if(/chat|message/.test(q)){ openDock('chats'); return ''; }
  if(/invite/.test(q)){ doTip('invite'); return ''; }
  return `I didn't catch that. Try "chat with Kabir", "open my report" or "go to clans".`; }
let rec=null;
function listen(btn, onText){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){ toast('Voice needs Chrome or Edge with a microphone.'); return; }
  if(rec){ try{ rec.stop(); }catch(e){} rec=null; btn.classList.remove('on'); return; }
  try{ rec=new SR(); rec.lang='en-IN'; rec.interimResults=false; rec.maxAlternatives=1;
    rec.onresult=e=>{ const t=e.results[0][0].transcript; onText(t); };
    rec.onerror=e=>{ toast(e.error==='not-allowed'||e.error==='service-not-allowed'?'Allow microphone access to talk to Milo.':'Voice didn\'t work this time. Try again.'); };
    rec.onend=()=>{ btn.classList.remove('on'); btn.setAttribute('aria-pressed','false'); rec=null; };
    btn.classList.add('on'); btn.setAttribute('aria-pressed','true'); rec.start(); toast('Listening…'); }
  catch(e){ rec=null; btn.classList.remove('on'); toast('Allow microphone access to talk to Milo.'); } }

/* ---------- Milo AI: Claude inside claude.ai, or your own OpenAI key in the downloaded file ---------- */
let SAMPLE=null; (async()=>{ try{ if(window.claude&&claude.use) SAMPLE=await claude.use('sample'); }catch(e){ SAMPLE=null; } })();
const getKey=()=>{ try{ return localStorage.getItem('socius-openai-key')||''; }catch(e){ return ''; } };
const setKey=k=>{ try{ k?localStorage.setItem('socius-openai-key',k):localStorage.removeItem('socius-openai-key'); }catch(e){} };
function aiProvider(){ return getKey()?'openai':SAMPLE?'claude':'none'; }
function miloContext(){ const n=nextTask(); return `You are Milo, the friendly golden retriever guide inside Socius, a game that helps young adults in Bengaluru reconnect with real people instead of an AI. User: ${S.name}, level ${S.level}, ${S.xp} XP, daily goal ${S.todayMin}/${S.goal} min, clan ${MY_CLAN}. Current page: ${ui.page}. Next task: ${n?n.t[1]:'all levels done'}. Old friends who have been there: ${FRIENDS.slice(0,5).map(f=>f[0]+' ('+f[1]+')').join('; ')}. Upcoming: clan annual meetup 1st Dec 8-10 AM, Thursday book club 7 pm.
Rules: reply in at most 3 short, warm sentences. Always nudge toward a real person, never toward talking more to you. Never write messages on the user's behalf to send; offer ideas only. If the user seems in crisis, tell them to contact their safety contact (${S.safety}) or local emergency services now.
If one app action would help, end with exactly one line: ACTION: chat:<full name> | go:home|play|clans|progress|blogs|profile | feel | meetup | invite`; }
let aiTurns=[], aiCtl=null;
async function aiAsk(text, onText){
  aiTurns.push({role:'user',content:text}); aiTurns=aiTurns.slice(-8);
  const prov=aiProvider();
  if(prov==='openai'){
    const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getKey()},
      body:JSON.stringify({model:'gpt-4o-mini',temperature:0.6,messages:[{role:'system',content:miloContext()},...aiTurns]})});
    if(!r.ok){ aiTurns.pop(); throw {code:r.status===401?'bad_key':'openai_error'}; }
    const j=await r.json(); const out=(j.choices&&j.choices[0]&&j.choices[0].message&&j.choices[0].message.content)||''; onText&&onText(out); aiTurns.push({role:'assistant',content:out}); return out; }
  if(prov==='claude'){
    aiCtl=new AbortController();
    const res=await SAMPLE([{role:'user',content:miloContext()},...aiTurns],{cache:false,modelTier:'quick',signal:aiCtl.signal,onText:({text})=>onText&&onText(text)});
    aiTurns.push({role:'assistant',content:res.text}); return res.text; }
  aiTurns.pop(); throw {code:'none'}; }
function splitAction(t){ const m=t.match(/\n?\s*ACTION:\s*([^\n]+)\s*$/i); return m?{text:t.slice(0,m.index).trim(),act:m[1].trim()}:{text:t.trim(),act:null}; }
function actLabel(a){ if(a.startsWith('chat:')) return 'Chat with '+first(a.slice(5)); if(a.startsWith('go:')) return 'Open '+({blogs:'Learn',progress:'my report'}[a.slice(3)]||a.slice(3)); return {feel:'Check in',meetup:'See the meetup',invite:'Invite a friend'}[a]||'Go'; }
function aiErrCopy(c){ return {bad_key:'That OpenAI key was refused. Check it in AI settings.',openai_error:'OpenAI did not answer. Try again in a moment.',not_granted:'AI is switched off for this page. You can still use the quick buttons.',rate_limited:'Milo needs a short break. Try again in a minute.',none:'AI is not connected here. Add your OpenAI key in AI settings, or use the quick buttons.'}[c]||'Milo could not answer this time. Try again.'; }
function openAISettings(){ const k=getKey();
  modal(`${auri(100,'curious','pop')}<h2>Milo's AI</h2>
    <p class="muted small">Inside claude.ai, Milo answers with Claude (you'll be asked once). In the downloaded file, you can use your own OpenAI key instead.</p>
    <div class="field" style="width:100%;text-align:left"><label for="okey" class="small" style="font-weight:700">OpenAI API key</label><input id="okey" type="password" autocomplete="off" placeholder="sk-..." value="${k?'••••••••••••':''}"></div>
    <p class="small muted" style="text-align:left">Saved only in this browser, never in the file. Don't use it on a shared computer. claude.ai blocks outside servers, so the key works in the downloaded file only.</p>
    <p class="small" style="text-align:left"><b>Now using:</b> ${{openai:'Your OpenAI key',claude:'Claude (via claude.ai)',none:'No AI (quick buttons only)'}[aiProvider()]}</p>
    <div class="row" style="width:100%"><button class="btn line" id="rm" style="flex:1">${k?'Remove key':'Cancel'}</button><button class="btn gold" id="sv" style="flex:1">Save</button></div>`,(m,c)=>{
      $('#rm',m).onclick=()=>{ if(k){ setKey(''); toast('Key removed from this browser.'); } c(); if(ui.page==='chats') pageChats(); };
      $('#sv',m).onclick=()=>{ const v=$('#okey',m).value.trim(); if(v && !v.startsWith('•')){ if(!/^sk-/.test(v)){ toast('That does not look like an OpenAI key (it starts with sk-).'); return; } setKey(v); aiTurns=[]; toast('Key saved in this browser.'); } c(); if(ui.page==='chats') pageChats(); };
    },'mc'); }
function openDock(tab='milo', who){ if(tab==='chats') openChat(who||null); else openMilo(); }
function closeDock(){ const d=$('#dock'); if(d){ d.hidden=true; } document.body.classList.remove('dockopen'); }
function renderDock(){
  const d=$('#dock'), B=$('#dockBody'); d.classList.toggle('full',!!ui.dockFull);
  d.querySelectorAll('[data-dt]').forEach(t=>t.setAttribute('aria-selected',t.dataset.dt===ui.dockTab));
  if(ui.dockTab==='milo'){
    const tips=MILO_TIPS[ui.page]||MILO_TIPS.home;
    B.innerHTML=`<div class="mi-hi">${auri(64,'happy')}<div><b>Hi ${esc(first(S.name))}!</b><div class="small muted">Here's what's next for you.</div></div></div>
      <div class="mi-tips">${tips.map((t,i)=>`<button class="mi-tip" data-tip="${esc(t[2])}"><span class="mi-n">${i+1}</span><span class="mi-t"><b>${esc(t[0])}</b><small>${esc(t[1])}</small></span><span class="mi-go">GO →</span></button>`).join('')}</div>
      <div class="mi-out" id="miOut" aria-live="polite"></div>
      <div class="chips mi-chips">${['Chat with Kabir','Open my report','Go to clans','How am I feeling?'].map(c=>`<button class="chip" data-cmd="${c}">${c}</button>`).join('')}</div>
      <div class="ai-row"><span class="small muted">${{openai:'AI: your OpenAI key',claude:'AI: Claude',none:'AI: off'}[aiProvider()]}</span><button class="link" id="aiSet">AI settings</button></div>
      <form class="dk-comp" id="miF"><button type="button" class="mic" id="miMic" aria-label="Speak to Milo" aria-pressed="false">${ICON_MIC}</button><input id="miIn" placeholder="Ask Milo or say a command" aria-label="Ask Milo" autocomplete="off"><button class="csend" aria-label="Send">${ICON_SEND}</button></form>`;
    const run=async t=>{ const r=runCommand(t); if(!r) return; const out=$('#miOut'); if(aiProvider()==='none'){ out.innerHTML=`<div class="bub">${esc(r)}</div>`; return; }
      out.innerHTML=`<div class="bub me">${esc(t)}</div><div class="bub" id="aiB"><span class="typing"><span></span><span></span><span></span></span></div>`;
      try{ const full=await aiAsk(t,txt=>{ const b=$('#aiB'); if(b) b.textContent=splitAction(txt).text||'…'; });
        const {text,act}=splitAction(full); const b=$('#aiB'); if(b){ b.textContent=text; if(act){ const btn=document.createElement('button'); btn.className='lgo sm'; btn.style.marginTop='8px'; btn.style.display='block'; btn.textContent=actLabel(act)+' →'; btn.onclick=()=>{ const a=act.toLowerCase().startsWith('chat:')?'chat:'+act.slice(5).trim():act.toLowerCase(); doTip(a); }; b.appendChild(btn); } } }
      catch(e){ const b=$('#aiB'); if(b) b.textContent=aiErrCopy(e&&e.code); } };
    B.querySelectorAll('[data-tip]').forEach(b=>b.onclick=()=>doTip(b.dataset.tip));
    B.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>run(b.dataset.cmd));
    $('#miF').onsubmit=e=>{ e.preventDefault(); const v=$('#miIn').value; $('#miIn').value=''; run(v); };
    $('#miMic').onclick=()=>listen($('#miMic'),t=>{ $('#miIn').value=t; run(t); });
    $('#aiSet').onclick=openAISettings;
    return; }
  chatSeed(); const cur=ui.dockWith;
  if(!cur){ const q=(ui.dockQ||'').toLowerCase(); const people=chatPeople().filter(n=>n.toLowerCase().includes(q));
    B.innerHTML=`<input class="dk-search" id="dkQ" placeholder="Search people" aria-label="Search chats" value="${esc(ui.dockQ||'')}">
      <div class="dk-list">${people.map(n=>{ const l=(S.chats[n]||[]).at(-1); const un=l&&!l.me&&((S.seen||{})[n]||0)<(l.at||1);
        return `<button class="citem" data-chat="${esc(n)}">${nameAvRaw(n,44)}<div class="ci-t"><div class="between"><b>${esc(n)}</b>${un?'<i class="dot" aria-label="unread"></i>':''}</div><div class="small muted ci-p">${l?(l.me?'You: ':'')+esc(l.t):'Say hi'}</div></div></button>`; }).join('')}</div>`;
    const qi=$('#dkQ'); qi.oninput=()=>{ ui.dockQ=qi.value; const p=qi.selectionStart; renderDock(); const n=$('#dkQ'); n.focus(); n.setSelectionRange(p,p); };
    B.querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>{ ui.dockWith=b.dataset.chat; renderDock(); });
    return; }
  S.seen=S.seen||{}; S.seen[cur]=Date.now(); save(); chrome();
  const msgs=S.chats[cur]||[], fn=first(cur), isFriend=FRIENDS.some(f=>f[0]===cur);
  const starters=[`Hey ${fn}! How's your week going?`,`Saw you've been there too. How did you handle it?`,`Free for a 10-min call this week?`];
  B.innerHTML=`<div class="dk-ch"><button class="dk-ic" id="dkBack" aria-label="Back to all chats"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>${nameAv(cur,38)}<div style="flex:1;min-width:0"><b>${esc(cur)}</b><div class="small muted" id="dkStatus">${ui.typing===cur?'<span class="typing-label">typing…</span>':(isFriend&&msgs.length<2?'They get a gentle request first':'Online')}</div></div></div>
    <div class="cmsgs dk-msgs" id="dkMsgs">${msgs.map(x=>`<div class="bub ${x.me?'me':''}">${esc(x.t)}${x.at?`<span class="bt">${hhmm(x.at)}</span>`:''}</div>`).join('')}
      ${msgs.length<2?`<div class="dk-st">${starters.map(t=>`<button class="chip" data-st>${esc(t)}</button>`).join('')}</div>`:''}<div class="typing" id="dkTy" ${ui.typing===cur?'':'hidden'}><span></span><span></span><span></span></div></div>
    <form class="dk-comp" id="dkF"><button type="button" class="mic" id="dkMic" aria-label="Speak your message" aria-pressed="false">${ICON_MIC}</button><input id="dkIn" placeholder="Message ${esc(fn)}" aria-label="Message ${esc(fn)}" autocomplete="off"><button class="csend" aria-label="Send">${ICON_SEND}</button></form>`;
  const box=$('#dkMsgs'); box.scrollTop=box.scrollHeight;
  $('#dkBack').onclick=()=>{ ui.dockWith=null; renderDock(); };
  B.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{ $('#dkIn').value=b.textContent; $('#dkIn').focus(); });
  $('#dkMic').onclick=()=>listen($('#dkMic'),t=>{ const i=$('#dkIn'); i.value=(i.value?i.value+' ':'')+t; i.focus(); });
  $('#dkF').onsubmit=e=>{ e.preventDefault(); const t=$('#dkIn').value.trim(); if(!t) return; S.chats[cur]=S.chats[cur]||[]; S.chats[cur].push({me:true,t,at:Date.now()});
    if(isFriend){ markGuide('hi'); if(!has('reached',cur)) S.reached.push(cur); } save(); renderDock(); $('#dkIn').focus(); if(isFriend&&S.level===2&&!has('done','l2c')) complete('l2c',20);
    buzz(8); const who=cur, reply=REPLIES[S.chats[who].length%REPLIES.length];
    const readAt=900+Math.random()*900, typeFor=Math.min(4200,Math.max(1600,reply.length*55));
    setTimeout(()=>{ ui.typing=who; const st=$('#dkStatus'); if(st&&ui.dockWith===who) st.innerHTML='<span class="typing-label">typing…</span>'; const ty=$('#dkTy'); if(ty&&ui.dockWith===who){ ty.hidden=false; $('#dkMsgs').scrollTop=1e9; } },readAt);
    setTimeout(()=>{ ui.typing=null; S.chats[who].push({me:false,t:reply,at:Date.now()}); save(); buzz([10,40,10]); if(!$('#dock').hidden&&ui.dockTab==='chats'&&ui.dockWith===who){ renderDock(); $('#dkIn')&&$('#dkIn').focus(); } else { chrome(); toast(`${first(who)} replied`); } },readAt+typeFor); };
}
function initNavBack(){ const b=$('#navBack'); if(b&&!b.onclick) b.onclick=goBack; }
function initDock(){ initNavBack(); const f=$('#fabImg'); if(f&&!f.src) f.src=AURI_IMG.f_happy;
  $('#dockFab').onclick=openMilo;
  $('#dkX').onclick=closeDock; $('#dkFull').onclick=()=>{ ui.dockFull=!ui.dockFull; renderDock(); };
  document.querySelectorAll('#dock [data-dt]').forEach(t=>t.onclick=()=>{ ui.dockTab=t.dataset.dt; renderDock(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!$('#dock').hidden&&!document.querySelector('.modal-bg')) closeDock(); }); }
let navDepth=0;
function hist(st,replace){ try{ const h='#'+(st.v==='app'?(st.page+(st.page==='clans'&&st.cv==='city'?'-leaderboard':'')):st.v==='ob'?'welcome-'+((st.ob||0)+1):st.v); st.d=replace?navDepth:++navDepth; history[replace?'replaceState':'pushState'](st,'',h); }catch(e){} updBack(); }
function pushNav(){ hist({v:'app',page:ui.page,cv:ui.clanView}); }
function updBack(){ const b=$('#navBack'); if(b) b.hidden=(ui.page==='home'); }
function goBack(){ ui.trail=ui.trail||[]; let t=null; while(ui.trail.length){ const x=ui.trail.pop(); if(x&&x!==ui.page){ t=x; break; } } if(ui.page==='chats'&&ui.chatWith&&matchMedia('(max-width:760px)').matches){ ui.chatWith=null; pageChats(); return; } go(t||'home',{noTrail:true}); }
window.addEventListener('popstate',e=>{ const st=e.state; if(!st) return; navDepth=st.d||0;
  document.querySelectorAll('.modal-bg').forEach(x=>x.remove()); if($('#dock')&&!$('#dock').hidden){ closeDock(); }
  if(st.v==='land'){ renderLand(); view('land'); }
  else if(st.v==='login'){ renderLogin(); view('login'); }
  else if(st.v==='ob'){ ui.ob=st.ob||0; renderOb(); view('ob'); }
  else if(st.v==='app'||st.page){ if($('#v-app').hidden){ view('app'); $('#sideLogo').innerHTML=logo(); $('#sideLogo').onclick=()=>go('home'); initDock(); } ui.clanView=st.cv||'mine'; go(st.page||'home',{fromPop:true}); }
  updBack(); });
function setClanView(v){ ui.clanView=v; pushNav(); pageClans(); window.scrollTo(0,0); }
function markGuide(k){ if(!S.guide.includes(k)){ S.guide.push(k); save(); } }

function ring(done,total){ const r=34,C=2*Math.PI*r,p=Math.min(done/total,1);
  return `<svg class="ring" viewBox="0 0 88 88" role="img" aria-label="${done} of ${total} minutes today"><circle cx="44" cy="44" r="${r}" fill="none" stroke="#E6E9F2" stroke-width="10"/><circle cx="44" cy="44" r="${r}" fill="none" stroke="#1FA971" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C*p} ${C}" transform="rotate(-90 44 44)"/><text x="44" y="44" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="20" fill="#1B1F3B">${done}</text><text x="44" y="60" text-anchor="middle" font-size="10.5" font-weight="700" fill="#5D6382">of ${total} min</text></svg>`; }
function friendCards(){ return FRIENDS.map(f=>`<div class="card friend"><div class="row">${nameAv(f[0],42)}<div><b>${first(f[0])}</b><div class="small muted">${f[2]}</div></div></div>
  <span class="tag leaf" style="align-self:flex-start">Been there</span><p class="been">${f[1]}</p>
  <button class="btn sm ${has('reached',f[0])?'ghost':''}" data-reach="${esc(f[0])}">${has('reached',f[0])?'Waiting for a yes':'Say hi'}</button></div>`).join(''); }
function levelCard(){ const lv=LEVELS[S.level-1]; const next=lv.tasks.find(t=>!has('done',t[0]));
  return `<div class="levelcard"><div class="between"><span class="eyebrow" style="color:#3A2400">Level ${lv.n} · ${lv.kind}</span><b>${S.xp} XP</b></div>
    <h3 style="font-size:26px">${lv.title}</h3><div class="bar"><i style="width:${Math.round(lv.tasks.filter(t=>has('done',t[0])).length/lv.tasks.length*100)}%"></i></div>
    <p class="small">Up next: ${esc(next?next[1]:'You finished this level!')}</p><button class="btn" id="playNext">Play next</button></div>`; }
function playNext(){ const n=nextTask(); go('play'); if(n) setTimeout(()=>runTask(n.t[0],n.t[2]||''),80); }
function rankRows(list,n){ return list.slice(0,n).map((c,i)=>`<div class="rank ${c[0]===MY_CLAN?'me':''}"><span class="n">${i+1}</span><div style="min-width:0"><b>${c[0]}</b><div class="small muted">${c[1]} · ${c[3]} members${c[0]===MY_CLAN?' · your clan':''}</div></div><span class="score">${c[2].toFixed(1)}<div class="small muted" style="font-weight:500">meetups / member</div></span></div>`).join(''); }
const STK={
  bubble:t=>`<svg viewBox="0 0 120 80"><path d="M10 8h100a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H48l-18 16 4-16H10a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8z" fill="#fff" stroke="#111" stroke-width="4"/><text x="60" y="44" text-anchor="middle" font-family="Nunito, sans-serif" font-size="24" font-weight="900" fill="#111">${t}</text></svg>`,
  heart:()=>`<svg viewBox="0 0 100 90"><path d="M50 84C20 62 4 46 4 28 4 14 15 4 28 4c9 0 17 5 22 13 5-8 13-13 22-13 13 0 24 10 24 24 0 18-16 34-46 56z" fill="#FF4D6D" stroke="#111" stroke-width="5"/><path d="M24 22c-6 2-9 8-8 14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  num:t=>`<svg viewBox="0 0 110 110"><circle cx="55" cy="55" r="48" fill="#FFE066" stroke="#111" stroke-width="5"/><text x="55" y="74" text-anchor="middle" font-family="Nunito, sans-serif" font-size="52" font-weight="900" fill="#111">${t}</text></svg>`,
  aid:()=>`<svg viewBox="0 0 120 60"><g transform="rotate(-18 60 30)"><rect x="6" y="14" width="108" height="34" rx="17" fill="#F6C89F" stroke="#111" stroke-width="4"/><rect x="40" y="14" width="40" height="34" fill="#EBAF80" stroke="#111" stroke-width="4"/><g fill="#111"><circle cx="50" cy="24" r="2"/><circle cx="60" cy="24" r="2"/><circle cx="70" cy="24" r="2"/><circle cx="50" cy="38" r="2"/><circle cx="60" cy="38" r="2"/><circle cx="70" cy="38" r="2"/></g></g></svg>`,
  cross:()=>`<svg viewBox="0 0 90 90"><circle cx="45" cy="45" r="40" fill="#E62B1E" stroke="#fff" stroke-width="6"/><path d="M30 30l30 30M60 30L30 60" stroke="#fff" stroke-width="10" stroke-linecap="round"/></svg>`,
  rain:()=>`<svg viewBox="0 0 120 90"><path d="M30 56a20 20 0 0 1 4-40 28 28 0 0 1 52 6 18 18 0 0 1 4 34z" fill="#C9D2E8" stroke="#111" stroke-width="4"/><path d="M40 66l-5 12M60 66l-5 12M80 66l-5 12" stroke="#7FA2FF" stroke-width="5" stroke-linecap="round"/></svg>`};
const THUMB={
  'Loneliness':{hook:['Why we feel','LONELY'],fig:2,mood:'wow',ch:'Kurzgesagt',stk:STK.rain(),bg:'#141833',ray:'#3B4380'},
  'The gift and power of emotional courage':{hook:['Name it to','TAME IT'],fig:7,mood:'smile',ch:'TED',stk:STK.bubble('I feel…'),bg:'#2F5BFF',ray:'#5E83FF'},
  'The power of vulnerability':{hook:['Let them','SEE YOU'],fig:0,mood:'smile',ch:'TED',stk:STK.heart(),bg:'#FF5A36',ray:'#FF8A6B'},
  'What makes a good life?':{hook:['85-year','STUDY'],fig:5,mood:'wow',ch:'TED',stk:STK.num('85'),bg:'#13A36A',ray:'#45C98F'},
  'Why we all need to practice emotional first aid':{hook:['First aid for','FEELINGS'],fig:3,mood:'smile',ch:'TED',stk:STK.aid(),bg:'#F28C0F',ray:'#FFB04D'},
  '10 ways to have a better conversation':{hook:['Talk','BETTER'],fig:4,mood:'smile',ch:'TED',stk:STK.num('10'),bg:'#0A9BB0',ray:'#3CC4D6'},
  'Why you should talk to strangers':{hook:['Talk to','STRANGERS'],fig:6,mood:'wow',ch:'TED',stk:STK.bubble('HI!'),bg:'#7C4DFF',ray:'#A07CFF'},
  'How to speak so that people want to listen':{hook:['Stop','DOING THIS'],fig:1,mood:'wow',ch:'TED',stk:STK.cross(),bg:'#1B1F3B',ray:'#343A6B'},
  '5 ways to listen better':{hook:['Listen','BETTER'],fig:1,mood:'smile',ch:'TED',stk:STK.num('5'),bg:'#E8336E',ray:'#FF6E98'}};
function thumbArt(v){ const t=THUMB[v.t]||{hook:['',v.t],fig:'auri:happy',ch:'',bg:'#333',ray:'#555'};
  const fig = typeof t.fig==='number' ? avSVG(t.fig,200,{bare:true,mood:t.mood}) : auri(170,t.fig.split(':')[1]);
  return `<div class="thumb yt" style="--tb:${t.bg};--tr:${t.ray}" role="img" aria-label="Thumbnail: ${esc(v.t)}">
    <div class="rays"></div>
    <div class="fig ${typeof t.fig==='number'?'face':'dog'}">${fig}</div>
    ${t.stk?`<div class="stk">${t.stk}</div>`:''}
    <div class="hook"><span class="h1">${t.hook[0]}</span><span class="h2" style="font-size:${t.hook[1].length>8?8.6:t.hook[1].length>6?10.4:12.5}cqi">${t.hook[1]}</span></div>
    ${t.ch==='TED'?'<span class="tedbar">TED</span>':t.ch?`<span class="chan">${t.ch}</span>`:''}
    <span class="len">${v.dur||v.len.replace(' min',':00')}</span><span class="play" aria-hidden="true"></span></div>`; }
function vidCard(v){ return `<a class="vid" href="${v.url}" target="_blank" rel="noopener" data-vid>${thumbArt(v)}
  <div><span class="tag">${v.ph}</span><h3 style="margin-top:6px">${esc(v.t)}</h3><p class="small muted">${esc(v.by)}</p></div></a>`; }

const FEELS=[['happy','Happy'],['excited','Excited'],['content','Calm'],['curious','Curious'],['sad','Sad'],['worried','Worried'],['angry','Angry'],['sleepy_face','Tired']];
const FEEL_SAY={
  happy:["Yay, I love that! Good news grows when you share it. Tell one person what made today good.",'Share it with Kabir'],
  excited:["Ooh, tell me everything! Excitement is even better with company.",'Share it with Kabir'],
  content:["Calm days are lovely. A perfect time for an easy hello to an old friend.",'Say hi to Kabir'],
  curious:["Curious is a great feeling. Your clan has a meetup Thursday, maybe someone there is curious too?",null],
  sad:["Thank you for telling me. Sad is heavy to carry alone. Kabir felt this after his move too. Want to say hi?",'Say hi to Kabir'],
  worried:["That sounds like a lot. Worries get lighter when someone else holds one end. Kabir has been there.",'Talk to Kabir'],
  angry:["That's okay. Angry usually means something mattered to you. Want to talk it through with someone who gets it?",'Talk to Kabir'],
  sleepy_face:["Rest counts too. Use a freeze today, no guilt. I'll be right here tomorrow.",null]};

function maybeFeel(){ if(ui.feelAsked || ui.page!=='home') return; if(document.querySelector('.modal-bg')){ setTimeout(maybeFeel,800); return; } ui.feelAsked=true; openFeel(); }
function openFeel(){
  const reply=k=>`<div class="feelsay">${auri(76,['sad','worried','angry'].includes(k)?'love':(k==='sleepy_face'?'sleepy':'cheer'))}<div style="flex:1;text-align:left"><b>${FEEL_SAY[k][0]}</b></div></div>
    <div class="row" style="width:100%">${FEEL_SAY[k][1]?`<button class="btn gold" id="fReach" style="flex:1">${FEEL_SAY[k][1]}</button>`:''}<button class="btn line" id="fDone" style="flex:1">${FEEL_SAY[k][1]?'Not now':'Thanks, Milo'}</button></div>`;
  modal(`${auri(110,'curious','pop')}<span class="eyebrow">Daily check-in</span><h2 style="margin-top:-6px">How are you feeling right now, ${esc(first(S.name))}?</h2><p class="small muted">Just between you and Milo. Picking a word is the first step to feeling lighter.</p>
    <div class="feel feelpop">${FEELS.map(([k,t])=>`<button aria-pressed="${ui.mood===k}" data-mood="${k}">${moodIcon(k,52)}<span>${t}</span></button>`).join('')}</div>
    <div id="fOut" style="width:100%;display:flex;flex-direction:column;gap:12px"></div>
    <button class="link" id="fSkip">Skip for now</button>`,(m,c)=>{
      $('#fSkip',m).onclick=c;
      m.querySelectorAll('[data-mood]').forEach(b=>b.onclick=()=>{ const k=b.dataset.mood; ui.mood=k; S.lastMood=k; save(); m.querySelectorAll('[data-mood]').forEach(x=>x.setAttribute('aria-pressed',x===b));
        $('#fOut',m).innerHTML=reply(k); $('#fSkip',m).hidden=true;
        const r=$('#fReach',m); if(r) r.onclick=()=>{ c(); reachOut('Kabir Sethi'); };
        $('#fDone',m).onclick=()=>{ c(); toast('Milo is here whenever you need.'); };
        $('#fOut',m).scrollIntoView({block:'nearest',behavior:'smooth'}); });
    },'mc feelm');
}
function pageHome(){
  const p=PROG.week;
  const G=[['hi','Say hi to an old friend'],['clan','Join a clan'],['play','Play your first quest']];
  const guideDone=G.every(g=>S.guide.includes(g[0]));
  const cur=G.find(g=>!S.guide.includes(g[0]));
  $('#page').innerHTML=`
  ${S.welcomeHidden?'':`<section class="welcome" aria-labelledby="wH">
    <button class="wl-x" id="wlX" aria-label="Close Milo's welcome" title="Close">×</button>
    <div class="wl-milo">${auri(190,'hello','bob')}</div>
    <div class="wl-body">
      <h1 id="wH">${cur?`Hi ${esc(first(S.name))}! I'm Milo.`:`You're all set, ${esc(first(S.name))}!`}</h1>
      <p class="wl-lead">${cur?"Let's get you back to your people. Three small steps:":"Come back tomorrow for a new friend to say hi to."}</p>
      <ol class="wl-steps">${G.map(([k,t],i)=>{ const d=S.guide.includes(k), now=cur&&cur[0]===k; return `<li class="${d?'done':now?'now':''}"><span class="ws-n">${d?'✓':i+1}</span><span>${t}</span></li>`; }).join('')}</ol>
      <div class="row" style="gap:18px;flex-wrap:wrap;align-items:center">${cur?`<button class="btn gold lg" data-go="${cur[0]}">LESSSS GO →</button>`:`<button class="btn gold lg" data-go="play">Open Play</button>`}<button class="link" id="askMilo">Ask me anything</button></div>
    </div>
  </section>`}
  <section class="fetch" aria-labelledby="fetchH">
    <div class="fetch-head">
      <div class="fh-text">
        <span class="eyebrow fh-eye">${ui.nudge?'Milo noticed a heavy week':'Fetched by Milo'}</span>
        <h1 id="fetchH">Old friends who've been there</h1>
        <p class="fh-lead">${ui.nudge?'Late nights and a cancelled plan this week. ':''}These friends went through the same thing you're facing now. Pick one and say hi.</p>
      </div>
    </div>
    ${(()=>{ const f=FRIENDS[0], sent=has('reached',f[0]); return `<div class="feature">
      ${nameAv(f[0],80)}
      <div class="ft-body"><span class="ft-k">Best match</span><h2>${esc(f[0])}</h2><p class="ft-been">${esc(f[1])}, just like you.</p></div>
      <div class="ft-act"><button class="btn gold" data-reach="${esc(f[0])}">${sent?'Open chat':`Say hi to ${esc(first(f[0]))}`}</button><button class="link" data-user="${esc(f[0])}">View profile</button></div></div>`; })()}
    <div class="fr-head"><span class="fr-title">More friends who've been there <span class="muted">· ${FRIENDS.length-1}</span></span><div class="fr-nav"><button class="fr-arr" data-scr="-1" aria-label="Scroll left">‹</button><button class="fr-arr" data-scr="1" aria-label="Scroll right">›</button></div></div>
    <div class="fetch-row" id="frRow" aria-label="More old friends who've been there. Scroll sideways for more.">${FRIENDS.slice(1).map(f=>`<button class="fr" data-reach="${esc(f[0])}" aria-label="Say hi to ${esc(f[0])}">${nameAvRaw(f[0],56)}<b>${esc(first(f[0]))}</b><span>${esc(f[1])}</span><em>${has('reached',f[0])?'Open chat':'Say hi'} →</em></button>`).join('')}</div>
  </section>
  <section class="meetup" aria-labelledby="mtH">
    <div class="mt-art mt-date" aria-hidden="true"><span>DEC</span><b>1</b></div>
    <div class="mt-body">
      <span class="eyebrow mt-eye">Annual clan meetup · Sponsored by Socius</span>
      <h2 id="mtH">Koramangala Readers: Annual Clan Meetup</h2>
      <ul class="mt-list">
        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg><span>1st Dec, 8 AM to 10 AM</span></li>
        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg><span>Maybe Flipkart Office</span></li>
        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z"/></svg><span>Bring a description of the one product you loved the most</span></li>
      </ul>
      <div class="row" style="flex-wrap:wrap;gap:14px">
        <button class="btn ${S.rsvp?'line':'gold'}" id="rsvpBtn">${S.rsvp?'You\'re going ✓':'I\'m in!'}</button>
        <div class="mt-going"><div class="mt-avs">${['Ananya Desai','Meher Kaur','Nikhil Menon','Kabir Sethi'].map(n=>nameAvRaw(n,28)).join('')}</div><span class="small muted"><b style="color:var(--ink)">${38+(S.rsvp?1:0)}</b> going</span></div>
      </div>
    </div>
  </section>
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="sec-h"><h2>Play</h2><button class="link" data-to="play">See all levels</button></div>
    ${levelCard()}
  </section>
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="sec-h"><h2>Learn</h2><button class="link" data-to="blogs">All videos and reads</button></div>
    <div class="videos">${VIDEOS.slice(0,3).map(vidCard).join('')}</div>
  </section>`;
  wire($('#page'));
  const fc=$('#feelBtn'); if(fc) fc.onclick=openFeel;
  const gx=$('#guideX'); if(gx) gx.onclick=()=>{ S.guideHidden=true; save(); pageHome(); toast('Guide closed. Milo will cheer you on from Play.'); };
  $('#page').querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{ const k=b.dataset.go; if(k==='hi') openChat('Kabir Sethi'); else if(k==='clan') go('clans'); else go('play'); });
  const am=$('#askMilo'); if(am) am.onclick=()=>openDock('milo');
  const fr=$('#frRow'); $('#page').querySelectorAll('[data-scr]').forEach(b=>b.onclick=()=>{ const c=fr.querySelector('.fr'); fr.scrollBy({left:(+b.dataset.scr)*((c?c.offsetWidth:180)+12)*2,behavior:'smooth'}); });
  const wx=$('#wlX'); if(wx) wx.onclick=()=>{ S.welcomeHidden=true; save(); pageHome(); toast('Closed. Milo is still here: tap him at the bottom right anytime.'); };
  $('#rsvpBtn').onclick=()=>{ if(S.rsvp){ modal(`${auri(100,'sad')}<h2>Can't make it after all?</h2><p class="muted">No worries. We'll free up your spot for someone on the waitlist.</p><div class="row" style="width:100%"><button class="btn line" style="flex:1" id="no">Keep my spot</button><button class="btn" style="flex:1;background:var(--coral);color:#fff" id="yes">Cancel RSVP</button></div>`,(m,c)=>{ $('#no',m).onclick=c; $('#yes',m).onclick=()=>{ c(); S.rsvp=false; save(); pageHome(); toast('RSVP cancelled.'); }; },'mc'); return; }
    S.rsvp=true; S.gems+=20; save(); pageHome(); chrome(); modal(`${auri(150,'jump','pop')}<span class="eyebrow">You're on the list!</span><h2>See you on 1st Dec, ${esc(first(S.name))}!</h2><p class="muted">Bring a short description of the one product you loved the most. Milo will remind you the day before. +20 gems for showing up for your clan.</p><button class="btn gold" id="ok">Yay!</button>`,(m,c)=>{ $('#ok',m).onclick=c; },'mc'); };
  setTimeout(maybeFeel,700);
  const n=$('#nudgeNo'); if(n) n.onclick=()=>{ ui.nudge=false; pageHome(); toast("No worries. Milo will check in later."); };
  $('#playNext').onclick=playNext;
  $('#page').querySelectorAll('[data-vid]').forEach(a=>a.addEventListener('click',()=>{ markGuide('read'); }));
}

function nextTask(){ for(const l of LEVELS){ if(l.n<S.level) continue; const t=l.tasks.find(t=>!has('done',t[0])); if(t) return {l,t}; } return null; }
const XP_FOR={chat:40,meet:80,dm:20,auto:20,'':30};
function taskBtn(t){ const k=t[2]||''; const lbl={chat:'Start chat',meet:'Check in',dm:'Open chats',auto:''}[k]??'Mark done';
  return k==='auto'?'<span class="small muted">Happens in the chat</span>':`<button class="btn gold sm" data-task="${t[0]}" data-kind="${k}">${lbl}</button>`; }
function runTask(id,k){ if(k==='chat') startChat(); else if(k==='meet') checkIn(id); else if(k==='dm') openChat('Kabir Sethi'); else if(k==='auto') startChat();
  else modal(`${auri(110,'curious','pop')}<h2>Did you do it?</h2><p class="muted">${esc((LEVELS.flatMap(l=>l.tasks).find(t=>t[0]===id)||['',''])[1])}</p><div class="row" style="width:100%"><button class="btn line" style="flex:1" id="no">Not yet</button><button class="btn gold" style="flex:1" id="yes">Yes, done!</button></div>`,(m,c)=>{ $('#no',m).onclick=c; $('#yes',m).onclick=()=>{ c(); complete(id,30); }; },'mc'); }
const LV_ICO=['M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z', 'M21 12a8 8 0 0 1-11.5 7.2L4 21l1.6-4.6A8 8 0 1 1 21 12z', 'M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z', 'M9 8a3.5 3.5 0 1 0 0-.1M3 20c.8-3.5 3.3-5.5 6-5.5s5.2 2 6 5.5M17 9a2.5 2.5 0 1 0 0-.1M15 15c2.6 0 4.6 1.6 5.5 4.5', 'M7 11l5-5 5 5M12 6v12M5 18h14', 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z'];
const lvIcon=(i,c='currentColor')=>`<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${LV_ICO[i]}"/></svg>`;
function nextBar(){ return ''; }
function levelState(l){ const done=l.tasks.every(t=>has('done',t[0])); return done?'done':l.n===S.level?'now':l.n>S.level?'locked':'done'; }
function pathHTML(){ const all=LEVELS.every(l=>levelState(l)==='done'); const cur=LEVELS.findIndex(l=>levelState(l)==='now');
  const pct=Math.round(((all?6:Math.max(0,cur))/6)*100);
  return `<div class="hpath" style="--fill:${pct}%"><div class="hp-line" aria-hidden="true"><i></i></div>${LEVELS.map((l,i)=>{ const st=levelState(l), d=l.tasks.filter(t=>has('done',t[0])).length;
    return `<div class="hnode ${st}"><button class="hbtn" data-lv="${l.n}" aria-label="Level ${l.n}: ${esc(l.title)} (${st==='now'?'current':st==='done'?'done':'locked'})">${st==='done'?'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>':st==='locked'?'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9AA0B8" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>':lvIcon(i,'#3A2400')}</button>${st==='now'?'<span class="hstart">START</span>':''}
      <small>Level ${l.n}${st==='now'?` · ${d}/${l.tasks.length}`:''}</small><b>${esc(l.title)}</b><span>${esc(l.blurb)}</span></div>`; }).join('')}
    <div class="hnode trophy ${all?'done':'locked'}"><div class="hbtn" aria-hidden="true">${lvIcon(5,all?'#fff':'#9AA0B8')}</div><small>Goal</small><b>Socius host</b><span>Finish all 6</span></div></div>`; }
function questSheet(n){ const l=LEVELS[n-1], st=levelState(l);
  if(st==='locked'){ toast(`Finish Level ${n-1} first.`); return; }
  if(st==='done'){ toast(`Level ${n} done. Nice!`); return; }
  modal(`<span class="eyebrow">Level ${l.n} · ${l.kind}</span><h2 style="font-size:30px">${esc(l.title)}</h2><p class="muted" style="font-size:18px">${esc(l.blurb)}</p>
    <div class="qlist">${l.tasks.map(t=>{ const d=has('done',t[0]); return `<div class="qrow ${d?'done':''}"><span class="qchk">${d?'✓':''}</span><span class="qt">${esc(t[1])}</span><em class="xp">+${XP_FOR[t[2]||'']} XP</em>${d?'':(t[2]==='auto'?'<span class="small muted">in the chat</span>':`<button class="btn gold sm" data-q="${t[0]}" data-k="${t[2]||''}">Go</button>`)}</div>`; }).join('')}</div>
    <button class="btn line" id="qx" style="width:100%">Close</button>`,(m,c)=>{ $('#qx',m).onclick=c; m.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{ c(); runTask(b.dataset.q,b.dataset.k); }); },'mc'); }
function playEnd(){ return `<section class="pend"><h2>You finished every level!</h2><p class="muted">Keep showing up for your people.</p>
  <div class="pend-acts"><button class="btn gold lg" data-pe="home">Go to Home</button><button class="btn line lg" data-pe="clans">Explore clans</button><button class="btn line lg" data-pe="blogs">Learn something</button><button class="btn line lg" data-pe="invite">Invite a friend</button></div></section>`; }
function wirePlay(){ const P=$('#page');
  P.querySelectorAll('[data-econ]').forEach(b=>b.onclick=openEcon);
  P.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>questSheet(+b.dataset.lv));
  P.querySelectorAll('[data-task]').forEach(b=>b.onclick=()=>runTask(b.dataset.task,b.dataset.kind));
  P.querySelectorAll('[data-pe]').forEach(b=>b.onclick=()=>{ const k=b.dataset.pe; if(k==='invite') doTip('invite'); else go(k); }); }
function refreshPlay(){ if(ui.page!=='play') return; if(!document.querySelector('#chatArea .chatwrap')){ pagePlay(); return; }
  const pb=$('#pathBox'); if(pb) pb.innerHTML=pathHTML(); const ih=$('#playIntro'); if(ih) ih.outerHTML=playIntro(); wirePlay(); }
function playIntro(){ const lv=LEVELS[S.level-1], d=lv.tasks.filter(t=>has('done',t[0])).length, n=nextTask();
  return `<section class="pintro" id="playIntro">
    <div class="pi-txt"><span class="eyebrow">Play</span><h1>Real-life quests</h1><p class="pi-lead">Do small things with real people. Earn XP. Level up.</p>
      <div class="pi-how"><span>${starIcon(22)} Finish quests</span><span>${gemIcon(22)} Earn gems</span><span>${boltIcon(22)} Uses a little energy</span></div></div>
    <div class="pi-card"><div class="lv-badge"><small>LEVEL</small><b>${lv.n}</b></div><div style="min-width:0;flex:1"><b class="lv-name">${esc(lv.title)}</b>
      <div class="lv-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${lv.tasks.length}" aria-valuenow="${d}"><i style="width:${Math.round(d/lv.tasks.length*100)}%"></i></div>
      <span class="small muted">${d} of ${lv.tasks.length} quests done</span></div>
      ${n?`<button class="btn gold lg pi-go" data-task="${n.t[2]==='auto'?'l2a':n.t[0]}" data-kind="${n.t[2]==='auto'?'chat':(n.t[2]||'')}">Start: ${esc(n.t[2]==='auto'?'Chat with Ananya':n.t[1])}</button>`:`<button class="btn gold lg pi-go" data-pe="home">Go to Home</button>`}</div>
  </section>`; }
function pagePlay(){ const all=!nextTask();
  $('#page').innerHTML=`${playIntro()}
    <section aria-label="Your path"><div class="sec-h"><h2>Your path</h2><button class="link" data-econ>How XP works</button></div><div id="pathBox">${pathHTML()}</div></section>
    ${all?playEnd():''}`;
  wirePlay();
}

function openEcon(){ const left=Math.max(0,S.goal-S.todayMin), lv=LEVELS[S.level-1];
  modal(`<h2>How Socius works</h2>
    <div class="econ">
      <div>${gemIcon(30)}<div><b>Gems · ${S.gems}</b><p>Earned only when a real person replies or you meet up, never for talking to Milo. Use them to save your streak on a day you miss: 10 gems the first time, then 20, 40, 80… doubling each time. You can also spend them on treats at clan meetups.</p></div></div>
      <div>${starIcon(30)}<div><b>XP · ${S.xp}</b><p>Your experience on Socius. Early quests give a little XP; bigger steps like meetups give more. It builds your level and profile. You're on Level ${lv.n}: ${lv.title}.</p></div></div>
      <div>${boltIcon(30)}<div><b>Energy · ${left} of ${S.goal} min left</b><p>The time you chose to give your people each day. Every chat uses a little. When it runs out, you're done for today. It refills tomorrow.</p></div></div>
    </div>
    <button class="btn gold" id="ok" style="width:100%">Got it</button>`,(m,c)=>{ $('#ok',m).onclick=c; },'mc'); }
function rewardFloat(xp,gems,mins){ const sb=$('#statbar'); if(!sb) return; const f=document.createElement('div'); f.className='rfloat'; f.innerHTML=`<span>+${xp} XP</span><span>+${gems} gems</span><span>−${mins} min energy</span>`; sb.appendChild(f); sb.classList.add('bump'); setTimeout(()=>{ f.remove(); sb.classList.remove('bump'); },2400); }
function complete(id,xp){ if(has('done',id)) return; S.done.push(id); S.xp+=xp; S.gems+=Math.round(xp/2); S.todayMin=Math.min(S.todayMin+5, 60); setTimeout(()=>rewardFloat(xp,Math.round(xp/2),5),50);
  const name=(LEVELS.flatMap(l=>l.tasks).find(t=>t[0]===id)||['',''])[1]; const lv=LEVELS[S.level-1];
  if(lv.tasks.every(t=>has('done',t[0])) && S.level<6){ document.querySelectorAll('.ttoast').forEach(x=>x.remove()); S.level++; save(); chrome(); const nl=LEVELS[S.level-1];
    S.gems+=100; modal(`<div class="lvlup"><span class="lu-burst" aria-hidden="true"></span>${auri(150,'cheer','pop')}</div><div class="lu-title">Hurray! Level up!</div><h2>Level ${nl.n}: ${nl.title}</h2><p class="muted">Level ${lv.n} complete · +100 bonus gems</p><div class="nextup"><span class="eyebrow">Next up</span><b>${esc(nl.tasks[0][1])}</b></div><div class="row" style="width:100%"><button class="btn line" id="later" style="flex:1">Later</button><button class="btn gold" id="ok" style="flex:1">LESSSS GO →</button></div>`,(m,c)=>{ $('#later',m).onclick=()=>{ c(); refreshPlay(); }; $('#ok',m).onclick=()=>{ c(); go('play'); setTimeout(()=>runTask(nl.tasks[0][0],nl.tasks[0][2]||''),80); }; },'mc'); }
  else if(lv.tasks.every(t=>has('done',t[0])) && S.level===6){ save(); chrome(); modal(`${auri(160,'jump','pop')}<h2>All 6 levels done!</h2><p class="muted">You went from hello to host.</p><button class="btn gold" id="ok">See what's next</button>`,(m,c)=>{ $('#ok',m).onclick=()=>{ c(); go('play'); }; },'mc'); }
  else { save(); chrome(); const n=nextTask(); taskToast(name,xp,n); }
  refreshPlay(); }
function taskToast(name,xp,n){ document.querySelectorAll('.ttoast').forEach(x=>x.remove()); const t=document.createElement('div'); t.className='ttoast'; t.setAttribute('role','status');
  t.innerHTML=`<span class="tt-ic">✓</span><div style="flex:1;min-width:0"><b>Done: ${esc(name)}</b><div class="small">+${xp} XP · +${Math.round(xp/2)} gems${n?` · Next: ${esc(n.t[1])}`:''}</div></div>${n?'<button class="lgo sm" id="ttGo">GO →</button>':''}`;
  document.body.appendChild(t); const g=t.querySelector('#ttGo'); if(g) g.onclick=()=>{ t.remove(); if(ui.page!=='play') go('play'); setTimeout(()=>runTask(n.t[0],n.t[2]||''),60); }; setTimeout(()=>t.remove(),6000); }
function checkIn(id){
  modal(`<span class="eyebrow">Group meetup</span><h2>Thursday book club</h2><p class="muted">7:00 pm · Koramangala 5th Block · 9 going, including Ananya</p>
    <div class="tintcard small">Tap check in once you're there. Meetups count the most, because friendships grow in the hours you spend together.</div>
    <div class="row"><button class="btn gold" id="ci" style="flex:1">I'm here!</button><button class="btn line" id="cx">Not yet</button></div>`,(m,close)=>{
    $('#cx',m).onclick=close;
    $('#ci',m).onclick=()=>{ close(); complete(id,80); setTimeout(()=>modal(`${auri(150,'jump','pop')}<span class="eyebrow">Surprise!</span><h2>Filter coffee is on the clan tonight</h2><p class="muted">Show this at the counter. We never announce these in advance.</p><button class="btn gold" id="ok">Aww, thanks Milo</button>`,(mm,c)=>{$('#ok',mm).onclick=c;},'mc'),600); go(ui.page); };
  });
}
const THEM=["Hey! Saw you joined Koramangala Readers. What are you reading these days?","Oh nice, I loved that one! The bit about small habits stuck with me. Are you coming Thursday?","Same here. I moved to Bengaluru last year and the club is how I met most of my friends. See you there!"];
let step=0, mine=0;
function startChat(){ ui.questOn=true; ui.chatWith='__quest'; if(ui.page!=='chats') go('chats'); else pageChats(); questRender(); }
function questRender(){ step=0; mine=0; tTyping=false; tPending=false; if(!$('#chatArea')) return;
  $('#chatArea').innerHTML=`<div class="qstart" role="status"><span class="qs-badge">QUEST STARTED</span><b>Chat with Ananya</b><span class="xp">+40 XP</span></div>
  <div class="chatwrap">
    <div class="card"><div class="row">${nameAv('Ananya Desai',48)}<div><b style="font-size:19px">Ananya</b><div class="small muted"><span id="ananyaSt">Online</span> · ${MY_CLAN}</div></div></div>
      <ol class="qsteps"><li id="qs1">Say hi</li><li id="qs2" class="${has('done','l2b')?'ok':''}">Ask one question</li><li id="qs3">Finish the chat</li></ol>
      <div class="chatlog" id="log" aria-live="polite"><div class="msg sys">You both love books and are free on Thursdays.</div></div>
      <form class="composer" id="comp"><input id="cin" autocomplete="off" placeholder="Say hi to Ananya…" aria-label="Message"><button class="btn sm" type="submit">Send</button></form>
      <button class="btn line finish" id="endChat">Finish chat</button></div>
    <div class="tintcard" style="display:flex;flex-direction:column;gap:10px"><div class="row">${ICO.idea}<span class="eyebrow">Ideas for you</span></div>
      <div class="opts" role="group" aria-label="Agent options"><button class="opt" data-opt="start" aria-pressed="true">Starters</button><button class="opt" data-opt="common" aria-pressed="false">In common</button><button class="opt" data-opt="brief" aria-pressed="false">Event brief</button><button class="opt" data-opt="practice" aria-pressed="false">Practice run</button></div>
      <div class="suggest" id="help"></div><p class="small muted">Just ideas. You always write and send the message yourself.</p></div></div>`;
  them(); help('start'); markGuide('play');
  setTimeout(()=>{ $('#cin')&&$('#cin').focus({preventScroll:true}); },200); buzz(15); toast('Quest started! Say hi to Ananya.');
  $('#endChat').onclick=endChat;
  document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{ document.querySelectorAll('[data-opt]').forEach(x=>x.setAttribute('aria-pressed',x===b)); help(b.dataset.opt); });
  $('#comp').onsubmit=e=>{ e.preventDefault(); const v=$('#cin').value.trim(); if(!v) return; add('me',v); buzz(8); $('#cin').value=''; mine++;
    const q1=$('#qs1'); if(q1&&!q1.classList.contains('ok')){ q1.classList.add('ok'); }
    if(v.includes('?') && mine>1 && !has('done','l2b')){ complete('l2b',20); const q2=$('#qs2'); if(q2) q2.classList.add('ok'); }
    if(step<THEM.length) setTimeout(them,1100); };
}
function add(who,t){ const l=$('#log'); if(!l) return; const d=document.createElement('div'); d.className='msg '+who; d.textContent=t; l.appendChild(d); l.scrollTop=l.scrollHeight; }
let tTyping=false, tPending=false;
function them(){ if(tTyping){ tPending=true; return; } if(step>=THEM.length) return; tTyping=true; const t=THEM[step++]; const l=$('#log'); if(!l){ tTyping=false; return; } const ty=document.createElement('div'); ty.className='msg them typing-msg'; ty.innerHTML='<span class="typing"><span></span><span></span><span></span></span>'; l.appendChild(ty); l.scrollTop=l.scrollHeight;
  const hd=$('#ananyaSt'); if(hd) hd.textContent='typing…';
  setTimeout(()=>{ ty.remove(); add('them',t); buzz([10,40,10]); if(hd) hd.textContent='Online'; tTyping=false; if(step>=THEM.length) endHint(); if(tPending){ tPending=false; setTimeout(them,900); } }, Math.min(3800,Math.max(1400,t.length*40))); }
function endHint(){ setTimeout(()=>{ add('sys','Nice chat! Tap Finish to collect your XP.'); const ec=$('#endChat'); if(ec){ ec.textContent='Finish chat · collect +40 XP'; ec.classList.add('pulse','gold'); ec.classList.remove('line'); ec.scrollIntoView({behavior:'smooth',block:'center'}); } },900); }
function help(k){
  const H={start:['Right now Atomic Habits. You?','What made you join the club?',"What's the best book you read this year?"],common:['You both moved to Bengaluru for work','You both picked Books and Running','You are both free on Thursday evenings'],brief:['Thursday 7 pm, Koramangala 5th Block. This month: Atomic Habits. About 9 people, mostly first-timers. Chai provided!'],practice:['Want to rehearse your opener with me first? Nothing here is sent to Ananya.']}[k];
  const h=$('#help'); h.innerHTML=H.map(s=>k==='start'?`<button data-fill="${esc(s)}">${esc(s)}</button>`:`<div class="small">${esc(s)}</div>`).join('');
  h.querySelectorAll('[data-fill]').forEach(b=>b.onclick=()=>{ $('#cin').value=b.dataset.fill; $('#cin').focus(); });
}
function endChat(){ const xp=mine?40:10;
  modal(`${auri(140,'cheer','pop')}<h2>That was lovely! +${xp} XP</h2>
    <div class="tintcard small" style="text-align:left"><b>Private, never a score.</b> Ananya just gets one gentle question: "Would you like to chat again?" It only helps us find better matches for you both.</div>
    <span class="eyebrow">Milo's tips for next time</span>
    <div class="card small" style="text-align:left">When Ananya said the club is how she met her friends, you could have asked: <i>"How did you get past the awkward first meetup?"</i> Follow-up questions make people feel heard.</div>
    <div class="card small" style="text-align:left">Sharing one small detail about yourself invites her to share back.</div>
    <div class="row" style="width:100%"><button class="btn line" id="rp" style="flex:1">Practise with Milo</button><button class="btn gold" id="dn" style="flex:1">Done</button></div>`,(m,close)=>{
    $('#rp',m).onclick=()=>{ close(); toast('Practice mode: just you and Milo. Nothing is sent.'); };
    $('#dn',m).onclick=()=>{ close(); ui.questOn=false; ui.chatWith=null; complete('l2a',xp); go('play'); };
  },'mc');
}
function reachOut(name){
  const f=FRIENDS.find(x=>x[0]===name)||[name,'An old friend','a while ago'], fn=first(name);
  const st=[`Hey ${fn}! I just moved to Bengaluru for my first job and remembered you did the same. How did your first month go?`,`${fn}, something today reminded me of our college days. How have you been?`,`Hi ${fn}, it's been too long! Got 10 minutes for a call this week?`];
  modal(`<div class="row">${nameAv(name,54)}<div><h2>${esc(name)}</h2><p class="small muted">${esc(f[1])} · last talked ${esc(f[2])}</p></div></div>
    <div class="tintcard small"><b>How this works:</b> ${esc(fn)} gets a gentle request first. If they say yes, your message goes through. If not, nobody is told. <b>Gems and XP come only when ${esc(fn)} replies.</b></div>
    <span class="eyebrow">A few ways to start</span><div class="suggest">${st.map((s,i)=>`<button data-st="${i}">${esc(s)}</button>`).join('')}</div>
    <label class="small muted" for="rm">Your message, in your own words</label>
    <textarea id="rm" rows="3" style="width:100%;border:1.5px solid var(--line);border-radius:12px;padding:10px"></textarea>
    <div class="row"><button class="btn gold" id="sr" style="flex:1">Send with love</button><button class="btn line" id="cr">Cancel</button></div>`,(m,close)=>{
    m.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{ $('#rm',m).value=st[+b.dataset.st]; });
    $('#cr',m).onclick=close;
    $('#sr',m).onclick=()=>{ const firstTime=!has('reached',name); if(firstTime) S.reached.push(name); markGuide('hi'); save(); close(); go(ui.page); toast(`Sent! Gems unlock when ${fn} replies.`);
      if(firstTime) setTimeout(()=>{ S.gems+=10; S.xp+=10; save(); chrome(); toast(`${fn} replied! A real conversation started: +10 gems, +10 XP`); },7000); };
  });
}

const MEMBERS=[
  ['Ananya Desai','Host',6,'Since 2039'],['Meher Kaur','Host',5,'Since 2039'],['Nikhil Menon','',4,'Since March'],['Aarav Sharma','You',2,'Since July'],
  ['Sana Qureshi','',4,'Since May'],['Rahul Verma','',3,'Since June'],['Isha Kapoor','New',1,'This week'],['Dev Malhotra','',3,'Since April'],
  ['Kavya Rao','',2,'Since August'],['Omar Siddiqui','New',1,'This week'],['Lakshmi Nair','',5,'Since 2039'],['Yash Agarwal','',2,'Since September']];
const CLAN_INFO={'Koramangala Readers':['Books','Thursdays, 7 pm'],'Indiranagar Readers':['Books','Saturdays, 11 am'],'HSR Run Crew':['Running','Sundays, 6 am'],'BTM Startup Chai':['Startups','Fridays, 7 pm'],'Jayanagar Chess Collective':['Chess','Wednesdays, 8 pm'],'Cubbon Park Sketchers':['Sketching','Sundays, 9 am'],'Malleshwaram Music Room':['Music','Saturdays, 6 pm'],'Whitefield Design Circle':['Design','Tuesdays, 7 pm']};
function clanChooser(){
  const mine=S.interests.concat(S.extra||[]);
  const all=CLANS.week.filter(c=>CLAN_INFO[c[0]]);
  const sug=all.filter(c=>mine.includes(c[1])).concat(all.filter(c=>!mine.includes(c[1]))).slice(0,6);
  $('#page').innerHTML=`<section class="cl-intro"><span class="eyebrow">Clans</span><h1>Find your local crew</h1>
      <p class="lead2">A clan is a small group near you that meets up around something you love.</p>
      <ul class="cl-pts"><li>Meet every week</li><li>Climb the city board together</li><li>Nobody is ever rated</li></ul></section>
    <div class="sec-h"><h2>Suggested for you</h2><button class="btn line" id="mkClan">+ Create your own</button></div>
    <div class="cl-grid">${sug.map(c=>{ const [k,when]=CLAN_INFO[c[0]]; const match=mine.includes(k); return `<div class="cl-card">
      <div class="cl-ic">${ICO.book}</div><b>${esc(c[0])}</b><span class="small muted">${k} · ${c[3]} members</span><span class="small muted">${when}</span>
      ${match?`<span class="tag leaf" style="align-self:flex-start">Matches your interests</span>`:''}
      <button class="btn ${match?'gold':'line'} sm" data-join="${esc(c[0])}">Join</button></div>`; }).join('')}</div>`;
  $('#page').querySelectorAll('[data-join]').forEach(b=>b.onclick=()=>joinClan(b.dataset.join));
  $('#mkClan').onclick=createClan;
}
function joinClan(name,custom){ markGuide('clan'); S.clan={name,custom:!!custom,...(custom||{})}; S.clanChosen=true; MY_CLAN=name; save(); chrome(); ui.clanView='mine'; pageClans(); window.scrollTo(0,0); toast(`Welcome to ${name}!`); }
function createClan(){
  modal(`<h2>Create your clan</h2>
    <form id="ccF" style="width:100%;display:flex;flex-direction:column;gap:12px;text-align:left" novalidate>
      <div class="field"><label for="ccN" class="small" style="font-weight:700">Clan name</label><input id="ccN" placeholder="e.g. HSR Board Gamers" maxlength="40"></div>
      <div class="field"><label for="ccI" class="small" style="font-weight:700">What you'll do together</label><select id="ccI">${INTERESTS.map(i=>`<option>${i}</option>`).join('')}</select></div>
      <div class="row" style="gap:10px"><div class="field" style="flex:1"><label for="ccA" class="small" style="font-weight:700">Area</label><input id="ccA" placeholder="e.g. HSR Layout"></div>
        <div class="field" style="flex:1"><label for="ccD" class="small" style="font-weight:700">Meets on</label><select id="ccD">${['Weekdays, evening','Saturdays','Sundays'].map(d=>`<option>${d}</option>`).join('')}</select></div></div>
      <p class="err small" id="ccE" hidden role="alert"></p>
      <div class="row" style="gap:10px"><button type="button" class="btn line" id="ccX" style="flex:1">Cancel</button><button class="btn gold" style="flex:1">Create clan</button></div></form>`,(m,c)=>{
    $('#ccX',m).onclick=c;
    $('#ccF',m).onsubmit=e=>{ e.preventDefault(); const n=$('#ccN',m).value.trim(), area=$('#ccA',m).value.trim(); if(n.length<3){ const er=$('#ccE',m); er.textContent='Give your clan a name (3 letters or more).'; er.hidden=false; $('#ccN',m).focus(); return; }
      c(); joinClan(n,{interest:$('#ccI',m).value,area:area||'Bengaluru',when:$('#ccD',m).value}); };
    setTimeout(()=>$('#ccN',m).focus(),50); },'mc');
}
function evBtn(k){ S.ev=S.ev||{}; return S.ev[k]?`<button class="btn sm line" data-ev="${k}">Going ✓</button>`:`<button class="btn sm gold" data-ev="${k}">Count me in</button>`; }
const EVENTS={thu:['Thursday book club','Thu, 7 pm · Koramangala 5th Block',9],sun:['Sunday reading in the park','Sun, 8 am · Agara Lake',5]};
function onEv(k){ S.ev=S.ev||{}; const e=EVENTS[k];
  if(!S.ev[k]){ S.ev[k]=true; save(); pageClans(); toast(`You're going to ${e[0]}!`); return; }
  modal(`<h2>You're going</h2><p class="muted">${e[0]} · ${e[1]}</p>
    <div class="row" style="width:100%;gap:10px"><button class="btn line" id="evC" style="flex:1">Cancel RSVP</button><button class="btn gold" id="evK" style="flex:1">Keep my spot</button></div>`,(m,c)=>{
      $('#evK',m).onclick=c; $('#evC',m).onclick=()=>{ c(); S.ev[k]=false; save(); pageClans(); toast('RSVP cancelled. Your spot is free for someone else.'); }; },'mc'); }
function pageClans(){
  if(!S.clanChosen) return clanChooser();
  const custom=S.clan&&S.clan.custom;
  const menu=`<div class="dropdown"><button class="btn gold sm" id="lbBtn" aria-haspopup="true" aria-expanded="false">Leaderboards <span aria-hidden="true">▾</span></button>
    <div class="menu" id="lbMenu" hidden role="menu"><button role="menuitem" data-cv="city" aria-current="${ui.clanView==='city'}">City clans leaderboard</button><button role="menuitem" data-cv="mine" aria-current="${ui.clanView!=='city'}">My clan: ${MY_CLAN}</button><button role="menuitem" id="switchClan">Switch clan</button></div></div>`;
  if(ui.clanView==='city') return clansCity(menu);
  const q=(ui.memberQ||'').toLowerCase();
  const mem=(custom?[[S.name,'You',0,'Founder']]:MEMBERS).filter(m=>m[0].toLowerCase().includes(q));
  $('#page').innerHTML=`<div class="between"><div><span class="eyebrow">Your clan</span><h1 style="font-size:34px;margin-top:4px">${MY_CLAN}</h1></div>${menu}</div>
    <section class="clanhero"><div class="clanbadge">${ICO.book}</div>
      <div><b style="font-family:var(--display);font-size:22px">${custom?`A ${esc(S.clan.interest.toLowerCase())} clan in ${esc(S.clan.area)}`:`A ${(CLAN_INFO[MY_CLAN]||['books'])[0].toLowerCase()} clan in Bengaluru`}</b><p class="muted" style="margin-top:4px">${custom?`Just you so far · ${esc(S.clan.when)}`:`${(CLANS.week.find(c=>c[0]===MY_CLAN)||[0,0,0,57])[3]} members · ${(CLAN_INFO[MY_CLAN]||['','Thursdays, 7 pm'])[1]}`}</p>
        ${custom?'':`<div class="row" style="margin-top:12px;flex-wrap:wrap"><span class="tag gold">#4 in Bengaluru this week</span><span class="tag leaf">2.6 meetups per member</span></div>`}</div>
      <button class="btn gold" data-cv-btn="city">See where we stand</button></section>
    <section class="twocol">
      ${custom?`<div class="plainsec"><div class="sec-h"><h2>Getting started</h2></div><p class="small muted">Invite 3 friends to appear on the city board.</p></div>`:''}<div class="plainsec" ${custom?'hidden':''}><div class="sec-h"><h2>Who we've topped</h2><span class="small muted">This week</span></div>
        <p class="small muted" style="margin-top:4px">Your clan climbed from #6 to #4. Look at that!</p>
        <div class="topped" style="margin-top:10px"><div>${ICO.up} We moved past Malleshwaram Music Room</div><div>${ICO.up} We moved past Cubbon Park Sketchers</div></div>
        <p class="small muted" style="margin-top:10px">Next up: Jayanagar Chess Collective, just 0.3 meetups per member ahead.</p></div>
      <div class="plainsec"><div class="sec-h"><h2>Coming up</h2><span class="small muted">Clan meetups</span></div>
        ${custom?`<div class="li"><div><b>No meetups yet</b><div class="small muted">Invite friends, then plan your first one.</div></div><button class="btn sm gold" id="invClan">Invite friends</button></div>`:Object.entries(EVENTS).map(([k,e])=>`<div class="li"><div><b>${e[0]}</b><div class="small muted">${e[1]} · ${e[2]+((S.ev||{})[k]?1:0)} going</div></div>${evBtn(k)}</div>`).join('')}
        <div class="li"><div><b>Clan goal this week</b><div class="small muted">120 of 150 meetups across the clan</div><div class="citybar" style="width:220px"><i style="width:80%"></i></div></div></div></div>
    </section>
    <section class="card"><div class="sec-h"><h2>Members <span class="muted" style="font-size:16px">(${custom?1:(CLANS.week.find(c=>c[0]===MY_CLAN)||[0,0,0,57])[3]})</span></h2>
      <input id="memQ" placeholder="Search members" value="${esc(ui.memberQ||'')}" style="border:1.5px solid var(--line);border-radius:12px;padding:8px 12px;min-width:0;width:220px"></div>
      <div style="margin-top:8px">${mem.map(m=>`<div class="member">${nameAv(m[0],42)}<div style="min-width:0"><b>${m[0]}</b> ${m[1]?`<span class="tag ${m[1]==='You'?'gold':m[1]==='New'?'leaf':''}">${m[1]}</span>`:''}<div class="small muted">${m[3]}</div></div>
        <span class="small muted mm">${m[2]} meetup${m[2]===1?'':'s'} this month</span>
        ${m[1]==='You'?'<span></span>':followBtn(m[0])}</div>`).join('')||'<p class="muted">No one by that name yet.</p>'}</div>
      <p class="small muted" style="margin-top:10px">${custom?'Invite friends to grow your clan.':`Showing ${mem.length} members. Nobody is ever rated.`}</p></section>`;
  wireClanMenu();
  $('#page').querySelectorAll('[data-cv-btn]').forEach(b=>b.onclick=()=>setClanView('city'));
  $('#page').querySelectorAll('[data-ev]').forEach(b=>b.onclick=()=>onEv(b.dataset.ev));
  const ic=$('#invClan'); if(ic) ic.onclick=()=>doTip('invite');
  const sw=$('#switchClan'); if(sw) sw.onclick=()=>{ S.clanChosen=false; save(); pageClans(); };
  const mq=$('#memQ'); mq.oninput=()=>{ ui.memberQ=mq.value; const pos=mq.selectionStart; pageClans(); const n=$('#memQ'); n.focus(); n.setSelectionRange(pos,pos); };
}
function wireClanMenu(){
  const b=$('#lbBtn'), m=$('#lbMenu');
  b.onclick=e=>{ e.stopPropagation(); m.hidden=!m.hidden; b.setAttribute('aria-expanded',!m.hidden); };
  m.querySelectorAll('[data-cv]').forEach(x=>x.onclick=()=>setClanView(x.dataset.cv));
  document.addEventListener('click',()=>{ if(m) m.hidden=true; },{once:true});
}
function clansCity(menu){
  const list=CLANS[ui.board], me=list.findIndex(c=>c[0]===MY_CLAN);
  $('#page').innerHTML=`<div class="between"><div><button class="backbtn" id="backClan"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>Back to my clan</button><span class="eyebrow" style="display:block;margin-top:6px">Bengaluru · 54 clans</span><h1 style="font-size:34px;margin-top:4px">City clans leaderboard</h1>
    <p class="muted" style="margin-top:6px;max-width:62ch">Ranked by meetups per member. No battles.</p></div>
    <div class="row">${menu}</div></div>
    <div class="seg" role="tablist" style="align-self:flex-start"><button role="tab" aria-selected="${ui.board==='week'}" data-b="week">This week</button><button role="tab" aria-selected="${ui.board==='month'}" data-b="month">This month</button></div>
    <div class="card"><div class="between"><b>City goal</b><span class="small muted">412 of 500 meetups</span></div><div class="citybar"><i style="width:82%"></i></div><p class="small muted" style="margin-top:8px">Hit 500 and every clan gets a surprise.</p></div>
    <div class="card" style="padding:10px">${rankRows(list,10)}</div>
    <p class="small muted">Your clan is #${me+1}. Showing the top 10 of 54.</p>`;
  wireClanMenu();
  $('#backClan').onclick=()=>{ if(history.state&&history.state.cv==='city'&&history.length>1){ history.back(); } else setClanView('mine'); };
  $('#page').querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{ ui.board=b.dataset.b; pageClans(); });
}


const MOOD_LBL={happy:'Happy',excited:'Excited',content:'Calm',curious:'Curious',sad:'Sad',worried:'Worried',angry:'Angry',sleepy_face:'Tired'};
const MOOD_GOOD=['happy','excited','content','curious'];
function weekReflect(){
  const dl=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const log=['worried','sad','content','happy','worried','excited',ui.mood||'content'];
  const good=log.filter(m=>MOOD_GOOD.includes(m)).length, heavy=log.length-good;
  const wins=[['Said hi to 2 old friends','Both replied within a day.'],['Met your daily goal 5 of 6 days','One freeze used.'],['Showed up to Thursday book club','Your best day.']];
  const imp=[
    ['Reply a little sooner','Riya waited over a day.','Reply to Riya','chats',40],
    ['Weekends were quiet','0 moments on Sat and Sun.','See clan plans','clans',10],
    ['Ask one follow-up question','Most chats ended after 3 messages.','Practise in Play','play',55],
    ['Try someone new','Level 3 pairs you with someone different.','Go to Play','play',25]];
  return `<section class="reflect" aria-labelledby="rfH">
    <div class="between" style="align-items:flex-end;flex-wrap:wrap;gap:8px"><div><span class="eyebrow">Your week with Milo</span><h2 id="rfH" style="font-size:26px;margin-top:4px">How this week really went</h2></div><span class="small muted">20 to 26 Oct · only you see this</span></div>
    <div class="card rf-mood"><div class="between" style="flex-wrap:wrap;gap:8px"><b>How your mood has been lately</b><span class="small muted">From your check-ins with Milo</span></div>
      <div class="moodstrip">${log.map((m,i)=>`<div class="md ${MOOD_GOOD.includes(m)?'g':'h'}">${moodIcon(m,40)}<b class="small">${MOOD_LBL[m]}</b><span class="small muted">${dl[i]}</span></div>`).join('')}</div>
      <div class="moodbar" role="img" aria-label="${good} lighter days and ${heavy} heavier days"><i style="flex:${good}" class="g"></i><i style="flex:${heavy}" class="h"></i></div>
      <p class="small"><b>${good} lighter days, ${heavy} heavier ones.</b> Your mood lifted on days you met someone.</p></div>
    <div class="rf-grid">
      <div class="card"><b>What went well</b><ul class="rf-list">${wins.map(w=>`<li><span class="rf-ic ok">✓</span><div><b class="small">${w[0]}</b><div class="small muted">${w[1]}</div></div></li>`).join('')}</ul></div>
      <div class="card"><b>Areas to improve next week</b><ul class="rf-list">${imp.map(x=>`<li><span class="rf-ic up">↑</span><div style="flex:1;min-width:0"><b class="small">${x[0]}</b><div class="small muted">${x[1]}</div>
        <div class="rf-row"><div class="pbar" style="flex:1"><i style="width:${x[4]}%"></i></div><button class="lgo sm" data-go2="${x[3]}">LESSSS GO →</button></div></div></li>`).join('')}</ul></div>
    </div>
    <div class="card rf-goal"><div style="flex:1;min-width:0"><b>Milo's one focus for next week</b><p class="small" style="margin-top:4px">One weekend moment with a real person.</p></div><button class="lgo" data-go2="chats">LESSSS GO →</button></div>
  </section>`;
}
function pageProgress(){
  const p=PROG[ui.prog], max=Math.max(...p.bars.map(b=>b[1]),1), days=['met','met','frz','met','rep','met','today'], dl=['M','T','W','T','F','S','S'];
  $('#page').innerHTML=`<div class="between"><div><span class="eyebrow">Only you can see this</span><h1 style="font-size:34px;margin-top:4px">Your report</h1></div>
    <div class="seg" role="tablist">${['week','month','year'].map(r=>`<button role="tab" aria-selected="${ui.prog===r}" data-pr="${r}">${r==='week'?'This week':r==='month'?'This month':'This year'}</button>`).join('')}</div></div>
    <div class="twocol">
      <div class="card"><span class="eyebrow">${p.label}</span><div class="row" style="margin-top:6px;align-items:baseline"><b style="font-family:var(--display);font-size:52px;line-height:1">${p.moments}</b><span class="muted">moments with real people</span></div>
        <p class="small muted">Conversations and meetups with people, not with the AI. ${p.min} minutes in all.</p>
        <div class="bars" role="img" aria-label="Moments with people, ${p.label}">${p.bars.map(b=>`<div><span>${b[1]}</span><i class="${b[1]===max?'hi':''}" style="height:${Math.round(b[1]/max*78)}%"></i><span>${b[0]}</span></div>`).join('')}</div></div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="stats" style="grid-template-columns:1fr 1fr"><button class="stat statbtn" data-rep="conv"><div><b>${p.conv}</b><span class="small muted">Real conversations ›</span></div></button><button class="stat statbtn" data-rep="meet"><div><b>${p.meet}</b><span class="small muted">Meetups ›</span></div></button><button class="stat statbtn" data-rep="revived"><div><b>${p.revived}</b><span class="small muted">Friends reconnected ›</span></div></button><div class="stat"><div><b>${S.xp}</b><span class="small muted">XP · Level ${S.level}</span></div></div></div><p class="small muted">Tap a number to see who you talked to.</p>
        <div class="card"><div class="between"><b>Daily goal this week (${S.goal} min/day)</b><span class="small muted">5 of 6 so far</span></div>
          <div class="days" style="margin-top:10px">${days.map((d,i)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div class="dd ${d}" style="width:100%">${d==='met'?'✓':d==='frz'?'❄':d==='rep'?'↺':''}</div><span class="small muted">${dl[i]}</span></div>`).join('')}</div>
          <p class="small muted" style="margin-top:8px">✓ goal met · ❄ freeze used · ↺ made up the next day. A slow day never wipes your progress.</p></div></div></div>
    <div class="small row milonote">${ICO.idea}<div><b>A pattern worth keeping</b><p class="muted" style="margin-top:2px">You talk to more people in weeks with a Thursday meetup. Shall we keep Thursday evenings free for you?</p></div></div>
    ${weekReflect()}`;
  $('#page').querySelectorAll('[data-go2]').forEach(b=>b.onclick=()=>{ const k=b.dataset.go2; if(k==='chats') openChat('Riya Menon'); else go(k); });
  $('#page').querySelectorAll('[data-pr]').forEach(b=>b.onclick=()=>{ ui.prog=b.dataset.pr; pageProgress(); });
  $('#page').querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>openReport(b.dataset.rep));
}
const CONTACTS=[
  ['Kabir Sethi','You','Call','Sat',15],['Ananya Desai','Them','Chat','Fri',8],['Riya Menon','You','Voice note','Thu',4],['Meher Kaur','Them','Chat','Wed',6],
  ['Farhan Ali','You','Chat','12 Oct',5],['Sneha Iyer','Them','Call','11 Oct',20],['Nikhil Menon','You','Chat','10 Oct',7],['Sana Qureshi','Them','Chat','9 Oct',5],
  ['Aditya Rao','You','Voice note','7 Oct',3],['Lakshmi Nair','Them','Chat','6 Oct',9],['Tanvi Joshi','You','Chat','4 Oct',6],['Rahul Verma','Them','Call','3 Oct',12],
  ['Dev Malhotra','You','Chat','2 Oct',4],['Kavya Rao','Them','Chat','1 Oct',5]];
const MEETS=[['Thursday book club','Koramangala 5th Block','Thu',['Ananya Desai','Meher Kaur','Nikhil Menon']],['Sunday reading in the park','Agara Lake','12 Oct',['Lakshmi Nair','Sana Qureshi']],['Chai and chapters','Koramangala 6th Block','5 Oct',['Ananya Desai','Rahul Verma','Kavya Rao']],['Thursday book club','Koramangala 5th Block','2 Oct',['Meher Kaur','Dev Malhotra']]];
function openReport(kind){
  const p=PROG[ui.prog], n=kind==='conv'?p.conv:kind==='meet'?p.meet:p.revived;
  let tab='out';
  const talked=new Set(CONTACTS.slice(0,Math.min(p.conv,CONTACTS.length)).map(c=>c[0]));
  const notYet=FRIENDS.map(f=>f[0]).concat(MEMBERS.map(m=>m[0])).filter((x,i,a)=>a.indexOf(x)===i && !talked.has(x) && x!==S.name).slice(0,10);
  const title={conv:'Real conversations',meet:'Meetups',revived:'Friends reconnected'}[kind];
  const draw=(m)=>{
    const rows=CONTACTS.slice(0,Math.min(p.conv,CONTACTS.length));
    let body='';
    if(kind==='conv'){
      const list= tab==='out'?rows.filter(r=>r[1]==='You'): tab==='in'?rows.filter(r=>r[1]==='Them'):null;
      body = list ? list.map(r=>`<div class="contact">${nameAv(r[0],38)}<div><b class="small">${r[0]}</b><div class="small muted">${r[2]} · ${r[3]} · ${r[4]} min</div></div><span class="tag ${r[1]==='You'?'gold':'leaf'}">${r[1]==='You'?'You reached out':'They reached out'}</span></div>`).join('')||'<p class="muted small">Nothing here yet.</p>'
        : notYet.map(x=>`<div class="contact">${nameAv(x,38)}<div><b class="small">${x}</b><div class="small muted">Not in touch ${ui.prog==='week'?'this week':ui.prog==='month'?'this month':'this year'}</div></div><button class="btn sm gold" data-hi="${esc(x)}">Say hi</button></div>`).join('');
    } else if(kind==='meet'){
      body = MEETS.slice(0,n).map(e=>`<div class="contact"><div class="clanbadge" style="width:40px;height:40px;border-radius:12px">${ICO.meet}</div><div><b class="small">${e[0]}</b><div class="small muted">${e[1]} · ${e[2]} · with ${e[3].map(first).join(', ')}</div></div><span class="tag leaf">Checked in</span></div>`).join('');
    } else {
      body = S.reached.concat(['Kabir Sethi','Sneha Iyer','Riya Menon','Aditya Rao']).filter((x,i,a)=>a.indexOf(x)===i).slice(0,Math.max(n,S.reached.length)).map(x=>`<div class="contact">${nameAv(x,38)}<div><b class="small">${x}</b><div class="small muted">${(FRIENDS.find(f=>f[0]===x)||[0,'Old friend'])[1]}</div></div><span class="tag leaf">Back in touch</span></div>`).join('');
    }
    const counts={out:rows.filter(r=>r[1]==='You').length,in:rows.filter(r=>r[1]==='Them').length,no:notYet.length};
    m.innerHTML=`<div class="between" style="width:100%"><div><span class="eyebrow">${p.label}</span><h2>${n} ${title.toLowerCase()}</h2></div><button class="btn line sm" id="cl">Close</button></div>
      ${kind==='conv'?`<div class="seg" role="tablist"><button role="tab" aria-selected="${tab==='out'}" data-t="out">You reached out (${counts.out})</button><button role="tab" aria-selected="${tab==='in'}" data-t="in">They reached out (${counts.in})</button><button role="tab" aria-selected="${tab==='no'}" data-t="no">Not yet (${counts.no})</button></div>`:''}
      <div style="width:100%">${body}</div>
      ${ui.prog==='year'&&kind==='conv'?`<p class="small muted">Showing your 14 most recent of ${p.conv}.</p>`:''}
      <div class="tintcard small row" style="width:100%"><div style="flex:1"><b>Your contact list</b><p class="muted">Everyone you talked to and everyone you haven't yet, as a spreadsheet.</p></div><button class="btn gold sm" id="dl">Download list</button></div>`;
    $('#cl',m).onclick=()=>m.parentElement.remove();
    m.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ tab=b.dataset.t; draw(m); });
    m.querySelectorAll('[data-hi]').forEach(b=>b.onclick=()=>{ m.parentElement.remove(); reachOut(b.dataset.hi); });
    $('#dl',m).onclick=()=>downloadCSV(rows, notYet);
  };
  modal('', (m)=>draw(m));
}
async function downloadCSV(rows, notYet){
  const q=v=>`"${String(v).replace(/"/g,'""')}"`;
  const lines=[['Name','Status','Who reached out','Type','When','Minutes'].map(q).join(',')]
    .concat(rows.map(r=>[r[0],'Talked to',r[1]==='You'?'You':'They did',r[2],r[3],r[4]].map(q).join(',')))
    .concat(notYet.map(x=>[x,'Not yet in touch','','','',''].map(q).join(',')));
  const csv=lines.join('\n'), name=`socius-contacts-${ui.prog}.csv`;
  let d=null; try{ d = window.claude && window.claude.use ? await window.claude.use('downloads') : null; }catch(e){}
  if(d){ try{ await d.save({filename:name,data:csv}); toast('Saved! Your contact list is downloading.'); }catch(e){ if(e && e.code==='declined') toast('No problem, nothing was saved.'); else toast("Couldn't save the file here."); } return; }
  try{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download=name; document.body.appendChild(a); a.click(); a.remove(); toast('Downloading your contact list.'); }catch(e){ toast("Couldn't save the file here."); }
}


const BOOKS=[
 {t:'Together',a:'Vivek H. Murthy',y:2020,ph:'Loneliness',c:'#2F6FB0',min:'7 hrs',why:'Written by a former US Surgeon General: loneliness is common, not a personal failure, and it can be fixed.',ideas:['Loneliness is a signal, like hunger: it tells you that you need people.','Even 15 minutes a day with someone you care about helps.','Helping others is one of the fastest ways out of loneliness.'],try:'Spend 15 phone-free minutes with one person this week.'},
 {t:'Platonic',a:'Marisa G. Franco',y:2022,ph:'Conversation',c:'#D9573B',min:'8 hrs',why:'A psychologist on how adult friendships really form, and why you have to make the first move.',ideas:['Adult friendships rarely "just happen": someone has to take the first step.','Assume people like you. They usually do, and it makes you warmer.','Small, repeated time together turns acquaintances into friends.'],try:'Message one person you liked meeting and suggest a second plan.'},
 {t:'How to Win Friends and Influence People',a:'Dale Carnegie',y:1936,ph:'Conversation',c:'#C99A2E',min:'7 hrs',why:'The classic on being good with people: simple habits that still work.',ideas:['Be genuinely interested in the other person.','Remember and use their name.','Listen more than you talk; let them talk about themselves.'],try:'In your next chat, ask two follow-up questions before sharing your own story.'},
 {t:'Supercommunicators',ct:'Super&shy;communicators',a:'Charles Duhigg',y:2024,ph:'Conversation',c:'#5B4BB7',min:'9 hrs',why:'Why some conversations click, and how to have more of them.',ideas:['Notice what kind of talk it is: practical, emotional or social.','Match the other person before trying to lead.','Deep questions ("how did that feel?") open people up.'],try:'Ask one "how did that feel?" question in a real conversation.'},
 {t:'Daring Greatly',a:'Brené Brown',y:2012,ph:'Vulnerability',c:'#8A3B5C',min:'8 hrs',why:'From the researcher behind one of our Learn videos: being open is courage, not weakness.',ideas:['Vulnerability is the birthplace of connection.','Shame grows in secret; talking about it shrinks it.','You can be brave and scared at the same time.'],try:'Tell one trusted person something true about your week.'},
 {t:'Lost Connections',a:'Johann Hari',y:2018,ph:'Emotions',c:'#2E7D6B',min:'10 hrs',why:'A journalist explores how disconnection from people and meaning shapes low moods.',ideas:['Low moods are often linked to how we live, not only to brain chemistry.','Reconnecting with people and community is part of feeling better.','Meaningful work and shared goals matter too.'],try:'Join one group activity this week, even a small one.'},
 {t:'The Art of Showing Up',a:'Rachel Wilkerson Miller',y:2020,ph:'Happiness',c:'#E07A2E',min:'6 hrs',why:'A practical guide to being there for yourself and for the people you love.',ideas:['Take care of yourself first; it makes you a better friend.','Showing up is small, specific actions, not grand gestures.','Ask what someone needs instead of guessing.'],try:'Ask a friend: "What would actually help you this week?"'},
 {t:'Atomic Habits',a:'James Clear',y:2018,ph:'Happiness',c:'#3A3F5C',min:'6 hrs',why:'Koramangala Readers\' pick this month. Tiny habits, like texting one friend a day, add up.',ideas:['Make the habit tiny: a 2-minute version still counts.','Tie it to something you already do.','Focus on who you want to become, not the goal.'],try:'After your morning chai, send one friend a message.'}];
function bookCover(b,w=150){ return `<div class="bcov" style="--bc:${b.c};width:${w}px"><span class="bc-band"></span><b class="bc-t">${b.ct||esc(b.t)}</b><span class="bc-a">${esc(b.a)}</span></div>`; }
function openBook(i){ const b=BOOKS[i]; S.reading=S.reading||[]; const saved=()=>S.reading.includes(b.t);
  modal(`<div class="bk-top">${bookCover(b,120)}<div><span class="eyebrow">${b.ph} · ${b.y} · about ${b.min}</span><h2 style="margin-top:4px">${esc(b.t)}</h2><p class="small muted">by ${esc(b.a)}</p></div></div>
   <p>${esc(b.why)}</p>
   <div class="bk-ideas"><b>Milo's 3 big ideas</b><ol>${b.ideas.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>
   <div class="tintcard small"><b>Try this week:</b> ${esc(b.try)}</div>
   <div class="row" style="width:100%;flex-wrap:wrap"><button class="btn gold" id="bkSave" style="flex:1">${saved()?'On your reading list ✓':'Add to my reading list'}</button><a class="btn line" href="https://www.google.com/search?tbm=bks&q=${encodeURIComponent(b.t+' '+b.a)}" target="_blank" rel="noopener">Find the book</a></div>
   <button class="link" id="bkClan">Discuss it with ${esc(MY_CLAN)}</button>
   <button class="btn line" id="cl" style="width:100%">Close</button>`,(m,c)=>{
    $('#cl',m).onclick=c;
    $('#bkSave',m).onclick=()=>{ if(saved()) S.reading=S.reading.filter(x=>x!==b.t); else { S.reading.push(b.t); markGuide('read'); } save(); $('#bkSave',m).textContent=saved()?'On your reading list ✓':'Add to my reading list'; toast(saved()?'Added to your reading list':'Removed from your list'); if(ui.page==='blogs') pageBlogs(); };
    $('#bkClan',m).onclick=()=>{ c(); go('clans'); toast(`Tip: post "${b.t}" in your clan chat`); };
  });
}
function pageBlogs(){
  const feels=['All','Conversation','Loneliness','Emotions','Vulnerability','Happiness'];
  const vids=VIDEOS.filter(v=>ui.feel==='All'||v.ph===ui.feel), reads=READS.map((a,i)=>[a,i]).filter(([a])=>ui.feel==='All'||a.ph===ui.feel);
  $('#page').innerHTML=`<div class="row" style="align-items:flex-start"><div><span class="eyebrow">Learn</span><h1 style="font-size:34px;margin-top:4px">Relearn the things AI made us forget</h1>
    <p class="muted" style="margin-top:6px;max-width:62ch">Short videos, self-help books and quick reads on feelings and on talking to people in real life.</p></div></div>
    <div class="chips">${feels.map(f=>`<button class="chip" aria-pressed="${ui.feel===f}" data-feel="${f}">${f}</button>`).join('')}</div>
    ${vids.length?`<div class="videos">${vids.map(vidCard).join('')}</div>`:''}
    ${(()=>{ const bk=BOOKS.map((b,i)=>[b,i]).filter(([b])=>ui.feel==='All'||b.ph===ui.feel); S.reading=S.reading||[]; return bk.length?`<section class="books"><div class="sec-h"><div><h2>Books recommended by Milo</h2><p class="small muted" style="margin-top:4px">Self-help reads on friendship, feelings and talking to people. Tap one for the 3 big ideas.</p></div>${S.reading.length?`<span class="tag leaf">${S.reading.length} on your list</span>`:''}</div>
      <div class="bookrow">${bk.map(([b,i])=>`<button class="bookc" data-bk="${i}" aria-label="${esc(b.t)} by ${esc(b.a)}">${bookCover(b)}<b class="bk-t">${esc(b.t)}</b><span class="small muted">${esc(b.a)}</span><span class="bk-tag">${S.reading.includes(b.t)?'On your list ✓':b.ph}</span></button>`).join('')}</div></section>`:''; })()}
    ${reads.length?`<div class="sec-h"><h2>Quick reads</h2></div><div class="videos">${reads.map(([a,i])=>`<button class="card" style="text-align:left;display:flex;flex-direction:column;gap:8px" data-read="${i}"><span class="tag">${a.ph}</span><h3 style="font-size:18px">${a.t}</h3><span class="small muted">${a.read}</span></button>`).join('')}</div>`:''}
    <p class="small muted">Videos open on YouTube or TED in a new tab.</p>`;
  $('#page').querySelectorAll('[data-feel]').forEach(b=>b.onclick=()=>{ ui.feel=b.dataset.feel; pageBlogs(); });
  $('#page').querySelectorAll('[data-vid]').forEach(a=>a.addEventListener('click',()=>markGuide('read')));
  $('#page').querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>openBook(+b.dataset.bk));
  wire($('#page'));
}

/* ===== Coach (Socius Plus) ===== */
const COACHES=[
  ['Meera Iyer','Moving cities & first jobs','Counselling psychologist · 8 yrs',['Tue 7 pm','Thu 8 pm','Sat 11 am']],
  ['Rohan Kapoor','Starting conversations','Social-skills coach · 5 yrs',['Wed 6 pm','Fri 7:30 pm','Sun 10 am']],
  ['Dr. Sana Qureshi','Stress & low weeks','Clinical psychologist · 11 yrs',['Mon 8 pm','Thu 6 pm','Sat 4 pm']]
];
const ICO_CAL='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
function coachState(){ S.coach=S.coach||{plan:'free',sessions:[],org:''}; return S.coach; }
function pageCoach(){
  const C=coachState(), plus=C.plan!=='free';
  const planName={free:'Free',plus:'Plus',org:'Plus via '+(C.org||'your college')}[C.plan];
  $('#page').innerHTML=`<div class="coachpg">
   <section class="ch-hero"><span class="eyebrow">Coach</span>
    <h1>A real person in your corner.</h1>
    <p class="lead">Milo finds you people. Your coach helps you actually talk to them: practise the hard first message, plan a meetup, or talk through a low week.</p>
    <div class="row" style="flex-wrap:wrap;gap:10px;margin-top:6px"><span class="tag ${plus?'leaf':''}">Your plan: ${esc(planName)}</span>${plus?'':'<span class="small muted">Free forever for the game. Coaching is optional.</span>'}</div>
   </section>

   ${C.sessions.length?`<section><h2 class="h2s">Your sessions</h2><div class="card">${C.sessions.map((s,i)=>`<div class="li"><div class="row" style="gap:12px">${nameAvRaw(s.coach,40)}<div><b>${esc(s.coach)}</b><div class="small muted">${esc(s.slot)} · 30-min video call</div></div></div><div class="row" style="gap:8px"><span class="tag leaf">Booked</span><button class="btn sm line" data-cancel="${i}">Cancel</button></div></div>`).join('')}</div></section>`:''}

   <section><h2 class="h2s">Pick a coach</h2>
    <div class="coachgrid">${COACHES.map(([n,focus,cred,slots],i)=>{ const [role,yrs]=cred.split(' · '); return `<div class="card coachc">
      ${nameAvRaw(n,84)}
      <b class="cc-n">${n}</b>
      <span class="cc-r">${role}</span>
      <span class="cc-y">${yrs} experience</span>
      <span class="tag cc-f">${focus}</span>
      <span class="cc-s">${ICO_CAL}Next free: <b>${slots[0]}</b></span>
      <button class="btn gold" data-book="${i}">Book a session</button></div>`; }).join('')}</div>
   </section>

   <section><h2 class="h2s">Plans</h2>
    <div class="plans">
     <div class="card plan ${C.plan==='free'?'cur':''}"><b class="pl-n">Free</b><div class="pl-p">₹0</div>
      <ul><li>The full game: quests, clans, meetups</li><li>Ask Milo anytime</li><li>Weekly mood report</li></ul>
      ${C.plan==='free'?'<span class="tag">Current plan</span>':''}</div>
     <div class="card plan best ${C.plan==='plus'?'cur':''}"><span class="pl-badge">Most helpful</span><b class="pl-n">Plus</b><div class="pl-p">₹199<small>/month</small></div>
      <ul><li><b>2 coach video sessions</b> a month (30 min)</li><li>Practise chats: role-play the hard message first</li><li>Coach notes on your weekly report</li></ul>
      ${C.plan==='plus'?'<span class="tag leaf">Current plan</span>':'<button class="btn gold" id="goPlus" style="width:100%">Start Plus</button>'}</div>
     <div class="card plan ${C.plan==='org'?'cur':''}"><b class="pl-n">Through your college or company</b><div class="pl-p">Free <small>for you</small></div>
      <p class="small" style="margin:0">Is your college or workplace already partnered with Socius? Check in 10 seconds with your college or work email.</p>
      <ul><li>Everything in Plus, paid by them</li><li>They only see group totals, never you</li><li>Not partnered yet? Send them a ready-made request</li></ul>
      ${C.plan==='org'?`<span class="tag leaf">Active · ${esc(C.org)}</span>`:'<button class="btn gold" id="goOrg" style="width:100%">Check my college or company</button>'}</div>
    </div>
    <p class="small muted" style="margin-top:10px">Coaches are trained listeners, not emergency help. If you feel unsafe, use “I need to talk to someone now” on your profile.</p>
   </section>
  </div>`;
  const pg=$('#page');
  pg.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>bookCoach(+b.dataset.book));
  pg.querySelectorAll('[data-cancel]').forEach(b=>b.onclick=()=>modal(`<h2>Cancel this session?</h2><p class="muted">${esc(C.sessions[+b.dataset.cancel].coach)}, ${esc(C.sessions[+b.dataset.cancel].slot)}. You can book again anytime.</p><div class="row"><button class="btn gold" id="y" style="flex:1">Yes, cancel</button><button class="btn line" id="n">Keep it</button></div>`,(m,c)=>{ $('#n',m).onclick=c; $('#y',m).onclick=()=>{ C.sessions.splice(+b.dataset.cancel,1); save(); c(); pageCoach(); toast('Session cancelled'); }; }));
  const gp=$('#goPlus'); if(gp) gp.onclick=()=>startPlus();
  const go_=$('#goOrg'); if(go_) go_.onclick=()=>orgCode();
}
function startPlus(after){
  modal(`<h2>Start Socius Plus</h2><p class="muted">₹199 a month. Cancel anytime. 2 coach sessions a month, plus practice chats.</p>
   <div class="field"><label class="small" style="font-weight:700" for="upi">UPI ID or card</label><input id="upi" placeholder="name@upi"></div>
   <p class="small muted">Demo: no real payment is taken in this preview.</p>
   <div class="row"><button class="btn gold" id="pay" style="flex:1">Pay ₹199</button><button class="btn line" id="cn">Not now</button></div>`,(m,c)=>{
    $('#cn',m).onclick=c; $('#pay',m).onclick=()=>{ coachState().plan='plus'; save(); c(); toast('Welcome to Plus!'); after?after():pageCoach(); }; });
}
const PARTNERS=[['IIT Delhi','iitd.ac.in','College'],['IIT Bombay','iitb.ac.in','College'],['BITS Pilani','pilani.bits-pilani.ac.in','College'],['Christ University','christuniversity.in','College'],['NIT Trichy','nitt.edu','College'],['Flipkart','flipkart.com','Company'],['Razorpay','razorpay.com','Company'],['Zerodha','zerodha.com','Company']];
function orgCode(after){
  const C=coachState(); let tab='mail';
  modal(`<h2>Is your college or company with Socius?</h2>
   <p class="muted">Many colleges and companies cover Socius Plus for their people. Check yours in a few seconds. It's free for you if they're a partner.</p>
   <div class="invtabs" role="tablist"><button role="tab" aria-selected="true" data-ot="mail">Use my college / work email</button><button role="tab" aria-selected="false" data-ot="find">Search my institution</button></div>
   <div id="otMail" style="width:100%"><div class="field"><label class="small" style="font-weight:700" for="oem">College or work email</label><input id="oem" type="email" inputmode="email" autocomplete="email" placeholder="you@iitd.ac.in"></div></div>
   <div id="otFind" hidden style="width:100%"><div class="field"><label class="small" style="font-weight:700" for="oq">College or company name</label><input id="oq" autocomplete="off" placeholder="e.g. IIT Delhi, Flipkart"></div><div class="plist" id="plist"></div></div>
   <div id="ores" style="width:100%" aria-live="polite"></div>
   <div class="row" style="width:100%"><button class="btn gold" id="ok" style="flex:1">Check</button><button class="btn line" id="cn">Cancel</button></div>
   <p class="small muted">Demo: partner list and emails are simulated in this preview.</p>`,(m,c)=>{
    const res=$('#ores',m);
    const domOf=e=>(e.split('@')[1]||'').toLowerCase().trim();
    const match=d=>PARTNERS.find(p=>d===p[1]||d.endsWith('.'+p[1]));
    const verify=(p,email)=>{
      res.innerHTML=`<div class="tintcard ok-card"><b>🎉 Good news! ${esc(p[0])} is a Socius partner.</b><p class="small" style="margin-top:4px">We sent a 6-digit code to <b>${esc(email)}</b>.</p>
        <div class="field" style="margin-top:8px"><label class="small" style="font-weight:700" for="otp">Enter the code</label><input id="otp" inputmode="numeric" maxlength="6" placeholder="6 digits"></div><p class="err small" id="oe" role="alert" hidden></p></div>`;
      $('#ok',m).textContent='Verify and activate';
      $('#ok',m).onclick=()=>{ const v=$('#otp',m).value.trim(); if(!/^\d{6}$/.test(v)){ const e=$('#oe',m); e.hidden=false; e.textContent='Enter the 6-digit code from your email (any 6 digits in this demo).'; return; }
        C.plan='org'; C.org=p[0]; save(); c(); toast(`Plus is now free for you, via ${p[0]}`); after?after():pageCoach(); };
    };
    const notYet=(name,email)=>{
      const sub=`Request: Socius Plus for ${name||'our students and staff'}`;
      const body=`Hello,\n\nI use Socius, an app that helps people stay connected with friends and meet people in real life, with optional coaching for hard weeks.\n\nMany colleges and companies cover Socius Plus for their people. It only shares group totals, never individual data. Could ${name||'we'} partner with Socius?\n\nYou can reach them at partners@socius.app.\n\nThank you,\n${S.name}`;
      res.innerHTML=`<div class="tintcard"><b>${esc(name||'Your institution')} isn't a partner yet.</b><p class="small" style="margin-top:4px">Ask them to join. We've written the email for you; edit it and send.</p>
        <div class="field" style="margin-top:8px"><label class="small" style="font-weight:700" for="rto">To (HR, wellness or student office)</label><input id="rto" type="email" placeholder="wellness@${esc(domOf(email||'')||'yourcollege.edu')}"></div>
        <div class="field"><label class="small" style="font-weight:700" for="rsub">Subject</label><input id="rsub" value="${esc(sub)}"></div>
        <div class="field"><label class="small" style="font-weight:700" for="rbody">Message</label><textarea id="rbody" rows="7">${esc(body)}</textarea></div></div>`;
      $('#ok',m).textContent='Send request';
      $('#ok',m).onclick=()=>{ const to=$('#rto',m).value.trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)){ $('#rto',m).focus(); toast('Add the email address to send it to.'); return; }
        c(); toast(`Request sent to ${to}. Meanwhile, you can try Plus.`); };
    };
    const check=()=>{
      if(tab==='mail'){ const e=$('#oem',m).value.trim(); if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){ res.innerHTML='<p class="err small">Please enter a valid college or work email.</p>'; return; }
        const p=match(domOf(e)); p?verify(p,e):notYet('',e); }
      else { const q=$('#oq',m).value.trim(); if(!q){ res.innerHTML='<p class="err small">Type your college or company name.</p>'; return; }
        const p=PARTNERS.find(x=>x[0].toLowerCase()===q.toLowerCase()); if(p) askMail(p); else notYet(q,''); }
    };
    const askMail=p=>{ res.innerHTML=`<div class="tintcard ok-card"><b>✓ ${esc(p[0])} is a Socius partner.</b><p class="small" style="margin-top:4px">Confirm with your ${p[2]==='College'?'college':'work'} email ending in <b>@${esc(p[1])}</b>.</p><div class="field" style="margin-top:8px"><label class="small" style="font-weight:700" for="pem">Your ${p[2]==='College'?'college':'work'} email</label><input id="pem" type="email" placeholder="you@${esc(p[1])}"></div><p class="err small" id="pe" role="alert" hidden></p></div>`;
      $('#ok',m).textContent='Send code';
      $('#ok',m).onclick=()=>{ const e=$('#pem',m).value.trim(); if(!match(domOf(e))||match(domOf(e))[0]!==p[0]){ const x=$('#pe',m); x.hidden=false; x.textContent=`Use an email ending in @${p[1]}.`; return; } verify(p,e); }; };
    const renderList=()=>{ const q=$('#oq',m).value.trim().toLowerCase(); const l=PARTNERS.filter(p=>!q||p[0].toLowerCase().includes(q));
      $('#plist',m).innerHTML=l.length?l.map(p=>`<button class="pitem" data-p="${esc(p[0])}"><b>${esc(p[0])}</b><span class="small muted">${p[2]} · partner</span></button>`).join(''):`<p class="small muted">No partner found for “${esc($('#oq',m).value.trim())}”. Press Check to ask them to join.</p>`;
      $('#plist',m).querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{ $('#oq',m).value=b.dataset.p; askMail(PARTNERS.find(x=>x[0]===b.dataset.p)); }); };
    m.querySelectorAll('[data-ot]').forEach(b=>b.onclick=()=>{ tab=b.dataset.ot; m.querySelectorAll('[data-ot]').forEach(x=>x.setAttribute('aria-selected',x===b)); $('#otMail',m).hidden=tab!=='mail'; $('#otFind',m).hidden=tab!=='find'; res.innerHTML=''; $('#ok',m).textContent='Check'; $('#ok',m).onclick=check; if(tab==='find') renderList(); });
    $('#oq',m).oninput=()=>{ renderList(); res.innerHTML=''; $('#ok',m).textContent='Check'; $('#ok',m).onclick=check; };
    $('#oem',m).onkeydown=e=>{ if(e.key==='Enter') check(); };
    $('#cn',m).onclick=c; $('#ok',m).onclick=check; });
}
function bookCoach(i){
  const [n,focus,cred,slots]=COACHES[i], C=coachState();
  if(C.plan==='free'){
    modal(`${nameAvRaw(n,72)}<h2>Book ${esc(first(n))}</h2><p class="muted">Coach sessions come with Plus, or free through your college or company.</p>
     <div class="row" style="width:100%"><button class="btn gold" id="pl" style="flex:1">Start Plus · ₹199/mo</button><button class="btn line" id="or">Check my college / company</button></div><button class="link" id="cn">Maybe later</button>`,(m,c)=>{
      $('#cn',m).onclick=c; $('#pl',m).onclick=()=>{ c(); startPlus(()=>bookCoach(i)); }; $('#or',m).onclick=()=>{ c(); orgCode(()=>bookCoach(i)); }; },'mc');
    return;
  }
  let pick=0;
  modal(`${nameAvRaw(n,72)}<h2>Book ${esc(first(n))}</h2><p class="muted">${esc(focus)} · 30-min video call</p>
   <div class="slots" role="radiogroup" aria-label="Pick a time">${slots.map((s,k)=>`<button class="chip" role="radio" aria-checked="${k===0}" data-sl="${k}">${s}</button>`).join('')}</div>
   <div class="field" style="width:100%"><label class="small" style="font-weight:700" for="nt">What would you like help with? (optional)</label><input id="nt" placeholder="e.g. texting an old friend first"></div>
   <div class="row" style="width:100%"><button class="btn gold" id="ok" style="flex:1">Confirm booking</button><button class="btn line" id="cn">Cancel</button></div>`,(m,c)=>{
    m.querySelectorAll('[data-sl]').forEach(b=>b.onclick=()=>{ pick=+b.dataset.sl; m.querySelectorAll('[data-sl]').forEach(x=>x.setAttribute('aria-checked',x===b)); });
    $('#cn',m).onclick=c; $('#ok',m).onclick=()=>{ C.sessions.push({coach:n,slot:slots[pick]}); save(); c(); pageCoach(); toast(`Booked with ${first(n)}, ${slots[pick]}`); }; },'mc');
}

function pageProfile(){
  const list = ui.ftab==='following' ? S.following : FOLLOWERS;
  $('#page').innerHTML=`<div class="prof">
   <div class="prof-main">
    <div class="banner" style="background:${AVS[((S.avatar%AVS.length)+AVS.length)%AVS.length].bg}">${avSVG(S.avatar,150)}<button class="edit" id="editAv" aria-label="Change your avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B1F3B" stroke-width="2.2" stroke-linecap="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg></button></div>
    <div class="between" style="align-items:flex-start"><div><h1 style="font-size:30px">${esc(S.name)}</h1><p class="muted">@${esc(S.handle)}</p>
      <div class="counts" style="margin-top:6px"><button class="link" data-ft="following">${S.following.length} Following</button><button class="link" data-ft="followers">${FOLLOWERS.length} Followers</button></div></div>
      <span class="tag leaf" title="Your clan">Clan: ${MY_CLAN}</span></div>
    <div class="psec"><h2 style="font-size:22px">Statistics</h2>
      <div class="stats" style="margin-top:12px;grid-template-columns:1fr 1fr">
        <div class="stat">${clockIcon(28)}<div><b>6 days</b><span class="small muted">Daily goal streak</span></div></div>
        <div class="stat">${boltIcon(28)}<div><b>${S.xp}</b><span class="small muted">Total XP · Level ${S.level}</span></div></div>
        <div class="stat">${gemIcon(28)}<div><b>${S.gems}</b><span class="small muted">Gems</span></div></div>
        <div class="stat">${ICO.trophy}<div><b>#4</b><span class="small muted">${MY_CLAN}</span></div></div>
      </div></div>
    <div class="psec"><div class="sec-h"><h2 style="font-size:22px">Achievements</h2><span class="small muted">${ACH.filter(a=>a[2]>=a[3]).length} of ${ACH.length} earned</span></div>
      <div class="card achv">${ACH.map(([t,d,c,n,col,ic])=>`<div class="ach"><div class="badge" style="background:${col}"><svg viewBox="0 0 24 24">${ICON[ic]}</svg><span style="color:#fff">LEVEL 1</span></div>
        <div><div class="between"><b>${t}</b><span class="small muted">${Math.min(c,n)}/${n}</span></div><div class="pbar"><i style="width:${Math.min(c/n,1)*100}%"></i></div><p class="small muted" style="margin-top:6px">${d}</p></div></div>`).join('')}</div></div>
    <div class="psec"><h2 style="font-size:22px">About you</h2><div class="about2">
    <div class="card"><div class="between"><h3>Your details</h3><button class="link" id="editMe">Edit</button></div>
      <div style="margin-top:6px"><div class="li"><span class="muted">Age</span><b class="small">${esc(S.age)}</b></div><div class="li"><span class="muted">City</span><b class="small">${esc(S.city)}</b></div><div class="li"><span class="muted">Joined</span><b class="small">${esc(S.joined)}</b></div><div class="li"><span class="muted">Interests</span><b class="small" style="text-align:right">${esc(S.interests.concat(S.extra).join(', '))}</b></div></div></div>
    <div class="card"><h3>Your setup</h3><div style="margin-top:6px">
      <div class="li"><span class="muted">Daily goal</span><b class="small">${S.goal} min/day</b></div><div class="li"><span class="muted">Safety contact</span><b class="small">${esc(S.safety)}</b></div><div class="li"><span class="muted">Old friends invited</span><b class="small">${S.invited.length}</b></div><div class="li"><span class="muted">Coaching</span><button class="link" data-to="coach">${(S.coach&&S.coach.plan!=='free')?'Plus · manage':'Free · see Plus'}</button></div></div>
      <p class="small muted" style="margin-top:8px">Your college or company only ever sees totals for the whole group, never anything about you.</p></div>
    </div></div>
   </div>
   <div class="prof-side">
    <div class="card" style="padding:0"><div class="ftabs" role="tablist"><button role="tab" aria-selected="${ui.ftab==='following'}" data-ft="following">FOLLOWING</button><button role="tab" aria-selected="${ui.ftab==='followers'}" data-ft="followers">FOLLOWERS</button></div>
      <div class="flist" tabindex="0" aria-label="${ui.ftab==='following'?'People you follow':'Your followers'}">${list.map(n=>`<div class="person">${nameAv(n,40)}<div style="flex:1;min-width:0"><b>${n}</b><div class="small muted">${(PEOPLE.find(p=>p[0]===n)||[0,'Old friend'])[1]}</div></div>
        ${followBtn(n, ui.ftab==='followers')}</div>`).join('')||`<p class="muted small" style="padding:14px 0">${ui.ftab==='following'?'You are not following anyone yet. Find friends below!':'No followers yet.'}</p>`}</div></div>
    <div class="card"><h3>Find your people</h3>
      <button class="arrow" id="findF" style="margin-top:8px"><span class="row">${ICO.search}Find friends</span><span aria-hidden="true">›</span></button>
      <button class="arrow greyrow" id="invF"><span class="row"><svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3" fill="#8A90A6"/><path d="M3 8l9 6 9-6" fill="none" stroke="#fff" stroke-width="1.8"/></svg>Invite friends</span><span aria-hidden="true">›</span></button><div class="sugg"><span class="eyebrow">Suggested for you</span>${PEOPLE.filter(p=>!S.following.includes(p[0])).slice(0,3).map(p=>`<div class="person">${nameAv(p[0],38)}<div style="flex:1;min-width:0"><b class="small">${p[0]}</b><div class="small muted">${p[1]}</div></div>${followBtn(p[0])}</div>`).join('')}</div></div>
    <div class="pacts"><button class="btn" style="background:var(--coral)" id="sos">I need to talk to someone now</button>
    <button class="btn line" id="logout">Log out</button></div>
   </div></div>`;
  const pg=$('#page');
  pg.querySelectorAll('[data-ft]').forEach(b=>b.onclick=()=>{ ui.ftab=b.dataset.ft; pageProfile(); });
  pg.querySelectorAll('[data-to]').forEach(b=>b.onclick=()=>go(b.dataset.to));
  $('#editAv').onclick=()=>{ let pick=S.avatar; modal(`<h2>Pick your avatar</h2><p class="muted">Pick the one that feels most like you.</p><div class="avpick">${AVS.map((a,i)=>`<button aria-pressed="${i===pick}" data-av="${i}" aria-label="Avatar ${i+1}">${avSVG(i,80)}</button>`).join('')}</div><div class="row"><button class="btn gold" id="sv" style="flex:1">Save</button><button class="btn line" id="cn">Maybe later</button></div>`,(m,c)=>{
      m.querySelectorAll('[data-av]').forEach(b=>b.onclick=()=>{ pick=+b.dataset.av; m.querySelectorAll('[data-av]').forEach(x=>x.setAttribute('aria-pressed',x===b)); });
      $('#cn',m).onclick=c; $('#sv',m).onclick=()=>{ S.avatar=pick; save(); c(); pageProfile(); chrome(); toast('Looking good!'); }; }); };
  $('#editMe').onclick=()=>modal(`<h2>Edit your details</h2>
    <div class="field"><label for="fn" class="small" style="font-weight:700">Name</label><input id="fn" value="${esc(S.name)}"></div>
    <div class="field"><label for="fh" class="small" style="font-weight:700">Username</label><input id="fh" value="${esc(S.handle)}"></div>
    <div class="row"><div class="field" style="flex:1"><label for="fa" class="small" style="font-weight:700">Age</label><input id="fa" value="${esc(S.age)}"></div><div class="field" style="flex:2"><label for="fc" class="small" style="font-weight:700">City</label><input id="fc" value="${esc(S.city)}"></div></div>
    <div class="row"><button class="btn gold" id="sv" style="flex:1">Save changes</button><button class="btn line" id="cn">Cancel</button></div>`,(m,c)=>{
      $('#cn',m).onclick=c; $('#sv',m).onclick=()=>{ S.name=$('#fn',m).value.trim()||S.name; S.handle=$('#fh',m).value.trim()||S.handle; S.age=$('#fa',m).value.trim(); S.city=$('#fc',m).value.trim(); save(); c(); pageProfile(); chrome(); toast('Saved!'); }; });
  $('#findF').onclick=()=>modal(`${auri(110,'think')}<h2>Find friends</h2><p class="muted">People from your clan and old friends Milo found.</p>${PEOPLE.concat(FRIENDS.slice(3,6).map(f=>[f[0],'Old friend · '+f[3]])).map(p=>`<div class="person" style="width:100%">${nameAv(p[0],38)}<div style="flex:1;text-align:left"><b class="small">${p[0]}</b><div class="small muted">${p[1]}</div></div>${followBtn(p[0])}</div>`).join('')}<button class="btn line" id="cl">Close</button>`,(m,c)=>{
      $('#cl',m).onclick=()=>{ c(); pageProfile(); }; },'mc');
  $('#invF').onclick=()=>{ S.sentInv=S.sentInv||[]; const link=`socius.app/join/${S.handle}`;
    const defSub=`${first(S.name)} invited you to Socius`;
    const defBody=`Hey!\n\nI've been using Socius to stay in touch with the people who matter, and I'd love for you to join me. It's a little game where you level up by actually talking to friends.\n\nJoin with my link and we both get 50 gems:\n${link}\n\nSee you there!\n${first(S.name)}`;
    const sentList=()=>S.sentInv.length?`<div class="sentinv"><span class="eyebrow">Invites sent</span>${S.sentInv.map(x=>`<div class="li"><span class="small">${esc(x.to)}</span><span class="tag">Waiting to join</span></div>`).join('')}</div>`:'';
    modal(`${auri(110,'wave','pop')}<h2>Invite your friends</h2><p class="muted">The more the merrier! You both get 50 gems when they join.</p>
    <div class="invtabs" role="tablist"><button role="tab" aria-selected="true" data-it="mail">Write an email</button><button role="tab" aria-selected="false" data-it="link">Share link</button></div>
    <form class="mailbox" id="mailF" novalidate>
      <div class="field"><label for="mTo" class="small" style="font-weight:700">To</label><input id="mTo" type="text" inputmode="email" autocomplete="off" placeholder="friend@email.com, another@email.com"></div>
      <div class="field"><label for="mSub" class="small" style="font-weight:700">Subject</label><input id="mSub" value="${esc(defSub)}"></div>
      <div class="field"><label for="mBody" class="small" style="font-weight:700">Message</label><textarea id="mBody" rows="8">${esc(defBody)}</textarea></div>
      <p class="err small" id="mErr" role="alert" hidden></p>
      <div class="row" style="width:100%;flex-wrap:wrap"><button type="submit" class="btn greybtn" id="mSend" style="flex:1">Send invite</button><button type="button" class="btn line" id="mCopy">Copy email</button></div>
      <p class="small muted">Demo: in the real app Socius sends this from our invite address. Nothing is emailed from this preview.</p>
    </form>
    <div id="linkP" hidden style="width:100%"><div class="row" style="width:100%"><input readonly id="lnk" aria-label="Your invite link" value="${esc(link)}" style="flex:1;min-width:0;border:1.5px solid var(--line);border-radius:12px;padding:10px"><button class="btn greybtn" id="cp">Copy</button></div></div>
    <div id="sentW" style="width:100%">${sentList()}</div>
    <button class="btn line" id="cl" style="width:100%">Close</button>`,(m,c)=>{
      const copy=(txt,el)=>{ try{ navigator.clipboard.writeText(txt).then(()=>toast('Copied!')).catch(()=>{ el&&el.select&&el.select(); toast('Select the text and copy it.'); }); }catch(e){ el&&el.select&&el.select(); toast('Select the text and copy it.'); } };
      m.querySelectorAll('[data-it]').forEach(t=>t.onclick=()=>{ m.querySelectorAll('[data-it]').forEach(x=>x.setAttribute('aria-selected',x===t)); $('#mailF',m).hidden=t.dataset.it!=='mail'; $('#linkP',m).hidden=t.dataset.it!=='link'; });
      $('#cp',m).onclick=()=>copy($('#lnk',m).value,$('#lnk',m));
      $('#mCopy',m).onclick=()=>copy(`Subject: ${$('#mSub',m).value}\n\n${$('#mBody',m).value}`,$('#mBody',m));
      $('#mailF',m).addEventListener('submit',e=>{ e.preventDefault(); const err=$('#mErr',m);
        const to=$('#mTo',m).value.split(/[,;\s]+/).map(x=>x.trim()).filter(Boolean);
        const bad=to.filter(x=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
        if(!to.length){ err.textContent='Add at least one email address.'; err.hidden=false; $('#mTo',m).focus(); return; }
        if(bad.length){ err.textContent=`Check this address: ${bad[0]}`; err.hidden=false; $('#mTo',m).focus(); return; }
        if(!$('#mBody',m).value.trim()){ err.textContent='Write a short message first.'; err.hidden=false; return; }
        err.hidden=true; const btn=$('#mSend',m); btn.disabled=true; btn.textContent='Sending…';
        setTimeout(()=>{ to.forEach(x=>{ if(!S.sentInv.some(y=>y.to===x)) S.sentInv.unshift({to:x}); }); save();
          $('#sentW',m).innerHTML=sentList(); $('#mTo',m).value=''; btn.disabled=false; btn.textContent='Send invite';
          toast(to.length>1?`Invites sent to ${to.length} friends!`:`Invite sent to ${to[0]}!`); },700); });
      $('#cl',m).onclick=c; setTimeout(()=>$('#mTo',m).focus(),60); },'mc invm');
  };
  $('#logout').onclick=()=>{ S.signedIn=false; save(); renderLand(); view('land'); hist({v:'land'}); toast('See you soon! Milo will be waiting.'); };
  $('#sos').onclick=()=>modal(`${auri(120,'love')}<h2>You're not alone. We're right here.</h2><p class="muted">Would you like us to let ${esc(S.safety)} know you'd love a call right now?</p>
    <div class="row" style="width:100%"><button class="btn gold" id="ts" style="flex:1">Yes, ask ${esc(first(S.safety))} to call me</button><button class="btn line" id="sx">Not now</button></div>
    <p class="small muted">If you're ever in danger, please call your local emergency number.</p>`,(m,c)=>{ $('#sx',m).onclick=c; $('#ts',m).onclick=()=>{ c(); toast(`Prototype: in the real app, ${first(S.safety)} would get a message now.`); }; },'mc');
}

renderLand();
if(S.signedIn){ enterApp(true); } else { view('land'); hist({v:'land'},true); }
})();
