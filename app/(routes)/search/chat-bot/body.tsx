import  ChatBox  from "./chatbox";

const Body = () => {

    return ( 
        <div className="flex flex-col items-center justify-center  p-4">
            <h1 className="text-2xl font-bold">ChatGPT Assistant</h1>
            <ChatBox/>
        </div>
     );
}
 
export default Body;