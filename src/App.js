import React, {useState} from 'react'
import ResultScreen from './components/ResultScreen';
import Keypad from './components/Keypad'
import './App.css';
import useKeyPressed from './hooks/useKeyPressed';




const App = ()=>  {
  const initialValue = "0"
  const numberKeys= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const operationKeys = ['(', ')', 'C', '+', '-', '*', '=', '/']
  const [result, setResult] = useState(initialValue)

  useKeyPressed([...numberKeys,...operationKeys], (key) => onClick(key));  

  const onClick = buttonValue => {
      switch(buttonValue) {
         case "=":
             calculate()
           break;
         case "C":
             reset()
           break;
         case "CE":
             result === 'error' ? reset() : backspace()
             break;
         default:
             if((result === initialValue) && !operationKeys.includes(buttonValue)){
                 setResult(buttonValue);
             }
             else {
                 setResult(result + buttonValue)
             }
       }
 }
 const calculate = () => {
     const checkResult = result.includes('--') ? result.replace('--','+') : result
     try {
         const evaluatedResult = eval(checkResult);
         setResult(evaluatedResult);
     } catch (e) {
         setResult("error")
     }
 };
 const reset = () => {
     setResult(initialValue)
 };
 const backspace = () => {
     setResult(result.slice(0, -1))
 };
 
 
    return ( 
     <React.Fragment>

       <div className="calculator-body">
       <h1>My calculator with react</h1>
        <ResultScreen result={result}/>
       <Keypad onClick={onClick}/>

       </div>
      
     </React.Fragment>
     );

}
 
export default App;




