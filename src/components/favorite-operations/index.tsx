import { FC } from "react";
import { FavoriteOperationsProps } from "src/components/favorite-operations/types";
import { setSelected } from "src/store/favorite-operations";
import { selectFavoriteOperations } from "src/store/favorite-operations/selectors";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export const FavoriteOperations: FC<FavoriteOperationsProps> = (props) => {
    const dispatch = useAppDispatch();
    const favoriteOperations = useAppSelector(selectFavoriteOperations);

    return (
        <div className={`w-full h-full bg-gray flex flex-col items-center`}>
            <span className={`p-4 text-white font-bold text-xl`}>Favorites</span>
            {favoriteOperations.map((operation, i) => (
                <div
                    className={`w-full p-4 text-xl font-bold text-gray-light text-sm cursor-pointer border-t border-t-gray-light text-center`}
                    key={i}
                    onClick={() => dispatch(setSelected(operation))}>
                    {operation}
                </div>
            ))}
        </div>
    );
};
