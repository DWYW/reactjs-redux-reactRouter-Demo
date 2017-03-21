// import {add} from '../actions/test.jsx'
import {INCREASE, DECREASE} from "../actionType.jsx"

let dataConf={
	num:1
}

const test = (state=1,action={})=>{
	switch(action.type){
		case INCREASE:
			return state+action.num;
		case DECREASE:
			return state-action.num;
		default:
			return state;
	}
}

export default test