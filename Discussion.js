let btn = document.getElementById("newSection");
let mainDiv = document.getElementById("content");
let questionSection = document.getElementsByClassName("question-section");
let flag = false;
let queFlag = false;
let queOpen = false;
let resolveOpen = false;
let isChangeImg = false;
let rightDevCreate = false;
let queNo;
let keyLen = 4;
let favourite;
let respDiv;
let respPara;
let respInnerDiv;
let newDiv1;
let newDiv
let newInnerDiv;
let h2,btnDiv,btn1,resolve;

if(localStorage.length != 0){
    let counter = 0;
    let key = 0;
    let div4 = document.getElementById("question");
    while(counter < localStorage.length){
        if(localStorage.getItem(`key${key}`)){
            let newDiv = document.createElement("div");
            let innernewDiv = document.createElement("div");
            innernewDiv.setAttribute("class","que");
            let imgDiv = document.createElement("div");
            let contentDiv = document.createElement("div");
            let img = document.createElement("img");
            let newH1 = document.createElement("h2");
            let newpara = document.createElement("p");
            let like = document.createElement("img");
            let dislike = document.createElement("img");
            like.addEventListener('click',likeFun);
            dislike.addEventListener('click',disLikeFun)
            let span = document.createElement("p");
            span.style["display"] = "inline";
            span.style["margin-left"] = "35px";
            let spanContentLike = document.createElement("span");
            let spanContentDislike = document.createElement("span");
            spanContentLike.setAttribute("class","spanLike");
            spanContentDislike.setAttribute("class","spanDLike");
            spanContentLike.setAttribute("id","slkey"+key);
            spanContentDislike.setAttribute("id","sdkey"+key);
            like.setAttribute("id","lkey"+key);
            dislike.setAttribute("id","dkey"+key);
            like.setAttribute("class","like");
            dislike.setAttribute("class","dislike");
            favourite = document.createElement("img");
            favourite.setAttribute("class","favImg");
            favourite.setAttribute("id","key"+key)
            imgDiv.setAttribute("class","imgDiv");
            contentDiv.classList.add("key"+key,"queContentDiv")
            newDiv.setAttribute("class","queList");
            
            let user = JSON.parse(window.localStorage.getItem('key'+key));
            spanContentLike.innerText = user.isLike;
            spanContentDislike.innerText = user.isDislike;
            like.setAttribute("src",user.LikeImg);
            dislike.setAttribute("src",user.dLikeImg);
            favourite.setAttribute("src",user.fav);
            favourite.addEventListener('click',changeImg);
            let timeStamp = document.createElement("p");
            timeStamp.setAttribute("class","timestamp");
            setInterval(Interval,1000);
            function Interval(){
                const time = Math.floor(new Date().getTime()/1000);
                let diff = time - user.time1;
                if(diff < 60){
                    timeStamp.innerText = "Submitted few seconds ago";
                }
                else if(diff >= 60 && diff < 3600){
                    let min = Math.floor(diff/60);
                    timeStamp.innerText = `Submitted ${min} min ago`;
                }
                else if(diff >= 3600 && diff < 86400){
                    let hour = Math.floor((diff/60)/60);
                    timeStamp.innerText = `Submitted ${hour} hour ago`;
                }
                else if(diff >= 86400 && diff < 2592000){
                    let days = Math.floor(((diff/60)/60)/24);
                    timeStamp.innerText = `Submitted ${days} day ago`;
                }
                else if(diff >= 2592000 && diff < 31104000){
                    let months = Math.floor((((diff/60)/60)/24)/30);
                    timeStamp.innerText = `Submitted ${months} month ago`;
                }
                else if(diff >= 31104000){
                    let year = Math.floor(((((diff/60)/60)/24)/30)/12);
                    timeStamp.innerText = `Submitted ${year} year ago`;
                }
            }
            newH1.innerText = user.subject;
            newpara.innerText = user.desc;
            img.setAttribute("src",user.img);
            imgDiv.appendChild(img);
            span.append(like,spanContentLike,dislike,spanContentDislike);
            contentDiv.append(newH1,newpara)
            innernewDiv.append(imgDiv,contentDiv)
            newDiv.append(innernewDiv,timeStamp,favourite,span);
            div4.appendChild(newDiv)
            questionSection[0].style["border-right"] = "1px solid #dcc6c6";
            newDiv.addEventListener('click',getData);
            key++;
            counter++;
        }
        else{
            key++;
        }
    }
}

btn.addEventListener('click',function(){
    if(queOpen){
        let rightDiv = document.getElementById("resolveId");
        rightDiv.remove();
        queOpen = false;
    }
    if(flag == false){
        let div = document.createElement("div");
        div.setAttribute("class","query-section");
        div.setAttribute("id","rightSection");

        let heading = document.createElement("h1");
        heading.textContent = "Welcome to Discussion Portal";

        let para = document.createElement("p");
        para.textContent = "Enter a subject and question to get started";

        let input = document.createElement("input");
        input.setAttribute("placeholder","Subject");
        input.setAttribute("class","subject");
        input.setAttribute("id","typeBar");
        
        let textarea = document.createElement("textarea");
        textarea.setAttribute("placeholder","Questions");
        textarea.setAttribute("class","textArea");
        textarea.setAttribute("id","description");
        
        let submitBtn = document.createElement("button");
        submitBtn.innerText = "Submit";
        submitBtn.setAttribute("class","submit");
        submitBtn.setAttribute("type","Submit");
        submitBtn.setAttribute("value","Submit");
        submitBtn.setAttribute("id","SubmitBtn");

        let div2 = document.createElement("div");
        div2.setAttribute("class","buttonDiv");
        div2.appendChild(submitBtn);

        let div1 = document.createElement("div");
        div1.append(input,textarea);
        div.append(heading,para,div1,div2);
        mainDiv.appendChild(div);
        questionSection[0].style["border-right"] = "1px solid #dcc6c6";
        flag = true;
        queFlag = false;
        submitBtn.addEventListener('click',Click);
    }
});
let key = -1;
function keyGenerator(){
    if(localStorage.length){
        key = -1;
        for(let i = 0;i<localStorage.length;i++){
            let e = localStorage.key(i).slice(3);
            if(key < e){
                key = e;
            }
        }
        key++
    }
    else{
        key = 0;
    }
}
function Click(){
    keyGenerator();
    if(queOpen){
        let rightDiv = document.getElementById("resolveId");
        rightDiv.remove();
        queFlag = false;
    }
    let div = document.getElementById("rightSection");
    let subject = document.getElementById("typeBar").value;
    let descp = document.getElementById("description").value;
    if(subject != "" && descp != ""){
        let obj = {
            "img":"person.png",
            "fav":"favourite.png",
            "subject":subject,
            "desc":descp,
            "isChangeImg":0,
            "isLike":0,
            "LikeImg":"like.png",
            "isDislike":0,
            "dLikeImg":"dislike.png"

        }
        
        localStorage.setItem("key"+key,JSON.stringify(obj));
        let div4 = document.getElementById("question");
        let newDiv = document.createElement("div");
        let innernewDiv = document.createElement("div");
        innernewDiv.setAttribute("class","que");
        let imgDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        let img = document.createElement("img");
        let newH1 = document.createElement("h2");
        let newpara = document.createElement("p");
        let like = document.createElement("img");
        let dislike = document.createElement("img");
        like.addEventListener('click',likeFun);
        dislike.addEventListener('click',disLikeFun);
        like.setAttribute("class","like");
        dislike.setAttribute("class","dislike");
        let span = document.createElement("p");
        span.style["display"] = "inline";
        span.style["margin-left"] = "35px";
        let spanContentLike = document.createElement("span");
        let spanContentDislike = document.createElement("span");
        spanContentLike.setAttribute("class","spanLike");
        spanContentDislike.setAttribute("class","spanDLike");
        like.setAttribute("id","lkey"+key);
        dislike.setAttribute("id","dkey"+key);
        spanContentLike.setAttribute("id","slkey"+key);
        spanContentDislike.setAttribute("id","sdkey"+key);
        favourite = document.createElement("img"); 
        favourite.setAttribute("id","key"+key)
        favourite.setAttribute("class","favImg");
        favourite.addEventListener('click',changeImg);
        let timeStamp = document.createElement("p");
        timeStamp.setAttribute("class","timestamp");
        const time = Math.floor(new Date().getTime()/1000);
        let user = JSON.parse(window.localStorage.getItem('key'+key));
        if('time1' in user == false){
            user.time1 = time;
            timeStamp.innerText = "Submitted few seconds ago";
        }
        setInterval(Interval2,1000);
            function Interval2(){
                const time = Math.floor(new Date().getTime()/1000);
                let diff = time - user.time1;
                if(diff < 60){
                    timeStamp.innerText = "Submitted few seconds ago";
                }
                else if(diff >= 60 && diff < 3600){
                    let min = Math.floor(diff/60);
                    timeStamp.innerText = `Submitted ${min} min ago`;
                }
                else if(diff >= 3600 && diff < 86400){
                    let hour = Math.floor((diff/60)/60);
                    timeStamp.innerText = `Submitted ${hour} hour ago`;
                }
                else if(diff >= 86400 && diff < 2592000){
                    let days = Math.floor(((diff/60)/60)/24);
                    timeStamp.innerText = `Submitted ${days} day ago`;
                }
                else if(diff >= 2592000 && diff < 31104000){
                    let months = Math.floor((((diff/60)/60)/24)/30);
                    timeStamp.innerText = `Submitted ${months} month ago`;
                }
                else if(diff >= 31104000){
                    let year = Math.floor(((((diff/60)/60)/24)/30)/12);
                    timeStamp.innerText = `Submitted ${year} year ago`;
                }
            }
        favourite.setAttribute("src",user.fav);
        like.setAttribute("src",user.LikeImg);
        dislike.setAttribute("src",user.dLikeImg);
        spanContentLike.innerText = user.isLike;
        spanContentDislike.innerText = user.isDislike;
        localStorage.setItem("key"+key,JSON.stringify(user));
        imgDiv.setAttribute("class","imgDiv");
        contentDiv.classList.add("key"+key,"queContentDiv");
        newDiv.setAttribute("class","queList");
        newH1.innerText = user.subject;
        newpara.innerText = user.desc;
        img.setAttribute("src",user.img);
        imgDiv.appendChild(img);
        span.append(like,spanContentLike,dislike,spanContentDislike);
        contentDiv.append(newH1,newpara)
        innernewDiv.append(imgDiv,contentDiv);
        newDiv.append(innernewDiv,timeStamp,favourite,span);
        div4.appendChild(newDiv)
        document.getElementById("typeBar").value = "";
        document.getElementById("description").value = "";
        flag = false
        queFlag = false;
        div.remove();
        newDiv.addEventListener('click',getData);
        // key++;
    }
    else{
        alert("Please fill all fields");
    }
}

function getData(event){
    if(flag && event.target.id){
    }
    else if(!flag && event.target.id){
    }
    else{
        if(flag){
            let right = document.getElementById("rightSection");
            right.remove();
            flag = false;
        }
        if(queOpen){
            let right = document.getElementById("resolveId");
            right.remove();
            queFlag = false;
        }
        if(!queFlag){
            let target = event.target.children;
            if(target.length == 2){
                target = target[1];
            }
            else{
               target = target[0]; 
               target = target.lastElementChild;
            }
            if(target && !target.id){
                rightDevCreate = true
                newDiv = document.createElement("div");
                newDiv.setAttribute("class","resolveSection");
                newDiv.setAttribute("id","resolveId");
                newDiv1 = document.createElement("div");
                h2 = document.createElement("h2");
                h2.innerText = "Question:"
                h2.setAttribute("class","resolveQuestion");
                newInnerDiv = document.createElement("div");
                newInnerDiv.setAttribute("class","queDesc");
                keyLen = target.className.indexOf(" ");
                queNo = target.className.slice(0,keyLen);
                let newH2 = document.createElement("h2");
                let newPara = document.createElement("p");
                newH2.innerText = target.firstElementChild.innerText;
                newPara.innerText = target.lastElementChild.innerText;
                newInnerDiv.append(newH2,newPara);
                btnDiv = document.createElement("div");
                btnDiv.setAttribute("class","resolveDiv");
                resolve = document.createElement("btn");
                resolve.setAttribute("class","resolve");
                resolve.innerText = "Resolve";
                resolve.addEventListener('click',deleteQue);
                btn1 = document.createElement("button");
                btn1.innerText = "Add Response";
                btn1.setAttribute("class","resolveBtn");
                btnDiv.append(resolve,btn1);
                respDiv = document.createElement("div");
                respPara = document.createElement("p");
                respPara.innerText = "Response:";
                respInnerDiv = document.createElement("div");
                respInnerDiv.setAttribute("class","allResponses");
                let user = JSON.parse(window.localStorage.getItem(queNo));
                let newName;
                let newDesc;
                let responseOfUser
                if(user){
                    if('arr1' in user){
                        for(let i = 0;i<user.arr1.length;i++){
                            responseOfUser = document.createElement("div");
                            responseOfUser.setAttribute("class","userResponse"); 
                            newName = document.createElement("h2");
                            newDesc = document.createElement("p");
                            let timepara = document.createElement("p");
                            timepara.setAttribute("class","timepara");
                            setInterval(responseInterval,1000);
                            function responseInterval(){
                                const time = Math.floor(new Date().getTime()/1000);
                                let diff = time - user.arr1[i].time1;
                                if(diff < 60){
                                    timepara.innerText = "Submitted few seconds ago";
                                }
                                else if(diff >= 60 && diff < 3600){
                                    let min = Math.floor(diff/60);
                                    timepara.innerText = `Submitted ${min} min ago`;
                                }
                                else if(diff >= 3600 && diff < 86400){
                                    let hour = Math.floor((diff/60)/60);
                                    timepara.innerText = `Submitted ${hour} hour ago`;
                                }
                                else if(diff >= 86400 && diff < 2592000){
                                    let days = Math.floor(((diff/60)/60)/24);
                                    timepara.innerText = `Submitted ${days} day ago`;
                                }
                                else if(diff >= 2592000 && diff < 31104000){
                                    let months = Math.floor((((diff/60)/60)/24)/30);
                                    timepara.innerText = `Submitted ${months} month ago`;
                                }
                                else if(diff >= 31104000){
                                    let year = Math.floor(((((diff/60)/60)/24)/30)/12);
                                    timepara.innerText = `Submitted ${year} year ago`;
                                }
                            }
                            newName.innerText = user.arr1[i].subject;
                            newDesc.innerText = user.arr1[i].resp;
                            responseOfUser.append(newName,newDesc,timepara);
                            respInnerDiv.append(responseOfUser);
                            
                        }
                    }
                }
            }
            if(rightDevCreate){
                respDiv.append(respPara,respInnerDiv);
                newDiv1.append(h2,newInnerDiv,btnDiv);
                newDiv.append(newDiv1,respDiv);
                mainDiv.appendChild(newDiv);
                queFlag = true;
                queOpen = true;
                flag = false;
                resolveOpen = false;
                btn1.addEventListener('click',addResponse);
            }
        }
    }
}

function addResponse(){
        if(!resolveOpen){
            let div = document.createElement("div");
            div.setAttribute("class","commentBox");

            let input = document.createElement("input");
            input.setAttribute("placeholder","Subject");
            input.setAttribute("class","Enter Name");
            input.setAttribute("id","subject");
            
            let textarea = document.createElement("textarea");
            textarea.setAttribute("placeholder","Enter Comment");
            textarea.setAttribute("class","textArea");
            textarea.setAttribute("id","comment");

            let submitBtn = document.createElement("button");
            submitBtn.innerText = "Submit";
            submitBtn.setAttribute("class","submit");
            submitBtn.setAttribute("type","Submit");

            let div2 = document.createElement("div");
            div2.setAttribute("class","buttonDiv");
            div2.appendChild(submitBtn);
            
            let para = document.createElement("p");
            para.textContent = "Add Response";

            div.append(para,input,textarea,div2);
            let right = document.getElementById("resolveId");
            right.appendChild(div);
            resolveOpen = true;
            submitBtn.addEventListener('click',submitResponse);
        }
}

let arr = []
let i = 0;
function submitResponse(){
    let subj = document.getElementById("subject").value;
    let resp = document.getElementById("comment").value;
    if(subj != "" && resp != ""){
        let obj = {
            "subject":subj,
            "resp":resp
        };
        let user = JSON.parse(localStorage.getItem(queNo));
        if('arr1' in user == false){
            arr = [];
            i = 0;
        }
        else{
            if(!arr.length){
                arr.push(...user.arr1);
                i = arr.length;
            }
            else{
                i = arr.length;
            }
        }
        arr.push(obj); 
        user.arr1 = arr;
        let timepara = document.createElement("p");
        timepara.setAttribute("class","timepara");
        const time = Math.floor(new Date().getTime()/1000);
        if('time1' in user.arr1[i] == false){
            user.arr1[i].time1 = time;
            timepara.innerText = "Submitted few seconds ago";
        }
        setInterval(respInterval,1000);
        function respInterval(){
            const time = Math.floor(new Date().getTime()/1000);
            let diff = time - user.arr1[i].time1; 
            if(diff < 60){
                timepara.innerText = "Submitted few seconds ago";
            }
            else if(diff >= 60 && diff < 3600){
                let min = Math.floor(diff/60);
                timepara.innerText = `Submitted ${min} min ago`;
            }
            else if(diff >= 3600 && diff < 86400){
                let hour = Math.floor((diff/60)/60);
                timepara.innerText = `Submitted ${hour} hour ago`;
            }
            else if(diff >= 86400 && diff < 2592000){
                let days = Math.floor(((diff/60)/60)/24);
                timepara.innerText = `Submitted ${days} day ago`;
            }
            else if(diff >= 2592000 && diff < 31104000){
                let months = Math.floor((((diff/60)/60)/24)/30);
                timepara.innerText = `Submitted ${months} month ago`;
            }
            else if(diff >= 31104000){
                let year = Math.floor(((((diff/60)/60)/24)/30)/12);
                timepara.innerText = `Submitted ${year} year ago`;
            }
        }
        localStorage.setItem(queNo,JSON.stringify(user));
        let responseDiv = document.getElementsByClassName("allResponses");
        let responseOfUser = document.createElement("div");
        responseOfUser.setAttribute("class","userResponse"); 
        let newName = document.createElement("h2");
        let newDesc = document.createElement("p");
        newName.innerText = subj;
        newDesc.innerText = resp;
        responseOfUser.append(newName,newDesc,timepara);
        responseDiv[0].append(responseOfUser);
        document.getElementById("subject").value = "";
        document.getElementById("comment").value = "";
    }
    else{
        alert("Please Fill all Fields");
    }
}

function changeImg(event){
    if(resolveOpen == true){
        let remove1 = document.getElementsByClassName("commentBox")
        remove1[0].remove();
        resolveOpen = false;
    }
    let user = JSON.parse(localStorage.getItem(event.target.id));
    let img = event.target;
    if(user.isChangeImg == 0){
        user.fav = "fillFavourite.png"
        img.setAttribute("src","fillFavourite.png");
        user.isChangeImg = 1;
    }
    else{
        user.fav = "favourite.png";
        img.setAttribute("src","favourite.png");
        user.isChangeImg = 0;
    }
    localStorage.setItem(event.target.id,JSON.stringify(user));
}

function likeFun(event){
    let targetid = event.target.id.slice(1);
    let user = JSON.parse(localStorage.getItem(targetid));
    let text = document.getElementById(`sl${targetid}`);
    user.isLike++;
    text.innerText = user.isLike
    localStorage.setItem(targetid,JSON.stringify(user))
}

function disLikeFun(event){
    let targetid = event.target.id.slice(1);
    let user = JSON.parse(localStorage.getItem(targetid));
    let text = document.getElementById(`sd${targetid}`);
    user.isDislike++;
    text.innerText = user.isDislike
    localStorage.setItem(targetid,JSON.stringify(user))
}

function searchWord() {
    for(let i = 0;i<localStorage.length;i++){
        let elem = document.getElementsByClassName("queContentDiv");
        let obj = new Mark(elem[i]);
        obj.unmark();
        obj.mark(
            document.getElementById("search").value,
        );
    }
}

function deleteQue(){
    localStorage.removeItem(queNo);
    let elem = document.getElementsByClassName(queNo);
    elem[0].parentNode.parentNode.remove();
    let rightDiv = document.getElementById("resolveId");
    rightDiv.remove();
    queOpen = false;
}
