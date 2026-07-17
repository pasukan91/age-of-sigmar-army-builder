import { createContext, useContext, useState } from "react";

const ArmyContext = createContext();

export function ArmyProvider({ children }) {

    const [page, setPage] = useState("home");

    const [lists, setLists] = useState([]);

    const [currentList, setCurrentList] = useState(null);

    const [selector, setSelector] = useState({
        title: "",
        options: [],
        property: "",
    });

    const [army, setArmy] = useState({
        alliance: null,
        faction: null,
        points: 2000,
        name: "",
    });

    return (
        <ArmyContext.Provider
            value={{
                page,
                setPage,

                lists,
                setLists,

                currentList,
                setCurrentList,

                selector,
                setSelector,

                army,
                setArmy,
            }}
        >
            {children}
        </ArmyContext.Provider>
    );
}

export function useArmy() {
    return useContext(ArmyContext);
} 