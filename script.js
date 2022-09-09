
const textelememt = document.querySelector("[data-text]")
//accessing the webcam
const video = document.querySelector("video");

async function setup(){
    const stream = await navigator.mediaDevices.getUserMedia({video:true});
    video.srcObject = stream;


    //adding event listner - asa video starts playing or if you pause and restart
    video.addEventListener("playing" ,async ()=>{
        //A worker is how you interact with Tesseract and start img recog
        const worker = Tesseract.createWorker(); 

        //configure our worker
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");


        //to get image from video
        // 1. creatinig canvas
        const canvas = document.createElement("canvas")
        canvas.width=video.width;
        canvas.height=video.height;

        //2. img frm vid
        document.getElementById('clickme').addEventListener("click",async e=>{
            e.preventDefault();
            canvas.getContext("2d").drawImage(video,0,0,video.width,video.height);

            // const obj = await worker.recognize(canvas);
            // console.log(obj);

            const {data:{text}} = await worker.recognize(canvas);
            console.log(text);
            
            //to read text
            speechSynthesis.speak(new SpeechSynthesisUtterance(text.replace(/\s/g," ")))
            textelememt.textContent = text;




        })
    })
}
setup();