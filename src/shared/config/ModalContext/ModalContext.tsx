import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { ModalId } from './modalIds';

interface ModalContextType {
    openModals: ModalId[];
    openModal: (id: ModalId) => void;
    closeModal: (id: ModalId) => void;
    closeTopModal: () => void;
    isModalOpen: (id: ModalId) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [openModals, setOpenModals] = useState<ModalId[]>([]);

    const openModal = useCallback((id: ModalId) => {
        setOpenModals(prev => [...prev, id]);
    }, []);

    const closeModal = useCallback((id: ModalId) => {
        setOpenModals(prev => prev.filter(modalId => modalId !== id));
    }, []);

    const closeTopModal = useCallback(() => {
        setOpenModals(prev => prev.slice(0, -1));
    }, []);

    const isModalOpen = useCallback((id: ModalId) => {
        return openModals.includes(id);
    }, [openModals]);

    return (
        <ModalContext.Provider value={{
            openModals,
            openModal,
            closeModal,
            closeTopModal,
            isModalOpen
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}; 