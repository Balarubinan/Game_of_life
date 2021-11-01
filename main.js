let gridsize=64 //no of cells
// Black => Alive Cell
// White => Dead Cell
function main(){
    let start_btn=document.createElement("button")
    start_btn.onclick=start_loop
    start_btn.innerText="Step next"
    document.body.append(start_btn)

    let reset_btn=document.createElement("button")
    reset_btn.onclick=ResetGrid
    reset_btn.innerText="reset Grid"
    document.body.append(reset_btn)

    document.body.append(document.createTextNode("   Iteration : "))

    window.GenLabel=document.createElement("label")
    GenLabel.textContent="0"
    document.body.append(GenLabel)

    document.body.append(document.createElement("br"))
    var print=e=>console.log(e)
    print("inside main")
    var btn_arr=[]
    let tmp_arr=[]
    window.btn_arr=btn_arr

    for(let i=1;i<gridsize**2+1;i++){
        let elem=document.createElement("button")
        elem.style.backgroundColor="white"
        // tmp_arr.push(elem)
        elem.onclick=()=>{
            // print("Called me")
            if(elem.style.backgroundColor=="black")
                elem.style.backgroundColor="white"
            else
                elem.style.backgroundColor="black"
        }
        elem.innerText=1..toString() // if empty buttons just shrink
        elem.style.color="white"
        tmp_arr.push(elem)
        document.body.append(elem)
        if(i%gridsize==0){
        btn_arr.push(tmp_arr)
        tmp_arr=[]
        document.body.append(document.createElement("br"))
        }
    }
}

// Returns Count of Adjacent Alive cells
function AdjacentLives(ig,jg){
    let cnt=0;
    for(let j=ig-1;j<=ig+1;j++)
    for(let k=jg-1;k<=jg+1;k++)
    {
        let n=btn_arr.length
        if(j<n&&j>=0&&k<n&&k>=0&&(j!=ig||k!=jg))
        if(btn_arr[j][k].style.backgroundColor=="black"){
            cnt++;
        }
    }
    return cnt;
}
// function toggle(i,j){
//     // console.log(btn_arr[i][j])
//     let elem=btn_arr[i][j]
//     if(elem.style.backgroundColor??"no"=="black")
//         elem.style.backgroundColor="white"
//     else
//         elem.style.backgroundColor="black"
// }

// LoopInterval var => clearInteval
function start_loop(){
    LoopInterval=setInterval(start_clicked,50);
}

function start_clicked(){
    GenLabel.textContent=parseInt(GenLabel.textContent)+1
    for(let i=0;i<gridsize;i++)
    for(let j=0;j<gridsize;j++){
        let r=AdjacentLives(i,j)

        // If 3 alive and current is alive too => cell dies
        if(r==3&&btn_arr[i][j].style.backgroundColor!="black")
        btn_arr[i][j].nextState="black"
        // 2 or 3 neighbours alive => cell retains state
        else if((r==3||r==2)&&btn_arr[i][j]!="white")
        continue;
        // else cell dies
        else
        btn_arr[i][j].nextState="white"
    }

    // Actual updation 
    for(let i=0;i<gridsize;i++)
    for(let j=0;j<gridsize;j++){
        btn_arr[i][j].style.backgroundColor=btn_arr[i][j].nextState
        btn_arr[i][j].style.color=btn_arr[i][j].nextState
    }

    // console.log(shouldLive(4,4))
}

function ResetGrid(){
    GenLabel.textContent="0"
    clearInterval(LoopInterval);
    for(let i=0;i<gridsize;i++)
    for(let j=0;j<gridsize;j++){
        btn_arr[i][j].style.backgroundColor="white"
        btn_arr[i][j].nextState="white"
    }
}
// calling main as soon as window loads
setTimeout(main,0)

// variable size
// generation number 
// Spawn automatons
// Reset

