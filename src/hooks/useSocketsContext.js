import { useContext } from 'react';
import { SocketsContext } from '../context/SocketsContext.jsx';

const useSocketsContext = () => useContext(SocketsContext);
export default useSocketsContext;
