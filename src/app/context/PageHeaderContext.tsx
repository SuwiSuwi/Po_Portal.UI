import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface BreadcrumbItem {
    label: string;
    icon?: ReactNode;
    href?: string;
}

interface PageHeaderContextType {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    setPageHeader: (title: string, breadcrumbs: BreadcrumbItem[]) => void;
    clearPageHeader: () => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export const PageHeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState<string>('');
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

    const setPageHeader = useCallback((newTitle: string, newBreadcrumbs: BreadcrumbItem[]) => {
        setTitle(newTitle);
        setBreadcrumbs(newBreadcrumbs);
    }, []);

    const clearPageHeader = useCallback(() => {
        setTitle('');
        setBreadcrumbs([]);
    }, []);

    return (
        <PageHeaderContext.Provider value={{ title, breadcrumbs, setPageHeader, clearPageHeader }}>
            {children}
        </PageHeaderContext.Provider>
    );
};

export const usePageHeader = () => {
    const context = useContext(PageHeaderContext);
    if (!context) {
        throw new Error('usePageHeader must be used within a PageHeaderProvider');
    }
    return context;
};

export default PageHeaderContext;
