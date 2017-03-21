import {INCREASE, DECREASE} from "../actionType.jsx"
// console.log(INCREASE)

export const increase = function(){
	return {
		type:INCREASE,
		num:1
	}
}

export const decrease = function (){
	return{
		type:DECREASE,
		num:2
	}
}

export const increaseAsync = function (){
	return dispatch => {
	    setTimeout(() => {
	      	// Yay! Can invoke sync or async actions with `dispatch`
	      	dispatch(increase());
	    }, 1000);
	};
}


