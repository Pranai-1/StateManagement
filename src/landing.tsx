import React, { useContext } from "react";
import { useEffect, useState } from "react";


//The main concept of contectApi and propdrilling is that,whenever we have a parent component with multiple child components 
//and those child components have again child components,if the child components requires same attribute each,then it is a
//good practice to declare that required state in the parent component and pass them as props to child,this is known as prop drilling
//To avoid propdrilling we can use contextAPI and useContext hook to wrap the required state,now there is no need to pass them as props
//The problem here is still the re-renders are same and other problem is
//If i wrap a child component inside contextprovider in my parent component,if the wrapped child component have another few 
//child components all of them still have accees to the state,eventhough they were wrapped in contextprovider,contextprovider
//automatically passes down the wrapped values to all the child components of the wrapped child components also 

const MyContext = React.createContext<any>([]);
export default function Landing() {
    const [items, setItems] = useState<string[]>([]); // Define the initial state as an array of strings
    const [cartItems, setCartItems] = useState<string[]>([]);
    
    console.log(cartItems)
    useEffect(() => {
        let arr = ["item1", "item2", "item3", "item4", "item5", "item6"];
        setItems(arr); // Directly set the array as the state
       // setItems((prev)=>[...prev,...arr])//merging arrays
    }, []);

    console.log(items);


    return (
       < MyContext.Provider value={{setCartItems}}>
        <div className="h-[695px] w-full bg-black  overflow-auto">
            <p className="h-max w-full p-2 text-red-600 font-bold text-xl text-center mt-3">Welcome Here!</p>
            <p className="h-max w-full p-2 text-green-600 font-bold text-center">Happy Shopping</p>
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center mt-5 p-3">
                {items.map((item, index) => (
                    <div className=" bg-slate-200 py-10 rounded-lg px-3">
                    <p key={index} className="text-black text-center p-2 font-bold text-xl">{item}</p>
                    <div className="flex justify-center gap-7">
                        <AddToCart item={item}/>
                    </div>
                    </div>
                ))}
            </div>
            <p className="h-max w-full p-2 text-green-600 font-bold text-center mt-2">Cart Items</p>
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center mt-5 p-3">
                {cartItems.map((item, index) => (
                    <div className=" bg-slate-200 py-10 rounded-lg px-3">
                    <p key={index} className="text-black text-center p-2 font-bold text-xl">{item}</p>
                    <div className="flex justify-center gap-7">
                   <p>Inside cart</p>
                   <RemoveFromCart item={item} />
                    </div>
                    </div>
                ))}
            </div>
        </div>
        </MyContext.Provider>
    );
}

function AddToCart({item}:{item:string}){
    const { setCartItems } = useContext(MyContext);
    return(
        <>
        <button className="p-2 font-bold bg-blue-600 text-xs rounded-lg" onClick={()=>setCartItems((prev: string[])=>[...prev,item])}>Add To Cart</button>
        </>
    )
}

function RemoveFromCart({item}:{item:string}){
    const { setCartItems } = useContext(MyContext);
    function handleRemove(): void {
        setCartItems((prev: string[])=>prev.filter((x)=>x!==item))
    }
    return(
        <>
        <button className="p-2 font-bold bg-blue-600 text-xs rounded-lg" onClick={()=>handleRemove()}>Remove From Cart</button>
        </>
    )
}