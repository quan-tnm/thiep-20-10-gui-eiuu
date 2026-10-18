const $ = (id) => document.getElementById(id);
const screens = ["welcome", "letterScreen", "memoriesScreen"];
let opened = false;
let musicOn = false;
const audio = $("bgMusic");

const letterParagraphs = [
  "Happy anniversary 45 months của 2 mìn nhoooo ♡",
  "Chúc em có một ngày 20/10 thật hạnh phúc, thật nhiều niềm vui và gặp được thật nhiều điều tốt đẹp. Mong những ngày phía trước của Tini sẽ luôn có những điều khiến em mỉm cười, có người lắng nghe em và có thật nhiều lý do để thấy mình được yêu thương.",
  "Cảm ơn em vì đã cùng Miqi đi qua từng ấy tháng ngày, từ những chuyện nhỏ xíu đến những kỷ niệm mà sau này nghĩ lại chắc tụi mình vẫn sẽ cười. Anh không hứa lúc nào mình cũng hoàn hảo, nhưng anh hứa sẽ luôn cố gắng chân thành, lắng nghe em, cùng em sửa những điều chưa tốt và trân trọng tình yêu của tụi mình.",
  "Mong tụi mình sẽ còn được nắm tay nhau qua thật nhiều mùa 20/10 nữa nha. Em cứ vui vẻ là chính em, cứ theo đuổi những điều em mong muốn; lúc mệt thì nhớ rằng em vẫn có Miqi ở đây, sẵn sàng ôm em một cái thật lâu.",
  "Thương Tini nhiều lắmmmm. Happy 20/10, bé iu của Miqi. ♡"
];
const captions = ["Những ngày đầu tiên","Hai đứa mình nè","Một chuyến đi đáng nhớ","Nắm tay nhau","Mấy chiếc ảnh ngốc nghếch","Kỷ niệm màu hồng","Một buổi hẹn nhỏ","Cất giữ thật lâu","Cùng nhau lớn lên","Những điều bình thường","Vẫn là tụi mình","Còn nhiều chuyện phía trước"];

function showScreen(id) {
  screens.forEach((screenId) => {
    const el = $(screenId), active = screenId === id;
    el.classList.toggle("active", active);
    el.setAttribute("aria-hidden", String(!active));
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
function typeLetter() {
  const target = $("letterBody"); target.innerHTML = "";
  let pIndex = 0, charIndex = 0;
  const p = document.createElement("p"); target.appendChild(p);
  function tick() {
    if (pIndex >= letterParagraphs.length) return;
    const current = letterParagraphs[pIndex]; p.textContent = current.slice(0,charIndex+1); charIndex++;
    if (charIndex >= current.length) {
      pIndex++; charIndex = 0;
      if (pIndex < letterParagraphs.length) { const next = document.createElement("p"); target.appendChild(next); setTimeout(tick,350); }
    } else setTimeout(tick, current[charIndex-1] === " " ? 18 : 28);
  }
  tick();
}
function makeGallery() {
  const grid = $("photoGrid"); grid.innerHTML = "";
  for (let i=1;i<=12;i++) {
    const fig=document.createElement("figure"); fig.className="photo-card";
    fig.style.setProperty("--tilt",`${[-2,1.5,-1,2,-1.5,1][(i-1)%6]}deg`);
    const img=document.createElement("img");
    img.src=`./assets/images/ky-niem-${String(i).padStart(2,"0")}.jpg`;
    img.alt=`Kỷ niệm ${i} của Tini và Miqi`; img.loading=i>4?"lazy":"eager";
    img.onerror=()=>{ fig.style.display="none"; console.error("Không tải được ảnh:",img.src); };
    const cap=document.createElement("figcaption"); cap.textContent=captions[i-1]; fig.append(img,cap); grid.appendChild(fig);
  }
}
function makePetals() {
  const layer=$("petals"),symbols=["✿","❀","✧","♡"];
  for(let i=0;i<24;i++){const p=document.createElement("span");p.className="petal";p.textContent=symbols[Math.floor(Math.random()*symbols.length)];p.style.left=`${Math.random()*100}%`;p.style.fontSize=`${10+Math.random()*16}px`;p.style.animationDuration=`${8+Math.random()*12}s`;p.style.animationDelay=`${Math.random()*-18}s`;p.style.setProperty("--drift",`${Math.random()*180-90}px`);layer.appendChild(p);}
}
async function toggleMusic() {
  if (!audio) return;
  if (!musicOn) {
    try {
      await audio.play();
      musicOn = true;
      $("musicLabel").textContent = "Tắt nhạc";
      $("musicToggle").classList.add("playing");
    } catch (error) {
      $("musicLabel").textContent = "Thử bật nhạc lại";
      console.error("Không phát được nhạc:", error);
    }
  } else {
    audio.pause();
    musicOn = false;
    $("musicLabel").textContent = "Bật nhạc";
    $("musicToggle").classList.remove("playing");
  }
}
function openGift(){
  if(opened)return; opened=true; $("gift").classList.add("opened");
  toggleMusic();
  setTimeout(()=>{showScreen("letterScreen");typeLetter();},950);
}
$("gift").addEventListener("click",openGift);
$("gift").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openGift();}});
$("openGift").addEventListener("click",openGift);
$("musicToggle").addEventListener("click",toggleMusic);
$("toMemories").addEventListener("click",()=>showScreen("memoriesScreen"));
$("restart").addEventListener("click",()=>{opened=false;$("gift").classList.remove("opened");showScreen("welcome");});
makeGallery(); makePetals();
