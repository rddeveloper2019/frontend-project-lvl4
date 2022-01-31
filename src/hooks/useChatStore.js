import { useContext } from 'react';
import { ChatStore } from '../store/Store.jsx';

const useChatStore = () => useContext(ChatStore);
export default useChatStore;
