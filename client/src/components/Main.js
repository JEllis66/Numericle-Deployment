import React, {useEffect, useState} from "react";
import axios from "axios";
import EquationGeneration from './EquationGeneration';
import {create, all} from 'mathjs';
import copy from '../images/copy.png';
import copy2 from '../images/copy_hover.png';
import GameOver from "./GameOver";



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
    const [currentCol, setCurrentCol] = useState(0);
    const [colCounter, setColCounter] = useState(0);

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
    const [postRow1, setPostRow1] = useState("");
    const [postRow2, setPostRow2] = useState("");
    const [postRow3, setPostRow3] = useState("");
    const [postRow4, setPostRow4] = useState("");
    const [postRow5, setPostRow5] = useState("");
    const [postRow6, setPostRow6] = useState("");
    const [postFrac, setPostFrac] = useState("");

    const [gameOverPopup, setGameOverPopup] = useState(false);

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
            
        currentBlock(1);
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

        currentBlock(3);
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
            if(tmp2 !== "" && tmp2 !== " "){
                liveEq += tmp2;
            }
        }

        for(let j = 1; j < liveEq.length; j++){
            if("^*/+-".includes(liveEq[j]) && "^*/+-".includes(liveEq[j-1])){
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
            if(tmp2 !== "" && tmp2 !== " "){
                liveEq += tmp2;
            }
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
                alert("Invalid Equation: Please use all 10 characters in your equation.")
            }
            else if((Number.isInteger(answer)) || answer >= 1 || answer <= 999){
                submission();
                currentBlock(2);
            }
            else {
                alert("Invalid Equation: Please correct and try again.")
            }

        } else if (!isValidToEval()) {
            alert("Invalid Equation: Please correct and try again.")
        }
    }

    function currentBlock(num){

        if( num !==3 && indexListCounter === finalIndexList.length -1 || currentRow > 6){
            return;
        }

        for(let y = 1; y < numberOfGuesses+1; y++){
            for(let x = 0; x<finalIndexList.length; x++ ){
                let tmp = finalIndexList[x];
                let tmp2 = parseInt(tmp) + 1;
                let tmp3 = tmp2.toString();
                if(document.getElementById(`row${y}col${tmp3}`).className.includes('currentBlock')){
                    document.getElementById(`row${y}col${tmp3}`).className = 'guessGrid';
                }
            }
        }

        let t = "";
        if(indexListCounter < finalIndexList.length-1){
            t = parseInt(finalIndexList[indexListCounter+1]) + 1;
        } else if (indexListCounter === finalIndexList.length-1){
            t = parseInt(finalIndexList[indexListCounter]) + 1;
        } else if (num === 3 && indexListCounter > 0){
            t = parseInt(finalIndexList[indexListCounter-1]) + 1;
        } else {
            t = parseInt(finalIndexList[indexListCounter-1]) + 1;
        }
        let u = t.toString();
    
        if(num === 1){
            document.getElementById(`row${currentRow}col${u}`).className += " currentBlock";
        } else if(num===2){
            if(currentRow < 6){
                let n = parseInt(finalIndexList[0]) + 1;
                let o = currentRow+1;
                document.getElementById(`row${o}col${n}`).className = "guessGrid currentBlock";
            } else {
                return;
            }
        } else if(num===3 && indexListCounter >1){
            if(indexListCounter === 6 || indexListCounter < 2){
                let f = parseInt(finalIndexList[finalIndexList.length-1]) + 1;
                let g = f.toString();
                document.getElementById(`row${currentRow}col${g}`).className = "guessGrid currentBlock";
                return;
            }
            console.log("here2")
            let a = indexListCounter-1;
            let b = parseInt(finalIndexList[a]) + 1;
            let c = b.toString();
            let d = parseInt(finalIndexList[a+1]) + 1;
            let e = d.toString();
            document.getElementById(`row${currentRow}col${c}`).className += " currentBlock";
            document.getElementById(`row${currentRow}col${e}`).className = "guessGrid";
        } else if(num===3 && indexListCounter === 1){
            let j = parseInt(finalIndexList[0]) + 1;
            document.getElementById(`row${currentRow}col${j}`).className = "guessGrid currentBlock";
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

        let r = parseInt(indexList[0]) + 1
        let s = r.toString();
        document.getElementById(`row1col${s}`).className += " currentBlock";
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
            setTimeout(function() { gameWin(); }, 200);
            setTimeout(function() { setCurrentRow(7); }, 300);
            return;

        } else if(currentRow === 6){
            fill();
            setTimeout(function() { gameLose(); }, 200);
            setTimeout(function() { setCurrentRow(7); }, 300);
            return;
        } else {
            fill();
            
        }

    }

    function fill(){
        let charList = ""
        let answer = (math.evaluate(finalEqValueList)).toString();
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
                document.getElementById(`row${currentRow}col${pTemporary}`).className = "correctDig";
                if(hold1 === '+'){
                    document.getElementById(`key_10`).className = "col-2 key_correct";
                } else if(hold1 === '-'){
                    document.getElementById(`key_11`).className = "col-2 key_correct";
                } else if(hold1 === '^'){
                    document.getElementById(`key_12`).className = "col-2 key_correct";
                } else if(hold1 === '*'){
                    document.getElementById(`key_14`).className = "col-2 key_correct";
                } else if(hold1 === '/'){
                    document.getElementById(`key_15`).className = "col-2 key_correct";
                } else {
                    document.getElementById(`key_${hold1}`).className = "col-2 key_correct";
                }
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
                document.getElementById(`row${currentRow}col${pTemporary}`).className = "nearDig";
                if(hold1 === '+'){
                    document.getElementById(`key_10`).className = "col-2 key_within";
                } else if(hold1 === '-'){
                    document.getElementById(`key_11`).className = "col-2 key_within";
                } else if(hold1 === '^'){
                    document.getElementById(`key_12`).className = "col-2 key_within";
                } else if(hold1 === '*'){
                    document.getElementById(`key_14`).className = "col-2 key_within";
                } else if(hold1 === '/'){
                    document.getElementById(`key_15`).className = "col-2 key_within";
                } else {
                    document.getElementById(`key_${hold1}`).className = "col-2 key_within";
                }
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
            setCurrentRow(currentRow+1);
        }
        setIndexListCounter(0);
        return;
    }

    function emojiGen(status, guess){
        let row1 = "";
        let row2 = "";
        let row3 = "";
        let row4 = "";
        let row5 = "";
        let row6 = "";

        for(let a = 1; a < numberOfGuesses+1; a++){
            for(let b = 1; b < equationLength+1; b++ ){
                let temp = document.getElementById(`row${a}col${b}`).className;
                if(a === 1 && a <= currentRow){
                    if(temp === "notInEq"){
                        row1 += "⬛";
                    } else if (temp === "correctDig"){
                        row1 += "🟩";
                    } else if (temp === "nearDig"){
                        row1 += "🟨"
                    } else if (temp === "wrongDig"){
                        row1 += "🟥"
                    } else {
                        console.log("error # 1")
                    }
                } else if(a === 2 && a <= currentRow){
                    if(temp === "notInEq"){
                        row2 += "⬛";
                    } else if (temp === "correctDig"){
                        row2 += "🟩";
                    } else if (temp === "nearDig"){
                        row2 += "🟨"
                    } else if (temp === "wrongDig"){
                        row2 += "🟥"
                    } else {
                        console.log("error # 2")
                    }
                } else if(a === 3 && a <= currentRow){
                    if(temp === "notInEq"){
                        row3 += "⬛";
                    } else if (temp === "correctDig"){
                        row3 += "🟩";
                    } else if (temp === "nearDig"){
                        row3 += "🟨"
                    } else if (temp === "wrongDig"){
                        row3 += "🟥"
                    } else {
                        console.log("error # 3")
                    }
                } else if(a === 4 && a <= currentRow){
                    if(temp === "notInEq"){
                        row4 += "⬛";
                    } else if (temp === "correctDig"){
                        row4 += "🟩";
                    } else if (temp === "nearDig"){
                        row4 += "🟨"
                    } else if (temp === "wrongDig"){
                        row4 += "🟥"
                    } else {
                        console.log("error # 4")
                    }
                }  else if(a === 5 && a <= currentRow){
                    if(temp === "notInEq"){
                        row5 += "⬛";
                    } else if (temp === "correctDig"){
                        row5 += "🟩";
                    } else if (temp === "nearDig"){
                        row5 += "🟨"
                    } else if (temp === "wrongDig"){
                        row5 += "🟥"
                    }  else {
                        console.log("error # 5")
                    }
                }  else if(a === 6 && a <= currentRow){
                    if(temp === "notInEq"){
                        row6 += "⬛";
                    } else if (temp === "correctDig"){
                        row6 += "🟩";
                    } else if (temp === "nearDig"){
                        row6 += "🟨"
                    } else if (temp === "wrongDig"){
                        row6 += "🟥"
                    } else {
                        console.log("error # 6")
                    }
                } else (
                    console.log("error # 7")
                )
            }
        }

        setPostFrac(`${status}(${guess}/${numberOfGuesses}):`)
        setPostRow1(row1); 
        setPostRow2(row2); 
        setPostRow3(row3); 
        setPostRow4(row4); 
        setPostRow5(row5); 
        setPostRow6(row6); 
    }

    function gameWin(){

        emojiGen("Win 😄 ", currentRow.toString());

        let a = parseInt(finalIndexList[0]) + 1;

        for(let b = 1; b < numberOfGuesses+1; b++){
            if(document.getElementById(`row${b}col${a}`).className.includes('B')){
                document.getElementById(`row${b}col${a}`).className = 'guessGrid';
            }
        }

        setGameOverPopup(true);

    }

    function gameLose(){
        emojiGen("Loss 😔 ", 'X');
        setGameOverPopup(true);
        setTimeout(function() { fillAnswer(); }, 200);
    }

    function fillAnswer(){
        for(let i = 0; i < finalIndexList.length; i++){
            let k = parseInt(finalIndexList[i]) + 1;
            let m = finalIndexList[i];
            let j = eq[m];
            document.getElementById(`row${currentRow}col${k}`).innerHTML = j;
        }
        for(let r = 0; r < equationLength; r++){
            let q =  r+1;
            document.getElementById(`row${currentRow}col${q}`).className = 'wrongDig';
        }
        document.getElementById(`ans${currentRow}spot1`).innerHTML = solutionFin[0];
        document.getElementById(`ans${currentRow}spot1`).className = 'wrongDig';
        document.getElementById(`ans${currentRow}spot2`).innerHTML = solutionFin[1];
        document.getElementById(`ans${currentRow}spot2`).className = 'wrongDig';
        document.getElementById(`ans${currentRow}spot3`).innerHTML = solutionFin[2];
        document.getElementById(`ans${currentRow}spot3`).className = 'wrongDig';
        
    }

    function copyToClip() {
        let t0 = document.getElementById(`postFrac`).innerHTML;
        let t1 = document.getElementById(`post1`).innerHTML;
        let t2 = document.getElementById(`post2`).innerHTML;
        let t3 = document.getElementById(`post3`).innerHTML;
        let t4 = document.getElementById(`post4`).innerHTML;
        let t5 = document.getElementById(`post5`).innerHTML;
        let t6 = document.getElementById("post6").innerHTML;

        navigator.clipboard.writeText(t0 + '\n' + t1 + '\n' + t2 + '\n' + t3 + '\n' + t4 + '\n' + t5 + '\n' + t6);
        document.getElementById('copyText').innerHTML = "Copied!";
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

            <GameOver trigger={gameOverPopup} setTrigger={setGameOverPopup}>
                <div className="d-flex justify-content-between">
                    <h2 className="text-secondary"> Game Over:</h2>
                    <button className="closePopUp" onClick={()=> {setGameOverPopup(!gameOverPopup)}}>X</button>
                </div>
                <div className="row d-flex justify-content-start mt-5">
                    <p className="mt-0 mb-2" id="postFrac">{postFrac}</p>
                    <p className="mt-0 mb-0" id="post1">{postRow1}</p>
                    <p className="mt-0 mb-0" id="post2">{postRow2}</p>
                    <p className="mt-0 mb-0" id="post3">{postRow3}</p>
                    <p className="mt-0 mb-0" id="post4">{postRow4}</p>
                    <p className="mt-0 mb-0" id="post5">{postRow5}</p>
                    <p className="mt-0 mb-0" id="post6">{postRow6}</p> 
                    <p onClick={()=> setTimeout(function() { copyToClip(); }, 500)} className="text-primary mt-2"><span id="copyText">Copy?</span><img className="icons ml-3" id="icon6" src={copy} alt="copy.png" onClick={()=> setTimeout(function() { copyToClip(); }, 500) } onMouseEnter={e => (e.currentTarget.src = copy2)} onMouseLeave={e => (e.currentTarget.src = copy)}/></p>
                </div>    
            </GameOver>

            <div id="keypad_interface" className="">
                <div id="row7" className="d-flex row justify-content-center">
                    <p onClick={()=>keyPress(1)} className="col-2 key_unselected" id="key_1">1</p>
                    <p onClick={()=>keyPress(2)} className="col-2 key_unselected" id="key_2">2</p>
                    <p onClick={()=>keyPress(3)} className="col-2 key_unselected" id="key_3">3</p>
                    <p onClick={()=>keyPress("+")} className="col-2 key_unselected" id="key_10">+</p>
                    <p onClick={()=>keyPress("-")} className="col-2 key_unselected" id="key_11">-</p>
                    <p onClick={()=>delPress()} className="col-2 key_del" id="key_delete">Del</p>
                </div>
                <div id="row8" className="d-flex row justify-content-center">
                    <p onClick={()=>keyPress(4)}  className="col-2 key_unselected" id="key_4">4</p>
                    <p onClick={()=>keyPress(5)}  className="col-2 key_unselected" id="key_5">5</p>
                    <p onClick={()=>keyPress(6)}  className="col-2 key_unselected" id="key_6">6</p>
                    <p onClick={()=>keyPress("^")} className="col-2 key_unselected" id="key_12">^</p>
                    <p onClick={()=>enterPress()} className="col-4 key_enter" id="key_13"> Enter </p>
                </div>
                <div id="row9" className="d-flex row justify-content-center">
                    <p onClick={()=>keyPress(7)}  className="col-2 key_unselected" id="key_7">7</p>
                    <p onClick={()=>keyPress(8)}  className="col-2 key_unselected" id="key_8">8</p>
                    <p onClick={()=>keyPress(9)}  className="col-2 key_unselected" id="key_9">9</p>
                    <p onClick={()=>keyPress(0)}  className="col-2 key_unselected" id="key_0">0</p>
                    <p onClick={()=>keyPress("*")}  className="col-2 key_unselected" id="key_14">*</p>
                    <p onClick={()=>keyPress("/")} className="col-2 key_unselected" id="key_15">/</p>
                    
                </div>
            </div>

        </div>
    )
}



export default Main;