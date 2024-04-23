import React, { useEffect ,useState} from 'react';

const Test = () => {
    const[cout,setCount] = useState()
    useEffect(() => {
        console.log("Effect triggered");
    }, []);

    return (
        <div>Test</div>
    );
};

export default Test;
