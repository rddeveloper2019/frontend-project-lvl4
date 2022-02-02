import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext.jsx';

const useChatContext = () => useContext(ChatContext);
export default useChatContext;
