import { FC, useEffect, useState } from "react";
import { CalculatorProps } from "src/components/calculator/types";
import { addFavorite, clearSelected } from "src/store/favorite-operations";
import { selectSelectedFavoriteOperation } from "src/store/favorite-operations/selectors";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

const operators = ["/", "*", "+", "-"];

export const Calculator: FC<CalculatorProps> = (props) => {
    const dispatch = useAppDispatch();
    const selectedFavoriteOperation = useAppSelector(selectSelectedFavoriteOperation);
    const [currentOperation, setCurrentOperation] = useState<string>(selectedFavoriteOperation || "");
    const [lastOperations, setLastOperations] = useState<string[]>([]);
    const [isResultShowing, setIsResultShowing] = useState<boolean>(false);

    useEffect(() => {
        if (selectedFavoriteOperation !== null) {
            const splitAtEqual = selectedFavoriteOperation.split("=");
            setCurrentOperation(splitAtEqual[0].trim());
            dispatch(clearSelected());
        }
    }, [selectedFavoriteOperation]);

    const clear = () => {
        setIsResultShowing(false);
        setCurrentOperation("");
    };

    const onOperatorClicked = (operator: string) => {
        let str = currentOperation;
        if (isResultShowing) {
            clear();
            str = "";
        }

        const lastChar = str[str.length - 1];
        if (operators.indexOf(lastChar) !== -1) {
            str = str.substring(0, str.length - 1);
        }

        setCurrentOperation(`${str} ${operator}`);
    };

    const onNumberClicked = (n: number) => {
        let str = currentOperation;
        if (isResultShowing) {
            clear();
            str = "";
        }

        const lastChar = str[str.length - 1];
        if (isNaN(parseInt(lastChar))) {
            str += " ";
        }

        setCurrentOperation(`${str}${n}`);
    };

    const onEqualClicked = () => {
        const lastChar = currentOperation[currentOperation.length - 1];
        if (operators.indexOf(lastChar) !== -1) {
            setCurrentOperation("Err!");
            setTimeout(() => setCurrentOperation(""), 1500);
            return;
        }

        // I know, I know. The exercise is supposed to be quick and focusing on React, not on security 😎
        const result = eval(currentOperation);
        const operation = currentOperation;
        setCurrentOperation(result);
        setIsResultShowing(true);

        let lastOps = [...lastOperations];
        if (lastOps.length >= 3) {
            lastOps.shift();
        }

        setLastOperations([...lastOps, `${operation} = ${result}`]);
    };

    const addToFavorites = () => {
        const lastOp = lastOperations[lastOperations.length - 1];
        dispatch(addFavorite(lastOp));
        clear();
    };

    const renderClearOrFavorite = () => {
        if (!isResultShowing) {
            return (
                <button className={`p-4 bg-white col-span-3 uppercase font-bold`} onClick={clear}>
                    Clear
                </button>
            );
        }

        return (
            <button className={`p-4 col-span-3 bg-pink-800 text-white font-bold text-4xl`} onClick={addToFavorites}>
                ⭐
            </button>
        );
    };

    return (
        <div className={`w-full h-full flex flex-col bg-gray`}>
            <div className={`p-4 flex flex-col items-end justify-end`}>
                {lastOperations.map((operation, i) => (
                    <div className={`p-2 text-gray-light text-sm`} key={i}>
                        {operation}
                    </div>
                ))}
                <div className={`p-4 text-white font-bold text-xl`}>{currentOperation}</div>
            </div>
            <div className={`flex-1 grid grid-cols-4 gap-0.5`}>
                {renderClearOrFavorite()}
                <button
                    className={`p-4 bg-pink-800 text-white font-bold text-4xl`}
                    onClick={() => onOperatorClicked("/")}>
                    ÷
                </button>

                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(7)}>
                    7
                </button>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(8)}>
                    8
                </button>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(9)}>
                    9
                </button>
                <button
                    className={`p-4 bg-pink-800 text-white font-bold text-4xl`}
                    onClick={() => onOperatorClicked("*")}>
                    x
                </button>

                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(4)}>
                    4
                </button>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(5)}>
                    5
                </button>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(6)}>
                    6
                </button>
                <button
                    className={`p-4 bg-pink-800 text-white font-bold text-4xl`}
                    onClick={() => onOperatorClicked("+")}>
                    +
                </button>

                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(1)}>
                    1
                </button>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(2)}>
                    2
                </button>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(3)}>
                    3
                </button>
                <button
                    className={`p-4 bg-pink-800 text-white font-bold text-4xl`}
                    onClick={() => onOperatorClicked("-")}>
                    -
                </button>

                <span className={`bg-gray-dark`}></span>
                <button className={`p-4 bg-white text-2xl`} onClick={() => onNumberClicked(0)}>
                    0
                </button>
                <span className={`bg-gray-dark`}></span>
                <button className={`p-4 bg-pink-800 text-white font-bold text-4xl`} onClick={onEqualClicked}>
                    =
                </button>
            </div>
        </div>
    );
};
