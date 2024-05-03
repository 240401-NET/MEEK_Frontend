import { useRef, useEffect, useState} from "react";
export const UseEffectOnce = (effect: () => void | (() => void)) => {
    const destroyFunc = useRef<void | (() => void)>();
    const effectedCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState<number>(0);

    if (effectedCalled.current) {
        renderAfterCalled.current = true;
    }

    useEffect (() => {
        if (!effectedCalled.current) {
            destroyFunc.current = effect();
            effectedCalled.current = true;
        }

        setVal((val) => val + 1);

        return () => {
            if(!renderAfterCalled.current) {
                return;
            }
            if(destroyFunc.current) {
                destroyFunc.current();
            }
        };
    }, []);
};