import React, {useEffect, useState} from "react";
import axios from "axios";
import EquationGeneration from './EquationGeneration';
import {create, all} from 'mathjs';



const Main = (props) =>{

    const config = { }
    const math = create(all, config)

    const equationLength = 10;
    const numberOfGuesses = 6;
    const numOfOpsToReveal = 2;
    const numRevealedChars = 4;

    let todaysEquation = "";
    let todaysSolution = "";
    let todaysReveal = "";
    const [todaysRev, setTodaysRev] = useState("");
    const [todaysRevealSorted, setTodaysRevealSorted] = useState("");

    const [currentRow, setCurrentRow] = useState(1);
    let currentCol = 1;
    let indexList = "0123456789";
    let finalEqValueList = "";
    let eqLength = [];
    let numGuesses = [];

    const [eq, setEq] = useState("");
    const [solutionFin, setSolutionFin] = useState("");

    const [finalIndexList, setFinalIndexList] = useState("")
    const [indexListCounter, setIndexListCounter] = useState(0)

    const [currentSol, setCurrentSol] = useState("");
    const [currentEq, setCurrentEq] = useState("");
    const [isEqEnd, setIsEqEnd] = useState(false);

    for(let i = 0; i < equationLength; i++){
        eqLength.push(i+1)
    }

    for(let i = 0; i < numberOfGuesses; i++){
        numGuesses.push(i+1)
    }


    function isValidToEval(){
        let opError = false;
        let opCounter = 0;
        let firstIndexCounted = false
        const possibleOps = "^*/+-";

        for(let i = 1; i < finalEqValueList.length; i++){
            if( (possibleOps.includes(finalEqValueList[i]) && possibleOps.includes(finalEqValueList[i-1])) ){
                opError = true;
            }
            if (possibleOps.includes(finalEqValueList[0]) && !firstIndexCounted){
                opCounter++;
                firstIndexCounted = true;
            }
            if (possibleOps.includes(finalEqValueList[i])){
                opCounter++;
            }
        }
        if( possibleOps.includes(finalEqValueList[0]) ||  possibleOps.includes(finalEqValueList[finalEqValueList.length-1]) || finalEqValueList === "" || opCounter === 0){
            opError = true;
        }

        return !(opError)
    }

    const keyPress = (value) =>{

        if(currentRow === 7){
            return;
        }

        if (indexListCounter < finalIndexList.length){
            let temp = parseInt(finalIndexList[indexListCounter]) + 1;
            temp = temp.toString()
            document.getElementById(`row${currentRow}col${temp}`).innerHTML = value;
            setCurrentEq(currentEq + value.toString())
            setIndexListCounter(indexListCounter + 1)
        } else if (indexListCounter === finalIndexList.length) {
            let temp = parseInt(finalIndexList[indexListCounter-1]) + 1;
            document.getElementById(`row${currentRow}col${temp}`).innerHTML = value;
            setCurrentEq(currentEq.substring(0,finalIndexList.length-1) + value.toString());
        }
            
        else{
            return;
        }

        evalu();
    }
    
    const delPress = () =>{

        if(currentRow === 7){
            return;
        }

        if ( indexListCounter === finalIndexList.length){
        
            let temp = parseInt(finalIndexList[indexListCounter-1])+1
            document.getElementById(`row${currentRow}col${temp}`).innerHTML = "";
            setCurrentEq(currentEq.substring(0,(indexListCounter-1)));
            setIndexListCounter(indexListCounter - 1);

        } else if (indexListCounter > 0) {
            let temp = parseInt(finalIndexList[indexListCounter-1]) + 1;
            document.getElementById(`row${currentRow}col${temp}`).innerHTML = "";
            setCurrentEq(currentEq.substring(0,(indexListCounter-1)));
            setIndexListCounter(indexListCounter - 1)
        }
            
        else{
            return;
        }

        evalu();
    }

    function evalu(){

        if(currentEq === ""){
            return;
        }

        let liveEq = "";
        let error = false

        for(let i = 0; i < equationLength; i++){
            let tmp1 = (i+1).toString();
            let tmp2 = document.getElementById(`row${currentRow}col${tmp1}`).innerHTML;
            liveEq += tmp2;
        }

        for(let j = 1; j < liveEq.length; j++){
            if("^*/+-".includes(liveEq[j] && "^*/+-".includes(liveEq[j-1]))){
                error = true;
            }
        }
        
        if ("^*/+-".includes(liveEq[0]) || "^*/+-".includes(liveEq[liveEq.length-1])){
            error = true;
        }

        if(!error){
            liveEval();
        } else {
            document.getElementById(`ans${currentRow}spot1`).innerHTML = "-";
            document.getElementById(`ans${currentRow}spot2`).innerHTML = "-";
            document.getElementById(`ans${currentRow}spot3`).innerHTML = "-";
        } 
    }

    function liveEval() {
        let liveEq = "";

        for(let i = 0; i < equationLength; i++){
            let tmp1 = (i+1).toString();
            let tmp2 = document.getElementById(`row${currentRow}col${tmp1}`).innerHTML;
            liveEq += tmp2;
        }

        let answer = (math.evaluate(liveEq));

        if( answer < 1 || answer > 999){
            document.getElementById(`ans${currentRow}spot1`).innerHTML = "O";
            document.getElementById(`ans${currentRow}spot2`).innerHTML = "U";
            document.getElementById(`ans${currentRow}spot3`).innerHTML = "T";
        } else{
            if(answer.toString().length === 1){
                answer = ("00" + answer.toString());
                document.getElementById(`ans${currentRow}spot1`).innerHTML = answer.toString()[0];
                document.getElementById(`ans${currentRow}spot2`).innerHTML = answer.toString()[1];
                document.getElementById(`ans${currentRow}spot3`).innerHTML = answer.toString()[2];
            } else if (answer.toString().length === 2){
                answer = ("0" + answer.toString());
                document.getElementById(`ans${currentRow}spot1`).innerHTML = answer.toString()[0];
                document.getElementById(`ans${currentRow}spot2`).innerHTML = answer.toString()[1];
                document.getElementById(`ans${currentRow}spot3`).innerHTML = answer.toString()[2];
            } else {
                document.getElementById(`ans${currentRow}spot1`).innerHTML = answer.toString()[0];
                document.getElementById(`ans${currentRow}spot2`).innerHTML = answer.toString()[1];
                document.getElementById(`ans${currentRow}spot3`).innerHTML = answer.toString()[2];
            }
        }

    }

    const enterPress = () => {

        if(currentRow === 7){
            return;
        }

        let parseLength = (parseInt(currentEq.length) + parseInt(todaysRev.length))

        if( parseLength !== equationLength){
            alert("Invalid Equation: Please use all 10 characters.");
            return;
        }

        let j = 0;
        for(let i = 0; i < equationLength; i++){
            let testerChar = i.toString();
            if(finalIndexList.includes(testerChar)){
                finalEqValueList += currentEq[j];
                j++;
            } else {
                finalEqValueList += eq[i];
            }
        }

        if(isValidToEval()){

            let answer = (math.evaluate(finalEqValueList));
            
            if(finalEqValueList.length !== equationLength){
                alert("Invalid Equation: Please use all 10 characters.")
            }
            else if((Number.isInteger(answer)) || answer >= 1 || answer <= 999){
                submission();
            }
            else {
                alert("Invalid Equation: Please correct and try again.")
            }

        } else if (!isValidToEval()) {
            alert("Invalid Equation: Please correct and try again.")
        }
    }

    function reveal(){

        isRevealed = true;
        let todaysColumns = []

        for(let t = 0; t < todaysReveal.length; t++){
            let tmp = parseInt(todaysReveal[t])
            let tmp2 = tmp + 1
            todaysColumns.push(tmp2);
        }

        for(let y = 0; y < numberOfGuesses; y++){
            for(let z = 0; z < todaysReveal.length; z++){
                document.getElementById(`row${y+1}col${todaysColumns[z]}`).innerHTML = todaysEquation[todaysReveal[z]];
                document.getElementById(`row${y+1}col${todaysColumns[z]}`).className = "correctDig";
            }
        }

        for(let g = 0; g < indexList.length; g++){
            indexList = indexList.replace(todaysReveal[g], '')
        }

        setFinalIndexList(indexList);         

        let todaysRevealSortHolder = [];
        for(let s = 0; s < todaysReveal.length; s++){
            todaysRevealSortHolder.push(todaysReveal[s]); 
        }
        todaysRevealSortHolder.sort();

        let tmpString = ""
        for(let t = 0; t < todaysRevealSortHolder.length; t++){
            tmpString += todaysRevealSortHolder[t];
        }
        setTodaysRevealSorted(tmpString);
        setTodaysRev(todaysReveal);

    }

    let isRevealed = false

    const startReveal = () =>{
        setTimeout(function() {
            if(!isRevealed){
                reveal();
            }
        }, 1000)
    }

    function submission(){

        let charList = ""
        let answer = (math.evaluate(finalEqValueList)).toString();

        if(answer.length === 1){
            answer = ("00" + answer);
        } else if (answer.length === 2){
            answer = ("0" + answer);
        } else if (parseInt(answer) > 999 || parseInt(answer) < 0 || answer.includes("-")){
            answer = "OUT"
            document.getElementById(`ans${currentRow}spot1`).className = "wrongDig";
            document.getElementById(`ans${currentRow}spot2`).className = "wrongDig";
            document.getElementById(`ans${currentRow}spot3`).className = "wrongDig";
        }

        if(answer[0] === solutionFin[0]){
            document.getElementById(`ans${currentRow}spot1`).innerHTML = answer[0];
            document.getElementById(`ans${currentRow}spot1`).className = "correctDig";
        } else if (answer[0] === solutionFin[1] && answer[1] !== solutionFin[1]){
            document.getElementById(`ans${currentRow}spot1`).innerHTML = answer[0];
            document.getElementById(`ans${currentRow}spot1`).className = "nearDig";
        } else if (answer[0] === solutionFin[2] && answer[2] !== solutionFin[2]){
            document.getElementById(`ans${currentRow}spot1`).innerHTML = answer[0];
            document.getElementById(`ans${currentRow}spot1`).className = "nearDig";
        } else {
            document.getElementById(`ans${currentRow}spot1`).innerHTML = answer[0];
            document.getElementById(`ans${currentRow}spot1`).className = "notInEq";
        }

        if (answer[1] === solutionFin[1]){
            document.getElementById(`ans${currentRow}spot2`).innerHTML = answer[1];
            document.getElementById(`ans${currentRow}spot2`).className = "correctDig";
        } else if (answer[1] === solutionFin[0] && answer[0] !== solutionFin[0]){
            document.getElementById(`ans${currentRow}spot2`).innerHTML = answer[1];
            document.getElementById(`ans${currentRow}spot2`).className = "nearDig";
        } else if (answer[1] === solutionFin[2] && answer[2] !== solutionFin[2]){
            document.getElementById(`ans${currentRow}spot2`).innerHTML = answer[1];
            document.getElementById(`ans${currentRow}spot2`).className = "nearDig";
        } else {
            document.getElementById(`ans${currentRow}spot2`).innerHTML = answer[1];
            document.getElementById(`ans${currentRow}spot2`).className = "notInEq";
        }

        if (answer[2] === solutionFin[2]){
            document.getElementById(`ans${currentRow}spot3`).innerHTML = answer[2];
            document.getElementById(`ans${currentRow}spot3`).className = "correctDig";
        } else if (answer[2] === solutionFin[0] && answer[0] !== solutionFin[0]){
            document.getElementById(`ans${currentRow}spot3`).innerHTML = answer[2];
            document.getElementById(`ans${currentRow}spot3`).className = "nearDig";
        } else if (answer[2] === solutionFin[1] && answer[1] !== solutionFin[1]){
            document.getElementById(`ans${currentRow}spot3`).innerHTML = answer[2];
            document.getElementById(`ans${currentRow}spot3`).className = "nearDig";
        } else {
            document.getElementById(`ans${currentRow}spot3`).innerHTML = answer[2];
            document.getElementById(`ans${currentRow}spot3`).className = "notInEq";
        }

        if(answer === solutionFin & finalEqValueList === eq){
            for(let i = 1; i <= equationLength; i++){
                document.getElementById(`row${currentRow}col${i}`).className = "correctDig";
            }
            setCurrentRow(7);
            gameWin();
            return;

        } else if(currentRow === 6){
            setCurrentRow(7);
            gameLose();
            return;
        } else {

            
            for(let d = 0; d < finalIndexList.length; d++){
                let tmpp = finalIndexList[d];
                charList += eq[tmpp]
            }

            let guessInxSolutionNums = ""
            for(let h = 0; h < finalIndexList.length; h++){
                let temp = finalIndexList[h];
                guessInxSolutionNums += eq[temp];
            }

            for(let a = 0; a < currentEq.length; a++){

                let temporary = finalIndexList[a]
                let pTemporary = parseInt(temporary) + 1
                let hold1 = document.getElementById(`row${currentRow}col${pTemporary}`).innerHTML;
                let hold2 = parseInt(charList.indexOf(hold1));
                let hold3 = 0;
                let hold4 = 0;
                let hold5 = -1;
                if(hold2 === -1){
                    document.getElementById(`row${currentRow}col${pTemporary}`).className = "notInEq"
                    for(let i = 0; i < 16; i++){
                        let tmp = document.getElementById(`key_${i}`).innerHTML;
                        let tmp2 = currentEq[a];
                        if(tmp === tmp2 && (!guessInxSolutionNums.includes(tmp2))){
                            document.getElementById(`key_${i}`).className = "col-2 key_pressed";
                        }
                    }
                } else {
                    hold3 = finalIndexList[hold2];
                    hold4 = parseInt(hold3) + 1
                    hold5 = document.getElementById(`row${currentRow}col${hold4}`).innerHTML
                }
            

                if (hold1 === eq[temporary]){
                    document.getElementById(`row${currentRow}col${pTemporary}`).className = "correctDig"
                } else if(hold1 === -1){
                    document.getElementById(`row${currentRow}col${pTemporary}`).className = "notInEq"
                    for(let i = 0; i < 16; i++){
                        let tmp = document.getElementById(`key_${i}`).innerHTML;
                        let tmp2 = currentEq[a];
                        if(tmp === tmp2 && (!guessInxSolutionNums.includes(tmp2))){
                            document.getElementById(`key_${i}`).className = "col-2 key_pressed";
                        }
                    }
                }
                else if(charList.includes(hold1) && eq[hold3] !== hold5 ){
                    document.getElementById(`row${currentRow}col${pTemporary}`).className = "nearDig"
                } else {
                    document.getElementById(`row${currentRow}col${pTemporary}`).className = "notInEq"
                    for(let i = 0; i < 16; i++){
                        let tmp = document.getElementById(`key_${i}`).innerHTML;
                        let tmp2 = currentEq[a];
                        if(tmp === tmp2 && (!guessInxSolutionNums.includes(tmp2))){
                            document.getElementById(`key_${i}`).className = "col-2 key_pressed";
                        }
                    }
                }
            }

            setCurrentEq("");
            if(currentRow < 6){
                setCurrentRow(currentRow+1)
            }
            setIndexListCounter(0);
            return;
        }

    }

    function gameWin(){
        alert("winner!!!")
    }

    function gameLose(){
        alert("Loser!")
    }

    useEffect(()=>{
        var today = new Date();
        today = today.toString().substring(4,15).replace(/\s+/g, '');

        axios.get(`http://localhost:8000/api/numericle/today/${today}`)
            .then((res)=>{
                // console.log(res);
                console.log(res.data.revealindexes);
                todaysEquation = res.data.equation;
                todaysSolution = res.data.solution;
                todaysReveal = res.data.revealindexes;
                setEq(res.data.equation);
                setSolutionFin(res.data.solution);

                
            })
            .catch((err)=>{
                console.log("Fetch today's Eq find query failed");
                console.log(err);
            })
            startReveal();
    },[])


    useEffect(()=>{
        evalu();
    },[currentEq])

    return (
        
        <div className="container mt-3 mb-3">
            
            <EquationGeneration eq={eq} solutionFin={solutionFin} setEq={setEq} setSolutionFin={setSolutionFin}/>
            
            {
                numGuesses.map((row,index)=>(
                    <div key={index} className="d-flex justify-content-center">
                        {eqLength.map((col,index)=>(
                            <div key={index}>
                                <p className="guessGrid" id={`row${row}col${col}`}></p>
                            </div>
                        ))}
                        <p className="equals">=</p>
                        <p className="guessGridAns" id={`ans${row}spot1`}></p>
                        <p className="guessGridAns" id={`ans${row}spot2`}></p>
                        <p className="guessGridAns" id={`ans${row}spot3`}></p>
                    </div>
                ))
            }

            <hr className="mt-3 mb-3"/>

            <div id="keypad_interface" className="">
                <div id="row7" className="d-flex row justify-content-center">
                    <p onClick={()=>keyPress(1)} className="col-2 key_unselected" id="key_1">1</p>
                    <p onClick={()=>keyPress(2)} className="col-2 key_unselected" id="key_2">2</p>
                    <p onClick={()=>keyPress(3)} className="col-2 key_unselected" id="key_3">3</p>
                    <p onClick={()=>keyPress("+")} className="col-2 key_unselected" id="key_10">+</p>
                    <p onClick={()=>keyPress("-")} className="col-2 key_unselected" id="key_11">-</p>
                    <p onClick={()=>delPress()} className="col-2 key_enterDelete" id="key_delete">Del</p>
                </div>
                <div id="row8" className="d-flex row justify-content-center">
                    <p onClick={()=>keyPress(4)}  className="col-2 key_unselected" id="key_4">4</p>
                    <p onClick={()=>keyPress(5)}  className="col-2 key_unselected" id="key_5">5</p>
                    <p onClick={()=>keyPress(6)}  className="col-2 key_unselected" id="key_6">6</p>
                    <p onClick={()=>keyPress("^")} className="col-2 key_unselected" id="key_12">^</p>
                    <p onClick={()=>enterPress()} className="col-4 key_enterDelete" id="key_13"> Enter </p>
                </div>
                <div id="row9" className="d-flex row justify-content-center">
                    <p onClick={()=>keyPress(7)}  className="col-2 key_unselected" id="key_7">7</p>
                    <p onClick={()=>keyPress(8)}  className="col-2 key_unselected" id="key_8">8</p>
                    <p onClick={()=>keyPress(9)}  className="col-2 key_unselected" id="key_9">9</p>
                    <p onClick={()=>keyPress(0)}  className="col-2 key_unselected" id="key_0">0</p>
                    <p onClick={()=>keyPress("*")}  className="col-2 key_unselected" id="key_14">*</p>
                    <p onClick={()=>keyPress("/")} className="col-2 key_unselected" id="key_15">/</p>
                    {/* <p onClick={()=>check()} className="key_unselected">Test</p> */}
                    
                </div>
                <div id="row10" className="d-flex justify-content-center">
                    
                </div>
            </div>

        </div>
    )
}



export default Main;