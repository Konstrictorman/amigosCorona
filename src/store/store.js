import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { fieldReducer } from '../components/fields/reducers/fieldReducer';
import { uiReducer } from '../components/general/reducers/uiReducer';




const reducers = combineReducers({
   ui: uiReducer,
   lists: fieldReducer,
});



export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));